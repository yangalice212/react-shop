import { forwardRef, useImperativeHandle, useState } from 'react';
import { type Message as MessageType } from '../store/messageStore';

export interface MessageRef {
  handleSuccessMessage: (content: string, title?: string) => void;
  handleErrorMessage: (content: string | string[], title?: string) => void;
}

const Message = forwardRef((_, ref) => {
  const initState: MessageType = {
    type: '',
    title: '',
    content: '',
  };
  // const { message, handleErrorMessage } = useContext(MessageContext);
  const [message, setMessage] = useState<MessageType>({
    type: '',
    title: '',
    content: '',
  });

  const handleSuccessMessage = (content: string, title: string = '成功') => {
    setMessage({
      type: 'success',
      title,
      content,
    });
    setTimeout(() => {
      setMessage(initState);
    }, 3000);
  };

  function handleErrorMessage(
    content: string | string[],
    title: string = '失敗'
  ) {
    setMessage({
      type: 'danger',

      title,
      content: Array.isArray(content) ? content.join('、') : content,
    });
    setTimeout(() => {
      setMessage(initState);
    }, 3000);
  }

  useImperativeHandle(
    ref,
    () => ({
      handleSuccessMessage,
      handleErrorMessage,
    }),
    []
  );

  console.log(message);

  return (
    message.content && (
      <div
        className="toast-container position-fixed"
        style={{ top: '60px', right: '15px' }}
      >
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true" // data-delay={message.delay}
        >
          <div className={`toast-header text-white bg-${message.type}`}>
            <strong className="me-auto">{message.title}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setMessage(initState)}
            />
          </div>
          <div className="toast-body">{message.content}</div>
        </div>
      </div>
    )
  );
});

export default Message;
