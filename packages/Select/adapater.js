import BaseAdapter from '../Base/BaseAdapter';

import debug from '../debug'

const LOG = false;

export class SelectAdapter extends BaseAdapter {
  //addClass
  //removeClass
  //registerInteractionHandler
  //deregisterInteractionHandler


  floatLabel(value) {
    debug(LOG,'floatLabel',{value})

    if (this.element.labelEl) {
      this.element.labelEl.foundation.float(value)
    }
  }

  activateBottomLine() {
    debug(LOG,'activateBottomLine',{});

    if (this.element.bottomLineEl) {
      this.element.bottomLineEl.foundation.activate();
    }
  }

  deactivateBottomLine() {
    debug(LOG,'deactivateBottomLine',{});

    if (this.element.bottomLineEl) {
      this.element.bottomLineEl.foundation.deactivate();
    }
  }

  setDisabled({disabled}) {
    debug(LOG,'setDisabled',{disabled});

    this.element.setState({disabled})
  }

  getSelectedIndex() {
    debug(LOG,'getSelectedIndex',{index: this.element.state.selectedIndex});

    return this.element.state.selectedIndex
  }

  setSelectedIndex(index) {
    debug(LOG,'setSelectedIndex',{index});

    return this.element.setState({selectedIndex: index})
  }

  getValue() {
    const { options, selectedIndex } = this.element.props;
    debug(LOG,'getValue',{options,selectedIndex});

    return String(options[selectedIndex].value);
  }

  setValue(value) {
    const { options, selectedIndex } = this.element.props;
    debug(LOG,'setValue',{value});

    this.element.setState({options: options.reduce((a,b,i) => {
      return i === selectedIndex
          ? [...a,{...b,value}]
          : [...a,b]
      },[]
    )})
  }

  isRTL() {
    debug(LOG,'isRTL',{isRTL: this.element.props.isRtl})

    return this.element.props.isRtl || false
  }

}
