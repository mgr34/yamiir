/**
 * Created by matt on 7/6/17.
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import {INPUT_CLASS} from './constants'
import classnames from 'classnames';

const Input = ({type,onChange,className,...otherProps},context) => {
  const {onKeyDown, onFocus, onBlur, onInput } = context.inputEventHandlers;
  //could improve the next six lines.
  const props = context.validation
    ? {['aria-controls']: context.id + '-helptext', ...otherProps}
    : {...otherProps};
  const properties = context.label
    ? {['aria-label']: context.label, placeholder: context.label, ...props}
    : {...props}

  return type === 'textarea'
    ? (
      <textarea
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        id={context.id}
        className={classnames(INPUT_CLASS, className)}
        ref={context.inputEl}
        {...properties}
      />
    )
    : (
      <input
        id={context.id}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        className={classnames(INPUT_CLASS, className)}
        type={type}
        ref={context.inputEl}
        disabled={context.disabled}
        {...properties}
      />
    );
};


Input.propTypes = {
  type: PropTypes.oneOf(['textarea','text','password','email']),
  value: PropTypes.string,
};

Input.contextTypes = {
  id: PropTypes.string.isRequired,
  inputEl: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string,
  inputEventHandlers: PropTypes.object.isRequired,
  validation: PropTypes.bool.isRequired
};

export default Input;
