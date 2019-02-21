import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string,PropTypes.object]).isRequired,
  show: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  labeledby: PropTypes.string,
};


const Switch = ({id, disabled, title, show, onChange,labeledby}) => (
  <form>
    {!labeledby ? <label htmlFor={id}>{title}</label> : null}
        <div className="mdc-switch">
          <input
            title={title}
            type="checkbox"
            id={id}
            className="mdc-switch__native-control"
            checked={show}
            onChange={onChange}
            disabled={disabled}
            aria-labelledby={labeledby}
          />
          <div className="mdc-switch__background">
            <div className="mdc-switch__knob"></div>
          </div>
        </div>
  </form>
);

export default Switch;

Switch.propTypes = propTypes;
Switch.defaultProps = { disabled: false };