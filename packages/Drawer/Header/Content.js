/**
 * Created by matt on 6/27/17.
 */

import  React from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import { CONTENT_CLASS_NAME } from './constants'

const Content = ({className,children}, {baseClass}) =>  (
  <div className={classnames(className, baseClass + CONTENT_CLASS_NAME)}>
    {children}
  </div>
);


Content.propTypes = { className: PropTypes.string }
Content.contextTypes = { baseClass: PropTypes.string.isRequired };

export default Content;
