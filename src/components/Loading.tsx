import { ClipLoader } from 'react-spinners';

function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    isLoading && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 9999,
        }}
      >
        <ClipLoader color="#000" size={50} />
      </div>
    )
  );
}

export default Loading;
