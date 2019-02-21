export default class Adapter {

  constructor(element,log)  {
    this.element = element;
    this.LOG = log !== undefined ? log : (element.props.log || false)
  }

  toObject(model) {
    return Object.keys(model).reduce((a, b) => ({
      ...a,
      [b]: (...args) => this[b] !== undefined
        ? this[b](...args)
        : new Error('model missing key: ', b)
    }), {})
  }
}
