import UIComponentHelper from './UIComponentHelper';

import Headline from './headline/Headline';
import Headline1 from './headline/Headline1';
import Headline2 from './headline/Headline2';
import Headline3 from './headline/Headline3';
import Headline4 from './headline/Headline4';
import Headline5 from './headline/Headline5';
import Headline6 from './headline/Headline6';

import Iframe from './iframe/Iframe';

import Image from './image/Image';

import Link from './link/Link';

import List from './list/List';
import OrderedList from './list/OrderedList';
import UnorderedList from './list/UnorderedList';
import ListItem from './list/ListItem';

import Loader from './loader/Loader';

import Paragraph from './paragraph/Paragraph';

import Sizer from './sizer/Sizer';

import Video from './video/Video';

let defaultDependencies = ['$Router', '$Window'];

let $registerImaPlugin = (ns) => {
	ns.namespace('ima.ui.atom');
	ns.namespace('ima.ui.atom.headline');
	ns.namespace('ima.ui.atom.iframe');
	ns.namespace('ima.ui.atom.image');
	ns.namespace('ima.ui.atom.link');
	ns.namespace('ima.ui.atom.list');
	ns.namespace('ima.ui.atom.loader');
	ns.namespace('ima.ui.atom.paragraph');
	ns.namespace('ima.ui.atom.sizer');
	ns.namespace('ima.ui.atom.video');

	let nsHeadline = ns.ima.ui.atom.headline;

	nsHeadline.Headline = Headline;
	nsHeadline.Headline1 = Headline1;
	nsHeadline.Headline2 = Headline2;
	nsHeadline.Headline3 = Headline3;
	nsHeadline.Headline4 = Headline4;
	nsHeadline.Headline5 = Headline5;
	nsHeadline.Headline6 = Headline6;
	nsHeadline.H1 = Headline1;
	nsHeadline.H2 = Headline2;
	nsHeadline.H3 = Headline3;
	nsHeadline.H4 = Headline4;
	nsHeadline.H5 = Headline5;
	nsHeadline.H6 = Headline6;

	ns.ima.ui.atom.iframe.Iframe = Iframe;

	ns.ima.ui.atom.image.Image = Image;
	ns.ima.ui.atom.image.Img = Image;

	ns.ima.ui.atom.link.Link = Link;
	ns.ima.ui.atom.link.A = Link;

	var nsList = ns.ima.ui.atom.list;
	nsList.List = List;
	nsList.ListItem = ListItem;
	nsList.OrderedList = OrderedList;
	nsList.UnorderedList = UnorderedList;
	nsList.Li = ListItem;
	nsList.Ol = OrderedList;
	nsList.Ul = UnorderedList;

	ns.ima.ui.atom.loader.Loader = Loader;

	ns.ima.ui.atom.paragraph.Paragraph = Paragraph;
	ns.ima.ui.atom.paragraph.P = Paragraph;

	ns.ima.ui.atom.sizer.Sizer = Sizer;

	ns.ima.ui.atom.video.Video = Video;

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
	Headline1,
	Headline2,
	Headline3,
	Headline4,
	Headline5,
	Headline6,
	Headline1 as H1,
	Headline2 as H2,
	Headline3 as H3,
	Headline4 as H4,
	Headline5 as H5,
	Headline6 as H6,
	Iframe,
	Image,
	Image as Img,
	Link,
	Link as A,
	List,
	ListItem,
	OrderedList,
	UnorderedList,
	ListItem as Li,
	OrderedList as Ol,
	UnorderedList as Ul,
	Loader,
	Paragraph,
	Paragraph as P,
	Sizer,
	Video,
	initBind,
	$registerImaPlugin
};
