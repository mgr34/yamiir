/**
 * Created by matt on 6/13/17.
 */

import BaseAdapter from '../Base/BaseAdapter';



export class DialogAdapterImpl extends BaseAdapter {

  trapFocusOnSurface() {
    this.element.state.focusTrap.activate()
  }

  untrapFocusOnSurface() {
    this.element.state.focusTrap.deactivate();
  }

  isDialog(el) {
    return el.classList.contains('mdc-dialog__surface')
  }

  addBodyClass(className) {
    document.body.classList.add(className)
  }

  removeBodyClass(className) {
    document.body.classList.remove(className)
  }

  registerDocumentKeydownHandler(handler) {
    document.addEventListener("keydown", handler);
  }

  deregisterDocumentKeydownHandler(handler) {
    document.removeEventListener("keydown", handler);
  }

  registerInteractionHandler(handler) {
    //do nothing
  }

  deregisterInteractionHandler(handler) {
    //do nothing
  }

  notifyAccept() {
    const { props } = this.element;
    if (props.hasOwnProperty('onAccept') &&
      typeof props.onAccept === 'function') {
      props.onAccept()
    }
  }

  notifyCancel() {
    const { props } = this.element;
    if (props.hasOwnProperty('onCancel')
      && typeof props.onCancel === 'function') {
      props.onCancel()
    }

  }

  registerTransitionEndHandler(handler) {
    const evtType = 'transitionend';
    const propName = 'surfaceEventListeners';
    this._updateEventListener(evtType, handler, true, propName)
  }

  deregisterTransitionEndHandler(handler) {
    const evtType = 'transitionend';
    const propName = 'surfaceEventListeners';
    this._updateEventListener(evtType, handler, false, propName)
  }

}
