import type { Preview } from '@storybook/nextjs'
import {AppProvider} from "@/src/app/contexts/AppContext";
import '@/src/styles/global.scss';
import {NextIntlClientProvider} from "next-intl";
import {LOCALES} from "@/src/utils/locale";
import csMessages from "../messages/cs-cz.json";
import enMessages from "../messages/en-us.json";

type Messages = {
  [LOCALES.cs_CZ]: typeof csMessages;
  [LOCALES.en_US]: typeof enMessages;
};

const messages: Messages = {
  [LOCALES.cs_CZ]: csMessages,
  [LOCALES.en_US]: enMessages,
};

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
  globalTypes: {
    locale: {
      description: 'Global locale for components',
      defaultValue: LOCALES.cs_CZ,
      toolbar: {
        icon: 'globe',
        items: [
          { value: LOCALES.cs_CZ, title: 'Czech' },
          { value: LOCALES.en_US, title: 'English' },
        ],
      },
    },
  },
  decorators: [
      (Story, context) => {
        const { locale } = context.globals as { locale: keyof Messages };

        return <NextIntlClientProvider
            locale={locale}
            messages={messages[locale]}
        >
          <AppProvider>
            <Story key={context.id} />
          </AppProvider>
        </NextIntlClientProvider>
      }
  ]
};

export default preview;