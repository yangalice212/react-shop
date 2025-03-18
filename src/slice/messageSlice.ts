import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface MessageType {
  id: string;
  type: string;
  title: string;
  content: string;
}

export interface MessageState {
  messages: MessageType[];
}

export const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    createMessage(state: MessageType[], action) {
      state.push({
        id: action.payload.id,
        type: action.payload.success ? 'success' : 'danger',
        title: action.payload.success ? '成功' : '錯誤',
        content: action.payload.success
          ? action.payload.message
          : Array.isArray(action.payload.message)
          ? action.payload.message.join('、')
          : action.payload.message,
      });
    },
    removeMessage(state: MessageType[], action) {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const createAsyncMessage = createAsyncThunk(
  'message/createAsyncMessage',
  async function (
    payload: { message: string; success: string },
    { dispatch, requestId }
  ) {
    dispatch(
      messageSlice.actions.createMessage({
        message: payload.message,
        success: payload.success,
        id: requestId,
      })
    );
    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, 2000);
  }
);

export const { createMessage } = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
