import React from 'react';
import PropTypes from 'prop-types';
import {BASE_CLASS} from './cosntants';
import {makeActions, toStyle} from "../util";
import {  Set as ImmutableSet, Map as ImmutableMap} from 'immutable';

class Container extends React.PureComponent {

  static propTypes = {
    isRTL: PropTypes.bool,
  }

  static defaultProps = {
    isRTL: false,
  }

  state = {
    foundationClasses: new ImmutableSet([BASE_CLASS]),
    foundationStyles: new ImmutableMap(),
    previousFocus: false,
  }

  render() {
    return <span/>
  }
}
