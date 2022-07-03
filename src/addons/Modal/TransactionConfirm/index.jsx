import React, {useContext} from 'react';
import {ModalContext} from '../useModalContext';
import ModalTemplate from '../Template';

function TransactionConfirm() {
  const {controls} = useContext(ModalContext);
  return (
    <ModalTemplate
      options={{
        size: 'small',
        title: 'Confirm Transaction',
        backgroundColor: 'grey'
      }}
    >
      This action will incur a Fennel Token fee.
      <button onClick={() => controls.close()}>Confirm</button>
      <button onClick={() => controls.close()}>Cancel</button>
    </ModalTemplate>
  );
}

export default TransactionConfirm;
