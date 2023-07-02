import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes, redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'
import Main from './components/Main'
import NewCase from './components/NewCase'
import Cases from './components/Cases'
import Case from './components/Case'
import Officers from './components/Officers'
import Officer from './components/Officer'

function App() {
  const { store } = useContext(Context)
  const [officers, setOfficers] = useState([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  console.log(store.isAuth)
  return (
    <div className="App">
      <Header />
      {store.isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : store.isAuth ? (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/newcase" element={<NewCase />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:id" element={<Case />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/officers/:id" element={<Officer />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/newcase" element={<NewCase />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegisterForm />} />
        </Routes>
      )}
    </div>
  )
}

export default observer(App)
