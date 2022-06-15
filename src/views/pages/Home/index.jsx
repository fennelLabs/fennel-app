import React from 'react';
import useModal from '../../../utils/useModal';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';

function Home() {
  const controls = useModal('Menu');
  const okdialog = useModal('OkDialog');

  return (
    <PageContainer>
      <div className="flex flex-row">
        <div className="basis-4/4 px-8">
          <PageTitle>Home</PageTitle>
          <Button onClick={() => controls.open()}>Open Menu</Button>
          <Button onClick={() => okdialog.open()}>Ok Dialog</Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default Home;
