/**
 * Created by matt on 6/26/17.
 */

import React, {PureComponent} from 'react';
import { PropTypes } from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import NativeDOM from '../Base/NativeDOM';
import {
  MDCPersistentDrawerFoundation,
  MDCTemporaryDrawerFoundation } from '@material/drawer/dist/mdc.drawer';
import {DrawerAdapter} from './adapter';
import classnames from 'classnames';
import DrawerSurface from './DrawerSurface';

import { BASE_CLASS_NAME } from './constants';


export default class DrawerContainer extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['temporary','permanent','persistent']),
    open: PropTypes.bool.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    rtl: PropTypes.bool
  };

  static defaultProps = {
    type: 'temporary',
    open: false,
    rtl: false
  };

  constructor(props, context) {
    super(props,context);
    const { type, open } = props;

    this.handleClose = this.handleClose.bind(this);
    this.handleSurfaceClick = this.handleSurfaceClick.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);


    if (type === 'temporary' || type === 'persistent') {
      this.adapter = new DrawerAdapter(this);
      this.foundation = type === 'temporary'
        ? new MDCTemporaryDrawerFoundation(
          this.adapter.toObject(
            MDCTemporaryDrawerFoundation.defaultAdapter
          ))
        : new MDCPersistentDrawerFoundation(
          this.adapter.toObject(
            MDCPersistentDrawerFoundation.defaultAdapter
          ))
    }

    this.state = {
      foundationClasses: new ImmutableSet([BASE_CLASS_NAME[type]]),
      surfaceClasses: new ImmutableSet(),
      foundationCssVars: new ImmutableMap(),
      surfaceCssVars: new ImmutableMap(),
      foundationEventListeners: new ImmutableMap(),
      open: open,
      baseClass: BASE_CLASS_NAME[type]
    };
  }


  componentDidMount() {
    if (this.foundation) {
      this.foundation.init();
    }
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }

  componentWillReceiveProps(props) {
    if (!!props.open !== !!this.state.open) {
      if (props.open) {
        this.foundation.open();
      } else {
        this.foundation.close()
      }
    }
  }

  static childContextTypes = {
    baseClass: PropTypes.oneOf(
      Object.keys(BASE_CLASS_NAME).map(i => BASE_CLASS_NAME[i])
    ),
    open: PropTypes.bool.isRequired
  };

  getChildContext() {
    return {
      baseClass: this.state.baseClass,
      open: this.state.open
    }
  }

  handleClose() {
    this.foundation.close();
  }

  handleSurfaceClick(e) {
    this.foundation.drawerClickHandler_(e)
  }

  handleTouchStart(e) {
    this.foundation.handleTouchStart_(e)
  }

  handleTouchMove(e) {
    this.foundation.handleTouchMove_(e);
  }

  handleTouchEnd(e) {
    this.foundation.handleTouchEnd_(e);
  }

  render() {

    const { baseClass, surfaceClasses, surfaceCssVars, ...state} = this.state;
    const propertyClassNames = {
      OPEN: `${baseClass}--open`
    };

    const className = classnames(...state.foundationClasses.toJS(),
      this.props.className)

    const cssVariables = {
      ...state.foundationCssVars.toJS(),
    };


    const eventListeners = {
      ...state.foundationEventListeners.toJS()
    };

    return (
      <NativeDOM
        eventListeners={eventListeners}
      >
        <aside
          ref={el => this.elem = el}
          dir={this.props.rtl ? 'rtl' : 'ltr'}
          className={className}
          style={cssVariables}
          onClick={this.handleClose}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          aria-hidden={!this.state.open}>

          <DrawerSurface
            onTouchStart={this.handleTouchStart}
            onClick={this.handleSurfaceClick}
            classes={surfaceClasses}
            CSSVars={surfaceCssVars}
            surfaceRef={el => this.surfaceEl = el}
          >{this.props.children}</DrawerSurface>

        </aside>
      </NativeDOM>
    )
  }

}
