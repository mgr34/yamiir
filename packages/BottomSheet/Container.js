import React,{PureComponent} from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';
import {BASE_CLASS,FOUNDATION_CLASS,EXPANDED_CLASS,OPEN} from './constants';
import { BottomSheetAdapter } from  './adapter';
import  { MDCBottomSheetFoundation } from './foundation';
import './mdc-bottom-sheet.css';
import {makeActions, toStyle} from "../util";

class Container extends PureComponent {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    touchEnabled: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
    isExpanded: false,
    touchEnabled: true,
  };

  constructor(props) {
    super(props);
    const isSideSheet = (window && window.innerWidth) >= 960;
    this.state = {
      isSideSheet,
      isOpen: false,
      isExpanded:  isSideSheet,
      foundationClasses:
        isSideSheet || !props.touchEnabled
          ? new ImmutableSet([BASE_CLASS,EXPANDED_CLASS])
          : new ImmutableSet([BASE_CLASS]),
      foundationEventListeners: new ImmutableMap(),
      foundationStyles: new ImmutableMap(),
      position: 0,
    };

    this.foundationEl = React.createRef();
    this.adapter = new BottomSheetAdapter(this);
    this.foundation = new MDCBottomSheetFoundation(
      this.adapter.toObject(
        MDCBottomSheetFoundation.defaultAdapter
      ),props.touchEnabled
    )

  }

  static getDerivedStateFromProps = (np,ps) =>  {
    if (window && window.innerWidth >= 960) {
      return np.isOpen !== ps.IsOpen ? {isOpen: np.isOpen} : {}
    }

    return  ['isOpen','isExpanded'].reduce((a,b) =>
      np[b] !== ps[b]
        ? {...a,[b]: np[b]}
        : {...a}
    ,{}
    )
  }

  componentDidMount() {
    this.foundation.init();
    if (this.state.isOpen) {
      this.foundation.show();
    }
    window.addEventListener('resize',this.handleResize)
    window.addEventListener('keydown',this.handleKeyDown)
  }

  componentWillUnmount() {
    this.foundation.destroy();
    window.removeEventListener('resize',this.handleResize)
    window.removeEventListener('keydown',this.handleKeyDown)
  }

  componentDidUpdate(pp,ps) {
    const {state,} = this;
    if (!ps.isOpen && state.isOpen ) {
      this.foundation.show();
    }

    if (ps.isOpen && !state.isOpen) {
      this.foundation.hide();
    }

    //check to ensure window to resize, and ps.isSideSheet otherwise will
    // add scroll-lock
    if (!ps.isExpanded && state.isExpanded && (ps.isSideSheet === state.isSideSheet)) {
      this.foundation.expand()
    }
  }

  handleKeyDown = e => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      this.foundation.hide();
    }
  }

  handleResize = () => {
    if (!window || this.state.isOpen) { return; }

    const isSideSheet = (window && window.innerWidth) >= 960;
    if (isSideSheet) {
      this.foundation.adapter_.removeScrollLock();
      return this.setState({
        isSideSheet,
        isExpanded: isSideSheet,
        foundationClasses:
          isSideSheet || !this.props.touchEnabled
            ? new ImmutableSet([BASE_CLASS,EXPANDED_CLASS])
            : new ImmutableSet([BASE_CLASS])
      });
    }

    if (!isSideSheet && this.state.isSideSheet) {
      return this.setState({isSideSheet: false, isExpanded: false, foundationClasses: new ImmutableSet([BASE_CLASS])})
    }

  };

  render() {
    const actions = makeActions({},this.state.foundationEventListeners.toJS(),false)();
    const style = toStyle(this.state.foundationStyles.toJS());
    return (
      <aside
        {...actions}
        id={this.props.id}
        ref={this.foundationEl}
        style={style}
        className={classnames(this.props.className,this.state.foundationClasses.toJS())}>
          <div
            className={FOUNDATION_CLASS}>
            {this.foundation.adapter_.hasClass(OPEN) ? this.props.children : null}
          </div>
      </aside>
    )
  }
}

export default Container;
