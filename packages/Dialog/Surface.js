/**
 * Created by matt on 6/13/17.
 */

import  React from 'react';
import {PropTypes} from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable'
import NativeDOM from '../Base/NativeDOM';
import { BASE_CLASS_NAME } from './constants';
const CLASS_NAME =  BASE_CLASS_NAME + '__surface'


const DialogSurface = ({ children, surfaceRef, classes, events }) => (
  <NativeDOM
    cssClasses={[...classes.toJS(), CLASS_NAME]}
    eventListeners={events.toJS()}
  ><div ref={surfaceRef}>
    {children}
  </div>
  </NativeDOM>
);


DialogSurface.propTypes = {
  surfaceRef: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(ImmutableSet).isRequired,
  events: PropTypes.instanceOf(ImmutableMap).isRequired
};

export default DialogSurface
