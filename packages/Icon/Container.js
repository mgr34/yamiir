/**
 * Created by matt on 6/28/17.
 */

import React from 'react';
import {PropTypes} from 'prop-types';
import {BASE_CLASS_NAME} from './constants';
import classnames from 'classnames';

const Container = ({actions,className,name,title,...otherProps}) => (
  <i
    className={classnames(BASE_CLASS_NAME,className)}
    aria-hidden="true"
    title={title ? title : `${name} icon`}
    {...actions}
    {...otherProps}
  >{name}</i>
);

Container.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  actions: PropTypes.object
};

export default Container;
