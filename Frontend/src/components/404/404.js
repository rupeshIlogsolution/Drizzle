import React from 'react'
import logo from '../../image/404.png'

 const PageNotFound = () => {
  return (
    <>
    <div className='pnf d-flex flex-column justify-content-center align-items-center' style={{height:"90vh"}}>
       <h1>Page Not Found</h1>
       <img style={{width:"400px"}} src={logo} alt='404 img'/>
    </div>
    </>
  )
}

export default PageNotFound;