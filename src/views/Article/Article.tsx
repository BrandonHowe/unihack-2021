import { useParams } from "react-router";

import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from "react";

import logo from "../../assets/logo.png";
import math from "../../assets/math.png";
import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { findTopicByName, flatten } from "../../helpers";
import { ITreeNode, tree } from "../TreePage/TreePage";
import "./Article.css";
import LoremIpsum from "./LoremIpsum";
import Sidebar from "../../components/Sidebar/Sidebar";
import 'katex/dist/katex.min.css';
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
        return { title: matchingModule ? modifiedId : "Article about something", content: matchingModule?.topics.find(l => l.name === modifiedId)?.article || "broken rofl" };
    }

    useEffect(() => {
        getArticleContent().then(setArticleContent);
    }, [id]);

    return <div className="articlePage">
        <div className="examPage">
            <Sidebar />
            <div className="mainArticle">
                <h2 style={{ textAlign: "center", fontSize: 36 }}>{ articleContent?.title || "Loading..." }</h2>{ articleContent && <ReactMarkdown children={articleContent.content} remarkPlugins={[RemarkMathPlugin]} rehypePlugins={[rehypeKatex]}></ReactMarkdown> }
            </div>
        </div>
    </div>
}