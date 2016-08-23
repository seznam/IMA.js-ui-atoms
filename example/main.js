import React from 'react';
import ReactDOM from 'react-dom';
import * as Atoms from 'main.js';
import ParentComponent from './lib/ParentComponent.jsx';

ReactDOM.render(
	<ParentComponent>
		<Atoms.Image
				src = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'
				width = {600}
				height = {400}/>
	</ParentComponent>,
	document.getElementById('image')
);
