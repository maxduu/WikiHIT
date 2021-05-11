import {GOBACK, SELECTCHILD, SETCURRNODE} from "../Types";

export const setCurrNode = (search) => (
  {
    type: SETCURRNODE,
    data: search
  }
)

export const selectChild = (index) => (
  {
    type: SELECTCHILD,
    data: index
  }
)

export const goBack = () => (
  {
    type: GOBACK,
    data: null
  }
)
