import BaseAdapter from '../Base/BaseAdapter';
import debug from '../debug';

const LOG = false;

export class TopAppBarAdapter extends BaseAdapter {
  /**
   * Adds a class to the root Element.
   * @param {string} className
  addClass(className) {}
   */

  /**
   * Removes a class from the root Element.
   * @param {string} className
  removeClass(className) {}
   */

  /**
   * Returns true if the root Element contains the given class.
   * @param {string} className
   * @return {boolean}
  hasClass(className) {}
   */

  /**
   * Sets the specified inline style property on the root Element to the given value.
   * @param {string} property
   * @param {string} value
   */
  setStyle(property, value) {
    debug(LOG,'setStyle',{property,value})
    this._updateAttr(property,value,'foundationStyles');
  }

  /**
   * Gets the height of the top app bar.
   * @return {number}
   */
  getTopAppBarHeight() {
    debug(LOG,'getTopAppBarHeight',{clientHeight: this.element.foundationEl.current})

    return this.element.foundationEl.current.clientHeight;
  }

  /**
   * Registers an event handler on the navigation icon element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */
  registerNavigationIconInteractionHandler(type, handler) {
    debug(LOG,'registerNavigationIconInteractionHandler',{type,handler});

    this._updateEventListener(type,handler,true,'navIconEventListeners')

  }

  /**
   * Deregisters an event handler on the navigation icon element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */
  deregisterNavigationIconInteractionHandler(type, handler) {
    debug(LOG,'deregisterNavigationIconInteractionHandler',{type,handler});

    this._updateEventListener(type,handler,false,'navIconEventListeners')
  }

  /**
   * Emits an event when the navigation icon is clicked.
   */
  notifyNavigationIconClicked() {
    debug(LOG,'notifyNavigationIconClick',{})


    if (this.element.props.hasOwnProperty('onNavIconClick')) {
      this.element.props.onNavIconClick()
    }
  }

  /** @param {function(!Event)} handler */
  registerScrollHandler(handler) {
    debug(LOG,'registerScrollHandler',{handler});

    if (this.element.props.scrollTarget === window) {
      window.addEventListener('scroll',handler)
    } else {
      this._updateEventListener('scroll', handler, true, 'scrollTargetEventListeners');
    }
  }

  /** @param {function(!Event)} handler */
  deregisterScrollHandler(handler) {
    debug(LOG,'deregisterScrollHandler',{handler});
    if (this.element.props.scrollTarget === window) {
      window.removeEventListener('scroll',handler)
    } else {
      this._updateEventListener('scroll', handler, false, 'scrollTargetEventListeners');
    }
  }

  /** @param {function(!Event)} handler */
  registerResizeHandler(handler) {
    debug(LOG,'registerResizeHandler',{handler});

    if (window) {
      window.addEventListener('resize', handler)
    }
  }

  /** @param {function(!Event)} handler */
  deregisterResizeHandler(handler) {
    debug(LOG,'deregisterResizeHandler',{handler});

    if (window) {
      window.removeEventListener('resize',handler)
    }
  }

  /** @return {number} */
  getViewportScrollY() {
    debug(LOG,'getViewportScrollY',{ });

    return this.element.props.scrollTarget === window
      ? this.element.props.scrollTarget.pageYOffset
      : this.element.props.scrollTarget.scrollTop

  }

  /** @return {number} */
  getTotalActionItems() {
    debug(LOG,'getTotalActionItems',{})

    return this.element.props.actionItems.length

  }
}
