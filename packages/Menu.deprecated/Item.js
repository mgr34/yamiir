/**
 * Created by matt on 6/30/17.
 */
import React from 'react';
import {PropTypes} from 'prop-types';
import {MENU_ITEM,MENU_ITEM_SELECTED} from './constants';
import classnames from 'classnames';
import Icon from '../Icon';

const Item = (props,context) => (
  <li
    id={props.id}
    className={classnames(MENU_ITEM,props.className, {[MENU_ITEM_SELECTED]: props.disabled})}
    role={props.role}
    tabIndex={props.disabled ? 0 : props.tabIndex}
    ref={el => context.itemsRef(el,props.index)}
    aria-disabled={props.role !== 'option' ? !!props.disabled : undefined}
    aria-selected={props.role === 'option' && !!props.disabled  ? true : undefined}
    onFocus={props.onFocus ? props.onFocus : () => null}
  >
    {props.iconBefore
      ? <Icon name={props.iconBefore} className="mdc-list-item__graphic"/>
      : null
    }
    <span
      className="mdc-list-item__text"
      dangerouslySetInnerHTML={{__html:props.children}}
    />
    {props.iconAfter
      ? <Icon name={props.iconAfter} className="mdc-list-item__meta"/>
      : null
    }
  </li>
);



Item.propTypes = {
  index: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tabIndex: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string,

};

Item.defaultProps = { disabled: false };

Item.contextTypes = {
  isOpen: PropTypes.bool.isRequired,
  itemsRef: PropTypes.func.isRequired
};

export default Item;