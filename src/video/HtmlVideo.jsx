import React from 'react';

const EXTENDED_PADDING = 300;

/**
 * HTML video player.
 *
 * @class HtmlVideo
 * @namespace ima.ui.atom.video
 * @module ima
 * @submodule ima.ui
 */

export default class HtmlVideo extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			loaded: props.noloading || false,
			visibleInViewport: false
		};

		this._throttledCheckVisibility = context.$Utils.$Helper.throttle(
			this._checkVisibility,
			333,
			this
		);

		this._mounted = false;
	}

	render() {
		return (
			<div
					ref = 'root'
					className = {this.context.$Utils.$UIComponentHelper.cssClasses({
						'atm-video': true,
						'atm-overflow': true,
						'atm-placeholder': !this.state.loaded,
						'atm-responsive': this.props.layout === 'responsive',
						'atm-fill': this.props.layout === 'fill'
					}, this.props.className)}
					style = {
						this.props.layout === 'responsive' ?
							{}
						:
							{
								width: this.props.width || 'auto',
								height: this.props.height || 'auto'
							}
					}>
				{
					this.props.layout === 'responsive' ?
						<Sizer
								width = {this.props.width}
								height = {this.props.height}
								placeholder = {!this.state.loaded}/>
					:
						null
				}
				{
					this.state.loaded ?
						<video
								src = { this.props.src }
								poster = { this.props.poster }
								autoPlay = { this.props.autoplay }
								controls = { this.props.controls }
								loop = { this.props.loop }
								muted = { this.props.muted }
								width = { this.props.width }
								height = { this.props.height }
								className = {this.context.$Utils.$UIComponentHelper.cssClasses({
									'atm-fill': true,
									'atm-loaded': this.state.loaded && this.state.visibleInViewport
								})}>
							<div placeholder=''/>
							{this.props.children}
						</video>
					:
						<Loader mode = 'small' layout = 'center'/>
				}
				<noscript
						dangerouslySetInnerHTML = {{
							__html: `<video
								src="${this.props.src || ''}"
								poster="${this.props.alt || ''}"
								controls
								${this.props.autoplay ? 'autoPlay' : ''}
								${this.props.loop ? 'loop' : ''}
								${this.props.muted ? 'muted' : ''}
								class="atm-fill atm-loaded"></video>`
						}}/>
			</div>
		);
	}

	componentDidMount() {
		this._mounted = true;
		if (!this.state.loaded) {
			this._bindEventListeners();
			this._checkVisibility();
		}
	}

	componentWillUnmount() {
		this._mounted = false;
		this._unbindEventListeners();
	}

	_bindEventListeners() {
		this.context.$Utils.$Window.unbindEventListener(window, 'resize', this._throttledCheckVisibility);
		this.context.$Utils.$Window.unbindEventListener(window, 'scroll', this._throttledCheckVisibility);
	}

	_unbindEventListeners() {
		this.context.$Utils.$Window.bindEventListener(window, 'resize', this._throttledCheckVisibility);
		this.context.$Utils.$Window.bindEventListener(window, 'scroll', this._throttledCheckVisibility);
	}

	_checkVisibility() {
		if (this.state.visibleInViewport) {
			return;
		}

		let rootElement = this.refs.root;
		let rootElementBounds = this.context.$Utils.$UIComponentHelper.getBoundingClientRect(
			rootElement,
			{ width: this.props.width, height: this.props.height },
			EXTENDED_PADDING
		);
		let visibility = this.context.$Utils.$UIComponentHelper.getPercentOfVisibility(rootElementBounds);
		if (visibility > 0) {
			this._preLoadPosterImage();
			this._unbindEventListeners();
			this.setState({ visibleInViewport: true });
		}
	}

	_preLoadPosterImage() {
		if (!this.props.poster) {
			this.setState({
				loaded: true
			});
			return;
		}

		let componentInstance = this;
		let image = new Image();
		image.onload = onLoadingCompleted;
		image.onerror = onLoadingCompleted;
		image.src = this.props.poster;

		function onLoadingCompleted() {
			if (componentInstance._mounted) {
				componentInstance.setState({
					loaded: true
				});
			}
		}
	}
};

HtmlVideo.contextTypes = {
	$Utils: React.PropTypes.object
};
