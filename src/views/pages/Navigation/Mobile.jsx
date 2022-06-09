import React from 'react';
import useModal from '../../../utils/useModal';

export function Mobile() {
  const {open} = useModal('Menu');

  return (
    <>
      <button
        onClick={() => {
          open();
        }}
      >
        Menu
      </button>
    </>
  );
}
