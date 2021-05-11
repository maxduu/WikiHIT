import React, {useEffect, useState} from "react"
import {setSearch} from "../application/actions/Search";
import {goBack, selectChild, setCurrNode} from "../application/actions/Graph";
import {connect} from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import "./Styles.css"
// import Tree from 'react-tree-graph';
import Tree from 'react-d3-tree';

function View(props) {
  const [tree, setTree] = useState(null)
  const [translate, setTranslate] = useState({x: 0, y: 0})

  useEffect(() => {
    makeTree()
  }, [props.currNode])

  function hasChildren(step) {
    return !isNaN(parseInt(step))
  }

  function handleCallNode(node) {
    props.setCurrNode(format(node))
  }

  useEffect(() => {
    // const dimensions = treeContainer.getBoundingClientRect();


  }, [])

  const format = (s) => {
    if (typeof s !== 'string') return ''
    s =  s.toLowerCase()
    if (s.charAt(s.length - 1) === ".") {
      return s.charAt(0).toUpperCase() + s.slice(1)
    } else {
      return s.charAt(0).toUpperCase() + s.slice(1) + "."
    }
  }

  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <rect width="20" height="20" x="-10" onClick={toggleNode} fill={nodeDatum.children && nodeDatum.children.length > 0 ? "slategray" : "rgb(6,98,191)"}/>
      <text fill="white" strokeWidth="0" x="20">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes?.department && (
        <text fill="black" x="20" dy="20" strokeWidth="1">
          Department: {nodeDatum.attributes?.department}
        </text>
      )}
    </g>
  );

  function makeTree() {
    let tree = {}
    if (props.currNode !== null) {
      tree = {
        name: props.currNode.goal,
        children: []
      }

      for (let i = 0; i < props.currNode.children.length; i++) {
        let child = props.currNode.children[i]
        let curr = tree


        // while (curr.children && curr.children.length > 0) {
        //
        // }

        if (hasChildren(child)) {
          tree.children[i] = {
            name: props.graphData[parseInt(child)].goal,
            children: []
          };
          for (let j = 0; j < props.graphData[parseInt(child)].children.length; j++) {
            let subChild = props.graphData[parseInt(child)].children[j]
            if (hasChildren(subChild)) {
              tree.children[i].children[j] = {
                name: props.graphData[parseInt(subChild)].goal,
                children: []
              };
            } else {
              tree.children[i].children[j] = {
                name: subChild,
                // children: null
              };
            }
          }
        } else {
          tree.children[i] = {
            name: child,
            // children: null
          };
        }
      }
    }
    setTree(tree)
  }

  function recMakeTree(tree, curr) {

  }

  return (
    <div style={{height: "100%", flex: 1}}>

      <div style={{width: "100vw", height: 35, display: "flex", overflow: "hidden", overflowX: "scroll", marginTop: 10, marginBottom: 10}}
           className={"scrollView"}>
        {props.graphData.map((node) => (
          <div
            style={{
              backgroundColor: "rgb(6,98,191)",
              padding: 15, borderRadius: 50, color: "white",
              maxWidth: "300px",
              display: "flex",
              alignItems: "center",
              flexGrow: 0,
              flexShrink: 0,
              marginLeft: 5,
              marginRight: 5
            }}
            onClick={() => handleCallNode(node.goal)}
          >{node.goal.length > 30 ? node.goal.slice(0, 30) + "..." : node.goal}</div>
          // <ScrollNode node={node}/>
        ))}
      </div>

      { props.display == "goal-step" ?
      <div style={{display: "flex", flex: 1, height: "100%"}}>
        <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>

          {props.prevNodeStack.length > 0 &&
          <div
            onClick={() => props.goBack()}
            className={"backButton"}
          >
            <ChevronLeftIcon style={{color: "white"}}/>
          </div>
          }

          {props.currNode !== null && typeof props.currNode !== "string" &&
          <div
            style={{
              // backgroundColor: "#2b56d2",
              backgroundColor: "rgb(6,98,191)",
              padding: 15, borderRadius: 50, color: "white"
            }}
          >{props.currNode == null ? "null" : props.currNode.goal}</div>
          }
        </div>

        <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div>{
            props.currNode !== null && typeof(props.currNode) !== "string" &&
            <div>{props.currNode.children.map((step, index) => (
              <div style={{display: "flex", alignItems: "center"}}>
                <div
                  className={"similarity"}
                  style={{color: "white", fontSize: 12}}
                >
                  { parseFloat(props.currNode.retrieved_goals_similarity[index]).toFixed(2) }
                </div>

                <div
                  style={{
                    backgroundColor: "rgb(6,98,191)",
                    padding: 15,
                    borderRadius: 50, color: "white", margin: 10,
                    height: 10,
                    display: "flex",
                    alignItems: "center"
                  }}
                >

                  { hasChildren(step) ?
                    props.graphData[parseInt(step)].goal : step
                  }
                </div>

                {hasChildren(step) &&
                <div
                  className={"plusButton"}
                  onClick={() => props.selectChild(parseInt(step))}
                >
                  <AddIcon style={{color: "white"}}/>
                </div>
                }
              </div>
            ))}</div>
          }</div>
        </div>
      </div>

      :

        <div>
          {tree && tree !== {} &&
          <div style={{ width: '100vw', height: '90vh' }}>
            <Tree
              data={tree}
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              style={{color: "white"}}
              // renderCustomNodeElement={({ nodeDatum, toggleNode }) => {(<div style={{width: 30, height: 30, backgroundColor: "red"}}></div>)}}
              renderCustomNodeElement={renderRectSvgNode}
              // height={800}
              // separation={{nonSiblings: 100, siblings: 200}}
              // width={800}
              // orientation={"vertical"}
              // animated
            />
          </div>
          }
        </div>

      }


    </div>
  )

  // if (props.display === "goal-step") {
  //   return (
  //
  //   )
  // } else {
  //
  // }

  // return (
    // <div>
    //   {JSON.stringify(props.currNode)}
    //   <div style={{color: "white"}}>
    //     {/*{JSON.stringify(props.graphData[2])}*/}
    //     {props.currNode !== null && props.currNode.children &&
    //       <div>
    //         {props.currNode.children.map((child) => (
    //           <div>
    //             {child}
    //           </div>
    //         ))}
    //       </div>
    //     }
    //   </div>
    //   {/*{props.currNode !== null && props.currNode.children &&*/}
    //   {/*  <div>*/}
    //   {/*    {props.currNode.children.map((child) => (*/}
    //   {/*      <div>*/}
    //   {/*        Bruh*/}
    //   {/*        {JSON.stringify(child)}*/}
    //   {/*      </div>*/}
    //   {/*    ))}*/}
    //   {/*  </div>*/}
    //   {/*}*/}
    // </div>
  // )
}

/* Redux */
const mapStateToProps = (state) => {
  return {
    search: state.searchReducer.search,
    currNode: state.graphReducer.currNode,
    prevNodeStack: state.graphReducer.prevNodeStack,
    parsedData: state.graphReducer.parsedData,
    graphData: state.graphReducer.graphData,
    display: state.navReducer.display
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    callSearch: (search) => dispatch(setSearch(search)),
    setCurrNode: (search) => dispatch(setCurrNode(search)),
    selectChild: (i) => dispatch(selectChild(i)),
    goBack: () => dispatch(goBack())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
