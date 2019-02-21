import React,{Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MDCTabFoundation } from '@material/tab';
import { TabAdapter}from './adapter';
import {  Set as ImmutableSet, Map as ImmutableMap} from 'immutable';
import {BASE_CLASS,ICON, ICON_TEXT} from './constants';
import Icon from "../../Icon";
import {makeActions} from "../../util";
import Ripple from "../../Ripple/Container";


export default class Tab extends Component {
  static propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    pathName: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      foundationClasses: new ImmutableSet([BASE_CLASS]),
      foundationEventListeners: new ImmutableMap(),
    };

    this.adapter = new TabAdapter(this);
    this.foundation = new MDCTabFoundation(
      this.adapter.toObject(MDCTabFoundation.defaultAdapter)
    );
  }

  componentDidMount() {
    this.foundation.init();
    //TODO: should I really be setting this manually. When does the
    // foundation expecet this to be called? W/o it though onClick will
    // simply load URL
    this.foundation.setPreventDefaultOnClick(true)
  }

  componentWillUnmount() {
    this.foundation.destroy()
  }


  render() {
    const { text, label, icon, pathName} = this.props;
    const className = classnames(this.state.foundationClasses.toJS())
    const allActions = makeActions({},this.state.foundationEventListeners.toJS())(this.foundation)
    switch(true) {
      case (text !== undefined && icon !== undefined):
        return (
          <TabFoundation
            actions={allActions}
            tabRef={el => this.tabEl = el}
            title={text}
            pathName={pathName || text}
            classes={className}>
            <Icon className={ICON} name={icon}/>
            <span className={ICON_TEXT}>{text}</span>
          </TabFoundation>
        )

      case (icon && !text):
        return (
          <TabFoundation
            actions={allActions}
            tabRef={el => this.tabEl = el}
            title={label}
            pathName={pathName || label}
            classes={className}>
            <Icon className={ICON} name={icon} aria-label={label}/>
          </TabFoundation>
        )
      default:
        return  (
        <TabFoundation
          actions={allActions}
          tabRef={el => this.tabEl = el}
          title={text}
          pathName={pathName || text}
          classes={className}>
          {text}
          </TabFoundation>
      )
    }
  }
}

const TabFoundation = ({tabRef,actions,pathName,title,classes,children}) =>
  <Ripple prefix={false} accent>
  <a
    href={pathName}
    tabIndex={0}
    ref={tabRef}
    className={classes}
    title={title}
    {...actions}
  >{children}</a>
  </Ripple>

