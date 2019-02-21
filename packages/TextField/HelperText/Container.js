import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { HelpTextAdapter} from "./adapter";
import { MDCTextFieldHelperTextFoundation } from '@material/textfield/dist/mdc.textfield.min';
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable'
import { BASE_CLASS } from "./constants";

export default class Container extends Component {
  static propTypes = {
    content: PropTypes.string,
    id: PropTypes.string.isRequired,
  };

  static defaultProps = {  content: '', };

  constructor(props) {
    super(props);
    this.state = {
      foundationClasses: new ImmutableSet([BASE_CLASS]),
      foundationAttrs: new ImmutableMap(),
      foundationEventListeners: new ImmutableMap(),
      content: props.content,
    };

    this.adapter = new HelpTextAdapter(this);
    this.foundation = new MDCTextFieldHelperTextFoundation(
      this.adapter.toObject(MDCTextFieldHelperTextFoundation.defaultAdapter)
    );
  }


  componentWillReceiveProps(np) {
    const props = this.props;
    if (np.persistent !== props.persistent) {
      this.foundation.setPersistant(np.persistent)
    }
    if (np.validation !== props.validation) {
      this.foundation.setValidation(np.validation)
    }

    if (np.content !== props.content) {
      this.setState({content: np.content})
    }
  }

  componentDidMount() {
    this.foundation.init();
    if (this.props.persistent === true) {
      this.foundation.setPersistent(this.props.persistent);
    }  else {
      this.foundation.hide_();
    }
    if (this.props.validation === true) {
      this.foundation.setValidation(true)
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  render() {
    const { foundationClasses, foundationAttrs, content } = this.state;
    return (
      <p
        id={this.props.id}
        className={foundationClasses.toJS().join(' ')}
        {...foundationAttrs.toJS()}
      >{content}</p>
    )
  }
}

