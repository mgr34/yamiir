/**
 * Created by matt on 6/27/17.
 */
import  React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import { HEADER_CLASS,TITLE_CLASS,SUBTITLE_CLASS} from './constants'

export default class Container extends PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    className: PropTypes.string
  };


  render() {
    const {title,subtitle, children, className} = this.props;
    return (
      <div className={classnames(HEADER_CLASS, className)}>
        {title && <h3 className={TITLE_CLASS}>{title}</h3>}
        {subtitle && <h3 className={SUBTITLE_CLASS}>{subtitle}</h3>}
        {children}
      </div>
    )
  }
}
