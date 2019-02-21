import React, {PureComponent} from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';
import { MDCRippleFoundation} from '@material/ripple/dist/mdc.ripple';
import { RippleAdapter } from './adapter';
import { merge, shallowCompare, makeActions, toStyle } from "../util";
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable'
import classnames from 'classnames';

const propTypes = {
  unbounded: PropTypes.bool,
  surfaceClassName: PropTypes.bool,
  accent: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.node.isRequired,
  customAdapter: PropTypes.shape({
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

const defaultProps = {
  unbounded: false,
  surfaceClassName: false,
  accent: false,
  primary: false,
  disabled: false,
  prefix: true,
  actions: {},
  customAdapter: {},
};


export  default class Ripple extends PureComponent {

  static propType = propTypes;
  static defaultProps = defaultProps;

  constructor(props, context) {
    super(props, context)

    this.state = {
      foundationClasses: new ImmutableSet(),
      foundationCssVars: new ImmutableMap(),
      foundationEventListeners: new ImmutableMap(),
      actions: {},
      style: {},
      classNames: props.classNames || []
    };

    this.adapter = new RippleAdapter(this)
    //CustomAdapter overwrites any previously defined rippleadapter props
    this.foundation = new MDCRippleFoundation(
      {...this.adapter.toObject(MDCRippleFoundation.defaultAdapter),
        ...props.customAdapter
      }
    );
  }


  componentDidMount() {
    this._isMounted = true;
    this.foundation.init();

    //missing actions
  }

  deactivateRipple = e => {
    this.foundation.deactivate(e)
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.foundation.destroy();
  }


  componentWillUpdate(np,ns) {
    const {props,state} = this;

    if (!shallowCompare(np,props,'actions') ||
      !shallowCompare(ns,state,'foundationEventListeners',true)) {
      this.setState({
        actions: makeActions(np.actions, ns.foundationEventListeners.toJS())(this.foundation)
      })
    }

  }


  getDOMNode() {
    if (this._isMounted) {
      return ReactDOM.findDOMNode(this);
    }
  }


  render() {
    const className = classnames({
      [propertyClassNames.PREFIX]: this.props.prefix,
      [propertyClassNames.PRIMARY]: this.props.primary,
      [propertyClassNames.ACCENT]: this.props.accent,
    }, this.props.className).split(' ').filter(item => !!item);


    const cssClasses = [
      ...this.state.foundationClasses.toJS(),
      ...className
    ];

    const {actions} = this.state;
    const classNames = [this.props.children.props.className, ...cssClasses].join(' ')
    if (this.props.log) { console.log({classNames,actions})}
    return (
        React.cloneElement(this.props.children, {
          style: {
            ...toStyle(this.state.foundationCssVars.toJS()),
            ...this.props.children.props.style,
          },
          className: classNames,
          ...merge(actions,this.props.children.props,false),
        })
    );
  }

}

const BASE_CLASS = 'mdc-ripple-surface';
const propertyClassNames = {
  PREFIX: BASE_CLASS,
  PRIMARY: `${BASE_CLASS}--primary`,
  ACCENT: `${BASE_CLASS}--accent`,
};

