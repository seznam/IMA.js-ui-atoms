import * as UIAtoms from '../main';

describe('UIAtoms', () => {

	it('should have the headline component', () => {
		expect(UIAtoms.Headline).not.toEqual(null);
	});

	it('should have the headline1 component', () => {
		expect(UIAtoms.Headline1).not.toEqual(null);
	});

	it('should have the headline1 alias as H1', () => {
		expect(UIAtoms.H1).not.toEqual(null);
	});

	it('should have the image component', () => {
		expect(UIAtoms.Image).not.toEqual(null);
	});

	it('should have the image alias as img', () => {
		expect(UIAtoms.Img).not.toEqual(null);
	});

	it('should have the iframe component', () => {
		expect(UIAtoms.Iframe).not.toEqual(null);
	});

	it('should have the link component', () => {
		expect(UIAtoms.Link).not.toEqual(null);
	});

	it('should have the link alias as A', () => {
		expect(UIAtoms.A).not.toEqual(null);
	});

	it('should have the loader component', () => {
		expect(UIAtoms.Loader).not.toEqual(null);
	});

	it('should have the sizer component', () => {
		expect(UIAtoms.Sizer).not.toEqual(null);
	});

	it('should have the paragraph component', () => {
		expect(UIAtoms.Paragraph).not.toEqual(null);
	});

	it('should have the paragraph alias as P', () => {
		expect(UIAtoms.P).not.toEqual(null);
	});

	it('should have the list component', () => {
		expect(UIAtoms.List).not.toEqual(null);
	});

	it('should have the unordered list component', () => {
		expect(UIAtoms.UnorderedList).not.toEqual(null);
	});

	it('should have the unordered list alias as ul', () => {
		expect(UIAtoms.Ul).not.toEqual(null);
	});

	it('should have the listItem component', () => {
		expect(UIAtoms.ListItem).not.toEqual(null);
	});

	it('should have the listItem alias as Li', () => {
		expect(UIAtoms.Li).not.toEqual(null);
	});

	it('should have the video component', () => {
		expect(UIAtoms.Video).not.toEqual(null);
	});

});
