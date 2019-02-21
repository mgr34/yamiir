/**
 * Created by matt on 7/3/17.
 */



//TODO: refactor || remove || relocate.
/**
 * determine event
 *
 * pointerdown should work with mouse and touch events, however, some browsers
 * don't support pointerdown. However, those that need mousedown are not likely
 * to be supported.
 *
 * @param window
 * @return {*}
 * @private
 */
export const _determineEvent = window => {
  if (!window) {
    return 'pointerdown'
  }

  if ('ontouchstart' in window.document) {
    return 'touchdown'
  } else if ('onpointerdown' in window.document) {
    return 'pointerdown'
  } else {
    return 'mousedown'
  }
}
