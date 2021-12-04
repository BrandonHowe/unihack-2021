import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Markdown from "../../components/Markdown/Markdown";
import Question from "../../components/Question/Question";
import Sidebar from "../../components/Sidebar/Sidebar";
import { alphabet, findNodeByName } from "../../helpers";
import { IQuestion, ITreeNode, tree } from "../TreePage/TreePage";
import "./ModuleQuiz.css";

function ReviewQuestion({ question, num, answer }: { answer: number, num: number, question: IQuestion & { topic: string } }) {
    const [opened, setOpened] = useState(false);

    return <div className={`reviewQuestion${opened ? " opened" : ""}`}>
        <div onClick={() => setOpened(!opened)} style={{ height: 25, cursor: "pointer" }}>
            {num}. <Markdown content={question.question} /> - {question.answerChoices[answer].correct ? <span className="correctIndicator">correct</span> : <span className="incorrectIndicator">incorrect</span>}
            <div style={{ marginLeft: "auto" }}>
                <Icon
                    path={mdiChevronDown}
                    size={1}
                    color="#929292"
                    className={`reviewQuestionIcon${opened ? " upsideDown" : ""}`}
                />
            </div>
        </div>
        {
            opened && <div className="answers">
                {
                    question.answerChoices.map((l, idx) => (
                        <div key={`adfasdifhasdifj${l.content}`} className={`answerChoice${answer === idx ? " selected" : ""}`} style={{ cursor: "initial" }}>
                            { alphabet[idx] }. <Markdown content={l.content} />
                            {" - "}{question.answerChoices[idx].correct ? <span className="correctIndicator">correct</span> : <span className="incorrectIndicator">incorrect</span>}
                        </div>
                    ))
                }
            </div>
        }
        {
            opened && <Link to={`/article/${question.topic.split(" ").join("_")}`} style={{ color: "#4565EF", margin: 5 }}>Read more...</Link>
        }
    </div>
}

export default function ModuleQuiz() {
    const { id } = useParams();
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [viewingResults, setViewingResults] = useState(false);
    
    const modifiedId = id?.split("_").join(" ") || "";
    
    const [moduleData, setModuleData] = useState<ITreeNode | null>(null);

    const questionScores = moduleData?.quizQuestions.map((l, idx) => Number(l.answerChoices[selectedAnswers[idx]]?.correct) * l.points) || [];
    
    const totalPoints = moduleData?.quizQuestions.reduce((acc, cur) => acc + cur.points, 0);
    const percent = questionScores.reduce((acc, cur) => acc + cur, 0) / (totalPoints || 0);

    const getTopicContent = async () => {
        const module = findNodeByName(modifiedId);
        if (module) {
            setSelectedAnswers(Array(module.quizQuestions.length).fill(0).map(() => -1));
        }
        setModuleData(module || null);
    }

    useEffect(() => {
        getTopicContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const submit = () => {
        setViewingResults(true);
        moduleData!.quizScore = questionScores.reduce((acc, cur) => acc + cur, 0);
    }

    return <div className="articlePage">
        <div className="examPage">
            <Sidebar />
            <div className="exercisesArea">
                <h2 style={{ textAlign: "center", fontSize: 36 }}>{ moduleData?.name || "Loading " } quiz {viewingResults ? "results" : ""}</h2>
                {
                    !moduleData && <h2>Sorry, the module you are trying to access seems to not be working.</h2>
                }
                { 
                    moduleData && !viewingResults && <>
                        { moduleData?.quizQuestions.map((l, num) => <Question setAnswer={answer => { selectedAnswers[num] = answer; setSelectedAnswers([...selectedAnswers]) }} data={l} num={num + 1} /> )}
                        <div className="finishQuiz" onClick={submit}>Finish quiz</div>
                    </>
                }
                {
                    moduleData && viewingResults && <>
                        <p style={{ fontSize: 18 }}>
                            You got a {questionScores.reduce((acc, cur) => acc + cur, 0)} out of {totalPoints}.
                            {percent >= 0.8 ? " You have passed this quiz and completed this module!" : " You did not pass the quiz, review the materials you struggled with and try again."}
                        </p>
                        <div className="quizQuestionReview">
                            <h3>Questions</h3>
                            { moduleData.quizQuestions.map((l, idx) => <ReviewQuestion answer={selectedAnswers[idx]} question={l} num={idx + 1} />)}
                        </div>
                    </>
                }
            </div>
        </div>
    </div>
}