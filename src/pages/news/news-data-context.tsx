import React, {Dispatch, Reducer, ReducerAction, useEffect, useReducer, useState} from "react";
import {ITopHeadlineArticle, NewsApiRepository} from "../../repositories/news-api.repository";

export interface IDataState {
  articles: ITopHeadlineArticle[];
  article: ITopHeadlineArticle | null;
  totalArticles: number;
  isLoading: boolean;
}

export interface IDataAction {
  type: string;
  payload: Partial<IDataState>;
}

export interface INewsDataContextProps {
  readonly children: JSX.Element | JSX.Element[];
}

export interface IContextValue {
  state: IDataState;
  dispatch: Dispatch<ReducerAction<Reducer<IDataState, IDataAction>>> | null;
}

const initialState: IDataState = {
  articles: [],
  article: null,
  totalArticles: 0,
  isLoading: true
};

export const DataContext = React.createContext<IContextValue>({
  state: initialState,
  dispatch: null
});

function reducer(state: IDataState, action: IDataAction) {
  switch (action.type) {
    case "load-started":
      return Object.assign(state, {
        isLoading: true
      });
    case "load-finished":
      const {articles, totalArticles} = action.payload;
      return Object.assign({}, state, {
        articles,
        totalArticles,
        isLoading: false
      });
    case "article-selected":
      const {article} = action.payload;
      return Object.assign({}, state, {
        article
      });
    default:
      throw new Error();
  }
}

const NewsDataContext = (props: INewsDataContextProps) => {
  const [state, dispatch] = useReducer<Reducer<IDataState, IDataAction>>(reducer, initialState);

  useEffect(() => {
    dispatch({type: "load-started", payload: {}});
    NewsApiRepository.getTopHeadlines()
      .then(data => {
        dispatch({
          type: "load-finished",
          payload: {
            articles: data.articles.map((article, index) => ({id: index, ...article})),
            totalArticles: data.totalResults
          }
        });
      });
  }, []);

  return (
    <DataContext.Provider value={{
      state,
      dispatch
    }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default NewsDataContext;
