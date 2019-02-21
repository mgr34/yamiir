/**
 * Created by matt on 6/12/17.
 */

import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable'
import { DialogAdapterImpl } from './adapter';
import classnames from 'classnames';
import NativeDOM from '../Base/NativeDOM';
import DialogSurface from './Surface';
import createFocusTrap from 'focus-trap';
import { MDCDialogFoundation } from '@material/dialog/dist/mdc.dialog';

import { BASE_CLASS_NAME } from './constants';

const CLASS_NAME = BASE_CLASS_NAME;

const propertyClassNames = {
  PREFIX: CLASS_NAME,
  OPEN: `${CLASS_NAME}--open`,
  DARK: `${CLASS_NAME}--theme-dark`,
};


export default class DialogContainer extends PureComponent {
  static propTypes = {
    dark: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
    active: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
    dark: false,
    active: true,
    onAccept: (...args) => console.log({ACCEPT: args}),
    onCancel: (...args) => console.log({CANCEL: args}),
  };

  static childContextTypes = {
    id: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    acceptRef: PropTypes.func,
    cancelRef: PropTypes.func

  };


  constructor(props,context) {
    super(props,context);

    this.adapter = new DialogAdapterImpl(this);
    this.foundation = new MDCDialogFoundation(
      this.adapter.toObject(MDCDialogFoundation.defaultAdapter)
    );

    this.state = {
      foundationClasses: new ImmutableSet(),
      surfaceClasses: new ImmutableSet(),
      foundationCssVars: new ImmutableMap(),
      foundationEventListeners: new ImmutableMap(),
      surfaceEventListeners: new ImmutableMap(),
      open: this.props.open,
      focusTrap: false,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);

  }

  componentDidMount() {
    this.foundation.init();
    this.setState({
      focusTrap: createFocusTrap(this.surfaceEl,
        {
          initialFocus: this.acceptButton.refs.nativeCb || false,
          clickOutsideDeactivates: true
        })
    });

    if (this.state.open) {
      this.foundation.open();
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentWillReceiveProps(props) {
    if (!!props.open !== !!this.state.open) {
      if (props.open) {
        this.setState({open: props.open})
        this.foundation.open();
      } else {
        this.setState({open: props.open})
        this.foundation.close();
      }
    }
    if (!!props.active !== !!this.props.active) {
      if (!this.props.active) {
       this.state.focusTrap.activate()
      }
    }
  }



  getChildContext() {
    return {
      id: this.props.id,
      onAccept: this.props.onAccept,
      onCancel: this.props.onCancel,
      acceptRef: el => this.acceptButton = el,
      cancelRef: el => this.cancelButton = el
    }
  }


  handleKeyDown(e) {
    if (this.props.active) {
      this.foundation.documentKeydownHandler_(e)
    }
  }

  render() {
    const className = classnames({
      [propertyClassNames.PREFIX]: true,
      [propertyClassNames.OPEN]: this.props.open,
      [propertyClassNames.DARK]: this.props.dark,
    }).split(' ').filter(item => !!item);


    const cssVariables = {
      ...this.state.foundationCssVars.toJS(),
    };
    const cssClasses = [
      ...this.state.foundationClasses.toJS(),
      ...className,
      this.props.className

    ];
    const eventListeners = {
      ...this.state.foundationEventListeners.toJS(),
    };

    const { surfaceClasses, surfaceEventListeners} = this.state;
    return (

      <NativeDOM
        cssVariables={cssVariables}
        cssClasses={cssClasses}
        eventListeners={eventListeners}
      >
      <aside
        onKeyDown={this.handleKeyDown}
        role="alertdialog"
        className="mdc-dialog"
        aria-hidden={!this.state.open}
        aria-labelledby={this.props.id + '-label'}
        aria-describedby={this.props.id + '-description'}>

          <DialogSurface
            classes={surfaceClasses}
            events={surfaceEventListeners}
            surfaceRef={el => this.surfaceEl = el}>
            {this.props.children}
          </DialogSurface>
        <div className="mdc-dialog__backdrop" onClick={() =>
          this.props.active ?  this.props.onCancel() : null
        }/>
       </aside>
      </NativeDOM>
    )
  }

}

