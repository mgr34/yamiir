/**
 * Created by matt on 6/13/17.
 */

import React from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';

import { BASE_CLASS_NAME } from './constants'
const CLASS_NAME = BASE_CLASS_NAME + '__body';

const Body = ({className, children, scrollable}, context) => (
  <section
    id={context.id + '-description'}
    className={classnames(className, CLASS_NAME, { [CLASS_NAME + '--scrollable']: scrollable})}
  >{children}</section>
);


Body.propTypes = { className: PropTypes.string };
Body.contextTypes = { id: PropTypes.string.isRequired};

export default Body;
