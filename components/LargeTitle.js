import React from 'react'
import Fade from 'react-reveal/Fade'

String.prototype.replaceLast = function (what, replacement) {
    var pcs = this.split(what);
    var lastPc = pcs.pop();
    return pcs.join(what) + replacement + lastPc;
}

export default class LargeTitle extends React.Component {
  render () {
    return (  
      <div className="p-4 bg-white -m-4 font-sans font-light text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-grey-darkest mb-2 no-underline leading-tight">
        <Fade bottom distance="50px" delay={300}>
          {this.props.text.replaceLast(" ", "\u00a0")}
        </Fade>
      </div>
    )
  }
}