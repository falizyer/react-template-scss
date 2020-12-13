import React, {useEffect, useRef, useState} from "react";

import {ITopHeadlineArticle, NewsApiRepository} from "../../repositories/news-api.repository";
import RtsTable from "../../components/rts-table/rts-table";
import Overlay from "../../components/overlay";

const Article = () => {
  const [topHeadlines, setTopHeadlines] = useState<ITopHeadlineArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    NewsApiRepository.getTopHeadlines()
      .then(data => data.articles.map((article, index) => ({id: index, ...article})))
      .then(articles => {
        setTopHeadlines(articles || []);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container column box">
      <h3>Working with articles</h3>
    </div>
  );
};

export default Article;
