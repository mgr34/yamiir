import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {ROW_CLASS} from "./constants";



const propTypes = {
  className: PropTypes.string,
};

const Row = ({className,children}) => (
  <div className={classnames([ROW_CLASS,className])}>
    {children}
  </div>
);

Row.propTypes = propTypes;
export default Row;

