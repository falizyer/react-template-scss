import React, {useContext} from "react";

import Loading from "../../components/loading";

import {DataContext} from "./news-data-context";

import "./article.scss";

const Article = ({match: {params: {id}}}) => {
  const dataContext = useContext(DataContext);
  const article = dataContext.state.articles[id];

  return (
    <React.Fragment>
      {
        dataContext.state.isLoading
          ? (<div className="container box all-center"><Loading/></div>)
          : (
            <React.Fragment>
              <header className="container column box">
                <h3>{article.title}</h3>
                <span>{new Date(article.publishedAt).toDateString()}</span>
              </header>

              <div className="rts__article__content container box wrap">
                <img src={article.urlToImage} alt={article.title} width={400}/>
                <p>{article.content || article.description}</p>
              </div>
            </React.Fragment>
          )
      }
    </React.Fragment>
  );
};

export default Article;
