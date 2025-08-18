import type { Preview } from '@storybook/nextjs'
import {AppProvider} from "@/src/app/contexts/AppContext";
import '@/src/styles/global.scss';
import {NextIntlClientProvider} from "next-intl";
import {LOCALES} from "@/src/utils/locale";
import csMessages from "../messages/cs-cz.json";
import enMessages from "../messages/en-us.json";
import NextAuthProvider from "@/src/app/contexts/NextAuthContext";

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
    user: {
      description: 'User state',
      defaultValue: 'logged-out',
      toolbar: {
        title: 'User',
        icon: 'user',
        items: [
          { value: 'logged-out', title: 'Not logged in' },
          { value: 'logged-in', title: 'Logged in' },
        ],
      },
    },
  },
  decorators: [
      (Story, context) => {
        const { locale, user } = context.globals as { locale: keyof Messages, user: string };
        const userId = user === 'logged-in' ? 123 : 0;

        return <NextIntlClientProvider
            locale={locale}
            messages={messages[locale]}
        >
          <NextAuthProvider userId={userId || 0}>
            <AppProvider>
              <Story key={context.id} />
            </AppProvider>
          </NextAuthProvider>
        </NextIntlClientProvider>
      }
  ]
};

export default preview;