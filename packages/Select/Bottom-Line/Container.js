import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import BottomLineAdapter from "./adapter";
import MDCSelectBottomLineFoundation  from '@material/select/bottom-line/foundation';
import { Set as ImmutableSet} from 'immutable'
import {BOTTOM_LINE_CLASS} from '../constants';
import Select from "../index";

class Container extends PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      foundationClasses: new ImmutableSet([BOTTOM_LINE_CLASS])
    };

    this.adapter = new BottomLineAdapter(this);
    this.foundation = new MDCSelectBottomLineFoundation(
      this.adapter.toObject(MDCSelectBottomLineFoundation.defaultAdapter)
    );
  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  render() {
    return (
      <div className={this.state.foundationClasses.toJS().join(' ')}/>
    );
  }
}

export default  Container;