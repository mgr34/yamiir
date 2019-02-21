import BaseAdapter from '../Base/BaseAdapter';
import debug from '../debug';

const LOG = false;

export class BottomSheetAdapter extends BaseAdapter {

  //addClass
  //removeClass

  focus() {
    this.element.foundationEl.current.focus();
  }

  addScrollLock() {
    if (document) {
      document.body.classList.add('mdc-bottom-sheet-scroll-lock');
    }
  }

  removeScrollLock() {
    if (document) {
      document.body.classList.remove('mdc-bottom-sheet-scroll-lock');
    }
  }

  storePosition() {
    debug(LOG,'storePosition',{position: window.pageYOffset})
    if (window) {
      this.element.setState({position: window.pageYOffset})
    }
  }

  restorePosition() {
    if (window) {
      this.setPosition(this.element.state.position)
      this.element.setState({position: 0});
    }
  }


  setPosition(position) {
    debug(LOG,'setPosition',{position})
    if (window) {
      window.scroll(0,position);
    }
  }

  setTranslateY(val) {
    debug(LOG,'setTranslateY',{val});
    if (val !== null) {
      this._updateCssVariable('transform', `translateY(${val}px)`, 'foundationStyles')
    } else {
      this._updateCssVariable('transform',null,'foundationStyles')
    }
  }

  getSheetHeight() {
    debug(LOG,'getSheetHeight',{height: this.element.foundationEl.offsetHeight})

    return this.element.foundationEl.offsetHeight;
  }


  notifyClose() {
    debug(LOG,'notifyClose',{})
    const isSideSheet = (window && window.innerWidth >= 960);
    this.element.setState({isOpen: false, isExpanded: isSideSheet,isSideSheet}, () => {
      const {props} = this.element
      if (props.hasOwnProperty('onClose') &&
        typeof props.onClose === 'function') {
        props.onClose()
      }
    });
  }

  notifyExpand() {
    debug(LOG,'notifyExpand',{});
    this.element.setState({isExpanded: true}, () => {

      const {props} = this.element;
      if (props.hasOwnProperty('onExpand') &&
        typeof props.onExpand === 'function') {
        props.onExpand()
      }
    });
  }

  isExpanded() {
    return this.element.state.isExpanded
  }

  isSideSheet() {
    return (window && window.innerWidth >= 960)
  }

}
