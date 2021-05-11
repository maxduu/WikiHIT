import {SETSEARCH} from "../Types";

export const setSearch = (search) => (
  {
    type: SETSEARCH,
    data: search
  }
)
