import React, {useContext, useEffect, useRef, useState} from "react";

import RtsTable from "../../components/rts-table/rts-table";
import Overlay from "../../components/overlay";
import {DataContext} from "./news-data-context";
import {Link} from "react-router-dom";

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

const RowElement = (row) => {
  const [event, setEvent] = useState<any>(null);
  return (
    <React.Fragment>
      <tr onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}>
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

  function onClick() {
    row.navigate(`/news/top-headlines/${row.id}`);
  }

  function onMouseOver($event) {
    setEvent($event);
  }

  function onMouseLeave() {
    setEvent(null);
  }
};

const TableRow = (row) => {
  return (
    <Link key={row.title}
          to={`/news/top-headlines/${row.id}`}
          component={(rest) => <RowElement id={row.id}
                                           title={row.title}
                                           source={row.source}
                                           author={row.author}
                                           urlToImage={row.urlToImage}
                                           description={row.description}
                                           publishedAt={row.publishedAt}
                                           {...rest}/>}/>
  );
};

const TopHeadlines = () => {
  const {state, dispatch} = useContext(DataContext);

  return (
    <React.Fragment>
      <header className="container column box">
        <h3>Working with tables</h3>
      </header>

      <div className="container column box">
        <p>
          Here you may find basic example of how table works with pure react
        </p>

        <RtsTable
          className="clickable"
          isLoading={state.isLoading}
          data={state.articles}
          total={state.totalArticles}
          page={state.page}
          onNext={page => loadPage(page)}
          onPrevious={page => loadPage(page)}
          keys={[
            {key: "title", label: "Title"},
            {key: "author", label: "Author"},
            {key: "publishedAt", label: "Published"}]}
          row={TableRow}
        >
          {state.error
            ? (
              <tr>
                <td className="color-error" colSpan={3}>{state.error.message}</td>
              </tr>
            ) : void 0}
        </RtsTable>


      </div>
    </React.Fragment>
  );

  function loadPage(page) {
    dispatch({
      type: "load-page",
      payload: {page}
    });
  }
};

export default TopHeadlines;
