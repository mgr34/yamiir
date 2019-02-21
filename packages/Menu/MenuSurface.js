/**
 * Created by matt on 6/29/17.
 */
import React from 'react';
import {PropTypes} from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable'

const MenuSurface = (props, {isOpen}) => (
 <ul
   className={[...props.className, 'mdc-simple-menu__items mdc-list']}
   style={props.style.toJS()}
   role="menu"
   aria-hidden={!isOpen}
   onClick={props.onClick}
   ref={props.surfaceRef}
 >{props.children}</ul>
);

MenuSurface.propTypes = {
  surfaceRef: PropTypes.func.isRequired,
  className: PropTypes.instanceOf(ImmutableSet).isRequired,
  style: PropTypes.instanceOf(ImmutableMap).isRequired,
  onClick: PropTypes.func.isRequired
}

MenuSurface.contextTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default MenuSurface;
