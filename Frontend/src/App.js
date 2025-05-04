import React, { useEffect, useState, useRef } from 'react';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import MovieIcon from '@mui/icons-material/Movie';
import Switch from '@mui/joy/Switch';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/joy/CircularProgress';
import Input from '@mui/joy/Input';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Alert from '@mui/joy/Alert';
import Snackbar from '@mui/joy/Snackbar';
import Chip from '@mui/joy/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';

const API_KEY = 'YOUWISH!';
const API_BASE = 'https://filmder-9f342e7129fc.herokuapp.com'
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
        height: '60vh',
        maxHeight: 500,
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
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
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
              key={`${posterPath}-${useTrailer}`}
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
                display: imgLoaded ? 'block' : 'none',
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
          display: 'flex'
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
        {favorites.map((f, i) => (
          <Card
            key={i}
            sx={{
              flex: { xs: '0 0 80%', md: '0 0 auto' },
              scrollSnapAlign: 'center',
              backgroundColor: 'rgba(28,28,30,0.8)',
              borderRadius: 2,
            }}
          >
            <Box sx={{ width: '100%', height: { xs: '20vh', sm: '6rem' }, overflow: 'hidden', borderRadius: 1 }}>
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
          display: 'flex'
        }}
      >
        <ChevronRightIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [genres, setGenres] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [finals, setFinals] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [useTrailer, setUseTrailer] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [details, setDetails] = useState(null);
  const [providerLinks, setProviderLinks] = useState({});
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');

const [likedDetails, setLikedDetails] = useState([]);

const handleLogin = async e => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setSnack({ open: true, message: data.error || 'Błąd logowania', variant: 'danger' });
      return;
    }

    setUser({ id: data.userId, name: data.name, email: data.email, likedMovies: data.likedMovies });
    setSnack({ open: true, message: 'Zalogowano pomyślnie!', variant: 'primary' });
    setScreen('home');
  } catch (err) {
    console.error('Fetch error:', err);
    setSnack({ open: true, message: 'Błąd sieci', variant: 'danger' });
  }
};

  const [user, setUser] = useState(null);
const [snack, setSnack] = useState({ open: false, message: '', variant: 'solid' });
const [anchor, setAnchor] = useState(null);


