import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { SelectLabelAdapter } from "./adapter";
import MDCSelectLabelFoundation  from '@material/select/label/foundation';
import { Set as ImmutableSet} from 'immutable'
import {LABEL_CLASS,LABEL_FLOAT_CLASS} from '../constants';
import Select from "../index";

class Container extends PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    hasIndex: PropTypes.bool.isRequired
  };


  constructor(props) {
    super(props);
    this.state = {
      foundationClasses: props.hasIndex
        ? new ImmutableSet([LABEL_CLASS,LABEL_FLOAT_CLASS])
        : new ImmutableSet([LABEL_CLASS])
    };

    this.adapter = new SelectLabelAdapter(this);
    this.foundation = new MDCSelectLabelFoundation(
      this.adapter.toObject(MDCSelectLabelFoundation.defaultAdapter)
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
      <label
        htmlFor={this.props.id}
        className={this.state.foundationClasses.toJS().join(' ')}
      >{this.props.children}</label>
    );
  }
}

export default Container;
