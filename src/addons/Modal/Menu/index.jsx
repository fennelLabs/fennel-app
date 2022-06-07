import React, {useContext} from 'react';
import ModalTemplate from '../Template';
import {Link} from 'react-router-dom';
import {ModalContext} from '../useModalContext';
import './MobileMenu.css';
import routes from '../../../config/routes';

function MenuModal() {
  const modal = useContext(ModalContext);

  return (
    <ModalTemplate options={{title: '', backgroundColor: 'seagreen'}}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          rowGap: '2rem'
        }}
      >
        {React.Children.toArray(
          routes.map((r) => (
            <Link className="menu-link" to={r.to} onClick={() => onLinkClick()}>
              {r.text}
            </Link>
          ))
        )}
      </div>
    </ModalTemplate>
  );

  function onLinkClick() {
    modal.controls.close();
  }
}

export default MenuModal;
