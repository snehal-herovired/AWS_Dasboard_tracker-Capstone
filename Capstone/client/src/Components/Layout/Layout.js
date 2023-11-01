import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({children}) {
  return (
    <>
        <Header/>
        <main style={{minHeight:'75vh'}}>
        <ToastContainer />
            {children}
        </main>
        <Footer/>
    </>
  )
}

export default Layout