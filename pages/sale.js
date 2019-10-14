import PageHead from '../components/PageHead'
import React, { Fragment } from 'react'
import PrismicConfig from '../prismic.config.js'
import {asText} from '../utils/prismic'
import AnimatedHero from '../components/AnimatedHero'
import Fade from 'react-reveal/Fade'
import SquareArticleImage from '../components/SquareArticleImage'
import CourseDetails from '../components/CourseDetails'
import Sticky from 'react-sticky-el'
import ProgrammeItem from '../components/ProgrammeItem'
import BuyButton from '../components/BuyButton'
import Client from 'shopify-buy'
import { cachedMakelightFetch } from '../utils/MakelightApi'
import ErrorBoundary from '../components/ErrorBoundary'

export default class Sale extends React.Component {
  static async getInitialProps ({ req, query }) {
    const api = await PrismicConfig.getApi()
    const page = await api
      .getByUID('page', 'summer-sale-2018')
      .catch(err => console.log(err))

    return { page }
  }

  componentWillMount () {
    const client = Client.buildClient({
      storefrontAccessToken: '56234183c75028b8a2e4bb7ac4da6523',
      domain: 'makelight-uk.myshopify.com'
    })
    this.setState({ shopifyClient: client })
  }

  render () {
    return (
      <div>
        <PageHead
          title='The Makelight Summer Sale'
          ogImage='https://prismic-io.s3.amazonaws.com/makelight/a949c6b2-729d-4c39-9138-ff95db0108fc_img_1127.jpg'
          description={`We're having a sale! Get a big discount on upcoming online courses and workshops`}
        />
        <div className='lg:flex'>
          <div className='lg:flex-1'>
            <div className='max-w-md m-auto px-4'>
              <AnimatedHero
                title='The Makelight Summer Sale'
                subtitle={`We're having a sale! Get a big discount on upcoming online courses and workshops`}
              />
              <Fade delay={500}>
                <div className='p-8 text-center max-w-md m-auto'>
                  <p className='text-grey-darker'>
                    Inspiring, practical courses to dip into at your own pace each with a vibrant, supportive Facebook group of
                    all learning and improving together. And live Q&A
                    sessions with Emily Quinton to keep you motivated and
                    inspired.
                  </p>

                </div>
              </Fade>
            </div>
          </div>
          <div className='lg:flex-1'>
            <SquareArticleImage
              alt='Large image of Emily about the Makelight Programme'
              imageUrl={
                'https://prismic-io.s3.amazonaws.com/makelight/a949c6b2-729d-4c39-9138-ff95db0108fc_img_1127.jpg'
              }
            />
          </div>
        </div>

        <style jsx>{`
          .card-box {
            height: 40rem;
            width: 100%;
            overflow-x: scroll;
            overflow-y: hidden;
            width: 100%;
            -webkit-overflow-scrolling: touch;
          }

          .card-container {
            display: grid;

            grid-template-columns: repeat(auto-fit, 16rem);
            grid-gap: 2rem;
            margin: auto;
            margin-bottom: 4rem;
            position: absolute;
          }

          @media (min-width: 768px) {
            .card-container {
              grid-template-columns: repeat(auto-fit, 18rem);
              grid-gap: 2rem;
            }
          }

          @media (min-width: 992px) {
            .card-container {
              grid-template-columns: repeat(auto-fit, 20rem);
              grid-gap: 2rem;
            }
          }

          @media (min-width: 1200px) {
            .card-container {
              grid-template-columns: repeat(auto-fit, 24rem);
              grid-gap: 4rem;
            }
          }
        `}</style>
      </div>
    )
  }
}
