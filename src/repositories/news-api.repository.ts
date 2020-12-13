import axios, {AxiosResponse} from "axios";

export enum Countries {
  ae = "ae",
  ar = "ar",
  at = "at",
  au = "au",
  be = "be",
  bg = "bg",
  br = "br",
  ca = "ca",
  ch = "ch",
  cn = "cn",
  co = "co",
  cu = "cu",
  cz = "cz",
  de = "de",
  eg = "eg",
  fr = "fr",
  gb = "gb",
  gr = "gr",
  hk = "hk",
  hu = "hu",
  id = "id",
  ie = "ie",
  il = "il",
  in = "in",
  it = "it",
  jp = "jp",
  kr = "kr",
  lt = "lt",
  lv = "lv",
  ma = "ma",
  mx = "mx",
  my = "my",
  ng = "ng",
  nl = "nl",
  no = "no",
  nz = "nz",
  ph = "ph",
  pl = "pl",
  us = "us"
}

export enum Categories {
  business = "business",
  entertainment = "entertainment",
  general = "general",
  health = "health",
  science = "science",
  sports = "sports",
  technology = "technology"
}

export interface ITopHeadlineArticle {
  id?: number;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: {
    id: string;
    name: string;
  }
}

export interface ITopHeadlinesParameters {
  country: Countries;
  category?: Categories;
  q?: string;
  pageSize?: number;
  apiKey?: string;
}

export interface ITopHeadlinesResponse {
  status: string;
  totalResults: number;
  articles: ITopHeadlineArticle[];
}

export class NewsApiRepository {
  static readonly ApiKey = "c1b4621a8c1945a793276dd503e9d9d2";
  static readonly URL = "http://newsapi.org/v2";

  static getTopHeadlines(params: ITopHeadlinesParameters = {country: Countries.us}): Promise<ITopHeadlinesResponse> {
    return axios.get<ITopHeadlinesParameters, AxiosResponse<ITopHeadlinesResponse>>(`${this.URL}/top-headlines`, {
      params: {
        apiKey: this.ApiKey,
        ...params,
      }
    }).then(response => response.data);
  }
}
