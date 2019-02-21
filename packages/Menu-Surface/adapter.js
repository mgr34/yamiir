import BaseAdapter from "../Base/BaseAdapter";
import debug from '../debug'


export default class MenuSurfaceAdapter extends BaseAdapter {
  /** @param {string} className */
  // addClass(className) {

  /** @param {string} className */
  // removeClass(className) {

  /**
   * @param {string} className
   * @return {boolean}
   */
  //hasClass(className) {


  /** @return {boolean} */
  hasAnchor() {
    debug(this.LOG,'hasAnchor',{});

    return this.element.props.anchor || false
  }G

  /** Emits an event when the menu surface is closed. */
  notifyClose() {
    debug(this.LOG,'notifyClose',{});

    if (this.element.props.hasOwnProperty('onClose')) {
      this.element.props.onClose()
    }
  }

  /** Emits an event when the menu surface is opened. */
  notifyOpen() {
    debug(this.LOG,'notifyOpen',{});

    if (this.element.props.hasOwnProperty('onOpen')) {
      this.element.props.onOpen()
    }
  }

  /**
   * @return {boolean}
   * @param {EventTarget} el
   */
  isElementInContainer(el) {
    debug(this.LOG,'isElementInContainer',{TODO: 'TODO', el});

    return el === this.element.rootEl || this.element.rootEl.contains(el)
  }

  /** @return {boolean} */
  isRtl() {
    debug(this.LOG,'isRtl',{});

    return this.element.props.isRTL || false;
  }

  /** @param {string} origin */
  setTransformOrigin(origin) {
    debug(this.LOG,'setTransformOrigin',{origin});

    const attr = getTransformPropertyName(window) + '-origin'

    this._updateAttr(attr,origin,'foundationStyles')

  }

  /** @return {boolean} */
  isFocused() {
    debug(this.LOG,'isFocused',{});
    return document.activeElement === this.element.rootEl;
  }

  /** Saves the element that was focused before the menu surface was opened. */
  saveFocus() {
    debug(this.LOG,'saveFocus',{});
    this.element.previousFocus = document.activeElement
  }

  /** Restores focus to the element that was focused before the menu surface was opened. */
  restoreFocus() {
    debug(this.LOG, 'restoreFocus', {});

    if (this.element.rootEl.current.contains(document.activeElement)) {
      if (this.element.previousFocus && this.element.previousFocus.focus)
        this.element.state.previousFocus.focus()
      }
    }
  }

  /** @return {boolean} */
  isFirstElementFocused() {
    debug(this.LOG,'isFirstElementFocused',{});

    return this.element.menuItems[0] === document.activeElement;
  }

  /** @return {boolean} */
  isLastElementFocused() {
    debug(this.LOG,'isLastElementFocused',{});

    return this.element.menuItems[this.element.menuItems.length-1] === document.activeElement;
  }

  /** Focuses the first focusable element in the menu-surface. */
  focusFirstElement() {
    debug(this.LOG,'focusFirstElement',{});

    this.element.menuItems[0].focus()
  }

  /** Focuses the first focusable element in the menu-surface. */
  focusLastElement() {
    debug(this.LOG,'focusLastElement',{});

    this.element.menuItems[this.element.menuItems.length-1].focus()
  }

  /** @return {!{width: number, height: number}} */
  getInnerDimensions() {
    debug(this.LOG,'getInnerDimensions',{});

    return {
      width: this.element.rootEl.offsetWidth,
      height: this.element.rootEl.offsetHeight,
    };

  }

  /** @return {!{width: number, height: number, top: number, right: number, bottom: number, left: number}} */
  getAnchorDimensions() {
    debug(this.LOG,'getAnchorDimensions',{});

    return this.element.anchorEl && this.element.anchorEl.getBoundingClientRect();
  }

  /** @return {!{ width: number, height: number }} */
  getWindowDimensions() {
    debug(this.LOG,'getWindowDimensions',{});

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  /** @return {!{ width: number, height: number }} */
  getBodyDimensions() {
    debug(this.LOG,'getBodyDimensions',{});

    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    }
  }

  /** @return {!{ width: number, height: number }} */
  getWindowScroll() {
    debug(this.LOG,'getWindowScroll',{});


    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    }
  }

  /** @param {!{
   *   top: (string|undefined),
   *   right: (string|undefined),
   *   bottom: (string|undefined),
   *   left: (string|undefined)
   * }} position */
  setPosition(position) {
    debug(this.LOG,'setPosition',{position});

    //this.element.rootEl.style.left = 'left' in position ? position.left : null;
    //this.element.rootEl.style.right = 'right' in position ? position.right : null;
    //this.element.rootEl.style.top = 'top' in position ? position.top : null;
    //this.element.rootEl.style.bottom = 'bottom' in position ? position.bottom : null;


    ['left','right','top','bottom'].map(k =>
      this._updateAttr(k, k in position ? k : null, 'foundationStyles')
    );
  }

  /** @param {string} height */
  setMaxHeight(height) {
    debug(this.LOG,'setMaxHeight',{height});

      //this.element.rootEl.style.maxHeight = height;
      this._updateAttr('maxHeight',height,'foundationStyles');

    }

  }

