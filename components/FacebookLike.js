import React, { Component} from 'react';
import FacebookProvider, { Like } from 'react-facebook';
 
export default class FacebookLike extends Component {
  render() {
    return (
      <div><FacebookProvider appId="379839278887820">
        <Like href="http://www.facebook.com/makelightblog" width={200} colorScheme="light" showFaces share />
      </FacebookProvider></div>
    );
  }
}