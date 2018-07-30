import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../loader/Loader';
import Sizer from '../sizer/Sizer';

const MIN_EXTENDED_PADDING = 300;
const TIME_TO_SHOW_LOADER = 3000;

/**
 * Html image
 *
 * @namespace ima.ui.atom.image
 * @module ima.ui.atom
 */

export default class HtmlImage extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.src !== prevState.src ||
      nextProps.srcSet !== prevState.srcSet ||
      nextProps.sizes !== prevState.sizes
    ) {
      return {
        showLoader: prevState.showLoader || false,
        src: nextProps.src,
        srcSet: nextProps.srcSet,
        sizes: nextProps.sizes,
        noloading: nextProps.noloading || prevState.noloading || false
      };
    }

    return null;
  }

  constructor(props, context) {
    super(props, context);

    this.state = {};

    this._mounted = false;
    this._visibleInViewport = false;
    this._loadIndicatorTimer = null;

    this._registeredVisibilityId = null;

    this._onVisibilityWriter = this.onVisibilityWriter.bind(this);
    this._visibilityWriterRegistered = false;

    this._rootElement = React.createRef();
  }

  get utils() {
    return this.context.$Utils || this.props.$Utils;
  }

  componentDidMount() {
    this._mounted = true;

    if (this.state.noloading === false) {
      this._registerToCheckingVisibility();
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    this._unregisterToCheckingVisibility();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.src !== prevProps.src ||
      this.props.srcSet !== prevProps.srcSet ||
      this.props.sizes !== prevProps.sizes
    ) {
      this._visibleInViewport = false;

      if ((prevProps.noloading || this.props.noloading) === false) {
        this._registerToCheckingVisibility();
      }
    }
  }

  render() {
    let helper = this.utils.$UIComponentHelper;

    return (
      <div
        ref={this._rootElement}
        className={helper.cssClasses(
          {
            'atm-image': true,
            'atm-overflow': true,
            'atm-placeholder': !this.state.noloading,
            'atm-responsive': this.props.layout === 'responsive',
            'atm-fill': this.props.layout === 'fill'
          },
          this.props.className
        )}
        style={
          this.props.layout === 'responsive'
            ? {}
            : {
                width: this.props.width || 'auto',
                height: this.props.height || 'auto'
              }
        }
        {...helper.getDataProps(this.props)}>
        {this.props.layout === 'responsive' ? (
          <Sizer
            width={this.props.width}
            height={this.props.height}
            placeholder={!this.state.noloading}
          />
        ) : null}
        {this.state.noloading ? (
          <img
            src={this.props.src}
            srcSet={this.props.srcSet}
            sizes={this.props.sizes}
            alt={this.props.alt}
            onLoad={this.props.onLoad}
            onError={this.props.onError}
            className={helper.cssClasses({
              'atm-fill': true,
              'atm-loaded': this.state.noloading && this._visibleInViewport
            })}
            {...helper.getAriaProps(this.props)}
          />
        ) : null}
        {this.state.showLoader && !this.state.noloading ? (
          <Loader mode="small" layout="center" />
        ) : null}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img
								src="${this.props.src || ''}"
								srcset="${this.props.srcSet || ''}"
								sizes="${this.props.sizes || ''}"
								alt="${this.props.alt || ''}"
								class="${helper.cssClasses('atm-fill atm-loaded')}"
								${helper.serializeObjectToNoScript(helper.getAriaProps(this.props))}/>`
          }}
        />
      </div>
    );
  }

  onVisibilityWriter(visibility, observer) {
    if (this._visibleInViewport === false && visibility > 0) {
      observer && observer.disconnect();
      this._visibleInViewport = true;
      this._unregisterToCheckingVisibility();
      this._preLoadImage();
    }
  }

  _unregisterToCheckingVisibility() {
    if (this._visibilityWriterRegistered) {
      this.utils.$UIComponentHelper.visibility.unregister(
        this._registeredVisibilityId
      );
      this._visibilityWriterRegistered = false;
    }
  }

  _registerToCheckingVisibility() {
    let { $UIComponentHelper } = this.utils;
    let extendedPadding =
      this.props.extendedPadding ||
      Math.max(
        Math.round(
          $UIComponentHelper.componentPositions.getWindowViewportRect().height *
            2
        ),
        MIN_EXTENDED_PADDING
      );

    this._registeredVisibilityId = $UIComponentHelper.visibility.register(
      $UIComponentHelper.getVisibilityReader(this._rootElement.current, {
        extendedPadding,
        useIntersectionObserver: true,
        width: this.props.width,
        height: this.props.height
      }),
      $UIComponentHelper.wrapVisibilityWriter(this._onVisibilityWriter)
    );
    this._visibilityWriterRegistered = true;    
  }

  _preLoadImage() {
    this._loadIndicatorTimer = setTimeout(() => {
      this.setState({ showLoader: true });
    }, TIME_TO_SHOW_LOADER);

    let image = new Image();
    image.onload = () => {
      this._imageIsLoaded();
    };
    image.onerror = () => {
      this._imageIsLoaded();
    };
    let { src, srcSet, sizes } = this.props;

    if (srcSet && this._areResponsiveImagesSupported(image)) {
      if (sizes) {
        image.sizes = sizes;
      }

      image.srcset = srcSet;
    } else if (src) {
      image.src = src;
    }

    if (!srcSet && !src) {
      this._imageIsLoaded();
    }
  }

  _imageIsLoaded() {
    if (!this._loadIndicatorTimer) {
      return;
    }

    clearTimeout(this._loadIndicatorTimer);
    this._loadIndicatorTimer = null;

    if (this._mounted) {
      this.setState({ noloading: true, showLoader: false });
    }
  }

  _areResponsiveImagesSupported(image) {
    return 'srcset' in image && 'sizes' in image;
  }
}
