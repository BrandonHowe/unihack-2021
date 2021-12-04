import LoremIpsum from "./views/Article/LoremIpsum";
import { ITreeNode, tree } from "./views/TreePage/TreePage";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const flatten = (node: ITreeNode): ITreeNode[] => {
    let currLevel = [node];
    let nextLevel = node.children;
    while (nextLevel.length !== 0) {
        let newNextLevel: ITreeNode[] = [];
        for (const thing of nextLevel) {
            newNextLevel.push(...thing.children);
        }
        currLevel = currLevel.concat(nextLevel);
        nextLevel = newNextLevel;
    }
    return currLevel;
}

export function genRandomArticle() {
    const paras = LoremIpsum.split("\n\n");

    let shuffled = paras
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    return shuffled.join("\n\n");
}

export const findNodeByName = (name: string, node: ITreeNode = tree.nodes[0]): ITreeNode | undefined => {
    if (node.name === name) {
        return node;
    }
    if (!node.children.length) {
        return undefined;
    }
    for (const child of node.children) {
        const r = findNodeByName(name, child);
        if (r) {
            return r;
        }
    }
};

export const findTopicByName = (name: string, node: ITreeNode = tree.nodes[0]): ITreeNode | undefined => {
    if (node.topics.some(l => l.name === name)) {
        return node;
    }
    if (!node.children.length) {
        return undefined;
    }
    for (const child of node.children) {
        const r = findTopicByName(name, child);
        if (r) {
            return r;
        }
    }
};