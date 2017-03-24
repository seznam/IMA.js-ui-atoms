import React from 'react';
import Loader from '../loader/Loader';
import Sizer from '../sizer/Sizer';

const MIN_EXTENDED_PADDING = 300;

/**
 * Html image
 *
 * @class HtmlImage
 * @namespace ima.ui.atom.image
 * @module ima
 * @submodule ima.ui
 */

export default class HtmlImage extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			noloading: props.noloading || false,
			visibleInViewport: false
		};

		this._mounted = false;
		this._throttledCheckVisibility = this.utils.$UIComponentHelper.throttle(
			this._checkVisibility,
			100,
			this
		);
	}

	get utils() {
		return this.context.$Utils || this.props.$Utils;
	}

	componentDidMount() {
		this._mounted = true;
		if (this.state.noloading === false) {
			this._bindEventListeners();
			this._checkVisibility();
		}
	}

	componentWillUnmount() {
		this._mounted = false;
		this._unbindEventListeners();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.src !== nextProps.src || this.props.srcSet !== nextProps.srcSet) {
			this.setState({
				noloading: nextProps.noloading || false,
				visibleInViewport: false
			});
			this._bindEventListeners();
		}
	}

	componentDidUpdate() {
		if (!this.state.noloading) {
			this._checkVisibility();
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
					style = {
						this.props.layout === 'responsive' ?
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
								alt = { this.props.alt }
								className = { this.utils.$UIComponentHelper.cssClasses({
									'atm-fill': true,
									'atm-loaded': this.state.noloading && this.state.visibleInViewport
								}) } />
					:
						<Loader mode = 'small' layout = 'center'/>
				}
				<noscript
						dangerouslySetInnerHTML = { {
							__html: `<img
								src="${this.props.src || ''}"
								srcset="${this.props.srcSet || ''}"
								alt="${this.props.alt || ''}"
								class="atm-fill atm-loaded"/>`
						} }/>
			</div>
		);
	}

	_unbindEventListeners() {
		this.utils.$Window.unbindEventListener(window, 'resize', this._throttledCheckVisibility);
		this.utils.$Window.unbindEventListener(window, 'scroll', this._throttledCheckVisibility);
	}

	_bindEventListeners() {
		this.utils.$Window.bindEventListener(window, 'resize', this._throttledCheckVisibility);
		this.utils.$Window.bindEventListener(window, 'scroll', this._throttledCheckVisibility);
	}

	_checkVisibility() {
		if (this._mounted) {
			let rootElement = this.refs.root;
			let extendedPadding = Math.max(
				Math.round(this.utils.$UIComponentHelper.getWindowViewportRect().height / 2),
				MIN_EXTENDED_PADDING
			);
			let rootElementRect = this.utils.$UIComponentHelper.getBoundingClientRect(
				rootElement,
				{ width: this.props.width, height: this.props.height },
				extendedPadding
			);

			if (this.state.visibleInViewport === false &&
					this.utils.$UIComponentHelper.getPercentOfVisibility(rootElementRect) > 0) {
				this._preLoadImage();
				this._unbindEventListeners();
				this.setState({ visibleInViewport: true });
			}
		}
	}

	_preLoadImage() {
		let image = new Image();

		image.onload = () => {
			if (this._mounted) {
				this.setState({ noloading: true });
			}
		};
		image.onerror = () => {
			if (this._mounted) {
				this.setState({ noloading: true });
			}
		};

		if (this.props.src) {
			image.src = this.props.src;
		} else {

			if (this._mounted) {
				this.setState({ noloading: true });
			}
		}
	}
}

HtmlImage.contextTypes = {
	$Utils: React.PropTypes.object
};
