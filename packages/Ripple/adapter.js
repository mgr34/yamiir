import BaseAdapter from '../Base/BaseAdapter';
import debug from '../debug';
import  { applyPassive, supportsCssVariables } from "../util";

const LOG = false;

export class RippleAdapter extends BaseAdapter {
  /**
   * Whether or not the given browser supports CSS Variables. When implementing
   * this, please take the Safari considerations into account. We provide a
   * supportsCssVariables function within the util.js which we recommend using,
   * as it handles this for you.
   * @returns {boolean}
   */
  browserSupportsCssVars() {
    debug(LOG,'browserSupportsCssVars',{supports: supportsCssVariables(window)})
    return window ? supportsCssVariables(window) : false;
  }

  /**
   * Whether or not the ripple should be considered unbounded.
   * @returns {boolean}
   */
  isUnbounded() {
    debug(LOG,'isUnbounded',{unbounded: this.element.props.unbounded});
    return this.element.props.unbounded || false;
  }

  /**
   * Whether or not the surface the ripple is acting upon is active. We use
   * this to detect whether or not a keyboard event has activated the surface
   * the ripple is on. This does not need to make use of :active (which is what
   * we do); feel free to supply your own heuristics for it.
   * @returns {boolean}
   */
  isSurfaceActive() {
    debug(LOG, 'isSurfaceActive',{active: this.element.getDOMNode() === document.activeElement});
    return this.element.getDOMNode() === document.activeElement
  }


  /**
   * Whether or not the ripple is attached to a disabled component. If true,
   * the ripple will not activate.
   * @returns {boolean}
   */
  isSurfaceDisabled() {
    debug(LOG, 'isSurfaceDisbaled', {disabled: this.element.props.disabled})
    return this.element.props.disabled
  }


  //addClass
  //removeClass

  /**
   * Whether or not the ripple surface contains the given event target
   * @param target
   */
  containsEventTarget(target) {
    debug(LOG,'containsEventTarget',  {target});

    return this.element.getDOMNode().contains(target)

  }


  //registerInteractionHandler
  //deregisterInteractionHandler


  registerDocumentInteractionHandler(evtType, handler) {
    debug(LOG,'registerDocumentInteractionHandler', {evtType, handler})
    document.documentElement.addEventListener(evtType, handler, applyPassive())
  }
  deregisterDocumentInteractionHandler(evtType, handler) {
    debug(LOG,'deregisterDocumentInteractionHandler', {evtType, handler})
    document.documentElement.removeEventListener(evtType, handler, applyPassive())
  }



  /**
   * Registers a handler to be called when the surface (or its viewport)
   * resizes. Our default implementation adds the handler as a listener to the
   * window’s `resize()` event
   * @param {Function} handler
   */
  registerResizeHandler(handler) {
    debug(LOG,'registerResizeHandler',{handler})
    window.addEventListener('resize', handler);
  }

  /**
   * Unregisters a handler to be called when the surface (or its viewport)
   * resizes. Our default implementation adds the handler as a listener to the
   * window’s `resize()` event
   * @param {Function} handler
   */
  deregisterResizeHandler(handler) {
    debug(LOG,'deregisterResizeHandler',{handler})
    window.removeEventListener('resize', handler);
  }

  /**
   * Returns the ClientRect for the surface.
   * @returns {ClientRect || null}
   */
  computeBoundingRect() {
    debug(LOG,'computeBoundingBox',{});
    if (!this.element.hasOwnProperty('_isMounted') || this.element._isMounted) {
      return this.element.getDOMNode().getBoundingClientRect();
    }
    return { height: 0, width: 0, top: 0, bottom: 0, left: 0, right: 0}
  }

  /**
   * Returns the page `{X,Y}Offset` values for the window object as `x` and `y`
   * properties of an object (respectively).
   * @returns {{x: number, y: number}}
   */
  getWindowPageOffset() {
    debug(LOG,'windowPageOffset',{})
    return { x: window.pageXOffset, y: window.pageYOffset }
  }

}
