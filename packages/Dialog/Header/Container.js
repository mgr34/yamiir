
import  React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import Title from './title';

import { BASE_CLASS_NAME } from './constants'

export default class Container extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string
  };

  render() {
     const { title, className } = this.props;

    return (
      <header className={classnames(BASE_CLASS_NAME, className)}>
        {title ? <Title>{title}</Title> : null }
        {this.props.children}
      </header>
    )
  }



}