const handleRegister = async (e) => {
  e.preventDefault();
  if (regPassword !== regConfirm) {
    setSnack({ open: true, message: 'Hasła nie są zgodne', variant: 'danger' });
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPassword,
        likedMovies: favorites.map(f => f.id),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setSnack({ open: true, message: data.error || 'Błąd rejestracji', variant: 'danger' });
      return;
    }
    setUser({ id: data.userId, name: regName, email: regEmail, likedMovies: [...favorites] });
    setSnack({ open: true, message: 'Rejestracja udana! Jesteś zalogowany.', variant: 'primary' });
    setScreen('home');
    setRegName(''); setRegEmail(''); setRegPassword(''); setRegConfirm('');
  } catch {
    setSnack({ open: true, message: 'Błąd sieci. Spróbuj później.', variant: 'danger' });
  }
};


  const genreRef = useRef(null);
  const scrollGenres = (direction) => {
    if (genreRef.current) {
      const scrollAmount = genreRef.current.offsetWidth;
      genreRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  const current = movies[index] || null;


  useEffect(() => {
    const stored = localStorage.getItem('filmderUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('filmderUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('filmderUser');
    }
  }, [user]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pl-PL`)
      .then(res => res.json())
      .then(data => {
        const map = {};
        (data.genres || []).forEach(g => (map[g.id] = g.name));
        setGenres(map);
      });
  }, []);

  useEffect(() => {
    if (screen !== 'game') return;

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
            + `&language=pl-PL&include_adult=true&sort_by=popularity.desc&page=${page}`;
    if (selectedGenres.length) {
      url += `&with_genres=${selectedGenres.join(',')}`;
    }
    if (selectedProviders.length) {
      url += `&with_watch_providers=${selectedProviders.join('|')}&watch_region=PL`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || [];
        if (results.length === 0) {
          setNoResults(true);
        } else {
          setMovies(results);
          setIndex(0);
          setNoResults(false);
        }
      })
      .catch(() => {
        setSnack({ open: true, message: 'Błąd sieci przy pobieraniu filmów', variant: 'danger' });
      });
  }, [screen, selectedGenres, selectedProviders, page]);

  const handleNoResults = () => {
    if (selectedProviders.length) {
      setSnack({ open: true, message: 'Brak wyników – usuwam filtry platform i pobieram od nowa', variant: 'warning' });
      setSelectedProviders([]);
      setPage(1);

    } else if (selectedGenres.length) {
      const allGenres = Object.keys(genres).map(Number);
      const remaining = allGenres.filter(g => !selectedGenres.includes(g));
      if (remaining.length) {
        const rand = remaining[Math.floor(Math.random() * remaining.length)];
        setSnack({ open: true, message: `Brak wyników – spróbujmy z gatunkiem: ${genres[rand]}`, variant: 'warning' });
        setSelectedGenres([rand]);
        setPage(1);
      } else {
        setScreen('final');
      }

    } else {
      setSnack({ open: true, message: 'Brak dalszych propozycji – przechodzę do podsumowania', variant: 'info' });
      setScreen('final');
    }
  };

  useEffect(() => {
    if (noResults) handleNoResults();
  }, [noResults]);


  useEffect(() => {
    if (screen !== 'final' || finals.length === 0) return;

    finals.forEach(f => {
      fetch(`https://api.themoviedb.org/3/movie/${f.id}/watch/providers?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
          const countryData = data.results?.PL;
          if (countryData?.link) {
            setProviderLinks(prev => ({ ...prev, [f.id]: countryData.link }));
          }
        })
        .catch(() => {
          console.log("error")
        });
    });
  }, [screen, finals]);

  useEffect(() => {
    if (screen !== 'game') return;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl-PL&include_adult=true&sort_by=popularity.desc&page=${page}`;
    if (selectedGenres.length) url += `&with_genres=${selectedGenres.join(',')}`;
    if (selectedProviders.length) url += `&with_watch_providers=${selectedProviders.join('|')}&watch_region=PL`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || []);
        setIndex(0);
      });
  }, [screen, selectedGenres, selectedProviders, page]);

  useEffect(() => {
    if (!current) return;
    fetch(`https://api.themoviedb.org/3/movie/${current.id}/videos?api_key=${API_KEY}&language=pl-PL`)
      .then(res => res.json())
      .then(data => {
        const t = (data.results || []).find(v => v.type === 'Trailer' && v.site === 'YouTube');
        setTrailer(t ? t.key : null);
      });
  }, [current]);

  useEffect(() => {
    if (!user?.likedMovies?.length) return;
    Promise.all(
      user.likedMovies.map(id =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pl-PL`
        ).then(r => r.json())
      )
    ).then(movies => setLikedDetails(movies));
  }, [user]);

  useEffect(() => {
    if (screen !== 'profile' || !user?.likedMovies?.length) {
      return;
    }
    setLikedDetails([]);
  
    Promise.all(
      user.likedMovies.map(lm => {
        const movieId = typeof lm === 'object' ? lm.id : lm;
        return fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=pl-PL`
        ).then(r => r.json());
      })
    )
      .then(movies => setLikedDetails(movies))
      .catch(err => console.error('Błąd fetchowania profilu:', err));
  }, [screen, user?.likedMovies]);

  useEffect(() => {
    if (screen !== 'profile') return;
  
    const liked = user?.likedMovies || [];
    if (liked.length === 0) {
      setLikedDetails([]);
      return;
    }
  
    (async () => {
      try {
        const movies = await Promise.all(
          liked.map(lm => {
            const id = typeof lm === 'object' ? lm.id : lm;
            return fetch(
              `https://api.themoviedb.org/3/movie/${id}` +
              `?api_key=${API_KEY}&language=pl-PL`
            ).then(res => res.json());
          })
        );
        setLikedDetails(movies);
      } catch (err) {
        console.error('Błąd fetchowania profilu:', err);
      }
    })();
  }, [screen]);
  
  const handleUnlike = async (movieId) => {
    try {

      const url = `${API_BASE}/user/${user.id}/likes/${movieId}`;
  
      const res = await fetch(url, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        const text = await res.text();
        console.error('Usuń like niepowodzenie:', res.status, text);
        throw new Error(`HTTP ${res.status}`);
      }
  
      setLikedDetails(details =>
        details.filter(m => m.id !== movieId)
      );
      setUser(u => ({
        ...u,
        likedMovies: u.likedMovies.filter(lm => {
          const id = typeof lm === 'object' ? lm.id : lm;
          return id !== movieId;
        })
      }));
    } catch (err) {
      console.error('Błąd usuwania lajka:', err);
      setSnack({ open: true, message: 'Nie udało się usunąć filmu', variant: 'danger' });
    }
  };
  

  const likedIds = React.useMemo(() => {
    if (!user?.likedMovies) return [];
    return user.likedMovies
      .filter(lm => lm != null)
      .map(lm => (typeof lm === 'object' ? lm.id : lm))
      .filter(id => typeof id === 'number');
  }, [user]);

  const renderGenres = ids => ids.map(id => genres[id]).join(', ');

  const nextMovie = async (liked) => {
    const newFavs = liked ? [...favorites, current] : favorites;
    setFavorites(newFavs);
  
    if (liked && user) {
      try {
        const res = await fetch(
          `${API_BASE}/user/${user.id}/likes`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId: current.id }),
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setUser(u => ({
          ...u,
          likedMovies: [
            ...u.likedMovies,
            { id: current.id, title: current.title, poster_path: current.poster_path }
          ]
        }));
      } catch (err) {
        console.error('Błąd zapisu lajka:', err);
      }
    }
  
    if (index + 1 >= movies.length) {
      const nextPage = Math.floor(Math.random() * 50) + 1;
      setPage(nextPage);
    } else {
      setIndex(i => i + 1);
    }
  
    if (newFavs.length >= 5) {
      const count = {};
      newFavs.forEach(f =>
        (f.genre_ids || []).forEach(g => {
          count[g] = (count[g] || 0) + 1;
        })
      );
      const topGenres = Object.entries(count)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([g]) => g)
        .join(',');
  
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}` +
        `&language=pl-PL&include_adult=false&sort_by=popularity.desc&with_genres=${topGenres}`
      )
        .then(res => res.json())
        .then(data => {
          setFinals(data.results.slice(0, 3));
          setScreen('final');
        })
        .catch(err => console.error('Błąd pobierania rekomendacji:', err));
    }
  };
  
  


  const openInfo = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${current.id}?api_key=${API_KEY}&language=pl-PL`);
    const deta = await res.json();
    setDetails(deta);
    setModalInfo(true);
  };



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
      }}
    >
        <Box sx={{ position: 'sticky', top: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10 }}>
        <Typography
    level="h6"
    component="button"
    onClick={() => window.location.reload()}
    sx={{
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      p: 0,
    }}
  >
    Filmder
  </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => user && setScreen('profile')}>
  <AccountCircleIcon sx={{ color: 'white' }} />
