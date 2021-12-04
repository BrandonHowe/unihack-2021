import "./ExamPage.css";
import logo from "../../assets/logo.png";
import math from "../../assets/math.png";
import { ITreeNode, tree } from "../TreePage/TreePage";
import { MouseEventHandler, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { findNodeByName, flatten } from "../../helpers";

interface Question {
    x: number;
    y: number;
    width: number;
    height: number;
    topic: ITreeNode;
}

const questions: Question[] = [
    { x: 58, y: 170, width: 289, height: 21, topic: findNodeByName("Complex numbers")! },
    { x: 58, y: 192, width: 476, height: 42, topic: findNodeByName("Quadratics")! },
    { x: 58, y: 234, width: 407, height: 21, topic: findNodeByName("Logarithms")! },
    { x: 58, y: 255, width: 476, height: 37, topic: findNodeByName("Quadratics")! },
    { x: 58, y: 292, width: 476, height: 37, topic: findNodeByName("Linear Equations")! },
    { x: 58, y: 329, width: 368, height: 33, topic: findNodeByName("Trigonometry")! },
];

const pointInRect = (point: { x: number, y: number }, rect: { x: number, y: number, width: number, height: number }) => {
    if (point.x < rect.x) return false;
    if (point.y < rect.y) return false;
    if (point.x > rect.x + rect.width) return false;
    if (point.y > rect.y + rect.height) return false;
    return true;
}

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

export default function ExamPage() {
    const [numPages, setNumPages] = useState<unknown>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [examListOpen, setExamListOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

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
            <div className="examContentButton">See solution to this problem</div>
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
    </div>
}