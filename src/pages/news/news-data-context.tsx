import React, {Dispatch, Reducer, ReducerAction, useEffect, useReducer} from "react";
import {Countries, ITopHeadlineArticle, NewsApiRepository} from "../../repositories/news-api.repository";

export interface IDataState {
  articles: ITopHeadlineArticle[];
  page: number;
  totalArticles: number;
  isLoading: boolean;
  error: {
    message: string
  } | null;
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
  dispatch: Dispatch<ReducerAction<Reducer<IDataState, IDataAction>>>;
}

const initialState: IDataState = {
  articles: [],
  page: 1,
  totalArticles: 0,
  isLoading: true,
  error: null
};

export const DataContext = React.createContext<IContextValue>({
  state: initialState,
  dispatch: () => void 0,
});

function reducer(state: IDataState, action: IDataAction) {
  const {articles, totalArticles, page, error} = action.payload;

  switch (action.type) {
    case "load-started":
      return Object.assign(state, {
        isLoading: true
      });
    case "load-finished":
      return Object.assign({}, state, {
        articles,
        totalArticles,
        error: null,
        isLoading: false
      });
    case "load-error":
      return Object.assign({}, state, {
        error,
        isLoading: false
      });
    case "load-page":
      return Object.assign({}, state, {
        page,
        isLoading: true
      });
    default:
      throw new Error();
  }
}

const NewsDataContext = (props: INewsDataContextProps) => {
  const [state, dispatch] = useReducer<Reducer<IDataState, IDataAction>>(reducer, initialState);

  useEffect(() => {
    console.log(state.page);
    NewsApiRepository.getTopHeadlines({country: Countries.us, page: state.page})
      .then(data => {
        dispatch({
          type: "load-finished",
          payload: {
            articles: data.articles.map((article, index) => ({id: index, ...article})),
            totalArticles: data.totalResults
          }
        });
      })
      .catch(error => {
        let payload = {
          error: {
            message: "Unhandled Server Error"
          }
        }
        if (error.response?.data) {
          payload = {
            error: {
              message: `Error: ${error.response?.data.message}`
            }
          }
        }
        dispatch({
          type: "load-error",
          payload
        });
      });
  }, [state.page]);

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
