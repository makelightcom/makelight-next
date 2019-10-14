import { css } from 'glamor';

/**
 * @description Getter for container styles
 *
 * @param props Style properties
 */
export const getContainerStyles = props => css({
    backgroundColor: props.backgroundColor || '#eeeeee',
    display: 'inline-block',
    height: props.height || 'auto',
    overflow: 'hidden',
    width: props.width || 'auto',
});

/**
 * @description Picture element styles
 *
 * @type {StyleAttribute|*}
 */
export const pictureStyles = css({
    display: 'block',
    filter: 'blur(50px)',
    '& img': {
        display: 'block',
        maxWidth: '100%',
    },
});

/**
 * @description Picture loaded styles
 *
 * @type {StyleAttribute|*}
 */
export const pictureLoadedStyles = css({
    filter: 'blur(0)',
    transition: 'filter 0.3s ease-in-out',
});