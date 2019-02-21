import React,{PureComponent} from 'react';
import { PropTypes } from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import NativeDOM from '../Base/NativeDOM';
import { MDCCheckboxFoundation } from '@material/checkbox/dist/mdc.checkbox';
import CheckboxAdapter from './adapter';
import classnames from 'classnames';
import {MDCRipple, MDCRippleFoundation} from '@material/ripple/dist/mdc.ripple';


export default class Container extends PureComponent {

  static propTypes = {
    id: PropTypes.string,
    labelId: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    checked: false,
    disabled: false,
    indeterminate: false
  }

  constructor(props) {
    super(props);
    this.adapter = new CheckboxAdapter(this);
    this.foundation = new MDCCheckboxFoundation(
      this.adapter.toObject(
        MDCCheckboxFoundation.defaultAdapter
      )
    );

    this.state = {
      foundationClasses: new ImmutableSet(),
      foundationEventListeners: new ImmutableMap(),
      rippleCss: new ImmutableMap(),
      checked: this.props.checked,
      disabled: this.props.disabled,
      indeterminate: this.props.indeterminate
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.foundation.init();
    this.rippleFoundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
    this.rippleFoundation.destroy();
  }

  onChange(e) {
    const { onChange } = this.props;
    if (onChange && onChange instanceof Function) {
      this.props.onChange(e)
    }
    this.foundation.transitionCheckState_();

  }

  // Here we synchronize the internal state of the UI component based on what the user has specified.
  componentWillReceiveProps(props) {
    if (props.checked !== this.props.checked) {
      console.log('Setting?')
      this.setState({checked: props.checked, indeterminate: false});
    }
    if (props.indeterminate !== this.props.indeterminate) {
      this.setState({indeterminate: props.indeterminate});
    }
    if (props.disabled !== this.props.disabled) {
      this.setState({disabled: props.disabled});
    }
  }


  componentDidUpdate() {
    // To make the ripple animation work we update the css properties after React finished building the DOM.
    if (this.rootEl) {
      this.state.rippleCss.forEach((v, k) => {
        this.rootEl.style.setProperty(k, v);
      });
    }
  }


  //TODO: Factor this out. Use other ripple component?
  // For browser compatibility we extend the default adapter which checks for css variable support.
  rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
    isUnbounded: () => true,
    isSurfaceActive: () => this.inputEl[MATCHES](':active'),
    addClass: className => {
      this.setState(prevState => ({
        foundationClasses: prevState.foundationClasses.add(className)
      }));
    },
    removeClass: className => {
      this.setState(prevState => ({
        foundationClasses: prevState.foundationClasses.remove(className)
      }));
    },
    registerInteractionHandler: (evtType, handler) => {
      this.inputEl.addEventListener(evtType, handler);
    },
    deregisterInteractionHandler: (evtType, handler) => {
      this.inputEl.removeEventListener(evtType, handler);
    },
    updateCssVariable: (varName, value) => {
      this.setState(prevState => ({
        rippleCss: prevState.rippleCss.set(varName, value)
      }));
    },
    computeBoundingRect: () => {
      const {left, top} = this.rootEl.getBoundingClientRect();
      const DIM = 40;
      return {
        top,
        left,
        right: left + DIM,
        bottom: top + DIM,
        width: DIM,
        height: DIM,
      };
    },
  }));


  render() {


    return (
      <NativeDOM eventListeners={this.state.foundationEventListeners.toJS()}>
      <div
        ref={el => this.rootEl = el}
        className={`mdc-checkbox ${this.state.foundationClasses.toJS().join(' ')}`}>
        <input
         ref={el => this.inputEl = el}
         id={this.props.id}
         type="checkbox"
         className="mdc-checkbox__native-control"
         aria-labelledby={this.props.labelId}
         disabled={this.state.disabled}
         checked={this.state.checked}
         onChange={this.onChange}
        />
        <div className="mdc-checkbox__background">
          <svg className="mdc-checkbox__checkmark"
               viewBox="0 0 24 24">
            <path className="mdc-checkbox__checkmark__path"
                  fill="none"
                  stroke="white"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div className="mdc-checkbox__mixedmark"></div>
        </div>
      </div>
        </NativeDOM>
    )
  }

}

function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop();
}

const MATCHES = getMatchesProperty(HTMLElement.prototype);
