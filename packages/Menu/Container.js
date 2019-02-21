/**
 * Created by matt on 6/29/17.
 */
import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

import { MDCSimpleMenuFoundation } from '@material/menu/dist/mdc.menu';

import {MenuAdapter} from './adapter';
import classnames from 'classnames';
import MenuSurface from './MenuSurface';
import { BASE_CLASS_NAME } from './constants'
import { _determineEvent } from './utils.js';

export default class MenuContainer extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
    rtl: PropTypes.bool,
    anchor: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
    rtl: false,
    anchor: false
  };

  constructor(props, context) {
    super(props, context);
    this.items = [];
    this.state = {
      foundationClasses: new ImmutableSet(),
      surfaceClasses: new ImmutableSet(),
      foundationCssVars: new ImmutableMap(),
      surfaceCssVars: new ImmutableMap(),
      foundationEventListeners: new ImmutableMap(),
      isOpen: props.isOpen,
      previousFocus: false,
      loaded: false,
      anchor: props.anchor,
      rtl: props.rtl
    }


    this.adapter = new MenuAdapter(this);
    this.foundation = new MDCSimpleMenuFoundation(
      this.adapter.toObject(
        MDCSimpleMenuFoundation.defaultAdapter
      )
    )

    this.handleClick = this.handleClick.bind(this);
    this.handleSurfaceClick = this.handleSurfaceClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.loaded = this.loaded.bind(this)
  }

  componentDidMount() {
    this.foundation.init()
    this.foundationEl.addEventListener('transitionend',this.loaded)
  }

  componentWillUnmount() {
    this.foundation.destroy();
    this.foundationEl.removeEventListener('transitionend',this.loaded)
  }

  loaded() {
    this.setState({loaded: true})
  }

  componentWillReceiveProps(props) {
    if (!!props.isOpen !== !!this.state.isOpen) {
      if (props.isOpen) {
        this.setState({ isOpen: true})
        this.foundation.open();
        document.addEventListener(_determineEvent(window),this.handleClick)
      } else {
        this.setState({ isOpen: false, loaded: false})
        this.foundation.close()
        document.removeEventListener(_determineEvent(window),this.handleClick)
      }
    }
  }

  static childContextTypes = {
    isOpen: PropTypes.bool.isRequired,
    itemsRef: PropTypes.func.isRequired
  };

  getChildContext() {
    return {
      isOpen: this.state.isOpen,
      itemsRef: (el,i) => this.items[i] = el
    }
  }


  handleSurfaceClick(e) {
    this.foundation.handlePossibleSelected_(e)
  }

  handleClick(e) {
    //this.props.onCancel();
    if (e.target && !this.items.filter(i => i === e.target).length) {
      this.props.onCancel();
    }
  }



  handleKeyDown(e) {
    this.foundation.handleKeyboardDown_(e);
  }

  handleKeyUp(e) {
    this.foundation.handleKeyboardUp_(e);
  }

  render() {
    const { surfaceClasses, surfaceCssVars, ...state} = this.state;
    const propertyClassNames = {
      OPEN: `mdc-simple-menu--open`
    };

    const className = classnames(...state.foundationClasses.toJS(),
      this.props.className,BASE_CLASS_NAME)

    const cssVariables = {
      ...state.foundationCssVars.toJS(),
    };


    const eventListeners = {
      ...state.foundationEventListeners.toJS()
    };

    return (
        <div
          className={className}
          style={cssVariables}
          tabIndex="-1"
          onKeyDown={this.state.isOpen ? this.handleKeyDown : null}
          onKeyUp={this.state.loaded ? this.handleKeyUp : null}
          ref={el => this.foundationEl = el}
          dir={this.state.rtl ? 'rtl' : 'ltr'}
        ><MenuSurface
          className={surfaceClasses}
          style={surfaceCssVars}
          onClick={this.handleSurfaceClick}
          surfaceRef={el => this.surfaceEl = el}
         >{this.props.children}</MenuSurface>
        </div>

    )
  }
}
