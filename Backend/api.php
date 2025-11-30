<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


const SESSIONS_DIR = __DIR__ . '/sessions';
const SESSION_LIFETIME_SECONDS = 60 * 60 * 6; 

if (!is_dir(SESSIONS_DIR)) {
    mkdir(SESSIONS_DIR, 0777, true);
}


function send_json($data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function get_body_json(): array {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function generate_session_id(int $length = 6): string {

    $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $out = '';
    for ($i = 0; $i < $length; $i++) {
        $out .= $chars[random_int(0, strlen($chars) - 1)];
    }
    return $out;
}

function session_file_path(string $sessionId): string {
    $sessionId = preg_replace('/[^A-Z0-9]/i', '', $sessionId);
    return SESSIONS_DIR . '/session_' . $sessionId . '.json';
}

function load_session(string $sessionId): ?array {
    $file = session_file_path($sessionId);
    if (!file_exists($file)) return null;

    $json = file_get_contents($file);
    if ($json === false) return null;

    $data = json_decode($json, true);
    return is_array($data) ? $data : null;
}

function save_session(string $sessionId, array $data): bool {
    $file = session_file_path($sessionId);
    $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    return file_put_contents($file, $json) !== false;
}

function cleanup_old_sessions(): void {
    $files = glob(SESSIONS_DIR . '/session_*.json');
    if (!$files) return;
    $now = time();
    foreach ($files as $file) {
        $mtime = filemtime($file);
        if ($mtime !== false && ($now - $mtime) > SESSION_LIFETIME_SECONDS) {
            @unlink($file);
        }
    }
}

/**
 * Liczenie wspólnych propozycji (finals):
 * 1) Najpierw filmy polubione przez obie osoby (wspólne id), sort po vote_average malejąco.
 * 2) Jeśli nie ma wspólnych, fallback: wszystkie polubione (unia), sort po vote_average malejąco.
 */
function compute_finals(array $p1Likes, array $p2Likes, int $limit = 3): array {
    $mapP1 = [];
    foreach ($p1Likes as $m) {
        if (!is_array($m) || !isset($m['id'])) continue;
        $mapP1[$m['id']] = $m;
    }

    $mapP2 = [];
    foreach ($p2Likes as $m) {
        if (!is_array($m) || !isset($m['id'])) continue;
        $mapP2[$m['id']] = $m;
    }

    $common = [];
    foreach ($mapP1 as $id => $m1) {
        if (isset($mapP2[$id])) {
            $merged = $m1;
            if (!isset($merged['vote_average']) && isset($mapP2[$id]['vote_average'])) {
                $merged['vote_average'] = $mapP2[$id]['vote_average'];
            }
            $common[] = $merged;
        }
    }

    usort($common, function ($a, $b) {
        $va = $a['vote_average'] ?? 0;
        $vb = $b['vote_average'] ?? 0;
        if ($va == $vb) return 0;
        return ($va < $vb) ? 1 : -1;
    });

    if (count($common) > 0) {
        return array_slice($common, 0, $limit);
    }

    
    $all = $mapP1 + $mapP2;
    $allList = array_values($all);
    usort($allList, function ($a, $b) {
        $va = $a['vote_average'] ?? 0;
        $vb = $b['vote_average'] ?? 0;
        if ($va == $vb) return 0;
        return ($va < $vb) ? 1 : -1;
    });

    return array_slice($allList, 0, $limit);
}

// ---- ROUTING ----

$action = $_GET['action'] ?? $_POST['action'] ?? null;
if (!$action) {
    send_json(['error' => 'Missing action'], 400);
}

cleanup_old_sessions();

switch ($action) {

    case 'createSession':
        $body = get_body_json();
        $name = trim($body['name'] ?? '');
        if ($name === '') {
            $name = 'Sesja filmowa';
        }

        
        do {
            $sessionId = generate_session_id(6);
            $file = session_file_path($sessionId);
        } while (file_exists($file));

        $session = [
            'id' => $sessionId,
            'name' => $name,
            'createdAt' => time(),

            'player1Genres' => [],
            'player2Genres' => [],
            'commonGenres' => [],

         
            'moviePool' => [],

            'player1Favorites' => [],
            'player2Favorites' => [],
            'player1Done' => false,
            'player2Done' => false,

            'finals' => [],
        ];

        if (!save_session($sessionId, $session)) {
            send_json(['error' => 'Nie udało się zapisać sesji'], 500);
        }

        send_json([
            'ok' => true,
            'sessionId' => $sessionId,
            'name' => $name,
        ]);
        break;

   
    case 'updateGenres':
        $body = get_body_json();
        $sessionId = strtoupper(trim($body['sessionId'] ?? ''));
        $player = (int)($body['player'] ?? 0);
        $genres = $body['genres'] ?? null;
        $moviePool = $body['moviePool'] ?? null;

        if ($sessionId === '' || ($player !== 1 && $player !== 2)) {
            send_json(['error' => 'sessionId i player (1 lub 2) są wymagane'], 400);
        }
        if (!is_array($genres)) {
            send_json(['error' => 'genres musi być tablicą (nawet pustą)'], 400);
        }

        $session = load_session($sessionId);
        if ($session === null) {
            send_json(['error' => 'Sesja nie istnieje'], 404);
        }

        if ($player === 1) {
            $session['player1Genres'] = $genres;
        } else {
            $session['player2Genres'] = $genres;
        }

        // liczymy wspólne gatunki
        $g1 = $session['player1Genres'] ?? [];
        $g2 = $session['player2Genres'] ?? [];
        $common = array_values(array_intersect($g1, $g2));
        $session['commonGenres'] = $common;

        // jeśli klient przysłał już wygenerowany wspólny deck filmów – zapisujemy
        if (is_array($moviePool)) {
            $session['moviePool'] = $moviePool;
        }

        $bothHaveGenres = (count($g1) > 0 && count($g2) > 0);
        $hasMoviePool = is_array($session['moviePool']) && count($session['moviePool']) > 0;

        if (!save_session($sessionId, $session)) {
            send_json(['error' => 'Nie udało się zaktualizować sesji'], 500);
        }

        send_json([
            'ok' => true,
            'bothHaveGenres' => $bothHaveGenres,
            'commonGenres' => $session['commonGenres'],
            'hasMoviePool' => $hasMoviePool,
            'moviePool' => $hasMoviePool ? $session['moviePool'] : null,
        ]);
        break;

   
    case 'updateFavorites':
        $body = get_body_json();
        $sessionId = strtoupper(trim($body['sessionId'] ?? ''));
        $player = (int)($body['player'] ?? 0);
        $favorites = $body['favorites'] ?? [];
        $done = isset($body['done']) ? (bool)$body['done'] : false;

        if ($sessionId === '' || ($player !== 1 && $player !== 2)) {
            send_json(['error' => 'sessionId i player (1 lub 2) są wymagane'], 400);
        }
        if (!is_array($favorites)) {
            send_json(['error' => 'favorites musi być tablicą'], 400);
        }

        $session = load_session($sessionId);
        if ($session === null) {
            send_json(['error' => 'Sesja nie istnieje'], 404);
        }

        $favKey = $player === 1 ? 'player1Favorites' : 'player2Favorites';
        $doneKey = $player === 1 ? 'player1Done' : 'player2Done';

        $session[$favKey] = $favorites;
        $session[$doneKey] = $done;
        $session['updatedAt'] = time();

        $p1Done = !empty($session['player1Done']);
        $p2Done = !empty($session['player2Done']);
        $bothDone = $p1Done && $p2Done;

        if ($bothDone) {
            $p1 = $session['player1Favorites'] ?? [];
            $p2 = $session['player2Favorites'] ?? [];
            $finals = compute_finals($p1, $p2, 3);
            $session['finals'] = $finals;
            $session['finishedAt'] = time();
        }

        if (!save_session($sessionId, $session)) {
            send_json(['error' => 'Nie udało się zaktualizować sesji'], 500);
        }

        send_json([
            'ok' => true,
            'bothDone' => $bothDone,
            'finals' => $bothDone ? $session['finals'] : null,
        ]);
        break;


    case 'getSession':
        $sessionId = strtoupper(trim($_GET['sessionId'] ?? ''));
        if ($sessionId === '') {
            send_json(['error' => 'sessionId jest wymagane'], 400);
        }

        $session = load_session($sessionId);
        if ($session === null) {
            send_json(['error' => 'Sesja nie istnieje'], 404);
        }

        $p1Done = !empty($session['player1Done']);
        $p2Done = !empty($session['player2Done']);
        $bothDone = $p1Done && $p2Done;

        if ($bothDone && (!isset($session['finals']) || !is_array($session['finals']) || count($session['finals']) === 0)) {
            $p1 = $session['player1Favorites'] ?? [];
            $p2 = $session['player2Favorites'] ?? [];
            $finals = compute_finals($p1, $p2, 3);
            $session['finals'] = $finals;
            $session['finishedAt'] = time();
            save_session($sessionId, $session);
        }

        send_json([
            'ok' => true,
            'session' => $session,
            'bothDone' => $bothDone,
            'finals' => $bothDone ? $session['finals'] : null,
        ]);
        break;

    default:
        send_json(['error' => 'Unknown action'], 400);
}
