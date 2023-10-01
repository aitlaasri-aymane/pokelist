import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PAGE, PageState, PageType } from "./types";

const pageInitialState: PageState = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  loading: false,
  error: "",
};

export const pageSlice = createSlice({
  name: PAGE,
  initialState: pageInitialState,
  reducers: {
    getPageAction: (
      state: PageState,
      { payload }: PayloadAction<{ limit: number; next: string | null }>
    ) => {
      state.loading = true;
      state.error = "";
    },
    getPageSuccessAction: (
      state: PageState,
      { payload: page }: PayloadAction<PageType>
    ) => {
      state.loading = false;
      state.data = page;
    },
    getPageErrorAction: (
      state: PageState,
      { payload: error }: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const { getPageAction, getPageSuccessAction, getPageErrorAction } =
  pageSlice.actions;
export default pageSlice.reducer;
