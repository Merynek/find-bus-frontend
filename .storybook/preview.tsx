import type { Preview } from '@storybook/nextjs'
import {AppProvider} from "@/src/app/contexts/AppContext";
import '@/src/styles/global.scss';

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
      (Story, context) => {
        return <AppProvider>
          <Story key={context.id} />
        </AppProvider>
      }
  ]
};

export default preview;