import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux';

function Header() {

  const landingPage = useSelector(state => state.pokemons.landingPage)

  if(landingPage) return null;


  return (
    <Fragment>
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary justify-content-between'>
            <div className='container'>
                <h1><Link to={'/'} className='text-light'>POKEMON APP</Link></h1>

            </div>
            <Link to='/pokemons/new' className='btn btn-danger nuevo-post d-block d-md-inline-block'>Create Pokemon &#43; </Link>

        </nav>
    </Fragment>
  )
}

export default Header