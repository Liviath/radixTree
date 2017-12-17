import Path from './Path.js';
import {isDebug} from './Config.js';

const paths = Symbol('paths');
const value = Symbol('value');

const offset = 'a'.charCodeAt(0);

export default class TreeNode {

    /**
     *
     */
    constructor() {
        this[paths] = new Array(26);
        this[value] = null;
        if(isDebug) {
            this.getTreeNodeForChar = function(character) {
                const path = this.getPathForChar(character);
                return path ? path.getTarget() : null;
            }.bind(this);
        }
    }

    /**
     * @param {string} key
     * @param {*} value
     */
    addTreeNode(key, value) {
        const asc = key.charCodeAt(0);
        const index = asc - offset;

        if(index > 25) {
            throw new Error('Invalid key provided.');
        }

        /** @var {Path} path */
        const path = this[paths][index];
        if(path) {
            const pathValue = path.getValue();
            const pathTarget = path.getTarget();

            if(pathValue.length === 1) {
                const remainingKey = key.substr(1);
                pathTarget.addTreeNode(remainingKey, value);
            } else {
                if(pathValue === key.substr(0, pathValue.length)) {
                    const remainingKey = key.substr(pathValue.length);
                    pathTarget.addTreeNode(remainingKey, value);
                } else {
                    this.splitPath(path, key, value);
                }
            }
        } else {
            const newTreeNode = new TreeNode();
            newTreeNode.setValue(value);
            this[paths][index] = new Path(key, newTreeNode);
        }
    }

    /**
     *
     * @param {Path} path
     * @param {String} key
     * @param {String} value
     */
    splitPath(path, key, value) {
        let differentAt = this.getDifferenceIndex(key, path.getValue());

        const oldPathValue = path.getValue();
        const oldPathTarget = path.getTarget();
        const newPathValue = oldPathValue.substr(0, differentAt);
        const remainingPathValue = oldPathValue.substr(differentAt);

        path.setValue(newPathValue);
        const newTarget = new TreeNode();
        path.setTarget(newTarget)

        if(remainingPathValue.length) {
            newTarget.addTreeNode(remainingPathValue, oldPathTarget.getValue());
        } else {
            newTarget.setValue(oldPathTarget.getValue());
        }

        if(key.length > differentAt) {
            newTarget.addTreeNode(key.substr(differentAt), value);
        } else {
            newTarget.setValue(value);
        }
    }

    /**
     * Gets the index of the first character that is different in two strings.
     *
     * @param {string} string1
     * @param {string} string2
     * @returns {number}
     */
    getDifferenceIndex(string1, string2) {
        let index = -1;

        for(let i = 0; i < string1.length; ++i) {
            if(string1.charAt(i) !== string2.charAt(i)) {
                index = i;
                break;
            }
        }

        if(string2.length > string1.length && index === -1) {
            return string1.length;
        }

        return index;
    }

    /**
     * @param {string} key
     * @returns {*}
     */
    getValueByKey(key) {
        const path = this.getPathByChar(key);

        if(key.length > path.getValue().length) {
            return path.getTarget().getValueByKey(key.substr(path.getValue().length));
        } else {
            return path.getTarget().getValue();
        }
    }

    /**
     * Gets the path by the first character.
     * @param {string} character
     * @returns {*}
     */
    getPathByChar(character) {
        return this[paths][character.charCodeAt(0)-offset];
    }

    /**
     *
     * @returns {*}
     */
    getValue() {
        return this[value];
    }

    /**
     * @param {*} newValue
     */
    setValue(newValue) {
        this[value] = newValue;
    }
}