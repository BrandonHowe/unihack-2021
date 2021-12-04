import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import { ArticlePage } from './views/Article/Article';
import LandingPage from './views/LandingPage/LandingPage';
import TreePage from './views/TreePage/TreePage';
import ExamPage from './views/Exam/ExamPage';
import NewUserPage from './views/NewUser/NewUser';
import Exercises from './views/Exercises/Exercises';
import TreeNodePage from './views/TreeNodePage/TreeNodePage';
import ModuleQuiz from './views/ModuleQuiz/ModuleQuiz';
import DifficultExercises from './views/DifficultExercises/DifficultExercises';
import SimilarExercises from './views/SimilarExercises/SimilarExercises';

function App() {
  return (
    <div id="app">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/article/:id" element={<ArticlePage />}></Route>
          <Route path="/exercises/:id" element={<Exercises />}></Route>
          <Route path="/tree" element={<TreePage />}></Route>
          <Route path="/module/:id" element={<TreeNodePage />}></Route>
          <Route path="/moduleQuiz/:id" element={<ModuleQuiz />}></Route>
          <Route path="/exam/:id" element={<ExamPage />}></Route>
          <Route path="/newUser" element={<NewUserPage />}></Route>
          <Route path="/difficultProblems" element={<DifficultExercises />}></Route>
          <Route path="/similarExercises" element={<SimilarExercises />}></Route>
        </Routes>
    </div>
  );
}

export default App;
