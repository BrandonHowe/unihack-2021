import { useNavigate, useParams } from "react-router";

import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from "react";
import { findTopicByName } from "../../helpers";
import "./Article.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import 'katex/dist/katex.min.css';
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Helmet } from "react-helmet";

interface Article {
    title: string;
    content: string;
}

export function ArticlePage() {
    const { id } = useParams();

    const navigate = useNavigate();

    const modifiedId = id?.split("_").join(" ") || "";

    const [articleContent, setArticleContent] = useState<Article | null>(null);

    const getArticleContent = async () => {
        const matchingModule = findTopicByName(modifiedId);
        console.log(modifiedId, matchingModule);
        return { title: matchingModule ? modifiedId : "Article about something", content: matchingModule?.topics.find(l => l.name === modifiedId)?.article || "broken rofl" };
    }

    useEffect(() => {
        getArticleContent().then(setArticleContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return <div className="articlePage">
        <Helmet>
            <title>{ articleContent?.title || "KnowledgeTree" }</title>
        </Helmet>
        <div className="examPage">
            <Sidebar />
            <div className="mainArticle">
                <h2 style={{ textAlign: "center", fontSize: 36 }}>{ articleContent?.title || "Loading..." }</h2>{ articleContent && <ReactMarkdown children={articleContent.content} remarkPlugins={[RemarkMathPlugin]} rehypePlugins={[rehypeKatex]}></ReactMarkdown> }
                <div className="viewExercises" onClick={() => navigate(`/exercises/${id}`)}>View exercises</div>
            </div>
        </div>
    </div>
}