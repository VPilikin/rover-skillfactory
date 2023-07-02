import { Link } from 'react-router-dom'
import styles from '../styles/Header.module.css'
import React, { useContext } from 'react'
import { Context } from '..'

function Header() {
  const { store } = useContext(Context)
  return (
    <header className={styles.header}>
      <h1>Сервис проката велосипедов</h1>
      <Link to="/">
        <button type="button" className="btn btn-primary">
          Главная
        </button>
      </Link>
      {store.isAuth ? (
        <>
          <button disabled className="btn btn-outline-primary">
            {store.user.email}
          </button>
          <Link to="/">
            <button
              onClick={() => store.logout()}
              type="button"
              className="btn btn-primary"
            >
              Выйти
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <button type="button" className="btn btn-primary">
              Логин
            </button>
          </Link>
          <Link to="/registration">
            <button type="button" className="btn btn-primary">
              Регистрация
            </button>
          </Link>
        </>
      )}
    </header>
  )
}

export default Header
