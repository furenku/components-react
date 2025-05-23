import type { Preview } from '@storybook/react'
import '../src/styles/globals.css' // Add this line to import Tailwind CSS

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;