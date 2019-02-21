import BaseAdapter from '../../Base/BaseAdapter';

import debug from '../../debug'

const LOG = false;

export class ChipAdapter extends BaseAdapter {
  //addClass
  //removeClass
  //hasClass

  /**
   * Adds a class to the leading icon element.
   * @param {string} className
   */
  addClassToLeadingIcon(className) {
    debug(LOG,'addClassToLeadingIcon',{className})

    this._updateClass(className,true,'iconClasses')
  }

  /**
   * Removes a class from the leading icon element.
   * @param {string} className
   */
  removeClassFromLeadingIcon(className) {
    debug(LOG,'removeClassToLeadingIcon',{className})

    this._updateClass(className,false,'iconClasses')
  }

  /**
   * Returns true if target has className, false otherwise.
   * @param {!EventTarget} target
   * @param {string} className
   * @return {boolean}
   */
  eventTargetHasClass(target, className) {
    debug(LOG,'eventTargetHasClasses',{
      target,
      className,
      r: target.classList.contains(className)
    });

    return target.classList.contains(className);
  }


  /**
   * Registers an event listener on the root element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  registerEventHandler(evtType,handler) {
   debug(LOG,'registerEventHandler',{evtType,handler});

   this._updateEventListener(evtType,handler,true)
  }

  /**
   * Deregisters an event listener on the root element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  deregisterEventHandler(evtType,handler) {
    debug(LOG,'deregisterEventHandler',{evtType,handler});

    this._updateEventListener(evtType,handler,false)

  }

  /**
   * Registers an event listener on the trailing icon element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  registerTrailingIconInteractionHandler(evtType, handler) {
    debug(LOG,'registerTrailingIconInteractionhandler',{evtType,handler});

    if (this.element.props.trailingIcon && evtType !== 'pointerdown') {
     this._updateEventListener(evtType,handler,true,'iconEventListeners')
    }
  }

  /**
   * Deregisters an event listener on the trailing icon element for a given event.
   * @param {string} evtType
   * @param {function(!Event): undefined} handler
   */
  deregisterTrailingIconInteractionHandler(evtType, handler) {
    debug(LOG, 'deregisterTrailingIconInteractionhandler', {evtType, handler});

    if (this.element.props.trailingIcon && evtType !== 'pointerdown') {
      this._updateEventListener(evtType, handler, false, 'iconEventListeners')
    }
  }

  /**
   * Traditionally Emits a custom "MDCChip:interaction" event denoting the
   * chip has been interacted with (typically on click or keydown).
   * In this implementation we refer to this as onSelect
   */
  notifyInteraction() {
    debug(LOG,'notifyInteraction',{detail: {chip: this},props:this.element.props});

    if (this.element.props.hasOwnProperty('onChipSelect')) {
      this.element.props.onChipSelect({detail: {chip: this.element}});
    }
  }

  /**
   * Tradditionally Emits a custom "MDCChip:trailingIconInteraction" event
   * denoting the trailing icon has been interacted with
   * (typically on click or keydown).
   * In this implementation we refer to this as onIconSelect
   */
  notifyTrailingIconInteraction() {
    debug(LOG,'notifyIconInteraction',{chip: this});

    if (this.element.props.hasOwnProperty('onIconSelect')) {
      this.element.props.onIconSelect({detail: {chip: this.element}});
    }
  }

  /**
   * Emits a custom event "MDCChip:removal" denoting the chip will be removed.
   */
  notifyRemoval() {
    debug(LOG,'notifyRemoval',{chip: this});

    if (this.element.props.hasOwnProperty('onChipRemoval')) {
      //TODO: add reference to root el (ChipSet?)
      this.element.props.onChipRemoval({detail: {chip: this.element}});
    }
  }


  /**
   * Returns the computed property value of the given style property on the root element.
   * @param {string} propertyName
   * @return {string}
   */
  getComputedStyleValue(propertyName) {
   debug(LOG,'getComputedStyleValue',{propertyName})

   return window
     .getComputedStyle(this.element.chipEl)
     .getPropertyValue(propertyName);

  }

  /**
   * Sets the property value of the given style property on the root element.
   * @param {string} propertyName
   * @param {string} value
   */
  setStyleProperty(propertyName, value) {
    debug(LOG,'setStyleProperty',{propertyName,value})

    this._updateCssVariable(propertyName,value,'foundationStyles')
  }


}

