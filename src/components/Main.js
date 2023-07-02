import React, { useContext } from 'react'
import { Context } from '../index'
import { Link } from 'react-router-dom'

const Main = () => {
  const { store } = useContext(Context)
  return (
    <main className="container">
      <Link to="/newcase">
        <button type="button" className="btn btn-danger btn-lg btn-block">
          Заявить о краже
        </button>
      </Link>
      {store.isAuth && (
        <>
          <Link to="/cases">
            <button type="button" className="btn btn-danger btn-lg btn-block">
              Сообщения о кражах
            </button>
          </Link>
          <Link to="/officers">
            <button type="button" className="btn btn-danger btn-lg btn-block">
              Ответственные сотрудники
            </button>
          </Link>
        </>
      )}
    </main>
  )
}

export default Main
