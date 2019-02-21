import debug from '../debug';
import { getCorrectEventName } from '@material/animation/dist/mdc.animation';
import {getMatchesProperty} from "../util";
import BaseAdapter from "../Base/BaseAdapter";

const LOG = false;

export default class CheckboxAdapter extends BaseAdapter {

  //addClass
  //removeClass

  /**
   * Sets an attribute with a given value on the input element.
   * @param {string} attr
   * @param {string} value
   */
  setNativeControlAttr(attr, value) {
    debug(LOG,'setNativeControlAttr',{attr,value});

    this._updateAttr(attr,value,'inputAttrs');
  }

  /**
   * Removes an attribute from the input element.
   * @param {string} attr
   */
  removeNativeControlAttr(attr) {
    debug(LOG,'removeNativeControlAttr',{attr});

    this._updateAttr(attr,null,'inputAttrs')
  }

  /**
   * Registers an event handler to be called when an `animationend` event is
   * triggered on the root element. Note that you must account for vendor
   * prefixes in order for this to work correctly.
   * @param {EvnetListener} handler
   */
  registerAnimationEndHandler(handler) {
    debug(LOG,'registerAnimationHandler',{handler})
    this._updateEventListener(
      getCorrectEventName(window,'animationend'),
      handler,
      true
    )
  }

  /**
   * Deregisters an event handler from an `animationend` event listener. This
   * will only be called with handlers that have previously been passed to
   * `registerAnimationEndHandler` calls.
   * @param handler
   */
  deregisterAnimationEndHandler(handler) {
    debug(LOG,'registerAnimationHandler',{handler})
    this._updateEventListener(
      getCorrectEventName(window,'animationend'),
      handler,
      false
    )
  }

  registerChangeHandler(handler) {
    debug(LOG,'registerChangeHander',{handler})

    this._updateEventListener('change',handler,true,'nativeEventListeners')
  }

  dereigsterChangeHandler(handler) {
    debug(LOG,'deregisterChangeHander',{handler})
    this._updateEventListener('change',handler,false,'nativeEventListeners')
  }

 getNativeControl() {
    debug(LOG,'getNativeControl',{
      indeterminate: this.element.inputEl && this.element.inputEl.hasOwnProperty('indeterminate')
        ? this.element.inputEl.indeterminate : null

    })
    return this.element.inputEl
 }

 forceLayout() {
  debug(LOG,'forceLayout',{})
   if (this.element.inputEl) {
    return this.element.rootEl.offsetWidth
   }
 }

 isAttachedToDOM() {
    return Boolean(this.element.rootEl)
 }

  //CUSTOM RIPPLE ADAPTER

  isUnbounded() {
    debug(LOG,'isUnbounded',{returns: true});
    return true
  }

  isSurfaceActive() {
    const MATCHES = getMatchesProperty(HTMLElement.prototype)
    debug(LOG,'isActive',{MATCHES});

    if (this.element.inputEl) {
      return this.element.inputEl[MATCHES](':active');
    }
  }

  registerInteractionHandler(evtType,handler) {
    debug(LOG, 'registerInteractionHandler',{evtType,handler})

    // reactjs doest not currently have a pointerdown synthetic event
    if (evtType !== 'pointerdown') {
      this._updateEventListener(evtType,handler,true,'foundationEventListeners')
    }
  }
  deregisterInteractionHandler(evtType,handler)  {
    debug(LOG, 'reisterInteractionHandler', {evtType, handler});
    this._updateEventListener(evtType,handler,false,'foundationEventListeners')
  }

}

/*******/
export const CheckBoxRippleAdapter = {
  isUnbounded: () => {},
  isSurfaceActive: () => {},
  registerInteractionHandler: () => {},
  deregisterInteractionHandler: () => {},
};
