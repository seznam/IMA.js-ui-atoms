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

	constructor(props, context) {
		super(props, context);

		this.state = {
			visibleInViewport: props.noloading || false
		};

		this._registeredVisibilityId = null;

		this._onVisbilityWriter = this.onVisibilityWriter.bind(this);
	}

	get utils() {
		return this.context.$Utils || this.props.$Utils;
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
					ref = 'root'
					className = { helper.cssClasses({
						'atm-iframe': true,
						'atm-overflow': true,
						'atm-placeholder': !this.state.visibleInViewport,
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
								placeholder = { true }/>
					:
						null
				}
				{
					this.state.visibleInViewport ?
						<iframe
								src = { this.props.src }
								name = { this.props.src }
								srcDoc = { this.props.srcDoc }
								width = { this.props.width }
								height = { this.props.height }
								scrolling = { this.props.scrolling }
								sandbox = { this.props.sandbox }
								frameBorder = { this.props.frameBorder }
								allowFullScreen = { this.props.allowFullScreen }
								className = { helper.cssClasses({
									'atm-fill': true
								}) }/>
					:
						null
				}
				<noscript
						className = { helper.cssClasses('atm-fill') }
						style = { {
							display: 'block',
							width: this.props.width || 'auto',
							height: this.props.height || 'auto'
						} }
						dangerouslySetInnerHTML = { {
							__html: `<iframe
								src="${this.props.src}"
								srcdoc="${this.props.srcDoc}"
								width="${this.props.width || 'auto'}"
								height="${this.props.height || 'auto'}"
								${ this.props.sandbox ? `sandbox="${this.props.sandbox}"` : '' }
								scrolling="${this.props.scrolling || 'no'}"
								frameborder="${this.props.frameBorder || '0'}"
								allowfullscreen="${this.props.allowFullScreen || '0'}"
								class="${helper.cssClasses('atm-fill atm-loaded')}"></iframe>`
						} }/>
			</div>
		);
	}

	onVisibilityWriter(visibility) {
		if (this.state.visibleInViewport === false && visibility > 0) {
			this._unregisterToCheckingVisibility();
			this.setState({ visibleInViewport: true });
		}
	}

	_unregisterToCheckingVisibility() {
		this.utils.$UIComponentHelper.unregisterComponentToVisbility(this._registeredVisibilityId);
	}

	_registerToCheckingVisibility() {
		let extendedPadding = Math.max(
			this.utils.$UIComponentHelper.getWindowViewportRect().height / 2,
			MIN_EXTENDED_PADDING
		);

		this._registeredVisibilityId = this.utils.$UIComponentHelper.registerComponentToVisbility(
			this.utils.$UIComponentHelper.getVisibilityReader(
				this.refs.root,
				{
					extendedPadding,
					width: this.props.width,
					height: this.props.height
				}
			),
			this._onVisbilityWriter
		);
	}
}
