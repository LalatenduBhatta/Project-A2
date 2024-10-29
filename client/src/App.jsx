import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'


function App() {
  let data = useLocation()
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    const { pathname } = data
    if (pathname == "/login" || pathname == "/signup") {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [data])
  return (
    <>
      {auth || <Navbar />}
      <Outlet />
    </>
  )
}

export default App