# ima-ui-atoms

Th package is moved to [Github](https://github.com/seznam/IMA.js-ui-atoms).

The [IMA](https://imajs.io) UI atoms are elementary UI components based on
the [Pattern Lab](http://patternlab.io/) design pattern for creating atomic design
systems.

This package provides various most commonly needed atoms, but both their functionality and
their number are likely to be extended in the future.

The Image, Iframe and Video atoms provide the lazy loading functionality by default.
All the atoms provided by this package are
[AMP HTML](https://www.ampproject.org/)-compatible.

## Installation

```javascript

npm install ima-ui-atoms --save

```

```javascript
// /app/build.js

var vendors = {
    common: [
        'ima-ui-atoms'
    ]
};

var less = [
	'./node_modules/ima-ui-atoms/dist/*.less',
];

/*
The atom components are now available within the namespace:

ns.ima.ui.atom.headline.Headline1;
ns.ima.ui.atom.paragraph.Paragraph;
...

import { Headline1, Paragraph, Link, Image, Iframe, Video, ListItem, UnorderedList, Loader } from 'ima-ui-atoms';
*/
```

```
// /app/config/bind.js
import { UIComponentHelper } from 'ima-ui-atoms';

// add helper to utils
oc.constant('$Utils', {
	.
	.
	.
	$UIComponentHelper: oc.get(UIComponentHelper)
});

oc.bind('GoogleAnalytic', GoogleAnalytic);

```

## IMA.js

The [IMA.js](https://imajs.io) is an application development stack for developing
isomorphic applications written in pure JavaScript.
You can find the [IMA.js](https://imajs.io) skeleton application at <https://github.com/seznam/IMA.js-skeleton>.
