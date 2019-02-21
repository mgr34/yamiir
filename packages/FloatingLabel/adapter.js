import BaseAdapter from '../Base/BaseAdapter';
import debug from '../debug';

const LOG = false;

export class LabelAdapter extends BaseAdapter {

  //addClass
  //removeClass
  //registerInteractionHandler
  //deregisterInteractionHandler

  /**
   * Returns the width of the label element.
   * @return {number}
   */
  getWidth() {
    debug(LOG,'getWidth',{width: this.element.labelEl.offsetWidth});

    return this.element.labelEl.offsetWidth
  }
}

