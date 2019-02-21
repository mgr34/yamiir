import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import { MDCTextfieldFoundation } from '@material/textfield/dist/mdc.textfield';
import classnames from 'classnames';
import {TextFieldAdapter} from './adapter';
import {
  BASE_CLASS,
  DENSE,
  MULTI,
  HELP_CLASS,
  FULLWIDTH,
  PERSISTENT,
  VALIDATION
} from './constants';

export default class TextFieldContainer extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    dense: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    help: PropTypes.string,
    multiLine: PropTypes.bool,
    fullwidth: PropTypes.bool,
    persistent: PropTypes.bool,
    validation: PropTypes.bool

  };

  static defaultProps = {
    value: '',
    label: '',
    help: '',
    disabled: false,
    dense: false,
    multiLine: false,
    fullwidth: false,
    persistent: false,
    validation: false
  };

  constructor(props, context) {
    super(props, context);

    this.adapter = new TextFieldAdapter(this);
    this.foundation= new MDCTextfieldFoundation(
      this.adapter.toObject(MDCTextfieldFoundation.defaultAdapter)
    );

    const { persistent, validation, dense, multiLine,fullwidth } = props;
    this.state = {
      type: props.type,
      value: props.value,
      label: props.label,
      help: props.help,
      foundationClasses: new ImmutableSet([BASE_CLASS,
        dense ? DENSE : null,
        multiLine ? MULTI : null,
        fullwidth ? FULLWIDTH : null
      ]).filter(i => i),
      helpClasses: new ImmutableSet([
        HELP_CLASS,
        persistent ? PERSISTENT : null,
        validation ? VALIDATION : null]).filter(i => i),
      labelClasses: new ImmutableSet(),
      helpTextAttributes: new ImmutableMap({['aria-hidden']: true}),
    }

  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destory();
  }

  static childContextTypes = {
    id: PropTypes.string.isRequired,
    inputEl: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    labelClasses: PropTypes.instanceOf(ImmutableSet),
    label: PropTypes.string,
    inputEventHandlers: PropTypes.object,
    validation: PropTypes.bool.isRequired
  };

  getChildContext() {
    return {
      id: this.props.id,
      labelClasses: this.state.labelClasses,
      label: this.state.label,
      inputEl: el => this.inputEl = el,
      disabled: this.props.disabled,
      validation: this.props.validation,
      inputEventHandlers: {
        onInput: this.foundation.inputInputHandler_,
        onFocus: this.foundation.inputFocusHandler_,
        onBlur: this.foundation.inputBlurHandler_,
        onKeyDown: this.foundation.inputKeydownHandler_
      }
    }
  }


  render() {
    const { help, helpClasses, helpTextAttributes, foundationClasses } = this.state
    const { children,multiLine, className, persistent } = this.props;

    return help
      ? ( <div>
          <div
            className={classnames(foundationClasses.toJS(),className)}
          >
            {children}
          </div>
          <p
            id={this.props.id+'-helptext'}
            className={classnames(helpClasses.toJS())}
            {...helpTextAttributes.toJS()}
          >
            {help}
          </p>
        </div>
      )
    : (
        <div
          className={classnames(this.state.foundationClasses.toJS(), this.props.className)}
        >
          {children}
        </div>
      )
  }

}
