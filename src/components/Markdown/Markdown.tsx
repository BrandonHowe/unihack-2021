import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";

export default function Markdown ({ content }: { content: string }) {
    return <ReactMarkdown children={content} remarkPlugins={[RemarkMathPlugin]} rehypePlugins={[rehypeKatex]}></ReactMarkdown>
}