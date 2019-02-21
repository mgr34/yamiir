import BaseAdapter from '../../Base/BaseAdapter';
import debug from '../../debug';

const LOG = false;

export class HelpTextAdapter extends BaseAdapter {
  //addClass
  //removeClass
  //hasClass

  setAttr(attr,value) {
    debug(LOG,'setAttr',{attr,value});

    this._updateAttr(attr,value);
  }

  removeAttr(attr) {
    debug(LOG,'removeAttr',{attr});

    this._updateAttr(attr,null);
  }

  setContent(content) {
    debug(LOG,'setContent',{content});

    this.element.setState({content})
  }
}
