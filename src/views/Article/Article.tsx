import { useParams } from "react-router";

import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from "react";

import logo from "../../assets/logo.png";
import math from "../../assets/math.png";
import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { findNodeByName, findTopicByName, flatten } from "../../helpers";
import { ITreeNode, tree } from "../TreePage/TreePage";
import "./Article.css";
import LoremIpsum from "./LoremIpsum";

function ExamPageTopicList({ node }: { node: ITreeNode }) {
    const [opened, setOpened] = useState(false);
    
    return <div className="examPageTopicList" style={{ height: opened ? node.topics.slice(0, 4).length * 50 + 60 : 60 }}>
        <div className="examPageTopicListHeader" onClick={() => setOpened(!opened)}>
            <h3>{ node.name }</h3>
            <Icon
                path={mdiChevronDown}
                size={1}
                color="#929292"
                className={`examPageTopicListIcon${opened ? " upsideDown" : ""}`}
            />
        </div>
        { opened && node.topics.slice(0, 3).map(l => (
            <div className="examPageTopic">
                { l }
            </div>
        )) }
        { opened && node.topics.length > 3 && <div className="examPageTopic" style={{ color: "#4565EF" }}>See all...</div>}
    </div>
}

interface Article {
    title: string;
    content: string;
}

export function ArticlePage() {
    const { id } = useParams();

    const modifiedId = id?.split("_").join(" ") || "";

    const [articleContent, setArticleContent] = useState<Article | null>(null);

    const getArticleContent = async () => {
        const matchingModule = findTopicByName(modifiedId);
        console.log(modifiedId, matchingModule);
        return { title: matchingModule ? modifiedId : "Article about something", content: LoremIpsum };
    }

    useEffect(() => {
        getArticleContent().then(setArticleContent);
    }, [id]);

    const [examListOpen, setExamListOpen] = useState(false);

    const flattenedNodes: ITreeNode[] = flatten(tree.nodes[0]);

    return <div className="articlePage">
        <div className="examPage">
            <div className="examPageOverview">
                <div className="examPageLogo">
                    <img src={logo} alt="KnowledgeTree logo" />
                </div>
                <div className="examPageField">
                    <img src={math} alt="Knowledge" />
                    <h3>Mathematics</h3>
                    </div>
                    <div className="examPageTopicList" style={{ height: examListOpen ? 160 : 60 }}>
                        <div className="examPageTopicListHeader" onClick={() => setExamListOpen(!examListOpen)}>
                            <h3>Exam models</h3>
                            <Icon
                                path={mdiChevronDown}
                                size={1}
                                color="#929292"
                                className={`examPageTopicListIcon${examListOpen ? " upsideDown" : ""}`}
                            />
                        </div>
                        { examListOpen && <>
                            <div className="examPageTopic">
                                Bac M1
                            </div>
                            <div className="examPageTopic">
                                Bac M2
                            </div>
                        </> }
                </div>
                { flattenedNodes.map(l => <ExamPageTopicList node={l} />) }
            </div>
            <div className="mainArticle">
                <h2 style={{ textAlign: "center", fontSize: 36 }}>{ articleContent?.title || "Loading..." }</h2>
                { articleContent && <ReactMarkdown children={articleContent.content}></ReactMarkdown> }
            </div>
        </div>
    </div>
}