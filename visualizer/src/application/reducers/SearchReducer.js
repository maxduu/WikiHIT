import {SETSEARCH} from "../Types";

const initialState = {
  search: "bruh",
}

const searchReducer = (state = initialState, action) => {

  switch (action.type) {

    case SETSEARCH:
      // console.log(format(action.data))
      return {
        ...state,
        search: action.data
      }
    default:
      return state;
  }
}

export default searchReducer
