import { newE2EPage } from '@stencil/core/testing';

describe('a11y-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<a11y-menu></a11y-menu>');
    const element = await page.find('a11y-menu');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<a11y-menu></a11y-menu>');
    const component = await page.find('a11y-menu');
    const element = await page.find('a11y-menu >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
