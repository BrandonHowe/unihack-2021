import "./TreePage.css"
import logo from "../../assets/logo.png";
import Icon from '@mdi/react';
import { mdiCheck, mdiChevronDown } from '@mdi/js';
import knowledge from "../../assets/knowledge.png";
import { useEffect, useRef, useState } from "react";
import { findParentNode, flatten, genRandomArticle } from "../../helpers";
import ArcArticle from "./ArcArticle";
import { Link } from "react-router-dom";

export interface ITree {
    name: string;
    image: string;
    nodes: ITreeNode[];
}

export interface ITopic {
    name: string;
    article: string;
    complete: boolean;
    questions: IQuestion[];
}

export interface IAnswerChoice {
    content: string;
    explanation: string;
    correct: boolean;
}

export interface IQuestion {
    question: string;
    points: number;
    answerChoices: IAnswerChoice[];
}

export interface ITreeNode {
    name: string;
    description: string;
    category?: ITreeCategory;
    topics: ITopic[]
    children: ITreeNode[];
    otherParent?: ITreeNode;
    quizQuestions: (IQuestion & { topic: string })[];
    quizScore?: number;
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
    return { name, article: genRandomArticle(), questions: [], complete: false };
}

const sinAndCos = {
    name: "Sine and cosine",
    description: "",
    category: treeCategories[2],
    quizQuestions: [],
    topics: [],
    children: []
};

