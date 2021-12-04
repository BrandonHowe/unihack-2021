import { useState } from "react";
import { IQuestion } from "../../views/TreePage/TreePage";
import "./Question.css";
import Markdown from "../Markdown/Markdown";
import { alphabet } from "../../helpers";

export default function Question({ data, num, setAnswer }: { data: IQuestion, num: number, setAnswer: (v: number) => void }) {
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [selectionHistory, setSelectedHistory] = useState<number[]>([]);

    const selectedCorrectAnswer = data.answerChoices[selectedAnswer]?.correct || false;

    const handleSelection = (val: number) => {
        if (!selectedCorrectAnswer) {
            setSelectedAnswer(val);
            setSelectedHistory([...selectionHistory, val]);
            setAnswer(val);
        }
    }

    return <div className="question" key={`question${data.question}`}>
        <h3 className="questionTitle">
            <span className="questionNumber">{ num }</span>
            <Markdown content={data.question} />
            <span className="questionScore">{selectionHistory.length === 1 && selectedCorrectAnswer ? data.points : 0}/{data.points}</span>
        </h3>
        <div className="answers">
            {
                data.answerChoices.map((l, idx) => (
                    <div key={`asdjfoasjgisdfh${idx}`} className={`answerChoice${selectedAnswer === idx ? " selected" : ""}`} onClick={() => handleSelection(idx)}>
                        { alphabet[idx] }. <Markdown content={l.content} />
                        { selectionHistory.includes(idx) && <>
                            {" - "}{data.answerChoices[idx].correct ? <span className="correctIndicator">correct</span> : <span className="incorrectIndicator">incorrect</span>}
                        </>}
                    </div>
                ))
            }
        </div>
        {
            selectedAnswer !== -1 && <div className="response">
                { selectedCorrectAnswer && <h3 className="correctResponse">Correct!</h3> }
                { !selectedCorrectAnswer && <>
                    <h3 className="incorrectResponse">Incorrect</h3>
                    <p>{ data.answerChoices[selectedAnswer].explanation }</p>
                </> }
            </div>
        }
    </div>
}