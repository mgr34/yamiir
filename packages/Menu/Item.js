/**
 * Created by matt on 6/30/17.
 */
import React from 'react';
import {PropTypes} from 'prop-types';
import {MENU_ITEM} from './constants';
import classnames from 'classnames';
import Icon from '../Icon';

const Item = (props,context) => (
  <li
    className={classnames(MENU_ITEM,props.className)}
    onClick={!!props.disabled ? null : props.onClick }
    role="menuitem"
    tabIndex={(context.isOpen && !props.disabled) ? 0 : -1}
    ref={el => context.itemsRef(el,props.index)}
    aria-disabled={!!props.disabled}
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
    </li>

);



Item.propTypes = {
  index: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string
};

Item.defaultProps = { disabled: false };

Item.contextTypes = {
  isOpen: PropTypes.bool.isRequired,
  itemsRef: PropTypes.func.isRequired
};

export default Item;