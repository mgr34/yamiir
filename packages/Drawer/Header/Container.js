/**
 * Created by matt on 6/27/17.
 */
import  React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import Content from './Content';
import { CLASS_NAME } from './constants'

export default class Container extends PureComponent {

  static propTypes = {
    content: PropTypes.string,
    className: PropTypes.string
  };

  static contextTypes = {
    baseClass: PropTypes.string.isRequired
  };

  render() {
    const {content, children, className} = this.props;
    const BASE_CLASS_NAME = this.context.baseClass + CLASS_NAME;

    return (
      <header className={classnames(BASE_CLASS_NAME, className)}>
        {content ? <Content>{content}</Content> : null }
        {children}
      </header>
    )
  }
}
