import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Map as ImmutableMap, } from 'immutable'
import { MDCRadioFoundation } from '@material/radio';
import RadioAdapter, {RadioRippleAdapter} from './adapter';
import {
  BASE_CLASS,
  BACKGROUND_CLASS,
  NATIVE_CONTROL,
  OUTER_CLASS,
  INNER_CLASS,
  DISABLED_CLASS
} from './constants';

import classnames from "classnames";
import RippleWrapper from "../TextField/RippleWrapper";
import {makeActions, merge} from "../util";

export default class Container extends PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    checked: false,
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.adapter = new RadioAdapter(this);
    this.foundation = new MDCRadioFoundation(
      this.adapter.toObject(
        MDCRadioFoundation.defaultAdapter
      )
    );

    this.rippleAdapter = this.adapter.toObject(RadioRippleAdapter);
    this.state = {
      foundationEventListeners: new ImmutableMap(),
    };

  }

  componentDidMount() {
    this._isMounted = true;
    this.foundation.init();
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.foundation.destroy();
  }

  render() {
    const {props,state} = this;
    const {id,checked,disabled,actions,name}  = props;
    const nativeActions = merge(
      actions,
      makeActions({},state.foundationEventListeners.toJS())()
    );

    return (
      <RippleWrapper ref={el => this.rippleRef = el} rippleAdapter={this.rippleAdapter}>
        <div className={classnames(BASE_CLASS,{[DISABLED_CLASS]:disabled})}>
          <input
            className={NATIVE_CONTROL}
            type="radio"
            id={id}
            name={name}
            checked={checked}
            disabled={disabled}
            ref={el => this.inputEl = el}
            {...nativeActions}
          />
            <div className={BACKGROUND_CLASS}>
              <div className={OUTER_CLASS}/>
              <div className={INNER_CLASS}/>
            </div>
        </div>
      </RippleWrapper>
    )
  }

}
