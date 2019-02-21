/**
 * Created by matt on 6/26/17.
 */

import React, {PureComponent} from 'react';
import { PropTypes } from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import {
  MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation,
  util,
} from '@material/drawer';
import {DrawerAdapter} from './adapter';
import classnames from 'classnames';
import DrawerSurface from './DrawerSurface';

import { BASE_CLASS, SCRIM_CLASS, TYPE_CLASS } from './constants';


export default class DrawerContainer extends PureComponent {

  static propTypes = {
    type: PropTypes.oneOf(['dismissible','permanent','modal']),
    open: PropTypes.bool.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    type: 'permanent',
    open: false,
    className: ''
  };


  focusTrap = null;
  foundation = null;
  drawerElement = React.createRef();
  prevFocus = null;
  state = { foundationClasses: new ImmutableSet([BASE_CLASS]) };

  componentDidMount() {
    this.initFoundation();
    if (this.props.open && this.foundation) {
      this.foundation.open();
    }
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }

  componentDidUpdate(pp) {
    const {type,open} = this.props;
    if (pp.type !== type) {
      this.initFoundation();
    }

    if (pp.open  !== open) {
      console.log({open})
      return open ? this.foundation.open() : this.foundation.close();
    }
  }

  initFoundation = () => {
    const { type } = this.props;
    if (this.foundation) { this.foundation.destroy() }
    console.log('%c INIT DRAWER FOUNDATION :: %s','font-size: 18px; color:' +
      ' red;',type)
    if (type === 'permanent') { return; }

    this.adapter = new DrawerAdapter(this,);
    if (type === 'dismissible') {
       this.foundation = new MDCDismissibleDrawerFoundation(
         this.adapter.toObject(MDCDismissibleDrawerFoundation.defaultAdapter)
       )
    } else if (type === 'modal') {
      this.initFocusTrap();
      this.foundation = new MDCModalDrawerFoundation(
          this.adapter.toObject(MDCModalDrawerFoundation.defaultAdapter)
        )
    }

    return this.foundation.init()
  };

  initFocusTrap = () => {
    console.log('focus trap')
    this.focusTrap = util.createFocusTrapInstance(this.drawerElement.current);
  }

  handleKeyDown = e => {
    if (this.foundation) {
      this.foundation.handleKeydown(e)
    }
  };

  handleTransitionEnd = e => {
    if (this.foundation) {
      this.foundation.handleTransitionEnd(e)
    }
  };


  get className() {
    const {foundationClasses} = this.state;
    const {type, className} = this.props;
    return classnames(foundationClasses.toJS(),className, TYPE_CLASS[type])
  }


  render() {


    return (
      <React.Fragment>
        <aside
          ref={this.drawerElement}
          dir={this.props.rtl ? 'rtl' : 'ltr'}
          className={this.className}
          onKeyDown={this.handleKeyDown}
          onTransitionEnd={this.handleTransitionEnd}
          aria-hidden={!this.state.open}
        >{this.props.children}
        </aside>
        {this.props.type === 'modal' && this.renderScrim() }
        {this.props.appContent && <div className="mdc-drawer-app-content">{this.props.appContent}</div>}
    </React.Fragment>
    )
  }

  renderScrim = () => (
    <div
      className={SCRIM_CLASS}
      onClick={() => this.foundation.handleScrimClick()}
    />
  )

}



