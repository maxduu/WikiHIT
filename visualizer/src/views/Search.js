import React, {useState} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import {connect} from "react-redux";
import "./Styles.css"
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {setSearch} from "../application/actions/Search";
import {setCurrNode} from "../application/actions/Graph";
import {setDisplay} from "../application/actions/Nav";

function Search(props) {
  const [search, setSearch] = useState("");

  const format = (s) => {
    if (typeof s !== 'string') return ''
    s =  s.toLowerCase()
    if (s.charAt(s.length - 1) === ".") {
      return s.charAt(0).toUpperCase() + s.slice(1)
    } else {
      return s.charAt(0).toUpperCase() + s.slice(1) + "."
    }
  }

  function handleSearch() {

    props.callSearch(format(search));
    props.setCurrNode(format(search));
  }

  return (
  <div style={{paddingBottom: 10, backgroundColor: "#383838"}}>
    <div style={{display: "flex", justifyContent: "center", marginBottom: 10, alignItems: "center", height: 25}}>
      <div style={{color: "white"}} className={"menuButton"}
        onClick={() => props.setDisplay("goal-step")}
      >Goal-Step</div>
      <div style={{color: "white", marginLeft: 10, marginRight: 10}}>|</div>
      <div style={{color: "white"}} className={"menuButton"}
        onClick={() => props.setDisplay("tree")}
      >Graph</div>
    </div>
    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div className={"searchDiv"}>
        <input type="text" name="name" className={"searchInput"} onChange={(e) => setSearch(e.target.value)}/>
      </div>

      <div className={"searchButton"} onClick={() => {handleSearch()}}>
        <SearchIcon style={{color: "white"}}/>
      </div>
    </div>

  </div>
  )
}

/* Redux */
const mapStateToProps = (state) => {
  return {
    search: state.searchReducer.search,
    currNode: state.graphReducer.currNode
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    callSearch: (search) => dispatch(setSearch(search)),
    setCurrNode: (search) => dispatch(setCurrNode(search)),
    setDisplay: (display) => dispatch(setDisplay(display))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
