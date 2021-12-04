import { useNavigate } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./DifficultExercises.css";

export default function DifficultExercises() {
    const navigate = useNavigate();

    const questions = JSON.parse(localStorage.getItem("questions")!);

    const getSimilarExercises = () => {
        navigate("/similarExercises")
    };

    return <div className="difficultExercisesPage">
        <Sidebar />
        <div className="difficultExercisesContent">
            <h2 style={{ textAlign: "center", fontSize: 36 }}>Difficult exercises</h2>
            { !questions && <h3>You haven't marked any questions as particularly challenging yet. Try completing a practice exam and check back later.</h3> }
            { questions && <div style={{ width: 800, margin: "auto" }}>
                { questions.flat().flat().filter(l => l.difficulty === 0).length > 0 && <>
                    <h3 style={{ textAlign: "left", fontWeight: "normal", fontSize: 22 }}>These are problems that you could not solve across all exams.</h3>
                    <div className="difficultExercisesList">
                        { questions.flat().flat().filter(l => l.difficulty === 0).map(l => <div key={l.image} style={{ display: "flex", alignSelf: "center", alignItems: "center", margin: "10px 0" }}>
                            <img alt="Exercise" src={l.image} />
                            <h4 style={{ margin: "0 0 0 5px" }}> - {l.topic.name}</h4>
                        </div>) }
                    </div>
                </> }
                <div className="getSimilarExercises" onClick={getSimilarExercises}>Get similar exercises</div>
                { questions.flat().flat().filter(l => l.difficulty === 1).length > 0 && <>
                    <h3 style={{ textAlign: "left", fontWeight: "normal", fontSize: 22 }}>These are problems that you have extraordinary difficulty solving across all exams.</h3>
                    <div className="difficultExercisesList">
                        { questions.flat().flat().filter(l => l.difficulty === 1).map(l => <div key={l.image} style={{ display: "flex", alignSelf: "center", alignItems: "center", margin: "10px 0" }}>
                            <img alt="Exercise" src={l.image} />
                            <h4 style={{ margin: "0 0 0 5px" }}> - {l.topic.name}</h4>
                        </div>) }
                    </div>
                    <div className="getSimilarExercises" onClick={getSimilarExercises}>Get similar exercises</div>
                </> }
            </div> }
        </div>
    </div>
}