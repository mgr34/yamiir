import BaseEventAndClassAdapter from '../../Base/BaseEventAndClassAdapter';

import debug from '../../debug'
import {getCorrectPropertyName} from "../../util";

const LOG = false;

export default class TabBarScrollerAdapter extends BaseEventAndClassAdapter {


  //addClass
  //removeClass

  eventTargetHasClass(target, className) {
    debug(LOG, 'eventTargetHasClass', {
      target,
      className,
      contains: target.classList.contains(className)
    });

   return target.classList.contains(className)

  }

  addClassToForwardIndicator(className) {
    debug(LOG, 'addClassToForwardIndicator', {className});

    this._updateClass(className, true, 'forwardIndicatorClasses')
  }

  removeClassFromForwardIndicator(className) {
    debug(LOG, 'removeClassFromForwardIndicator', {className});

    this._updateClass(className, false, 'forwardIndicatorClasses')
  }


  addClassToBackIndicator(className) {
    debug(LOG, 'addClassToBackIndicator', {className});

    this._updateClass(className, true, 'backIndicatorClasses')
  }

  removeClassFromBackIndicator(className) {

    debug(LOG, 'removeClassFromBackIndicator', {className});

    this._updateClass(className, false, 'backIndicatorClasses')
  }

  isRTL() {
    debug(LOG, 'isRTL', {isRTL: this.element.props.isRTL || false})

    return this.element.props.isRTL || false
  }

  registerBackIndicatorClickHandler(handler) {
    debug(LOG,'registerBackIndicatorClickHandler',{handler})

    this._updateEventListener('click',handler,true,'backIndicatorEventListeners')
  }
  deregisterBackIndicatorClickHandler(handler) {
    debug(LOG,'deregisterBackIndicatorClickHandler',{handler})

    this._updateEventListener('click',handler,false,'backIndicatorEventListeners')
  }

  registerForwardIndicatorClickHandler(handler) {
    debug(LOG,'registerForwardIndicatorClickHandler',{handler});

    this._updateEventListener('click',handler,true,'forwardIndicatorEventListeners')
  }
  deregisterForwardIndicatorClickHandler(handler) {
    debug(LOG,'deregisterForwardIndicatorClickHandler',{handler});

    this._updateEventListener('click',handler,false,'forwardIndicatorEventListeners')
  }

  registerCapturedInteractionHandler(evt, handler) {
    debug(LOG,'registerCapturedInteractionHandler',{evt, handler});

    this.addEventListener(evt,handler)
  }
  deregisterCapturedInteractionHandler(evt, handler){
    debug(LOG,'deregisterCapturedInteractionHandler',{evt, handler});

    this.removeEventListener(evt,handler)
  }

  registerWindowResizeHandler(handler) {
    debug(LOG,'registerWindowResizeHandler', {handler});

    window.addEventListener('resize', handler);
  }
  deregisterWindowResizeHandler(handler) {
    debug(LOG,'registerWindowResizeHandler', {handler});

    window.removeEventListener('resize', handler);
  }

  getNumberOfTabs() {
    debug(LOG, 'getNumberOfTabs', {n: this.element.props.tabs.length})

    return this.element.props.tabs.length
  }

  getComputedWidthForTabAtIndex(index) {
    debug(LOG,'getComputedWidthForTabAtIndex', {index})

    return this.element.tabBar.foundation.adapter_.getComputedWidthForTabAtIndex(index)
  }

  getComputedLeftForTabAtIndex(index) {
    debug(LOG,'getComputedLeftForTabAtIndex',{
      index,
      left: this.element.tabBar.foundation.adapter_.getComputedLeftForTabAtIndex(index)
    })

    return this.element.tabBar.foundation.adapter_.getComputedLeftForTabAtIndex(index)
  }

  getOffsetWidthForScrollFrame() {
    debug(LOG,'getOffsetWidthForScroolFrame',{
      offsetWidth: this.element.scrollFrameEl.offsetWidth,
    });

    return this.element.scrollFrameEl.offsetWidth
  }

  getScrollLeftForScrollFrame() {
    debug(LOG,'getScrollLeftForScrollFrame',
      {scrollLeft: this.element.scrollFrameEl.scrollLeft});

    return this.element.scrollFrameEl.scrollLeft;
  }

  setScrollLeftForScrollFrame(scrollLeftAmount) {
    debug(LOG,'setScrollLeftForScrollFrame',{scrollLeftAmount})

    this.element.scrollFrameEl.scrollLeft = scrollLeftAmount;
  }

  getOffsetWidthForTabBar() {
    debug(LOG,'getOffsetWidthForTabBar', {
      offsetWidth: this.element.tabBar.foundation.adapter_.getOffsetWidth()
    });

    return this.element.tabBar.foundation.adapter_.getOffsetWidth();
  }

  setTransformStyleForTabBar(value) {
    debug(LOG,'setTransformStyleForTabBar',{value});
    this.element.tabBar.foundation.adapter_._updateCssVariable(
      getCorrectPropertyName(window,'transform'),
      value,
      'foundationStyles'
    )
  }


  getOffsetLeftForEventTarget(target) {
    debug(LOG, 'getOffsetLeftForEventTarget',
      {target, offsetLeft: target.offsetLeft}
    );

   return target.offsetLeft
  }
  getOffsetWidthForEventTarget(target) {
    debug(LOG, 'getOffsetWidthForEventTarget',
      {target,offsetWidth: target.offsetWidth}
    );

    return target.offsetWidth
  }

}

