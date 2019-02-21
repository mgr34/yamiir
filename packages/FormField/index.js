import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '@material/form-field/dist/mdc.form-field.css';

export const FormField = ({alignEnd, children}) => (
  <div
    className={
      classnames('mdc-form-field', {'mdc-form-field--align-end': alignEnd})
    }
  >{children}</div>
);

FormField.propTypes = {
  alignEnd: PropTypes.bool
};

export default FormField;

