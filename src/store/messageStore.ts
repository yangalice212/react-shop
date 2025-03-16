import { createContext } from 'react';

export interface Message {
  type: 'success' | 'danger' | string;
  title: string;
  content: string;
}

interface Action {
  type: 'POST_MESSAGE' | 'CLEAR_MESSAGE';
  payload?: Message;
}

export const MessageContext = createContext({});

export const initState: Message = {
  type: '',
  title: '',
  content: '',
};

export const messageReducer = (state: Message, action: Action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      return {
        ...action.payload,
      };
    case 'CLEAR_MESSAGE':
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export function handleSuccessMessage<T extends { data: { message: string } }>(
  dispatch: React.Dispatch<Action>,
  res: T
) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'success',
      title: '成功',
      content: res.data.message,
    },
  });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_MESSAGE' });
  }, 3000);
}

export function handleErrorMessage(
  dispatch: React.Dispatch<Action>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
) {
  dispatch({
    type: 'POST_MESSAGE',
    payload: {
      type: 'danger',
      title: '失敗',
      content: Array.isArray(error.response.data.message)
        ? error.response.data.message.join('、')
        : error.response.data.message,
    },
  });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_MESSAGE' });
  }, 3000);
}
