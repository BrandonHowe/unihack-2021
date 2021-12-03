import { useParams } from "react-router";

import ReactMarkdown from 'react-markdown'
import React, { useEffect, useState } from "react";

export function ArticlePage() {
    const { id } = useParams();

    const [articleContent, setArticleContent] = useState("");

    const getArticleContent = async () => {
        return "# article\n*lolololol*"
    };

    useEffect(() => {
        getArticleContent().then(setArticleContent);
    }, [id]);

    return <div className="articlePage">
        <ReactMarkdown children={articleContent}></ReactMarkdown>
    </div>
}