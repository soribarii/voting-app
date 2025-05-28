import React from 'react'
import Spinner from '../assets/loader.gif'

function Loader() {
  return (
    <section className="loader">
        <div className="loader__container">
            <img src={Spinner} alt="Loader Spinner" />
        </div>
    </section>
  )
}

export default Loader