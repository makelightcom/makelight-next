import React, { Fragment } from 'react'
import btoa from 'btoa'

export default class BuyButton extends React.Component {
  state = {
    buttonText: this.props.buttonText ? this.props.buttonText : "Buy now",
    activeButtonText: this.props.buttonText ? this.props.buttonText : "Buy now",
    disabled: false,
    error: null,
    product: null
  }

  handleBuyNow = async () => {
    const client = this.props.shopifyClient
    this.setState({disabled: true, buttonText: "Please wait"})

    let variantAscii
    let productAscii
    let variantId = this.props.variantId
    let lineItem = {quantity: 1}

    try {
      if((!this.props.variantId) && this.props.productId) {
        productAscii = btoa(`gid://shopify/Product/${this.props.productId}`)

        const product = await client.product.fetch(productAscii)
        variantAscii = product.variants[0].id
        lineItem.variantId = variantAscii
      } else {
        variantAscii = btoa(`gid://shopify/ProductVariant/${variantId}`)
        lineItem.variantId = variantAscii
      }

      client.checkout.create(
        {
          lineItems: [lineItem]
        }).then((checkout) => {
          console.log('result of checkout', checkout)
          document.location.href = checkout.webUrl;
        })
    } catch(err) {
      this.setState({
        buttonText: this.state.activeButtonText, 
        disabled: false, 
        error: err.toString()
      })
    }
  }

  render () {
    const {disabled, error, buttonText} = this.state
    const og = {
      
    }
    return (   
      <div>
        <div className="relative inline-block">
          <button 
            disabled={disabled}
            className="text-white p-4 px-6 inline-block bg-pink font-sans font-bold hover:bg-teal" 
            style={{transform: 'translate(-0.5rem, -0.5rem)'}} onClick={this.handleBuyNow}>{buttonText}</button>
          <div className="pin bg-yellow absolute" style={{zIndex: -1, transform: 'translate(0.5rem, 0.5rem)'}}>
          </div>          
        </div>
        {error && 
          <p className="p-4">There was a problem: {error}</p>
        }
      </div>
    )
  }
}

