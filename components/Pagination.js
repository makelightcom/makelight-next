import { object, string } from 'prop-types'
import Link from 'next/link'
import ArrowRight from 'react-entypo-icons/lib/entypo/ArrowRight'
import ArrowLeft from 'react-entypo-icons/lib/entypo/ArrowLeft'

class Pagination extends React.Component {
  static propTypes = {
    prismic: object,
    href: string
  }

  render() {
    const page = this.props.prismic.page
    const nextPage = this.props.prismic.total_pages > page ? page + 1 : null
    const prevPage = this.props.prismic.page > 1 ? page - 1 : null
    return  (
      <div>
        <div className="inline-block text-left font-light font-title float-left text-grey">
          <span>{page}</span><span>/</span><span>{this.props.prismic.total_pages}</span>
        </div>
        <div className="font-title inline-block text-right float-right">
          {prevPage ?
            <Link href={`${this.props.href}?page=${prevPage}`}><a className="text-2xl text-grey active:text-pink hover:text-grey-dark" rel="prev" aria-label="Previous page"><ArrowLeft /></a></Link>            
          :
            <span className="text-2xl text-grey-light"><ArrowLeft /></span>            
          }
          {nextPage ? 
            <Link href={`${this.props.href}?page=${nextPage}`}><a className="text-2xl text-grey active:text-pink hover:text-grey-dark" rel="next" aria-label="Next page"><ArrowRight /></a></Link>            
          :
            <span className="text-2xl text-grey-light"><ArrowRight /></span>            
          }
        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
}

export default Pagination