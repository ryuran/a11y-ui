import { Component, Host, Element, h } from '@stencil/core';

@Component({
  tag: 'a11y-menu',
  styleUrl: 'a11y-menu.css',
  shadow: true
})
export class A11yMenu {

  @Element() el: HTMLUListElement;

  handleKeyDown(ev: KeyboardEvent) {
    // IE11 use 'Up' and 'Down' key code instead of 'ArrowUp' and 'ArrowDown'
    if (!document.activeElement || !['Up', 'Down', 'ArrowUp', 'ArrowDown', 'End', 'Home'].includes(ev.key)) {
      return
    }

    const wrapper = document.activeElement.closest('a11y-menu') as HTMLA11yMenuElement

    // avoid nested menu interferences
    if(!wrapper || !wrapper.isSameNode(this.el)) {
      return
    }

    let items = Array.from(wrapper.querySelectorAll('[role="menu-item"]') as NodeListOf<HTMLElement>)

    // avoid nested menu interferences
    items = items.filter((el) => this.el.isSameNode(el.closest('a11y-menu')))

    if (!items) {
      return
    }

    const currentItemIndex = items.indexOf(document.activeElement as HTMLElement)

    if (currentItemIndex < 0) {
      return
    }

    const firstItemIndex = 0
    const lastItemIndex = items.length - 1
    const nextIndex = currentItemIndex === lastItemIndex ? firstItemIndex : currentItemIndex + 1
    const prevIndex = currentItemIndex === firstItemIndex ? lastItemIndex : currentItemIndex - 1

    let newIndex = currentItemIndex

    if (['Up', 'ArrowUp'].includes(ev.key)) {
      newIndex = prevIndex
    }
    else if (['Down', 'ArrowDown'].includes(ev.key)) {
      newIndex = nextIndex
    }
    else if ('Home' === ev.key) {
      newIndex = firstItemIndex
    }
    else if ('End' === ev.key) {
      newIndex = lastItemIndex
    }

    items[newIndex].focus()
  }

  render() {
    return(
      <Host role="menu" onKeyDown={this.handleKeyDown.bind(this)}>
        <slot />
      </Host>
    );
  }
}
