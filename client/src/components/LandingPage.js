import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {switchLandingAction} from '../actions/pokemonActions'

function LandingPage() {

  const dispatch = useDispatch();

  useEffect(()=> {
    
    const switchLanding = (state) => dispatch(switchLandingAction(state));
    switchLanding(true);
    
      
    return () => switchLanding(false) 


  },[dispatch])

  
  

  return (
    <div>
      <Link to='/home' ><button>Enter</button></Link>
    </div>
  )
}

export default LandingPage