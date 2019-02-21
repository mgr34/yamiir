import BaseAdapter from '../../Base/BaseAdapter';
import debug from '../../debug';

const LOG = false;

export class TabAdapter extends BaseAdapter {
  //addClass
  //removeClass
  //registerInteractionHandler
  //deregisterInteractionHandler

  /**
   *  Return the width of the tab
   * @return {*|number}
   */
  getOffsetWidth() {
    debug(LOG,'getOffsetWidth',{offsetWidth: this.element.tabEl.offsetWidth})

    return this.element.tabEl.offsetWidth;
  }

  /**
   * Return distance between left edge of tab and left edge of its parent
   * element
   * @return {*|number}
   */
  getOffsetLeft() {
    debug(LOG, 'getOffsetLeft', {offsetLeft: this.element.tabEl.offsetLeft})

    return this.element.tabEl.offsetLeft
  }

  /**
   * Broadcasts an event denoting that the user has actioned on the tab
   * In this implementation it looks for an onSelect prop. If so the selected
   * Tab is passed to the function
   */
  notifySelected() {
    debug(LOG, 'notifySelected',{tab: this});
    //foundation sets selectedIndex
    if (this.element.props.hasOwnProperty('onSelect')) {
      this.element.props.onSelect({tab: this})
    }
  }
}
