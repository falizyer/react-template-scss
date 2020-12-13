import React, {useEffect, useRef, useState} from "react";

import {ITopHeadlineArticle, NewsApiRepository} from "../../repositories/news-api.repository";
import RtsTable from "../../components/rts-table/rts-table";
import Overlay from "../../components/overlay";

const DescriptionHint = ({title, description, url, event}) => {
  const {top, x} = event.target.getBoundingClientRect();
  return (<Overlay className="rts-card" top={top} left={event.nativeEvent.pageX + 10}>
    <h3>{title}</h3>
    <br/>
    <img src={url} alt={title} width={400}/>
    <br/>
    {description}
  </Overlay>);
};

const TableRow = (row) => {
  const [event, setEvent] = useState<any>(null);

  return (
    <React.Fragment key={row.title}>
      <tr onMouseOver={($event) => setEvent($event)} onMouseLeave={() => {setEvent(null)}}>
        <td>{row.title}</td>
        <td>{row.author || row.source.name}</td>
        <td>{new Date(row.publishedAt).toDateString()}</td>
      </tr>
      {event ? (<DescriptionHint url={row.urlToImage}
                                 event={event}
                                 title={row.title}
                                 description={row.description}/>) : null}
    </React.Fragment>
  );
};

const TopHeadlines = () => {
  const [topHeadlines, setTopHeadlines] = useState<ITopHeadlineArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    NewsApiRepository.getTopHeadlines()
      .then(data => {
        setTopHeadlines(data.articles || []);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container column box">
      <h3>Working with tables</h3>
      <p>
        Here you may find basic example of how table works with pure react
      </p>
      <RtsTable
        className="clickable"
        isLoading={isLoading}
        data={topHeadlines}
        keys={[{key: "title", label: "Title"}, {key: "author", label: "Author"}, {
          key: "publishedAt",
          label: "Published"
        }]}
        row={TableRow}
      />
    </div>
  );
};

export default TopHeadlines;
