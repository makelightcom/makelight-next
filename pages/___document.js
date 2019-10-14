import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    // Returns an object like: { html, head, errorHtml, chunks, styles }
    return renderPage()
  }

  render () {
    return (
      <html>
        <Head>
          <title>Makelight</title>
          <link rel='stylesheet' href={`/static/css/bundle.css?build=${process.env.DEPLOYMENT_ID}`} key='bundle' />

          <script dangerouslySetInnerHTML={{__html: `
          var MTIProjectId='b1fd63f5-19b0-4fcb-8bcf-f57444d2d249';
           (function() {
                  var mtiTracking = document.createElement('script');
                  mtiTracking.type='text/javascript';
                  mtiTracking.async='true';
                   mtiTracking.src='/static/mtiFontTrackingCode.js';
                  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild( mtiTracking );
             })();`}} />
          <script dangerouslySetInnerHTML={{__html: `
            (function(d) {
              var config = {
                kitId: 'qca5gfi',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
