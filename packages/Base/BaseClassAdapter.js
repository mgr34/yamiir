import Adapter from './Adapter';
import debug from '../debug'

export default class BaseClassAdapter extends Adapter {


  /**
   * adds a class to the element
   * @param className
   */
  addClass(className) {
    this._updateClass(className, true)
  }

  removeClass(className) {
    this._updateClass(className, false)
  }

  hasClass(className,propName="foundationClasses") {
    debug(this.LOG,'hasClass',{className,propName});

    const target = this.element.state[propName];
    if (target) {
      return target.includes(className)
    }
    return false;
  }

  _updateClass(className, add = true, propName = 'foundationClasses') {
    debug(this.LOG,'_updateClass',{className,add,propName})
    if (!this.element.hasOwnProperty('_isMounted') || this.element._isMounted) {
      this.element.setState(state => add
        ? ({[propName]: state[propName].add(className)})
        : ({[propName]: state[propName].remove(className)})
      );
    }
  }

}
