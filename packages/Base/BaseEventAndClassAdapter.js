import BaseClassAdapter from './BaseClassAdapter';
import { OrderedSet as ImmutableOrderedSet } from 'immutable';
import debug from '../debug'

export default class BaseEventAndClassAdapter extends BaseClassAdapter {

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
    if (eventType !== 'pointerdown') { //eventType does not exist in react
      this.addEventListener(eventType, handler)
    }
  }

  /**
   * Essentially equivalent to
   * `HTMLElement.prototype.removeEventListener`.
   * @param {string} evtType
   * @param {EventListener} handler
   */
  deregisterInteractionHandler(eventType, handler) {
    if (eventType !== 'pointerdown') {
      this.removeEventListener(eventType, handler)
    }
  }

  _updateEventListener(evtType, handler, add=true, propName='foundationEventListeners') {
    debug(this.LOG,'_updateEventLister',{evtType,handler,add,propName})
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
}
