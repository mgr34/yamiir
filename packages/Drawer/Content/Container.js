import  React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import { CLASS_NAME } from './constants';

export default class Container extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static contextTypes = {
    baseClass: PropTypes.string.isRequired
  };


  render() {
    const { className, children } = this.props;
    const BASE_CLASS_NAME = this.context.baseClass + CLASS_NAME;

    return (
      <nav className={classnames(BASE_CLASS_NAME, className)}>
        {children}
      </nav>
    )
  }

}

