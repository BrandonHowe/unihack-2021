import "./TreePage.css"
import logo from "../../assets/logo.png";
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import knowledge from "../../assets/knowledge.png";
import { useState } from "react";
import LoremIpsum from "../Article/LoremIpsum";
import { genRandomArticle } from "../../helpers";
import ArcArticle from "./ArcArticle";

export interface ITree {
    name: string;
    image: string;
    nodes: ITreeNode[];
}

export interface ITopic {
    name: string;
    article: string;
}

export interface ITreeNode {
    name: string;
    category?: ITreeCategory;
    topics: ITopic[]
    children: ITreeNode[];
    complete: boolean;
}

export interface ITreeCategory {
    name: string;
    color: string;
    colorName: string;
}

const treeCategories: ITreeCategory[] = [
    {
        name: "Pre-algebra",
        color: "#563C26",
        colorName: "Brown",
    },
    {
        name: "Algebra",
        color: "#545425",
        colorName: "Yellow"
    },
    {
        name: "Algebra II",
        color: "#283A19",
        colorName: "Green"
    },
    {
        name: "Matrices",
        color: "#5B3628",
        colorName: "Red"
    }
]

const genTopic = (name: string): ITopic => {
    return { name, article: genRandomArticle() };
}

export const tree: ITree = {
    name: "Mathematics",
    image: knowledge,
    nodes: [
        {
            name: "Linear Equations",
            complete: false,
            category: treeCategories[0],
            topics: [genTopic("Variables on one side"), genTopic("Variables on both sides"), genTopic("Unknown coefficients"), genTopic("Solving inequalities"), genTopic("Graphing linear equations")],
            children: [
                {
                    name: "Geometry",
                    complete: false,
                    children: [
                        {
                            name: "Trigonometry",
                            complete: false,
                            children: [],
                            topics: []
                        }
                    ],
                    topics: [
                        genTopic("Triangles"),
                        genTopic("Circles"),
                        { name: "Arcs and sectors", article: ArcArticle },
                        genTopic("Ellipses"),
                        genTopic("Cones")
                    ],
                },
                {
                    name: "Systems of Equations",
                    complete: false,
                    category: treeCategories[0],
                    topics: [genTopic("Solving systems with substitution"), genTopic("Solving systems with elimination"), genTopic("Number of solutions of systems"), genTopic("Graphing systems of equations")],
                    children: [
                        {
                            name: "Factoring",
                            complete: false,
                            category: treeCategories[1],
                            topics: [genTopic("Distributive property"), genTopic("Factoring by grouping"), genTopic("Difference of squares"), genTopic("Perfect squares"), genTopic("Factoring quadratics")],
                            children: [
                                {
                                    name: "Quadratics",
                                    complete: false,
                                    category: treeCategories[1],
                                    topics: [],
                                    children: [
                                        {
                                            name: "Matrices",
                                            complete: false,
                                            category: treeCategories[3],
                                            children: [
                                                {
                                                    name: "Determinants",
                                                    complete: false,
                                                    category: treeCategories[3],
                                                    topics: [],
                                                    children: []
                                                }
                                            ],
                                            topics: []
                                        },
                                        {
                                            name: "Complex numbers",
                                            complete: false,
                                            category: treeCategories[2],
                                            topics: [],
                                            children: [
                                                
                                            ],
                                        },
                                        {
                                            name: "Exponentials",
                                            complete: false,
                                            category: treeCategories[2],
                                            topics: [],
                                            children: [
                                                {
                                                    name: "Logarithms",
                                                    complete: false,
                                                    category: treeCategories[2],
                                                    topics: [],
                                                    children: [
                                                        { 
                                                            name: "Rational functions",
                                                            complete: false,
                                                            category: treeCategories[2],
                                                            topics: [],
                                                            children: [
                                                                {
                                                                    name: "Sine and cosine",
                                                                    complete: false,
                                                                    category: treeCategories[2],
                                                                    topics: [],
                                                                    children: [
                                                                        {
                                                                            name: "Limits",
                                                                            complete: false,
                                                                            topics: [],
                                                                            children: [
                                                                                {
                                                                                    name: "Derivatives",
                                                                                    complete: false,
                                                                                    topics: [],
                                                                                    children: [
                                                                                        {
                                                                                            name: "Integrals",
                                                                                            complete: false,
                                                                                            topics: [],
                                                                                            children: []
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                        }
                                    ],
                                }
                            ],
                        }
                    ],
                },
            ]
        }
    ]
}

function TreeNode({ name, complete, category, topics, children, first }: ITreeNode & { first?: boolean }) {
    const [opened, setOpened] = useState(false);

    const levels: ITreeNode[][] = [];
    let currentLevel = children;
    let nextLevel: ITreeNode[] = [];

    while (currentLevel.length !== 0) {
        levels.push([]);
        for (const node of currentLevel) {
            nextLevel.push(...node.children);
        }
        levels[levels.length - 1] = [...currentLevel];
        currentLevel = [...nextLevel];
        nextLevel = [];
    }

    const widthNeeded = (node: Omit<ITreeNode, "complete">): number => {
        if (node.children.length >= 2) {
            return node.children.reduce((acc, cur) => acc + widthNeeded(cur), 0)
        } else {
            return 300;
        }
    };

    const width = widthNeeded({ name, topics, children });

    return <div className="treeNodeArea">
        { first && <div className="treeNodeTopRow">
            <div className="treeNodeTopRowBox"></div>
            <div className="treeNodeTopRowBox"></div>
        </div> }
        <div className={`treeNode${complete ? " complete" : ""}`} style={{ height: opened ? topics.length === 0 ? 30 : topics.slice(0, 4).length * 40 + 30 : 30, backgroundColor: category?.color }}>
            <h3 className="treeNodeText" onClick={() => setOpened(!opened)}>{ name }</h3>
            <div onClick={() => setOpened(!opened)}>
                <Icon
                    path={mdiChevronDown}
                    size={1}
                    color="#929292"
                    className={`treeNodeIcon${opened ? " upsideDown" : ""}`}
                />
            </div>
            {
                opened && topics.slice(0, 3).map(topic => (
                    <div key={`treeNodeTopic${topic}`} className="treeNodeTopic">{topic}</div>
                ))
            }
            {
                opened && topics.length > 3 && <div className="treeNodeTopic" style={{ color: "#4565EF" }}>See all...</div>
            }
        </div>
        { children.length !== 0 && <div className="treeNodeBottomRow">
            <div className="treeNodeBottomRowBox"></div>
            <div className="treeNodeBottomRowBox"></div>
        </div>}
        <TreeLevel firstLevel={false} contents={children} />
    </div>
}

function TreeLevel({ contents, firstLevel }: { contents: ITreeNode[], firstLevel: boolean }) {
    return <div className="treeLevel">
        {
            contents.map(j => (
                <div className="treeNodeContainer">
                    <TreeNode {...j} first={!firstLevel} />
                </div>
            ))
        }
    </div>;
}

export default function TreePage() {
    const levels: ITreeNode[][] = [];
    let currentLevel = tree.nodes;
    let nextLevel: ITreeNode[] = [];

    while (currentLevel.length !== 0) {
        levels.push([]);
        for (const node of currentLevel) {
            nextLevel.push(...node.children);
        }
        levels[levels.length - 1] = [...currentLevel];
        currentLevel = [...nextLevel];
        nextLevel = [];
    }

    return <div className="treePage">
        <div className="treeKey">
            <h2>Unit key</h2>
            { treeCategories.map(l => <h3><span style={{ color: l.color }}>{l.colorName}</span><span> - {l.name}</span></h3>) }
        </div>
        <div style={{ display: "inline-block" }}>
            <div className="landingPageLogo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="treeHeader">
                <img src={tree.image} alt="TreeImage" />
                <h3>{tree.name}</h3>
            </div>
            <div style={{ marginBottom: 50, display: "inline-block", width: "100%" }}>
                <TreeLevel firstLevel={true} contents={levels[0]} />
            </div>
        </div>
    </div>
}