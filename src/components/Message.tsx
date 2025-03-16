import { useContext } from 'react';
import {
  handleErrorMessage,
  MessageContext,
  type Message,
} from '../store/messageStore';

function Message() {
  const [message, dispatch] = useContext(MessageContext);

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
              onClick={() => handleErrorMessage(dispatch, { message: '' })}
            />
          </div>
          <div className="toast-body">{message.content}</div>
        </div>
      </div>
    )
  );
}

export default Message;
