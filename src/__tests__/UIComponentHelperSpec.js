import UIComponentHelper from '../UIComponentHelper';

describe('UIComponentHelper', () => {

	let windowViewportRect = {
		top: 0,
		left: 0,
		width: 1024,
		height: 768
	};

	let elmRect = {
		top: -70,
		left: 462,
		width: 100,
		height: 100
	};

	let uiComponentHelper = null;
	let router = {};
	let window = {
		getWindow: () => { return { innerWidth: windowViewportRect.width, innerHeight: windowViewportRect.height }; },
		isClient: () => true
	};

	beforeEach(() => {
		uiComponentHelper = new UIComponentHelper(router, window);
	});

	it('should return window viewport', () => {
		let windowViewportRect = uiComponentHelper.getWindowViewportRect();

		expect(windowViewportRect.top).toEqual(0);
		expect(windowViewportRect.left).toEqual(0);
		expect(typeof windowViewportRect.width).toEqual('number');
		expect(typeof windowViewportRect.left).toEqual('number');
	});

	describe('getNumberFromRange method', function() {

		it('should return number from defined range', function() {
			expect(uiComponentHelper.getNumberFromRange(0, -1, 1)).toEqual(0);
		});

		it('should return defined min number from range', function() {
			expect(uiComponentHelper.getNumberFromRange(-1, 0, 1)).toEqual(0);
		});

		it('should return defined max number from range', function() {
			expect(uiComponentHelper.getNumberFromRange(2, 0, 1)).toEqual(1);
		});

	});

	describe('getPenetrationOfRects method', () => {

		it('should return penetration rect from two defined rects', () => {
			let penetrationRect = uiComponentHelper.getPenetrationOfRects(windowViewportRect, elmRect);

			expect(penetrationRect.top).toEqual(windowViewportRect.top);
			expect(penetrationRect.left).toEqual(elmRect.left);
			expect(penetrationRect.width).toEqual(100);
			expect(penetrationRect.height).toEqual(30);
		});

	});

	describe('getPercentOfVisibility method', () => {

		it('should return percent of visibility on window viewport', () => {
			spyOn(uiComponentHelper, 'getWindowViewportRect')
				.and
				.returnValue(windowViewportRect);

			let percentOfVisibility = uiComponentHelper.getPercentOfVisibility(elmRect);

			expect(percentOfVisibility).toEqual(30);
		});

	});

});