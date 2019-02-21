import React from 'react';
import PropTypes from 'prop-types';
import Ripple from "../Ripple/Container";

class Container extends React.PureComponent {

  static propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string,
    ripple: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    ripple: false,
  }


  render() {
    const {ripple,...props} = this.props;
    const BASE_CLASS = 'mdc-icon-button material-icons';
    const className = props.className
      ? `${props.className} ${BASE_CLASS}`
      : BASE_CLASS;

    return ripple
      ? <Ripple unbounded><Button {...props} className={className}/></Ripple>
      : <Button {...props} className={className}/>
  }

}

export default Container;

const Button = ({icon,...props}) => (
  <button {...props}>{icon}</button>
)