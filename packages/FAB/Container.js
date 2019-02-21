/**
 * Created by matt on 6/16/17.
 */


import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import Ripple from '../Ripple/Ripple';
import {PROPERTY_CLASS_NAMES, BASE_CLASS_NAME } from './constants';
import classnames from 'classnames';

export default class Container extends PureComponent {

  static propTypes = {
    plain: PropTypes.bool,
    mini: PropTypes.bool,
    disabled: PropTypes.bool,
    ripple: PropTypes.bool,
    icon: PropTypes.string.isRequired
  };

  static defaultProps = {
    plain: false,
    mini: false,
    disabled: false,
    ripple: false
  };

  render() {
    const { ripple, className, plain, mini, icon, disabled } =  this.props;
    const classNames = classnames({
      [PROPERTY_CLASS_NAMES.PLAIN]: plain,
      [PROPERTY_CLASS_NAMES.MINI]: mini,
      [PROPERTY_CLASS_NAMES.ICON]: icon
      }, className, BASE_CLASS_NAME);

    return ripple
      ? (
        <Ripple>
          <button aria-label={icon} className={classNames} disabled={disabled}>
            <span className={BASE_CLASS_NAME + '__icon'}>
              {icon}
            </span>
          </button>
        </Ripple>
      )
      : (
        <button aria-label={icon} className={classNames} disabled={disabled}>
            <span className={BASE_CLASS_NAME + '__icon'}>
              {icon}
            </span>
        </button>
      )

  }
}
