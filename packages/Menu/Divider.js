/**
 * Created by matt on 6/30/17.
 */

import React from 'react';
import {PropTypes} from 'prop-types';

const Divider = ({inset}) => (
  <li
    className={inset ? 'mdc-list-divider-inset' : 'mdc-list-divider'}
    role="separator"
    />
)

Divider.propTypes = {inset: PropTypes.bool };
Divider.defaultProps = { inset: false };

export default Divider;
