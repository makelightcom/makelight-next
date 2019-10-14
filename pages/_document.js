import Document, { Head, Main, NextScript } from 'next/document'
import { renderStatic } from 'glamor/server'
import flush from 'styled-jsx/server'
import env from '../utils/env'
import Manifest from 'next-manifest/manifest'

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const page = renderPage()
    const styles = renderStatic(() => page.html || page.errorHtml)

    const stylesJSX = flush()
    return { stylesJSX, ...page, ...styles }
    // return { ...page, ...styles }
  }

  constructor (props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids
    }
  }

  render () {
    return (
      <html lang='en-GB'>
        <Head>
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <Manifest themeColor='#ffaaaa' />
          <link rel='preconnect' href='https://sentry.io' />
          <link rel='preconnect' href='https://prismic.io' />
          <link
            rel='preconnect'
            href='https://makelight-prismic-images.imgix.net'
          />
          <link rel='preconnect' href='https://makelight.com' />
          <link
            href='/static/Fonts/50cd1762-b122-47c3-bce4-8e385f6a6db0.woff'
            rel='preload'
            as='font'
          />
          <link
            href='/static/Fonts/2becde0a-efb7-469b-a992-fcebff7f02bb.ttf'
            rel='preload'
            as='font'
          />
          <link
            href='/static/Fonts/d13c38b0-30e7-47f0-bc36-e2b7752b59e3.woff2'
            rel='preload'
            as='font'
          />
          <link
            href={`/static/css/plyr.css?build=${env.DEPLOYMENT_ID}`}
            rel='preload'
            as='stylesheet'
          />
          <link
            href='/static/images/apple-icon-57x57.png'
            rel='apple-touch-icon'
            sizes='57x57'
          />
          <link
            href='/static/images/apple-icon-60x60.png'
            rel='apple-touch-icon'
            sizes='60x60'
          />
          <link
            href='/static/images/apple-icon-72x72.png'
            rel='apple-touch-icon'
            sizes='72x72'
          />
          <link
            href='/static/images/apple-icon-76x76.png'
            rel='apple-touch-icon'
            sizes='76x76'
          />
          <link
            href='/static/images/apple-icon-114x114.png'
            rel='apple-touch-icon'
            sizes='114x114'
          />
          <link
            href='/static/images/apple-icon-120x120.png'
            rel='apple-touch-icon'
            sizes='120x120'
          />
          <link
            href='/static/images/apple-icon-144x144.png'
            rel='apple-touch-icon'
            sizes='144x144'
          />
          <link
            href='/static/images/apple-icon-152x152.png'
            rel='apple-touch-icon'
            sizes='152x152'
          />
          <link
            href='/static/images/apple-icon-180x180.png'
            rel='apple-touch-icon'
            sizes='180x180'
          />
          <link
            href='/static/images/favicon-16x16.png'
            rel='icon'
            sizes='16x16'
            type='image/png'
          />
          <link
            href='/static/images/favicon-32x32.png'
            rel='icon'
            sizes='32x32'
            type='image/png'
          />
          <link
            href='/static/images/favicon-96x96.png'
            rel='icon'
            sizes='96x96'
            type='image/png'
          />
          <link
            href='/static/images/android-icon-36x36.png'
            rel='icon'
            sizes='36x36'
            type='image/png'
          />
          <link
            href='/static/images/android-icon-48x48.png'
            rel='icon'
            sizes='48x48'
            type='image/png'
          />
          <link
            href='/static/images/android-icon-72x72.png'
            rel='icon'
            sizes='72x72'
            type='image/png'
          />
          <link
            href='/static/images/android-icon-96x96.png'
            rel='icon'
            sizes='96x96'
            type='image/png'
          />
          <link
            href='/static/images/android-icon-144x144.png'
            rel='icon'
            sizes='144x144'
            type='image/png'
          />
          <link
            href='/static/images/android-icon-192x192.png'
            rel='icon'
            sizes='192x192'
            type='image/png'
          />
          <meta content='on' httpEquiv='cleartype' />
          <meta content='320' name='MobileOptimized' />
          <meta content='True' name='HandheldFriendly' />
          <meta content='yes' name='apple-mobile-web-app-capable' />
          <meta
            content='Dwi-FJLiwjmcxgb2hSXKAUlCF9Ux4NCwvOIFayTTARQ'
            name='google-site-verification'
          />
          <meta
            name='p:domain_verify'
            content='856cce4bdef9844a925d6e4706a52701'
          />
          <meta charSet='utf-8' />

          <script
            async
            src='https://cdn.ravenjs.com/3.22.0/raven.min.js'
            crossOrigin='true'
            id='raven'
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
          (function(b,e,c,d){b.onerror=function(a,b,d,f,g){c||e.push([a,b,d,f,g])};b.onunhandledrejection=function(a){c||e.push([a.reason.reason||a.reason.message,a.type,JSON.stringify(a.reason)])};d.onreadystatechange=d.onload=function(){c||(c=!0,
          Raven.config("https://287392a51ab049dc90e7f667422d5a95@sentry.io/1211915").install(),
          b.onunhandledrejection=function(a){Raven.captureException(Error(a.reason.reason||a.reason.message),{extra:{type:a.type,reason:JSON.stringify(a.reason)}})},e.forEach(function(a){Raven.captureException(a[4]||Error(a[0]),{extra:{file:a[1],line:a[2],col:a[3]}})}))}})(window,[],!1,document.getElementById("raven"));
          `
            }}
          />

          <style
            dangerouslySetInnerHTML={{
              __html: `
            @font-face{
                font-family:'Harmonia';
                font-weight: 300;
                font-style: normal;
                font-display: auto;
                src:url("/static/Fonts/0d3ddd7f-1365-4614-b4cd-3109f95fba46.eot?#iefix");
                src:url("/static/Fonts/0d3ddd7f-1365-4614-b4cd-3109f95fba46.eot?#iefix") format("eot"),url("/static/Fonts/cedea5d5-db27-4dc9-8d34-c20cce3ce9c2.woff2") format("woff2"),url("/static/Fonts/b8b58a75-9a85-4560-a2f2-bfb3f2f2fc98.woff") format("woff"),url("/static/Fonts/ba31de29-149c-4049-947e-9c3f1ecaa8d2.ttf") format("truetype"),url("/static/Fonts/2b103519-dc70-43c5-84eb-95348ed9f55a.svg#2b103519-dc70-43c5-84eb-95348ed9f55a") format("svg");
            }
            @font-face{
                font-family:'Harmonia';
                font-weight: 400;
                font-style: normal;
                font-display: auto;
                src:url("/static/Fonts/a5b66773-6a36-469a-8f45-e08448130bf2.eot?#iefix");
                src:url("/static/Fonts/a5b66773-6a36-469a-8f45-e08448130bf2.eot?#iefix") format("eot"),url("/static/Fonts/3ba56aa2-c01d-4bfc-aae4-eac13ee2ebbc.woff2") format("woff2"),url("/static/Fonts/51f1c13a-2c9b-4cba-9cbf-93317cbd3e10.woff") format("woff"),url("/static/Fonts/7b11ae47-5126-4c06-8f61-fbee4b6a8461.ttf") format("truetype"),url("/static/Fonts/d6936923-56f5-4284-bb73-3230f8a49594.svg#d6936923-56f5-4284-bb73-3230f8a49594") format("svg");
            }
            @font-face{
                font-family:'Harmonia';
                font-weight: 600;
                font-style: normal;
                font-display: auto;
                src:url("/static/Fonts/cd8a7ca1-a1a1-4902-9824-18890229b553.eot?#iefix");
                src:url("/static/Fonts/cd8a7ca1-a1a1-4902-9824-18890229b553.eot?#iefix") format("eot"),url("/static/Fonts/08591efc-f43b-4dc0-b066-e39bb77fd0d9.woff2") format("woff2"),url("/static/Fonts/bb2822e9-2055-4c95-bd66-438a33d71a60.woff") format("woff"),url("/static/Fonts/1796e78c-3f90-4d62-a510-d2f1ebc88d86.ttf") format("truetype"),url("/static/Fonts/db703c36-bf80-4647-8190-abc666705582.svg#db703c36-bf80-4647-8190-abc666705582") format("svg");
            }
            @font-face{                  
                font-family:'Harmonia';
                font-weight: 600;
                font-style: italic;
                font-display: auto;
                src:url("/static/Fonts/922fefb6-cf43-454a-812d-524362ae522f.eot?#iefix");
                src:url("/static/Fonts/922fefb6-cf43-454a-812d-524362ae522f.eot?#iefix") format("eot"),url("/static/Fonts/26998c9c-98b7-46e1-a2f9-391cb0bcc27c.woff2") format("woff2"),url("/static/Fonts/b28a746b-254c-4d88-ac9d-aa7c5cdcebae.woff") format("woff"),url("/static/Fonts/bbc4c213-7a42-4e35-b2fa-869ca186e5a6.ttf") format("truetype"),url("/static/Fonts/43780f0f-8e88-49dc-a7c4-9ce01aa44cd4.svg#43780f0f-8e88-49dc-a7c4-9ce01aa44cd4") format("svg");
            }
            @font-face{
                font-family:'Harmonia';
                font-weight: 700;
                font-style: normal;
                font-display: auto;
                src:url("/static/Fonts/afb7b057-b4c8-4f37-9611-323efb16599e.eot?#iefix");
                src:url("/static/Fonts/afb7b057-b4c8-4f37-9611-323efb16599e.eot?#iefix") format("eot"),url("/static/Fonts/d13c38b0-30e7-47f0-bc36-e2b7752b59e3.woff2") format("woff2"),url("/static/Fonts/50cd1762-b122-47c3-bce4-8e385f6a6db0.woff") format("woff"),url("/static/Fonts/2becde0a-efb7-469b-a992-fcebff7f02bb.ttf") format("truetype"),url("/static/Fonts/ffa1b212-f1e5-4934-89b5-20243a9f94af.svg#ffa1b212-f1e5-4934-89b5-20243a9f94af") format("svg");
            }
            
            html body {
              font-family: 'Harmonia', sans-serif;
            }
            `
            }}
          />

          {typeof window === 'undefined' && <server-side-stylesheet />}

          {typeof window !== 'undefined' && (
            <link
              rel='stylesheet'
              href={`/static/css/bundle.css?build=${env.DEPLOYMENT_ID}`}
              key='bundle'
            />
          )}
          <script
            dangerouslySetInnerHTML={{
              __html: `
          var MTIProjectId='b1fd63f5-19b0-4fcb-8bcf-f57444d2d249';
           (function() {
                  var mtiTracking = document.createElement('script');
                  mtiTracking.type='text/javascript';
                  mtiTracking.async='true';
                   mtiTracking.src='/static/mtiFontTrackingCode.js';
                  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild( mtiTracking );
             })();`
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(d) {
              var config = {
                kitId: 'qca5gfi',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `
            }}
          />

          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          {this.props.stylesJSX}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
