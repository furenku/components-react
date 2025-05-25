import type { Preview } from '@storybook/react'
import '../src/styles/globals.css' // Add this line to import Tailwind CSS
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'ipad',
    },
  },
  decorators: [
    (Story, { parameters }) => {
      // 👇 Make it configurable by reading from parameters
      const { pageLayout } = parameters;
      switch (pageLayout) {
        case 'page':
          return (
            // Your page layout is probably a little more complex than this ;)
            <div className="page-layout">
              <Story />
            </div>
          );
        case 'page-mobile':
          return (
            <div className="page-mobile-layout">
              <Story />
            </div>
          );
        default:
          // In the default case, don't apply a layout
          return <div style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0}}><Story /></div>;
      }
    },
  ]
};



export default preview;