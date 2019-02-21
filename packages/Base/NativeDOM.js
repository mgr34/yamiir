/**
 * Created by matt on 6/12/17.
 */

import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class NativeDOM extends PureComponent {
  static propTypes = {
    cssClasses: PropTypes.arrayOf(PropTypes.string),
    cssVariables: PropTypes.object,
    eventListeners: PropTypes.object,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    cssClasses: [],
    cssVariables: {},
    eventListeners: {},
  };

  componentDidMount() {
    const props = this.getInternalProps(this.props);
    const domNode = this._getDOMNode();

    this._addCssVariables(domNode, props.cssVariables);
    this._addCssClasses(domNode, props.cssClasses);
    this._addEventListeners(domNode, props.eventListeners);
  }

  componentDidUpdate(prevProps) {
    const next = this.getInternalProps(this.props);
    const prev = this.getInternalProps(prevProps);
    const domNode = this._getDOMNode();

    this._updateCssVariables(domNode, prev.cssVariables, next.cssVariables);
    this._updateCssClasses(domNode, prev.cssClasses, next.cssClasses);
    this._updateEventListeners(domNode, prev.eventListeners, next.eventListeners);
  }

  getInternalProps = (props = {}) => {
    return {
      cssVariables: props.cssVariables,
      cssClasses: props.cssClasses,
      eventListeners: props.eventListeners,
    };
  }

  _getDOMNode = () => {
    return ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
  }

  _addCssClasses = (dom, toAdd = []) => {
    toAdd.forEach((className) => {
      if (!dom.classList.contains(className)) {
        dom.classList.add(className);
      }
    });
  }

  _removeCssClasses = (dom, toRemove = []) => {
    toRemove.forEach((className) => {
      dom.classList.remove(className);
    });
  }

  _updateCssClasses = (dom, prev = [], next = []) => {
    const toRemove = [];
    const toAdd = [];

    toRemove.push(...prev.filter((prevClassName) => {
      return !next.includes(prevClassName);
    }));

    toAdd.push(...next.filter((nextClassName) => {
      return !prev.includes(nextClassName);
    }));

    this._removeCssClasses(dom, toRemove);
    this._addCssClasses(dom, toAdd);
  }

  _addCssVariables = (dom, toAdd = {}) => {
    Object.keys(toAdd).forEach((key) => {
      if (dom.style.getPropertyValue(key) !== toAdd[key]) {
        dom.style.setProperty(key, toAdd[key]);
      }
    });
  }

  _removeCssVariables = (dom, toRemove = {}) => {
    Object.keys(toRemove).forEach((key) => {
      if (dom.style.getPropertyValue(key) === toRemove[key]) {
        dom.style.removeProperty(key);
      }
    });
  }

  _updateCssVariables = (dom, prev = {}, next = {}) => {
    const toRemove = {};
    const toAdd = {};

    Object.keys(prev).forEach((key) => {
      if (next[key] !== prev[key]) {
        toRemove[key] = prev[key];
      }
    });

    Object.keys(next).forEach((key) => {
      if (prev[key] !== next[key]) {
        toAdd[key] = next[key];
      }
    });

    this._removeCssVariables(dom, toRemove);
    this._addCssVariables(dom, toAdd);
  }

  _addEventListeners(dom, toAdd = {}) {
      Object.keys(toAdd).forEach((event) => {
        toAdd[event].forEach((listener) => {
          dom.addEventListener(event, listener, {passive: true});
        });
      });
  }

  _removeEventListeners(dom, toRemove = {}) {
    Object.keys(toRemove).forEach((event) => {
      toRemove[event].forEach((listener) => {
        dom.removeEventListener(event, listener, {passive: true});
      });
    });
  }

  _updateEventListeners(dom, prev = {}, next = {}) {
    const diff = [];
    const allKeys = new Set([...Object.keys(prev), ...Object.keys(next)]);

    allKeys.forEach((event) => {
      const hash = {};
      const prevListeners = prev[event] || [];
      const nextListeners = next[event] || [];

      prevListeners.forEach((a) => {
        (hash[a] = hash[a] || { count: 0, value: a }).count += 1;
      });
      nextListeners.forEach((a) => {
        (hash[a] = hash[a] || { count: 0, value: a }).count -= 1;
      });

      const toRemove = [];
      const toAdd = [];

      Object.keys(hash).forEach((key) => {
        if (hash[key].count > 0) {
          toRemove.push(hash[key].value);
        } else if (hash[key].count < 0) {
          toAdd.push(hash[key].value);
        }
      });

      diff.push({ event, toRemove, toAdd });
    });

    diff.forEach(({ event, toRemove, toAdd }) => {
      if (toRemove.length) {
        this._removeEventListeners(dom, { [`${event}`]: toRemove });
      }

      if (toAdd.length) {
        this._addEventListeners(dom, { [`${event}`]: toAdd });
      }
    });
  }


  render() {
    return this.props.children;
  }
}
