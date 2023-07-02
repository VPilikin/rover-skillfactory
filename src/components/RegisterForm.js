import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const { store } = useContext(Context)
  const [message, setMessage] = useState('')

  async function handleRegistration(e) {
    e.preventDefault()
    await store.registration(email, password, firstName, lastName)
    setMessage(store.message)
  }

  return (
    <form className="container">
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
      <div className="input-group flex-nowrap">
        <input
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          type="text"
          className="form-control"
          placeholder="Имя"
        />
      </div>
      <div className="input-group flex-nowrap">
        <input
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          type="text"
          className="form-control"
          placeholder="Фамилия"
        />
      </div>

      <div className="container">
        <button
          onClick={handleRegistration}
          type="button"
          className="btn btn-primary"
        >
          Зарегистрироваться
        </button>
        <p className="container">{message}</p>
      </div>
    </form>
  )
}

export default observer(RegisterForm)
