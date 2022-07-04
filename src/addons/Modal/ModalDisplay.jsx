import React from 'react';
import MenuModal from './Menu';
import OkDialog from './OkDialog';
import TransactionConfirm from './TransactionConfirm';

const ModalOptions = {
  Menu: MenuModal,
  OkDialog: OkDialog,
  TransactionConfirm: TransactionConfirm
};

function ModalDisplay({name}) {
  const Modal = ModalOptions[name];
  return Modal && <Modal />;
}

export default ModalDisplay;
