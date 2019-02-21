import Adapter from '../Base/Adapter';
import debug from '../debug'


export class ListAdapter extends Adapter {
  /** @return {number} */
  getListItemCount() {
    debug(this.LOG,'getListItemCount',{
      itemCount: this.element.props.options.length
    });

    return this.element.props.options.length

  }

  /**
   * @return {number} */
  getFocusedElementIndex() {
    debug(this.LOG,'getFocusedElementIndex', {
      todo: 'todo'
    })

    //TODO

  }

  /**
   * @param {number} index
   * @param {string} attribute
   * @param {string} value
   */
  setAttributeForElementIndex(index, attribute, value) {
    debug(this.LOG,'setAttributeForElementIndex',
      {index,attribute, value}
    );

    //TODO
  }

  /**
   * @param {number} index
   * @param {string} attribute
   */
  removeAttributeForElementIndex(index, attribute) {
    debug(this.LOG,'removeAttributeForElementIndex',
      {index,attribute}
    );

    //TODO

  }

  /**
   * @param {number} index
   * @param {string} className
   */
  addClassForElementIndex(index, className) {
    debug(this.LOG,'addClassForElementIndex',{index,className})
    //TODO
  }

  /**
   * @param {number} index
   * @param {string} className
   */
  removeClassForElementIndex(index, className) {
    debug(this.LOG,'removeClassForElementIndex',{index,className});

  }

  /**
   * Focuses list item at the index specified.
   * @param {number} index
   */
  focusItemAtIndex(index) {
    debug(this.LOG,'focusItemAtIndex',{index})

    //TODO
  }

  /**
   * Sets the tabindex to the value specified for all button/a element children of
   * the list item at the index specified.
   * @param {number} listItemIndex
   * @param {number} tabIndexValue
   */
  setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {
    debug(this.LOG,'setTabIndexForListItemChildren',{
      listItemIndex,tabIndexValue
    });

    //TODO
  }

  /**
   * If the given element has an href, follows the link.
   * @param {!Element} ele
   */
  followHref(ele) {
    debug(this.LOG,'followHref', {ele})
    //TODO
  }

  /**
   * Toggles the checkbox or radio button within a list item.
   * @param {number} index
   * @return {boolean} true if a radio button or checkbox was present.
   */
  toggleCheckbox(index) {
    debug(this.LOG,'toggleCheckbox',{index})
    //TODO
  }
}

