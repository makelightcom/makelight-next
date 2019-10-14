import PageHead from '../components/PageHead'
import React, { Fragment } from 'react'
import Hero from '../components/hero'
import Fade from 'react-reveal/Fade';
import SquareArticleImage from '../components/SquareArticleImage'
import CourseDetails from '../components/CourseDetails'
import Sticky from 'react-sticky-el'

export default class ProgrammeItem extends React.Component {

  state = {
    showing: false
  }

  componentDidMount() {
    this.setState({
      showing: false
    })
  }

  toggleShowing = () => {
    this.setState({showing: !this.state.showing})
  }

  render () {
    const {item} = this.props
    const {showing} = this.state
    return(
      <div className="programme-item">
        <Fade bottom distance="50px">
          <div className={`${item.slug}-card max-w-2xl relative h-full rounded bg-white overflow-hidden no-underline shadow-lg`}>            
            {!showing && 
              <div className='programme-card bg-white'>
              
                <div>
                  {item.course && 
                    <SquareArticleImage nopin={true} useImgix={true} imageUrl={item.course.image_url} />
                  }
                </div>
                <div className="p-4 programme-card-info">                
                  <div className="h-8">
                    <h3 className="text-grey-darker">
                      <span 
                        className="float-left" 
                        style={{color: ((item.course && item.course.colour) ? `#${item.course.colour}` : '#aaa')}}
                      >{item.subject}</span>
                      {item.course && item.course.lesson_number &&
                        <span className="float-right font-light font-title text-grey-dark">{item.course.lesson_number} episodes</span>
                      }
                    </h3>
                  </div>
                  <div className="clearfix">
                    <h2 className="clearfix text-grey-darker font-light">{item.proposition}</h2>
                  </div>
                                    
                  <div className="text-right mt-4">
                    <a onClick={this.toggleShowing} 
                      className="text-white p-4 px-6 inline-block font-title" 
                      style={{backgroundColor: ((item.course && item.course.colour) ? `#${item.course.colour}` : '#aaa')}}>
                      Learn more
                    </a>
                  </div>
                                  
                </div>              
              </div>

            }            
            {showing &&   
              <div className="programme-card bg-white overflow-y-scroll" style={{height: '600px'}}>
                <div className="block text-right absolute z-10 pin-top">
                  <a onClick={this.toggleShowing} 
                    className="text-white p-3 px-3 inline-block font-title"
                    style={{backgroundColor: ((item.course && item.course.colour) ? `#${item.course.colour}` : '#aaa')}}
                  >
                    &times;
                  </a>
                </div>
                <div className="font-sans programme-card-full p-4 lg:p-8 z-1 relative">
                  <h3 className="py-6 font-light">The “{item.title}” course includes {item.course.lesson_number} episodes</h3>
                  <CourseDetails courseId={item.course.prismic_course_id}/>
                </div>
              </div>              
            }
          </div>
        </Fade>

        <style jsx>{`

          .programme-card-info {
            display: block;
            
          }

          
        `}</style>
      </div>
    )
  }
}