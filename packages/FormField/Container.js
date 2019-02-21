import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Map as ImmutableMap, } from 'immutable'
import { MDCFormFieldFoundation } from '@material/form-field';
import FormFieldAdapter from './adapter';
import {BASE_CLASS,ALIGN_END} from './constants';
import * as classnames from "classnames";
import {makeActions} from "../util";
import CheckBox from "../Checkbox";
import Radio from "../Radio";

export default class Container extends PureComponent{

  static propTypes = {
    alignEnd: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    classNames: PropTypes.string,
    type: PropTypes.oneOf(['checkbox','radio']).isRequired,
    actions: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  static defaultProps = {
    alignEnd: false,
    classNames: '',
    disabled: false,
  }

  constructor(props) {
    super(props);
      this.state = {
        foundationEventListeners: new ImmutableMap(),
      };

      this.adapter = new FormFieldAdapter(this);
      this.foundation = new MDCFormFieldFoundation(
        this.adapter.toObject(MDCFormFieldFoundation.defaultAdapter)
      );
    }


  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  render() {
    const {children, title, classNames,alignEnd,id,label,type,...otherProps} = this.props;
    const actions = makeActions({},this.state.foundationEventListeners.toJS())();
    return (
    <div className={classnames(BASE_CLASS,classNames,{[ALIGN_END]:alignEnd})}>
      {type === 'checkbox'
        ? <CheckBox ref={el => this.component = el} id={id} {...otherProps}/>
        : <Radio ref={el => this.component = el} id={id} {...otherProps}/>
      }
      <label htmlFor={id} title={title} {...actions}>{label}</label>
    </div>
  );

  }
}

