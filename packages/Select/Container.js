import React, {Component} from 'react';
import  PropTypes  from 'prop-types';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

import { MDCSelectFoundation } from '@material/select/dist/mdc.select';

import { SelectAdapter } from "./adapater";
import classnames from 'classnames';
import { BASE_CLASS, NATIVE_CONTROL } from './constants';

import { shallowCompare, makeActions, } from "../util";
import Label from "../FloatingLabel";
import LineRipple from "../LineRipple";

export default class SelectContainer extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    selectedIndex: PropTypes.number,
    onChange: PropTypes.func,
    actions: PropTypes.object,
    isRtl: PropTypes.bool,
  };

  static defaultProps = {
    options: [],
    label: '',
    selectedIndex: -1,
    actions: {},
    isRtl: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedIndex: props.selectedIndex,
      foundationClasses: new ImmutableSet([BASE_CLASS]),
      foundationEventListeners: new ImmutableMap(),
    };

    this.adapter = new SelectAdapter(this);
    this.foundation = new MDCSelectFoundation(
      this.adapter.toObject(MDCSelectFoundation.defaultAdapter)
    );
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.foundation.init();
    if (this.props.selectedIndex >= 0 && this.labelEl) {
      this.labelEl.foundation.float(true);
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  handleChange(e) {
    const { options } = this.props;
    let value = options.filter((o,i) => String(o.value) === e.target.value)[0];
    let selectedIndex = options.indexOf(value);
    this.setState({selectedIndex},() => {
      this.props.onChange(selectedIndex)
    })
  }

  componentWillReceiveProps(np) {
    if (np.selectedIndex !== this.state.selectedIndex) {
      this.setState({selectedIndex: np.selectedIndex});
    }
  }

  shouldComponentUpdate(np,ns) {
    return !shallowCompare(np,this.props,'selectedIndex')
      || !shallowCompare(np,this.props,'options')
      || !shallowCompare(ns,this.state,'foundationClasses',true)
      || !shallowCompare(ns,this.state,'foundationEventListeners',true)
  }

  render() {

    const {id,label,options,} = this.props;

    const cssClasses = classnames(
      ...this.state.foundationClasses.toJS(),
      BASE_CLASS,
      this.props.className
    );

    const {
      disabled,
      foundationEventListeners,
      selectedIndex
    } = this.state;

      let ev = foundationEventListeners.toJS()
      const actions = makeActions(
          this.props.actions,
          Object.keys(ev).filter(n => n !== 'change').reduce((a,b) => ({
          ...a,[b]: ev[b]
        }),{})
        )(this.foundation);

    return (
      <div className={cssClasses}>
        <select
          {...actions}
          className={NATIVE_CONTROL}
          disabled={disabled}
          value={options[selectedIndex].value}
          onChange={this.handleChange}

        >{options.map(({textContent,value},i) => (
            <option key={id + '-' +i} className={value} value={value}>{textContent}</option>
          ))}
        </select>
        <Label
          hasIndex={selectedIndex >= 0}
          id={id}
          ref={el => this.labelEl = el}
        >{label}</Label>
        <LineRipple ref={el => this.bottomLineEl = el}/>
      </div>
    )
  }


}

