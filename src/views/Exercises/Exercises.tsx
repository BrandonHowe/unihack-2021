import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Question from "../../components/Question/Question";
import Sidebar from "../../components/Sidebar/Sidebar";
import { findTopicByName } from "../../helpers";
import { ITopic, IQuestion, ITreeNode } from "../TreePage/TreePage";
import "./Exercises.css";

export default function Exercises() {
    const { id } = useParams();

    const navigate = useNavigate();

    const modifiedId = id?.split("_").join(" ") || "";

    const [moduleData, setModuleData] = useState<ITreeNode | null>(null);
    const [topicData, setTopicData] = useState<ITopic | null>(null);

    const [questionsCompleted, setQuestionsCompleted] = useState<boolean[]>([]);

    const getTopicContent = async () => {
        const matchingModule = findTopicByName(modifiedId);
        setModuleData(matchingModule || null);
        setTopicData(matchingModule?.topics.find(l => l.name === modifiedId) || null);
    }

    const submit = () => {
        if (topicData) {
            topicData.complete = true;
            navigate(`/module/${moduleData!.name.split(" ").join("_")}`);
        }
    }

    useEffect(() => {
        getTopicContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        setQuestionsCompleted(Array(topicData?.questions.length).fill(false));
    }, [topicData?.questions]);

    console.log(questionsCompleted);

    return <div className="articlePage">
        <div className="examPage">
            <Sidebar />
            <div className="exercisesArea">
                <h2 style={{ textAlign: "center", fontSize: 36 }}>{ topicData?.name || "Loading " } exercises</h2>
                { topicData?.questions.map((l, num) => <Question setAnswer={e => { questionsCompleted[num] = l.answerChoices[e].correct; setQuestionsCompleted([...questionsCompleted]) }} data={l} num={num + 1} /> )}
                <div className={`finishQuiz${questionsCompleted.includes(false) ? " disabled" : ""}`} onClick={() => !questionsCompleted.includes(false) && submit()}>Complete exercise</div>
            </div>
        </div>
    </div>
}