import {GOBACK, SELECTCHILD, SETCURRNODE, SETSEARCH} from "../Types";
import {TestData} from "../TestData";
import {graphData, parsedData} from "../DataFragment"
const data = require('../para_step_goal_links_gold.json');


const initialState = {
  currNode: null,
  prevNodeStack: [],
  // graphData: TestData,
  parsedData: parsedData,
  graphData: graphData,
  // data: JSON.parse(data)
  data: data
}


const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOBACK:
      let newStack = JSON.parse(JSON.stringify(state.prevNodeStack))
      newStack.pop()
      return {
        ...state,
        currNode: state.prevNodeStack.pop(),
        // currNode: state.prevNodeStack.pop(),
        prevNodeStack: newStack
      }
    case SELECTCHILD:
      return {
        ...state,
        prevNodeStack: state.prevNodeStack.concat(state.currNode),
        // currNode: state.currNode.steps[action.data]
        currNode: state.graphData[action.data]
      }
    case SETCURRNODE:
      let item = state.parsedData[action.data]
      let index = typeof(item) !== "undefined" ? item.index : null
      return {
        ...state,
        prevNode: null,
        currNode: index !== null ? state.graphData[index] : null
      }
    default:
      return state;
  }


  // function isGoal(string) {
  //   let words = string.split(" ");
  //   let allCaps = true;
  // }

  // function bfs(search) {
  //   let queue = [];
  //
  //   for (let i = 0; i < state.graphData.length; i++) {
  //     queue.push(state.graphData[i]);
  //   }
  //
  //   let runs = 0;
  //   while (queue.length > 0 && runs < 50) {
  //     let v = queue.shift()
  //     if (v.goal === search) {
  //       return v;
  //     } else {
  //       for (let i = 0; i < v.steps.length; i++) {
  //         queue.push(v.steps[i])
  //       }
  //     }
  //     runs++
  //   }
  //
  //   return null;
  // }

  // switch (action.type) {
  //   case GOBACK:
  //     return {
  //       ...state,
  //       currNode: state.prevNodeStack[state.prevNodeStack.length - 1],
  //       prevNodeStack: state.prevNodeStack.slice(0, state.prevNodeStack.length - 1)
  //     }
  //   case SELECTCHILD:
  //     return {
  //       ...state,
  //       prevNodeStack: state.prevNodeStack.concat(state.currNode),
  //       currNode: state.currNode.steps[action.data]
  //     }
  //   case SETCURRNODE:
  //     // console.log("bfs out: " + bfs(action.data))
  //     // console.log(state.data.entries.length)
  //     return {
  //       ...state,
  //       prevNode: null,
  //       currNode: bfs(action.data)
  //     }
  //   default:
  //     return state;
  // }
}

export default graphReducer
