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
import logo2 from './logo2.png';
import zagrajsolo from './zagrajsolo.png';
import zagrajzpartnerem from './zagrajzpartnerem.png';
import przejdzdobazy from './przejdzdobazy.png';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import YouTubeIcon from './youtube.png';
import WhatsAppIcon from './whatsapp.png';
import InstagramIcon from './instagram.png';
import FacebookIcon from './facebook.png';
import LinkedInIcon from './linkedin.png';
import EmojiObjectsIcon from './behance.png'
import profileicon from './profileicon.png'
import film from './Film.png'
import info from './Info.png'
import ThumbsDown from './Thumbs down.png'
import ThumbsUp from './Thumbs UP.png'
import Heart from './Heart.png'
import Damian from './damian.jpg'
import Adrian from './adrian.jpg'
import Adrianna from './Ada.jpg'
import Wiktoria from './Witoria.jpg'
import Sebastian from './Sebastian.jpg'
import SearchIcon from '@mui/icons-material/Search';

const API_KEY = 'xxx';
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
          key={f.id}
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
  const getRandomPage = () => Math.floor(Math.random() * 10) + 1;
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
  const [page, setPage] = useState(() => getRandomPage());
  const [totalPages, setTotalPages] = useState(null);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [moviePool, setMoviePool] = useState([]);      
  const [poolIndex, setPoolIndex] = useState(0);      
  const [isPoolReady, setIsPoolReady] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');
const [dislikedIds, setDislikedIds] = useState([]);

const [likedDetails, setLikedDetails] = useState([]);


const resetGame = () => {
  setSelectedGenres([]);
  setSelectedProviders([]);
  setMovies([]);
  setIndex(0);
  setFavorites([]);
  setFinals([]);
  setTrailer(null);
  setUseTrailer(false);
  setModalInfo(false);
  setDetails(null);
  setProviderLinks({});
  setNoResults(false);
  setPage(getRandomPage);
};

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


const fetchLikes = async (userId) => {
  try {
    const res = await fetch(`${API_BASE}/user/${userId}/likes`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const likes = Array.isArray(data)
      ? data
      : Array.isArray(data.likedMovies)
        ? data.likedMovies
        : [];
    setUser(u => ({ ...u, likedMovies: likes }));
  } catch (err) {
    console.error('Błąd pobierania polubień:', err);
  }
};

const handleRegister = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirm = formData.get('confirm');

  if (password !== confirm) {
    setSnack({ open: true, message: 'Hasła nie są zgodne', variant: 'danger' });
    return;
  }

  setSnack({ open: true, message: 'Tworzę konto…', variant: 'info' });

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        likedMovies: favorites.map(f => f.id),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setSnack({ open: true, message: data.error || 'Błąd rejestracji', variant: 'danger' });
      return;
    }

    setUser({ id: data.userId, name, email, likedMovies: favorites.map(f => ({ id: f.id, title: f.title, poster_path: f.poster_path })) });
    setSnack({ open: true, message: 'Rejestracja udana! Jesteś zalogowany.', variant: 'primary' });
    setScreen('home');
  } catch (err) {
    console.error('Błąd sieci przy rejestracji:', err);
    setSnack({ open: true, message: 'Błąd sieci. Spróbuj ponownie.', variant: 'danger' });
  }
};

const [dbQuery, setDbQuery] = useState('');
const [dbSelectedGenres, setDbSelectedGenres] = useState([]);
const [dbResults, setDbResults] = useState([]);
const [dbPage, setDbPage] = useState(1);
const [dbTotalPages, setDbTotalPages] = useState(1);
const [dbLoading, setDbLoading] = useState(false);
const [dbError, setDbError] = useState(null);

const dbGenresList = useMemo(() => {
  return Object.entries(genres).map(([id, name]) => ({
    id: Number(id),
    name
  }));
}, [genres]);

