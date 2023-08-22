import './LoadingPage.css'
import Dlogo from '../../image/drizzle_logoD.png'
const LoadingPage = () => {

    return (
        <>
            <div className="loading-container">
                <div className='loading-inner-logo'>
                    <span  className='loading-inner-span '>
                    <img src={Dlogo} alt='Drizzle Logo'  className='loading-inner-img'/></span>
                   <h3>Loading...</h3> 
                </div>
            </div>

        </>
    )
}

export default LoadingPage;