/**
 * Created by matt on 6/29/17.
 */
import BaseAdapter from '../Base/BaseAdapter';
import debug from '../debug';


function getTransformPropertyName(globalObj, forceRefresh = false) {

    const el = globalObj.document.createElement('div');
    return  ('transform' in el.style ? 'transform' : 'webkitTransform');

}


/**
 * Returns the name of the correct transform property to use on the current
 * browser. Ignores ms,o,and moz prefixes. Older browsers (5+ years)
 * probably wouldn't benefit from the animation.
 *
 * Additionally, this is necessary as react uses WebkitTransform and not
 * webkitTransform. notice the 'W'.
 * @param globalObj {window}
 * @return {string}
 const transformPropertyName = (globalObj) => {
  const el = globalObj.document.createElement('div');
  return ('transform' in el.style)
    ? 'transform'
    : 'WebkitTransform'
};

 */


const LOG = false;



export class MenuAdapter extends BaseAdapter {

  //addClass
  //removeClass
  //hasClass


  /**
   * Returns boolean indicating whether the necessary DOM is present
   * (namely, `the mdc-simple-menu__items container`).
   * @return {boolean}
   */
  hasNecessaryDom() {
    return Boolean(this.element.surfaceEl)
  }


  getAttributeForEventTarget(target,attribName) {
    debug(LOG,'getAttributeForEventTarget',{attribName: target.getAttribute(attribName) })
    return target.getAttribute(attribName);
  }

  /**
   * Returns an object with the items container width and height
   * @return {{width: number, height: number}}
   */
  getInnerDimensions() {
    const surfaceEl = this.element.surfaceEl

    return {
      width: surfaceEl.offsetWidth,
      height: surfaceEl.offsetHeight
    }

  }

  /**
   * Returns whether the menu has an anchor for positioning.
   * @return {*|boolean}
   */
  hasAnchor() {
    debug(LOG,'hasAnchor',{anchor: this.element.props.anchor})
    return this.element.props.anchor || false
  }

  /**
   * Returns an object with the dimensions and position of the anchor (same
   * semantics as DOMRect).
   * @return {ClientRect}
   */
  getAnchorDimensions() {
    debug(LOG,'getAnchorDimensions',{clientRect: this.element.foundationEl.parentElement.getBoundingClientRect()})
    return this.element.foundationEl.parentElement.getBoundingClientRect()
  }

  /**
   * Returns an object with width and height of the page, in pixels.
   * @return {{width: Number, height: Number}}
   */
  getWindowDimensions() {
    debug(LOG,'getWindowDiemensions',{width: window.innerWidth, height: window.innerHeight});
    return {width: window.innerWidth, height: window.innerHeight}
  }

  getNumberOfItems() {
    debug(LOG, 'getNumberOfItems',{n: this.items.length});

    return this.items.length
  }

  //registerInteractionHandler(type, handler) {

  //deregisterInteractionHandler(type, handler) {

  registerBodyClickHandler(handler) {
    debug(LOG,'registerBodyClickHandler',{handler})
    document.body.addEventListener('click',handler)
  }

  deregisterBodyClickHandler(handler) {
    debug(LOG,'deregisterBodyClickHandler',{handler})
    document.body.removeEventListener('click',handler)
  }



  hasClass(className) {
    debug(LOG, 'hasClass', {[className]:
        this.element.state.foundationClasses.has(className)
    })
    this.element.state.foundationClasses.has(className)
    return true
  }


  getIndexForEventTarget(target) {
    debug(LOG,'getIndexForEventTarget',{'todo': '!!', target, at: this.items.indexOf(target)})
    //hack, but allows menu to be used as autoComplete menu.
    //set the anchor to the input element. This will be called on body.onClick
    // and not trigger a close event
    if (target === this.element.props.autocompleteAnchor) {
      return -2
    }

    if (target.tagName === 'SPAN') { //otherwise event is not propagated
      return this.items.indexOf(target.parentNode)
    }
    return this.items.indexOf(target)
  }

  //TODO
  notifySelected(evtData) {
    debug(LOG, 'notifySelected', {'TODO': '!', evtData})
    const {actions} = this.element.props;

    this.element.setState({selectedIndex: evtData.index});

    if (actions.hasOwnProperty('onSelect') &&
      typeof actions.onSelect === 'function') {

      this.element.props.actions.onSelect({
        detail: {
          index: evtData.index,
          item: this.items[evtData.index]
        }
      })
    }
  }

  notifyCancel() {
    const {props} = this.element
    debug(LOG, 'notifyCancel', {props})
    if (props.actions.hasOwnProperty('onCancel') &&
      typeof props.actions.onCancel === 'function') {
      props.actions.onCancel()
    }
  }


  //TODO
  saveFocus() {
    debug(LOG,'saveFocus',{})
    //not reacteey
    this.element.setState({previousFocus: document.activeElement})
  }

  //TODO
  restoreFocus() {
    debug(LOG,'restoreFocus',{'TODO':'!', anchor: this.element.state.previousFocus})
    //not reacteey
    if (this.element.state.previousFocus
      && typeof this.element.props.focused !== 'number') {
      this.element.state.previousFocus.focus()
    }
  }

  //TODO
  isFocused() {
    debug(LOG,'isFocused',{});
    return document.activeElement === this.element
  }

  //TODO
  focus() {
    debug(LOG,'focus',{})
    this.focusItemAtIndex(0);
  }

  //TODO
  getFocusedItemIndex() {
    debug(LOG,'getFocusedItemIndex',{n: this.items.indexOf(document.activeElement)})
    return this.items.indexOf(document.activeElement) || 0
  }

  //TODO
  focusItemAtIndex(index) {
    debug(LOG,'focusItemAtIndex',{props: this.element.props, index})
    const { focused, actions } = this.element.props;
    if (focused) {
      if (focused !== -1) {
        this.element.setState({previousFocus: this.element.items[focused]});
        this.element.items[focused].focus()
      }
    } else {
      this.element.setState({previousFocus: this.element.items[index]});
      this.element.items[index].focus()
    }

    if (actions.hasOwnProperty('onFocus') && actions.onFocus === 'function') {
      actions.onFocus();
    }

  }


  /**
   * Returns boolean indicating whether the current environment is RTL.
   * @return {*|boolean}
   */
  isRtl() {
    return this.element.props.rtl || false
  }

  setTransformOrigin(value) {
    debug(LOG,'setTransformOrigin', {value})
    this.updateCssVariable(`${getTransformPropertyName(window)}-origin`,value)
  }

  setPosition({left,right,top,bottom}) {
    debug(LOG,'setPosition',{left,right,top,bottom})
    this.updateCssVariable('left',left || null);
    this.updateCssVariable('right',right || null );
    this.updateCssVariable('top', top || null );
    this.updateCssVariable('bottom', bottom|| null);
  }

  setMaxHeight(value) {
    debug(LOG,'setMaxHeight',{value})
    this.updateCssVariable('maxHeight', value)
  }

  //TODO
  addClassForOptionAtIndex(index,className) {
    debug(true,'addClassForOptionsAtIndex',{index,className})
  }

  get items() {
    // debug(LOG,'get items',{items:
    // [].slice.call(this.element.surfaceEl.querySelectorAll('.mdc-list-item[role]')) })
    return [].slice.call(
      this.element.surfaceEl
        ? this.element.surfaceEl.querySelectorAll('.mdc-list-item[role]')
        : []
    );
  }

}
