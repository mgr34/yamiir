import BaseAdapter from '../Base/BaseAdapter';
import debug from '../debug';

const LOG = false;

export class OutlineAdapter extends BaseAdapter {


  /**
   * Returns the width of the root element.
   * @return {number}
   */
  getWidth() {
    debug(LOG,'getWidth',{width: this.element.outlineEl.offsetWidth});

    return this.element.outlineEl.offsetWidth
  }

  /**
   * Returns the height of the root element.
   * @return {number}
   */
  getHeight() {
    debug(LOG,'getHeight',{height: this.element.outlineEl.offsetHeight});

    return this.element.outlineEl.offsetHeight;
  }

  /**
   * Sets the "d" attribute of the outline element's SVG path.
   * @param {string} value
   */
  setOutlinePathAttr(value) {
    debug(LOG,'setOutlinePathAttr',{value})

    //is svg
    this._updateAttr('d',value,'outlinePathAttrs')
  }

  /**
   * Returns the idle outline element's computed style value of the given css property `propertyName`.
   * We achieve this via `getComputedStyle(...).getPropertyValue(propertyName)`.
   * @param {string} propertyName
   * @return {string}
   */
  getIdleOutlineStyleValue(propertyName) {
    debug(LOG,'getIdleOutlineStyleValue',{propertyName});

    return window
      .getComputedStyle(this.element.idleOutlineEl)
      .getPropertyValue(propertyName)
  }
}
