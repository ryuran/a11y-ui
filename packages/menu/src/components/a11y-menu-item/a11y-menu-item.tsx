import { Component, Host, Element, h } from '@stencil/core';

@Component({
  tag: 'a11y-menu-item',
  shadow: true
})
export class A11yMenuItem {

  @Element() el: HTMLLIElement;

  render() {
    return(
      <Host><slot /></Host>
    );
  }
}
