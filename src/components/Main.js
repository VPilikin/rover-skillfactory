import React, { useContext } from 'react'
import { Context } from '../index'
import { Link } from 'react-router-dom'

const Main = () => {
  const { store } = useContext(Context)
  return (
    <main className=" container container-main">
      {store.isAuth ? (
        <>
          <Link to="/newcase">
            <button type="button" className="btn btn-danger btn-lg btn-block">
              Заявить о краже
            </button>
          </Link>
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
      ) : (
        <div className="card">
          <h5 className="card-header">
            Внимание! Приложение находится на стадии тестирования, некоторые
            функции могут быть не доступны
          </h5>
          <div className="card-body">
            <h5 className="card-title"></h5>
            <p className="card-text">
              Приложение позволяет оставлять заявления о краже велосипедов
              компании любым пользователям, а также для сотрудников компании
              производить сбор, анализ и работу с информацией о краже
              велосипедов. Вы можете оставить заявление сразу или пройти
              процедуру регистрации
            </p>
            <Link to="/newcase">
              <button type="button" className="btn btn-danger btn-lg btn-block">
                Заявить о краже
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}

export default Main