useEffect(() => {
  if (screen !== 'database') return; 
  const fetchDbMovies = async () => {
    setDbLoading(true);
    setDbError(null);

    try {
      let url = '';
      if (dbQuery.trim().length > 0) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pl-PL`
          + `&query=${encodeURIComponent(dbQuery)}`
          + `&page=${dbPage}`;
      }
      else if (dbSelectedGenres.length > 0) {
        const genreParam = dbSelectedGenres.join(',');
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pl-PL`
          + `&with_genres=${genreParam}`
          + `&sort_by=popularity.desc`
          + `&page=${dbPage}`;
      }

      else {
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
  const genreRef = useRef(null);
  const scrollGenres = (direction) => {
    if (genreRef.current) {
      const scrollAmount = genreRef.current.offsetWidth;
      genreRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  const current = movies[index] || null;


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
    if (screen === 'profile' && user) {
      fetchLikes(user.id);
    }
  }, [screen]);


  const handleNoResults = () => {
    if (selectedProviders.length) {
      setSnack({
        open: true,
        message: 'Brak wyników – usuwam filtry platform i pobieram od nowa',
        variant: 'warning'
      });
      setSelectedProviders([]);
      setPage(1);
      return;
    }
  

    if (selectedGenres.length) {

      if (page < totalPages) {
        setSnack({
          open: true,
          message: 'Brak wyników – szukam kolejnej strony dla wybranych gatunków',
          variant: 'warning'
        });

        setNoResults(false); 
        setPage(prev => prev + 1);
        return;
      }
  
      const allGenres = Object.keys(genres).map(Number);
      const remaining = allGenres.filter(g => !selectedGenres.includes(g));
  
      if (remaining.length) {
        const rand = remaining[Math.floor(Math.random() * remaining.length)];
        setSnack({
          open: true,
          message: `Brak wyników na wszystkich stronach – spróbujmy z gatunkiem: ${genres[rand]}`,
          variant: 'warning'
        });
        setSelectedGenres([rand]);
        setPage(1);
        return;
      }
  

      setScreen('final');
      return;
    }
  

    setSnack({
      open: true,
      message: 'Brak dalszych propozycji – przechodzę do podsumowania',
      variant: 'info'
    });
    setScreen('final');
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
    if (screen !== "game") return;
  
    if (!selectedGenres.length) {
      setMoviePool([]);
      setPoolIndex(0);
      setIsPoolReady(false);
      return;
    }
  
    (async () => {
      setIsPoolReady(false);
      try {
        const providerParam = selectedProviders.join("|");
  
        const fetchMovies = async (useRegion) => {
          const promises = [];
          selectedGenres.forEach((genreId) => {
            for (let p = 1; p <= 3; p++) {
              let url =
                `https://api.themoviedb.org/3/discover/movie?` +
                `api_key=${API_KEY}&language=pl-PL&include_adult=false` +
                `&sort_by=popularity.desc&with_genres=${genreId}` +
                `&with_watch_providers=${providerParam}` +
                `&page=${p}`;
              if (useRegion) {
                url += `&watch_region=PL`;
              }
              promises.push(
                fetch(url)
                  .then((res) => {
                    if (!res.ok) throw new Error("Błąd TMDB");
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
  
        let combined = await fetchMovies(true);
        let filtered = dedupeAndFilter(combined);
  
        if (filtered.length === 0) {
          const combinedNoRegion = await fetchMovies(false);
          const filteredNoRegion = dedupeAndFilter(combinedNoRegion);
          const shuffledNoRegion = shuffleArray(filteredNoRegion);
          setMoviePool(shuffledNoRegion);
          setPoolIndex(0);
          setIsPoolReady(true);
          return;
        }
  
        const shuffled = shuffleArray(filtered);
        setMoviePool(shuffled);
        setPoolIndex(0);
        setIsPoolReady(true);
      } catch (err) {
        console.error("Błąd budowania puli filmów:", err);
        setSnack({ open: true, message: "Nie udało się załadować filmów", variant: "danger" });
        setMoviePool([]);
        setPoolIndex(0);
        setIsPoolReady(true);
      }
    })();
  }, [screen, selectedGenres, selectedProviders, dislikedIds]);
  

  useEffect(() => {
    const cm = moviePool[poolIndex];
    if (!cm) {
      setTrailer(null);
      return;
    }
  
    setTrailer(null);
  
    fetch(`https://api.themoviedb.org/3/movie/${cm.id}/videos?api_key=${API_KEY}&language=pl-PL`)
      .then(res => res.json())
      .then(data => {
        const t = (data.results || []).find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailer(t ? t.key : null);
      })
      .catch(() => {
        setTrailer(null);
      });
  }, [moviePool, poolIndex]);
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
      const res = await fetch(`${API_BASE}/user/${user.id}/likes/${movieId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchLikes(user.id);
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

  const handleNext = (liked) => {
    if (!isPoolReady) return;
  
    const currentMovie = moviePool[poolIndex];
  
    if (!liked && currentMovie) {
      setDislikedIds(prev => [...prev, currentMovie.id]);
    }
  
    let newFavorites = favorites;
    if (liked && currentMovie) {
      newFavorites = [...favorites, currentMovie];
      setFavorites(newFavorites);
    }
  
    if (newFavorites.length >= 5) {
      (async () => {
        try {
          const recPromises = newFavorites.map(fav =>
            fetch(
              `https://api.themoviedb.org/3/movie/${fav.id}/recommendations?api_key=${API_KEY}&language=pl-PL`
            )
              .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
              })
              .then(data => data.results || [])
          );
    
          const recArrays = await Promise.all(recPromises);
          const allRecs = recArrays.flat();
    
          const freqMap = {};
          allRecs.forEach(r => {
            if (!r || !r.id) return;
            freqMap[r.id] = (freqMap[r.id] || 0) + 1;
          });
    
          const uniqueRecsById = {};
          allRecs.forEach(r => {
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
    
          const existingLikedIds = new Set(newFavorites.map(f => f.id));
          const resultFiltered = recsWithCount
            .map(r => r.movie)
            .filter(m =>
              !existingLikedIds.has(m.id) &&
              !dislikedIds.includes(m.id)
            );
    
          const filteredByGenre = resultFiltered.filter(m =>
            m.genre_ids?.some(g => selectedGenres.includes(g))
          );
    
          const top3 = filteredByGenre.slice(0, 3);
          setFinals(top3);
          setScreen("final");
        } catch (err) {
          console.error("Błąd pobierania rekomendacji final:", err);
          setSnack({ open: true, message: "Nie udało się pobrać rekomendacji", variant: "danger" });
          setScreen("final");
        }
      })();
    
      return;
    }
    
    const nextIndex = poolIndex + 1;
    if (nextIndex < moviePool.length) {
      setPoolIndex(nextIndex);
    } else {
      setPoolIndex(0);
    }
  };

  
  const nextMovie = (liked) => {
    const newFavs = liked ? [...favorites, current] : favorites;
    setFavorites(newFavs);
  
    if (index + 1 >= movies.length) {
      setPage(prev => prev + 1);
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
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
        + `&language=pl-PL&include_adult=false&sort_by=popularity.desc`
        + `&with_genres=${topGenres}`
      )
        .then(res => res.json())
        .then(data => {
          setFinals(data.results.slice(0, 3));
          setScreen('final');
        })
        .catch(err => {
          console.error('Błąd pobierania rekomendacji:', err);
          setSnack({ open: true, message: 'Nie udało się pobrać rekomendacji', variant: 'danger' });
        });
    }
  };
  
  const shuffleArray = (array) => {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };


  const openInfo = async () => {
    if (!user) {

      setSnack({ open: true, message: 'Zaloguj się, aby dodać do ulubionych', variant: 'warning' });
      return;
    }
  
    try {
      const res = await fetch(`${API_BASE}/user/${user.id}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId: current.id }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
      await fetchLikes(user.id);
  
      setSnack({ open: true, message: 'Dodano do ulubionych!', variant: 'primary' });
    } catch (err) {
      console.error('Błąd zapisu ulubionego:', err);
      setSnack({ open: true, message: 'Nie udało się dodać do ulubionych', variant: 'danger' });
    }
  };

  const handleFavorite = async (movieId) => {
    if (!user) {
      setSnack({ open: true, message: "Zaloguj się, aby dodać do ulubionych", variant: "warning" });
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/user/${user.id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchLikes(user.id);
      setSnack({ open: true, message: "Dodano do ulubionych!", variant: "primary" });
    } catch (err) {
      console.error("Błąd zapisu ulubionego:", err);
      setSnack({ open: true, message: "Nie udało się dodać do ulubionych", variant: "danger" });
    }
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
<Box
  component="section"
  sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: 'auto 1fr auto' },
    alignItems: 'center',
    gap: 2,
    px: { xs: 2, md: 4 },
    py: { xs: 4, md: 8 },
    color: 'white',
  }}
>

  <Box
  component="img"
  src={logo2}
  alt="Filmder"
  onClick={() => setScreen('home')}
  sx={{
    width: { xs: 60, sm: 80, md: 100 },
    height: 'auto',
    justifySelf: { xs: 'center', md: 'start' },
    cursor: 'pointer',          
    userSelect: 'none',         
  }}
/>


  <Box sx={{ textAlign: 'center', px: { xs: 0, md: 2 } }}>
    <Typography
      level="h1"
      component="h1"
      sx={{
        fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
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
      mt: 1,
      fontSize: { xs: '0.9rem', sm: '1.1rem' },
      maxWidth: 600,
      mx: 'auto',
      color: 'rgba(255,255,255,0.8)',
    }}
  >
    Nie wiesz, co obejrzeć? Filmder to aplikacja, która pomoże Ci znaleźć idealny film na każdy wieczór!
    Wystarczy, że podasz swoje preferencje filmowe, a my zaproponujemy produkcje dopasowane do Twojego gustu.
  </Typography>
)}
  </Box>

  {/* → PRAWY BLOK IKON */}
  <Box
  sx={{
    display: 'flex',
    gap: 1,
    justifySelf: { xs: 'center', md: 'end' },
  }}
>
  {[
    {
      onClick: () =>
        user
          ? setScreen('profile')
          : setScreen('register'), 
      src: profileicon,
      alt: 'Profil',
    },
    {
      onClick: () => setScreen('database'),
      src: film,
      alt: 'Tryb gry',
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
          transform: 'scale(1.2)',
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
          width: 28,
          height: 28,
          transition: 'filter 0.2s',
        }}
      />
    </IconButton>
  ))}
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
  <Box sx={{ textAlign: 'center', px: 2, py: 6 }}>
    <Typography
      level="h2"
      sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 'bold', mb: 4 }}
    >
      Wybierz jeden z trybów
    </Typography>

    <Box
      sx={{
        display: 'grid',
        gap: 4,
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
          text: 'Przesuwaj filmy w lewo lub w prawo – tak jak lubisz. Na podstawie Twoich wyborów Filmder dobierze idealną propozycję na wieczór.',
          img: zagrajsolo,
          onClick: () => {
            resetGame();
            getRandomPage();
            setScreen('setup');
          },
          enabled: true,
        },
        {
          title: 'Zagraj z partnerem',
          text: 'Nie możecie się dogadać, co obejrzeć? Wspólnie z partnerem porównajcie gusta, a Filmder znajdzie złoty środek.',
          img: zagrajzpartnerem,
          onClick: () => {},     
          enabled: false,
        },
        {
          title: 'Przejdź do bazy',
          text: 'Przejrzyj naszą filmową bazę – znajdziesz tu opisy, gatunki i rekomendacje dopasowane do różnych gustów.',
          img: przejdzdobazy,
          onClick: () => {},     
          enabled: false,
        },
      ].map(({ title, text, img, onClick, enabled }) => (
        <Card
          key={title}
          variant="plain"
          onClick={enabled ? onClick : undefined}
          sx={{
            p: 2,
            bgcolor: enabled ? 'rgba(28,28,30,0.8)' : 'rgba(50,50,50,0.6)',
            borderRadius: 2,
            cursor: enabled ? 'pointer' : 'not-allowed',
            opacity: enabled ? 1 : 0.5,
            pointerEvents: enabled ? 'auto' : 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: {
              xs: '0px 2px 8px rgba(0,0,0,0.4)',
              md: '0px 4px 16px rgba(0,0,0,0.6)',
            },
            '&:hover': enabled
              ? {
                  transform: 'translateY(-4px)',
                  boxShadow: {
                    xs: '0px 4px 12px rgba(0,0,0,0.6)',
                    md: '0px 6px 20px rgba(0,0,0,0.8)',
                  },
                }
              : {},
          }}
        >
          <Box>
            <Typography level="h4" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography level="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
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
              maxHeight: { xs: 140, sm: 160 },
              objectFit: 'contain',
              borderRadius: 1,
              mt: 2,
            }}
          />
        </Card>
      ))}
    </Box>
  </Box>
)}




{(screen === 'login' || screen === 'register') && (
  <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 4, md: 8 } }}>
    {/* Karty obok siebie */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
        gap: 4,
        mb: 6,
      }}
    >
      {/* 1) Logowanie */}
      <Card
        variant="plain"
        sx={{
          p: 4,
          bgcolor: '#1c1c1e',
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
        }}
      >
        <Typography level="h4" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
          Logowanie
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Input
            required
            name="email"
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={e => setLoginEmail(e.target.value)}
            sx={{ bgcolor: 'white' }}
          />
          <Input
            required
            name="password"
            type="password"
            placeholder="Hasło"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
            sx={{ bgcolor: 'white' }}
          />
          <Button type="submit" variant="solid" sx={{ mt: 1 }}>
            Zaloguj się
          </Button>
        </Box>
      </Card>

      {/* 2) Rejestracja */}
      <Card
        variant="plain"
        sx={{
          p: 4,
          bgcolor: '#1c1c1e',
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
        }}
      >
        <Typography level="h4" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
          Załóż konto
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Input
            required
            name="name"
            placeholder="Nazwa użytkownika"
            value={regName}
            onChange={e => setRegName(e.target.value)}
            sx={{ bgcolor: 'white' }}
          />
          <Input
            required
            name="email"
            type="email"
            placeholder="E-mail"
            value={regEmail}
            onChange={e => setRegEmail(e.target.value)}
            sx={{ bgcolor: 'white' }}
          />
          <Input
            required
            name="password"
            type="password"
            placeholder="Hasło"
            value={regPassword}
            onChange={e => setRegPassword(e.target.value)}
            sx={{ bgcolor: 'white' }}
          />
          <Input
            required
            name="confirm"
            type="password"
            placeholder="Potwierdź hasło"
            value={regConfirm}
            onChange={e => setRegConfirm(e.target.value)}
            sx={{ bgcolor: 'white' }}
          />
          <Button type="submit" variant="solid" sx={{ mt: 1 }}>
            Zarejestruj się
          </Button>
        </Box>
      </Card>

      {/* 3) Plusy konta */}
      <Card
        variant="plain"
        sx={{
          p: 4,
          bgcolor: '#1c1c1e',
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
        }}
      >
        <Typography level="h4" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
          Plusy konta
        </Typography>
        <Box component="ul" sx={{ pl: 2, color: 'rgba(255,255,255,0.8)', '& li': { mb: 1 } }}>
          <li><strong>Spersonalizowane rekomendacje:</strong> Twoje wybory mają znaczenie – im więcej swipe’ów, tym lepiej dopasowane filmy.</li>
          <li><strong>Historia swipe’ów:</strong> Wróć do ulubionych filmów i sprawdź, co już widziałeś lub odrzuciłeś.</li>
          <li><strong>Tryb dla par:</strong> Szukaj wspólnego filmu razem z drugą osobą.</li>
          <li><strong>Lista „Do obejrzenia”:</strong> Zapisuj interesujące filmy na później.</li>
          <li><strong>Dostęp na wielu urządzeniach:</strong> Rozpocznij na telefonie, dokończ na komputerze.</li>
        </Box>
      </Card>
    </Box>

    {/* Sekcja wideo */}
    <Box
      sx={{
        position: 'relative',
        pt: '56.25%',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
      }}
    >

    </Box>
  </Box>
)}




{screen === 'setup' && (
  <Box
    sx={{
      width: '100%',
      maxWidth: { xs: '100%', md: 960 },
      mx: 'auto',
      px: { xs: 1, sm: 2 },
      py: 4,
    }}
  >
    <Typography sx={{ textAlign: 'center' }} level="h2">
      Wybierz ulubione gatunki filmowe
    </Typography>
    <Typography
      level="body2"
      sx={{
        display: { xs: 'none', md: 'block' },
        mt: 1,
        fontSize: { xs: '0.75rem', sm: '0.9rem' },
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
      }}
    >
      Korzystając ze strzałek — możesz się poruszać
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
              setSelectedGenres(prev =>
                prev.includes(+id)
                  ? prev.filter(x => x !== +id)
                  : prev.length < 3
                  ? [...prev, +id]
                  : prev
              )
            }
            sx={{
              flex: '0 0 auto',
              minWidth: { xs: 'auto', sm: 100 },
              px: { xs: 1, sm: 2 },
              whiteSpace: 'nowrap',
              mb: { xs: 1, sm: 0 },
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

    <Typography sx={{ textAlign: 'center' }} level="h2">
      Wybierz dostępne dla siebie platformy streamingowe
    </Typography>
    <Box
      sx={{
        bg: '#1c1c1e',
        p: 2,
        borderRadius: 2,
        my: 3,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 2,
        justifyItems: 'center',
      }}
    >
      {PROVIDERS.map(p => (
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
              setSelectedProviders(prev =>
                prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id]
              )
            }
            sx={{ color: 'white' }}
          />
        </FormControl>
      ))}
    </Box>

    <Box sx={{ textAlign: 'center' }}>
      <Button
        variant="solid"
        size="lg"
        onClick={() => {
          if (selectedGenres.length === 0) {
            setSnack({
              open: true,
              message: 'Wybierz przynajmniej jeden gatunek!',
              variant: 'warning',
            });
            return;
          }
          setScreen('game');
        }}
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



{screen === 'game' && (
  <Box sx={{ display: ['block', 'flex'], gap: 2, p: 2, pt: { xs: 6, sm: 2 } }}>

    <Box sx={{ width: ['100%', '240px'] }}>
      <Typography level="h4" sx={{ mb: 1, textAlign: ['center', 'left'] }}>
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
          <Card key={f.id} sx={{ backgroundColor: 'rgba(28,28,30,0.8)' }}>
            <Box sx={{ width: '100%', height: '6rem', overflow: 'hidden', borderRadius: 1 }}>
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
    </Box>

    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      {!isPoolReady ? (

        <CircularProgress color="primary" />
      ) : moviePool.length === 0 ? (

        <Typography level="body1" sx={{ color: 'white', textAlign: 'center' }}>
          Brak filmów do wyświetlenia dla wybranych gatunków. Wybierz inne gatunki i spróbuj ponownie.
        </Typography>
      ) : (

        (() => {
          const currentMovie = moviePool[poolIndex];

          return (
            <Box sx={{ width: '100%', maxWidth: 500 }}>
              {/* Przełącznik: trailer vs plakat */}
              <FormControl orientation="horizontal" sx={{ mb: 2, gap: 1 }}>
                <FormLabel sx={{ color: 'white' }}>Trailer zamiast plakatu</FormLabel>
                <Switch
                  checked={useTrailer}
                  onChange={(e) => setUseTrailer(e.target.checked)}
                />
              </FormControl>

              {/* Karta z filmem */}
              <Card
                sx={{
                  position: 'relative',
                  mx: 'auto',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  p: 2,
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
                      fontSize: '0.875rem',
                      backdropFilter: 'blur(10px)',
                      bgcolor: 'rgba(76,175,80,0.2)',
                      color: 'red',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}
                  >
                    Polubione
                  </Chip>
                )}

                <CardContent>
                  <Typography level="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {currentMovie?.title}
                  </Typography>
                  <Typography level="body2" sx={{ color: 'white', mb: 1 }}>
                    Ocena: {currentMovie?.vote_average} &middot; {currentMovie?.release_date}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                    <Button
                      size="lg"
                      variant="plain"
                      sx={{
                        width: 56,
                        height: 56,
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
                        sx={{ width: 24, height: 24 }}
                      />
                    </Button>

                    <Button
                      size="lg"
                      variant="plain"
                      sx={{
                        width: 56,
                        height: 56,
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
                        sx={{ width: 24, height: 24 }}
                      />
                    </Button>

                    <Button
                      size="lg"
                      variant="plain"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        p: 0,
                        bgcolor: '#B71C1C',
                        '&:hover': { bgcolor: '#8F1717' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={() => handleFavorite(currentMovie.id)}
                    >
                      <Box
                        component="img"
                        src={Heart}
                        alt="Ulubione"
                        sx={{ width: 24, height: 24 }}
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
{screen === 'database' && (
  <Box
    sx={{
      px: { xs: 2, md: 4 },
      py: 4,

      color: 'white',
      minHeight: '100vh',
    }}
  >
    {/* ← Nagłówek: przycisk powrotu + tytuł */}
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
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          fontWeight: 'bold',
        }}
      >
        Baza Filmów
      </Typography>
    </Box>

    {/* → KONTENER: wyszukiwarka + filtr gatunków */}
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
      {/* 1) Pasek wyszukiwania */}
      <Box sx={{ display: 'flex', gap: 1 }}>
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
        <Button variant="solid" type="submit" sx={{ bgcolor: '#D32F2F' }}>
          Szukaj
        </Button>
      </Box>

      {/* 2) Nagłówek Filtr po gatunkach */}
      <Typography
        level="body2"
        sx={{
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        Filtruj po gatunkach (max 3):
      </Typography>

      {/* 3) Lista gatunków w siatce */}
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
                fontSize: '0.825rem',
              }}
            >
              {name}
            </FormLabel>
          </FormControl>
        ))}
      </Box>
    </Box>

    {/* → Sekcja: komunikaty (ładowanie / błąd) lub wyniki */}
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
        {/* → Brak wyników */}
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
          /* → Siatka wyników */
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
                    transform: 'translateY(-4px)',
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
                    height: '300px',
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
                      fontSize: '1.125rem',
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
                      fontSize: '0.875rem',
                    }}
                  >
                    {movie.release_date || '—'} &middot; ⭐ {movie.vote_average || '—'}
                  </Typography>
                  <Typography
                    level="body3"
                    noWrap
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {movie.overview || 'Brak opisu.'}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* → PAGINACJA (tylko gdy są wyniki) */}
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
              sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}
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
        width: { xs: '90%', md: '80%', lg: '60%' },
        bgcolor: '#1c1c1e',
        border: 'none',
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
        p: { xs: 3, md: 5 },
      }}
    >
      {/* Nagłówek */}
      <Typography
        level="h2"
        component="h2"
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 2,
          color: 'white',
        }}
      >
        O nas
      </Typography>

      {/* Opis projektu */}
      <Typography
        level="body1"
        sx={{
          maxWidth: 800,
          mx: 'auto',
          mb: 6,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.8)',
          textAlign: 'center',
        }}
      >
        Filmder to projekt stworzony z miłości do kina i… ciągłego pytania „co dziś obejrzeć?”. 
        Naszym celem było stworzenie aplikacji, która w prosty i przyjemny sposób pomoże użytkownikom 
        znaleźć film idealnie dopasowany do ich gustu – samodzielnie lub w duecie. 
        Łączymy intuicyjność znaną z aplikacji randkowych z inteligentnymi rekomendacjami filmowymi, 
        by każdy mógł szybko i bez stresu trafić na coś wartego obejrzenia.
      </Typography>

      {/* Zespół */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr 1fr',
            sm: 'repeat(3,1fr)',
            md: 'repeat(5,1fr)',
          },
          gap: 4,
          justifyItems: 'center',
        }}
      >
        {[
          { name: 'Damian Chymkowski',  roles: ['Project Manager','Backend Developer'], img: Damian },
          { name: 'Adrian Muniak',      roles: ['Database Developer'],           img: Adrian },
          { name: 'Wiktoria Sytniewska',roles: ['Frontend Developer','(UI/UX)'], img: Wiktoria },
          { name: 'Adrianna Konarska',  roles: ['Copywriter'],                   img: Adrianna },
          { name: 'Sebastian Szwajnoch',roles: ['QA Tester', "Smacznej Kawusi!"],                   img: Sebastian },
        ].map((member, i) => (
          <Box key={i} sx={{ textAlign: 'center', maxWidth: 200 }}>
            <Box
              component="img"
              src={member.img}
              alt={member.name}
              sx={{
                width: 120,
                height: 120,
                borderRadius: 15,
                objectFit: 'cover',
                mb: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
              }}
            />
            <Typography
              level="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
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

{screen === 'final' && (
  <Box sx={{ p: 4 }}>
    <Typography level="h2" sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
      Podsumowanie
    </Typography>

    <Typography level="h4" sx={{ mb: 2, color: 'white', textAlign: 'center' }}>
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
      {finals
                      .filter(f =>
                        !dislikedIds.includes(f.id) &&
                        f.genre_ids?.some(g => selectedGenres.includes(g))
                      )
        .map(f => (
          <Card
            key={f.id}
            variant="plain"
            sx={{
              width: 220,
              bgcolor: '#1c1c1e',
              color: 'white',
              borderRadius: 2,
              boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ width: '100%', height: '30vh', overflow: 'hidden' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${f.poster_path}`}
                alt={f.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <CardContent>
              <Typography level="h4" sx={{ mb: 1 }}>
                {f.title}
              </Typography>
              <Typography level="body2" sx={{ mb: 1 }}>
                Ocena: {f.vote_average}
              </Typography>
              <Typography level="body2" sx={{ mb: 1 }}>
                Gatunki: {renderGenres(f.genre_ids)}
              </Typography>
              <Typography level="body2" sx={{ fontSize: '0.875rem' }}>
                {f.overview.length > 100 ? f.overview.slice(0, 100) + '…' : f.overview}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </Box>

    <Typography level="h4" sx={{ mb: 2, color: 'white', textAlign: 'center' }}>
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
      {favorites.map(f => (
        <Card
          key={f.id}
          variant="plain"
          sx={{
            width: 220,
            bgcolor: '#1c1c1e',
            color: 'white',
            borderRadius: 2,
            boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ width: '100%', height: '30vh', overflow: 'hidden' }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${f.poster_path}`}
              alt={f.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <CardContent>
            <Typography level="h4" sx={{ mb: 1 }}>
              {f.title}
            </Typography>
            <Typography level="body2" sx={{ mb: 1 }}>
              Ocena: {f.vote_average}
            </Typography>
            <Typography level="body2" sx={{ fontSize: '0.875rem' }}>
              {renderGenres(f.genre_ids)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
)}


<Box
  component="footer"
  sx={{
    mt: 'auto',
    pt: 6,
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
    {/* Kolumna 1 */}
    <Box>
      <Typography level="h6" sx={{ color: 'white', mb: 1 }}>
        Filmder
      </Typography>
      <Typography component="ul" level="body2" sx={{ listStyle: 'none', p: 0, m: 0, lineHeight: 1.8 }}>
        <li>O nas</li>
        <li>API</li>
        <li>GitHub</li>
      </Typography>
    </Box>

    {/* Kolumna 2 */}
    <Box>
      <Typography level="h6" sx={{ color: 'white', mb: 1 }}>
        Centrum pomocy
      </Typography>
      <Typography component="ul" level="body2" sx={{ listStyle: 'none', p: 0, m: 0, lineHeight: 1.8 }}>
        <li>Pomoc dla użytkowników</li>
        <li>Polityka plików “cookies”</li>
        <li>Ustawienia plików “cookies”</li>
      </Typography>
    </Box>

    {/* Kolumna 3 */}
    <Box>
      <Typography level="h6" sx={{ color: 'white', mb: 1 }}>
        Regulaminy
      </Typography>
      <Typography component="ul" level="body2" sx={{ listStyle: 'none', p: 0, m: 0, lineHeight: 1.8 }}>
        <li>Bezpieczeństwo</li>
        <li>Regulamin</li>
      </Typography>
    </Box>

    {/* Social Media */}
    <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
      <Typography level="h6" sx={{ color: 'white', mb: 1 }}>
        SOCIAL MEDIA
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
  <IconButton size="sm" sx={{ p: 0.5 }}>
    <Box
      component="img"
      src={WhatsAppIcon}
      alt="WhatsApp"
      sx={{ width: 24, height: 24, display: 'block' }}
    />
  </IconButton>
  <IconButton size="sm" sx={{ p: 0.5 }}>
    <Box
      component="img"
      src={YouTubeIcon}
      alt="YouTube"
      sx={{ width: 24, height: 24, display: 'block' }}
    />
  </IconButton>
  <IconButton size="sm" sx={{ p: 0.5 }}>
    <Box
      component="img"
      src={InstagramIcon}
      alt="Instagram"
      sx={{ width: 24, height: 24, display: 'block' }}
    />
  </IconButton>
  <IconButton size="sm" sx={{ p: 0.5 }}>
    <Box
      component="img"
      src={FacebookIcon}
      alt="Facebook"
      sx={{ width: 24, height: 24, display: 'block' }}
    />
  </IconButton>
  <IconButton size="sm" sx={{ p: 0.5 }}>
    <Box
      component="img"
      src={LinkedInIcon}
      alt="LinkedIn"
      sx={{ width: 24, height: 24, display: 'block' }}
    />
  </IconButton>
  <IconButton size="sm" sx={{ p: 0.5 }}>
    <Box
      component="img"
      src={EmojiObjectsIcon}
      alt="Behance"
      sx={{ width: 24, height: 24, display: 'block' }}
    />
  </IconButton>
</Box>
    </Box>
  </Box>

  <Typography level="body2" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
    © {new Date().getFullYear()} Filmder. Wszelkie prawa zastrzeżone.
  </Typography>
</Box>
      </Sheet>
    </CssVarsProvider>
  );
}
