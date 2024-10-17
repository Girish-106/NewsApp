import React from "react";
import "./SavedNews.css";

const SavedNews = ({ savedNews, removeSavedArticle }) => {
  const handleShare = (article) => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.description,
          url: article.url,
        })
        .then(() => console.log("Article shared successfully"))
        .catch((error) => console.error("Error sharing article:", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };
  return (
    <div className="savednews_card">
      <h2>Saved News</h2>
      {savedNews.length > 0 ? (
        <ul className="news-list">
          {savedNews.map((article) => (
            <li key={article.url} className="savecard">
              <div className="card-content">
                <div className="img-title">
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="article-image"
                    />
                  )}
                  <div>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                  </div>
                </div>
                <div className="savebuttons">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                  <button onClick={() => removeSavedArticle(article.url)}>
                    Remove
                  </button>
                  <button onClick={() => handleShare(article)}>
                    Share
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No saved articles.</div>
      )}
    </div>
  );
};
export default SavedNews;