import React from 'react';
import MenuModal from './Menu';
import OkDialog from './OkDialog';
import TransactionConfirm from './TransactionConfirm';
import PropTypes from 'prop-types';

const ModalOptions = {
  Menu: MenuModal,
  OkDialog: OkDialog,
  TransactionConfirm: TransactionConfirm
};

function ModalDisplay({ name }) {
  const Modal = ModalOptions[name];
  return Modal && <Modal />;
}

ModalDisplay.propTypes = {
  name: PropTypes.string
};

export default ModalDisplay;
