
const value = Symbol('value');
const target = Symbol('target');

export default class Path {

    /**
     * The connection of two TreeNodes.
     *
     * @param {String} initialValue
     * @param {TreeNode} target
     */
    constructor(initialValue, initialTarget) {
        this[value] = initialValue;
        this[target] = initialTarget;
    }

    /**
     *
     * @returns {String}
     */
    getValue() {
        return this[value];
    }

    /**
     * @param {String} newValue
     */
    setValue(newValue) {
        if(typeof newValue !== 'string' || newValue.length === 0) {
            throw new Error('The path value cannot be empty.');
        }

        this[value] = newValue;
    }

    /**
     * @returns {TreeNode}
     */
    getTarget() {
        return this[target];
    }

    /**
     * @param {TreeNode} newTarget
     */
    setTarget(newTarget) {
        if(!newTarget) {
            console.warn('If target is empty, the path can be removed.');
        }

        this[target] = newTarget;
    }
}