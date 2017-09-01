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

	constructor(props, context) {
		super(props, context);

		this.state = {
			noloading: props.noloading || false,
			showLoader: false
		};

		this._mounted = false;
		this._visibleInViewport = false;
		this._loadIndicatorTimer = null;

		this._registeredVisibilityId = null;

		this._onVisibilityWriter = this.onVisibilityWriter.bind(this);
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

	componentWillReceiveProps(nextProps) {
		if (this.props.src !== nextProps.src ||
				this.props.srcSet !== nextProps.srcSet ||
				this.props.sizes !== nextProps.sizes) {
			this._visibleInViewport = false;
			this.setState({
				noloading: nextProps.noloading || this.props.noloading
			});

			if ((nextProps.noloading || this.props.noloading) === false) {
				this._registerToCheckingVisibility();
			}
		}
	}

	render() {
		let helper = this.utils.$UIComponentHelper;

		return (
			<div
					ref = 'root'
					className = { helper.cssClasses({
						'atm-image': true,
						'atm-overflow': true,
						'atm-placeholder': !this.state.noloading,
						'atm-responsive': this.props.layout === 'responsive',
						'atm-fill': this.props.layout === 'fill'
					}, this.props.className) }
					style = {this.props.layout === 'responsive' ?
						{}
					:
						{
							width: this.props.width || 'auto',
							height: this.props.height || 'auto'
						}
					}
					{...helper.getDataProps(this.props)}>
				{
					this.props.layout === 'responsive' ?
						<Sizer
								width = { this.props.width }
								height = { this.props.height }
								placeholder = { !this.state.noloading }/>
					:
						null
				}
				{
					this.state.noloading ?
						<img
								src = { this.props.src }
								srcSet = { this.props.srcSet }
								sizes = { this.props.sizes }
								alt = { this.props.alt }
								className = { helper.cssClasses({
									'atm-fill': true,
									'atm-loaded': this.state.noloading && this._visibleInViewport
								}) } />
					:
						null
				}
				{this.state.showLoader && !this.state.noloading ?
					<Loader mode = 'small' layout = 'center'/>
				:
					null
				}
				<noscript
						dangerouslySetInnerHTML = { {
							__html: `<img
								src="${this.props.src || ''}"
								srcset="${this.props.srcSet || ''}"
								sizes="${this.props.sizes || ''}"
								alt="${this.props.alt || ''}"
								class="${helper.cssClasses('atm-fill atm-loaded')}"/>`
						} }/>
			</div>
		);
	}

	onVisibilityWriter(visibility) {
		if (this._visibleInViewport === false && visibility > 0) {
			this._visibleInViewport = true;
			this._unregisterToCheckingVisibility();
			this._preLoadImage();
		}
	}

	_unregisterToCheckingVisibility() {
		this.utils.$UIComponentHelper.unregisterComponentToVisibility(this._registeredVisibilityId);
	}

	_registerToCheckingVisibility() {
		let extendedPadding = Math.max(
			Math.round(this.utils.$UIComponentHelper.getWindowViewportRect().height * 2),
			MIN_EXTENDED_PADDING
		);

		this._registeredVisibilityId = this.utils.$UIComponentHelper.registerComponentToVisibility(
			this.utils.$UIComponentHelper.getVisibilityReader(
				this.refs.root,
				{
					extendedPadding,
					width: this.props.width,
					height: this.props.height
				}
			),
			this._onVisibilityWriter
		);
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

		if (sizes) {
			image.sizes = sizes;
		}

		if (srcSet) {
			image.srcset = srcSet;
		}

		if (src) {
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
}
