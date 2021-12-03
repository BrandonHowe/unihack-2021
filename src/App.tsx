import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { ArticlePage } from './views/Article/Article';
import LandingPage from './views/LandingPage/LandingPage';
import TreePage from './views/TreePage/TreePage';

function Home() {
  return <h1>djfaodji</h1>
}

function App() {
  const location = useLocation();

  return (
    <div id="app">
        { location.pathname !== "/" && false && <div>
            <div className="mainContent">
                <div className="channelList">
                    <div className="channelHeader">
                        <img className="channelLogo" src="@/assets/Logo.png" />
                    </div>
                </div>
                <div className="rightBox">
                    <div className="navIndicator">
                        <div className="navIndicatorContent">
                            <span className="channelHash">#</span>
                            <span style={{ color: "#FFF" }}>{ location.pathname }</span>
                        </div>
                    </div>
                      <div>
                        <Routes>
                          <Route path="/" element={<Home />}></Route>
                          <Route path="/article/:id" element={<ArticlePage />}></Route>
                          <Route path="/tree/:id" element={<TreePage />}></Route>
                        </Routes>
                      </div>
                </div>
            </div>
        </div> }
        { location.pathname === "/" && <LandingPage />}
        { location.pathname === "/tree" && <TreePage />}
    </div>
  );
}

export default App;
