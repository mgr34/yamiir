

import {MDCFoundation }from '@material/base/dist/mdc.base';
import {
  BASE_CLASS,
  EXPANDED_CLASS,
  EXPANDING_CLASS,
  OPEN,
  ANIMATING_CLASS,
} from './constants';

class MDCBottomSheetFoundation extends MDCFoundation {

  static get defaultAdapter() {
    return /** @type {!MDCBottomSheetAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => {},
      focus:() => {},
      addScrollLock: () => {},
      removeScrollLock: () => {},
      storePosition: () => {},
      restorePosition: () => {},
      setPosition: () => {},
      setTranslateY: () => {},
      registerInteractionHandler: () => {},
      deregisterInteractionHandler: () => {},
      getSheetHeight: () => {},
      notifyClose: () => {},
      notifyExpand: () => {},
      isExpanded: () => {},
      isSideSheet: () => {},
    });
  }

  constructor(adapter,withTouch=true) {
    super(Object.assign(MDCBottomSheetFoundation.defaultAdapter, adapter));
    this.isOpen_ = false;
    this.withTouch_ = withTouch;

    this.componentTouchStartHandler_ = (evt) => this.handleTouchStart_(evt);
    this.componentTouchMoveHandler_ = (evt) => this.handleTouchMove_(evt);
    this.componentTouchEndHandler_ = (evt) => this.handleTouchEnd_(evt);
    this.transitionEndHandler_ = (evt) => this.handleTransitionEnd_(evt);

    this.documentKeydownHandler_ = (evt) => {
      if ((evt.key && evt.key === 'Escape') || evt.keyCode === 27) {
        this.close();
      }
    };
  }

  init() {
    if (!this.adapter_.hasClass(BASE_CLASS)) {
      throw new Error(`${BASE_CLASS} class required in root element.`);
    }
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('keydown',this.documentKeydownHandler_);
    if (this.withTouch_) {
      this.adapter_.deregisterInteractionHandler('touchstart', this.componentTouchStartHandler_);
      this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
      this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
    }
  }

  show() {
    this.adapter_.registerInteractionHandler('transitionend',this.transitionEndHandler_)
    this.adapter_.registerInteractionHandler('keydown',this.documentKeydownHandler_);
    if (this.withTouch_) {
      this.adapter_.registerInteractionHandler('touchstart', this.componentTouchStartHandler_);
      this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
      this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
    }
    this.adapter_.addClass(ANIMATING_CLASS)
    this.adapter_.addClass(OPEN)
    this.adapter_.focus();
  }

  hide() {
    this.adapter_.registerInteractionHandler('transitionend',this.transitionEndHandler_)
    this.adapter_.addClass(ANIMATING_CLASS)
    this.adapter_.removeClass(OPEN);

    this.adapter_.deregisterInteractionHandler('keydown',this.documentKeydownHandler_);

    if (this.withTouch_) {
      this.adapter_.deregisterInteractionHandler('touchstart', this.componentTouchStartHandler_);
      this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
      this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
    }
  }

  expand() {
    this.adapter_.storePosition();
    this.adapter_.addScrollLock();
    this.adapter_.addClass(EXPANDED_CLASS);
    this.adapter_.addClass(EXPANDING_CLASS);
    this.adapter_.setPosition(0);

    setTimeout(() => {
      this.adapter_.notifyExpand();
      this.adapter_.removeClass(EXPANDING_CLASS);
    },300)

    if (this.withTouch_) {
      this.adapter_.deregisterInteractionHandler('touchstart', this.componentTouchStartHandler_);
      this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
      this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
    }
  }


  updateSheet_() {
    this.updateRaf_ = requestAnimationFrame(this.updateSheet_.bind(this))
    this.adapter_.setTranslateY(this.newPosition_)
  }

  prepareForTouchEnd_() {
    cancelAnimationFrame(this.updateRaf_);
    this.adapter_.setTranslateY(null);
  }

  handleTouchStart_(e) {
    if (!this.adapter_.hasClass(OPEN)) {
      return;
    }
    
    if (e.pointerType && e.pointerType !== 'touch') {
      return;
    }

    this.sheeHeight_ = this.adapter_.getSheetHeight();
    this.startY_ = e.touches ? e.touches[0].pageY : e.pageY;
    this.currentY_ = this.startY_;

    this.updateRaf_ = requestAnimationFrame(this.updateSheet_.bind(this))
  }

  handleTouchEnd_(e) {
    if (e.pointerType && e.pointerType !== 'touch') {
      return;
    }

    if (this.newPosition_ / this.sheeHeight_ >= .25) {
      this.hide();
    }

    if (this.newPosition_ / this.sheeHeight_ <= -.33) {
      this.expand();
    }

    this.prepareForTouchEnd_();

  }

  handleTouchMove_(e) {
    if (e.pointerType && e.pointerType !== 'touch') {
      return;
    }

    this.currentY_ = e.touches ? e.touches[0].pageY : e.pageY;
  }

  get newPosition_() {
    let newPos = null;

    newPos = this.currentY_ - this.startY_;

    return newPos;
  }

  handleTransitionEnd_(e) {
    this.adapter_.removeClass(ANIMATING_CLASS)
    this.adapter_.deregisterInteractionHandler('transitionend',this.transitionEndHandler_)
    if (!this.adapter_.hasClass(OPEN)) {
      if (this.adapter_.hasClass(EXPANDED_CLASS)) {
        if (!this.adapter_.isSideSheet()) {
          this.adapter_.removeClass(EXPANDED_CLASS);
        }
        this.adapter_.restorePosition();
        this.adapter_.removeScrollLock();
      }
      this.adapter_.notifyClose();
    }
  }
}

export { MDCBottomSheetFoundation }
