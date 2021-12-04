import logo from "../../assets/logo.png";
import math from "../../assets/math.png";
import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { flatten } from "../../helpers";
import { ITreeNode, tree } from "../../views/TreePage/TreePage";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function SidebarTopicList({ node }: { node: ITreeNode }) {
    const [opened, setOpened] = useState(false);
    
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
            <Link to={`/article/${l.name.split(" ").join("_")}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="sidebarTopic">
                    { l.name }
                </div>
            </Link>
        )) }
        { opened && node.topics.length > 3 && <div className="sidebarTopic" style={{ color: "#4565EF" }}>See all...</div>}
    </div>
}

export default function Sidebar() {
    const [examListOpen, setExamListOpen] = useState(false);
    const flattenedNodes: ITreeNode[] = flatten(tree.nodes[0]);

    return <div className="sidebarOverview">
        <div className="sidebarLogo">
            <img src={logo} alt="KnowledgeTree logo" />
        </div>
        <div className="sidebarField">
            <img src={math} alt="Knowledge" />
            <h3>Mathematics</h3>
            </div>
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
                    <div className="sidebarTopic">
                        Bac M1
                    </div>
                    <div className="sidebarTopic">
                        Bac M2
                    </div>
                </> }
        </div>
        { flattenedNodes.map(l => <SidebarTopicList node={l} />) }
    </div>;
}