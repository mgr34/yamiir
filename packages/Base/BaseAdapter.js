/**
 * Created by matt on 6/16/17.
 */
import BaseEventAndClassAdapter from "./BaseEventAndClassAdapter";

export default class BaseAdapter extends BaseEventAndClassAdapter {

  /**
   * Programmatically sets the css variable `varName` on the surface to the
   * value specified.
   * @param {string} varName
   * @param {string || null} value
   */
  updateCssVariable(varName,value) {
    this._updateCssVariable(varName,value)
  }

  _updateCssVariable(varName,value,propName='foundationCssVars') {
    if (!this.element.hasOwnProperty('_isMounted') || this.element._isMounted) {
      this.element.setState(state => value !== null
        ? ({[propName]: state[propName].set(varName, value)})
        : ({[propName]: state[propName].delete(varName)})
      );
    }
  }

  _updateAttr(attr,value,propName='foundationAttrs') {
    //mask of updateCssVariable. Ultimately updating identical data structure
    this._updateCssVariable(attr,value,propName)
  }

}