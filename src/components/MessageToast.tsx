import { useSelector } from 'react-redux';
import { MessageState } from '../slice/messageSlice';

function Message() {
  const messages = useSelector((state: MessageState) => state.messages);
  return (
    <div
      className="toast-container position-fixed"
      style={{ top: '64px', right: '15px' }}
    >
      {messages?.map((msg) => {
        return (
          <div
            key={msg.id}
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className={`toast-header text-white bg-${msg.type}`}>
              <strong className="me-auto">{msg.title}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
            <div className="toast-body">{msg.content}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Message;
