import {setSearch} from "../application/actions/Search";
import {goBack, selectChild, setCurrNode} from "../application/actions/Graph";
import {connect} from "react-redux";
import React, {useEffect} from "react";
import { useVisibilityHook } from 'react-observer-api';

function ScrollNode(props) {
  const { setElement, isVisible } = useVisibilityHook();

  useEffect(() => {
    if (isVisible) {
    // ...Logics/API call can trigger by watching isVisible property
    }
  }, [isVisible])

  function handleCallNode(node) {
    props.setCurrNode(format(node))
  }

  const format = (s) => {
    if (typeof s !== 'string') return ''
    s =  s.toLowerCase()
    if (s.charAt(s.length - 1) === ".") {
      return s.charAt(0).toUpperCase() + s.slice(1)
    } else {
      return s.charAt(0).toUpperCase() + s.slice(1) + "."
    }
  }

  return (
    <div ref={setElement}>
      {isVisible && (
        <div
          style={{
            backgroundColor: "rgb(6,98,191)",
            padding: 15, borderRadius: 50, color: "white",
            maxWidth: "300px",
            // display: "inline-block",
            display: "flex",
            alignItems: "center",
            flexGrow: 0,
            flexShrink: 0,
            flexWrap: "no-wrap",
            marginLeft: 5,
            marginRight: 5
          }}
          onClick={() => handleCallNode(props.node.goal)}
        >{props.node.goal.length > 30 ? props.node.goal.slice(0, 30) + "..." : props.node.goal}</div>
      )}
    </div>
  )
}

/* Redux */
const mapStateToProps = (state) => {
  return {
    currNode: state.graphReducer.currNode,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrNode: (search) => dispatch(setCurrNode(search)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollNode)
