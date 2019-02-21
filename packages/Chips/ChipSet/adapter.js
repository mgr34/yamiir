import BaseEventAndClassAdapter from "../../Base/BaseEventAndClassAdapter";
import debug from '../../debug'

const LOG = true;

export class ChipSetAdapter extends BaseEventAndClassAdapter {
  //hasClass(className) {}
  //registerInteractionHandler(evtType, handler) {}
  //deregisterInteractionHandler(evtType, handler) {}


  //TODO: If not part of the default adapter how is this used?
  /**
   * Adds a new chip object to the chip set from the given chip element.
   * @param {!Element} chipEl
  addChip(chipEl) {
    debug(LOG,'appendChip',{chipEl});

    const { chips } = this.element.state;
    this.element.setState({chips: [...chips,chipEl]});
  }
   */

  /**
   * Removes the chip object from the chip set.
   * @param {!Object} chip
   */
  removeChip(chip) {
    debug(LOG,'removeChip',{chip});
    const chips = this.element.state.chips;
    const index = chips.indexOf(chip);
    if (index >= 0)  {
      this.element.setState({chips: chips.filter((c,i) => i !== index)})
    } else {
      console.warn('Chip not found:  ', chip)
    }

  }
}
