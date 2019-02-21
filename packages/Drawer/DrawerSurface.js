/**
 * Created by matt on 6/26/17.
 */


import React from 'react';
import {PropTypes} from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable'

const DrawerSurface = (props, context) => (
  <nav
    className={[...props.classes.toJS(), context.baseClass + '__drawer']}
    style={props.CSSVars.toJS()}
    onClick={props.onClick}
    ref={props.surfaceRef}
    onTouchStart={props.onTouchStart}
  >{props.children}</nav>
);

DrawerSurface.propTypes = {
  surfaceRef: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(ImmutableSet).isRequired,
  CSSVars: PropTypes.instanceOf(ImmutableMap).isRequired,
  onClick: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired
};

DrawerSurface.contextTypes = { baseClass: PropTypes.string.isRequired };

export default DrawerSurface;



