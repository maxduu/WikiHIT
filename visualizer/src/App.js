import logo from './logo.svg';
import './App.css';
import Search from "./views/Search";
import View from "./views/View";
import GridLines from 'react-gridlines';
import React from "react";

function App() {
  return (
    <div
      style={{backgroundColor: "#222222"}}
    >
      <GridLines className="grid-area" cellWidth={100} strokeWidth={2} cellWidth2={20} lineColor2={"#1d1d1d"} lineColor={"#282828"}>
        <div style={{flex: 1, display: "flex", flexDirection: "column",
        minHeight: "100vh"
        }}>
          <Search />
          <View />
        </div>
      </GridLines>
    </div>

  );
}

export default App;
