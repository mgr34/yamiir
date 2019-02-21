import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MDCTabBarFoundation } from '@material/tab-bar';
import TabBarAdapter from './adapter'
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import {INDICATOR,BASE_CLASS} from "./constants";
import {toStyle, insert, } from "../util";
import Tab from './Tab/index'

export default class TabsContainer extends PureComponent {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    activeIndex: PropTypes.number,
    classNames: PropTypes.string,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    tabs:[],
    activeIndex: -1,
  };

  constructor(props) {
    super(props);

    this.state = {
      foundationClasses: new ImmutableSet([props.className,BASE_CLASS]),
      foundationStyles: new ImmutableMap(),
      indicatorStyles: new ImmutableMap(),
      className: {},
    };

    this.tabs = [];
    this.adapter = new TabBarAdapter(this);
    this.foundation = new MDCTabBarFoundation(
        this.adapter.toObject({
            ...MDCTabBarFoundation.defaultAdapter,
            _updateCssVariable: () => {}, //scroller variant needs style
          }
        )
    );
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this.foundation.init();

    const { activeIndex } = this.props;
    if (activeIndex >= 0) {
      this.foundation.switchToTabAtIndex(activeIndex,true)
    }
  }

  componentWillUnmount() {
    this.foundation.destroy()
  }


  componentDidUpdate(pp,ps) {
    const {state} = this;
    if (!state.foundationClasses.equals(ps.foundationClasses)) {
      this.setState({className: classnames(state.foundationClasses.toJS())})
    }

    const {activeIndex} = this.props;
    if (activeIndex >= 0 && pp.activeIndex !== activeIndex) {
      this.foundation.switchToTabAtIndex(activeIndex,true)
    }

  }

  onSelect({tab}) {
    const indexOfTab = this.tabs.indexOf(tab.element);
    if (indexOfTab < 0) {
      throw new Error('Invalid tab component given as activeTab: ' +
        'Tab not found within this component\'s tab list');
    }

    this.foundation.switchToTabAtIndex(indexOfTab,true);
    if (this.props.hasOwnProperty('onSelect')) {
      this.props.onSelect(indexOfTab)
    }


  }


  render() {
    const {tabs} = this.props;
    return (
      <nav
        ref={el => this.foundationEl = el}
        className={this.state.className}
        style={toStyle(this.state.foundationStyles.toJS())}
      >
        {tabs.map((tab,i) =>
          <Tab
            onSelect={this.onSelect}
            key={`tab-${i}`}
            ref={el => el ? this.tabs = insert(this.tabs, i, el) : null} {...tab}/>

        )}
        <span
          ref={el => this.indicatorEl = el}
          className={INDICATOR}
          style={toStyle(this.state.indicatorStyles.toJS())}/>
      </nav>
    )
  }

}
