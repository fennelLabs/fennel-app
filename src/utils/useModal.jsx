import {useContext} from 'react';
import AppContext from '../contexts/AppContext';

function useModal(name) {
  const context = useContext(AppContext);
  return context.getModalHandle(name);
}

export default useModal;
