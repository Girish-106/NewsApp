import React, { useEffect, useState } from "react";
import Newsinfo from "./Newsinfo";
import SavedNews from "./SavedNews";
import "./index.css";
import AuthForm from "./AuthForm";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { IoIosLogOut } from "react-icons/io";

function App() {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [savedNews, setSavedNews] = useState(() => {
    const saved = localStorage.getItem("savedNews");
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState("india");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search);

  const URL = `https://gnews.io/api/v4/search?q=${debouncedSearchTerm}&lang=en&country=in&category=general&max=10&apikey=ef580f184b3c5ceef7c3b18122e42146`;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getNews();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    localStorage.setItem("savedNews", JSON.stringify(savedNews));
  }, [savedNews]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  async function getNews() {
    const res = await fetch(URL);
    if (!res.ok) {
      console.error("Error fetching news");
      return;
    }
    const data = await res.json();
    setNews(data.articles);
  }

  const handleButtonClick = (value) => {
    setSearch(value);
  };

  const saveArticle = (article) => {
    setSavedNews((prevSaved) => {
      const alreadySaved = prevSaved.find((saved) => saved.url === article.url);
      if (alreadySaved) {
        return prevSaved;
      }
      return [...prevSaved, article];
    });
  };

  const removeSavedArticle = (url) => {
    setSavedNews((prevSaved) =>
      prevSaved.filter((article) => article.url !== url)
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (!user) {
    return <AuthForm onAuthStateChanged={setUser} />;
  }

  return (
    <>
      <div className="hero">
        <div className="left">
          <button onClick={() => handleButtonClick("Sport")}>Sport</button>
          <button onClick={() => handleButtonClick("Entertainment")}>
            Entertainment
          </button>
          <button onClick={() => handleButtonClick("Business")}>
            Business
          </button>
          <button onClick={() => handleButtonClick("Technology")}>
            Technology
          </button>
          <button onClick={() => handleButtonClick("Health")}>Health</button>
        </div>
        <div className="right">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="query_input"
          />
          <button onClick={getNews} className="getnews">
            Search
          </button>
          <button onClick={handleLogout} className="logout">
            <IoIosLogOut />
          </button>
        </div>
      </div>

      <h2>News Feed</h2>
      <div className="bg-[#292A2D]">
        {news.length > 0 ? (
          <Newsinfo info={news} onSave={saveArticle} />
        ) : (
          <div>No articles found.</div>
        )}
      </div>
      <SavedNews
        savedNews={savedNews}
        removeSavedArticle={removeSavedArticle}
      />
    </>
  );
}

export default App;