export const tree: ITree = {
    name: "Mathematics",
    image: knowledge,
    nodes: [
        {
            name: "Linear Equations",
            description: "Solve equations with the variable being raised to the first power.",
            quizQuestions: [],
            category: treeCategories[0],
            topics: [genTopic("Variables on one side"), genTopic("Variables on both sides"), genTopic("Unknown coefficients"), genTopic("Solving inequalities"), genTopic("Graphing linear equations")],
            children: [
                {
                    name: "Geometry",
                    description: "Geometry is the study of shapes and angles. Learn about the different shapes and their mathematical properties.",
                    quizQuestions: [
                        {
                            question: "How many radians are in a circle?",
                            topic: "Arcs and sectors",
                            points: 2,
                            answerChoices: [
                                {
                                    content: "360",
                                    correct: false,
                                    explanation: "There are 360 degrees in a circle, not 360 radians."
                                },
                                {
                                    content: "2pi",
                                    correct: true,
                                    explanation: ""
                                },
                                {
                                    content: "pi",
                                    correct: false,
                                    explanation: "Pi radians is only half a circle. The whole circle has 2pi radians."
                                },
                                {
                                    content: "1",
                                    correct: false,
                                    explanation: "You are just plain stupid if you chose this one rofl"
                                }
                            ]
                        },
                        {
                            question: "What is $a^2 + b^2$",
                            topic: "Triangles",
                            points: 2,
                            answerChoices: [
                                {
                                    content: "c^2",
                                    correct: true,
                                    explanation: ""
                                },
                                {
                                    content: "$(a+b)^2$",
                                    correct: false,
                                    explanation: "$(a + b)^2$ is equal to $a^2 + 2ab + b^2$, not $a^2 + b^2$."
                                },
                                {
                                    content: "4",
                                    correct: false,
                                    explanation: "lmao what"
                                },
                                {
                                    content: "21",
                                    correct: false,
                                    explanation: "21 is equal to 9 + 10"
                                }
                            ]
                        },
                        {
                            question: "How many degrees are in a circle?",
                            topic: "Circles",
                            points: 2,
                            answerChoices: [
                                {
                                    content: "360",
                                    correct: true,
                                    explanation: ""
                                },
                                {
                                    content: "2pi",
                                    correct: false,
                                    explanation: "There are 2pi radians in a circle, not degrees."
                                },
                                {
                                    content: "pi",
                                    correct: false,
                                    explanation: "Pi radians is only half a circle. The whole circle has 2pi radians which is equivalent to 360 degrees."
                                },
                                {
                                    content: "1",
                                    correct: false,
                                    explanation: "lmao ok buddy"
                                }
                            ]
                        },
                        {
                            question: "How many radians are in a circle?",
                            topic: "Arcs and sectors",
                            points: 2,
                            answerChoices: [
                                {
                                    content: "360",
                                    correct: false,
                                    explanation: "There are 360 degrees in a circle, not 360 radians."
                                },
                                {
                                    content: "2pi",
                                    correct: true,
                                    explanation: ""
                                },
                                {
                                    content: "pi",
                                    correct: false,
                                    explanation: "Pi radians is only half a circle. The whole circle has 2pi radians."
                                },
                                {
                                    content: "1",
                                    correct: false,
                                    explanation: "You are just plain stupid if you chose this one rofl"
                                }
                            ]
                        },
                        {
                            question: "What is $a^2 + b^2$",
                            topic: "Triangles",
                            points: 2,
                            answerChoices: [
                                {
                                    content: "c^2",
                                    correct: true,
                                    explanation: ""
                                },
                                {
                                    content: "$(a+b)^2$",
                                    correct: false,
                                    explanation: "$(a + b)^2$ is equal to $a^2 + 2ab + b^2$, not $a^2 + b^2$."
                                },
                                {
                                    content: "4",
                                    correct: false,
                                    explanation: "lmao what"
                                },
                                {
                                    content: "21",
                                    correct: false,
                                    explanation: "21 is equal to 9 + 10"
                                }
                            ]
                        },
                    ],
                    children: [
                        sinAndCos
                    ],
                    topics: [
                        {
                            name: "Arcs and sectors",
                            complete: false,
                            article: ArcArticle,
                            questions: [
                                {
                                    question: "How many radians are in a circle?",
                                    points: 2,
                                    answerChoices: [
                                        {
                                            content: "360",
                                            correct: false,
                                            explanation: "There are 360 degrees in a circle, not 360 radians."
                                        },
                                        {
                                            content: "2pi",
                                            correct: true,
                                            explanation: ""
                                        },
                                        {
                                            content: "pi",
                                            correct: false,
                                            explanation: "Pi radians is only half a circle. The whole circle has 2pi radians."
                                        },
                                        {
                                            content: "1",
                                            correct: false,
                                            explanation: "You are just plain stupid if you chose this one rofl"
                                        }
                                    ]
                                },
                                {
                                    question: "How many radians are in a circle?",
                                    points: 2,
                                    answerChoices: [
                                        {
                                            content: "360",
                                            correct: false,
                                            explanation: "There are 360 degrees in a circle, not 360 radians."
                                        },
                                        {
                                            content: "2pi",
                                            correct: true,
                                            explanation: ""
                                        },
                                        {
                                            content: "pi",
                                            correct: false,
                                            explanation: "Pi radians is only half a circle. The whole circle has 2pi radians."
                                        },
                                        {
                                            content: "1",
                                            correct: false,
                                            explanation: "You are just plain stupid if you chose this one rofl"
                                        }
                                    ]
                                },
                                {
                                    question: "How many degrees are in a circle?",
                                    points: 1,
                                    answerChoices: [
                                        {
                                            content: "360",
                                            correct: true,
                                            explanation: ""
                                        },
                                        {
                                            content: "2pi",
                                            correct: false,
                                            explanation: "There are 2pi radians in a circle, not degrees."
                                        },
                                        {
                                            content: "pi",
                                            correct: false,
                                            explanation: "Pi radians is only half a circle. The whole circle has 2pi radians which is equivalent to 360 degrees."
                                        },
                                        {
                                            content: "1",
                                            correct: false,
                                            explanation: "lmao ok buddy"
                                        }
                                    ]
                                }
                            ]
                        },
                        genTopic("Triangles"),
                        genTopic("Circles"),
                        genTopic("Ellipses"),
                        genTopic("Cones")
                    ],
                },
                {
                    name: "Systems of Equations",
                    description: "",
                    category: treeCategories[0],
                    quizQuestions: [],
                    topics: [genTopic("Solving systems with substitution"), genTopic("Solving systems with elimination"), genTopic("Number of solutions of systems"), genTopic("Graphing systems of equations")],
                    children: [
                        {
                            name: "Factoring",
                            description: "",
                            category: treeCategories[1],
                            quizQuestions: [],
                            topics: [genTopic("Distributive property"), genTopic("Factoring by grouping"), genTopic("Difference of squares"), genTopic("Perfect squares"), genTopic("Factoring quadratics")],
                            children: [
                                {
                                    name: "Quadratics",
                                    description: "",
                                    category: treeCategories[1],
                                    quizQuestions: [],
                                    topics: [],
                                    children: [
                                        {
                                            name: "Trigonometry",
                                            quizQuestions: [],
                                            description: "",
                                            otherParent: sinAndCos,
                                            children: [],
                                            topics: []
                                        },
                                        {
                                            name: "Matrices",
                                            description: "",
                                            category: treeCategories[3],
                                            quizQuestions: [],
                                            children: [
                                                {
                                                    name: "Determinants",
                                                    description: "",
                                                    category: treeCategories[3],
                                                    quizQuestions: [],
                                                    topics: [],
                                                    children: []
                                                }
                                            ],
                                            topics: []
                                        },
                                        {
                                            name: "Complex numbers",
                                            description: "",
                                            category: treeCategories[2],
                                            quizQuestions: [],
                                            topics: [],
                                            children: [
                                                
                                            ],
                                        },
                                        {
                                            name: "Exponentials",
                                            description: "",
                                            category: treeCategories[2],
                                            quizQuestions: [],
                                            topics: [],
                                            children: [
                                                {
                                                    name: "Logarithms",
                                                    description: "",
                                                    category: treeCategories[2],
                                                    quizQuestions: [],
                                                    topics: [],
                                                    children: [
                                                        { 
                                                            name: "Rational functions",
                                                            description: "",
                                                            category: treeCategories[2],
                                                            quizQuestions: [],
                                                            topics: [],
                                                            children: [
                                                                {
                                                                    name: "Limits",
                                                                    description: "",
                                                                    quizQuestions: [],
                                                                    topics: [],
                                                                    children: [
                                                                        {
                                                                            name: "Derivatives",
                                                                            description: "",
                                                                            quizQuestions: [],
                                                                            topics: [],
                                                                            children: [
                                                                                {
                                                                                    name: "Integrals",
                                                                                    description: "",
                                                                                    quizQuestions: [],
                                                                                    topics: [],
                                                                                    children: []
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
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

function TreeNode({ node, first, elementMap, setElementMap }: { node: ITreeNode, first?: boolean, elementMap: Record<string, boolean>, setElementMap: (v: Record<string, boolean>) => void }) {
    const { name, category, topics, children, quizScore, quizQuestions } = node;

    const nodeRef = useRef<HTMLDivElement>(null);

    const [opened, setOpened] = useState(false);

    console.log(quizScore, quizQuestions.reduce((acc, cur) => acc + cur.points, 0), (quizScore || 0) / (quizQuestions.reduce((acc, cur) => acc + cur.points, 0)));

    const complete = (topics.length > 0 && topics.every(l => l.complete)) || ((quizScore || 0) / (quizQuestions.reduce((acc, cur) => acc + cur.points, 0)) >= 0.8);

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

    const widthNeeded = (node: Pick<ITreeNode, "children">): number => {
        if (node.children.length >= 2) {
            return node.children.reduce((acc, cur) => acc + widthNeeded(cur), 0)
        } else {
            return 300;
        }
    };

    const flattenedNodes: ITreeNode[] = flatten(tree.nodes[0]);

    const secondChild = flattenedNodes.find(l => l.otherParent === node);

    let secondLevelDiff = 0;
    const [shortened, setShortened] = useState(false);

    if (secondChild) {
        const levels2: ITreeNode[][] = [];
        let currentLevel2 = tree.nodes;
        let nextLevel2: ITreeNode[] = [];

        while (currentLevel2.length !== 0) {
            levels2.push([]);
            for (const node of currentLevel2) {
                nextLevel2.push(...node.children);
            }
            levels2[levels2.length - 1] = [...currentLevel2];
            currentLevel2 = [...nextLevel2];
            nextLevel2 = [];
        }
        console.log(levels2);
        console.log("ASDJF", levels2.findIndex(l => l.includes(node)), secondChild && levels2.findIndex(l => l.includes(secondChild)))
        secondLevelDiff = levels2.findIndex(l => l.includes(secondChild)) - levels2.findIndex(l => l.includes(node));
    }

    useEffect(() => {
        const parentNode = findParentNode(node.name, tree.nodes[0]);
        if (parentNode) {
            setShortened(Boolean(elementMap[parentNode.name]));
        }
    }, [elementMap, node.name])
    
    const width = widthNeeded({ children });

    return <div className="treeNodeArea" ref={nodeRef}>
        { first && <div className="treeNodeTopRow">
            <div className="treeNodeTopRowBox"></div>
            <div className="treeNodeTopRowBox"></div>
        </div> }
        <div className="treeNode" style={{ height: opened ? topics.length === 0 ? 30 : topics.slice(0, 4).length * 40 + 30 : 30, backgroundColor: category?.color }}>
            { (node.quizScore || 0) >= 0.8 && <div onClick={() => { elementMap[node.name] = !elementMap[node.name]; setTimeout(() => { setElementMap({...elementMap}); setOpened(!opened) }, 0) }}>
                <Icon
                    path={mdiCheck}
                    size={1}
                    color="#55E05E"
                    className="treeNodeCheck"
                />
            </div> }
            <h3 className="treeNodeText" onClick={() => { elementMap[node.name] = !elementMap[node.name]; setTimeout(() => { setElementMap({...elementMap}); setOpened(!opened) }, 0) }}>{ name }</h3>
            <div onClick={() => { elementMap[node.name] = !elementMap[node.name]; setTimeout(() => { setElementMap({...elementMap}); setOpened(!opened) }, 0) }}>
                <Icon
                    path={mdiChevronDown}
                    size={1}
                    color="#929292"
                    className={`treeNodeIcon${opened ? " upsideDown" : ""}`}
                />
            </div>
            {
                opened && topics.slice(0, 3).map(topic => (
                    <Link to={`/article/${topic.name.split(" ").join("_")}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <div key={`treeNodeTopic${topic.name}`} className="treeNodeTopic">{topic.name}</div>
                    </Link>
                ))
            }
            {
                opened && topics.length > 3 && <Link to={`/module/${name.split(" ").join("_")}`}><div className="treeNodeTopic" style={{ color: "#4565EF" }}>See all...</div></Link>
            }
        </div>
        { children.length !== 0 && <div className="treeNodeBottomRow">
            <div className="treeNodeBottomRowBox"></div>
            <div className="treeNodeBottomRowBox"></div>
        </div>}
        { secondChild && <div className="treeNodeBottomRow" style={{ height: 56 + ((secondLevelDiff - 1) * 156) - (shortened ? 162 : 0) }}>
            <div className="treeNodeBottomRowBox" style={{ height: 56 + ((secondLevelDiff - 1) * 156) - (shortened ? 162 : 0) }}></div>
            <div className="treeNodeBottomRowBox" style={{ height: 56 + ((secondLevelDiff - 1) * 156) - (shortened ? 162 : 0) }}></div>
        </div>}
        <TreeLevel firstLevel={false} contents={children} elementMap={elementMap} setElementMap={setElementMap} />
    </div>
}

function TreeLevel({ contents, firstLevel, elementMap, setElementMap }: { contents: ITreeNode[], elementMap: Record<string, boolean>, setElementMap: (v: Record<string, boolean>) => void, firstLevel: boolean }) {
    return <div className="treeLevel">
        {
            contents.map(j => (
                <div className="treeNodeContainer">
                    <TreeNode node={j} first={!firstLevel} elementMap={elementMap} setElementMap={setElementMap} />
                </div>
            ))
        }
    </div>;
}

export default function TreePage() {
    const levels: ITreeNode[][] = [];
    let currentLevel = tree.nodes;
    let nextLevel: ITreeNode[] = [];

    const [elementMap, setElementMap] = useState<Record<string, boolean>>({});

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
            <Link to="/exam/1">
                <div className="treeHeader">
                    <img src={tree.image} alt="TreeImage" />
                    <h3>{tree.name}</h3>
                </div>
            </Link>
            <div style={{ marginBottom: 50, display: "inline-block", width: "100%" }}>
                <TreeLevel elementMap={elementMap} setElementMap={setElementMap} firstLevel={true} contents={levels[0]} />
            </div>
        </div>
    </div>
}