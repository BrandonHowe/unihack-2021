import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { findNodeByName } from "../../helpers";
import { ITreeNode } from "../TreePage/TreePage";
import "./TreeNodePage.css";

export default function TreeNodePage() {
    const { id } = useParams();

    const modifiedId = id?.split("_").join(" ") || "";

    const [moduleData, setModuleData] = useState<ITreeNode | null>(null);

    const getArticleContent = async () => {
        return findNodeByName(modifiedId) || null;
    }

    useEffect(() => {
        getArticleContent().then(setModuleData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return <div className="treeNodePage">
        <Sidebar />
        <div className="treeNodeContent">
            <h2 style={{ textAlign: "center", fontSize: 36 }}>{ moduleData?.name || "Loading" }</h2>
            { moduleData && <>
                <p>{ moduleData.description }</p>
                <div className="treeNodePageTopicList">
                    <h3 style={{ fontSize: 24 }}>Topics in { moduleData.name.toLowerCase() }</h3>
                    <ul>
                        { moduleData.topics.map(l => (
                            <Link to={`/article/${l.name.split(" ").join("_")}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <li>
                                    <div className="treeNodePageTopic">{l.name} - <span className={l.complete ? "complete" : "incomplete"}>{l.complete ? "complete" : "incomplete"}</span></div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <h3 style={{ fontSize: 24 }}>Module quiz</h3>
                <p>In order to complete this module you must take the quiz. The required score to pass is an 80% or higher.</p>
                <Link to={`/moduleQuiz/${moduleData.name}`} style={{ textDecoration: "none", color: "inherit" }}><div className="takeModuleQuizButton">Take module quiz</div></Link>
            </> }
        </div>
    </div>
}