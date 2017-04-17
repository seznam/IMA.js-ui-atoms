import toMock from 'to-mock';

import ComponentPositions from '../ComponentPositions';
import UIComponentHelper from '../UIComponentHelper';
import Visibility from '../Visibility';

import _router from '../mocks/router';

describe('UIComponentHelper', () => {

	let elmRect = {
		top: -70,
		left: 462,
		width: 100,
		height: 100
	};

	let MockedVisibility = toMock(Visibility);
	let MockedComponentPositions = toMock(ComponentPositions);

	let uiComponentHelper = null;
	let visibility = new MockedVisibility();
	let componentPositions = new MockedComponentPositions();

	beforeEach(() => {
		uiComponentHelper = new UIComponentHelper(_router, componentPositions, visibility);
	});

	describe('isAmp mehtod', () => {

		it('should return true if url query contains amp flag', () => {
			spyOn(_router, 'getCurrentRouteInfo')
				.and
				.returnValue({ params: { amp: true } });

			expect(uiComponentHelper.isAmp()).toBeTruthy();
		});

		it('should return false if url query not contains amp flag', () => {
			expect(uiComponentHelper.isAmp()).toBeFalsy();
		});

	});

	describe('getDataProps mehtod', () => {
		let dataProps = {
			'data-e2e': 'something',
			'data-key': 'key'
		};
		let props = Object.assign({ key: 'key' }, dataProps);

		it('should return only attributes with name data-*', () => {

			expect(uiComponentHelper.getDataProps(props)).toEqual(dataProps);
		});

	});


	describe('cssClasses method', () => {

		it('should compose CSS class names', () => {
			expect(uiComponentHelper.cssClasses('stuff another-foo', {
				foo: true,
				bar: false,
				another: false,
				'more-things': true
			}, 'things')).toBe('stuff another-foo foo more-things things');
		});

	});

	describe('getWindowViewportRect method', () => {

		it('should call ComponentPositions.getWindowViewportRect method', () => {
			spyOn(componentPositions, 'getWindowViewportRect');

			uiComponentHelper.getWindowViewportRect();

			expect(componentPositions.getWindowViewportRect).toHaveBeenCalled();
		});

	});

	describe('getBoundingClientRect method', () => {
		let element = {};
		let size = { width: 0, height: 0 };
		let extendedPadding = 0;

		it('should call ComponentPositions.getBoundingClientRect method', () => {
			spyOn(componentPositions, 'getBoundingClientRect');

			uiComponentHelper.getBoundingClientRect(element, size, extendedPadding);

			expect(componentPositions.getBoundingClientRect).toHaveBeenCalledWith(element, size, extendedPadding);
		});

	});

	describe('convertToNumber method', () => {

		it('should call ComponentPositions.convertToNumber method', () => {
			spyOn(componentPositions, 'convertToNumber');

			uiComponentHelper.convertToNumber('11');

			expect(componentPositions.convertToNumber).toHaveBeenCalledWith('11');
		});

	});

	describe('getPercentOfVisibility method', () => {

		it('should call ComponentPositions.getPercentOfVisibility method', () => {
			spyOn(componentPositions, 'getPercentOfVisibility');

			uiComponentHelper.getPercentOfVisibility(elmRect);

			expect(componentPositions.getPercentOfVisibility).toHaveBeenCalledWith(elmRect);
		});

	});

	describe('getVisibilityReader method', () => {

		it('return base visibility reader function', () => {
			expect(typeof uiComponentHelper.getVisibilityReader() === 'function').toBeTruthy();
		});

	});

	describe('throttle method', () => {
		let handler = () => {};
		let interval = 0;
		let context = null;

		it('should call Visibility.throttle method', () => {
			spyOn(visibility, 'throttle');

			uiComponentHelper.throttle(handler, interval, context);

			expect(visibility.throttle).toHaveBeenCalledWith(handler, interval, context);
		});

	});

	describe('registerComponentToVisbility method', () => {
		let reader = () => {};
		let writer = () => {};
		let options = { visibilityInterval: 180 };

		it('should call Visibility.register method', () => {
			spyOn(visibility, 'register');

			uiComponentHelper.registerComponentToVisbility(reader, writer, options);

			expect(visibility.register).toHaveBeenCalledWith(reader, writer, options);
		});

	});

	describe('unregisterComponentToVisbility method', () => {
		let visibilityId = 0;

		it('should call Visibility.unregister method', () => {
			spyOn(visibility, 'unregister');

			uiComponentHelper.unregisterComponentToVisbility(visibilityId);

			expect(visibility.unregister).toHaveBeenCalledWith(visibilityId);
		});

	});

});
