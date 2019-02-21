/**
* Copyright 2016 Google Inc. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


import camelcase from 'camelcase';
import {strings} from '@material/chips/chip/constants';

/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */
let supportsPassive_;

/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
export const applyPassive = (globalObj = window, forceRefresh = false) => {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
          isSupported = true;
        }});
    } catch (e) { }

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {passive: true} : false;
}




export function supportsCssVariables(windowObj) {
  const supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  const weAreFeatureDetectingSafari10plus = (
    windowObj.CSS.supports('(--css-vars: yes)') &&
    windowObj.CSS.supports('color', '#00000000')
  );

  return explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus; // eslint-disable-line consistent-return
}

export function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter(p => p in HTMLElementPrototype).pop();
}

export function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  const { x, y } = pageOffset;
  const documentX = x + clientRect.left;
  const documentY = y + clientRect.top;

  let normalizedX;
  let normalizedY;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return { x: normalizedX, y: normalizedY };
}



// The Functions Below were written by
// Matthew Roth <matthew.g.roth at yale.edu>

/**
 * map actions from MDCfoundation to react friendly actions. Actions
 * can be over written if passed in as propActions to the mounted component.
 * in that case we should expose the action and the foundation.
 * > note: for whatever reason MDC:Select Surface will only function properly on
 * eventPhase 2. Reactjs is always Phase #3
 * seemore: https://github.com/facebook/react/issues/9783#issuecomment-314428923
 * @param propActions {object}
 * @param actions {object}
 * @param phaseTwo {boolean}
 * @return {{}}
 */
export const makeActions = (propActions={},actions={},phaseTwo=false) => foundation =>
  Object.keys(actions).reduce((a,b) => {
    const action = lookUpAction(b);
    if (propActions.hasOwnProperty(action)
      && typeof propActions[action] === 'function') {
      return {...a, [action]: e => propActions[action](e,foundation) }
    }

    const f = phaseTwo
      ? (e) => { e.persist(); e.eventPhase = 2;  actions[b][0](e);  }
      : e => actions[b].map(action => action(e));

    return   {...a, [action]: (e) => {
       if (e && e.persist) { e.persist() }
       if (typeof f === 'function') { f(e) }
     }
    }
  },propActions
);


/**
 * map javascript events to Synthetic Reactjs Events
 * > note: list incomplete. **Events are added on an as needed basis**   to keep
 * down bloat. More robust modules exist on npm if needed.
 * @param action
 * @return {*}
 */
const lookUpAction = (action) => {
  const actions = {
    animationend: 'onAnimationEnd',
    click: 'onClick',
    keydown: 'onKeyDown',
    keyup: 'onKeyUp',
    select: 'onSelect',
    cancel: 'onCancel',
    touchstart: 'onTouchStart',
    touchend: 'onTouchEnd',
    touchmove: 'onTouchMove',
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    focus: 'onFocus',
    blur: 'onBlur',
    transitionend: 'onTransitionEnd',
    input: 'onInput',
    change: 'onChange',
    //CUSTOM EVENT MAPPINGS
    //FOR MDC-CHIPS
    [strings.INTERACTION_EVENT]: 'onChipSelect',
    [strings.REMOVAL_EVENT]: 'onChipRemoval',
    [strings.TRAILING_ICON_INTERACTION_EVENT]: 'onIconSelect',

  };
  let reactAction = actions[action];
  if (reactAction === undefined) {
    console.warn(action + ' not implemented');
    return action
  }

  return reactAction


};

/**
 * transforms inline CSS styles to Reactjs Inline styles. Namely,
 * css properties should be camelcased. Except for props that start with '--'
 * @param styles
 * @return {{}}
 */
export const toStyle = (styles={}) => Object.keys(styles).reduce((a,b) => {
  return b.startsWith('--')
    ? {...a, [b]: styles[b]}
    : {...a, [camelcase(b)]: styles[b] }
},{})


/**
 * Compare two objects  values at a very shallow and cheap level to determine
 * difference
 * @param a {Object||ImmuteableMap} first object to compare
 * @param b {Object||ImmuteableMap} second object to compare
 * @param key {string} Key to compare
 * @param isImmutable Is set immutable
 * @return {boolean}
 */
