/**
 * Created by matt on 6/16/17.
 */
import { OrderedSet as ImmutableOrderedSet } from 'immutable';
const LOG = false


export default class BaseAdapter {

  constructor(element) {
    this.element = element;
  }

  /**
   * adds a class to the element
   * @param className
   */
  addClass(className) {
    this._updateClass(className,true)
  }

  removeClass(className) {
    this._updateClass(className, false)
  }

  hasClass(className) {
    const { foundationClasses } = this.element.state
    if (foundationClasses) {
      return foundationClasses.includes(className)
    }
    return false;
  }

  _updateClass(className,add=true,propName='foundationClasses') {
    this.element.setState(state => add
      ? ({ [propName]: state[propName].add(className)  })
      : ({ [propName]: state[propName].remove(className) })
    );
  }


  /**
   * Programmatically sets the css variable `varName` on the surface to the
   * value specified.
   * @param {string} varName
   * @param {string || null} value
   */
  updateCssVariable(varName,value) {
    this._updateCssVariable(varName,value)
  }

  _updateCssVariable(varName,value,propName='foundationCssVars') {
    this.element.setState(state => value !== null
      ? ({ [propName]: state[propName].set(varName, value)})
      : ({ [propName]: state[propName].delete(varName) })
    );
  }

  addEventListener(evtType,handler) {
    this._updateEventListener(evtType, handler, true)
  }

  removeEventListener(evtType,handler) {
    this._updateEventListener(evtType, handler, false)
  }

  /**
   * Essentially equivalent to
   * `HTMLElement.prototype.addEventListener`.
   * @param {string} evtType
   * @param {EventListener} handler
   */
  registerInteractionHandler(eventType, handler) {
   this.addEventListener(eventType,handler)
  }

  /**
   * Essentially equivalent to
   * `HTMLElement.prototype.removeEventListener`.
   * @param {string} evtType
   * @param {EventListener} handler
   */
  deregisterInteractionHandler(eventType, handler) {
   this.removeEventListener(eventType, handler)
  }

  _updateEventListener(evtType, handler, add=true, propName='foundationEventListeners') {

    this.element.setState(state =>
       ({
          [propName]: state[propName].update(
            evtType,
            ImmutableOrderedSet(),
            x =>  add ? x.add(handler) : x.delete(handler)
          )
        })
    );

  }

  toObject(model) {
    const keys = [...Object.keys(model),
      ...Object.getOwnPropertyNames(Object.getPrototypeOf(this))];
    const object = {};

    keys.forEach((key) => {
      object[key] = (...args) => this[key] !== undefined
        ? this[key](...args)
        : model[key](...args)
    });

    return object;
  }

}