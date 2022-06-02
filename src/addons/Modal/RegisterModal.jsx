import ReactDOM from 'react-dom';
import useModalContext from './useModalContext';

const root = document.getElementById('modal-root');

function RegisterModal() {
  const { getModalHandle, ModalContextProvider } = useModalContext();

  return {
    value: {
      getModalHandle,
    },
    Component: ReactDOM.createPortal(<ModalContextProvider />, root),
  };
}

export default RegisterModal;
