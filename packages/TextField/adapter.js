import BaseAdapter from '../Base/BaseAdapter';
import debug from '../debug';

const LOG = false;

export class TextFieldAdapter extends BaseAdapter {
  //addClass
  //removeClass

  /**
   * Adds a class to the label element. We recommend you add a conditional
   * check here, and in `removeClassFromLabel` for whether or not the label
   * is present so that the JS component could be used with text fields that
   * don’t require a label, such as the full-width text field
   * @param className {string}
   */
  addClassToLabel(className) {
    debug(LOG,'addClassToLabel',{className})
    //label state is aria-label. otherwise <label> needs class
    if (!this.element.state.label) {
      this._updateClass(className, true, 'labelClasses')
    }
  }

  /**
   * Removes a class from the label element
   * @param className {string}
   */
  removeClassFromLabel(className) {
    debug(LOG,'removeClassToLabel',{className})
    //label state is aria-label. otherwise <label> needs class
    if (!this.element.state.label) {
      this._updateClass(className, false, 'labelClasses')
    }
  }

  /**
   * Adds a class to the help text element. Note that in our code we check
   * for whether or not we have a help text element and if we don’t, we simply
   * return.
   * @param className {string} -- className to add
   */
  addClassToHelptext(className) {
    debug(LOG,'addClassToHelpText',{className})
    if (this.element.state.help) {
      this._updateClass(className, true, 'helpClasses')
    }
  }

  /**
   * Removes a class from the help text element.
   * @param className {string} -- className to remove
   */
  removeClassToHelptext(className) {
    debug(LOG,'removeClassToHelpText',{className})
    if (this.element.state.help) {
      this._updateClass(className, false, 'helpClasses')
    }
  }

  /**
   * Returns whether or not the help text element contains the current class
    * @param className {string}
   * @return {*|boolean}
   */
  helptextHasClass(className) {
    debug(LOG,'helpTextHasClass',{className})
    if (this.element.state.help) {
      return this.element.state.helpClasses.includes(className)
    }
  }

  /**
   * Sets an attribute on the help text element
   * @param name
   * @param value
   */
  setHelptextAttr(name,value) {
    debug(LOG,'setHelptextAttr',{name,value:value})
    if (this.element.state.help) {
      console.log(this.element.state.helpTextAttributes.toJS())
      this._updateAttr(name,value,'helpTextAttributes')
    }
  }

  /**
   * Removes an attribute on the help text element
   * @param name
   * @param value
   */
  removeHelptextAttr(name) {
    debug(LOG,'removeHelptextAttr',{name})
    if (this.element.state.help) {
      console.log(this.element.state.helpTextAttributes.toJS())
      this._updateAttr(name,null,'helpTextAttributes')
    }
  }

  _updateAttr(name,value,propName) {
    //can reuse function for cssVars
    this._updateCssVariable(name,value,propName)
  }


  /**
   * Returns an object representing the native text input element, with a
   * similar API shape. The object returned should include the value, disabled
   * and badInput properties, as well as the `checkValidity()` function. We
   * never alter the value within our code, however we do update the disabled
   * property, so if you choose to duck-type the return value for this method
   * in your implementation it’s important to keep this in mind. Also note
   * that this method can return null, which the foundation will handle
   * gracefully.
   * @return {*|null}
   */
  getNativeInput() {
    debug(LOG,'getNativeInput', {native: this.element.inputEl})
    return this.element.inputEl || null
  }

  //handled with react events
  registerInputFocusHandler(handler) {}
  deregisterInputFocusHandler(handler)  {}
  registerInputBlurHandler(handler)  {}
  deregisterInputBlurHandler(handler)  {}
  registerInputInputHandler(handler) {}
  deregisterInputInputHandler(handler) {}
  registerInputKeydownHandler(handler) {}
  deregisterInputKeydownHandler(handler)  { }


  set disabled(disabled) {
    debug(LOG,'setDisabled',{disabled})
  }
}
