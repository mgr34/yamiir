import React, {PureComponent} from 'react';
import  PropTypes  from 'prop-types';
import classnames from 'classnames';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import { MDCChipSetFoundation } from '@material/chips/dist/mdc.chips.min';
import {ChipSetAdapter} from "./adapter";
import {BASE_CLASS,FILTER_CLASS,SELECTED_CLASS,CHOICE_CLASS} from './constants'
import {makeActions} from "../../util";
import Chip from "../Chip/index";


export default class Container extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    chips: PropTypes.array,
    isFilter: PropTypes.bool,
    isChoice: PropTypes.bool,
    isPreSelected: PropTypes.bool,
  };

  static defaultProps = {
    isFilter: false,
    isChoice: false,
    chips: [],
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      foundationEventListeners: new ImmutableMap(),
      foundationClasses: new ImmutableSet(
        classnames(BASE_CLASS, {
          [SELECTED_CLASS]: props.isPreSelected,
          [FILTER_CLASS]: props.isFilter,
          [CHOICE_CLASS]: props.isChoice,
        }).split(' ')
      ),
      chips: props.chips,
    };
    this.adapter = new ChipSetAdapter(this);
    this.foundation = new MDCChipSetFoundation(
      this.adapter.toObject(MDCChipSetFoundation.defaultAdapter)
    );
  }

  componentDidMount() {
    this.foundation.init()
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  render() {
    const isFilter = this.props.isFilter;
    const actions = makeActions({},this.state.foundationEventListeners.toJS())()
    return (
      <div
        className={this.state.foundationClasses.toJS().join(' ')}>
        {this.state.chips.map((chip,i) =>(
          <Chip
            key={chip.text+'-'+i}
            isFilterChip={isFilter}
            {...actions}
            {...chip}/>
        ))}
      </div>
    )
  }

}
