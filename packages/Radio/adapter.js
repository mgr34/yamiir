import debug from '../debug';
import BaseEventAndClassAdapter from "../Base/BaseEventAndClassAdapter";

const LOG = false;

export default class RadioAdapter extends BaseEventAndClassAdapter {
  //addClass
  //removeClass

  /** @return {!MDCSelectionControlState} */
  getNativeControl() {
    debug(LOG,'getNativeControl',{});

    return this.element.inputEl
  }

  //CUSTOM RIPPLE ADAPTER
  isUnbounded() {
    debug(LOG,'isUnbounded',{returns: true});
    return true
  }
  isSurfaceActive() {
    debug(LOG,'isSurfaceActive',{returns:false})
    return false
  }
}
/*******/
export const RadioRippleAdapter = {
  isUnbounded: () => {},
  isSurfaceActive: () => {},
  registerInteractionHandler: () => {},
  deregisterInteractionHandler: () => {},
};
