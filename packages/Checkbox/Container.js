import React from 'react';
import { PropTypes } from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import { MDCCheckboxFoundation } from '@material/checkbox/dist/mdc.checkbox';
import CheckboxAdapter, {CheckBoxRippleAdapter} from './adapter';
import {
  BASE_CLASS,
  NATIVE_CONTROL,
  BACKGROUND_CLASS,
  CHECKMARK_CLASS,
  CHECKMARK_PATH,
  MIXED_MARK_CLASS
} from "./contstants";
import {makeActions, merge} from "../util";
import RippleWrapper from "../TextField/RippleWrapper";

export default class Container extends React.PureComponent {

  static propTypes = {
    id: PropTypes.string,
    labelId: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    actions: PropTypes.object,
    name: PropTypes.string
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    indeterminate: false,
    actions: {onChange: () => null},
  };

  constructor(props) {
    super(props);
    this.adapter = new CheckboxAdapter(this);
    this.foundation = new MDCCheckboxFoundation(
      this.adapter.toObject(
        MDCCheckboxFoundation.defaultAdapter
      )
    );

    if (props.indeterminate) {
      console.warn('%cINDETERMINATE STATE IS PRESENTLY BROKEN','font-weight:bold;color:red;')
    }

    this.rippleAdapter = this.adapter.toObject(CheckBoxRippleAdapter);
    this.state = {
      foundationClasses: new ImmutableSet([BASE_CLASS]),
      foundationEventListeners: new ImmutableMap(),
      nativeEventListeners: new ImmutableMap(),
      inputAttrs: new ImmutableMap(),
      checked: this.props.checked,
      disabled: this.props.disabled,
      indeterminate: this.props.indeterminate
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.indeterminate) {
      this.inputEl.indeterminate = this.props.indeterminate;
    }
    this.foundation.init();
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.foundation.destroy();
  }


  // Here we synchronize the internal state of the UI component based on what
  // the user has specified.
  componentWillReceiveProps(np) {
    if (np.checked !== this.props.checked) {
      this.setState({checked: np.checked, indeterminate: false});
    }
    if (np.indeterminate !== this.props.indeterminate) {
      this.setState({indeterminate: np.indeterminate});
    }
    if (np.disabled !== this.props.disabled) {
      this.setState({disabled: np.disabled});
    }
  }

  componentWillUpdate(np,ns) {
    if (np.indeterminate !== this.props.indeterminate) {
      this.inputEl.indeterminate = np.indeterminate
    }
  }



  render() {
    const {props,state} = this;
    const nativeActions = merge(props.actions,makeActions({},state.nativeEventListeners.toJS())())
    const foundationActions = makeActions({},state.foundationEventListeners.toJS())();
    return (
      <RippleWrapper ref={el => this.rippleRef = el} rippleAdapter={this.rippleAdapter}>
        <div
          ref={el => this.rootEl = el}
          className={state.foundationClasses.toJS().join(' ')}
          {...foundationActions}
        ><input
           ref={el => this.inputEl = el}
           id={props.id}
           name={props.name}
           type="checkbox"
           className={NATIVE_CONTROL}
           aria-labelledby={this.props.labelId}
           disabled={state.disabled}
           checked={state.checked}
           {...state.inputAttrs.toJS()}
           {...nativeActions}
          />
          <div className={BACKGROUND_CLASS}>
            <svg className={CHECKMARK_CLASS}
                 viewBox="0 0 24 24">
              <path className={CHECKMARK_PATH}
                    fill="none"
                    stroke="white"
                    d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
            </svg>
            <div className={MIXED_MARK_CLASS}></div>
          </div>
        </div>
      </RippleWrapper>
    )
  }

}
