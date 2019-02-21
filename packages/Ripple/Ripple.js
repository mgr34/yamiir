/**
 * Created by matt on 6/12/17.
 */

import React, {PureComponent} from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';
import { MDCRippleFoundation} from '@material/ripple/dist/mdc.ripple';
import { RippleAdapterImpl } from './adapter';
import NativeDOM from '../Base/NativeDOM';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable'
import classnames from 'classnames';

const propTypes = {
  unbounded: PropTypes.bool,
  surfaceClassName: PropTypes.bool,
  accent: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  unbounded: false,
  surfaceClassName: false,
  accent: false,
  primary: false,
  disabled: false
};


export  default class Ripple extends PureComponent {

  static propType = propTypes;
  static defaultProps = defaultProps;

  constructor(props, context) {
    super(props, context)

    this.adapter = new RippleAdapterImpl(this)
    this.foundation = new MDCRippleFoundation(
      this.adapter.toObject(MDCRippleFoundation.defaultAdapter)
    );
  }

  state = {
    foundationClasses: new ImmutableSet(),
    foundationCssVars: new ImmutableMap(),
    foundationEventListeners: new ImmutableMap()
  };

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  getDOMNode() {
    return ReactDOM.findDOMNode(this);
  }


  render() {
    const className = classnames({
      [propertyClassNames.PREFIX]: true,
      [propertyClassNames.PRIMARY]: this.props.primary,
      [propertyClassNames.ACCENT]: this.props.accent,
    }, this.props.className).split(' ').filter(item => !!item);


    const cssVariables = {
      ...this.state.foundationCssVars.toJS(),
    };
    const cssClasses = [
      ...this.state.foundationClasses.toJS(),
      ...className
    ];


    const eventListeners = {
      ...this.state.foundationEventListeners.toJS(),
    };
    return (
      <NativeDOM
        cssVariables={cssVariables}
        cssClasses={cssClasses}
        eventListeners={eventListeners}
      >
      {React.cloneElement(this.props.children)}
      </NativeDOM>
    );
  }

}

const BASE_CLASS_NAME = 'mdc-ripple-surface';
const CLASS_NAME = BASE_CLASS_NAME;
const propertyClassNames = {
  PREFIX: CLASS_NAME,
  PRIMARY: `${CLASS_NAME}--primary`,
  ACCENT: `${CLASS_NAME}--accent`,
}
