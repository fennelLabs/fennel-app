import React from 'react';

function PageContainer(props) {
  return (
    <main className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          {props.children}
        </div>
      </div>
    </main>
  );
}

export default PageContainer;
