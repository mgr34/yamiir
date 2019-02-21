import BaseAdapter from '../Base/BaseAdapter';
import debug from '../debug';

const LOG = false;

export class LineRippleAdapter extends BaseAdapter {

  //addClass
  //removeClass
  //hasClass

  /**
   * Registers an event listener on the line ripple element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  registerEventHandler(evtType, handler) {
    debug(LOG,'registerEventHandler',{evtType,handler});
    this.addEventListener(evtType,handler)
  }

  /**
   * Deregisters an event listener on the line ripple element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  deregisterEventHandler(evtType,handler) {
    debug(LOG,'deregisterEventHandler',{evtType,handler});
    this.removeEventListener(evtType,handler)
  }

  /**
   * Sets an attribute with a given value on the line ripple element.
   * @param {string} attr
   * @param {string} value
   */
  setStyle(attr,value) {
    debug(LOG,'setStyle',{attr,value})

    this._updateAttr(attr,value);
  }


}
