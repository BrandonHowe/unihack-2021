import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import { findTopicByName } from "../../helpers";
import { ITopic, ITopicQuestion, ITreeNode } from "../TreePage/TreePage";
import "./Exercises.css";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function Question({ data, num }: { data: ITopicQuestion, num: number }) {
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [selectionHistory, setSelectedHistory] = useState<number[]>([]);

    const selectedCorrectAnswer = data.answerChoices[selectedAnswer]?.correct || false;

    const handleSelection = (val: number) => {
        if (!selectedCorrectAnswer) {
            setSelectedAnswer(val);
            setSelectedHistory([...selectionHistory, val]);
        }
    }

    return <div className="exerciseQuestion" key={`question${data.question}`}>
        <h3 className="exerciseQuestionTitle">
            <span className="exerciseQuestionNumber">{ num }</span>
            { data.question }
            <span className="exerciseQuestionScore">{selectionHistory.length === 1 && selectedCorrectAnswer ? data.points : 0}/{data.points}</span>
        </h3>
        <div className="exerciseAnswers">
            {
                data.answerChoices.map((l, idx) => (
                    <div className={`answerChoice${selectedAnswer === idx ? " selected" : ""}`} onClick={() => handleSelection(idx)}>
                        { alphabet[idx] }. { l.content }
                        { selectionHistory.includes(idx) && <>
                            {" - "}{data.answerChoices[idx].correct ? <span className="correctIndicator">correct</span> : <span className="incorrectIndicator">incorrect</span>}
                        </>}
                    </div>
                ))
            }
        </div>
        {
            selectedAnswer !== -1 && <div className="exerciseResponse">
                { selectedCorrectAnswer && <h3 className="exerciseCorrectResponse">Correct!</h3> }
                { !selectedCorrectAnswer && <>
                    <h3 className="exerciseIncorrectResponse">Incorrect</h3>
                    <p>{ data.answerChoices[selectedAnswer].explanation }</p>
                </> }
            </div>
        }
    </div>
}

export default function Exercises() {
    const { id } = useParams();

    const modifiedId = id?.split("_").join(" ") || "";

    const [moduleData, setModuleData] = useState<ITreeNode | null>(null);
    const [topicData, setTopicData] = useState<ITopic | null>(null);

    const getTopicContent = async () => {
        const matchingModule = findTopicByName(modifiedId);
        console.log(modifiedId, matchingModule);
        setModuleData(matchingModule || null);
        setTopicData(matchingModule?.topics.find(l => l.name === modifiedId) || null);
    }

    useEffect(() => {
        getTopicContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return <div className="articlePage">
        <div className="examPage">
            <Sidebar />
            <div className="exercisesArea">
                <h2 style={{ textAlign: "center", fontSize: 36 }}>{ topicData?.name || "Loading " } exercises</h2>
                { topicData?.questions.map((l, num) => <Question data={l} num={num + 1} /> )}
            </div>
        </div>
    </div>
}