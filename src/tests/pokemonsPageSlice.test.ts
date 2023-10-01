import reducer, {
  getPageAction,
  getPageErrorAction,
  getPageSuccessAction,
} from "../redux/pokemonPage/slice";
import { PageState, PageType } from "../redux/pokemonPage/types";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    loading: false,
    error: "",
  });
});

test("should handle getPageAction", () => {
  const initialState: PageState = {
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    loading: false,
    error: "",
  };
  expect(
    reducer(initialState, getPageAction({ limit: 1, next: null }))
  ).toEqual({
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    loading: true,
    error: "",
  });
});

test("should handle getPageSuccessAction", () => {
  const previousState: PageState = {
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    loading: false,
    error: "",
  };
  const page: PageType = {
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        name: "",
        url: "",
      },
    ],
  };
  expect(reducer(previousState, getPageSuccessAction(page))).toEqual({
    data: page,
    loading: false,
    error: "",
  });
});

test("should handle getPageErrorAction", () => {
  const previousState: PageState = {
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    loading: true,
    error: "",
  };
  const errorMessage = "An error occurred";
  expect(reducer(previousState, getPageErrorAction(errorMessage))).toEqual({
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    loading: false,
    error: errorMessage,
  });
});
