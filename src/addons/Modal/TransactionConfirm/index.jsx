import React from 'react';
import ModalTemplate from '../Template';
import PropTypes from 'prop-types';

function TransactionConfirm(props) {
  return (
    <div>
      <div>
        This action will incur a Fennel Token fee. Are you sure you want to
        continue?
      </div>
      <button
        className="btn"
        onClick={() => {
          props.onConfirm();
        }}
      >
        Confirm
      </button>
      <button className="btn" onClick={() => props.onCancel()}>
        Cancel
      </button>
    </div>
  );
}

TransactionConfirm.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

export default TransactionConfirm;
