import React from 'react';
import Button from '../../Button/Button';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import { BASE_CLASS_NAME } from './constants'

const CLASS_NAME = BASE_CLASS_NAME + '__button';






const FooterButton = ({type, children, className,...otherProps},context) => (
  <Button
    className={classnames(className,CLASS_NAME, {
      [CLASS_NAME + '--cancel']: type === 'cancel',
      [CLASS_NAME + '--accept']: type === 'accept'
    })}
    onClick={ type === 'accept' ? context.onAccept : context.onCancel}
    ref={ type === 'accept' ? context.acceptRef : context.cancelRef }
    {...otherProps}
  >{children}</Button>
);

export default FooterButton;

FooterButton.contextTypes = {
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  acceptRef: PropTypes.func.isRequired,
  cancelRef: PropTypes.func.isRequired
};
