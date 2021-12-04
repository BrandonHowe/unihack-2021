import "./ExamPage.css";
import { ITreeNode, tree } from "../TreePage/TreePage";
import { MouseEventHandler, useRef, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { findNodeByName, flatten } from "../../helpers";
import Sidebar from "../../components/Sidebar/Sidebar";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';

interface Question {
    x: number;
    y: number;
    width: number;
    height: number;
    topic: ITreeNode;
    solution: string;
}

const p3Solution = `
Given: $\\log _{4} {(x^2 + 1)} = \\log _{4}{x} + \\log _{4} {(x + 1)}$

Combine terms on the right: $\\log _{4} {(x^2 + 1)} = \\log _{4}{(x^2 + x)}$

Remove log: $x^2 + 1 = x^2 + x$

Move terms onto one side: $-x + 1 = 0$

Solve for x: $x = 1$
`

const questions: Question[] = [
    { x: 58, y: 170, width: 289, height: 21, solution: "just solve it rofl", topic: findNodeByName("Complex numbers")! },
    { x: 58, y: 192, width: 476, height: 42, solution: "just solve it rofl", topic: findNodeByName("Quadratics")! },
    { x: 58, y: 234, width: 407, height: 21, solution: p3Solution, topic: findNodeByName("Logarithms")! },
    { x: 58, y: 255, width: 476, height: 37, solution: "just solve it rofl", topic: findNodeByName("Quadratics")! },
    { x: 58, y: 292, width: 476, height: 37, solution: "just solve it rofl", topic: findNodeByName("Linear Equations")! },
    { x: 58, y: 329, width: 368, height: 33, solution: "just solve it rofl", topic: findNodeByName("Trigonometry")! },
    { x: 68, y: 387, width: 457, height: 50, solution: "just solve it rofl", topic: findNodeByName("Matrices")! },
    { x: 58, y: 437, width: 158, height: 20, solution: "just solve it rofl", topic: findNodeByName("Determinants")! },
    { x: 58, y: 457, width: 440, height: 23, solution: "just solve it rofl", topic: findNodeByName("Matrices")! },
    { x: 58, y: 480, width: 336, height: 20, solution: "just solve it rofl", topic: findNodeByName("Matrices")! },
    { x: 58, y: 505, width: 473, height: 28, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
    { x: 58, y: 533, width: 128, height: 15, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
    { x: 58, y: 548, width: 406, height: 14, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
    { x: 58, y: 562, width: 351, height: 23, solution: "just solve it rofl", topic: findNodeByName("Quadratics")! },
    { x: 68, y: 608, width: 270, height: 27, solution: "just solve it rofl", topic: findNodeByName("Rational functions")! },
    { x: 58, y: 635, width: 214, height: 42, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
    { x: 58, y: 673, width: 371, height: 19, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
    { x: 58, y: 692, width: 430, height: 51, solution: "just solve it rofl", topic: findNodeByName("Derivatives")! },
    { x: 58, y: 743, width: 204, height: 37, solution: "just solve it rofl", topic: findNodeByName("Integrals")! },
];

const pointInRect = (point: { x: number, y: number }, rect: { x: number, y: number, width: number, height: number }) => {
    if (point.x < rect.x) return false;
    if (point.y < rect.y) return false;
    if (point.x > rect.x + rect.width) return false;
    if (point.y > rect.y + rect.height) return false;
    return true;
}

export default function ExamPage() {
    const [_, setNumPages] = useState<unknown>(null);
    const [pageNumber, __] = useState(1);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [solutionOpen, setSolutionOpen] = useState(false);

    const documentRef = useRef<HTMLDivElement>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: unknown }) {
        setNumPages(numPages);
    }

    const findParentNode = (name: string, node: ITreeNode, parent?: ITreeNode): ITreeNode | undefined => {
        if (node.name === name) {
            return parent;
        }
        if (!node.children.length) {
            return undefined;
        }
        for (const child of node.children) {
            const parentNode = findParentNode(name, child, node);
            if (parentNode) {
                return parentNode;
            }
        }
    };

    const handleDocumentClick: MouseEventHandler<HTMLDivElement> = (e) => {
        const rect = documentRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.
        console.log("Left? : " + x + " ; Top? : " + y + ".");
        for (const question of questions) {
            if (pointInRect({ x, y }, question)) {
                console.log("Question yo", question.topic.name);
                setSelectedQuestion(question);
            }
        }
    }

    const currNode = selectedQuestion?.topic;
    const parentNode = currNode && findParentNode(currNode.name, tree.nodes[0]);
    const doubleParentNode = parentNode && findParentNode(parentNode.name, tree.nodes[0]);

    const flattenedNodes: ITreeNode[] = flatten(tree.nodes[0]);
    
    console.log(flattenedNodes);

    return <div className="examPage">
        <Sidebar />
        <div className="examPreview">
            <div ref={documentRef} style={{ borderRadius: 20, position: "relative" }} onClick={handleDocumentClick}>
                <Document onLoadSuccess={onDocumentLoadSuccess} file="https://profesorjitaruionel.com/wp-content/uploads/2021/06/E_c_matematica_M_mate-info_2021_var_02_LRO.pdf">
                    <Page pageNumber={pageNumber} />
                </Document>
                { selectedQuestion && <div style={{ position: "absolute", left: selectedQuestion.x, top: selectedQuestion.y, width: selectedQuestion.width, height: selectedQuestion.height, backgroundColor: "rgba(177, 185, 249, 0.5)", borderRadius: 7 }}></div> }
            </div>
        </div>
        <div className="examContent">
            <h2>Additional help</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod nisi porta lorem mollis aliquam ut porttitor. Placerat vestibulum lectus mauris ultrices eros in cursus. Nunc consequat interdum varius sit amet. Vitae congue mauris rhoncus aenean vel elit. Quam adipiscing vitae proin sagittis. Aliquam malesuada bibendum arcu vitae elementum curabitur. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Tristique risus nec feugiat in. Id interdum velit laoreet id. Massa sed elementum tempus egestas sed sed risus pretium quam. Neque ornare aenean euismod elementum nisi. Orci porta non pulvinar neque laoreet suspendisse interdum. Sit amet massa vitae tortor condimentum lacinia quis.</p>
            <div className="examContentButton">Check out similar exercises</div>
            <div className="examContentButton" onClick={() => setSolutionOpen(true)}>See solution to this problem</div>
            <h2>Knowledge tree</h2>
            <div className="examContentKnowledgeTree">
                { doubleParentNode && <>
                    <div className="examContentTreeNode">
                        { doubleParentNode.name }
                    </div>
                    <div className="examContentTreeNodeConnectorRow">
                        <div className="examContentTreeNodeConnector"></div>
                        <div className="examContentTreeNodeConnector"></div>
                    </div>
                </> }
                { parentNode && <>
                    <div className="examContentTreeNode">
                        { parentNode.name }
                    </div>
                    <div className="examContentTreeNodeConnectorRow">
                        <div className="examContentTreeNodeConnector"></div>
                        <div className="examContentTreeNodeConnector"></div>
                    </div>
                </> }
                { currNode && <div className="examContentTreeNode">
                    { currNode.name }
                </div> }
            </div>
        </div>
        { solutionOpen && <div className="solutionModal" id="solutionModal" onClick={e => { if ((e.target as any).id === "solutionModal") setSolutionOpen(false) }}>
            <div className="solutionModalContent">
                <h2 style={{ textAlign: "center" }}><span style={{ marginLeft: "auto" }}>Solution to problem</span> <span className="closeButton" onClick={() => setSolutionOpen(false)}>X</span></h2>
                <ReactMarkdown children={selectedQuestion?.solution || ""} remarkPlugins={[RemarkMathPlugin]} rehypePlugins={[rehypeKatex]}></ReactMarkdown>
            </div>
        </div> }
    </div>
}