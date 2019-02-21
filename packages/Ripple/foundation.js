/**
 * Created by matt on 6/12/17.
 */

import {RippleAdapter} from './adapter';

export default class RippleFoundation {

  constructor() {
    this.rippleAdapter = new RippleAdapter();
  }

  setRippleAdapter(rippleAdapter) {
    this.rippleAdapter = rippleAdapter;
  }

  browserSupportsCssVars() {
    return this.rippleAdapter.browserSupportsCssVars();
  }

  isUnbounded() {
    return this.rippleAdapter.isUnbounded();
  }

  isSurfaceActive() {
    return this.rippleAdapter.isSurfaceActive()
  }


  addClass(className) {
    this.rippleAdapter.addClass(className);
  }

  removeClass(className) {
    this.rippleAdapter.removeClass(className);
  }

  registerInteractionHandler(evtType, handler) {
    this.rippleAdapter.registerInteractionHandler(evtType, handler)
  }

  deregisterInteractionHandler(evtType, handler) {
    this.rippleAdapter.deregisterInteractionHandler(evtType, handler)
  }

  registerResizeHandler(handler) {
    this.rippleAdapter.registerResizeHandler(handler)
  }

  deregisterResizeHandler(handler) {
    this.rippleAdapter.deregisterResizeHandler(handler);
  }

  updateCssVariable(varName, value) {
    this.rippleAdapter.updateCssVariable(varName, value)
  }

  computeBoundingRect() {
    return this.rippleAdapter.computeBoundingRect();
  }

  getWindowPageOffset() {
    return this.rippleAdapter.getWindowPageOffset();
  }

  toObject() {
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const object = {};

    keys.forEach((key) => {
      object[key] = (...args) => this[key](...args);
    });

    return object;
  }

}