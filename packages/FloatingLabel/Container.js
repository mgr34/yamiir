import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { LabelAdapter } from "./adapter";
import { MDCFloatingLabelFoundation } from '@material/floating-label/dist/mdc.floatingLabel.min';
import { Map as ImmutableMap, Set as ImmutableSet} from 'immutable'
import { BASE_CLASS } from "./constants";
import {makeActions} from "../util";

export default class Container extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
  };


  constructor(props) {
    super(props);
    this.state = {
      foundationClasses: props.className
        ? new ImmutableSet([BASE_CLASS,props.className])
        : new ImmutableSet([BASE_CLASS]),
      foundationEventListeners: new ImmutableMap()
    };

    this.adapter = new LabelAdapter(this);
    this.foundation = new MDCFloatingLabelFoundation(
      this.adapter.toObject(MDCFloatingLabelFoundation.defaultAdapter)
    );

  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentWillReceiveProps(np) {
    const {props,state} = this;
    if (props.className !== np.className) {
      this.setState({
        foundationClasses: np.className === undefined
          ? state.foundationClasses.remove(props.className)
          : state.foundationClasses.add(np.className)
      })
    }
  }

  render() {
    const {foundationClasses,foundationEventListeners} = this.state;
    return (
      <label
        ref={el => this.labelEl = el}
        htmlFor={this.props.id}
        className={foundationClasses.toJS().join(' ')}
        {...makeActions({},foundationEventListeners.toJS())(this.foundation)}
      >{this.props.children}</label>

    )
  }
}

