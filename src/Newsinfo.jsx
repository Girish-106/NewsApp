import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Newsinfo = ({ info, onSave }) => {
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
    <div className="container mt-5">
      <div className="row gy-4">
        {info.map((article) => (
          <div key={article.url} className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex">
            <div className="card h-100 d-flex flex-column" style={{ backgroundColor: '#7A7D85' }}>
              <img src={article.image} alt="" className="card-img-top img-fluid" />
              <div className="card-body">
                <h3 className="card-title" style={{ color: 'black' }}>
                  {article.title}
                </h3>
                <p className="card-text" style={{
                  maxHeight: "4.8em",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  color: 'black'
                }}>
                  {article.description}
                </p>
                <span className="source">
                  {article.source.name}
                </span>
              </div>
              <div className="card-footer mt-auto d-flex justify-content-between">
                <button onClick={() => onSave(article)} className="btn btn-dark btn-sm">
                  Save
                </button>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Read more
                </a>
                <button onClick={() => handleShare(article)} className="btn btn-success btn-sm">
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsinfo;
