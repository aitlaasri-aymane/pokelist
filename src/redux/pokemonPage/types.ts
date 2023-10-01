export type PageResultType = {
  name: string;
  url: string;
};

export type PageType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PageResultType[];
};

export type PageState = {
  data: PageType;
  loading: boolean;
  error: string;
};

export type PageStateType = {
  page: PageState;
};

export const PAGE = "page";
export type PAGE = typeof PAGE;

export const GET_PAGE = `${PAGE}/getPageAction`;
export type GET_PAGE = typeof GET_PAGE;
