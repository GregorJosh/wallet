import { Button } from 'components';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsModalLogoutOpen } from 'redux/global/selectors';
import { setIsModalLogoutOpen } from 'redux/global/globalSlice';
import { logOut } from 'redux/session/operations';

import css from './ModalLogout.module.scss';
import sprite from '../../images/icons.svg';

export const ModalLogout = () => {
  const dispatch = useDispatch();
  const handleCloseModalLogout = () => {
    dispatch(setIsModalLogoutOpen(false));
  };

  const isModalLogoutOpen = useSelector(selectIsModalLogoutOpen);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(setIsModalLogoutOpen(false));
  };

  return isModalLogoutOpen ? (
    <div className={css.modal__overlay}>
      <div className={css.modal}>
        <div>
          <h5 className={css.modal__title}>Are you sure you want to leave?</h5>
          <button
            type="button"
            className={css.modal__close}
            onClick={handleCloseModalLogout}
          >
            <svg width="16px" height="16px">
              <use href={`${sprite}#icon-close`}></use>
            </svg>
          </button>
          <div className={css.btn_container}>
            <Button type="button" theme="color" onClick={handleLogout}>
              Yes
            </Button>
            <Button
              type="button"
              theme="white"
              onClick={handleCloseModalLogout}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
