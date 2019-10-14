import LessonCardList from '../../components/LessonCardList'
import { Predicates } from 'prismic-javascript'
import React from 'react'
import PrismicConfig from '../../prismic.config.js'
import {RichText} from 'prismic-reactjs'
import SquareArticleImage from '../../components/SquareArticleImage'
import AnimatedHero from '../../components/AnimatedHero'
import BuyButton from '../../components/BuyButton'
import ShopifyProductPrice from '../../components/ShopifyProductPrice'
import JoinInButton from '../../components/JoinInButton'
import JoinTheMembershipButton from '../../components/JoinTheMembershipButton'
import Fade from 'react-reveal/Fade'
import Client from 'shopify-buy'
import ErrorBoundary from '../../components/ErrorBoundary'
import SliceList from '../../components/SliceList'
import PageHead from '../../components/PageHead'
import btoa from 'btoa'

const shopifyClient = Client.buildClient({
  storefrontAccessToken: '56234183c75028b8a2e4bb7ac4da6523',
  domain: 'makelight-uk.myshopify.com'
})

class CourseCta extends React.Component {
  render () {
    const {course, shopifyClient, shopifyProduct} = this.props
    return (
      <div>
        {(course.data.course_type == 'Paid') &&
          <div>
            <div className='pb-4'>
              <ShopifyProductPrice shopifyProduct={shopifyProduct} />
            </div>
            <BuyButton
              productId={course.data.shopify_product_id}
              buttonText='Buy now'
              shopifyClient={shopifyClient} />
          </div>
        }
        {(course.data.course_type == 'Membership') &&
          <div>
            <p className='py-6'>This course is available when you have a Makelight membership subscription</p>
            <JoinTheMembershipButton course={course} buttonText='Join the membership' />
          </div>
        }
        {(course.data.course_type == 'Free') &&
          <JoinInButton course={course} buttonText='Join in' />
        }

        <p className='m-auto text-center px-4 py-6'>
          <span className='pr-4'>Already joined?</span>
          <a href={`/courses/${course.uid}`}>Go to the course dashboard</a>
        </p>
      </div>
    )
  }
}

class HowItWorksItem extends React.Component {
  render () {
    const {item, index} = this.props

    if (!item.point[0]) {
      return <div />
    }
    return (
      <div>
        <Fade delay={100 * index}>
          <div>
            <div><h3>{item.point[0].text}</h3></div>
            {item.point_description && item.point_description[0] &&
              <div><p>{item.point_description[0].text}</p></div>
            }
          </div>
        </Fade>
      </div>
    )
  }
}

class CourseAbout extends React.Component {
  componentWillMount () {
    this.setState({shopifyClient: shopifyClient})
  }

  static async getInitialProps ({ req, query }) {
    const api = await PrismicConfig.getApi()

    const course = await api.getByUID('course', query.uid)
      .catch(err => console.log(err))

    if (!course) {
      const err = new Error()
      err.code = 'ENOENT'
      throw err
    }

    const lessons = await api.query([
      Predicates.any('document.type', [ 'lesson' ]),
      Predicates.at('my.lesson.course', course.id)
    ],
    {
      pageSize: '50',
      orderings: ['[my.lesson.number]']
    })
      .catch(err => console.log(err))

    let shopifyProduct = {}
    if (course.data.shopify_product_id) {
      const productAscii = btoa(`gid://shopify/Product/${course.data.shopify_product_id}`)
      shopifyProduct = await shopifyClient.product.fetch(productAscii)
    }
    return { course, lessons: lessons.results, shopifyProduct }
  }

  render () {
    const {course, lessons, shopifyProduct} = this.props
    const {data} = course
    let openGraph = {
      'og:type': 'product',
      'og:brand': 'Makelight'
    }
    if (shopifyProduct && shopifyProduct.variants) {
      openGraph['product:price:amount'] = shopifyProduct.variants[0].price
      openGraph['product:price:currency'] = 'GBP',
      openGraph['og:price:standard_amount'] = shopifyProduct.variants[0].price
    }
    return <div>
      <PageHead
        title={RichText.asText(data.title)}
        description={RichText.asText(data.headline)}
        ogImage={data.image.url}
        og={openGraph} />
      <div className='lg:flex'>
        <div className='lg:flex-1'>
          <div className='max-w-md m-auto px-4'>
            <AnimatedHero
              title={RichText.asText(data.title)}
              subtitle={RichText.asText(data.headline)} />
            <Fade delay={700}>
              <h3 className='text-grey-dark uppercase tracking-wide text-sm m-auto text-center'>A Makelight online course</h3>
            </Fade>
            <div className='lg:hidden -m-4'>
              <Fade delay={300}>
                <SquareArticleImage
                  alt='Course header image'
                  useImgix
                  imageUrl={course.data.image.url} />
              </Fade>
            </div>
            <Fade delay={500}>
              <div>
                <div className='p-8 text-center max-w-md m-auto'>
                  {RichText.render(data.intro, PrismicConfig.linkResolver)}
                  <div className='p-8'>
                    <CourseCta
                      shopifyProduct={shopifyProduct}
                      course={course}
                      shopifyClient={this.state.shopifyClient} />
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
        <div className='lg:flex-1 xl:flex-1 lg:block xl:block hidden'>
          <SquareArticleImage
            alt='Course header image'
            useImgix
            imageUrl={course.data.image.url} />
        </div>
      </div>

      {data.body && RichText.asText(data.body) &&
        <div className='lg:bg-grey-lighter'>
          <div className='px-4 py-8 m-auto'>
            <ErrorBoundary>
              <SliceList sliceZone={data.body} article={course} />
            </ErrorBoundary>
          </div>
        </div>
      }

      {data.how_it_works && RichText.asText(data.how_it_works_title) &&
        <div className='white'>
          <div className='px-4 py-8 max-w-xl m-auto'>
            <h1 className='font-light text-center m-auto w-full py-6'>
              {data.how_it_works_title ? RichText.asText(data.how_it_works_title) : 'How it works'}
            </h1>

            {data.how_it_works &&
              <ErrorBoundary>
                <div className='how-it-works-items'>
                  {data.how_it_works.map((item, index) =>
                    <HowItWorksItem item={item} index={index} key={index} />
                  )}
                </div>
              </ErrorBoundary>
            }
            <div className='pa-6 text-center'>
              <CourseCta
                shopifyProduct={shopifyProduct}
                course={course}
                shopifyClient={this.state.shopifyClient} />

            </div>
          </div>
        </div>
      }

      {lessons && (lessons.length > 0) &&
        <div className='lesson-list'>
          <h1 className='font-light text-center m-auto w-full py-6'>Episodes included</h1>

          <LessonCardList lessons={lessons} link={false} />
        </div>
      }

      <div className='some-breathing-room lg:h-6' />

      <style jsx>{`
        @media(min-width:769px) {
          .how-it-works-items {
            display: grid;
            grid-gap: 2rem;
            grid-template-columns: 1fr 1fr;
          }
        }

        @media(min-width:992px) {
          .how-it-works-items {
            display: grid;
            grid-gap: 2rem;
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
      `}</style>
    </div>
  }
}

export default CourseAbout
