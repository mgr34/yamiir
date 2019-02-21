/**
 * Created by matt on 6/26/17.
 */

import debug from '../debug'
import BaseClassAdapter from '../Base/BaseClassAdapter';
import {MDCListFoundation} from '@material/list';

const {cssClasses: listCssClasses} = MDCListFoundation;

export class DrawerAdapter extends BaseClassAdapter {

  //addClass
  //removeClass
  //hasClass


  /**
   * Returns true if target has className, false otherwise.
   * @param element
   * @param className
   * @return {boolean}
   */
  elementHasClass(element, className) {
    debug(this.LOG,'elementHasClass',{element,className})
    return element.classList.contains(className)
  }

  saveFocus() {
    debug(this.LOG,'saveFocus',{focus: document.activeElement})
    this.element.prevFocus = document.activeElement
  }

  restoreFocus() {
    debug(this.LOG,'restoreFOcus',{prevFocus: this.element.prevFocus})
    if (this.element.prevFocus) {
      this.element.prevFocus.focus();
    }
  }

  focusActiveNavigationItem() {
    debug(this.LOG,'focusActiveNavigationItem',{})
    const drawerEl = this.element.drawerElement && this.element.drawerElement.current;
    if (!drawerEl)  { return; }
    const activeNavItem = drawerEl.querySelector(`.${listCssClasses.LIST_ITEM_ACTIVATED_CLASS}`);
    if (activeNavItem) {
      activeNavItem.focus();
    }
  }

  notifyOpen() {
    debug(this.LOG,'notifyOpen',{})
    const { props } = this.element;
    if (props.hasOwnProperty('onOpen') &&
      typeof props.onOpen === 'function') {
      props.onOpen()
    }
  }

  notifyClose() {
    debug(this.LOG,'notifyClose',{})
    const { props, state} = this.element;

    if (props.hasOwnProperty('onClose') &&
      typeof props.onClose === 'function') {
      props.onClose(false)
    }
  }

  trapFocus() {
    debug(this.LOG,'trapFocus',{})
    this.element.focusTrap.activate()

  }

  releaseFocus() {
    debug(this.LOG,'releaseFocus',{})
    this.element.focusTrap.deactivate()

  }

}
