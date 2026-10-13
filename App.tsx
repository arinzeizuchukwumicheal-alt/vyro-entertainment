import { useState } from "react";
import {
  Play, House, Film, Newspaper, UserRound, Search, Heart, MessageCircle,
  Share2, Bookmark, Plus, Sparkles, Flame, CircleUserRound
} from "lucide-react";

type Tab = "Shorts" | "Home" | "Movies" | "News" | "Profile";

const movies = [
  { title: "Midnight Run", genre: "Action · Thriller", year: "2026", label: "FREE", art: "poster-one", emoji: "🌃" },
  { title: "Golden Hour", genre: "Drama · Romance", year: "2025", label: "PREMIUM", art: "poster-two", emoji: "🌅" },
  { title: "Wild Signal", genre: "Adventure · Sci-Fi", year: "2026", label: "FREE", art: "poster-three", emoji: "🪐" },
  { title: "The Last Laugh", genre: "Comedy", year: "2025", label: "FREE", art: "poster-four", emoji: "🎭" },
  { title: "Blue District", genre: "Crime · Drama", year: "2024", label: "PREMIUM", art: "poster-five", emoji: "🌌" },
  { title: "Beyond Tomorrow", genre: "Sci-Fi · Adventure", year: "2026", label: "FREE", art: "poster-six", emoji: "🚀" }
];

const newsItems = [
  { category: "MOVIES", date: "Today", title: "The biggest movie releases to watch this week", summary: "A quick look at the films getting entertainment fans talking.", icon: "🎬" },
  { category: "CREATORS", date: "Today", title: "Creators are bringing fresh stories to short video", summary: "New voices, new formats, and more ways to discover talent.", icon: "📱" },
  { category: "MUSIC", date: "Yesterday", title: "What is trending across entertainment right now?", summary: "Catch up on conversations shaping the entertainment scene.", icon: "🎵" }
];

