import React from 'react';
import ReactDOM from 'react-dom';
import * as Atoms from 'main.js';
import ParentComponent from './lib/ParentComponent.jsx';

window.React = React;
window.ReactDOM = ReactDOM;
window.Atoms = Atoms;

//let Image = Atoms.Visibility.visibility(Atoms.Visibility.HtmlImage);
/*<Atoms.Iframe
		src = 'https://www.prozeny.cz/'
		width = {600}
		height = {400}/>
<Atoms.Video
		src = 'https://v31-a.sdn.szn.cz/v_31/vd_00757002980b_1490774737/h264_aac_720p_mp4/92ed10b5.mp4'
		controls = {true}
		autoPlay = {true}
		width = {600}
		height = {400}/>*/

let imageUrl1 = 'https://static.pexels.com/photos/279315/pexels-photo-279315.jpeg';
let imageUrl2 = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg';

let { Image, Paragraph, H1, Link, List, ListItem } = Atoms;

ReactDOM.render(
	<ParentComponent>
		<Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Paragraph>
		<Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Paragraph>
		<Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Paragraph>
		<Image
				src = { imageUrl1 }
				width = {600}
				height = {400}/>
		<Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Paragraph>
		<Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Paragraph>
		<Image
				src = { imageUrl1 }
				width = {600}
				height = {400}/>
		<Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Paragraph>
		<Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Paragraph>
		<Image
				src = { imageUrl1 }
				width = {600}
				height = {400}/>
		<Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Paragraph>
		<Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Paragraph>
		<H1>
			Web imajs.io
		</H1>
		<List>
			<ListItem mode = 'disc'>listItem 1</ListItem>
			<ListItem mode = 'circle'>listItem 2</ListItem>
			<ListItem mode = 'square'>listItem 3</ListItem>
		</List>
		<Link href = 'https://imajs.io' target = '_blank'>imajs.io</Link>
		<Image
				src = { imageUrl1 }
				width = {600}
				height = {400}/>
		<Image
				src = { imageUrl1 }
				width = {600}
				height = {400}/>
		<Image
				src = { imageUrl1 }
				width = {600}
				height = {400}/>
		<Image
				src = { imageUrl2 }
				width = {600}
				height = {400}/>
		<Image
				src = { imageUrl2 }
				width = {600}
				height = {400}/>
		<Image
				src = { imageUrl2 }
				width = {600}
				height = {400}/>
	</ParentComponent>,
	document.getElementById('image')
);
