/**
 * Created by matt on 6/9/17.
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Ripple from '../Ripple';


class Button extends PureComponent {
  static propTypes = {
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    accent: PropTypes.bool,
    unelevated: PropTypes.bool,
    dense: PropTypes.bool,
    raised: PropTypes.bool,
    stroked: PropTypes.bool,
    outlined: PropTypes.bool,
    actions: PropTypes.object,
    tagName: PropTypes.oneOf(['a','button']),
    href: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    actions: {},
    tagName: 'button',
  };

  constructor(props) {
    super(props);
    const {
      accent,
      secondary,
      unelevated,
      raised,
      dense,
      primary,
      stroked,
      outlined,
    } = this.props;

    this.state = {
      actions: props.actions,
      classes: classnames(
        'mdc-button', props.className, {
          'secondary-text-button': accent || secondary,
          'secondary-filled-button': secondary && (unelevated || raised),
          'secondary-stroked-button': secondary && stroked,
          'mdc-button--dense': dense,
          'mdc-button--primary': primary,
          'mdc-button--raised': raised,
          'mdc-button--outlined': stroked || outlined,
          'mdc-button--unelevated': unelevated,
        }

      )
    };
    if (props.accent) {
      console.error("Accent is deprecated. Please use secondary");
    }

    if (props.stroked) {
      console.warn("Stroked is deprecated. Please used outlined");
    }

    if (props.condensed) {
      console.warn("Condensed is deprecaed. Please use dense")
    }
  }


  render() {
    const {
      secondary,
      primary,
      ripple,
      name,
      disabled,
      id,
      children,
      tagName,
      title,
      href
    } = this.props;

    return  ripple ?
      (
        <Ripple
          prefix={false}
          primary={primary}
          accent={secondary}
        ><Tag
          href={href}
          tagName={tagName}
          disabled={disabled}
            title={title}
          name={name}
            id={id}
            className={this.state.classes}
            onClick={this.props.onClick}
        >{children}</Tag>
        </Ripple>
    ) : (
        <Tag
          href={href}
          tagName={tagName}
          disabled={disabled}
          title={title}
          name={name}
          id={id}
          className={this.state.classes}
          onKeyDown={this.props.onKeyDown}
          onClick={this.props.onClick}>{children}</Tag>
      )

  }
}

const Tag = ({tagName,...otherProps}) => tagName === 'a'
 ? <a {...otherProps}/> // eslint-disable-line jsx-a11y/anchor-has-content
 : <button {...otherProps}/>

export default Button;
