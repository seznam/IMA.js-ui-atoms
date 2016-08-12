let _window = {
	isClient: () => {
		return true;
	},
	getWindow: () => {
		return window;
	},
	bindEventListener: (element, event, listener, useCapture) => {
		element.addEventListener(event, listener, useCapture);
	},
	unbindEventListener: (element, event, listener, useCapture) => {
		element.removeEventListener(event, listener);
	}
};

export default _window;
