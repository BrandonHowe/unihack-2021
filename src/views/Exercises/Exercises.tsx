import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Question from "../../components/Question/Question";
import Sidebar from "../../components/Sidebar/Sidebar";
import { findTopicByName } from "../../helpers";
import { ITopic, IQuestion } from "../TreePage/TreePage";
import "./Exercises.css";

export default function Exercises() {
    const { id } = useParams();

    const modifiedId = id?.split("_").join(" ") || "";

    const [topicData, setTopicData] = useState<ITopic | null>(null);

    const getTopicContent = async () => {
        const matchingModule = findTopicByName(modifiedId);
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
                { topicData?.questions.map((l, num) => <Question setAnswer={() => {}} data={l} num={num + 1} /> )}
            </div>
        </div>
    </div>
}