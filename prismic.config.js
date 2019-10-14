import Prismic from 'prismic-javascript'

export default {

  apiEndpoint: 'https://makelight.prismic.io/api/v2',

  linkResolver(doc) {
    if (doc.type === 'article') return `/articles/${doc.uid}`
    if (doc.type === 'author') return `/authors/${doc.uid}`
    if (doc.type === 'lesson') return `/lessons/${doc.uid}`
    return "/";
  },

  async getApi (req) {
    const api = (req && req.prismic) ? req.prismic.api : (
      (
        (typeof(window) !== 'undefined') && window.prismicApi) ? 
          prismicApi 
          : 
          await Prismic.api('https://makelight.prismic.io/api/v2'
      )
    )

    if((typeof(window) !== 'undefined')) {
      window.prismicApi = api
    }

    return(api)
  }
};