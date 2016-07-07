import React from 'react';
import Loader from '../loader/Loader';
import Sizer from '../sizer/Sizer';

const EXTENDED_PADDING = 300;

/**
 * Html image
 *
 * @class HtmlImage
 * @namespace ima.ui.atom.image
 * @module ima
 * @submodule ima.ui
 */

export default class HtmlImage {

	constructor(props, context) {

		this.state = {
			noloading: props.noloading || false,
			visibleOnViewport: false,
			loaded: false
		};

		this._mounted = false;
		this._throttledCheckVisibility = this.utils.$Helper.throttle(this._checkVisibility, 333, this);
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


	render() {
		return (
			<div
					className = {this.utils.$UIComponentHelper.cssClasses({
						'atm-image': true,
						'atm-overflow': true,
						'atm-responsive': this.props.layout
					}, true)}
					style = { this.props.layout ? {} : { width: this.props.width, height: this.props.height }}>
				<Sizer
						width = {this.props.width}
						height = {this.props.height}
						placeholder = {!this.state.noloading}/>
				{
					this.state.noloading ?
						<img
								src = { this.props.src }
								srcSet = { this.props.srcSet }
								alt = { this.props.alt }
								className = {this.utils.$UIComponentHelper.cssClasses({
									'atm-fill': true,
									'atm-loaded': this.state.noloading && this.state.visibleOnViewport
								})} />
					:
						<Loader mode = 'small' layout = 'center'/>
				}
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
		let clientRect = this.findDOMNode().getBoundingClientRect();

		let elmRectStyle = {
			top: clientRect.top - EXTENDED_PADDING,
			left: clientRect.left - EXTENDED_PADDING,
			width: clientRect.width + EXTENDED_PADDING,
			height: (clientRect.height || this.props.height / this.props.width * clientRect.width) + EXTENDED_PADDING
		};


		if (this.state.visibleOnViewport === false &&
				this.utils.$UIComponentHelper.getPercentOfVisibility(elmRectStyle) > 0 &&
				this._mounted) {
			this._loadImage();
			this._unbindEventListeners();
			this.setState({ visibleOnViewport: true });
		}
	}

	_loadImage() {
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
