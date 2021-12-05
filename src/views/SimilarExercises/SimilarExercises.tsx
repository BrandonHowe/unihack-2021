import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Question from "../../components/Question/Question";
import Sidebar from "../../components/Sidebar/Sidebar";
import { findTopicByName } from "../../helpers";
import { IQuestion, ITopic } from "../TreePage/TreePage";
import "./SimilarExercises.css";

const questions: (IQuestion & { topic: string })[] = [
    {
        topic: "Variables in two exponents",
        question: "Solve $3^{x^2 - 3x + 12} = 9^{x + 3}$",
        points: 2,
        answerChoices: [
            {
                content: "$x = 2, 3$",
                correct: true,
                explanation: ""
            },
            {
                content: "$x = 1, 4$",
                correct: false,
                explanation: ""
            },
            {
                content: "$x = 3$",
                correct: false,
                explanation: ""
            },
            {
                content: "$x = \\dfrac{1}{2}, 3$",
                correct: false,
                explanation: ""
            },
        ]
    },
    {
        topic: "Variables in the denominator",
        question: "Solve $\\tiny{\\dfrac{2}{x + 3} = \\dfrac{1}{x + 1}}$",
        points: 2,
        answerChoices: [
            {
                content: "$x = 3$",
                correct: false,
                explanation: ""
            },
            {
                content: "No solution",
                correct: false,
                explanation: ""
            },
            {
                content: "$x = 1$",
                correct: true,
                explanation: ""
            },
            {
                content: "$x = \\dfrac{3}{2}$",
                correct: false,
                explanation: ""
            },
        ]
    }
]

export default function SimilarExercises() {
    const { id } = useParams();

    // const navigate = useNavigate();

    const modifiedId = id?.split("_").join(" ") || "";

    // const [moduleData, setModuleData] = useState<ITreeNode | null>(null);
    const [topicData, setTopicData] = useState<ITopic | null>(null);

    const [questionsCompleted, setQuestionsCompleted] = useState<boolean[]>([]);

    const getTopicContent = async () => {
        const matchingModule = findTopicByName(modifiedId);
        // setModuleData(matchingModule || null);
        setTopicData(matchingModule?.topics.find(l => l.name === modifiedId) || null);
    }

    // const submit = () => {
    //     if (topicData) {
    //         topicData.complete = true;
    //         navigate(`/module/${moduleData!.name.split(" ").join("_")}`);
    //     }
    // }

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
                <h2 style={{ textAlign: "center", fontSize: 36 }}>Similar exercises to your difficult problems</h2>
                <h4 style={{ textAlign: "center", fontSize: 18 }}>These problems were generated based on the topics you struggled with on the exams.</h4>
                { questions.map((l, num) => <Question setAnswer={e => { questionsCompleted[num] = l.answerChoices[e].correct; setQuestionsCompleted([...questionsCompleted]) }} data={l} num={num + 1} /> )}
            </div>
        </div>
    </div>
}