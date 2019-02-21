import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SECTION_CLASS } from './constants'
import {ActionItemsContext, NavIconContext} from "./Container";
import {makeActions} from "../util";
import Ripple from "../Ripple/Container";

const propTypes = {
  align: PropTypes.oneOf(['start','end']),
  className: PropTypes.string,
  withNavIcon: PropTypes.bool.isRequired,
  withActionItems: PropTypes.bool.isRequired,
  navIcon: PropTypes.string,
};

const Section = ({align,className,withNavIcon,withActionItems,...props}) => (
  <section
    className={classnames(SECTION_CLASS,className,{
      [`${SECTION_CLASS}--align-start`]: align === 'start',
      [`${SECTION_CLASS}--align-end`]: align === 'end'})}
    role={withActionItems ? 'toolbar' : undefined}
  >{withNavIcon && <NavIcon icon={props.navIcon}/>}
    {withActionItems && <ActionItems/>}
    {props.children}
  </section>
);

Section.defaultProps = {
  navIcon: 'menu',
  withNavIcon: false,
  withActionItems:  false
};

Section.propTypes = propTypes;
export default Section;

const NavIcon = (props) => (
  <NavIconContext.Consumer>
    {actions =>
      ( <Ripple unbounded>
        <a
          {...makeActions({}, actions.toJS(), false)()}
          tabIndex={0}
          className="material-icons mdc-top-app-bar__navigation-icon"
        >{props.icon}</a>
      </Ripple>
      )
    }
  </NavIconContext.Consumer>
)

const ActionItems = () =>
  <ActionItemsContext.Consumer>
    {icons => icons.map(icon =>
      <ActionItem {...icon} key={icon.iconName}/>
    )}
  </ActionItemsContext.Consumer>

const ActionItem = ({tooltip,className='',...props}) =>
  tooltip
    ? <Tooltip className={className} tooltip={tooltip}>
        <Item {...props}/>
      </Tooltip>
    : <Item {...props}/>


const Tooltip = ({tooltip,className,children}) => (
  <span className={`tooltip ${className}`} data-title={tooltip}>
    {children}
  </span>
) ;

const Item = ({label,onClick,iconName}) => (
  <Ripple unbounded>
  <a
    tabIndex={0}
    className='material-icons mdc-top-app-bar__action-item'
    aria-label={label}
    alt={label}
    onClick={onClick}
    onKeyDown={e => e.keyCode === 13 ? onClick() : null}
  >{iconName}</a>
    </Ripple>
)
