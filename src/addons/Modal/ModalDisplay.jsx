import React from 'react';
import MenuModal from './Menu';
import OkDialog from './OkDialog';

const ModalOptions = {
  Menu: MenuModal,
  OkDialog: OkDialog
};

function ModalDisplay({name}) {
  const Modal = ModalOptions[name];
  return Modal && <Modal />;
}

export default ModalDisplay;
