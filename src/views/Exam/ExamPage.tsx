import "./ExamPage.css";
import { ITreeNode, tree } from "../TreePage/TreePage";
import { MouseEventHandler, useRef, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { findNodeByName, findParentNode } from "../../helpers";
import Sidebar from "../../components/Sidebar/Sidebar";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';
import { Link, useParams } from "react-router-dom";
import Markdown from "../../components/Markdown/Markdown";
import LoremIpsum from "../Article/LoremIpsum";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import ObservableSlim from "observable-slim";

interface Question {
    x: number;
    y: number;
    width: number;
    height: number;
    topic: ITreeNode;
    solution: string;
    difficulty?: number;
    image?: string;
}

const p3Solution = `
Given: $\\log _{4} {(x^2 + 1)} = \\log _{4}{x} + \\log _{4} {(x + 1)}$

Combine terms on the right: $\\log _{4} {(x^2 + 1)} = \\log _{4}{(x^2 + x)}$

Remove log: $x^2 + 1 = x^2 + x$

Move terms onto one side: $-x + 1 = 0$

Solve for x: $x = 1$
`

const initialQuestions: Question[][][] = localStorage.getItem("questions") ? JSON.parse(localStorage.getItem("questions")!) : [
    [
        [
            { x: 78, y: 170, width: 269, height: 21, solution: "just solve it rofl", topic: findNodeByName("Complex numbers")! },
            { x: 78, y: 192, width: 456, height: 42, solution: "just solve it rofl", topic: findNodeByName("Quadratics")! },
            { x: 78, y: 234, width: 387, height: 21, solution: p3Solution, topic: findNodeByName("Logarithms")! },
            { x: 78, y: 255, width: 456, height: 37, solution: "just solve it rofl", topic: findNodeByName("Quadratics")! },
            { x: 78, y: 292, width: 456, height: 37, solution: "just solve it rofl", topic: findNodeByName("Geometry")! },
            { x: 78, y: 329, width: 348, height: 33, solution: "just solve it rofl", topic: findNodeByName("Trigonometry")! },
            { x: 78, y: 387, width: 447, height: 50, solution: "just solve it rofl", topic: findNodeByName("Matrices")! },
            { x: 78, y: 437, width: 138, height: 20, solution: "just solve it rofl", topic: findNodeByName("Determinants")! },
            { x: 78, y: 457, width: 420, height: 23, solution: "just solve it rofl", topic: findNodeByName("Matrices")! },
            { x: 78, y: 480, width: 316, height: 20, solution: "just solve it rofl", topic: findNodeByName("Matrices")! },
            { x: 78, y: 505, width: 453, height: 28, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
            { x: 78, y: 533, width: 108, height: 15, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
            { x: 78, y: 548, width: 386, height: 14, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
            { x: 78, y: 562, width: 331, height: 23, solution: "just solve it rofl", topic: findNodeByName("Quadratics")! },
            { x: 78, y: 608, width: 240, height: 27, solution: "just solve it rofl", topic: findNodeByName("Rational functions")! },
            { x: 78, y: 635, width: 194, height: 42, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
            { x: 78, y: 673, width: 351, height: 19, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
            { x: 78, y: 692, width: 410, height: 51, solution: "just solve it rofl", topic: findNodeByName("Derivatives")! },
            { x: 78, y: 743, width: 184, height: 37, solution: "just solve it rofl", topic: findNodeByName("Integrals")! },
        ],
        [
            { x: 78, y: 42, width: 346, height: 36, solution: "just solve it rofl", topic: findNodeByName("Integrals")! },
            { x: 78, y: 78, width: 460, height: 55, solution: "just solve it rofl", topic: findNodeByName("Integrals")! },
        ]
    ],
    [
        [
            { x: 78, y: 185, width: 283 - 20, height: 25, solution: "just solve it rofl", topic: findNodeByName("Linear Equations")! },
            { x: 78, y: 210, width: 493 - 20, height: 36, solution: "just solve it rofl", topic: findNodeByName("Quadratics")! },
            { x: 78, y: 246, width: 329 - 20, height: 21, solution: "just solve it rofl", topic: findNodeByName("Exponentials")! },
            { x: 78, y: 265, width: 485 - 20, height: 40, solution: "just solve it rofl", topic: findNodeByName("Rational functions")! },
            { x: 78, y: 305, width: 490 - 20, height: 32, solution: "just solve it rofl", topic: findNodeByName("Geometry")! },
            { x: 78, y: 337, width: 471 - 20, height: 34, solution: "just solve it rofl", topic: findNodeByName("Trigonometry")! },
            { x: 78, y: 393, width: 396 - 20, height: 57, solution: "just solve it rofl", topic: findNodeByName("Matrices")! },
            { x: 78, y: 450, width: 439 - 20, height: 22, solution: "just solve it rofl", topic: findNodeByName("Matrices")! },
            { x: 78, y: 472, width: 341 - 20, height: 20, solution: "just solve it rofl", topic: findNodeByName("Matrices")! },
            { x: 78, y: 492, width: 475 - 20, height: 62, solution: "just solve it rofl", topic: findNodeByName("Linear Equations")! },
            { x: 78, y: 554, width: 393 - 20, height: 38, solution: "just solve it rofl", topic: findNodeByName("Quadratics")! },
            { x: 78, y: 592, width: 196 - 20, height: 30, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
            { x: 78, y: 648, width: 273 - 20, height: 70, solution: "just solve it rofl", topic: findNodeByName("Derivatives")! },
            { x: 78, y: 718, width: 479 - 20, height: 32, solution: "just solve it rofl", topic: findNodeByName("Limits")! },
            { x: 78, y: 750, width: 265 - 20, height: 20, solution: "just solve it rofl", topic: findNodeByName("Derivatives")! },
        ],
        [
            { x: 78, y: 50, width: 242, height: 64, solution: "just solve it rofl", topic: findNodeByName("Integrals")! },
            { x: 78, y: 114, width: 115, height: 46, solution: "just solve it rofl", topic: findNodeByName("Integrals")! },
            { x: 78, y: 160, width: 180, height: 60, solution: "just solve it rofl", topic: findNodeByName("Integrals")! },
        ]
    ]
];

const emojiDifficulties = ["❌", "😭", "😢", "🙂", "😁"];

const pointInRect = (point: { x: number, y: number }, rect: { x: number, y: number, width: number, height: number }) => {
    if (point.x < rect.x) return false;
    if (point.y < rect.y) return false;
    if (point.x > rect.x + rect.width) return false;
    if (point.y > rect.y + rect.height) return false;
    return true;
}

const exams = [
    "https://profesorjitaruionel.com/wp-content/uploads/2021/06/E_c_matematica_M_mate-info_2021_var_02_LRO.pdf",
    "https://profesorjitaruionel.com/wp-content/uploads/2021/02/E_c_matematica_M_st-nat_2021_Test_01.pdf"
]

function EmojiDropdown({ value, setValue }: { value: string, setValue: (v: string) => void }) {
    const [opened, setOpened] = useState(false);

    return <div className="emojiDropdown" style={{ height: opened ? 120 : 24, width: 24, border: "1px solid transparent", zIndex: opened ? 10 : 8 }}>
        {/* <span style={{ position: "absolute", left: l.x - 20, top: l.y, color: "black" }}>{emojiDifficulties[l.difficulty || 0]}</span> */}
        <div className="emojiDropdownChild" onClick={() => setOpened(!opened)}>{ value }</div>
        { opened && emojiDifficulties.filter(l => l !== value).map(l => <div className="emojiDropdownChild" onClick={() => { setOpened(!opened); setValue(l) }}>{l}</div> )}
    </div>
}

export default function ExamPage() {
    const { id } = useParams();
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [solutionOpen, setSolutionOpen] = useState(false);
    const [questions, setQuestions] = useState<Question[][][]>(ObservableSlim.create(initialQuestions, true, function(changes) {
        localStorage.setItem("questions", JSON.stringify(initialQuestions));
    }));

    const documentRef = useRef<HTMLDivElement>(null);

    const increasePage = () => {
        if (pageNumber < numPages) {
            setSelectedQuestion(null);
            setPageNumber(pageNumber + 1);
            
        }
    }

    const decreasePage = () => {
        if (pageNumber > 1) {
            setSelectedQuestion(null);
            setPageNumber(pageNumber - 1);
            
        }
    }

    const questionDifficulty = (difficulty: number | undefined, question: Question | null = selectedQuestion) => {
        console.log(question, difficulty, difficulty === undefined || isNaN(difficulty) || difficulty === -1);
        if (question) {
            if (difficulty === undefined || isNaN(difficulty) || difficulty === -1) {
                delete question.difficulty;
                delete questions[Number(id) - 1][pageNumber - 1].find(l => l.y === question.y)!.difficulty;
            } else {
                question.difficulty = difficulty;
                questions[Number(id) - 1][pageNumber - 1].find(l => l.y === question.y)!.difficulty = difficulty;
            }
            setQuestions([...questions]);
            setSelectedQuestion({...question});
            console.log(questions);
        }
    };

    function onDocumentLoadSuccess(stuff: { numPages: number }) {
        console.log(stuff);
        setNumPages(stuff.numPages);
    }

    const handleDocumentClick: MouseEventHandler<HTMLDivElement> = (e) => {
        const rect = documentRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.
        console.log("Left? : " + (x - 58) + " ; Top? : " + y + ".");
        console.log(questions[Number(id) - 1][pageNumber - 1]);
        for (const question of questions[Number(id) - 1][pageNumber - 1]) {
            if (pointInRect({ x, y }, question)) {
                console.log("Question yo", question.topic.name);
                setSelectedQuestion(question);

                const region = new Path2D();
                region.rect(question.x, question.y, question.width, question.height);

                const canvas = document.querySelector(".react-pdf__Page__canvas")! as HTMLCanvasElement;

                let canvas2 = document.createElement('canvas');
                canvas2.width = question.width;
                canvas2.height = question.height;
                canvas2.getContext('2d')!.drawImage(canvas, question.x, question.y, question.width, question.height, 0,0,question.width, question.height);
                const result = canvas2.toDataURL();
                question.image = result;
                
                const tempImg = document.createElement('img')
                tempImg.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>em{color:red;}</style><em>I</em> lick <span>cheese</span></div></foreignObject></svg>')
            }
        }
    }

    const currNode = selectedQuestion?.topic;
    const parentNode = currNode && findParentNode(currNode.name, tree.nodes[0]);
    const doubleParentNode = parentNode && findParentNode(parentNode.name, tree.nodes[0]);

    let secondParentNode, secondDoubleParentNode;

    if (currNode?.otherParent) {
        secondParentNode = currNode.otherParent;
        secondDoubleParentNode = findParentNode(secondParentNode.name, tree.nodes[0]);
    }

    console.log(questions);

    return <div className="examPage">
        <Sidebar />
        <div className="examPreview">
            <div ref={documentRef} style={{ borderRadius: 20, position: "relative", width: 595 }} onClick={handleDocumentClick}>
                <Document onLoadSuccess={onDocumentLoadSuccess} file={exams[Number(id) - 1]}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <div className="pageNavigator">
                    <div onClick={decreasePage} style={{ width: "30%", paddingTop: "2px", borderRight: "1px solid #999", cursor: pageNumber === 1 ? "not-allowed" : "pointer" }}>
                        <Icon
                            path={mdiChevronLeft}
                            size={1}
                            color={pageNumber === 1 ? "#BBB" : "#777"}
                        />
                    </div>
                    <div style={{ width: "40%", color: "#777", paddingBottom: "3px" }}>{ pageNumber }</div>
                    <div onClick={increasePage} style={{ width: "30%", paddingTop: "2px", borderLeft: "1px solid #999", cursor: pageNumber === numPages ? "not-allowed" : "pointer" }}>
                        <Icon
                            path={mdiChevronRight}
                            size={1}
                            color={pageNumber === numPages ? "#BBB" : "#777"}
                        />
                    </div>
                </div>
                { selectedQuestion && <div style={{ position: "absolute", left: selectedQuestion.x, top: selectedQuestion.y, width: selectedQuestion.width, height: selectedQuestion.height, backgroundColor: "rgba(177, 185, 249, 0.5)", borderRadius: 7 }}></div> }
                { selectedQuestion && !questions[Number(id) - 1][pageNumber - 1].filter(l => l.difficulty !== undefined).includes(selectedQuestion) && <div style={{ position: "absolute", left: selectedQuestion.x - 26, top: selectedQuestion.y, color: "black", width: 20 }}><EmojiDropdown value={emojiDifficulties[(selectedQuestion.difficulty ?? -1) + 1]} setValue={v => questionDifficulty(emojiDifficulties.indexOf(v) - 1) } /></div> }
                { questions[Number(id) - 1][pageNumber - 1].filter(l => l.difficulty !== undefined).map(l => <div style={{ position: "absolute", left: l.x - 26, top: l.y, color: "black", width: 20 }}><EmojiDropdown value={emojiDifficulties[(l.difficulty ?? -1) + 1]} setValue={v => questionDifficulty(emojiDifficulties.indexOf(v) - 1, l)} /></div>) }
            </div>
        </div>
        <div className="examContent">
            <h2>Additional help</h2>
            <div style={{ overflowY: "auto", height: `calc(100vh - 566px)` }}>
                <Markdown content={LoremIpsum} />
            </div>
            <div className="examContentButtons">
                <Link to={currNode ? `/module/${currNode.name.split(" ").join("_")}` : ""} style={{ textDecoration: "none", color: "inherit" }}><div className="examContentButton">Check out similar exercises</div></Link>
                <div className="examContentButton" onClick={() => selectedQuestion && setSolutionOpen(true)}>See solution to this problem</div>
                <Link to="/difficultProblems"><div className="examContentButton">See difficult problems</div></Link>
            </div>
            <h2>Knowledge tree</h2>
            <div className="examContentKnowledgeTree">
                <div className="examContentTreeRow">
                    { doubleParentNode && <div>
                        <Link style={{ width: 220, margin: "0 auto" }} to={`/module/${doubleParentNode.name.split(" ").join("_")}`}>
                            <div className="examContentTreeNode">
                                { doubleParentNode.name }
                            </div>
                        </Link>
                        <div className="examContentTreeNodeConnectorRow">
                            <div className="examContentTreeNodeConnector"></div>
                            <div className="examContentTreeNodeConnector"></div>
                        </div>
                    </div> }
                    { secondDoubleParentNode && <div>
                        <Link style={{ width: 220, margin: "0 auto" }} to={`/module/${secondDoubleParentNode.name.split(" ").join("_")}`}>
                            <div className="examContentTreeNode">
                                { secondDoubleParentNode.name }
                            </div>
                        </Link>
                        <div className="examContentTreeNodeConnectorRow">
                            <div className="examContentTreeNodeConnector"></div>
                            <div className="examContentTreeNodeConnector"></div>
                        </div>
                    </div> }
                </div>
                <div className="examContentTreeRow">
                    { parentNode && <div className="examContentTreeNodeConnectorRowBox">
                        <Link style={{ width: 220, margin: "0 auto" }} to={`/module/${parentNode.name.split(" ").join("_")}`}>
                            <div className="examContentTreeNode">
                                { parentNode.name }
                            </div>
                        </Link>
                        <div className="examContentTreeNodeConnectorRow">
                            <div className="examContentTreeNodeConnector"></div>
                            <div className="examContentTreeNodeConnector"></div>
                        </div>
                    </div> }
                    { secondParentNode && <div className="examContentTreeNodeConnectorRowBox">
                        <Link style={{ width: 220, margin: "0 auto" }} to={`/module/${secondParentNode.name.split(" ").join("_")}`}>
                            <div className="examContentTreeNode">
                                { secondParentNode.name }
                            </div>
                        </Link>
                        <div className="examContentTreeNodeConnectorRow">
                            <div className="examContentTreeNodeConnector"></div>
                            <div className="examContentTreeNodeConnector"></div>
                        </div>
                    </div> }
                </div>
                { secondParentNode && <div className="examContentTreeNodeConnectorRow" style={{ height: 25, width: 246, margin: "0 auto" }}>
                    <div className="examContentTreeNodeConnector" style={{ height: 25, borderTop: "6px solid #4565EF" }}></div>
                    <div className="examContentTreeNodeConnector" style={{ height: 25, borderTop: "6px solid #4565EF" }}></div>
                </div>}
                { currNode && <Link to={`/module/${currNode.name.split(" ").join("_")}`}>
                    <div className="examContentTreeNode" style={{ margin: "0 auto" }}>
                        { currNode.name }
                    </div>
                </Link> }
            </div>
            { selectedQuestion && false && <>
                <h2>Question options</h2>
                <label htmlFor="questionDifficulty">Question difficulty</label>
                <br />
                <select id="questionDifficulty" value={selectedQuestion?.difficulty} onChange={e => questionDifficulty(Number(e.target.value) ?? undefined)}>
                    <option value={undefined}>I did not solve the problem yet</option>
                    <option value={0}>I couldn't solve the problem</option>
                    <option value={1}>I solved the problem with difficulty</option>
                    <option value={2}>I solved the problem with little difficulty</option>
                    <option value={3}>I could solve the problem easily</option>
                </select>
            </> }
        </div>
        { solutionOpen && <div className="solutionModal" id="solutionModal" onClick={e => { if ((e.target as any).id === "solutionModal") setSolutionOpen(false) }}>
            <div className="solutionModalContent">
                <h2 style={{ textAlign: "center" }}><span style={{ marginLeft: "auto" }}>Solution to problem</span> <span className="closeButton" onClick={() => setSolutionOpen(false)}>X</span></h2>
                <ReactMarkdown children={selectedQuestion?.solution || ""} remarkPlugins={[RemarkMathPlugin]} rehypePlugins={[rehypeKatex]}></ReactMarkdown>
            </div>
        </div> }
    </div>
}