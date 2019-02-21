/**
 * Created by matt on 6/26/17.
 */

import BaseAdapter from '../Base/BaseAdapter';
import { strings } from '@material/drawer/temporary/constants'
import {
  remapEvent,
  getTransformPropertyName,
  supportsCssCustomProperties
} from '@material/drawer/util';

const LOG = true

const debug = (log=false, groupName, stuff={}) => {
  if (log) {
    console.group(groupName)
    Object.keys(stuff).map(key=> {
      console.log("%c"+key + ':  ','font-weight: bold',stuff[key])
    })
    console.groupEnd()
  }
  return;
}

export class DrawerAdapter extends BaseAdapter {

  //addClass
  //removeClass
  //hasClass

  /**
   * Returns boolean indicating whether the necessary DOM is present
   * (namely, the `mdc-persistent-drawer__drawer` drawer container).
   * @returns {boolean}
   */
  hasNecessaryDom() {
    return true
  }

  addBodyClass(className) {
    document.body.classList.add(className)
  }

  removeBodyClass(className) {
    document.body.classList.remove(className)
  }

  registerInteractionHandler(evt, handler) {
  }

  deregisterIteractionHandler(evt, handler) {
  }

  /**
   * Adds an event listener to the drawer container sub-element for the
   * specified event name
   * @param {string} evt
   * @param {EventListener} handler
   */
  registerDrawerInteractionHandler(evt, handler) {
  }


  /**
   * Removes an event listener to the drawer container sub-element for the
   * specified event name
   * @param {string} evt
   * @param {EventListener} handler
   */
  deregisterDrawerInteractionHandler(evt, handler) {
  }

  /**
   * Registers an event handler to be called when a `transitionend` event is
   * triggered on the drawer container sub-element element.
   * @param {EventListener} handler
   */
  registerTransitionEndHandler(handler) {
    const evtType = 'transitionend';
    const propName = 'surfaceEventListeners';
    this._updateEventListener(evtType, handler, true)
  }

  /**
   * Deregisters an event handler from a `transitionend` event listener. This
   *  will only be called with handlers that have previously been passed to
   * `registerTransitionEndHandler` calls.
   * @param {EventListener} handler
   */
  deregisterTransitionEndHandler(handler) {
    const evtType = 'transitionend';
    const propName = 'surfaceEventListeners';
    this._updateEventListener(evtType, handler, false)
  }

  /**
   * Registers and event handler on the `document` object for a `keydown` event.
   * @param {EventListener} handler
   */
  registerDocumentKeydownHandler(handler) {
    document.addEventListener("keydown", handler);
  }

  /**
   * Deregisters and event handler on the `document` object for a `keydown`
   * event.
   * @param {EventListener} handler
   */
  deregisterDocumentKeydownHandler(handler) {
    document.removeEventListener("keydown", handler);
    debug(LOG,'keyDown',{handler})
  }

  /**
   * Returns the current drawer width
   * @return {number} offsetWidth
   */
  getDrawerWidth() {
    return this.element.surfaceEl.offsetWidth;
    //get offsetWidth from drawer ref
  }

  /**
   * sets the current position for the drawer, in pixels from the border.
   * @param value
   */
  setTranslateX(value) {
    if (supportsCssCustomProperties()) {
      const varName = getTransformPropertyName();
      const val = value === null ? null : `translateX(${value}px)`;
      const propName = 'surfaceCssVars';
      this._updateCssVariable(varName, val, propName);
    }
  }

  /**
   * sets a CSS custom property, for controlling the current background
   * opacity when manually dragging the drawer.
   * @param value
   */
  updateCssVariable(value) {
    if (supportsCssCustomProperties()) {
      this._updateCssVariable(strings.OPACITY_VAR_NAME, value)
    }
  }

  getFocusableElements() {
    console.log('TO DO')
    console.groupEnd();
  }

  saveElementTabState(el) {
    console.group('Save Element Tab State')
    console.log('TO DO')
    console.log(el)
    console.groupEnd();
  }

  restoreElementTabState(el) {
    console.group('Restore Element Tab State')
    console.log('TO DO')
    console.log(el)
    console.groupEnd();
  }

  makeElementUntabbable(el) {
    console.group('Make element unTabble ')
    console.log('TO DO')
    console.log(el)
    console.groupEnd();
  }

  notifyOpen() {
    const { props } = this.element;
    this.element.setState({ open: true})
    if (props.hasOwnProperty('onOpen') &&
      typeof props.onOpen === 'function') {
      props.onOpen()
    }
  }

  notifyClose() {
    const { props, state} = this.element;
    this.element.setState({ open: false })
    if (props.hasOwnProperty('onClose') &&
      typeof props.onClose === 'function') {
      props.onClose()
    }
  }

  isDrawer(el) {
    return el === this.element.surfaceEl || false
  }


  /**
   * Returns boolean indicating whether the current environment is RTL.
    * @return {*|boolean}
   */
  isRtl() {
    return this.element.props.rtl || false
  }
}