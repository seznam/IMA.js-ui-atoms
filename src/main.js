import UIComponentHelper from './UIComponentHelper.js';

import Headline from './headline/Headline.js';
import H1 from './headline/H1.js';
import H2 from './headline/H2.js';
import H3 from './headline/H3.js';
import H4 from './headline/H4.js';
import H5 from './headline/H5.js';
import H6 from './headline/H6.js';

import Iframe from './iframe/Iframe.js';

import Image from './image/Image.js';

import Li from './li/Li.js';

import Link from './link/Link.js';

import List from './list/List.js';

import Loader from './loader/Loader.js';

import Paragraph from './paragraph/Paragraph.js';

import Sizer from './sizer/Sizer.js';

let defaultDependencies = ['$Router', '$Window'];

let $registerImaPlugin = (ns) => {
	ns.namespace('ima.ui.atom');
	ns.namespace('ima.ui.atom.headline');
	ns.namespace('ima.ui.atom.iframe');
	ns.namespace('ima.ui.atom.image');
	ns.namespace('ima.ui.atom.li');
	ns.namespace('ima.ui.atom.link');
	ns.namespace('ima.ui.atom.list');
	ns.namespace('ima.ui.atom.loader');
	ns.namespace('ima.ui.atom.paragraph');
	ns.namespace('ima.ui.atom.sizer');

	ns.ima.ui.atom.headline.Headline = Headline;
	ns.ima.ui.atom.headline.H1 = H1;
	ns.ima.ui.atom.headline.H2 = H2;
	ns.ima.ui.atom.headline.H3 = H3;
	ns.ima.ui.atom.headline.H4 = H4;
	ns.ima.ui.atom.headline.H5 = H5;
	ns.ima.ui.atom.headline.H6 = H6;

	ns.ima.ui.atom.iframe.Iframe = Iframe;

	ns.ima.ui.atom.image.Image = Image;

	ns.ima.ui.atom.link.Link = Link;

	ns.ima.ui.atom.li.Li = Li;

	ns.ima.ui.atom.list.List = List;

	ns.ima.ui.atom.loader.Loader = Loader;

	ns.ima.ui.atom.paragraph.Paragraph = Paragraph;

	ns.ima.ui.atom.sizer.Sizer = Sizer;

	ns.ima.ui.atom.UIComponentHelper = UIComponentHelper;
	ns.ima.ui.atom.defaultDependencies = defaultDependencies;
};

let initBind = (ns, oc, config) => {
	oc.inject(UIComponentHelper, defaultDependencies);
};

export {
	UIComponentHelper,
	defaultDependencies,
	Headline,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	Iframe,
	Image,
	Link,
	Li,
	List,
	Loader,
	Paragraph,
	Sizer,
	initBind,
	$registerImaPlugin
};
