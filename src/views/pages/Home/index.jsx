import React from 'react';
import useModal from '../../../utils/useModal';

function Home() {
  const controls = useModal('Menu');
  const okdialog = useModal('OkDialog');

  return (
    <div>
      <h1>Home</h1>
      <div>
        <button onClick={() => controls.open()}>Open Menu</button>
        <button onClick={() => okdialog.open()}>Ok Dialog</button>
      </div>
    </div>
  );
}

export default Home;
