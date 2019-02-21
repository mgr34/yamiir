import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { LineRippleAdapter } from "./adapter";
import { MDCLineRippleFoundation } from "@material/line-ripple/dist/mdc.lineRipple.min";
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable'
import { makeActions, toStyle } from "../util";
import { BASE_CLASS } from "./constants";

export default class Container extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    actions: PropTypes.object,
  };

  static defaultProps = { actions: {}, };

  constructor(props) {
    super(props);
    this.state = {
      foundationClasses: props.className
        ? new ImmutableSet([BASE_CLASS,props.className])
        : new ImmutableSet([BASE_CLASS]),
      foundationEventListeners: new ImmutableMap(),
      foundationAttrs: new ImmutableMap(),
    };
    this.adapter = new LineRippleAdapter(this);
    this.foundation = new MDCLineRippleFoundation(
      this.adapter.toObject(MDCLineRippleFoundation.defaultAdapter)
    );

  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentWillReceiveProps(np) {
    const {props,state} = this;
    if (props.className !== np.className) {
      this.setState({
        foundationClasses: np.className === undefined
          ? state.foundationClasses.remove(props.className)
          : state.foundationClasses.add(np.className)
      })
    }
  }

  render() {
    const {
      foundationClasses,
      foundationEventListeners,
      foundationAttrs,
    } = this.state;
    return (
      <div
        className={foundationClasses.toJS().join(' ')}
        style={toStyle(foundationAttrs.toJS())}
        {...makeActions(this.props.actions,foundationEventListeners.toJS())(this.foundation)}
        />
    )
  }


}