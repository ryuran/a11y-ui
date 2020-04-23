import { Component, Host, Element, State, Listen, h } from '@stencil/core';

@Component({
  tag: 'a11y-dropdown',
  styleUrl: 'a11y-dropdown.css',
  shadow: true
})
export class A11yDropdown {

  @Element() el: HTMLElement;

  private triggerEl?: HTMLElement;

  private contentEl?: HTMLElement;

  @State() isOpen: boolean = false;

  componentWillLoad() {
    this.triggerEl = this.el.querySelector('[slot=trigger]')
    this.triggerEl.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false')
    this.triggerEl.addEventListener('click', this.handleTriggerClick.bind(this))
    console.log(this.triggerEl);
  }

  componentWillUpdate() {
    this.triggerEl.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false')
  }

  @Listen('click', { target: 'document' })
  handleOutsideClick (ev: UIEvent) {
    // we are not in this dropdown
    if (ev.target instanceof HTMLElement && this.el.contains(ev.target as HTMLElement)) {
      return;
    }

    this.close()
  }

  @Listen('focusin', { target: 'document' })
  handleOutsideFocus(ev: UIEvent) {
    if(ev.target === document || this.el.contains(ev.target as HTMLElement)){
      return;
    }
    this.close()
  }

  handleTriggerClick() {
    // Button is clicked, toggle
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.setFocusIn()
    }
  }


  handleKeyDown(ev: KeyboardEvent) {
    if (!document.activeElement || !this.el.contains(document.activeElement)) {
      return
    }

    // IE11 use 'Esc' key code instead of 'Escape'
    if (['Esc', 'Escape'].includes(ev.key)) {
      this.close()
      this.triggerEl.focus()
    }
  }

  setFocusIn() {
    const firstFocusableElement = this.contentEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!firstFocusableElement) {
      return
    }

    (firstFocusableElement as HTMLElement).focus()
  }

  saveFocus() {
    // Set focus on trigger if focused element is inside a dropdown
    if (!this.el.contains(document.activeElement)) {
      return
    }

    this.triggerEl.focus()
  }

  /** Close every open dropDown */
  close() {
    this.saveFocus()

    this.isOpen = false;
  }

  render() {
    return (
      <Host onKeyDown={this.handleKeyDown.bind(this)}>
        <slot name="trigger" />
        <div {...(this.isOpen ? {} : {hidden: true})}
          ref={(contentEl) => this.contentEl = contentEl as HTMLDivElement}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
