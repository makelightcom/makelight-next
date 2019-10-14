import ReactDOM from 'react-dom';
import classNames from 'classnames';
import propTypes, { string, oneOfType } from 'prop-types';
import React, { cloneElement, Component } from 'react';
import { getContainerStyles, pictureStyles, pictureLoadedStyles } from './styles';

/**
 * @description Lazy load image component
 */
export default class extends Component {
    /**
     * @description prop-types
     */
    static propTypes = {
        backgroundColor: propTypes.string,
        height: propTypes.oneOfType([propTypes.number,propTypes.string]),
        src: propTypes.string.isRequired,
        fullResSrc: propTypes.string,
        width: propTypes.oneOfType([propTypes.number,propTypes.string]),
    };

    /**
     * @description Initial component state
     */
    state = {
        hasViewed: false,
        isLoaded: false,
        isPreloading: false
    };

    /**
     * @description On mount
     */
    componentDidMount () {
        this.initObserver();
        setTimeout(() => {
          this.setState({
            isPreloading: true,
          })
        }, 14000)  
    }

    /**
     * @description Cleanup on unmount
     */
    componentWillUnmount () {
        if (this.img) {
            this.img.removeEventListener('load', this.setLoadedStatus);
        }
        if(this.observer) {
            this.observer.unobserve(this.node);
            this.observer = null;
        }
        this.node = null;
    }

    /**
     * @description Initialize the observer
     */
    initObserver = () => {
        this.node = ReactDOM.findDOMNode(this);
        
        if (!this.node) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            this.setState({
                hasViewed: true,
            });

            return;
        }

        const callback = (entries) => {
            entries.forEach(entry => {

                const hasViewed = this.state.hasViewed || entry.isIntersecting;
                if(!this.state.hasViewed) {
                    this.setState({
                        hasViewed,
                    })
                }

                // if(this.observer) {
                //     this.observer.unobserve(this.node);
                //     this.observer = null;
                // }
            });
        };
        const options = {
            threshold: 0,
        };
        
        this.observer = new IntersectionObserver(callback, options);
        this.observer.observe(this.node);
    };

    /**
     * @description Adds a listener to the component image
     */
    addImageListener = () => {
        if (!this.node) {
            return;
        }

        this.img = this.node.querySelector('img');

        if (!this.img) {
            return;
        }

        this.img.addEventListener('load', this.setLoadedStatus);
    };

    /**
     * @description Set the loaded status of the component img
     */
    setLoadedStatus = () => {
        setTimeout(() => {
          this.setState({
            isLoaded: true,
          })
        }, 500)        
    };

    /**
     * @description Render the component
     *
     * @returns {XML}
     */
    render () {
        const { backgroundColor, height, width } = this.props;
        const containerStyles = getContainerStyles({
            backgroundColor,
            height,
            width,
        });
        const classes = classNames({
            [pictureStyles]: true,
            [pictureLoadedStyles]: this.state.isLoaded,
        });

        // Mount the picture element if no child components are set
        const onMountPicture = typeof this.props.children !== 'undefined' || !this.props.children
            ? this.addImageListener 
            : () => {};

        const nopin = this.props.nopin

        return (
            <div className={containerStyles}>
                {this.state.hasViewed ? (
                    <Picture 
                        {...this.props} 
                        className={classes}
                        onMounted={onMountPicture}
                        nopin={this.props.nopin}
                    >
                        {React.Children.map(this.props.children, child => cloneElement(child, {
                            onMounted: this.addImageListener,
                            nopin: nopin
                        }))}

                        <Img 
                            {...this.props} 
                            src={this.props.src}
                            nopin={nopin}
                        />
                    </Picture>
                ) : (this.state.isPreloading ? (
                    <div>
                        (this.props.src && <img src={this.props.src} style={{display: 'none'}} />)
                        (this.props.fullResSrc && <img src={this.props.fullResSrc} style={{display: 'none'}} />)
                    </div>
                ) : null)}
            </div>
        );
    }
}

/**
 * @description Picture element
 */
export class Picture extends Component {
    static propTypes = {
        onMounted: propTypes.func,
    };

    componentDidMount () {
        if (this.props.onMounted) {
            this.props.onMounted();
        }
    }

    /**
     * @description Render the component
     *
     * @returns {XML}
     */
    render () {
        return (
            <picture className={this.props.className}>
                {this.props.children}
            </picture>
        );
    }
}

/**
 * @description Source element
 */
export class Source extends Component {
    /**
     * @description prop-types
     */
    static propTypes = {
        media: propTypes.string.isRequired,
        onMounted: propTypes.func,
        srcSet: propTypes.string.isRequired,
    };

    componentDidMount () {
        if (this.props.onMounted) {
            this.props.onMounted();
        }
    }

    /**
     * @description Render the component
     *
     * @returns {XML}
     */
    render () {
        return (
            <source
                media={this.props.media}
                srcSet={this.props.srcSet}
                nopin={this.props.nopin}
            />
        );
    }
}

/**
 * @description Img element
 */
class Img extends Component {
    /**
     * @description prop-types
     */
    static propTypes = {
        alt: propTypes.string,
        src: propTypes.string.isRequired,
        title: propTypes.string,
    };

    /**
     * @description Render the component
     *
     * @returns {XML}
     */
    render () {
        return (
            <img 
                alt={this.props.alt} 
                src={this.props.src} 
                title={this.props.title}
                style={{width: '100%', height: 'auto'}}
                nopin={this.props.nopin}
            />
        );
    }
}