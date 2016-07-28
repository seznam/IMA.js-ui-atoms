# ima-ui-atoms

The [ima](https://imajs.io) ui atoms are based on [Pattern Lab](http://patternlab.io/)
for creating atomic design systems.
There are several main atoms which it will be extended in the future.
The Image, Iframe and Video atoms have turning on lazy loading.
The all atoms are valid for using in [AMP](https://www.ampproject.org/) static pages.

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
Now is plugin available from:

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
