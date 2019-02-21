/**
 * Created by matt on 6/29/17.
 */
import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import {makeActions,  toStyle} from "../util";
import { MDCMenuFoundation } from '@material/menu/dist/mdc.menu';

import {MenuAdapter} from './adapter';
import classnames from 'classnames';
import MenuSurface from './MenuSurface';
import Item from './Item';
import { BASE_CLASS_NAME, SURFACE_CLASS} from './constants'


export default class MenuContainer extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      onSelect: PropTypes.func,
      onCancel: PropTypes.func,
      onFocus: PropTypes.func
    }),
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
    rtl: PropTypes.bool,
    anchor: PropTypes.bool,
    focused: PropTypes.number,
    style: PropTypes.object,
    attrs: PropTypes.object,
    selectedIndex: PropTypes.number,
    role: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      textContent: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) })),
  };

  static defaultProps = {
    isOpen: false,
    rtl: false,
    anchor: false,
    style: {},
    actions: {},
    options: [],
    attrs: {},
    selectedIndex: -1,
    role: "menu"
  };

  constructor(props, context) {
    super(props, context);
    this.items = [];
    this.state = {
      foundationClasses: new ImmutableSet(),
      foundationCssVars: new ImmutableMap(),
      foundationEventListeners: new ImmutableMap(),
      surfaceClasses: new ImmutableSet([SURFACE_CLASS,'mdc-list']),
      surfaceCssVars: new ImmutableMap(),
      isOpen: props.isOpen,
      previousFocus: false,
      loaded: false,
      anchor: props.anchor,
      selectedIndex: props.selectedIndex,
      rtl: props.rtl,
      actions: props.actions,
    };


    this.adapter = new MenuAdapter(this);
    this.foundation = new MDCMenuFoundation(
      this.adapter.toObject(
        MDCMenuFoundation.defaultAdapter
      )
    )


  }

  static childContextTypes = {
    isOpen: PropTypes.bool.isRequired,
    itemsRef: PropTypes.func.isRequired,
    surfaceClassName: PropTypes.string
  };

  getChildContext() {
    return {
      surfaceClassName: this.props.surfaceClassName,
      isOpen: this.state.isOpen,
      itemsRef: (el,i) => this.items[i] = el
    }
  }

  componentDidMount() {
    this.foundation.init();
    if (this.props.isOpen) {
      this.foundation.open(this.props.selectedIndex || 0)
    }
    if (this.props.hasOwnProperty('menuRef')) {
      this.props.menuRef(this);
    }
  }

  componentWillUnmount() {
   this.setState({ isOpen: false, loaded: false})
    this.foundation.destroy();
    if (this.props.hasOwnProperty('menuRef')) {
      this.props.menuRef(undefined);
    }
  }

  componentWillReceiveProps(np) {
    const {props,} = this;
    if (np.selectedIndex !== this.state.selectedIndex) {
      this.setState({selectedIndex: np.selectedIndex})
    }

    if (np.isOpen && !props.isOpen) {
      this.foundation.open(np.selectedIndex || 0)
    }

    if (!np.isOpen && props.isOpen) {
      this.foundation.close()
    }

  }

  componentDidUpdate(pp) {
    if (pp.focused !== this.props.focused) {
      const { focused } = this.props;
      if (typeof focused === 'number' && focused > -1) {
        //this.foundation.adapter_.focusItemAtIndex(focused);
      }
    }
  }

  render() {
    const { surfaceClasses, surfaceCssVars, ...state} = this.state;

    const className = classnames(...state.foundationClasses.toJS(),
      this.props.className,BASE_CLASS_NAME)

    const cssStyles = toStyle({
      ...state.foundationCssVars.toJS(),
      ...this.props.style
    });

    const actions = makeActions(this.props.actions,state.foundationEventListeners.toJS())(this.foundation)
    return (
        <div
          {...this.props.attrs}
          className={className}
          style={cssStyles}
          tabIndex="-1"
          ref={el => this.foundationEl = el}
          dir={this.state.rtl ? 'rtl' : 'ltr'}
          {...actions}
        ><MenuSurface
          role={this.props.role}
          className={surfaceClasses.toJS().join(' ')}
          style={surfaceCssVars}
          surfaceRef={el => this.surfaceEl = el}
         >{this.props.options.map((item,i) =>
            <Item
              onSelect={actions.onSelect}
              tabIndex={state.isOpen ? 0 : -1}
              role={this.props.role === 'menu' ? 'menuitem' : 'option'}
              disabled={state.selectedIndex === i}
              id={`menu-${item.textContent}`}
              key={`menu-key-${item.textContent}`}
              index={i.toString()}
              iconBefore={item.iconBefore || undefined}
              iconAfter={item.iconAfter || undefined }
            >{item.textContent}</Item>
          )
         }


          {this.props.children}</MenuSurface>
        </div>

    )
  }
}
