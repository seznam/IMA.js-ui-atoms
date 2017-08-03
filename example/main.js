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

ReactDOM.render(
	<ParentComponent>
		<Atoms.Paragraph style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</Atoms.Paragraph>
		<p style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</p>
		<p style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</p>
		<Atoms.Image
				src = 'https://images.pexels.com/photos/3247/nature-forest-industry-rails.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
				width = {600}
				height = {400}/>
		<p style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</p>
		<p style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</p>
		<Atoms.Image
				src = 'https://images.pexels.com/photos/3247/nature-forest-industry-rails.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
				width = {600}
				height = {400}/>
		<p style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</p>
		<p style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</p>
		<Atoms.Image
				src = 'https://images.pexels.com/photos/3247/nature-forest-industry-rails.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
				width = {600}
				height = {400}/>
		<p style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</p>
		<p style = {{ width: 600 }}>
			Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.
		</p>
		<Atoms.Image
				src = 'https://images.pexels.com/photos/3247/nature-forest-industry-rails.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
				width = {600}
				height = {400}/>
		<Atoms.Image
				src = 'https://images.pexels.com/photos/3247/nature-forest-industry-rails.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
				width = {600}
				height = {400}/>
		<Atoms.Image
				src = 'https://images.pexels.com/photos/3247/nature-forest-industry-rails.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
				width = {600}
				height = {400}/>
		<Atoms.Image
				src = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'
				width = {600}
				height = {400}/>
		<Atoms.Image
				src = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'
				width = {600}
				height = {400}/>
		<Atoms.Image
				src = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'
				width = {600}
				height = {400}/>
	</ParentComponent>,
	document.getElementById('image')
);
