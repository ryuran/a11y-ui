import { newSpecPage } from '@stencil/core/testing';
import { A11yDropdown } from './a11y-dropdown';

describe('a11y-dropdown', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components: [A11yDropdown],
      html: '<a11y-dropdown></a11y-dropdown>'
    });
    expect(root).toEqualHtml(`
      <a11y-dropdown>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </a11y-dropdown>
    `);
  });

  it('renders with values', async () => {
    const {root} = await newSpecPage({
      components: [A11yDropdown],
      html: `<a11y-dropdown first="Stencil" last="'Don't call me a framework' JS"></a11y-dropdown>`
    });
    expect(root).toEqualHtml(`
      <a11y-dropdown first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </a11y-dropdown>
    `);
  });
});
