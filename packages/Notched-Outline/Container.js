import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import { OutlineAdapter } from "./adapter";
import { MDCNotchedOutlineFoundation } from '@material/notched-outline/dist/mdc.notchedOutline.min';
import { Map as ImmutableMap, Set as ImmutableSet} from 'immutable'
import { BASE_CLASS, IDLE, PATH} from "./constants";
import RippleWrapper from "../TextField/RippleWrapper";

export default class Container extends PureComponent {
  static propTypes = {
    rippleAdapter: PropTypes.shape({
      isSurfaceActive: PropTypes.func,
      registerInteractionHandler: PropTypes.func,
      deregisterInteractionHandler: PropTypes.func
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      outlinePathAttrs: new ImmutableMap(),
      foundationClasses: new ImmutableSet([BASE_CLASS])
    };

    this.adapter = new OutlineAdapter(this);
    this.foundation = new MDCNotchedOutlineFoundation(
      this.adapter.toObject(MDCNotchedOutlineFoundation.defaultAdapter)
    );
  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  render() {
    const { outlinePathAttrs, foundationClasses} = this.state;
    const { rippleAdapter } = this.props;

    return (
      <React.Fragment>
        <RippleWrapper rippleAdapter={rippleAdapter}>
          <div
            ref={el => this.outlineEl = el}
            className={foundationClasses.toJS().join(' ')}
          ><svg>
              <path className={PATH} {...outlinePathAttrs.toJS()}/>
            </svg>
          </div>
        </RippleWrapper>
      <div ref={el => this.idleOutlineEl = el} className={IDLE}/>
    </React.Fragment>
    )
  }
}

