import "./TreePage.css"
import logo from "../../assets/logo.png";
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import knowledge from "../../assets/knowledge.png";

interface ITree {
    name: string;
    image: string;
    nodes: ITreeNode[];
}

interface ITreeNode {
    name: string;
    children: ITreeNode[];
}

function TreeNode({ name }: { name: string }) {
    return <div className="treeNode">
        <h3 className="treeNodeText">{ name }</h3>
        <Icon
            path={mdiChevronDown}
            size={1}
            className="treeNodeIcon"
        />
    </div>
}

export default function TreePage() {
    const tree: ITree = {
        name: "Mathematics",
        image: knowledge,
        nodes: [
            {
                name: "Pre-Algebra",
                children: [
                    {
                        name: "Geometry",
                        children: []
                    },
                    {
                        name: "Algebra",
                        children: []
                    }
                ]
            }
        ]
    }
    
    const levels: { name: string }[][] = [];
    let currentLevel = tree.nodes;
    let nextLevel = [];

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
        <div className="landingPageLogo">
            <img src={logo} alt="Logo" />
            <div className="treeHeader">
                <img src={tree.image} />
                <h3>{tree.name}</h3>
            </div>
            { levels.map(l => (
                <div className="treeLevel">
                    {
                        l.map(j => <TreeNode name={j.name} />)
                    }
                </div>
            ))}
        </div>
    </div>
}