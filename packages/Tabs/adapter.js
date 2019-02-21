import BaseAdapter from '../Base/BaseAdapter';

import debug from '../debug'

const LOG = false;

export default class TabBarAdapter extends BaseAdapter {

  //addClass
  //removeClass


  /**
   * Adds an event listener to the root element, for a resize event.
   * @param handler {function} - event handler to register with window
   */
  registerResizeHandler(handler) {
   debug(LOG, 'registerResizeHandler',{handler});

   window.addEventListener('resize',handler);
  }

  /**
   * Removes an event listener from the root element, for a resize event.
   * @param handler {function} - event handler to de-register from window
   */
  deregisterResizeHandler(handler) {
    debug(LOG, 'deregisterResizeHandler',{handler});

    window.removeEventListener('resize',handler);
  }

  /**
   * Returns width of root element.
   * @return {*|number}
   */
  getOffsetWidth() {
    debug(LOG,'getOffsetWidth', {
      offsetWidth: this.element.foundationEl.offsetWidth
    });

    return this.element.foundationEl.offsetWidth;
  }

  /**
   * Sets style property for indicator.
   * @param propertyName {string} -- css property name
   * @param value {string} -- css properties value
   */
  setStyleForIndicator(propertyName,value) {
    debug(LOG,'setStyleForIndicator',{propertyName,value});

    this._updateCssVariable(propertyName,value,'indicatorStyles')
  }

  /**
   * Returns width of indicator.
   * @return {*|number}
   */
  getOffsetWidthForIndicator() {
    debug(LOG,'getOffsetWidthForIndicator', {
      offsetWidth: this.element.indicatorEl.offsetWidth
    });

    return this.element.indicatorEl.offsetWidth || 0;
  }

  /**
   * Traditionally Emits MDCTabBar:change event, passes evtData.
   * In this implementation looks for an onChange property to pass eventData
   * @param evtData {object} - Tab Data
   */
  notifyChange(evtData) {
    debug(LOG,'notifyChange',{evtData});
    if (this.element.props.hasOwnProperty('onChange')) {
      this.element.props.onChange(evtData)
    }
  }

  /**
   * Returns number of tabs in MDC Tabs instance.
   * @return {number} - number of tabs
   */
  getNumberOfTabs() {
    debug(LOG,'getNumberOfTabs',{n: this.element.tabs.length});

    return this.element.tabs.length;
  }



  /**
   * Returns true if tab at index is active.
   * @param index {number} - index number of tab to check if active
   * @return {Boolean}
   */
  isTabActiveAtIndex(index) {
    debug(LOG, 'isTabActiveAtIndex', {
      index,
      active: this.element.tabs[index].foundation.isActive()
    });

    return this.element.tabs[index].foundation.isActive()
  }

  /**
   * Sets tab active at given index.
   * @param index {number} - index  number of tab to set isActive prop
   * @param isActive {boolean} - the value of active
   */
  setTabActiveAtIndex(index,isActive) {
    debug(LOG,'setTabActiveAtIndex',{index, isActive});

    this.element.tabs[index].foundation.setActive(isActive)
  }

  /**
   * Returns true if tab does not prevent default click action.
   * @param index {number} - index of tab to check if defaultIsPrevented
   * @return {boolean}
   */
  isDefaultPreventedOnClickForTabAtIndex(index) {
    debug(LOG,'isDefaultPreventedOnClickForTabAtIndex',{
      index,
      isDefaultPrevented: this.element.tabs[index].foundation.preventDefaultOnClick
    });

    return this.element.tabs[index].foundation.preventDefaultOnClick
  }

  /**
   * Sets preventDefaultOnClick for tab at given index
   * @param index {number} - index of tab to set preventDefault
   * @param preventDefaultOnClick {boolean} - is preventDefaultOnClick being
   * added or removed to tab at index
   */
  setPreventDefaultOnClickForTabAtIndex(index,preventDefaultOnClick) {
    debug(LOG,'setPreventDefaultOnClickForTabAtIndex',{
      index,
      preventDefaultOnClick
    });

    this.element.tabs[index].foundation.preventDefaultOnClick = preventDefaultOnClick;
  }

  /**
   * sets measurements (width, left offset) for tab at given index.
   * @param index {number} - the tab index to measure
   * @return {*}
   */
  measureTabAtIndex(index) {
    debug(LOG,'measureTabAtIndex',{
      index,
      measure: this.element.tabs[index].foundation.measureSelf()
    });

    return this.element.tabs[index].foundation.measureSelf()
  }

  /**
   * Returns width of tab at given index.
   * @param index {number} - tab to return width for
   * @return {*}
   */
  getComputedWidthForTabAtIndex(index) {
    debug(LOG,'getComputedWidthForTabAtIndex',{
      index,
      width: this.element.tabs[index].foundation.getComputedWidth()
    });
    return this.element.tabs[index].foundation.getComputedWidth()
  }

  /**
   * Returns left offset of tab at given index.
   * @param index {number} - tab to get left offset
   * @return {*}
   */
  getComputedLeftForTabAtIndex(index) {
    debug(LOG,'getComputedLeftForTabAtIndex',{
      index,
      left: this.element.tabs[index].foundation.getComputedLeft()
    });
    return this.element.tabs[index].foundation.getComputedLeft()
  }

}
