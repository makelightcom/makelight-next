import Facebook from 'react-entypo-icons/lib/entypo/Facebook'
import Instagram from 'react-entypo-icons/lib/entypo/Instagram'
import Pinterest from 'react-entypo-icons/lib/entypo/Pinterest'
import Twitter from 'react-entypo-icons/lib/entypo/Twitter'
import Youtube from 'react-entypo-icons/lib/entypo/Youtube'
import React from 'react'

class SocialIconsRow extends React.Component {
  render () {
    return (
      <div>
        <a aria-label={`Makelight on Instagram`} className="height-full icon-link pointer-events-auto inline-block px-1 py-3 cursor-pointer hover:text-teal" href="https://instagram.com/makelight">
          <Instagram className="pointer-events-none" />
        </a>
        <a aria-label={`Makelight on Twitter`} className="height-full icon-link pointer-events-auto inline-block px-1 py-3 cursor-pointer hover:text-teal" href="https://twitter.com/makelight">
          <Twitter className="pointer-events-none" />
        </a>
        <a aria-label={`Makelight on Pinterest`} className="height-full icon-link pointer-events-auto inline-block px-1 py-3 cursor-pointer hover:text-teal" href="https://pinterest.com/emilyquinton">
          <Pinterest className="pointer-events-none" />
        </a>
        <a aria-label={`Makelight on Facebook`} className="height-full icon-link pointer-events-auto inline-block px-1 py-3 cursor-pointer hover:text-teal" href="https://facebook.com/makelightblog">
          <Facebook className="pointer-events-none" />
        </a>
        <a aria-label={`Makelight on Youtube`} className="height-full icon-link pointer-events-auto inline-block px-1 py-3 cursor-pointer hover:text-teal" href="https://youtube.com/makelight">
          <Youtube className="pointer-events-none" />
        </a>
      </div>
    )
  }
}

export default SocialIconsRow