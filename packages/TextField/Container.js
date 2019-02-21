import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable'
import { TextFieldAdapter, TextFieldRippleAdapter} from "./adapter";
import { MDCTextFieldFoundation } from '@material/textfield/dist/mdc.textfield';
import {makeActions, merge} from "../util";
import Label from "../FloatingLabel";
import Outline from "../Notched-Outline/index";
import LineRipple from "../LineRipple";
import classnames from 'classnames';
import RippleWrapper from "./RippleWrapper";
import {
  BASE_CLASS,
  BOX,
  DENSE,
  INPUT,
  ICON_BEFORE,
  ICON_AFTER,
  OUTLINE,
  FULLWIDTH,
  TEXTAREA
} from "./constants";
import Icon from "./Icon";
import HelperText from "./HelperText";

export default class TextFieldContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    dense: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    persistent: PropTypes.bool,
    validation: PropTypes.bool,
    required: PropTypes.bool,
    rtl: PropTypes.bool,
    actions: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text','password','textarea','email']).isRequired,
    styleType: PropTypes.oneOf(['box','outline','fullwidth']),
    onChange: PropTypes.func.isRequired,
    iconBefore: PropTypes.string,
    iconAfter: PropTypes.string,
    iconSelect: PropTypes.func,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    pattern: PropTypes.string,
    name: PropTypes.string,
    autocomplete: PropTypes.bool,
    focusOnMount: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    label: '',
    helperText: '',
    disabled: false,
    dense: false,
    persistent: false,
    validation: false,
    rtl: false,
    actions: {},
    placeholder: '',
    type: 'text',
    autocomplete: false,
    focusOnMount: false,
    className: '',
  };

  constructor(props) {
    super(props);
    const {styleType,className} = props;
    this.state = {
      foundationClasses: new ImmutableSet(classnames(BASE_CLASS, className, {
        [DENSE]: props.dense,
        [BOX]: styleType === 'box',
        [OUTLINE]: styleType === 'outline',
        [FULLWIDTH]: styleType === 'fullwidth',
        [TEXTAREA]: props.type === 'textarea',
        [ICON_BEFORE]: ['box','outline'].indexOf(styleType) !== -1
                        && props.iconBefore,
        [ICON_AFTER]: ['box','outline'].indexOf(styleType) !== -1
                        && props.iconAfter,
        }
      ).split(' ')),
      foundationEventListeners: new ImmutableMap(),
      inputEventListeners: new ImmutableMap(),
      inputAttrs: new ImmutableMap(),
      iconBefore: (
        ['box','outline'].indexOf(styleType) !== -1 && props.iconBefore
      ) ? props.iconBefore : undefined,
      iconAfter: (['box','outline'].indexOf(styleType) !== -1
        && props.iconAfter
        && props.iconBefore === undefined)
        ? props.iconAfter
        : undefined,
    };

    this.adapter = new TextFieldAdapter(this);
    if (props.styleType === 'box' || props.styleType === 'outline') {
      //Only take methods from current adapter that are found in TxtFldRpplAdptr
      this.rippleAdapter = this.adapter.toObject(TextFieldRippleAdapter)
    }
  }

  componentDidMount() {
    const foundation = el => el && el.hasOwnProperty('foundation')
      ? el.foundation
      : undefined;

    this.foundation = new MDCTextFieldFoundation(
      this.adapter.toObject(MDCTextFieldFoundation.defaultAdapter),
      {
        helperText: foundation(this.helperTextEl),
        icon: foundation(this.iconEl),
      });

    this.foundation.init();

    if (this.props.focusOnMount) {
      this.inputEl.focus();
      this.foundation.adapter_.activateLineRipple();
    }

    if (this.props.disabled && this.iconEl) {
      this.iconEl.foundation.setDisabled(true)
    }


  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentWillReceiveProps(np) {
    if (np.disabled !== this.props.disabled && this.iconEl) {
      this.iconEl.foundation.setDisabled(np.disabled)
    }
  }

  render() {
    const {props,state} = this;
    const {
      iconBefore,
      iconAfter,
      iconSelect,
      id,
      value,
      onChange,
      label,
      type,
      styleType,
      disabled,
      required,
      helperText,
      persistent,
      minLength,
      maxLength,
      pattern,
    } = props;
    const actions = makeActions({},state.foundationEventListeners.toJS())(this.foundation);
    const inputActions = merge(props.actions,makeActions({},state.inputEventListeners.toJS())(this.foundation))
    return (
      <HelpWrapper
        id={id + "-helper-text"}
        helperRef={el => this.helperTextEl = el}
        helperText={helperText}
        persistent={persistent}
        validation={minLength !== undefined || maxLength !== undefined || pattern !== undefined}
      ><RippleWrapper
        rippleAdapter={styleType === 'box' ?  this.rippleAdapter : undefined}
        ><div className={state.foundationClasses.toJS().join(' ')} {...actions}>
          {state.iconBefore
            ? <Icon
                ref={el => this.iconEl = el}
                name={iconBefore}
                onSelect={iconSelect}
              />
            : null
          }
          <Input
            className={INPUT}
            inputRef={el => this.inputEl = el}
            value={value}
            onChange={onChange}
            id={id}
            actions={inputActions}
            type={type}
            placeholder={styleType === 'fullwidth' ? props.placeholder : ''}
            aria-label={styleType === 'fullwidth' ? props.label : undefined}
            disabled={disabled}
            required={required}
            aria-controls={helperText ? `${id}-helper-text` : undefined}
            minLength={props.minLength}
            maxLength={props.maxLength}
            pattern={props.pattern}
            name={props.name || props.id}
            autoComplete={props.autocomplete ? 'on' : 'off'}
          />
          {props.styleType !== 'fullwidth'
            ? <Label ref={el => this.labelEl = el} id={id}>{label}</Label>
            : null
          }
          {state.iconAfter
            ? <Icon
              ref={el => this.iconEl = el}
              name={iconAfter}
              onSelect={iconSelect}
            />
            : null
            }
            { props.styleType !== 'outline'
              ? <LineRipple ref={el => this.lineRippleEl = el}/>
              : <Outline rippleAdapter={this.rippleAdapter} ref={el => this.outlineEl = el}/>
            }
          </div>
        </RippleWrapper>
      </HelpWrapper>
    )
  }
}

const Input = ({type,actions,inputRef,...otherProps}) =>
  type === 'textarea'
    ? <textarea ref={inputRef} {...actions} {...otherProps} />
    : <input type={type} ref={inputRef} {...actions} {...otherProps} />;


const HelpWrapper = ({id,helperText,helperRef,validation,persistent,children}) => helperText
  ? <React.Fragment>
    {children}
    <HelperText
      validation={validation}
      persistent={persistent}
      id={id}
      ref={helperRef}
      content={helperText}
    />
  </React.Fragment>
  : children

