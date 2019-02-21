/**
 * Created by matt on 6/28/17.
 */


import  React from 'react';
import {PropTypes} from 'prop-types';
import Icon from '../../Icon';
import classnames from 'classnames';
import {LIST_CLASS} from './constants';
import Ripple from '../../Ripple/Ripple';

const Link = ({ripple, children, ...otherProps},{baseClass,open}) => ripple
  ? <Ripple><A baseClass={baseClass} open={open} {...otherProps}>{children}</A></Ripple>
  : <A baseClass={baseClass} open={open} {...otherProps}>{children}</A>;

const A = (props) => (
  <a
    tabIndex={props.open ? 0 : -1}
    title={props.title}
    href={props.href}
    className={classnames(props.className,LIST_CLASS,{
      [props.baseClass + '--selected']: props.selected
    })}
    onClick={props.onClick}
  >
    {props.iconBefore
      ? <Icon name={props.iconBefore} className="mdc-list-item__start-detail"/>
      : null
    }
    {props.children}
    {props.iconAfter
      ? <Icon name={props.iconAfter} className="mdc-list-item__end-detail"/>
      : null
    }
  </a>
)

Link.contextTypes = {
  baseClass: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};

Link.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  ripple: PropTypes.bool,
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string
};
export default Link;
