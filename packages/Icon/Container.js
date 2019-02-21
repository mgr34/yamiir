/**
 * Created by matt on 6/28/17.
 */

import React from 'react';
import {PropTypes} from 'prop-types';
import {BASE_CLASS_NAME} from './constants';
import classnames from 'classnames';

const Container = ({className,name}) => (
  <i
    className={classnames(BASE_CLASS_NAME,className)}
    aria-hidden="true"
    title={`${name} icon`}
  >{name}</i>
);

Container.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Container;
