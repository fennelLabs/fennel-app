import { useContext } from 'react';
import { ModalContext } from '../../useModalContext';
import './Template.style.css';

const sizeVariants = {
  full: 'modal-full',
  medium: 'modal-medium',
  small: 'modal-small',
};

function ModalTemplate({ options, ...props }) {
  const { controls } = useContext(ModalContext);
  const { size, title, backgroundColor } = options;

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
        zIndex: '10',
      }}
    >
      <div
        className={`modal ${sizeVariants[size] ?? ''}`}
        style={{
          backgroundColor,
        }}
      >
        <div
          style={{
            textAlign: 'right',
            width: '100%',
          }}
          onClick={() => controls.close()}
        >
          <span style={{ fontSize: '2rem', paddingRight: '1rem' }}>x</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'between',
            alignItems: 'center',
          }}
        >
          <h1>{title}</h1>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default ModalTemplate;
