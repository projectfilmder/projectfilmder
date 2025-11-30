import React, { useEffect, useState, useRef, useMemo } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Switch from '@mui/joy/Switch';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/joy/CircularProgress';
import Input from '@mui/joy/Input';
import Alert from '@mui/joy/Alert';
import Snackbar from '@mui/joy/Snackbar';
import Chip from '@mui/joy/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

import logo2 from './logo2.png';
import zagrajsolo from './zagrajsolo.png';
import zagrajzpartnerem from './zagrajzpartnerem.png';
import przejdzdobazy from './przejdzdobazy.png';

import YouTubeIcon from './youtube.png';
import WhatsAppIcon from './whatsapp.png';
import InstagramIcon from './instagram.png';
import FacebookIcon from './facebook.png';
import LinkedInIcon from './linkedin.png';
import EmojiObjectsIcon from './behance.png';
import profileicon from './profileicon.png';
import film from './Film.png';
import info from './Info.png';
import ThumbsDown from './Thumbs down.png';
import ThumbsUp from './Thumbs UP.png';
import Heart from './Heart.png';
import Damian from './damian.jpg';
import Adrian from './adrian.jpg';
import Adrianna from './Ada.jpg';
import Wiktoria from './Witoria.jpg';
import Sebastian from './Sebastian.jpg';
import Maja from './maja.jpg';

const API_KEY = 'f933cff296149f7459a50c0384cada32'; // TMDb
const API_BASE = 'https://tepesz.com/pbl/api.php';

const PROVIDERS = [
  { id: 8, name: 'Netflix' },
  { id: 9, name: 'Amazon' },
  { id: 384, name: 'HBO Max' },
  { id: 337, name: 'Disney+' },
  { id: 2, name: 'Apple TV' },
];

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { solidBg: '#fd5068' },
        danger: { solidBg: '#505cf0' },
        background: { body: '#141416' },
        text: { primary: '#ffffff' },
      },
    },
  },
  fontFamily: { body: 'Poppins, Segoe UI, sans-serif' },
});

function MediaContainer({ useTrailer, trailerKey, posterPath }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setImgLoaded(false);
  }, [posterPath, useTrailer, trailerKey]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImgLoaded(true);
    }
  }, [posterPath, useTrailer, trailerKey]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: { xs: '45vh', sm: '60vh' },
        maxHeight: 480,
        position: 'relative',
        borderRadius: useTrailer ? '8px' : '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        mx: 'auto',
        mb: 2,
        backgroundColor: useTrailer ? 'black' : 'transparent',
      }}
    >
      {useTrailer && trailerKey ? (
        <iframe
          title="Trailer"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      ) : (
        <>
          {posterPath && !imgLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.level1',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {posterPath && (
            <img
              ref={imgRef}
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt="Poster"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          )}
        </>
      )}
    </Box>
  );
}

