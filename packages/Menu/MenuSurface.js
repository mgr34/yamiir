/**
 * Created by matt on 6/29/17.
 */
import React from 'react';
import {PropTypes} from 'prop-types';
import { Map as ImmutableMap, } from 'immutable'

const MenuSurface = (props, {isOpen,surfaceClassName}) => (
  <ul
    className={props.className}
    style={props.style.toJS()}
    aria-hidden={!isOpen}
    ref={props.surfaceRef}
    role={props.role.length ? props.role : undefined}
  >{props.children}</ul>
);

MenuSurface.propTypes = {
  surfaceRef: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(ImmutableMap).isRequired,
}

MenuSurface.contextTypes = {
  isOpen: PropTypes.bool.isRequired,
  surfaceClassName : PropTypes.string
}

export default MenuSurface;
