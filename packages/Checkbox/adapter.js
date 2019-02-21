import debug from '../debug';
import BaseAdapter from '../Base/BaseAdapter';
import { getCorrectEventName } from '@material/animation/dist/mdc.animation';
const LOG = false;


export default class CheckboxAdapter extends BaseAdapter {

  //addClass
  //removeClass

  addClass(className) {
    debug(LOG,'addClass',{className})
    this._updateClass(className,true)
  }

  removeClass(className) {
    debug(LOG,'removeClass',{className})
    this._updateClass(className, false)
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
  }

  dereigsterChangeHandler(handler) {
    debug(LOG,'deregisterChangeHander',{handler})
  }

 getNativeControl() {
    debug(LOG,'getNativeControl',{el: this.element.inputEl})
    return this.element.inputEl
 }

 forceLayout() {
  debug(LOG,'forceLayout',{})
   if (this.element.inputEl) {
    return this.element.inputEl.offsetWidth
   }
 }

 isAttachedToDOM() {
    return Boolean(this.element.inputEl)
 }

 get checked() {
    debug(LOG,'GET CHECKED')
 }

 set checked(checked) {
    debug(LOG, 'SET CHECKED')
 };

  get root_() {
    debug(LOG,'GET ROOOOOOOOOT')
  }
}
