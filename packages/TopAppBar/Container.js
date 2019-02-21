import React from 'react';
import PropTypes from 'prop-types';
import {
  MDCTopAppBarFoundation,
  MDCFixedTopAppBarFoundation,
  MDCShortTopAppBarFoundation,
} from '@material/top-app-bar/dist/mdc.topAppBar';
import  { TopAppBarAdapter} from "./adapter";
import classnames from 'classnames'
import { toStyle } from '../util';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import {BASE_CLASS} from './constants';

class Container extends React.PureComponent {
  static propTypes = {
    type: PropTypes.oneOf([
      'standard',
      'short',
      'short-collapsed',
      'fixed',
      'dense',
      'prominent',
      'disconnected' // w/o Foundation
    ]).isRequired,
    className: PropTypes.string,
    scrollTarget: PropTypes.object,
    actionItems: PropTypes.array,
    onNavIconClick: PropTypes.func
  };

  static defaultProps = {
    type: 'standard',
    scrollTarget: window,
    actionItems: [],
    className: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      foundationClasses: new ImmutableSet(this._initClassNames()),
      foundationStyles: new ImmutableMap(),
      navIconEventListeners: new ImmutableMap(),
      scrollTargetEventListeners: new ImmutableMap(),
    };
    this.foundationEl = React.createRef();
    this.adapter = new TopAppBarAdapter(this);
  }

  _initClassNames = () => {
    const {type, className} = this.props;
    const resp = type === 'standard'
      ? [BASE_CLASS, className]
      : [BASE_CLASS, `${BASE_CLASS}--${type}`,className];
    return resp.filter(i => i);
  };

   _composeFoundation = () => {
    const type = this.props.type;
    if (type === 'disconnected') {
      return null;
    }

    if (type === 'fixed') {
      return  new MDCFixedTopAppBarFoundation(
        this.adapter.toObject(
          MDCFixedTopAppBarFoundation.defaultAdapter
        ))
    }

    if (type === 'short' || type === 'shortCollapsed') {
      return new MDCShortTopAppBarFoundation(
        this.adapter.toObject(
          MDCShortTopAppBarFoundation.defaultAdapter
        )
      )
    }

    return new MDCTopAppBarFoundation(
      this.adapter.toObject(
        MDCTopAppBarFoundation.defaultAdapter
      )
    )
  };


  componentDidMount() {
      this.foundation = this._composeFoundation();
    if (this.foundation) {
      this.foundation.init();
    } else if (!this.foundaiton && typeof this.props.onNavIconClick === 'function') {
      this.setState({
        navIconEventListeners: this.state.navIconEventListeners.update(
          'click',
          ImmutableSet(),
          x => x.add(this.props.onNavIconClick)
        )
      })
    }
  }

  componentWillUnmount() {
    if (this.foundation) {
      this.foundation.destroy();
    }
  }

  componentDidUpdate(pp,ps) {

    if (pp.type !== this.props.type) {
      if (this.foundation) { this.foundation.destroy(); }

      this.adapter = new TopAppBarAdapter(this);
      this.foundation = this._composeFoundation();
      if (this.foundation) { this.foundation.init(); }

      this.setState({
        foundationClasses: new ImmutableSet(this._initClassNames())
      })
    }
  }


  render() {
    const { foundationClasses, foundationStyles, } = this.state;
    const { className } = this.props;
    return (
      <header
        className={classnames([className,foundationClasses.toJS()])}
        style={toStyle(foundationStyles.toJS())}
        ref={this.foundationEl}
      >
        <ActionItemsContext.Provider value={this.props.actionItems}>
          <NavIconContext.Provider value={this.state.navIconEventListeners}>
            {this.props.children}
          </NavIconContext.Provider>
        </ActionItemsContext.Provider>
      </header>
    )
  }
}

export default Container;
export const ActionItemsContext = React.createContext([]);
export const NavIconContext = React.createContext(new ImmutableMap());

