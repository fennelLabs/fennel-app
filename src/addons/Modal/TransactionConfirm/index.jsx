import React, {useContext} from 'react';
import {ModalContext} from '../useModalContext';
import ModalTemplate from '../Template';
import PropTypes from 'prop-types';

function TransactionConfirm(props) {
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
      <button
        onClick={() => {
          props.onConfirm();
          controls.close();
        }}
      >
        Confirm
      </button>
      <button onClick={() => controls.close()}>Cancel</button>
    </ModalTemplate>
  );
}

TransactionConfirm.propTypes = {
  onConfirm: PropTypes.function
};

export default TransactionConfirm;
