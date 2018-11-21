import PropTypes from 'prop-types';
import React from 'react';
import Sizer from '../sizer/Sizer';

const MIN_EXTENDED_PADDING = 500;

/**
 * Html classic iframe
 *
 * @namespace ima.ui.atom.iframe
 * @module ima.ui.atom
 */

export default class HtmlIframe extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      visibleInViewport:
        nextProps.noloading || prevState.visibleInViewport || false
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {};

    this._registeredVisibilityId = null;

    this._onVisibilityWriter = this.onVisibilityWriter.bind(this);

    this._rootElement = React.createRef();
  }

  get utils() {
    return this.context.$Utils || this.props.$Utils;
  }

  get useIntersectionObserver() {
    return !(
      this.utils.$Settings &&
      this.utils.$Settings.plugin &&
      this.utils.$Settings.plugin.imaUiAtoms &&
      this.utils.$Settings.plugin.imaUiAtoms.useIntersectionObserver &&
      this.utils.$Settings.plugin.imaUiAtoms.useIntersectionObserver.iframes ===
        false
    );
  }

  componentDidMount() {
    if (this.state.visibleInViewport === false) {
      this._registerToCheckingVisibility();
    }
  }

  componentWillUnmount() {
    this._unregisterToCheckingVisibility();
  }

  render() {
    let helper = this.utils.$UIComponentHelper;

    return (
      <div
        ref={this._rootElement}
        className={helper.cssClasses(
          {
            'atm-iframe': true,
            'atm-overflow': true,
            'atm-placeholder': !this.state.visibleInViewport,
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
            placeholder={true}
          />
        ) : null}
        {this.state.visibleInViewport ? (
          <iframe
            src={this.props.src}
            name={this.props.src}
            srcDoc={this.props.srcDoc}
            width={this.props.width}
            height={this.props.height}
            scrolling={this.props.scrolling}
            sandbox={this.props.sandbox}
            frameBorder={this.props.frameBorder}
            allow={this.props.allow}
            allowFullScreen={this.props.allowFullScreen}
            onLoad={this.props.onLoad}
            marginWidth={this.props.marginWidth}
            marginHeight={this.props.marginHeight}
            className={helper.cssClasses({
              'atm-fill': true
            })}
            {...helper.getAriaProps(this.props)}
          />
        ) : null}
        <noscript
          className={helper.cssClasses('atm-fill')}
          style={{
            display: 'block',
            width: this.props.width || 'auto',
            height: this.props.height || 'auto'
          }}
          dangerouslySetInnerHTML={{
            __html: `<iframe
								src="${this.props.src}"
								${this.props.srcDoc !== null ? `srcdoc="${this.props.srcDoc}"` : ''}
								width="${this.props.width || 'auto'}"
								height="${this.props.height || 'auto'}"
								${this.props.sandbox ? `sandbox="${this.props.sandbox}"` : ''}
								scrolling="${this.props.scrolling || 'no'}"
								frameborder="${this.props.frameBorder || '0'}"
                                ${
                                  this.props.allow
                                    ? `allow="${this.props.allow}"`
                                    : ''
                                }
								allowfullscreen="${this.props.allowFullScreen || '0'}"
								${
                  Number.isInteger(this.props.marginWidth)
                    ? `marginwidth="${this.props.marginWidth}"`
                    : ''
                }
								${
                  Number.isInteger(this.props.marginHeight)
                    ? `marginheight="${this.props.marginHeight}"`
                    : ''
                }
								class="${helper.cssClasses('atm-fill atm-loaded')}"
								${helper.serializeObjectToNoScript(helper.getAriaProps(this.props))}></iframe>`
          }}
        />
      </div>
    );
  }

  onVisibilityWriter(visibility, observer) {
    if (visibility > 0) {
      observer && observer.disconnect();
      this._unregisterToCheckingVisibility();

      if (this.state.visibleInViewport === false) {
        this.setState({ visibleInViewport: true });
      }
    }
  }

  _unregisterToCheckingVisibility() {
    if (this._registeredVisibilityId) {
      this.utils.$UIComponentHelper.visibility.unregister(
        this._registeredVisibilityId
      );
      this._registeredVisibilityId = null;
    }
  }

  _registerToCheckingVisibility() {
    let { $UIComponentHelper } = this.utils;
    let extendedPadding = Math.max(
      $UIComponentHelper.componentPositions.getWindowViewportRect().height / 2,
      MIN_EXTENDED_PADDING
    );

    this._registeredVisibilityId = $UIComponentHelper.visibility.register(
      $UIComponentHelper.getVisibilityReader(this._rootElement.current, {
        useIntersectionObserver: this.useIntersectionObserver,
        extendedPadding,
        width: this.props.width,
        height: this.props.height
      }),
      $UIComponentHelper.wrapVisibilityWriter(this._onVisibilityWriter)
    );
  }
}
