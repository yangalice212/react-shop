import { createContext } from 'react';

export interface Message {
  type: 'success' | 'danger' | string;
  title: string;
  content: string;
}

export const initState: Message = {
  type: '',
  title: '',
  content: '',
};

export const MessageContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleSuccessMessage: (_content: string, _title?: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleErrorMessage: (_content: string | string[], _title?: string) => {},
});
