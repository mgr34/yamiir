
import  React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';

import { BASE_CLASS_NAME } from './constants'

export default class Container extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string
  };

  render() {
   const { className} = this.props;
    return (
      <footer className={classnames(className,BASE_CLASS_NAME)}>
        {this.props.children}
      </footer>
    )
  }

}




