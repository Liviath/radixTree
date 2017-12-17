import TreeNode from './TreeNode.js';
import {isDebug} from './Config.js';
import print from './UI.js';

const rootNode = Symbol('root node');

export default class Tree {

    constructor() {
        this[rootNode] = new TreeNode();
    }

    /**
     *
     * @param {string} key
     * @param {*} value
     */
    append(key, value) {
        this[rootNode].addTreeNode(key.toLowerCase(), value);
        print(this);
    }

    /**
     * Returns the value of a key.
     * @param {string} key
     * @returns {*}
     */
    getValue(key) {
        return this[rootNode].getValueByKey(key);
    }

    /**
     * @returns {TreeNode}
     */
    getRootNode() {
        return this[rootNode];
    }
}


if(isDebug) {
    window.tree = Tree;
    const dummy = new Tree();
    dummy.append('asd', 1);
    dummy.append('qwe', 2);
    dummy.append('a', 3);
    window.dummy = dummy;
}