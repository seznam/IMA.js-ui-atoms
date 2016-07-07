import * as UIAtoms from '../main';

describe('UIAtoms', () => {

	it('should has headline component', () => {
		expect(UIAtoms.Headline).not.toEqual(null);
	});

	it('should has image component', () => {
		expect(UIAtoms.Image).not.toEqual(null);
	});

	it('should has iframe component', () => {
		expect(UIAtoms.Iframe).not.toEqual(null);
	});

	it('should has link component', () => {
		expect(UIAtoms.Link).not.toEqual(null);
	});

	it('should has loader component', () => {
		expect(UIAtoms.Loader).not.toEqual(null);
	});

	it('should has sizer component', () => {
		expect(UIAtoms.Sizer).not.toEqual(null);
	});

	it('should has paragraph component', () => {
		expect(UIAtoms.Paragraph).not.toEqual(null);
	});

	it('should has list component', () => {
		expect(UIAtoms.List).not.toEqual(null);
	});

	it('should has li component', () => {
		expect(UIAtoms.Li).not.toEqual(null);
	});

});
