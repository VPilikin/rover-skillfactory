import React, { useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser'
import UserService from './services/UserService'
import { AuthResponse } from './models/response/AuthResponse'

function App() {
  const { store } = useContext(Context)
  const [officers, setOfficers] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getOfficers() {
    try {
      const response = await UserService.fetchOfficers()
      setOfficers(response.data.officers)
    } catch (error) {
      console.log(error)
    }
  }

  if (store.isLoading) {
    return <h1>Загрузка...</h1>
  }
  if (!store.isAuth) {
    return (
      <>
        <LoginForm />
      </>
    )
  }
  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : 'Необходима авторизация'}
      </h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getOfficers}>Получить пользователей</button>
      </div>
      {officers.map((officer) => (
        <div key={officer._id}>{officer.email}</div>
      ))}
    </div>
  )
}

export default observer(App)
