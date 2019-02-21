import BaseEventAndClassAdapter from "../Base/BaseEventAndClassAdapter";
import debug from '../debug';

const LOG = false;

export default class FormFieldAdapter extends BaseEventAndClassAdapter {
  //registerInteractionHandler
  //deregisterInteractionhandler

  activateInputRipple() {
    debug(LOG,'activateInputRipple',{})
    if (!this.element.props.disabled) {
      this.element.component.rippleRef.ripple.foundation.activate()
    }
  }

  deactivateInputRipple() {
    debug(LOG,'deactivateInputRipple',{})
    if (!this.element.props.disabled) {
      this.element.component.rippleRef.ripple.foundation.deactivate()
    }

  }
}

