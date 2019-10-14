import React, { Fragment } from 'react'
import PageHead from './PageHead'

export default class ShopifyProductPrice extends React.Component {
  render () {
    const {shopifyProduct} = this.props

    return (
      <div>
        <h3 className='text-teal'>
          {(shopifyProduct.variants[0].compareAtPrice && (shopifyProduct.variants[0].price !== shopifyProduct.variants[0].compareAtPrice)) &&
            <strike className='px-4 text-grey'>£{shopifyProduct.variants[0].compareAtPrice}</strike>
          }
          <strong>£{shopifyProduct.variants[0].price}</strong>
        </h3>
      </div>
    )
  }
}
