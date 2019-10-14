import React, {Component} from 'react'

class Petal extends React.Component {

  state = {
    loaded: false
  }

  componentDidMount() {
    this.setState({loaded: true})
  }
  render() {
    const {numberOfPetals, index, petal, step} = this.props
    const {red, green, blue} = petal
    const delay = 0.02*(20*Math.floor(((numberOfPetals - index)/20)))
    const colors = [[red, green, blue],[red, blue, green],[blue,red, green],[blue,green,red],[green,blue,red],[green,red,blue]]
    const palette = colors[Math.floor(step)%6]
    const color = '#' + palette[0] + palette[1] + palette[2]

    let rotation
    if(step%12 < 4) {
      rotation = (90 * (index + step + (Math.floor(index/20.0))))%360 - 180
    } 
    else if(step%16 == 4) {
      rotation = 45
    }
    else if(step%16 < 8) {
      rotation = (90 * (index + step))%360 - 180
    }
    else if(step%16 == 8) {
      rotation = 135
    }
    else if(step%16 < 12) {
      rotation = (90 * (index + step))%360 - 180
    }
    else if(step%16 < 16) {
      rotation = (90 * (2*index + step))%360 - 180
    }

    const scale = 0.5 + 0.5*(5 - step%5 + 1)/5

    const styles = {
      transition: 'all 0.5s ease-in-out', 
      width: '100%', 
      transitionDelay: `${delay}s`, 
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      opacity: (this.state.loaded ? 1 : 0.1),
    }
    
    return(  
      <div className="p">
        <svg className="animated-fill" version="1.0" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50" enableBackground="new 0 0 50 50" 
          style={styles}>
          <path 
            fill={color} 
            d="M50,50C50,22.4,27.6,0,0,0C0,27.6,22.4,50,50,50z" 
          />
        </svg>
      </div>
    )
  }
}

class PetalPattern extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.setupPetals()
  }

  state = {
    petals: [],
    step: 1
  }

  petalStep = () => {
    this.setState({step: this.state.step + 1})
  }

  setupPetals() {
    let petals = []
    let i = 0
    let numberOfPetals = typeof(window) === 'undefined' ? 160 : 160
    for(i = 0; i < numberOfPetals; i++ ) {

      var red = ['dc','ee','fb'][Math.floor(Math.random()*3)];
      var green = ['dc','ee','fb'][Math.floor(Math.random()*3)];
      var blue = ['dc','ee','fb'][Math.floor(Math.random()*3)];
      petals.push({
        red,
        green,
        blue,
        id: i
      })
    }

    let step = 1

    if(typeof(window) !== 'undefined') {
      if(typeof(this.petalInterval) !== 'undefined') {
        clearInterval(this.petalInterval)
      }
      this.petalInterval = setInterval(this.petalStep, numberOfPetals*20 + 3000)
    }

    return({petals, step, numberOfPetals})

  }

  componentWillUnMount() {
    clearInterval(this.petalInterval)
  }
  render () {
    
    const {petals, step, numberOfPetals} = this.state
    const reversePetals = petals.slice(0).reverse()
    return (
      <div className="petals">
        <div className='petal-grid absolute pin'>
          {petals && petals.map( (petal, index) =>
            <Petal step={this.state.step} key={petal.id} petal={petal} index={index} numberOfPetals={numberOfPetals} />
          )}
        </div>
        <style jsx>{`

          @media(max-width:769px) {
            .petal-grid {
              display: grid;
              grid-column-gap: 0;
              grid-template-columns: repeat(auto-fill, 10vw); 
              grid-template-rows: repeat(auto-fill, 10vw); 
              margin: auto;
              overflow: hidden;
            }

            .p {
              transition: all 0.5s ease-in-out;
              height: 10vw;
              width: 10vw;
            }
          }

          @media(min-width:769px) {
            .petal-grid {
              display: grid;
              grid-column-gap: 0;
              grid-template-columns: repeat(auto-fill, 5vw); 
              grid-template-rows: repeat(auto-fill, 5vw); 
              margin: auto;
              overflow: hidden;
            }

            .p {              
              height: 5vw;
              width: 5vw;
            }

            
          }
          
        `}</style>
      </div>
    )
  }
}

export default PetalPattern
