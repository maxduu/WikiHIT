import {SETDISPLAY} from "../Types";

const initialState = {
  display: "goal-step",
}

const navReducer = (state = initialState, action) => {

  switch (action.type) {
    case SETDISPLAY:
      return {
        ...state,
        display: action.data
      }
    default:
      return state;
  }
}

export default navReducer
