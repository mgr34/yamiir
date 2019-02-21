import BaseAdapter from '../../Base/BaseAdapter';
import debug from '../../debug';

const LOG = false;

export class IconAdapter extends BaseAdapter {

  //handled by BaseAdapter:
  //registerInteractionHandler
  //degreigsterInteractionHandler

  registerInteractionHandler(evtType,handler) {
    debug(LOG,'registerInteractionHandler',{evtType,handler})
    this._updateEventListener(evtType,handler)
  }

  /**
  * Sets the text content of the icon element.
  * @param {string} content
  */
  setContent(content) {
    debug(LOG,'setContent',{content});

    this.element.setState({content})
  }


  /**
   * Gets the value of an attribute on the icon element.
   * @param {string} attr
   * @return {string}
   */
  getAttr(attr) {
    const normalAttr = attr === 'tabindex' ? 'tabIndex' : attr
    debug(LOG,'getAttr',{attr,val:this.element.state.foundationAttrs.get(normalAttr)})

    return this.element.state.foundationAttrs.get(normalAttr)
  }

  /**
   * Sets an attribute on the icon element.
   * @param {string} attr
   * @param {string} value
   */
  setAttr(attr,value) {
    const normalAttr = attr === 'tabindex' ? 'tabIndex' : attr
    debug(LOG,'setAttr',{normalAttr,value})

    this._updateAttr(normalAttr,value);
  }


  /**
   * Removes an attribute from the icon element.
   * @param {string} attr
   */
  removeAttr(attr) {
    const normalAttr = attr === 'tabindex' ? 'tabIndex' : attr
    debug(LOG,'removeAttr',{normalAttr})

    this._updateAttr(normalAttr)
  }



  notifyIconAction() {
    debug(LOG,'notifyIconAction',{});
    const {props} = this.element;
    if (props.hasOwnProperty('onSelect') &&
      typeof props.onSelect === 'function') {
      props.onSelect();
    }
  }
}
