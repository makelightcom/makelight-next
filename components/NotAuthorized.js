import Fade from 'react-reveal/Fade';
import AnimatedIcon from './AnimatedIcon'
import {Fragment} from 'react'

const NotAuthorized = (props) => {
 
  return (    
      <div className='big-hero pt-8 pb-8'>  
        <div style={{minHeight: '16rem'}}>
          <div className="w-16 m-auto text-center" style={{width: '64px', margin: 'auto'}}><AnimatedIcon /></div>
           { (typeof(window) !== 'undefined') && 
            <Fragment>
              <h1 className='font-light font-title title text-5xl text-pink-light tracking-wide'><Fade bottom cascade>Please sign in</Fade></h1>
              
            </Fragment>
          }
        </div>
        
        <style jsx>{`
          .title {
            align-self: center;
            justify-self: center;
          }
        `}</style>
      </div>)
}

export default NotAuthorized