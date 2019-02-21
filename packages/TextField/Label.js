/**
 * Created by matt on 7/6/17.
 */

import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import {LABEL_CLASS} from './constants';
import classnames from 'classnames'
import {Set as ImmutableSet} from 'immutable';

const Label = ({className,children},{id,labelClasses}) => (
  <label
    htmlFor={id}
    className={classnames(labelClasses.toJS(),className,LABEL_CLASS)}
  >{children}</label>
);

Label.propTypes = {
  className: PropTypes.string
};

Label.contextTypes = {
  id: PropTypes.string.isRequired,
  labelClasses: PropTypes.instanceOf(ImmutableSet),
};

export default Label;
