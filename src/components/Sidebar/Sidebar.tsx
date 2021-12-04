import logo from "../../assets/logo.png";
import math from "../../assets/math.png";
import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { flatten } from "../../helpers";
import { ITreeNode, tree } from "../../views/TreePage/TreePage";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

function SidebarTopicList({ node }: { node: ITreeNode }) {
    const location = useLocation();
    let viewingArticle: string | undefined = location.pathname.startsWith("/article") || location.pathname.startsWith("/exercises") ? location.pathname.split("/")[2] : "";
    const viewingNode = location.pathname.startsWith("/module") ? location.pathname.split("/")[2] : "";

    const [opened, setOpened] = useState(node.topics.some(l => viewingArticle?.split("_").join(" ") === l.name) || viewingNode?.split("_").join(" ") === node.name);
    
    return <div className="sidebarTopicList" style={{ height: opened ? node.topics.slice(0, 4).length * 50 + 60 : 60 }}>
        <div className="sidebarTopicListHeader" onClick={() => setOpened(!opened)}>
            <h3>{ node.name }</h3>
            <Icon
                path={mdiChevronDown}
                size={1}
                color="#929292"
                className={`sidebarTopicListIcon${opened ? " upsideDown" : ""}`}
            />
        </div>
        { opened && node.topics.slice(0, 3).map(l => (
            <Link key={`${l.name}dgjfio`} to={`/article/${l.name.split(" ").join("_")}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="sidebarTopic" style={{ backgroundColor: viewingArticle?.split("_").join(" ") === l.name ? "#4E5156" : "inherit" }}>
                    { l.name }
                </div>
            </Link>
        )) }
        { opened && node.topics.length > 3 && <Link to={`/module/${node.name.split(" ").join("_")}`} style={{ textDecoration: "none", color: "inherit" }}><div className="sidebarTopic" style={{ color: "#4565EF" }}>See all...</div></Link>}
    </div>
}

export default function Sidebar() {
    const location = useLocation();
    
    const [examListOpen, setExamListOpen] = useState(location.pathname.startsWith("/exam"));

    const flattenedNodes: ITreeNode[] = flatten(tree.nodes[0]);

    return <div className="sidebarOverview">
        <div className="sidebarLogo">
            <img src={logo} alt="KnowledgeTree logo" />
        </div>
        <Link to="/tree">
            <div className="sidebarField">
                <img src={math} alt="Knowledge" />
                <h3>Mathematics</h3>
            </div>
        </Link>
        <div className="sidebarTopicList" style={{ height: examListOpen ? 160 : 60 }}>
            <div className="sidebarTopicListHeader" onClick={() => setExamListOpen(!examListOpen)}>
                <h3>Exam models</h3>
                <Icon
                    path={mdiChevronDown}
                    size={1}
                    color="#929292"
                    className={`sidebarTopicListIcon${examListOpen ? " upsideDown" : ""}`}
                />
            </div>
            { examListOpen && <>
                <Link to="/exam/1" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="sidebarTopic" style={{ backgroundColor: location.pathname.startsWith("/exam/1") ? "#4E5156" : "inherit" }}>
                        Bac M1
                    </div>
                </Link>
                <Link to="/exam/2" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="sidebarTopic" style={{ backgroundColor: location.pathname.startsWith("/exam/2") ? "#4E5156" : "inherit" }}>
                        Bac M2
                    </div>
                </Link>
            </> }
        </div>
        { flattenedNodes.map(l => <SidebarTopicList node={l} />) }
    </div>;
}