import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import TabBar from "../index";
import classnames from 'classnames';
//import { MDCTabScrollerFoundation } from '@material/tab-scroller';
import TabBarScrollerAdapter from './adapter'
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import {
  BASE_CLASS,
  INDICATOR_BACK,
  INDICATOR_CLASS,
  INDICATOR_FORWARD, INDICATOR_INNER, SCROLL_FRAME, SCROLL_FRAME_TABS
} from "./constants";
import {makeActions} from "../../util";

class Container extends PureComponent {

  static propTypes = {
    tabs: PropTypes.array.isRequired,
    activeIndex: PropTypes.number,
    classNames: PropTypes.string,
    onSelect: PropTypes.func,
  }

  state = {
    foundationClasses: new ImmutableSet([BASE_CLASS]),
    foundationEventListeners: new ImmutableMap(),
    forwardIndicatorClasses: new ImmutableSet([INDICATOR_CLASS,INDICATOR_FORWARD]),
    forwardIndicatorEventListeners: new ImmutableMap(),
    backIndicatorClasses: new ImmutableSet([INDICATOR_BACK,INDICATOR_CLASS]),
    backIndicatorEventListeners: new ImmutableMap(),
  };

  adapter = new TabBarScrollerAdapter(this);
  /*foundation = new MDCTabBarScrollerFoundation(
    this.adapter.toObject(MDCTabBarScrollerFoundation.defaultAdapter)
  );*/

  componentDidMount = () => {
    this.foundation.init();


  };

  componentWillUnmount = () => {
    this.foundation.destroy();
  }


  componentDidUpdate = (pp,ps)  => {
    if (this.state.foundationEventListeners.size > 0
      && ps.foundationEventListeners.size === 0
      && this.props.activeIndex > 0 ) {

      //TODO -- why is this necessary?
      setTimeout(() => this.foundation.scrollToTabAtIndex(this.props.activeIndex,false), 1);
    }
  };

  actions = (state) => ({
    actions: makeActions({},state.foundationEventListeners.toJS())(),
    backActions: makeActions({},state.backIndicatorEventListeners.toJS())(),
    forwardActions: makeActions({},state.forwardIndicatorEventListeners.toJS(),false)(),
  });

   classes = (state) => ({
    foundationClasses: classnames(state.foundationClasses.toJS()),
    backIndicatorClasses: classnames(state.backIndicatorClasses.toJS()),
    forwardIndicatorClasses: classnames(state.forwardIndicatorClasses.toJS()),
  });

   renderedState =  () => ({
    ...this.actions(this.state),
    ...this.classes(this.state),
  });

  render() {
    const rs =  this.renderedState();
    return (
      <div
        dir={this.props.isRTL ? 'rtl' : 'ltr'}
        className={rs.foundationClasses}
        {...rs.actions}
      ><div className={rs.backIndicatorClasses} {...rs.backActions}>
          <a
            tabIndex={0}
            className={`${INDICATOR_INNER} material-icons`}
            aria-label="scroll back button"
          >navigate_before</a>
        </div>
        <div ref={ el => this.scrollFrameEl = el} className={SCROLL_FRAME}>
          <TabBar
            className={SCROLL_FRAME_TABS}
            ref={el => this.tabBar = el}
            {...this.props}/>
        </div>
        <div className={rs.forwardIndicatorClasses} {...rs.forwardActions}>
          <a
            tabIndex={0}
            className={`${INDICATOR_INNER} material-icons`}
            aria-label="scroll forward button"
          >navigate_next</a>
        </div>
      </div>
    )
  }
}

export default Container;
