import React, {useContext} from 'react';
import {ModalContext} from '../useModalContext';
import ModalTemplate from '../Template';
import PropTypes from 'prop-types';

function TransactionConfirm(props) {
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
        }}
      >
        Confirm
      </button>
      <button onClick={() => props.onCancel()}>Cancel</button>
    </ModalTemplate>
  );
}

TransactionConfirm.propTypes = {
  onConfirm: PropTypes.function,
  onCancel: PropTypes.function
};

export default TransactionConfirm;
