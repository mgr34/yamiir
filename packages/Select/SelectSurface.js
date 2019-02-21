import React from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import {SURFACE_CLASS, BOTTOM_LINE_CLASS, LABEL_FLOAT_CLASS, LABEL_CLASS, SELECTED_CLASS} from "./constants";
import Ripple from "../Ripple";

const SelectSurface = (props) => (
  <Ripple prefix={false}>
    <div
      ref={props.surfaceRef}
      className={SURFACE_CLASS}
      tabIndex="0"
      style={props.style}
      {...props.surfaceActions}
    > <div
        className={classnames(props.labelClasses,LABEL_CLASS, {
          [LABEL_FLOAT_CLASS]: props.selected.length
        })}
       >{props.label}</div>
      <div className={SELECTED_CLASS}>{props.selected}</div>
      <div className={classnames(props.bottomLineClasses,BOTTOM_LINE_CLASS)}/>
    </div>
  </Ripple>
);

export default SelectSurface;

SelectSurface.propTypes = {
  surfaceRef: PropTypes.func.isRequired,
  surfaceActions: PropTypes.object,
  style: PropTypes.object,
  labelClasses: PropTypes.array,
  label: PropTypes.string,
  selected: PropTypes.string.isRequired,
  bottomLineClasses: PropTypes.array
};
