import React from 'react';
import useModal from '../../../utils/useModal';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';

function Home() {
  const controls = useModal('Menu');
  const okdialog = useModal('OkDialog');

  return (
    <div className="flex flex-row">
      <div className="basis-4/4 px-8">
        <PageTitle>Home</PageTitle>
        <Button onClick={() => controls.open()}>Open Menu</Button>
        <Button onClick={() => okdialog.open()}>Ok Dialog</Button>
      </div>
    </div>
  );
}

export default Home;
