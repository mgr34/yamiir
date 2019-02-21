import  React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import { BASE_CLASS_NAME } from './constants';

export default class Container extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };


  render() {
    const { className, children } = this.props;

    return (
      <nav className={classnames(BASE_CLASS_NAME, className)}>
        {children}
      </nav>
    )
  }

}

