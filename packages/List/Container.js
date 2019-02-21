import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {MDCListFoundation} from '@material/list/dist/mdc.list';
import {ListAdapter} from "./adapter";

export default class Container extends PureComponent {
  static propTypes = {
    twoLine: PropTypes.bool,
    items: PropTypes.array,
    singleSelection: PropTypes.bool,
    wrapFocus: PropTypes.bool,
  };

  static defaultProps = {
    twoLine: false,
    singleSelection: false,
    wrapFocus: true,
    items: [],
  };

  foundation = null;
  adapter = null;
  state = {

  };

  componentDidMount() {
    const { singleSelection, wrapFocus, } = this.props;
    this.adapter = new ListAdapter(this);
    this.foundation = new MDCListFoundation(
      this.adapter.toObject(MDCListFoundation.defaultAdapter)
    );
    this.foundation.init();
    this.foundation_.setSingleSelection(singleSelection);
    this.foundation_.setWrapFocus(wrapFocus)

  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  handleClick = (e,index) => {
    this.foundation.handleClick(e,index)
  };


  render() {
    return (
      <ul
        className="mdc-list"
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      >

      </ul>
    )
  }

}