function App() {
  const [tab, setTab] = useState<Tab>("Shorts");
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [following, setFollowing] = useState(false);
  const [notice, setNotice] = useState("");

  const nav: { name: Tab; icon: typeof Play }[] = [
    { name: "Shorts", icon: Play },
    { name: "Home", icon: House },
    { name: "Movies", icon: Film },
    { name: "News", icon: Newspaper },
    { name: "Profile", icon: UserRound }
  ];

  function toggleSaved(title: string) {
    setSaved(current => current.includes(title) ? current.filter(x => x !== title) : [...current, title]);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => setTab("Shorts")} aria-label="VYRO home">VYRO<span>.</span></button>
        <div className="top-actions">
          <button className="icon-button" aria-label="Search" onClick={() => { setTab("Movies"); setNotice("Search movies below."); }}><Search size={20}/></button>
          <button className="avatar-button" aria-label="Profile" onClick={() => setTab("Profile")}><CircleUserRound size={21}/></button>
        </div>
      </header>

      <main className="main-content">
        {tab === "Shorts" && (
          <section className="shorts-screen">
            <div className="short-video">
              <div className="video-glow glow-a"></div><div className="video-glow glow-b"></div>
              <div className="shorts-top"><span className="live-pill"><span className="live-dot"></span> FOR YOU</span><Sparkles size={19}/></div>
              <div className="video-center"><div className="play-ring"><Play size={34} fill="currentColor"/></div><span>VYRO SHORTS</span><small>Your next favourite moment starts here.</small></div>
              <div className="video-caption">
                <div className="creator-line"><div className="creator-avatar">V</div><strong>@vyrocreator</strong><button className="follow-button" onClick={() => setFollowing(!following)}>{following ? "Following" : "Follow"}</button></div>
                <p>Fresh stories. New creators. Entertainment for you. <b>#VYRO #Shorts</b></p>
              </div>
              <div className="video-actions">
                <button onClick={() => setLiked(!liked)} className={liked ? "action active" : "action"}><Heart fill={liked ? "currentColor" : "none"}/><span>{liked ? "1.2K" : "1.1K"}</span></button>
                <button className="action" onClick={() => setNotice("Comments are a demo feature in this starter.")}><MessageCircle/><span>84</span></button>
                <button className="action" onClick={() => setNotice("Share this site link with a friend.")}><Share2/><span>Share</span></button>
                <button className="action" onClick={() => setNotice("Short saved to your demo list.")}><Bookmark/><span>Save</span></button>
              </div>
            </div>
          </section>
        )}

        {tab === "Home" && (
          <section className="page">
            <div className="hero-card">
              <div className="eyebrow"><Flame size={15}/> YOUR ENTERTAINMENT SPACE</div>
              <h1>Discover what<br/><span>moves you.</span></h1>
              <p>Short videos, movies, creators and stories — all in one place.</p>
              <button className="primary-button" onClick={() => setTab("Movies")}>Explore movies <Play size={16} fill="currentColor"/></button>
              <div className="hero-orb orb-one"></div><div className="hero-orb orb-two"></div>
            </div>
            <div className="section-heading"><div><span className="eyebrow">HANDPICKED FOR YOU</span><h2>Trending movies</h2></div><button className="text-button" onClick={() => setTab("Movies")}>See all</button></div>
            <div className="movie-grid compact">{movies.slice(0, 4).map(movie => <MovieCard key={movie.title} movie={movie} saved={saved.includes(movie.title)} onSave={() => toggleSaved(movie.title)} onOpen={() => setNotice(`${movie.title} details — demo view.`)}/>)}</div>
            <div className="section-heading"><div><span className="eyebrow">STAY IN THE LOOP</span><h2>Latest stories</h2></div><button className="text-button" onClick={() => setTab("News")}>See all</button></div>
            {newsItems.slice(0, 2).map(item => <NewsCard key={item.title} item={item}/>)}
          </section>
        )}

        {tab === "Movies" && (
          <section className="page">
            <div className="page-intro"><span className="eyebrow">YOUR NEXT WATCH</span><h1>Explore <span>Movies</span></h1><p>Find your next favourite story.</p></div>
            <label className="search-field"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search movies or genres"/></label>
            <div className="filter-row"><button className="filter-chip selected" onClick={() => setQuery("")}>All movies</button><button className="filter-chip" onClick={() => setQuery("Action")}>Action</button><button className="filter-chip" onClick={() => setQuery("Drama")}>Drama</button><button className="filter-chip" onClick={() => setQuery("Sci-Fi")}>Sci-Fi</button></div>
            <div className="movie-grid">{movies.filter(m => `${m.title} ${m.genre}`.toLowerCase().includes(query.toLowerCase())).map(movie => <MovieCard key={movie.title} movie={movie} saved={saved.includes(movie.title)} onSave={() => toggleSaved(movie.title)} onOpen={() => setNotice(`${movie.title}: trailer and viewing options are placeholders until connected to licensed content.`)}/>)}</div>
            {movies.filter(m => `${m.title} ${m.genre}`.toLowerCase().includes(query.toLowerCase())).length === 0 && <div className="empty-state">No movies match that search.</div>}
          </section>
        )}

        {tab === "News" && (
          <section className="page">
            <div className="page-intro"><span className="eyebrow">WHAT'S HAPPENING</span><h1>Entertainment <span>News</span></h1><p>Stories and updates from the entertainment world.</p></div>
            <div className="news-feature"><div className="news-art">✦</div><div className="eyebrow">VYRO EDITOR'S PICK</div><h2>Your daily entertainment update starts here.</h2><p>Explore movie news, creator updates, music and more.</p></div>
            {newsItems.map(item => <NewsCard key={item.title} item={item}/>)}
            <p className="demo-note">Sample articles shown for the prototype. Connect a verified news source before launch.</p>
          </section>
        )}

        {tab === "Profile" && (
          <section className="page profile-page">
            <div className="profile-cover"><div className="cover-orb"></div></div>
            <div className="profile-main"><div className="big-avatar">V</div><button className="outline-button" onClick={() => setNotice("Profile editing needs account storage to be connected.")}>Edit profile</button><h1>VYRO Creator</h1><p className="muted">@vyrocreator</p><p>Sharing entertainment, stories and moments worth watching.</p><div className="stats"><div><strong>0</strong><span>Posts</span></div><div><strong>0</strong><span>Followers</span></div><div><strong>0</strong><span>Following</span></div></div></div>
            <div className="profile-section"><h2><Bookmark size={18}/> Saved movies</h2>{saved.length ? saved.map(title => <div className="saved-row" key={title}>{title}<button className="text-button" onClick={() => toggleSaved(title)}>Remove</button></div>) : <div className="empty-state">Movies you save will appear here.</div>}</div>
            <button className="upload-button" onClick={() => setNotice("Uploads require a secure backend and video hosting service.")}><Plus size={18}/> Create a post</button>
          </section>
        )}
      </main>

      {notice && <div className="toast" role="status"><span>{notice}</span><button onClick={() => setNotice("")}>OK</button></div>}

      <nav className="bottom-nav" aria-label="Main navigation">
        {nav.map(({ name, icon: Icon }) => <button key={name} className={tab === name ? "nav-item active" : "nav-item"} onClick={() => { setTab(name); setNotice(""); }}><Icon size={21} strokeWidth={tab === name ? 2.5 : 1.8}/><span>{name}</span></button>)}
      </nav>
    </div>
  );
}

function MovieCard({ movie, saved, onSave, onOpen }: {
  movie: { title: string; genre: string; year: string; label: string; art: string; emoji: string };
  saved: boolean; onSave: () => void; onOpen: () => void;
}) {
  return <article className="movie-card">
    <button className={`poster ${movie.art}`} onClick={onOpen} aria-label={`Open ${movie.title}`}>
      <span className="poster-emoji">{movie.emoji}</span><span className="poster-word">{movie.title}</span><span className="poster-year">{movie.year}</span>
      <span className={movie.label === "FREE" ? "movie-badge free" : "movie-badge premium"}>{movie.label}</span>
    </button>
    <div className="movie-meta"><div><h3>{movie.title}</h3><p>{movie.genre}</p></div><button className={saved ? "save-button saved" : "save-button"} onClick={onSave} aria-label={saved ? "Remove saved movie" : "Save movie"}><Bookmark size={18} fill={saved ? "currentColor" : "none"}/></button></div>
  </article>;
}

function NewsCard({ item }: { item: { category: string; date: string; title: string; summary: string; icon: string } }) {
  return <article className="news-card"><div className="news-icon">{item.icon}</div><div className="news-copy"><div className="news-meta"><span>{item.category}</span><span>{item.date}</span></div><h3>{item.title}</h3><p>{item.summary}</p></div></article>;
}

export default App;