function FavoritesCarousel({ favorites }) {
  const containerRef = useRef(null);
  const scroll = (direction) => {
    const { current } = containerRef;
    if (current) {
      const scrollAmount = current.offsetWidth;
      current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  if (!favorites.length) return null;

  return (
    <Box sx={{ position: 'relative', my: 2 }}>
      <IconButton
        onClick={() => scroll(-1)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 1,
          display: 'flex',
        }}
      >
        <ChevronLeftIcon sx={{ color: 'white' }} />
      </IconButton>

      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { display: 'none' },
          gap: 2,
          p: 1,
        }}
      >
        {favorites.map((f) => (
          <Card
            key={f.id}
            sx={{
              flex: '0 0 72%',
              scrollSnapAlign: 'center',
              backgroundColor: 'rgba(28,28,30,0.9)',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '20vh',
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${f.poster_path}`}
                alt={f.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
            <Typography level="body2" sx={{ color: 'white', textAlign: 'center', mt: 1 }}>
              {f.title}
            </Typography>
          </Card>
        ))}
      </Box>

      <IconButton
        onClick={() => scroll(1)}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          zIndex: 1,
          display: 'flex',
        }}
      >
        <ChevronRightIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home'); // home, favorites, pairLobby, setup, game, database, info, final, pairWaitingGenres, pairWaitingPartner
  const [mode, setMode] = useState('solo'); // 'solo' | 'pair'

  // sesja par
  const [sessionId, setSessionId] = useState(null);
  const [sessionName, setSessionName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [playerNumber, setPlayerNumber] = useState(1); // 1 lub 2
  const [commonGenres, setCommonGenres] = useState([]);

  const [genres, setGenres] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);

  const [moviePool, setMoviePool] = useState([]);
  const [poolIndex, setPoolIndex] = useState(0);
  const [isPoolReady, setIsPoolReady] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [finals, setFinals] = useState([]);

  const [trailer, setTrailer] = useState(null);
  const [useTrailer, setUseTrailer] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [details, setDetails] = useState(null);

  const [dislikedIds, setDislikedIds] = useState([]);

  const [snack, setSnack] = useState({ open: false, message: '', variant: 'solid' });

  // baza filmów
  const [dbQuery, setDbQuery] = useState('');
  const [dbSelectedGenres, setDbSelectedGenres] = useState([]);
  const [dbResults, setDbResults] = useState([]);
  const [dbPage, setDbPage] = useState(1);
  const [dbTotalPages, setDbTotalPages] = useState(1);
  const [dbLoading, setDbLoading] = useState(false);
  const [dbError, setDbError] = useState(null);

  const dbGenresList = useMemo(
    () =>
      Object.entries(genres).map(([id, name]) => ({
        id: Number(id),
        name,
      })),
    [genres]
  );

  const likedIds = useMemo(() => favorites.map((f) => f.id), [favorites]);

  const genreRef = useRef(null);
  const scrollGenres = (direction) => {
    if (genreRef.current) {
      const scrollAmount = genreRef.current.offsetWidth;
      genreRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  // nawigacja przeglądarki
  useEffect(() => {
    window.history.replaceState({ screen }, '');
  }, []);

  useEffect(() => {
    window.history.pushState({ screen }, '', `#${screen}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [screen]);

  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state;
      if (state && state.screen) {
        setScreen(state.screen);
      } else {
        setScreen('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ulubione lokalne
  useEffect(() => {
    const storedFavs = localStorage.getItem('filmderFavorites');
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('filmderFavorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // gatunki z TMDb
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pl-PL`)
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        (data.genres || []).forEach((g) => (map[g.id] = g.name));
        setGenres(map);
      });
  }, []);

  // pobieranie trailerów do aktualnego filmu
  useEffect(() => {
    const currentMovie = moviePool[poolIndex];
    if (!currentMovie) {
      setTrailer(null);
      return;
    }

    setTrailer(null);
    fetch(
      `https://api.themoviedb.org/3/movie/${currentMovie.id}/videos?api_key=${API_KEY}&language=pl-PL`
    )
      .then((res) => res.json())
      .then((data) => {
        const t = (data.results || []).find((v) => v.type === 'Trailer' && v.site === 'YouTube');
        setTrailer(t ? t.key : null);
      })
      .catch(() => {
        setTrailer(null);
      });
  }, [moviePool, poolIndex]);

  // baza filmów (screen database)
  useEffect(() => {
    if (screen !== 'database') return;
    const fetchDbMovies = async () => {
      setDbLoading(true);
      setDbError(null);
      try {
        let url = '';
        if (dbQuery.trim().length > 0) {
          url =
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pl-PL` +
            `&query=${encodeURIComponent(dbQuery)}` +
            `&page=${dbPage}`;
        } else if (dbSelectedGenres.length > 0) {
          const genreParam = dbSelectedGenres.join(',');
          url =
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl-PL` +
            `&with_genres=${genreParam}` +
            `&sort_by=popularity.desc` +
            `&page=${dbPage}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pl-PL&page=${dbPage}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setDbResults(data.results || []);
        setDbTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error('Błąd pobierania bazy filmów:', err);
        setDbError('Nie udało się pobrać danych. Spróbuj ponownie.');
      } finally {
        setDbLoading(false);
      }
    };
    fetchDbMovies();
  }, [screen, dbQuery, dbSelectedGenres, dbPage]);

  /**
   * W trybie pair: polling, aż obie osoby wybiorą gatunki i pojawi się/wygeneruje wspólny deck.
   * Jeśli:
   *  - oboje mają gatunki
   *  - moviePool w backendzie jest pusty
   *  - jesteśmy graczem 1 (host)
   * to host generuje deck i zapisuje go w backendzie.
   */
  useEffect(() => {
    if (screen !== 'pairWaitingGenres' || !sessionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_BASE}?action=getSession&sessionId=${encodeURIComponent(sessionId)}`
        );
        const data = await res.json();
        if (!data.ok) return;

        const session = data.session || {};
        const g1 = session.player1Genres || [];
        const g2 = session.player2Genres || [];
        const bothHaveGenres = g1.length > 0 && g2.length > 0;
        const common = session.commonGenres || [];
        const pool = session.moviePool || [];

        if (!bothHaveGenres) {
          // druga osoba jeszcze nie wybrała gatunków
          return;
        }

        setCommonGenres(common);

        if (Array.isArray(pool) && pool.length > 0) {
          
          setMoviePool(pool);
          setPoolIndex(0);
          setIsPoolReady(true);
          setScreen('game');
          clearInterval(interval);
        } else if (playerNumber === 1) {
        
          await generateAndSendSharedPool(common || [], selectedProviders);
          setScreen('game');
          clearInterval(interval);
        }
      } catch (e) {
        console.error('Błąd polling getSession (waiting genres):', e);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [screen, sessionId, playerNumber, selectedProviders]);

  
  
  useEffect(() => {
    if (screen !== 'pairWaitingPartner' || !sessionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_BASE}?action=getSession&sessionId=${encodeURIComponent(sessionId)}`
        );
        const data = await res.json();
        if (!data.ok) return;

        if (data.bothDone && Array.isArray(data.finals)) {
          setFinals(data.finals);
          setScreen('final');
          clearInterval(interval);
        }
      } catch (e) {
        console.error('Błąd polling getSession (waiting partner):', e);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [screen, sessionId]);

  // SOLO: budowanie puli filmów
  useEffect(() => {
    if (screen !== 'game') return;
    if (mode !== 'solo') return; // w trybie par pula jest wspólna z backendu
    if (!selectedGenres.length) {
      setMoviePool([]);
      setPoolIndex(0);
      setIsPoolReady(false);
      return;
    }

    (async () => {
      setIsPoolReady(false);
      try {
        const providerParam = selectedProviders.join('|');

        const fetchMovies = async (genreIds) => {
          const promises = [];
          genreIds.forEach((genreId) => {
            for (let p = 1; p <= 3; p++) {
              let url =
                `https://api.themoviedb.org/3/discover/movie?` +
                `api_key=${API_KEY}&language=pl-PL&include_adult=false` +
                `&sort_by=popularity.desc&with_genres=${genreId}` +
                `&page=${p}`;
              if (providerParam) {
                url += `&with_watch_providers=${providerParam}&watch_region=PL`;
              }
              promises.push(
                fetch(url)
                  .then((res) => {
                    if (!res.ok) throw new Error('Błąd TMDB');
                    return res.json();
                  })
                  .then((data) => data.results || [])
              );
            }
          });
          const pages = await Promise.all(promises);
          return pages.flat();
        };

        const dedupeAndFilter = (moviesArray) => {
          const unique = [];
          const seenIds = new Set();
          moviesArray.forEach((m) => {
            if (!seenIds.has(m.id) && !dislikedIds.includes(m.id)) {
              unique.push(m);
              seenIds.add(m.id);
            }
          });
          return unique;
        };

        let combined = await fetchMovies(selectedGenres);
        let filtered = dedupeAndFilter(combined);

        if (filtered.length === 0) {
          // fallback bez gatunków, tylko popularne + provider
          const promises = [];
          for (let p = 1; p <= 3; p++) {
            let url =
              `https://api.themoviedb.org/3/discover/movie?` +
              `api_key=${API_KEY}&language=pl-PL&include_adult=false` +
              `&sort_by=popularity.desc&page=${p}`;
            if (providerParam) {
              url += `&with_watch_providers=${providerParam}&watch_region=PL`;
            }
            promises.push(
              fetch(url)
                .then((res) => res.json())
                .then((data) => data.results || [])
            );
          }
          const pages = await Promise.all(promises);
          filtered = dedupeAndFilter(pages.flat());
        }

        const shuffled = shuffleArray(filtered);
        setMoviePool(shuffled);
        setPoolIndex(0);
        setIsPoolReady(true);
      } catch (err) {
        console.error('Błąd budowania puli filmów (solo):', err);
        setSnack({ open: true, message: 'Nie udało się załadować filmów', variant: 'danger' });
        setMoviePool([]);
        setPoolIndex(0);
        setIsPoolReady(true);
      }
    })();
  }, [screen, mode, selectedGenres, selectedProviders, dislikedIds]);

  const shuffleArray = (array) => {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const resetGame = () => {
    setSelectedGenres([]);
    setSelectedProviders([]);
    setMoviePool([]);
    setPoolIndex(0);
    setIsPoolReady(false);
    setFavorites([]);
    setFinals([]);
    setUseTrailer(false);
    setModalInfo(false);
    setDetails(null);
    setDislikedIds([]);
  };

  const renderGenres = (ids) => ids.map((id) => genres[id]).join(', ');

  const handleFavoriteLocal = (movie) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  // --- BACKEND: sesja i wspólny deck ---

  const createPairSession = async (nameRaw) => {
    const name = nameRaw.trim() || 'Sesja filmowa';
    try {
      const res = await fetch(`${API_BASE}?action=createSession`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Błąd tworzenia sesji');
      }
      setSessionId(data.sessionId);
      setSessionName(name);
      setPlayerNumber(1);
      setSnack({
        open: true,
        message: `Sesja utworzona. Kod: ${data.sessionId}`,
        variant: 'primary',
      });
      // od razu przechodzimy do wyboru gatunków
      setScreen('setup');
    } catch (e) {
      console.error(e);
      setSnack({
        open: true,
        message: e.message || 'Nie udało się utworzyć sesji',
        variant: 'danger',
      });
    }
  };

  const joinPairSession = async (codeRaw) => {
    const code = (codeRaw || '').toUpperCase().trim();
    if (!code) {
      setSnack({ open: true, message: 'Podaj kod sesji', variant: 'warning' });
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE}?action=getSession&sessionId=${encodeURIComponent(code)}`
      );
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Sesja nie istnieje');
      }
      setSessionId(code);
      setSessionName(data.session?.name || code);
      setPlayerNumber(2);
      setSnack({
        open: true,
        message: `Dołączono do sesji: ${data.session?.name || code}`,
        variant: 'primary',
      });
      setScreen('setup');
    } catch (e) {
      console.error(e);
      setSnack({
        open: true,
        message: e.message || 'Nie udało się dołączyć do sesji',
        variant: 'danger',
      });
    }
  };

  /**
   * Generuje WSPÓLNY deck filmów dla trybu par i zapisuje go w backendzie.
   * - używa wspólnych gatunków (commonGenres) – jeśli są
   * - jeśli nie ma wspólnych gatunków -> bierze popularne filmy
   * - używa providerów wybranych przez gracza 1 (player 2 nie wybiera platform)
   */
  const generateAndSendSharedPool = async (common, providersForDeck = []) => {
    let genresToUse = common || [];
    const providerParam = (providersForDeck || []).join('|');

    const dedupe = (moviesArray) => {
      const unique = [];
      const seenIds = new Set();
      moviesArray.forEach((m) => {
        if (!seenIds.has(m.id)) {
          unique.push(m);
          seenIds.add(m.id);
        }
      });
      return unique;
    };

    let combined = [];

    try {
      if (genresToUse.length > 0) {
        const promises = [];
        genresToUse.forEach((genreId) => {
          for (let p = 1; p <= 3; p++) {
            let url =
              `https://api.themoviedb.org/3/discover/movie?` +
              `api_key=${API_KEY}&language=pl-PL&include_adult=false` +
              `&sort_by=popularity.desc&with_genres=${genreId}` +
              `&page=${p}`;
            if (providerParam) {
              url += `&with_watch_providers=${providerParam}&watch_region=PL`;
            }
            promises.push(
              fetch(url)
                .then((res) => {
                  if (!res.ok) throw new Error('Błąd TMDb');
                  return res.json();
                })
                .then((data) => data.results || [])
            );
          }
        });
        const pages = await Promise.all(promises);
        combined = pages.flat();
      } else {
        const promises = [];
        for (let p = 1; p <= 3; p++) {
          let url =
            `https://api.themoviedb.org/3/discover/movie?` +
            `api_key=${API_KEY}&language=pl-PL&include_adult=false` +
            `&sort_by=popularity.desc&page=${p}`;
          if (providerParam) {
            url += `&with_watch_providers=${providerParam}&watch_region=PL`;
          }
          promises.push(
            fetch(url)
              .then((res) => res.json())
              .then((data) => data.results || [])
          );
        }
        const pages = await Promise.all(promises);
        combined = pages.flat();
      }

      const filtered = dedupe(combined);
      const shuffled = shuffleArray(filtered);
      setMoviePool(shuffled);
      setPoolIndex(0);
      setIsPoolReady(true);

      // zapisz deck w backendzie, żeby partner dostał dokładnie to samo
      await fetch(`${API_BASE}?action=updateGenres`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          player: playerNumber,
          genres: selectedGenres,
          moviePool: shuffled,
        }),
      });
    } catch (err) {
      console.error('Błąd generowania wspólnej puli:', err);
      setSnack({
        open: true,
        message: 'Nie udało się wygenerować wspólnej puli filmów',
        variant: 'danger',
      });
      setMoviePool([]);
      setPoolIndex(0);
      setIsPoolReady(true);
    }
  };

  const handleSetupNext = async () => {
    if (selectedGenres.length === 0) {
      setSnack({
        open: true,
        message: 'Wybierz przynajmniej jeden gatunek!',
        variant: 'warning',
      });
      return;
    }

    if (mode === 'solo' || !sessionId) {
      setScreen('game');
      return;
    }

    // tryb par – wysyłamy gatunki na backend
    try {
      const res = await fetch(`${API_BASE}?action=updateGenres`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          player: playerNumber,
          genres: selectedGenres,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Błąd zapisu gatunków');
      }

      const { bothHaveGenres, commonGenres: common, hasMoviePool, moviePool: pool } = data;
      setCommonGenres(common || []);

      if (!bothHaveGenres) {
        // druga osoba jeszcze nie podała gatunków
        setScreen('pairWaitingGenres');
        return;
      }

      // oboje mają już gatunki:
      if (hasMoviePool && Array.isArray(pool) && pool.length > 0) {
        // wspólny deck już istnieje – pobieramy go
        setMoviePool(pool);
        setPoolIndex(0);
        setIsPoolReady(true);
        setScreen('game');
      } else {
        // deck jeszcze nie istnieje
        if (playerNumber === 1) {
          // tylko gracz 1 generuje wspólną pulę
          await generateAndSendSharedPool(common || [], selectedProviders);
          setScreen('game');
        } else {
          // gracz 2 tylko czeka, aż backend dostanie deck od gracza 1
          setScreen('pairWaitingGenres');
        }
      }
    } catch (e) {
      console.error(e);
      setSnack({
        open: true,
        message: e.message || 'Nie udało się zapisać gatunków',
        variant: 'danger',
      });
    }
  };

  // pair: kończenie swipowania
  const finishPairMode = async (currentFavorites) => {
    if (!sessionId) {
      setScreen('final');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}?action=updateFavorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          player: playerNumber,
          favorites: currentFavorites.map((f) => ({
            id: f.id,
            title: f.title,
            poster_path: f.poster_path,
            genre_ids: f.genre_ids,
            vote_average: f.vote_average,
            overview: f.overview,
          })),
          done: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Błąd zapisu typów');
      }

      if (data.bothDone && Array.isArray(data.finals)) {
        setFinals(data.finals);
        setScreen('final');
      } else {
        setScreen('pairWaitingPartner');
      }
    } catch (e) {
      console.error('Błąd finishPairMode:', e);
      setSnack({
        open: true,
        message: e.message || 'Nie udało się zakończyć sesji',
        variant: 'danger',
      });
    }
  };

  const handleNext = (liked) => {
    if (!isPoolReady) return;

    const currentMovie = moviePool[poolIndex];
    if (!currentMovie) return;

    if (!liked) {
      setDislikedIds((prev) => [...prev, currentMovie.id]);
    }

    let newFavorites = favorites;
    if (liked) {
      newFavorites = [...favorites, currentMovie];
      setFavorites(newFavorites);
    }

    // Jeśli mamy już wystarczająco typów – przechodzimy do podsumowania
    if (newFavorites.length >= 5) {
      if (mode === 'pair') {
        // tryb par – finały liczy backend
        finishPairMode(newFavorites);
      } else {
        // SOLO – liczymy rekomendacje lokalnie
        (async () => {
          try {
            const recPromises = newFavorites.map((fav) =>
              fetch(
                `https://api.themoviedb.org/3/movie/${fav.id}/recommendations?api_key=${API_KEY}&language=pl-PL`
              )
                .then((res) => {
                  if (!res.ok) throw new Error(`HTTP ${res.status}`);
                  return res.json();
                })
                .then((data) => data.results || [])
            );

            const recArrays = await Promise.all(recPromises);
            const allRecs = recArrays.flat();

            const freqMap = {};
            allRecs.forEach((r) => {
              if (!r || !r.id) return;
              freqMap[r.id] = (freqMap[r.id] || 0) + 1;
            });

            const uniqueRecsById = {};
            allRecs.forEach((r) => {
              if (!uniqueRecsById[r.id]) {
                uniqueRecsById[r.id] = r;
              }
            });

            const recsWithCount = Object.entries(freqMap).map(([id, count]) => {
              return { movie: uniqueRecsById[id], count };
            });

            recsWithCount.sort((a, b) => {
              if (b.count !== a.count) return b.count - a.count;
              return (b.movie.vote_average || 0) - (a.movie.vote_average || 0);
            });

            const existingLikedIds = new Set(newFavorites.map((f) => f.id));
            const resultFiltered = recsWithCount
              .map((r) => r.movie)
              .filter((m) => !existingLikedIds.has(m.id) && !dislikedIds.includes(m.id));

            const filteredByGenre = resultFiltered.filter((m) =>
              m.genre_ids?.some((g) => selectedGenres.includes(g))
            );

            const top3 = filteredByGenre.slice(0, 3);
            setFinals(top3);
            setScreen('final');
          } catch (err) {
            console.error('Błąd pobierania rekomendacji final (solo):', err);
            setSnack({
              open: true,
              message: 'Nie udało się pobrać rekomendacji',
              variant: 'danger',
            });
            setScreen('final');
          }
        })();
      }
      return;
    }

    // kolejny film
    const nextIndex = poolIndex + 1;
    if (nextIndex < moviePool.length) {
      setPoolIndex(nextIndex);
    } else {
      setPoolIndex(0);
    }
  };

  // ------------- UI --------------

  const genreList = Object.entries(genres);

  return (
    <CssVarsProvider theme={theme} defaultMode="light">
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert variant={snack.variant}>{snack.message}</Alert>
      </Snackbar>

      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: 'radial-gradient(circle at top left,#1b1b1d,#4b0f1e,#1f0036,#000428)',
          color: 'white',
          p: 0,
          overflowX: 'hidden',
        }}
      >
        {/* HEADER */}
        <Box
          component="section"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'auto 1fr auto',
              sm: 'auto 1fr auto',
            },
            alignItems: 'center',
            columnGap: 2,
            rowGap: { xs: 1, sm: 2 },
            px: { xs: 1.5, md: 4 },
            py: { xs: 2, md: 6 },
            color: 'white',
          }}
        >
          <Box
            component="img"
            src={logo2}
            alt="Filmder"
            onClick={() => setScreen('home')}
            sx={{
              width: { xs: 52, sm: 70, md: 90 },
              height: 'auto',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          />

          <Box sx={{ textAlign: 'center', px: { xs: 1, md: 2 } }}>
            <Typography
              level="h1"
              component="h1"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.6rem', md: '3.5rem' },
                fontWeight: 'bold',
                lineHeight: 1.1,
              }}
            >
              Filmder
            </Typography>
            {screen === 'home' && (
              <Typography
                level="body1"
                sx={{
                  mt: 0.5,
                  fontSize: { xs: '0.85rem', sm: '1.05rem' },
                  maxWidth: 520,
                  mx: 'auto',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                Nie wiesz, co obejrzeć? Filmder pomoże Ci znaleźć idealny film – solo albo w duecie.
                W trybie par oboje widzicie ten sam zestaw filmów, a wspólne propozycje pojawią się
                dopiero, gdy każde z Was skończy swipować.
              </Typography>
            )}
          </Box>

          {/* PRAWE IKONY */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifySelf: 'flex-end',
            }}
          >
            {[
              {
                onClick: () => setScreen('favorites'),
                src: profileicon,
                alt: 'Ulubione',
              },
              {
                onClick: () => setScreen('database'),
                src: film,
                alt: 'Baza filmów',
              },
              {
                onClick: () => setScreen('info'),
                src: info,
                alt: 'Informacje',
              },
            ].map(({ onClick, src, alt }) => (
              <IconButton
                key={alt}
                onClick={onClick}
                sx={{
                  p: 0.5,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.15)',
                  },
                  '&:hover img': {
                    filter: 'brightness(0)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={alt}
                  sx={{
                    width: 26,
                    height: 26,
                    transition: 'filter 0.2s',
                  }}
                />
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* ULUBIONE (lokalne) */}
        {screen === 'favorites' && (
          <Box sx={{ px: { xs: 1.5, md: 4 }, py: { xs: 3, md: 4 } }}>
            <Typography level="h2" sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Ulubione (to urządzenie)
            </Typography>
            {favorites.length === 0 ? (
              <Typography level="body1" sx={{ mb: 3 }}>
                Nie masz jeszcze żadnych ulubionych filmów. Zacznij grać w trybie solo lub dla par.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {favorites.map((m) => (
                  <Card
                    key={m.id}
                    sx={{
                      width: { xs: 120, sm: 140, md: 150 },
                      position: 'relative',
                      bgcolor: 'rgba(0,0,0,0.4)',
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                      alt={m.title}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <Typography
                      level="body2"
                      sx={{ p: 1, textAlign: 'center', fontSize: '0.8rem' }}
                    >
                      {m.title}
                    </Typography>
                  </Card>
                ))}
              </Box>
            )}
            <Box sx={{ mt: 4 }}>
              <Button variant="outlined" onClick={() => setScreen('home')}>
                Powrót
              </Button>
            </Box>
          </Box>
        )}

        {/* HOME */}
        {screen === 'home' && (
          <Box sx={{ textAlign: 'center', px: 2, py: { xs: 3, md: 6 } }}>
            <Typography
              level="h2"
              sx={{
                fontSize: { xs: '1.6rem', md: '2.3rem' },
                fontWeight: 'bold',
                mb: { xs: 3, md: 4 },
              }}
            >
              Wybierz jeden z trybów
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gap: { xs: 2.5, md: 4 },
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: 'repeat(3,1fr)',
                },
              }}
            >
              {[
                {
                  title: 'Zagraj Solo',
                  text: 'Przesuwaj filmy w lewo lub w prawo. Na podstawie Twoich wyborów Filmder dobierze propozycje.',
                  img: zagrajsolo,
                  onClick: () => {
                    resetGame();
                    setMode('solo');
                    setSessionId(null);
                    setSessionName('');
                    setCommonGenres([]);
                    setScreen('setup');
                  },
                },
                {
                  title: 'Zagraj z partnerem',
                  text: 'Jedna osoba tworzy kod sesji, druga go wpisuje. Oboje widzicie ten sam stack filmów i dostajecie wspólne propozycje.',
                  img: zagrajzpartnerem,
                  onClick: () => {
                    resetGame();
                    setMode('pair');
                    setScreen('pairLobby');
                  },
                },
                {
                  title: 'Przejdź do bazy',
                  text: 'Przeglądaj bazę filmów – opisy, gatunki i oceny.',
                  img: przejdzdobazy,
                  onClick: () => setScreen('database'),
                },
              ].map(({ title, text, img, onClick }) => (
                <Card
                  key={title}
                  variant="plain"
                  onClick={onClick}
                  sx={{
                    p: { xs: 1.5, md: 2 },
                    bgcolor: 'rgba(28,28,30,0.9)',
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: '0px 4px 14px rgba(0,0,0,0.7)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0px 8px 20px rgba(0,0,0,0.9)',
                    },
                  }}
                >
                  <Box>
                    <Typography
                      level="h4"
                      sx={{
                        mb: 1,
                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      level="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.85)',
                        mb: 1.5,
                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                      }}
                    >
                      {text}
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    src={img}
                    alt={title}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: { xs: 130, sm: 150 },
                      objectFit: 'contain',
                      borderRadius: 1,
                      mt: 1.5,
                    }}
                  />
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* LOBBY DLA PAR */}
        {screen === 'pairLobby' && (
          <Box sx={{ px: { xs: 1.5, md: 6 }, py: { xs: 3, md: 4 } }}>
            <Typography
              level="h2"
              sx={{
                textAlign: 'center',
                mb: 2,
                fontSize: { xs: '1.6rem', md: '2rem' },
              }}
            >
              Tryb dla par
            </Typography>
            <Typography
              level="body2"
              sx={{
                textAlign: 'center',
                mb: 3,
                color: 'rgba(255,255,255,0.8)',
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              Jedna osoba zakłada sesję (host) i wybiera też platformy streamingowe. Druga osoba
              wpisuje kod. Potem oboje wybieracie gatunki, dostajecie ten sam stack filmów i na
              końcu wspólne propozycje.
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 2.5, md: 4 },
              }}
            >
              {/* Utwórz sesję */}
              <Card
                variant="plain"
                sx={{
                  p: 3,
                  bgcolor: '#1c1c1e',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
                }}
              >
                <Typography level="h4" sx={{ mb: 1.5 }}>
                  Utwórz sesję (host)
                </Typography>
                <Typography level="body2" sx={{ mb: 2, fontSize: '0.9rem', color:"white" }}>
                  Nadaj nazwę Waszej sesji (np. „Wieczór na kanapie”). Po utworzeniu dostaniesz
                  krótki kod, który przekażesz partnerowi. Od razu przejdziesz do wyboru gatunków.
                </Typography>
                <Input
                  placeholder="Nazwa sesji"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  sx={{
                    mb: 2,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    fontSize: '0.9rem',
                  }}
                />
                <Button variant="solid" onClick={() => createPairSession(sessionName)}>
                  Utwórz i przejdź dalej
                </Button>
              </Card>

              {/* Dołącz do sesji */}
              <Card
                variant="plain"
                sx={{
                  p: 3,
                  bgcolor: '#1c1c1e',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
                }}
              >
                <Typography level="h4" sx={{ mb: 1.5 }}>
                  Dołącz do sesji
                </Typography>
                <Typography level="body2" sx={{ mb: 2, fontSize: '0.9rem', color:"white" }}>
                  Wpisz kod, który poda Ci partner. Po dołączeniu przejdziesz od razu do wyboru
                  gatunków – stack i platformy ustawia host.
                </Typography>
                <Input
                  placeholder="Kod sesji (np. G7KF29)"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  sx={{
                    mb: 2,
                    bgcolor: 'rgba(255,255,255,0.95)',
                    textTransform: 'uppercase',
                    fontSize: '0.9rem',
                  }}
                />
                <Button variant="solid" onClick={() => joinPairSession(joinCode)}>
                  Dołącz
                </Button>
              </Card>
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button variant="outlined" onClick={() => setScreen('home')}>
                Powrót
              </Button>
            </Box>
          </Box>
        )}

        {/* EKRAN: czekamy aż druga osoba wybierze gatunki */}
        {screen === 'pairWaitingGenres' && (
          <Box sx={{ px: { xs: 2, md: 4 }, py: 6, textAlign: 'center' }}>
            <Typography level="h2" sx={{ mb: 2, fontSize: { xs: '1.6rem', md: '2rem' } }}>
              Czekamy na drugą osobę
            </Typography>
            <Typography
              level="body1"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                mb: 3,
                fontSize: { xs: '0.95rem', md: '1rem' },
              }}
            >
              Twoje gatunki zostały zapisane. Gdy partner również wybierze swoje gatunki, host
              wygeneruje wspólny zestaw filmów, który zobaczycie oboje – w tej samej kolejności.
            </Typography>
            {sessionId && (
              <Typography level="body2" sx={{ mb: 3 }}>
                Kod sesji: <strong>{sessionId}</strong>
              </Typography>
            )}
            <CircularProgress />
          </Box>
        )}

        {/* EKRAN: czekamy aż partner skończy swipa */}
        {screen === 'pairWaitingPartner' && (
          <Box sx={{ px: { xs: 2, md: 4 }, py: 6, textAlign: 'center' }}>
            <Typography level="h2" sx={{ mb: 2, fontSize: { xs: '1.6rem', md: '2rem' } }}>
              Czekamy na partnera
            </Typography>
            <Typography
              level="body1"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                mb: 3,
                fontSize: { xs: '0.95rem', md: '1rem' },
              }}
            >
              Twoje typy zostały zapisane. Gdy partner zakończy swoje swipowanie w tej samej sesji,
              pokażemy Wam wspólne propozycje filmów.
            </Typography>
            {sessionId && (
              <Typography level="body2" sx={{ mb: 3 }}>
                Sesja: <strong>{sessionName || sessionId}</strong>
              </Typography>
            )}
            <CircularProgress />
          </Box>
        )}

        {/* SETUP */}
        {screen === 'setup' && (
          <Box
            sx={{
              width: '100%',
              maxWidth: 960,
              mx: 'auto',
              px: { xs: 1.5, sm: 2, md: 3 },
              py: { xs: 3, md: 4 },
            }}
          >
            <Typography sx={{ textAlign: 'center' }} level="h2">
              Wybierz ulubione gatunki filmowe
            </Typography>
            {mode === 'pair' && sessionId && (
              <Typography
                level="body2"
                sx={{
                  mt: 1,
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                Sesja: <strong>{sessionName || sessionId}</strong> &middot; Gracz {playerNumber}
              </Typography>
            )}
            <Typography
              level="body2"
              sx={{
                mt: 1,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
              }}
            >
              Wybierz maksymalnie 3 gatunki. W trybie par, na podstawie wspólnej części gatunków
              powstanie jeden zestaw filmów dla Was obojga.
            </Typography>

            <Box sx={{ position: 'relative', my: 3 }}>
              <IconButton
                onClick={() => scrollGenres(-1)}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                <ChevronLeftIcon sx={{ color: 'white' }} />
              </IconButton>

              <Box
                ref={genreRef}
                sx={{
                  display: 'flex',
                  gap: 1,
                  px: 1,
                  overflowX: { xs: 'visible', sm: 'auto' },
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {genreList.map(([id, name]) => (
                  <Button
                    key={id}
                    variant={selectedGenres.includes(+id) ? 'solid' : 'outlined'}
                    onClick={() =>
                      setSelectedGenres((prev) =>
                        prev.includes(+id)
                          ? prev.filter((x) => x !== +id)
                          : prev.length < 3
                          ? [...prev, +id]
                          : prev
                      )
                    }
                    sx={{
                      flex: '0 0 auto',
                      minWidth: { xs: 'auto', sm: 100 },
                      px: { xs: 1.2, sm: 2 },
                      py: 0.8,
                      whiteSpace: 'nowrap',
                      mb: { xs: 1, sm: 0 },
                      fontSize: '0.85rem',
                    }}
                  >
                    {name}
                  </Button>
                ))}
              </Box>

              <IconButton
                onClick={() => scrollGenres(1)}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                <ChevronRightIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>

            {/* PLATFORMY – tylko SOLO + host w trybie pair */}
            <Typography sx={{ textAlign: 'center', mt: 1 }} level="h2">
              Platformy streamingowe
            </Typography>

            {mode === 'pair' && playerNumber === 2 ? (
              <Box
                sx={{
                  mt: 2,
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(0,0,0,0.4)',
                  textAlign: 'center',
                  fontSize: '0.9rem',
                }}
              >
                <Typography level="body2" sx={{ mb: 0.5 }}>
                  Platformy ustawia <strong>Gracz 1 (host)</strong>.
                </Typography>
                <Typography level="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                  Ty wybierasz tylko gatunki. Stack filmów jest już filtrowany według platform
                  hosta i będzie identyczny u Was obojga.
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  bg: '#1c1c1e',
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 2,
                  my: 3,
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr 1fr',
                    sm: 'repeat(auto-fill, minmax(140px, 1fr))',
                  },
                  gap: { xs: 1.5, md: 2 },
                  justifyItems: 'center',
                }}
              >
                {PROVIDERS.map((p) => (
                  <FormControl
                    key={p.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      width: '100%',
                    }}
                  >
                    <Checkbox
                      label={p.name}
                      checked={selectedProviders.includes(p.id)}
                      onChange={() =>
                        setSelectedProviders((prev) =>
                          prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id]
                        )
                      }
                      sx={{ color: 'white', fontSize: '0.9rem' }}
                    />
                  </FormControl>
                ))}
              </Box>
            )}

            <Box
              sx={{
                textAlign: 'center',
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                mt: 1,
              }}
            >
              <Button variant="outlined" onClick={() => setScreen('home')} sx={{ mr: 1 }}>
                Wstecz
              </Button>
              <Button
                variant="solid"
                size="lg"
                onClick={handleSetupNext}
                disabled={selectedGenres.length === 0}
                sx={{
                  opacity: selectedGenres.length === 0 ? 0.6 : 1,
                  cursor: selectedGenres.length === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                PRZEJDŹ DALEJ
              </Button>
            </Box>
          </Box>
        )}

        {/* GAME */}
        {screen === 'game' && (
          <Box
            sx={{
              display: { xs: 'block', sm: 'flex' },
              gap: { xs: 2, md: 3 },
              px: { xs: 1.5, sm: 2, md: 4 },
              py: { xs: 2, sm: 3 },
            }}
          >
            {/* LEWA KOLUMNA – typy (na mobile głównie karuzela) */}
            <Box sx={{ width: { xs: '100%', sm: 240 }, mb: { xs: 2.5, sm: 0 } }}>
              <Typography
                level="h4"
                sx={{ mb: 1, textAlign: ['center', 'left'], fontSize: { xs: '1.2rem', md: '1.4rem' } }}
              >
                Twoje typy
              </Typography>

              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <FavoritesCarousel favorites={favorites} />
              </Box>

              <Box
                sx={{
                  display: { xs: 'none', sm: 'grid' },
                  gridTemplateColumns: '1fr',
                  gap: 2,
                  overflowY: 'auto',
                  maxHeight: '60vh',
                  pr: 1,
                }}
              >
                {favorites.map((f) => (
                  <Card key={f.id} sx={{ backgroundColor: 'rgba(28,28,30,0.9)' }}>
                    <Box
                      sx={{ width: '100%', height: '6rem', overflow: 'hidden', borderRadius: 1 }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${f.poster_path}`}
                        alt={f.title}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </Box>
                    <Typography
                      level="body2"
                      sx={{ color: 'white', textAlign: 'center', mt: 1 }}
                    >
                      {f.title}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* ŚRODKOWA KOLUMNA – karta filmu */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: { xs: 'auto', sm: '60vh' },
                mb: { xs: 2, sm: 0 },
              }}
            >
              {!isPoolReady ? (
                <CircularProgress color="primary" />
              ) : moviePool.length === 0 ? (
                <Typography
                  level="body1"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: { xs: '0.95rem', md: '1rem' },
                  }}
                >
                  Brak filmów do wyświetlenia dla wybranych kryteriów. Wróć i wybierz inne gatunki
                  lub platformy.
                </Typography>
              ) : (
                (() => {
                  const currentMovie = moviePool[poolIndex];

                  return (
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: { xs: 360, sm: 440, md: 520 },
                        mx: 'auto',
                      }}
                    >
                      <FormControl
                        orientation="horizontal"
                        sx={{
                          mb: 1.5,
                          gap: 1,
                          justifyContent: 'flex-end',
                        }}
                      >
                        <FormLabel
                          sx={{
                            color: 'white',
                            fontSize: '0.85rem',
                            mr: 0.5,
                          }}
                        >
                          Trailer zamiast plakatu
                        </FormLabel>
                        <Switch
                          checked={useTrailer}
                          onChange={(e) => setUseTrailer(e.target.checked)}
                        />
                      </FormControl>

                      <Card
                        sx={{
                          position: 'relative',
                          mx: 'auto',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '20px',
                          p: { xs: 1.5, sm: 2 },
                          overflow: 'hidden',
                        }}
                      >
                        <MediaContainer
                          key={currentMovie?.id}
                          useTrailer={useTrailer}
                          trailerKey={trailer}
                          posterPath={currentMovie?.poster_path}
                        />

                        {currentMovie && likedIds.includes(currentMovie.id) && (
                          <Chip
                            startDecorator={<FavoriteIcon />}
                            size="md"
                            variant="soft"
                            color="success"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              px: 1.5,
                              py: 0.5,
                              fontWeight: 'bold',
                              fontSize: '0.8rem',
                              backdropFilter: 'blur(10px)',
                              bgcolor: 'rgba(76,175,80,0.2)',
                              color: 'red',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            }}
                          >
                            Polubione
                          </Chip>
                        )}

                        <CardContent sx={{ pt: 1.5 }}>
                          <Typography
                            level="h3"
                            sx={{
                              mb: 0.5,
                              fontWeight: 'bold',
                              fontSize: { xs: '1.2rem', md: '1.4rem' },
                            }}
                          >
                            {currentMovie?.title}
                          </Typography>
                          <Typography
                            level="body2"
                            sx={{
                              color: 'white',
                              mb: 1,
                              fontSize: '0.9rem',
                            }}
                          >
                            Ocena: {currentMovie?.vote_average} &middot;{' '}
                            {currentMovie?.release_date}
                          </Typography>

                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: 2.5,
                              mt: 1,
                            }}
                          >
                            <Button
                              size="lg"
                              variant="plain"
                              sx={{
                                width: 54,
                                height: 54,
                                borderRadius: '50%',
                                p: 0,
                                bgcolor: '#4A3FFF',
                                '&:hover': { bgcolor: '#3B30CC' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onClick={() => handleNext(false)}
                            >
                              <Box
                                component="img"
                                src={ThumbsDown}
                                alt="Nie lubię"
                                sx={{ width: 22, height: 22 }}
                              />
                            </Button>

                            <Button
                              size="lg"
                              variant="plain"
                              sx={{
                                width: 54,
                                height: 54,
                                borderRadius: '50%',
                                p: 0,
                                bgcolor: '#8C3FED',
                                '&:hover': { bgcolor: '#6B2DBB' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onClick={() => handleNext(true)}
                            >
                              <Box
                                component="img"
                                src={ThumbsUp}
                                alt="Lubię"
                                sx={{ width: 22, height: 22 }}
                              />
                            </Button>

                            <Button
                              size="lg"
                              variant="plain"
                              sx={{
                                width: 54,
                                height: 54,
                                borderRadius: '50%',
                                p: 0,
                                bgcolor: '#B71C1C',
                                '&:hover': { bgcolor: '#8F1717' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onClick={() => handleFavoriteLocal(currentMovie)}
                            >
                              <Box
                                component="img"
                                src={Heart}
                                alt="Ulubione"
                                sx={{ width: 22, height: 22 }}
                              />
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>

                      <Modal open={modalInfo} onClose={() => setModalInfo(false)}>
                        <ModalDialog>
                          <IconButton onClick={() => setModalInfo(false)}>
                            <CloseRoundedIcon />
                          </IconButton>
                          {details && (
                            <Box sx={{ p: 2 }}>
                              <Typography level="h3" sx={{ mb: 1 }}>
                                {details.title}
                              </Typography>
                              <Typography>{details.overview}</Typography>
                            </Box>
                          )}
                        </ModalDialog>
                      </Modal>
                    </Box>
                  );
                })()
              )}
            </Box>
          </Box>
        )}

        {/* DATABASE */}
        {screen === 'database' && (
          <Box
            sx={{
              px: { xs: 1.5, sm: 2, md: 4 },
              py: { xs: 3, md: 4 },
              color: 'white',
              minHeight: '100vh',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <IconButton
                onClick={() => {
                  setScreen('home');
                  setDbPage(1);
                  setDbQuery('');
                  setDbSelectedGenres([]);
                }}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  mr: 1,
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: '1.6rem', md: '2.1rem' },
                  fontWeight: 'bold',
                }}
              >
                Baza Filmów
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                setDbPage(1);
              }}
              sx={{
                mb: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1,
                }}
              >
                <Input
                  placeholder="Wpisz tytuł filmu..."
                  value={dbQuery}
                  onChange={(e) => setDbQuery(e.target.value)}
                  startDecorator={<SearchIcon sx={{ color: 'rgba(255,255,255,0.6)' }} />}
                  sx={{
                    flexGrow: 1,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    '& .MuiInput-input': { color: 'white' },
                    borderRadius: 1,
                  }}
                />
                <Button
                  variant="solid"
                  type="submit"
                  sx={{ bgcolor: '#D32F2F', width: { xs: '100%', sm: 'auto' } }}
                >
                  Szukaj
                </Button>
              </Box>

              <Typography
                level="body2"
                sx={{
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                Filtruj po gatunkach (max 3):
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr 1fr',
                    sm: 'repeat(4, 1fr)',
                    md: 'repeat(6, 1fr)',
                  },
                  gap: 1,
                }}
              >
                {dbGenresList.map(({ id, name }) => (
                  <FormControl
                    key={id}
                    orientation="horizontal"
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      size="sm"
                      checked={dbSelectedGenres.includes(id)}
                      onChange={() => {
                        setDbPage(1);
                        setDbSelectedGenres((prev) => {
                          if (prev.includes(id)) return prev.filter((x) => x !== id);
                          if (prev.length >= 3) return prev;
                          return [...prev, id];
                        });
                      }}
                      sx={{
                        color: 'white',
                        '&.Mui-checked': { color: '#F48FB1' },
                      }}
                    />
                    <FormLabel
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '0.8rem',
                      }}
                    >
                      {name}
                    </FormLabel>
                  </FormControl>
                ))}
              </Box>
            </Box>

            {dbLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  py: 8,
                }}
              >
                <CircularProgress color="neutral" />
              </Box>
            ) : dbError ? (
              <Typography
                level="body1"
                color="danger"
                sx={{
                  textAlign: 'center',
                  py: 8,
                  fontSize: '1rem',
                }}
              >
                {dbError}
              </Typography>
            ) : (
              <>
                {dbResults.length === 0 ? (
                  <Typography
                    level="body1"
                    sx={{
                      textAlign: 'center',
                      py: 8,
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '1rem',
                    }}
                  >
                    Brak wyników dla podanych kryteriów.
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: 'repeat(3,1fr)',
                      },
                      gap: 3,
                    }}
                  >
                    {dbResults.map((movie) => (
                      <Card
                        key={movie.id}
                        variant="outlined"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 2,
                          overflow: 'hidden',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                              : 'https://via.placeholder.com/300x450?text=Brak+Zdjęcia'
                          }
                          alt={movie.title}
                          sx={{
                            width: '100%',
                            height: 280,
                            objectFit: 'cover',
                            bgcolor: 'rgba(255,255,255,0.05)',
                          }}
                        />
                        <CardContent sx={{ py: 2, px: 2 }}>
                          <Typography
                            level="h5"
                            sx={{
                              mb: 0.5,
                              fontWeight: 'bold',
                              fontSize: '1.05rem',
                              color: 'white',
                            }}
                          >
                            {movie.title}
                          </Typography>
                          <Typography
                            level="body2"
                            sx={{
                              color: 'rgba(255,255,255,0.7)',
                              mb: 1,
                              fontSize: '0.85rem',
                            }}
                          >
                            {movie.release_date || '—'} &middot; ⭐ {movie.vote_average || '—'}
                          </Typography>
                          <Typography
                            level="body3"
                            noWrap
                            sx={{
                              color: 'rgba(255,255,255,0.7)',
                              fontSize: '0.8rem',
                            }}
                          >
                            {movie.overview || 'Brak opisu.'}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}

                {dbResults.length > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 2,
                      mt: 4,
                    }}
                  >
                    <Button
                      size="md"
                      variant="outlined"
                      startDecorator={<ChevronLeftIcon />}
                      disabled={dbPage <= 1}
                      sx={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        '&:disabled': { opacity: 0.4 },
                      }}
                      onClick={() => setDbPage((prev) => Math.max(prev - 1, 1))}
                    >
                      Poprzednia
                    </Button>

                    <Typography
                      level="body2"
                      sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}
                    >
                      Strona {dbPage} z {dbTotalPages}
                    </Typography>

                    <Button
                      size="md"
                      variant="outlined"
                      endDecorator={<ChevronRightIcon />}
                      disabled={dbPage >= dbTotalPages}
                      sx={{
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        '&:disabled': { opacity: 0.4 },
                      }}
                      onClick={() => setDbPage((prev) => Math.min(prev + 1, dbTotalPages))}
                    >
                      Następna
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        )}

        {/* INFO */}
        {screen === 'info' && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              py: 6,
              background: 'none',
            }}
          >
            <Card
              variant="plain"
              sx={{
                width: { xs: '94%', sm: '90%', md: '80%', lg: '60%' },
                bgcolor: '#1c1c1e',
                border: 'none',
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
                p: { xs: 3, md: 5 },
              }}
            >
              <Typography
                level="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '1.9rem', md: '2.6rem' },
                  fontWeight: 'bold',
                  textAlign: 'center',
                  mb: 2,
                  color: 'white',
                }}
              >
                O nas
              </Typography>

              <Typography
                level="body1"
                sx={{
                  maxWidth: 800,
                  mx: 'auto',
                  mb: 5,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.8)',
                  textAlign: 'center',
                  fontSize: { xs: '0.95rem', md: '1rem' },
                }}
              >
                Filmder to projekt stworzony z miłości do kina i… ciągłego pytania „co dziś obejrzeć?”.
                W trybie par dbamy o to, żebyście oboje widzieli ten sam zestaw filmów i dostawali
                identyczne wspólne propozycje – dopiero, gdy każde z Was skończy swipować.
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr 1fr',
                    sm: 'repeat(3,1fr)',
                    md: 'repeat(5,1fr)',
                  },
                  gap: { xs: 2, sm: 3, md: 4 },
                  justifyItems: 'center',
                }}
              >
                {[
                  { name: 'Damian Chymkowski', roles: [], img: Damian },
                  { name: 'Adrian Muniak', roles: [], img: Adrian },
                  { name: 'Wiktoria Sytniewska', roles: [], img: Wiktoria },
                  { name: 'Adrianna Konarska', roles: [], img: Adrianna },
                  { name: 'Sebastian Szwajnoch', roles: [], img: Sebastian },
                  { name: 'Maja Tarnawska', roles: [], img: Maja },
                ].map((member, i) => (
                  <Box key={i} sx={{ textAlign: 'center', maxWidth: 200 }}>
                    <Box
                      component="img"
                      src={member.img}
                      alt={member.name}
                      sx={{
                        width: { xs: 90, sm: 110 },
                        height: { xs: 90, sm: 110 },
                        borderRadius: 15,
                        objectFit: 'cover',
                        mb: 1.5,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                      }}
                    />
                    <Typography
                      level="h6"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        mb: 0.5,
                        color: 'white',
                      }}
                    >
                      {member.name}
                    </Typography>
                    {member.roles.map((r, idx) => (
                      <Typography
                        key={idx}
                        level="body2"
                        sx={{
                          color: idx === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
                          fontStyle: idx === 0 ? 'normal' : 'italic',
                          mb: idx === member.roles.length - 1 ? 0 : 0.5,
                        }}
                      >
                        {r}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Box>
            </Card>
          </Box>
        )}

        {/* FINAL */}
        {screen === 'final' && (
          <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
            <Typography
              level="h2"
              sx={{
                textAlign: 'center',
                mb: 3,
                color: 'white',
                fontSize: { xs: '1.8rem', md: '2.2rem' },
              }}
            >
              Podsumowanie
            </Typography>

            {mode === 'pair' && (
              <Box
                sx={{
                  maxWidth: 700,
                  mx: 'auto',
                  mb: 3,
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(0,0,0,0.45)',
                }}
              >
                <Typography
                  level="h4"
                  sx={{
                    mb: 1,
                    color: 'white',
                    textAlign: 'center',
                    fontSize: { xs: '1.3rem', md: '1.5rem' },
                  }}
                >
                  Tryb dla par
                </Typography>
                {sessionId ? (
                  <>
                    <Typography
                      level="body2"
                      sx={{
                        mb: 1,
                        color: 'rgba(255,255,255,0.85)',
                        textAlign: 'center',
                      }}
                    >
                      Sesja: <strong>{sessionName || sessionId}</strong>
                    </Typography>
                    <Typography
                      level="body2"
                      sx={{
                        mb: 1,
                        color: 'rgba(255,255,255,0.8)',
                        textAlign: 'center',
                        fontSize: '0.95rem',
                      }}
                    >
                      Te propozycje zostały obliczone na podstawie filmów, które oboje polubiliście
                      w tym samym stacku.
                    </Typography>
                  </>
                ) : (
                  <Typography
                    level="body2"
                    sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}
                  >
                    Tryb par, ale nie wykryto sesji – prawdopodobnie jesteś już poza nią.
                  </Typography>
                )}
              </Box>
            )}

            <Typography
              level="h4"
              sx={{
                mb: 2,
                color: 'white',
                textAlign: 'center',
                fontSize: { xs: '1.4rem', md: '1.6rem' },
              }}
            >
              Propozycje na dziś!
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: 'center',
                mb: 4,
              }}
            >
              {finals.map((f) => (
                <Card
                  key={f.id}
                  variant="plain"
                  sx={{
                    width: { xs: 170, sm: 190, md: 210 },
                    bgcolor: '#1c1c1e',
                    color: 'white',
                    borderRadius: 2,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: { xs: 220, sm: 240, md: '30vh' },
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${f.poster_path}`}
                      alt={f.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography level="h4" sx={{ mb: 0.5, fontSize: '1rem' }}>
                      {f.title}
                    </Typography>
                    <Typography level="body2" sx={{ mb: 0.5, fontSize: '0.85rem' }}>
                      Ocena: {f.vote_average}
                    </Typography>
                    {f.genre_ids && (
                      <Typography level="body2" sx={{ mb: 0.5, fontSize: '0.8rem' }}>
                        Gatunki: {renderGenres(f.genre_ids)}
                      </Typography>
                    )}
                    <Typography level="body2" sx={{ fontSize: '0.8rem' }}>
                      {f.overview?.length > 100 ? f.overview.slice(0, 100) + '…' : f.overview}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Typography
              level="h4"
              sx={{
                mb: 2,
                color: 'white',
                textAlign: 'center',
                fontSize: { xs: '1.4rem', md: '1.6rem' },
              }}
            >
              Twoje typy
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: 'center',
              }}
            >
              {favorites.map((f) => (
                <Card
                  key={f.id}
                  variant="plain"
                  sx={{
                    width: { xs: 170, sm: 190, md: 210 },
                    bgcolor: '#1c1c1e',
                    color: 'white',
                    borderRadius: 2,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: { xs: 220, sm: 240, md: '30vh' },
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${f.poster_path}`}
                      alt={f.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography level="h4" sx={{ mb: 0.5, fontSize: '1rem' }}>
                      {f.title}
                    </Typography>
                    <Typography level="body2" sx={{ mb: 0.5, fontSize: '0.85rem' }}>
                      Ocena: {f.vote_average}
                    </Typography>
                    {f.genre_ids && (
                      <Typography level="body2" sx={{ fontSize: '0.8rem' }}>
                        {renderGenres(f.genre_ids)}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  resetGame();
                  setScreen('home');
                }}
              >
                Wróć do startu
              </Button>
            </Box>
          </Box>
        )}

        {/* FOOTER */}
        <Box
          component="footer"
          sx={{
            mt: 'auto',
            pt: 5,
            pb: 4,
            px: { xs: 2, md: 8 },
            backgroundColor: '#111',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          <Box
            sx={{
              display: { xs: 'block', md: 'flex' },
              justifyContent: 'space-between',
              gap: 4,
              mb: 4,
            }}
          >
            <Box sx={{ mb: { xs: 2, md: 0 } }}>
              <Typography level="h6" sx={{ color: 'white', mb: 1 }}>
                Filmder
              </Typography>
              <Typography
                component="ul"
                level="body2"
                sx={{ listStyle: 'none', p: 0, m: 0, lineHeight: 1.8, fontSize: '0.9rem' }}
              >
                <li>O nas</li>
                <li>API</li>
                <li>GitHub</li>
              </Typography>
            </Box>

            <Box sx={{ mb: { xs: 2, md: 0 } }}>
              <Typography level="h6" sx={{ color: 'white', mb: 1 }}>
                Centrum pomocy
              </Typography>
              <Typography
                component="ul"
                level="body2"
                sx={{ listStyle: 'none', p: 0, m: 0, lineHeight: 1.8, fontSize: '0.9rem' }}
              >
                <li>Pomoc dla użytkowników</li>
                <li>Polityka plików “cookies”</li>
                <li>Ustawienia plików “cookies”</li>
              </Typography>
            </Box>

            <Box sx={{ mb: { xs: 2, md: 0 } }}>
              <Typography level="h6" sx={{ color: 'white', mb: 1 }}>
                Regulaminy
              </Typography>
              <Typography
                component="ul"
                level="body2"
                sx={{ listStyle: 'none', p: 0, m: 0, lineHeight: 1.8, fontSize: '0.9rem' }}
              >
                <li>Bezpieczeństwo</li>
                <li>Regulamin</li>
              </Typography>
            </Box>

            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography level="h6" sx={{ color: 'white', mb: 1 }}>
                SOCIAL MEDIA
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                {[WhatsAppIcon, YouTubeIcon, InstagramIcon, FacebookIcon, LinkedInIcon, EmojiObjectsIcon].map(
                  (icon, idx) => (
                    <IconButton key={idx} size="sm" sx={{ p: 0.5 }}>
                      <Box
                        component="img"
                        src={icon}
                        alt="SM"
                        sx={{ width: 24, height: 24, display: 'block' }}
                      />
                    </IconButton>
                  )
                )}
              </Box>
            </Box>
          </Box>

          <Typography
            level="body2"
            sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}
          >
            © {new Date().getFullYear()} Filmder. Wszelkie prawa zastrzeżone.
          </Typography>
        </Box>
      </Sheet>
    </CssVarsProvider>
  );
}
