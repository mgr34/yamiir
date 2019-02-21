
import  React from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import { BASE_CLASS_NAME } from './constants'

const CLASS_NAME = `${BASE_CLASS_NAME}__title`;

const Title = ({className,children}, context) =>  (
  <h2 id={context.id + '-label'} className={classnames(className, CLASS_NAME)}>
    {children}
  </h2>
);


Title.propTypes = { className: PropTypes.string }
Title.contextTypes = { id: PropTypes.string.isRequired};

export default Title;
