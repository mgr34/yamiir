import BaseAdapter from '../Base/BaseAdapter';
import debug from '../debug';
import {getMatchesProperty} from "../util";

const LOG = false;

export class TextFieldAdapter extends BaseAdapter {

  //addClass
  //removeClass
  //hasClass


  /**
   * Registers an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */
  registerTextFieldInteractionHandler(type, handler) {
    debug(LOG,'registerTextFieldInteractionHandler',{type,handler});

   this._updateEventListener(type,handler,true)
  }

  /**
   * Deregisters an event handler on the root element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */
  deregisterTextFieldInteractionHandler(type, handler) {
    debug(LOG, 'deregisterTextFieldInteractionHandler', {type, handler});

    this._updateEventListener(type,handler,false)

  }

  /**
   * Registers an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  registerInputInteractionHandler(evtType,handler) {
    debug(LOG,'registerInputInteractionHandler',{evtType,handler});

    this._updateEventListener(evtType,handler,true,'inputEventListeners');
  }

  /**
   * Deregisters an event listener on the native input element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  deregisterInputInteractionHandler(evtType,handler) {
    debug(LOG,'deregisterInputInteractionHandler',{evtType,handler});

    this._updateEventListener(evtType,handler,false,'inputEventListeners');
  }

  /**
   * Returns true if the textfield is focused.
   * We achieve this via `document.activeElement === this.root_`.
   * @return {boolean}
   */
  isFocused() {
    debug(LOG,'isFocused',{isFocused: document.activeElement === this.element.inputEl});

    return document.activeElement === this.element.inputEl;
  }


  /**
   * Returns true if the direction of the root element is set to RTL.
   * @return {boolean}
   */
  isRtl() {
    debug(LOG, 'isRtl',{rtl: this.element.props.rtl});

    return this.element.props.rtl;
  }


  hasOutline() {
    debug(LOG, 'hasOutline',{hasOutline: !!this.element.outlineEl});

    return !!this.element.outlineEl
  }

  notchOutline(labelWidth, isRtl) {
    debug(LOG, 'updateOutlinePath', {labelWidth, isRtl});

   this.element.outlineEl.foundation.notch(labelWidth,isRtl)

  }

  closeOutline() {
    debug(LOG,'closeOutline',{})

    this.element.outlineEl.foundation.closeNotch()
  }


  /**
   * Activates the line ripple.
   */
  activateLineRipple() {
    debug(LOG, 'activateLineRipple',{});

    if (this.element.lineRippleEl) {
      this.element.lineRippleEl.foundation.activate()
    }
  }

  /**
   * Deactivates the line ripple.
   */
  deactivateLineRipple() {
    debug(LOG, 'deactivateLineRipple',{});

    if (this.element.lineRippleEl) {
      this.element.lineRippleEl.foundation.deactivate()
    }
  }

  /**
   * Sets the transform origin of the line ripple.
   * @param {number} normalizedX
   */
  setLineRippleTransformOrigin(normalizedX)  {
    debug(LOG, 'setLineRippleTransformOrigin',{normalizedX});

    if (this.element.lineRippleEl) {
      this.element.lineRippleEl.foundation.setRippleCenter(normalizedX);
    }

  }


  /**
   * Only implement if label exists.
   * Shakes label if shouldShake is true.
   * @param {boolean} shouldShake
   */
  shakeLabel(shouldShake) {
    debug(LOG,'shakeLabel',{shouldShake})

    if (this.element.labelEl) {
      this.element.labelEl.foundation.shake(shouldShake)
    }
  }

  /**
   * Only implement if label exists.
   * Floats the label above the input element if shouldFloat is true.
   * @param {boolean} shouldFloat
   */
  floatLabel(shouldFloat) {
    debug(LOG,'floatLabel',{shouldFloat})

    if (this.element.labelEl) {
      this.element.labelEl.foundation.float(shouldFloat)
    }

  }

  /**
   * Returns true if label element exists, false if it doesn't.
   * @return {boolean}
   */
  hasLabel() {
    debug(LOG,'hasLabel',{hasLabel: !!this.element.labelEl})

    return !!this.element.labelEl

  }

  /**
   * Only implement if label exists.
   * Returns width of label in pixels.
   * @return {number}
   */
  getLabelWidth() {
    debug(LOG,'getLabelWidth',{});

    if (this.element.labelEl) {
      return this.element.labelEl.foundation.getWidth()
    }
  }


  /**
   * Registers a validation attribute change listener on the input element.
   * Handler accepts list of attribute names.
   * @param {function(!Array<String>): undefined} handler
   * @return {!MutationObserver}
   */
  registerValidationAttributeChangeHandler(handler) {
    //TODO: is this necessary?
    debug(LOG,'registerValidationAttributeChangeHandler',{handler});

    const getAttributesList = (mutationsList) =>
      mutationsList.map((mutation) => mutation.attributeName);
    const observer = new MutationObserver(
      (mutationsList) => handler(getAttributesList(mutationsList))
    );
    const targetNode = this.element.inputEl;
    const config = {attributes: true};
    observer.observe(targetNode, config);
    return observer;
  }

  /**
   * Disconnects a validation attribute observer on the input element.
   * @param {!MutationObserver} observer
   */
  deregisterValidationAttributeChangeHandler(observer) {
    debug(LOG,'deregisterValidationAttributeChangeHandler',{observer});

    observer.disconnect()
  }

  /**
   * Returns an object representing the native text input element, with a
   * similar API shape. The object returned should include the value, disabled
   * and badInput properties, as well as the checkValidity() function. We never
   * alter the value within our code, however we do update the disabled
   * property, so if you choose to duck-type the return value for this method
   * in your implementation it's important to keep this in mind. Also note that
   * this method can return null, which the foundation will handle gracefully.
   * @return {?Element|?NativeInputType}
   */
  getNativeInput() {
    debug(LOG,'getNativeInput',{input: this.element.inputEl});

    return this.element.inputEl;
  }


   //CUSTOM RIPPLE ADAPTER

  isSurfaceActive() {
    const MATCHES = getMatchesProperty(HTMLElement.prototype)
    debug(LOG,'isActive',{MATCHES})

    if (this.element.inputEl) {
      return this.element.inputEl[MATCHES](':active');
    }
  }

  registerInteractionHandler(evtType,handler) {
    debug(LOG, 'registerInteractionHandler',{evtType,handler})

   // reactjs doest not currently have a pointerdown synthetic event
    if (evtType !== 'pointerdown') {
      this.registerInputInteractionHandler(evtType, handler)
    }
  }
  deregisterInteractionHandler(evtType,handler)  {
    debug(LOG, 'reisterInteractionHandler', {evtType, handler})
    this.deregisterInputInteractionHandler(evtType, handler)
  }

}

/*******/
export const TextFieldRippleAdapter = {
  isSurfaceActive: () => {},
  registerInteractionHandler: () => {},
  deregisterInteractionHandler: () => {},
};

