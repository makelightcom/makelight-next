import PageHead from '../components/PageHead'
import React, { Fragment } from 'react'
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

export default class Programme extends React.Component {
  static async getInitialProps ({ req, query }) {
    const { json, error } = await cachedMakelightFetch('courses/all', req)
    const courses = json
    return { courses: courses, error: error }
  }

  componentWillMount () {
    const client = Client.buildClient({
      storefrontAccessToken: '56234183c75028b8a2e4bb7ac4da6523',
      domain: 'makelight-uk.myshopify.com'
    })
    this.setState({ shopifyClient: client })
  }

  render () {
    {
      /* Bloom         Create a beautiful brand for your project
    Honey -       Beautify your Instagram
    Essentials -  Learn to take beautiful photographs
    Family -      Tell your family story
    Food -        Improve your food photography
    Cut           Improve the videos you create for social media
    Ads           Use Facebook ads to grow your audience
    Makers        Tell your maker story through photography
    Pin           Grow your audience on Pinterest
    Puzzle        Use an experimental approach to growth
    Thread        Kick-start your blog */
    }

    const { courses } = this.props

    let brandingAndSocialCourses = [
      {
        title: 'Bloom',
        subject: 'Branding',
        proposition: 'Create a unique and meaningful brand for your project',
        slug: 'bloom-0917'
      },
      {
        title: 'Honey',
        subject: 'Instagram',
        proposition: 'Beautify your Instagram',
        slug: 'honey-0717'
      },
      {
        title: 'The Pin',
        subject: 'Pinterest',
        proposition: 'Get your Pinterest set up for growth',
        slug: 'the-pin'
      }
    ].map(link => {
      link.course = courses.find(i => i.slug === link.slug)
      return link
    })

    let growthCourses = [
      {
        title: 'Facebook advertising',
        subject: 'Advertising',
        proposition: 'Use Facebook ads to grow your audience',
        slug: 'facebook-ads-intro'
      },
      {
        title: 'Introduction to Podcasting',
        subject: 'Podcasting',
        proposition: 'Get set up and running with your own podcast',
        slug: 'podcasting-intro'
      },
      {
        title: 'The Thread',
        subject: 'Blogging',
        proposition: 'Give your blogging a kick-start',
        slug: 'thread-0517'
      },
      {
        title: 'Puzzle',
        subject: 'Process',
        proposition: 'Use an experimental approach to growth',
        slug: 'puzzle'
      },
      {
        title: 'The Cut',
        subject: 'Video',
        proposition: 'Improve the videos you create for social media',
        slug: 'cut-0617'
      }
    ].map(link => {
      link.course = courses.find(i => i.slug === link.slug)
      return link
    })

    let photographyCourses = [
      {
        title: 'Photography Essentials',
        subject: 'Photography',
        proposition: 'Learn to take beautiful photographs',
        slug: 'essentials-0617'
      },

      {
        title: 'Photography for Makers',
        subject: 'Makers',
        proposition: 'Improve the photographs you take of the things you make',
        slug: 'makers0217'
      },

      {
        title: 'Family Storytelling',
        subject: 'Family',
        proposition: 'Tell your family story through beautiful images',
        slug: 'family-0817'
      },

      {
        title: 'Food Photography',
        subject: 'Food',
        proposition: 'Improve the images you make of the food you love',
        slug: 'food0417'
      }
    ].map(link => {
      link.course = courses.find(i => i.slug === link.slug)
      return link
    })

    return (
      <div>
        <PageHead
          title='The Makelight Membership'
          ogImage='https://prismic-io.s3.amazonaws.com/makelight/a949c6b2-729d-4c39-9138-ff95db0108fc_img_1127.jpg'
          description='Grow your creative business or passion project with Makelight courses and a supportive community around you to help keep you motivated'
        />
        <div className='lg:flex'>
          <div className='lg:flex-1'>
            <div className='max-w-md m-auto px-4'>
              <AnimatedHero
                title='The Makelight Membership'
                subtitle='Grow and develop your creative business or personal project'
              />
              <Fade delay={500}>
                <div className='p-8 text-center max-w-md m-auto'>
                  <p className='text-grey-darker'>
                    {brandingAndSocialCourses.length +
                      photographyCourses.length +
                      growthCourses.length}{' '}
                    inspiring, practical courses to dip into at your own pace
                    over six months. A vibrant, supportive Facebook group of
                    Makelight members also joining in. And regular live Q&A
                    sessions with Emily Quinton to keep you motivated and
                    inspired.
                  </p>
                  <div className='p-8'>
                    <h3 className='pb-8'>Membership is currently closed</h3>
                    {/*<h3 className='pb-8'>£175 for 6 months access.</h3>*/}
                    {/*<BuyButton
                      variantId={'12943684763690'}
                      productId={'1478339690538'}
                      cta='Buy now'
                      shopifyClient={this.state.shopifyClient}
                    />*/}
                    {/*                    <p className="pt-8">Use the code PAUSE at checkout until Friday.</p>
*/}{' '}
                  </div>
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

        <div className='py-8 mt-8 bg-teal-lightest text-center relative'>
          <h1 className='text-grey-darker font-light p-4 mb-4'>
            Branding and visual storytelling
          </h1>
          <p className='text-grey-darker opacity-50'>
            {brandingAndSocialCourses.length} courses
          </p>
          <div className='card-box relative'>
            <div
              className='card-container text-left px-4 pin m-auto'
              style={{ width: `${brandingAndSocialCourses.length * 28}rem` }}
            >
              {brandingAndSocialCourses.map(item => (
                <ProgrammeItem key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div className='py-n8 bg-pink-lightest text-center relative'>
          <h1 className='text-grey-darker font-light p-4 mb-4'>
            Photography and styling
          </h1>
          <p className='text-grey-darker opacity-50'>
            {photographyCourses.length} courses
          </p>
          <div className='card-box relative'>
            <div
              className='card-container text-left px-4 pin m-auto'
              style={{ width: `${photographyCourses.length * 28}rem` }}
            >
              {photographyCourses.map(item => (
                <ProgrammeItem key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div className='py-8 bg-yellow-lightest text-center'>
          <h1 className='text-grey-darker font-light p-4 mb-4'>
            Growth and social
          </h1>
          <p className='text-grey-darker opacity-50'>
            {growthCourses.length} courses
          </p>
          <div className='card-box relative'>
            <div
              className='card-container text-left px-4 pin m-auto'
              style={{ width: `${growthCourses.length * 28}rem` }}
            >
              {growthCourses.map(item => (
                <ProgrammeItem key={item.slug} item={item} />
              ))}
            </div>
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
