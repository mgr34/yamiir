import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { IconAdapter } from "./adapter";
import { MDCTextFieldIconFoundation } from '@material/textfield/dist/mdc.textfield.min';
import { Map as ImmutableMap, } from 'immutable'
import { makeActions, } from "../../util";
import { BASE_CLASS } from "./constants";

export default class Container extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      content: props.name,
      className: 'material-icons ' + BASE_CLASS,
      foundationAttrs: new ImmutableMap({tabIndex:props.onSelect ? 0 : -1}),
      foundationEventListeners: new ImmutableMap(),
    };
    this.adapter = new IconAdapter(this);
    this.foundation = new MDCTextFieldIconFoundation(
      this.adapter.toObject(MDCTextFieldIconFoundation.defaultAdapter)
    );
  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

 componentDidUpdate(pp) {
    if (pp.name !== this.props.name) {
      this.setState({content: this.props.name})
    }
 }

  render() {
    const {
      foundationEventListeners,
      foundationAttrs,
      className
    } = this.state;
    const actions = makeActions({},foundationEventListeners.toJS())(this.foundation);
    return (
      <i
        className={className}
        {...actions}
        {...foundationAttrs.toJS()}
      >{this.state.content}</i>
    )
  }
}
