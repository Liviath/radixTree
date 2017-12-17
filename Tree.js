import TreeNode from './TreeNode.js';
import {isDebug} from './Config.js';

const rootNode = Symbol('root node');

export default class Tree {

    constructor() {
        this[rootNode] = new TreeNode();

        if(isDebug) {
            this.getRootNode = function() {
                return this[rootNode];
            }.bind(this);
        }
    }

    /**
     *
     * @param {string} key
     * @param {*} value
     */
    append(key, value) {
        this[rootNode].addTreeNode(key.toLowerCase(), value)
    }

    /**
     * Returns the value of a key.
     * @param {string} key
     * @returns {*}
     */
    getValue(key) {
        return this[rootNode].getValueByKey(key);
    }
}

if(isDebug) {
    window.tree = Tree;
}