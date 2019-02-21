/**
 * Created by matt on 6/13/17.
 */


export default class DialogFoundation {
  constructor() {
    this.dialogAdapter = {}
    this.surfaceAdapter = {}
  }

  setDialogAdapter(dialogAdapter) {
    this.dialogAdapter = dialogAdapter;
  }

  setSurfaceAdapter(surfaceAdapter) {
    this.surfaceAdapter = surfaceAdapter;
  }

  isDialog(el) {
    return this.dialogAdapter.isDialog(el);
  }

  addClass(className) {
    this.dialogAdapter.addClass(className)
  }

  removeClass(className) {
    this.dialogAdapter.removeClass(className)
  }

  addBodyClass(className) {
    this.dialogAdapter.addBodyClass(className)
  }

  removeBodyClass(className) {
    this.dialogAdapter.removeBodyClass(className)
  }


  notifyAccept() {
    this.dialogAdapter.notifyAccept()
  }

  notifyCancel() {
    this.dialogAdapter.notifyCancel()
  }

  registerDocumentKeydownHandler(handler) {
    document.addEventListener("keydown", handler);
  }

  deregisterDocumentKeydownHandler(handler) {
    document.removeEventListener("keydown", handler);
  }

  trapFocusOnSurface() {
    this.dialogAdapter.trapFocusOnSurface();
  }

  unTrapFocusOnSurface() {
    this.dialogAdapter.untrapFocusOnSurface();
  }

  registerTransitionEndHandler(handler) {
    this.surfaceAdapter.registerTransitionEndHandler(handler)
  }

  deregisterTransitionEndHandler(handler) {
    this.surfaceAdapter.deregisterTransitionEndHandler(handler)
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

