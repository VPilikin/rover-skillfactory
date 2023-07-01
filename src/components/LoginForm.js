import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { store } = useContext(Context)

  return (
    <form>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="login">
          @
        </span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          className="form-control"
          placeholder="E-mail"
          aria-label="Username"
          aria-describedby="login"
        />
      </div>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="password">
          **
        </span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control"
          placeholder="Пароль"
          aria-label="Username"
          aria-describedby="password"
        />
      </div>
      <button
        onClick={() => store.login(email, password)}
        type="button"
        className="btn btn-primary"
      >
        Логин
      </button>
      <button
        onClick={() => store.registration(email, password)}
        type="button"
        className="btn btn-outline-primary"
      >
        Регистрация
      </button>
    </form>
  )
}

export default observer(LoginForm)
