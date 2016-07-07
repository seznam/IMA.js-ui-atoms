import React from 'react';
import Loader from '../loader/Loader';
import Sizer from '../sizer/Sizer';

const EXTENDED_PADDING = 400;

/**
 * Html classic iframe
 *
 * @class HtmlIframe
 * @namespace app.component.atom.iframe
 * @module app
 * @submodule app.component
 */

export default class HtmlIframe {

	constructor(props, context) {

		this.state = {
			visibleOnViewport: false
		};

		this._mounted = false;
		this._throttledCheckVisibility = this.utils.$Helper.throttle(this._checkVisibility, 333, this);
	}

	get utils() {
		return this.context.$Utils || this.props.$Utils;
	}

	componentDidMount() {
		this._mounted = true;
		this._bindEventListeners();
		this._checkVisibility();
	}

	componentWillUnmount() {
		this._mounted = false;
		this._unbindEventListeners();
	}


	render() {
		return (
			<div
					className = {this.utils.$UIComponentHelper.cssClasses({
						'atm-iframe': true,
						'atm-overflow': true,
						'atm-responsive': this.props.layout
					}, true)}
					style = { this.props.layout ? {} : { width: this.props.width, height: this.props.height }}>
				<Sizer
						width = {this.props.width}
						height = {this.props.height}
						placeholder = {true}/>
				{
					this.state.visibleOnViewport ?
						<iframe
								src = { this.props.src }
								width = { this.props.width }
								height = { this.props.height }
								scrolling = { this.props.scrolling }
								sandbox = { this.props.sandbox }
								frameBorder = { this.props.frameBorder }
								allowFullScreen = { this.props.allowFullScreen }
								className = {this.utils.$UIComponentHelper.cssClasses({
									'atm-fill': true,
									'atm-loaded': this.state.visibleOnViewport
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
			this._unbindEventListeners();
			this.setState({ visibleOnViewport: true });
		}
	}
}

HtmlIframe.contextTypes = {
	$Utils: React.PropTypes.object
};