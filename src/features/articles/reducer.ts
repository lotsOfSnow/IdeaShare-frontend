import { combineReducers } from "redux";
import { Nullable } from "../../types/nullable";
import * as actions from "./constants";
import { Article, ArticlePreview, Order, OrderedBy } from "./models";
import { ArticlesActions } from "./types";

export type ArticleState = Readonly<{
  selected: Article;
  previews: {
    list: ArticlePreview[];
    isLoading: boolean;
    isLoaded: boolean;
    totalCount: number;
  };
  search: {
    list: ArticlePreview[];
    isLoading: boolean;
    isLoaded: boolean;
    totalCount: number;
    filterTitle: Nullable<string>;
  };
  config: {
    perPage: number;
    page: number;
    orderedBy: OrderedBy;
    order: Order;
    withTag: Nullable<string>;
  };
}>;

const initialState: ArticleState = {
  selected: {
    isLoading: false,
    isLoaded: false,
    loadingError: false,
    id: null,
    author: null,
    title: null,
    body: null,
    description: null,
    tags: null,
    creationDate: null,
    featuredImage: null,
  },
  previews: {
    list: [],
    isLoading: false,
    isLoaded: false,
    totalCount: 0,
  },
  search: {
    list: [],
    isLoading: false,
    isLoaded: false,
    totalCount: 0,
    filterTitle: null,
  },
  config: {
    orderedBy: "Date",
    order: "Descending",
    perPage: 10,
    page: 1,
    withTag: null,
  },
};

export default combineReducers<ArticleState, ArticlesActions>({
  selected: (state = initialState.selected, action) => {
    switch (action.type) {
      case actions.FETCH_ARTICLE_STARTED: {
        return {
          ...state,
          isLoading: true,
          isLoaded: false,
          loadingError: false,
        };
      }
      case actions.FETCH_ARTICLE_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          isLoaded: true,
          loadingError: false,
          ...action.payload,
        };
      }
      case actions.FETCH_ARTICLE_FAILURE: {
        return {
          ...state,
          loadingError: true,
          ...initialState.selected,
        };
      }
      default:
        return state;
    }
  },
  previews: (state = initialState.previews, action) => {
    switch (action.type) {
      case actions.FETCH_PREVIEW_LIST_STARTED: {
        return {
          ...state,
          isLoading: true,
          isLoaded: false,
        };
      }
      case actions.FETCH_PREVIEW_LIST_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          isLoaded: true,
          list: action.payload.list,
          totalCount: action.payload.totalCount,
        };
      }
      case actions.FETCH_PREVIEW_LIST_FAILURE: {
        return {
          ...state,
          ...initialState.previews,
        };
      }
      default:
        return state;
    }
  },
  search: (state = initialState.search, action) => {
    switch (action.type) {
      case actions.SET_FILTER_TITLE: {
        return {
          ...state,
          filterTitle: action.payload,
          isLoaded: false,
          isLoading: false,
        };
      }
      case actions.FETCH_SEARCH_PREVIEW_LIST_STARTED: {
        return {
          ...state,
          isLoading: true,
          isLoaded: false,
        };
      }
      case actions.FETCH_SEARCH_PREVIEW_LIST_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          isLoaded: true,
          list: action.payload.list,
          totalCount: action.payload.totalCount,
        };
      }
      case actions.FETCH_SEARCH_PREVIEW_LIST_FAILURE: {
        return {
          ...state,
          ...initialState.search,
        };
      }
      default:
        return state;
    }
  },
  config: (state = initialState.config, action) => {
    switch (action.type) {
      case actions.SET_ARTICLES_PAGE: {
        return {
          ...state,
          page: action.payload,
        };
      }
      case actions.SET_ARTICLES_PER_PAGE: {
        return {
          ...state,
          perPage: action.payload,
        };
      }
      case actions.SET_ORDERED_BY: {
        return {
          ...state,
          orderedBy: action.payload,
        };
      }
      case actions.SET_ORDER: {
        return {
          ...state,
          order: action.payload,
        };
      }
      case actions.SET_WITH_TAG: {
        return {
          ...state,
          withTag: action.payload,
        };
      }
      default:
        return state;
    }
  },
});
