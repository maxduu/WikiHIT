import {SETDISPLAY} from "../Types";

export const setDisplay = (display) => (
  {
    type: SETDISPLAY,
    data: display
  }
)
