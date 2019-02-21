/**
 * Created by matt on 6/28/17.
 */


import  React from 'react';
import {PropTypes} from 'prop-types';
import Icon from '../../Icon';
import classnames from 'classnames';
import {LIST_CLASS} from './constants';
import Ripple from '../../Ripple';

const Link = ({ripple, children, ...otherProps},) =>
 <A ripple open={true} {...otherProps}>{children}</A>

const A = (props) => props.ripple ?
  (
    <Ripple primary>
  <a
    tabIndex={props.open ? 0 : -1}
    title={props.title}
    href={props.href}
    className={classnames(props.className,LIST_CLASS,{
      [LIST_CLASS + '--selected']: props.selected
    })}
    onClick={props.onClick}
  >
    {props.iconBefore
      ? <Icon name={props.iconBefore} className="mdc-list-item__graphic"/>
      : null
    }
    <span className={`${LIST_CLASS}__text`}>{props.children}</span>
    {props.iconAfter
      ? <Icon name={props.iconAfter} className="mdc-list-item__meta"/>
      : null
    }
  </a>
    </Ripple>
)
  :
  <a
    tabIndex={props.open ? 0 : -1}
    title={props.title}
    href={props.href}
    className={classnames(props.className,LIST_CLASS,{
      [LIST_CLASS + '--selected']: props.selected
    })}
    onClick={props.onClick}
  >
    {props.iconBefore
      ? <Icon name={props.iconBefore} className="mdc-list-item__graphic"/>
      : null
    }
    <span className={`${LIST_CLASS}__text`}>{props.children}</span>
    {props.iconAfter
      ? <Icon name={props.iconAfter} className="mdc-list-item__meta"/>
      : null
    }
  </a>


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
