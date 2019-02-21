/**
 * Created by matt on 6/9/17.
 */

import React, {PureComponent} from 'react';
import classnames from 'classnames';
import {Set as ImmutableSet, Map as ImmutableMap } from  'immutable';
import { MDCRippleFoundation, MDCRipple } from '@material/ripple/dist/mdc.ripple.min';
import Ripple from '../Ripple/Ripple';


function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop();
}

const MATCHES = getMatchesProperty(HTMLElement.prototype);

class Button extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { rippleCss: new ImmutableMap(), classes: new ImmutableSet()}
  }

  rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
    isUnbounded: () => true,
    isSurfaceActive: () => this.refs.nativeCb[MATCHES](':active'),
    addClass: className => {
      this.setState(prevState => ({
        classes: prevState.classes.add(className)
      }));
    },
    removeClass: className => {
      this.setState(prevState => ({
        classes: prevState.classes.remove(className)
      }));
    },
    registerInteractionHandler: (evtType, handler) => {
      this.refs.nativeCb.addEventListener(evtType, handler);
    },
    deregisterInteractionHandler: (evtType, handler) => {
      this.refs.nativeCb.removeEventListener(evtType, handler);
    },
    updateCssVariable: (varName, value) => {
      this.setState(prevState => ({
        rippleCss: prevState.rippleCss.set(varName, value)
      }));
    },
  }));



  render() {
    const {
      accent,
        className,
        compact,
        dense,
        primary,
        raised,
        ripple,
    ...otherProps
    } = this.props;

    const classes = classnames(
      'mdc-button', className, {
        'mdc-button--accent': accent,
        'mdc-button--compact': compact,
        'mdc-button--dense': dense,
        'mdc-button--primary': primary,
        'mdc-button--raised': raised
      }

    );

    return  ripple ?
      (
        <Ripple>
          <button
            className={`${classes} ${this.state.classes.toJS().join(' ')}`}
             {...otherProps}/>
        </Ripple>
    ) : (
        <button
          className={`${classes} ${this.state.classes.toJS().join(' ')}`}
           {...otherProps}/>
      )

  }
}

export default Button;
