import { newSpecPage } from '@stencil/core/testing';
import { A11yMenu } from './a11y-menu';

describe('a11y-menu', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components: [A11yMenu],
      html: '<a11y-menu></a11y-menu>'
    });
    expect(root).toEqualHtml(`
      <a11y-menu>
        <mock:shadow-root>
          <div role="menu"></div>
        </mock:shadow-root>
      </a11y-menu>
    `);
  });

  it('renders with values', async () => {
    const {root} = await newSpecPage({
      components: [A11yMenu],
      html: `<a11y-menu><a11y-menu-item><a href="#" role"menu-item">test</a></a11y-menu>`
    });
    expect(root).toEqualHtml(`
      <a11y-menu>
        <mock:shadow-root>
          <a11y-menu-item>
            <a href="#" role="menu-item">test</a>
          </a11y-menu-item>
        </mock:shadow-root>
      </a11y-menu>
    `);
  });
});