</IconButton>

            <IconButton><MovieIcon sx={{ color: 'white' }} /></IconButton>
            <IconButton onClick={() => setScreen('setup')}><SettingsIcon sx={{ color: 'white' }} /></IconButton>
          </Box>
        </Box>


        {screen === 'profile' && (
  <Box sx={{ p: 4 }}>
    <Typography level="h2" sx={{ mb: 2 }}>Mój profil</Typography>
    <Typography level="body1" sx={{ mb: 1 }}>Nazwa: {user.name}</Typography>
    <Typography level="body1" sx={{ mb: 3 }}>Email: {user.email}</Typography>

    <Typography level="h4" sx={{ mb: 1 }}>Polubione filmy</Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {likedDetails.map(m => (
        <Card key={m.id} sx={{ width: 150, position: 'relative' }}>
          <IconButton
            size="sm"
            onClick={() => handleUnlike(m.id)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
          >
            <CloseRoundedIcon sx={{ color: 'white', fontSize: '1rem' }} />
          </IconButton>

          <img
            src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
            alt={m.title}
            style={{ width: '100%', height: 'auto' }}
          />
          <Typography level="body2" sx={{ p: 1, textAlign: 'center' }}>
            {m.title}
          </Typography>
        </Card>
      ))}
    </Box>

    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
      <Button
        variant="outlined"
        onClick={() => {
          setUser(null);
          setScreen('home');
        }}
      >
        Wyloguj
      </Button>
      <Button variant="outlined" onClick={() => setScreen('home')}>
        Powrót
      </Button>
    </Box>
  </Box>
)}



{screen === 'home' && (
  <Box sx={{ textAlign: 'center', mt: 8, px: 2 }}>
    {user ? (
      <>
        <Typography level="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold', mb: 2 }}>
          Cześć, {user.name.split(' ')[0]}!
        </Typography>
        <Typography level="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
          Witaj w Filmder — Twojej spersonalizowanej strefie filmowej.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="solid"
            size="lg"
            onClick={() => setScreen('profile')}
          >
            Mój profil
          </Button>
          <Button
            variant="outlined"
            size="lg"
            onClick={() => setScreen('setup')}
          >
            Zagraj Solo
          </Button>
        </Box>
      </>
    ) : (
      <>
        <Typography level="h1" sx={{ fontSize: '3rem', fontWeight: 'bold', mb: 1 }}>
          Filmder
        </Typography>
        <Typography level="h2" sx={{ fontSize: '1.5rem', mb: 3, color: 'rgba(255,255,255,0.8)' }}>
          Odkryj spersonalizowane rekomendacje filmowe
        </Typography>
        <Typography level="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto', color: 'rgba(255,255,255,0.9)' }}>
          Filmder to inteligentna aplikacja, która za pomocą prostego quizu 
          i Twoich ocen filmów tworzy listę propozycji szytą na miarę. 
          Wybierz ulubione gatunki, zaznacz platformy streamingowe i zacznij przygodę!
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="solid"
            size="lg"
            onClick={() => setScreen('setup')}
          >
            Zagraj Solo
          </Button>
          <Button
            variant="outlined"
            size="lg"
            onClick={() => setScreen('register')}
          >
            Zarejestruj się
          </Button>
          <Button
            variant="outlined"
            size="lg"
            onClick={() => setScreen('login')}
          >
            Zaloguj się
          </Button>
        </Box>
      </>
    )}
  </Box>
)}


{(screen === 'register' || screen === 'login') && (
  <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, px: 2 }}>
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
      <Button
        variant={screen === 'register' ? 'solid' : 'outlined'}
        onClick={() => setScreen('register')}
      >
        Rejestracja
      </Button>
      <Button
        variant={screen === 'login' ? 'solid' : 'outlined'}
        onClick={() => setScreen('login')}
      >
        Logowanie
      </Button>
    </Box>

    <Box
      component="form"
      onSubmit={screen === 'register' ? handleRegister : handleLogin}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {screen === 'register' && (
        <>
          <FormControl>
            <FormLabel>Imię i nazwisko</FormLabel>
            <Input
              required
              placeholder="Jan Kowalski"
              value={regName}
              onChange={e => setRegName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              required
              type="email"
              placeholder="email@przyklad.com"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hasło</FormLabel>
            <Input
              required
              type="password"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Potwierdź hasło</FormLabel>
            <Input
              required
              type="password"
              value={regConfirm}
              onChange={e => setRegConfirm(e.target.value)}
            />
          </FormControl>
        </>
      )}

      {screen === 'login' && (
        <>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              required
              type="email"
              name="email"
              placeholder="Twój email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hasło</FormLabel>
            <Input
              required
              type="password"
              name="password"
              placeholder="Twoje hasło"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
            />
          </FormControl>
        </>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
        <Button type="submit" variant="solid">
          {screen === 'register' ? 'Zarejestruj się' : 'Zaloguj się'}
        </Button>
        <Button variant="outlined" onClick={() => setScreen('home')}>
          Anuluj
        </Button>
      </Box>
    </Box>
  </Box>
)}


        {screen === 'setup' && (
          <Box sx={{ maxWidth: 960, mx: 'auto', px: 2, py: 4 }}>
            <Typography level="h2">Wybierz 3 ulubione gatunki</Typography>
            <Box sx={{ position: 'relative', my: 3 }}>
              <IconButton onClick={() => scrollGenres(-1)} sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', zIndex: 1, display: 'flex' }}>
                <ChevronLeftIcon sx={{ color: 'white' }} />
              </IconButton>
              <Box ref={genreRef} sx={{ display: 'flex', gap: 1, overflowX: 'auto', px: 1, flexWrap: 'nowrap', scrollSnapType: 'x mandatory', '&::-webkit-scrollbar': { display: 'none' } }}>
                {genreList.map(([id, name]) => (
                  <Button
                    key={id}
                    variant={selectedGenres.includes(+id) ? 'solid' : 'outlined'}
                    onClick={() => setSelectedGenres(prev => prev.includes(+id) ? prev.filter(x => x !== +id) : prev.length < 3 ? [...prev, +id] : prev)}
                    sx={{ minWidth: 120, flex: '0 0 auto', scrollSnapAlign: 'center' }}
                  >
                    {name}
                  </Button>
                ))}
              </Box>
              <IconButton onClick={() => scrollGenres(1)} sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1, display: 'flex' }}>
                <ChevronRightIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>

            <Typography level="h2">Platformy streamingowe</Typography>
            <Box sx={{ bg: '#1c1c1e', p: 2, borderRadius: 2, my: 3, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {PROVIDERS.map(p => (
                <Checkbox
                  key={p.id}
                  label={p.name}
                  checked={selectedProviders.includes(p.id)}
                  onChange={() => setSelectedProviders(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                  sx={{ color: 'white' }}
                />
              ))}
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Button variant="solid" size="lg" onClick={() => setScreen('game')}>PRZEJDŹ DALEJ</Button>
            </Box>
          </Box>
        )}

        {screen==='game' && (
          <Box sx={{ display:['block','flex'], gap:2, p:2, pt:{ xs:6, sm:2 } }}>
            <Box sx={{ width:['100%','240px'] }}>
              <Typography level="h4" sx={{ mb:1, textAlign:['center','left'] }}>Twoje typy</Typography>
              <Box sx={{ display:{ xs:'block', sm:'none' } }}>
                <FavoritesCarousel favorites={favorites} />
              </Box>
              <Box sx={{ display:{ xs:'none', sm:'grid' }, gridTemplateColumns:'1fr', gap:2, overflowY:'auto', maxHeight:'60vh', pr:1 }}>
                {favorites.map(f => (
                  <Card key={f.id} sx={{ backgroundColor:'rgba(28,28,30,0.8)' }}>
                    <Box sx={{ width:'100%', height:'6rem', overflow:'hidden', borderRadius:1 }}>
                      <img src={`https://image.tmdb.org/t/p/w500${f.poster_path}`} alt={f.title} style={{ width:'100%', height:'100%', objectFit:'contain' }} />
                    </Box>
                    <Typography level="body2" sx={{ color:'white', textAlign:'center', mt:1 }}>{f.title}</Typography>
                  </Card>
                ))}
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <FormControl orientation="horizontal" sx={{ mb: 2, gap: 1 }}>
                <FormLabel sx={{ color: 'white' }}>Trailer zamiast plakatu</FormLabel>
                <Switch
                  checked={useTrailer}
                  onChange={e => setUseTrailer(e.target.checked)}
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
    p: 2,
    maxWidth: 500,
    overflow: 'hidden',
  }}
>
  <MediaContainer useTrailer={useTrailer} trailerKey={trailer} posterPath={current?.poster_path} />

  {current && likedIds.includes(current.id) && (
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
      fontSize: '0.875rem',
      backdropFilter: 'blur(10px)',
      bgcolor: 'rgba(76,175,80,0.2)',      
      color: 'red',  
      boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
    }}
  >
    Polubione
  </Chip>
)}


  <CardContent>
    <Typography level="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
      {current?.title}
    </Typography>
    <Typography level="body2" sx={{ color: 'white', mb: 1 }}>
      Ocena: {current?.vote_average} · {current?.release_date}
    </Typography>

    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
      <Button
        size="lg"
        variant="solid"
        color="danger"
        sx={{ width: 56, height: 56, borderRadius: '50%', fontSize: '1.5rem' }}
        onClick={() => nextMovie(false)}
      >
        👎
      </Button>
      <Button
        size="lg"
        variant="solid"
        color="primary"
        sx={{ width: 56, height: 56, borderRadius: '50%', fontSize: '1.5rem' }}
        onClick={() => nextMovie(true)}
      >
        👍
      </Button>
      <Button
        size="lg"
        variant="outlined"
        sx={{ width: 56, height: 56, borderRadius: '50%', fontSize: '1.2rem' }}
        onClick={openInfo}
      >
        ℹ️
      </Button>
    </Box>
  </CardContent>
</Card>

              <Modal open={modalInfo} onClose={() => setModalInfo(false)}>
                <ModalDialog>
                  <IconButton onClick={() => setModalInfo(false)}><CloseRoundedIcon /></IconButton>
                  {details && <Box sx={{ p: 2 }}><Typography level="h3" sx={{ mb: 1 }}>{details.title}</Typography><Typography>{details.overview}</Typography></Box>}
                </ModalDialog>
              </Modal>
            </Box>
          </Box>
        )}

        {screen === 'final' && (
  <Box sx={{ p: 2 }}>
    <Typography level="h2" sx={{ textAlign: 'center', mb: 3 }}>Podsumowanie</Typography>
    <Typography level="h4" sx={{ mb: 2 }}>Twoje typy</Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 4 }}>
      {favorites.map(f => (
        <Card key={f.id} sx={{ width: 220, bg: '#1c1c1e', color: 'black' }}>
          <Box sx={{ width: '100%', height: '30vh', overflow: 'hidden', borderRadius: 2 }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${f.poster_path}`}
              alt={f.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
          <CardContent>
          <Typography style={{color:"black"}} level="h4">{f.title}</Typography>
          <Typography level="body2" sx={{ mb: 1 }}>Ocena: {f.vote_average}</Typography>
            <Typography level="body2" sx={{ mb: 1 }}>Gatunki: {renderGenres(f.genre_ids)}</Typography>
            <Typography level="body2" sx={{ fontSize: '0.875rem' }}>{f.overview}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>

    <Typography level="h4" sx={{ mb: 2 }}>Twoje rekomendacje</Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
      {finals.map(f => (
        <Card key={f.id} sx={{ width: 220, bg: '#1c1c1e', color: 'black' }}>
          <Box sx={{ width: '100%', height: '30vh', overflow: 'hidden', borderRadius: 2 }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${f.poster_path}`}
              alt={f.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
          <CardContent>
            <Typography style={{color:"black"}} level="h4">{f.title}</Typography>
            <Typography level="body2" sx={{ mb: 1 }}>Ocena: {f.vote_average}</Typography>
            <Typography level="body2" sx={{ mb: 1 }}>Gatunki: {renderGenres(f.genre_ids)}</Typography>
            <Typography level="body2" sx={{ fontSize: '0.875rem' }}>{f.overview}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
)}
      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          py: 3,
          px: 2,
          backgroundColor: 'rgba(0,0,0,0.7)',
          mt: 'auto',
        }}
      >
        <Typography level="h6" sx={{ color: 'white', mb: 1 }}>
          O PROJEKCIE
        </Typography>
        <Typography level="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Autorzy: Wiktoria Sytniewska, Ada Konarska, Sebastian Szwajnoch, Adrian Muniak, Damian Chymkowski
        </Typography>
      </Box>
      </Sheet>
    </CssVarsProvider>
  );
}
