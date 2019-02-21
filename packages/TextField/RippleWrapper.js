import React from 'react';
import PropTypes from 'prop-types';
import Ripple from "../Ripple";

const propTypes = {
  rippleAdapter: PropTypes.shape({
    browserSupportsCssVars: PropTypes.func,
    isUnbounded: PropTypes.func,
    isSurfaceActive: PropTypes.func,
    isSurfaceDisabled: PropTypes.func,
    addClass: PropTypes.func,
    removeClass: PropTypes.func,
    containsEventTarget: PropTypes.func,
    registerInteractionHandler: PropTypes.func,
    deregisterInteractionHandler: PropTypes.func,
    registerDocumentInteractionHandler: PropTypes.func,
    deregisterDocumentInteractionHandler: PropTypes.func,
    registerResizeHandler: PropTypes.func,
    deregisterResizeHandler: PropTypes.func,
    updateCssVariable: PropTypes.func,
    computeBoundingRect: PropTypes.func,
    getWindowPageOffset: PropTypes.func,
  }),
};


class RippleWrapper extends React.PureComponent {

  render() {
    const props = this.props;
    return props.rippleAdapter !== undefined
      ? <Ripple
          ref={el => this.ripple = el}
          prefix={false}
          customAdapter={props.rippleAdapter}
        >{props.children}</Ripple>
      : props.children;
  }
}

RippleWrapper.propTypes = propTypes;
export default RippleWrapper
