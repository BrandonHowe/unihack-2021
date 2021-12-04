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
import ExamPage from './views/Exam/ExamPage';

function Home() {
  return <h1>djfaodji</h1>
}

function App() {
  const location = useLocation();

  return (
    <div id="app">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/article/:id" element={<ArticlePage />}></Route>
          <Route path="/tree" element={<TreePage />}></Route>
          <Route path="/exam" element={<ExamPage />}></Route>
        </Routes>
    </div>
  );
}

export default App;
