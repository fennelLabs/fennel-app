# Modals

Since modals are a separate view layer and only viewed one at a time, [react portals](https://reactjs.org/docs/portals.html) can be used to separate the view out from the DOM root into its own root, thus avoiding any unnecessary re-renders of the main DOM tree while using a modal.

## Assumptions

- only one modal can be viewed at a time
- modals rarely display dynamic data (the API can be adapted if this use case emerges)
- when using a modal, the developer must have a handle on the modal to open or close it

# Quick Start

Registering the addon

```js
import RegisterModal from './RegisterModal';

function App() {
  const modal = RegisterModal();

  return (
    <AppContext.Provider
      value={{
        ...modal.value
      }}
    >
      <MainContent />
      {modal.Component}
    </AppContext.Provider>
  );
}
```

```js
import useModal from './utils/useModal';

const {open, close} = useModal('OkDialog');
```

The modals which can be used are listed in the `ModalOptions` constant defined in [ModalDisplay](./ModalDisplay.jsx).

# Modal Template

The modal template component is should not be considered "complete" and is, therefore, optional. It can be freely updated at any time and used as each developer sees fit for their own work.

# TODO

- slide transitions
- better X button
- may need to set max-widths/heights for specific media matches
- options for modal placement (top, center, etc.)
