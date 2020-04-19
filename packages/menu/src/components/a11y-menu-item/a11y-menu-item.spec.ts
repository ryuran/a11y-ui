import { newSpecPage } from '@stencil/core/testing';
import { A11yMenuItem } from './a11y-menu-item';

describe('a11y-menu-item', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components: [A11yMenuItem],
      html: '<a11y-menu-item></a11y-menu-item>'
    });
    expect(root).toEqualHtml(`
      <a11y-menu-item>
        <mock:shadow-root>
          <ul role="menu"></ul>
        </mock:shadow-root>
      </a11y-menu-item>
    `);
  });

  it('renders with values', async () => {
    const {root} = await newSpecPage({
      components: [A11yMenuItem],
      html: `<a11y-menu-item><a href="#" slot="menu-item">test</a></a11y-menu-item>`
    });
    expect(root).toEqualHtml(`
      <a11y-menu-item>
        <mock:shadow-root>
          <div role="menu">
            <a href="#" role="menu-item">test</a>
          </div>
        </mock:shadow-root>
      </a11y-menu-item>
    `);
  });
});
