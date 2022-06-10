import React from 'react';
import useModal from '../../utils/useModal';

function Demo() {
  const controls = useModal('Menu');
  const okdialog = useModal('OkDialog');

  return (
    <>
      <div>
        <button onClick={() => controls.open()}>Open Menu</button>
        <button onClick={() => okdialog.open()}>Ok Dialog</button>
      </div>
    </>
  );
}
