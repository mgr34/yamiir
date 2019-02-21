/**
 * Created by matt on 6/16/17.
 */


import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {
  BASE_CLASS_NAME,
  EXITED,
  EXTENDED,
  ICON_CLASS,
  LABEL_CLASS, MINI
} from './constants';
import classnames from 'classnames';
import Ripple from "../Ripple/Container";

export default class Container extends PureComponent {

  static propTypes = {
    plain: PropTypes.bool,
    mini: PropTypes.bool,
    disabled: PropTypes.bool,
    ripple: PropTypes.bool,
    exited: PropTypes.bool,
    title: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string.isRequired,
    secondary: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    extended: PropTypes.bool
  };

  static defaultProps = {
    plain: false,
    mini: false,
    disabled: false,
    extended: false,
    ripple: false,
    secondary: false,
    onClick: () => console.warn('onClick not defined'),
    exited: false,
  };

  render() {
    const {ripple,mini,exited,secondary,plain,className, ...props} = this.props;
    const classNames = classnames(
      {
        [MINI]: mini,
        [EXITED]: exited,
        [EXTENDED]: props.extended,
      }, className, BASE_CLASS_NAME);

    return ripple
      ? ( <Ripple primary={plain} accent={secondary}>
            <Button className={classNames} {...props}/>
          </Ripple>
        )
      :  <Button className={classNames} {...props}/>

  }
}


const Button = ({extended,title,className,disabled,icon,label,...actions}) => (
  <button
    title={title}
    aria-label={title || label}
    className={className}
    disabled={disabled}
    {...actions}
  >
    {icon
      ? <span className={ICON_CLASS}>{icon}</span>
      : null
    }

    {extended
      ? <span className={LABEL_CLASS}>{label}</span>
      : null
    }
  </button>
);

