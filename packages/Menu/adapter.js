/**
 * Created by matt on 6/29/17.
 */
import BaseAdapter from '../Base/BaseAdapter';
import {
  getTransformPropertyName
} from '@material/menu/util';


/**
 * Returns the name of the correct transform property to use on the current
 * browser. Ignores ms,o,and moz prefixes. Older browsers (5+ years)
 * probably wouldn't benefit from the animation.
 *
 * Additionally, this is necessary as react uses WebkitTransform and not
 * webkitTransform. notice the 'W'.
 * @param globalObj {window}
 * @return {string}
 */
const transformPropertyName = (globalObj) => {
  const el = globalObj.document.createElement('div');
  return ('transform' in el.style)
    ? 'transform'
    : 'WebkitTransform'
};



const LOG = false

const debug = (log=false, groupName, stuff={}) => {
  if (log) {
    console.group(groupName)
    Object.keys(stuff).map(key=> {
      console.log("%c"+key + ':  ','font-weight: bold',stuff[key])
    })
    console.groupEnd()
  }
  return;
}



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

  setScale(x,y) {
    const varName = transformPropertyName(window)
    this._updateCssVariable(varName,`scale(${x},${y})`)
  }

  setInnerScale(x,y) {
    const varName = transformPropertyName(window)
    this._updateCssVariable(varName,`scale(${x},${y}))`,'surfaceCssVars')
  }

  getNumberOfItems() {
    debug(LOG, 'getNumberOfItems',{n: this.items.length});

    return this.items.length
  }

  registerInteractionHandler(type, handler) {
    debug(LOG,'registerInteractionHandler',{type,handler})
  }

  deregisterInteractionHandler(type, handler) {
    debug(LOG,'deregisterInteractionHandler',{type,handler})
  }

  registerBodyClickHandler(handler) {
    debug(LOG,'registerBodyClickHandler',{handler})
  }

  deregisterBodyClickHandler(handler) {
    debug(LOG,'deregisterBodyClickHandler',{handler})
  }

  getYParamsForItemAtIndex(index) {
    const item = this.items[index];
    return {top: item.offsetTop, height: item.offsetHeight}
  }

  //TODO
  setTransitionDelayForItemAtIndex(index, value) {
    debug(LOG,'setTransitionDelay',{index,value})
    this.items[index].style.setProperty('transition-delay',value)
  }


  hasClass(className) {
    debug(LOG, 'hasClass', {[className]:
      this.element.state.foundationClasses.has(className)
    })
    this.element.state.foundationClasses.has(className)
    return true
  }


  //TODO
  getIndexForEventTarget(target) {
    debug(LOG,'getIndexForEventTarget',{'todo': '!!', target, at: this.items.indexOf(target)})
    return this.items.indexOf(target)
  }

  //TODO
  notifySelected(evtData) {
    debug(LOG, 'notiAfySelectedj', {'TODO': '!', evtData})
    this.element.props.onCancel()
  }

  notifyCancel() {
    const {props} = this.element
    debug(LOG, 'notifyCancel', {props})
    this.element.setState({ isOpen: false})
      if (props.hasOwnProperty('onCancel') &&
        typeof props.onCancel === 'function') {
        props.onCancel()
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
    if (this.element.state.previousFocus) {
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
      debug(LOG,'focusItemAtIndex',{index})
      this.element.items[index].focus()
  }


  /**
   * Returns boolean indicating whether the current environment is RTL.
   * @return {*|boolean}
   */
  isRtl() {
    return this.element.props.rtl || false
  }

  setPosition({left,right,top,bottom}) {
    debug(LOG,'setPosition',{left,right,top,bottom})
    this.updateCssVariable('left',left || null);
    this.updateCssVariable('right',right || null );
    this.updateCssVariable('top', top || null );
    this.updateCssVariable('bottom', bottom|| null);
  }

  getAccurateTime() {
    return window.performance.now();
  }

  get items() {
    return [].slice.call(
      this.element.surfaceEl.querySelectorAll('.mdc-list-item[role]')
    );
  }

}
