import { useContext } from 'react';
import { ModalContext } from '../../useModalContext';
import ModalTemplate from '../Template';

function OkDialog() {
  const { controls } = useContext(ModalContext);
  return (
    <ModalTemplate
      options={{ size: 'small', title: 'Ok Dialog', backgroundColor: 'grey' }}
    >
      Is this ok?
      <button onClick={() => controls.close()}>Yes</button>
    </ModalTemplate>
  );
}

export default OkDialog;