export const shallowCompare = (a,b,key,isImmutable=false) => isImmutable
  ? a[key].equals(b[key])
  : JSON.stringify(a[key]) === JSON.stringify(b[key])


/**
 * Merge two objects that contain functions. If objects contain same
 * functions have new eventhandler call both functions.
 * @param actions {Object} first set of actions
 * @param childActions {object} any actions passed to a child
 * @return {object} merge set of actions
 */
export const merge = (actions,childActions,retain=true) => retain
  ? ({ ...childActions, // otherwise childActions will be lost if not in actions
    ..._merge(actions,childActions)
    })
  : _merge(actions,childActions);




const _merge = (actions,childActions) => ({
  ...Object.keys(actions).reduce((a, b) => {
    return childActions.hasOwnProperty(b)
      ? {
        ...a, [b]: (e, ...args) => {
          actions[b](e, ...args);
          childActions[b](e, ...args)
        }
      }
      : {...a, [b]: actions[b]}
  }, {})
});



/**
 * immutable insert. takes an array and inserts a newItem at prescribed index.
 * This will not modify the original array, but instead return a new array.
 *
 * @param arr {array} - the array to insert into
 * @param index {number} - the index to insert newItem into
 * @param newItem {*} - the item you wish to insert into array
 * @return {array}
 */
export const insert = (arr, index, newItem) => (!index && newItem instanceof Array) ? newItem : [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(++index)
];





///////////////  Below  FROM @material in use with yamiir components  //////////

/**
 * FROM @material
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
export const getCorrectPropertyName = (windowObj, eventType) =>
  getAnimationName(windowObj, eventType);

/**
 * Helper function to determine browser prefix for CSS3 animation events
 * and property names.
 * FROM @material
 * @param {!Object} windowObj
 * @param {string} eventType
 * @return {string}
 */
function getAnimationName(windowObj, eventType) {
  if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
    return eventType;
  }

  const map = /** @type {!Object<string, !VendorPropertyMapType>} */ (
    eventType in eventTypeMap ? eventTypeMap : cssPropertyMap
  );
  const el = windowObj['document']['createElement']('div');
  let eventName = '';

  if (map === eventTypeMap) {
    eventName = getJavaScriptEventName(eventType, map, el);
  } else {
    eventName = map[eventType].noPrefix in el.style
      ? map[eventType].noPrefix
      : map[eventType].webkitPrefix;
  }

  return eventName;
}

/**
 * @param {string} eventType
 * @param {!Object<string, !VendorPropertyMapType>} map
 * @param {!Element} el
 * @return {string}
 */
function getJavaScriptEventName(eventType, map, el) {
  return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
}

/**
 * @param {string} eventType
 * @return {boolean}
 */
function eventFoundInMaps(eventType) {
  return (eventType in eventTypeMap || eventType in cssPropertyMap);
}

/**
 * @param {!Object} windowObj
 * @return {boolean}
 */
function hasProperShape(windowObj) {
  return (windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function');
}

/** @const {Object<string, !VendorPropertyMapType>} */
const eventTypeMap = {
  'animationstart': {
    noPrefix: 'animationstart',
    webkitPrefix: 'webkitAnimationStart',
    styleProperty: 'animation',
  },
  'animationend': {
    noPrefix: 'animationend',
    webkitPrefix: 'webkitAnimationEnd',
    styleProperty: 'animation',
  },
  'animationiteration': {
    noPrefix: 'animationiteration',
    webkitPrefix: 'webkitAnimationIteration',
    styleProperty: 'animation',
  },
  'transitionend': {
    noPrefix: 'transitionend',
    webkitPrefix: 'webkitTransitionEnd',
    styleProperty: 'transition',
  },
};

/** @const {Object<string, !VendorPropertyMapType>} */
const cssPropertyMap = {
  'animation': {
    noPrefix: 'animation',
    webkitPrefix: '-webkit-animation',
  },
  'transform': {
    noPrefix: 'transform',
    webkitPrefix: '-webkit-transform',
  },
  'transition': {
    noPrefix: 'transition',
    webkitPrefix: '-webkit-transition',
  },
};

