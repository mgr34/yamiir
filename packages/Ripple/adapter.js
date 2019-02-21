/**
 * Created by matt on 6/12/17.
 */
import BaseAdapter from '../Base/BaseAdapter';
import {
  getMatchesProperty,
  supportsCssVariables,
} from './util';


import debug from '../debug';
const MATCHES = getMatchesProperty(HTMLElement.prototype);
const LOG = false;

export class RippleAdapterImpl extends BaseAdapter {

  /**
   * Whether or not the given browser supports CSS Variables. When implementing
   * this, please take the Safari considerations into account. We provide a
   * supportsCssVariables function within the util.js which we recommend using,
   * as it handles this for you.
   * @returns {boolean}
 */
  browserSupportsCssVars() {
    return supportsCssVariables(window);
  }

  /**
   * Whether or not the ripple should be considered unbounded.
   * @returns {boolean}
  */
  isUnbounded() {
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
    debug(LOG,'isSurfaceActive',{active: this.element.getDOMNode()[MATCHES](':active'),
    elem: this.element.getDOMNode(), active2: this.element.getDOMNode() === document.activeElement,
    activeQ: document.activeElement})
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
    debug(LOG,'computeBoundingRect',{rect: this.element.getDOMNode().getBoundingClientRect()})
    return this.element.getDOMNode().getBoundingClientRect();
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