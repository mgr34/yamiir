import React, {Component} from 'react';
import  PropTypes  from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

import { MDCChipFoundation } from '@material/chips/dist/mdc.chips.min';

import {ChipAdapter} from "./adapter";
import classnames from 'classnames';
import {
  BASE_CLASS,
  TEXT_CLASS,
  ICON_CLASS,
  TRAILING_ICON,
  LEADING_ICON,
  CHECKMARK,
  CHECKMARK_SVG,
  CHECKMARK_PATH, }
from './constants';

import {makeActions, toStyle,} from "../../util";
import Ripple from "../../Ripple/index";
import Icon from '../../Icon/index';

export default class Container extends Component {

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    leadingIcon: PropTypes.string,
    trailingIcon: PropTypes.string,
    isFilterChip: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    actions: {},
    isFilterChip: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      foundationClasses: new ImmutableSet([BASE_CLASS]),
      iconClasses: new ImmutableSet([ICON_CLASS,LEADING_ICON]),
      foundationEventListeners: new ImmutableMap(),
      iconEventListeners: new ImmutableMap(),
      foundationStyles: new ImmutableMap(),
    };

    this.classes = this.classes.bind(this);
    this.actions = this.actions.bind(this);
    this.adapter = new ChipAdapter(this);
    this.foundation = new MDCChipFoundation(
      this.adapter.toObject(MDCChipFoundation.defaultAdapter)
    );
  }

  componentDidMount() {
    this.foundation.init()
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  classes() {
    const {state,props} = this;
    return classnames(state.foundationClasses.toJS(),props.className)
  }

  actions() {
    const {state,props} = this;
    return makeActions(
      props.actions,
      state.foundationEventListeners.toJS()
    )(this.foundation)
  }

  render() {
    const { leadingIcon,trailingIcon,isFilterChip,text,title} = this.props;
    const { iconClasses,iconEventListeners,foundationStyles} = this.state;
    const className = this.classes();
    const actions = this.actions();
    const trailingIconActions =  makeActions({},iconEventListeners.toJS())();
    return (
      <Ripple>
        <div
          ref={el => this.chipEl = el}
          style={toStyle(foundationStyles.toJS())}
          className={className}
          title={title}
          tabIndex={0}
          {...actions}
        ><ChipIcon name={leadingIcon} className={iconClasses.toJS().join(' ')}/>
          <Checkmark display={isFilterChip}/>
          <div className={TEXT_CLASS}>{text}</div>
          <ChipIcon
            name={trailingIcon}
            actions={trailingIconActions}
            className={classnames(ICON_CLASS,TRAILING_ICON)}
            tabIndex={0}
            role="button"
          />
        </div>
      </Ripple>
    )
  }

}

const Checkmark = ({display}) => !display ? null : (
  <div className={CHECKMARK}>
    <svg className={CHECKMARK_SVG} viewBox="-2 -3 30 30">
      <path
        className={CHECKMARK_PATH}
        fill="none"
        stroke="black"
        d="M1.73,12.91 8.1,19.28 22.79,4.59"
      />
    </svg>
  </div>
);

const ChipIcon = ({name,...props}) => !name ? null : (
  <Icon name={name} {...props} />
);
