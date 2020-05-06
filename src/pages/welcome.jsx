import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Welcome() {
	let words = [
		'color',
		'pez',
		'market',
		'flea',
		'piano',
		'shirt',
		'biff',
		'container',
		'candy',
		'concert',
		'kay',
		'barrett',
		'devlin',
		'euchre',
		'jack',
		'queen',
		'king',
		'ace',
		'one',
		'two',
		'three',
		'four',
		'five',
		'six',
		'seven',
		'nine',
		'ten',
		'eight'
	]
	
	const generateGamecode = () => {
		let code = [];
		let i = 0
		while (i < 3) {
			let temp = words[Math.floor(Math.random() * words.length)];
			if (!code.includes(temp)) {
				code.push(temp);
				i++;
			}
		}
		return `${code[0]}-${code[1]}-${code[2]}`;
	}
	
	let randomcode = generateGamecode();
	const [gamecode, setgamecode] = useState(randomcode);
	
	return (
		<div>
			<h1>WELCOME</h1>
			<input onChange={event => setgamecode(event.target.value)} placeholder={randomcode}/>
			<Link to={`/${gamecode}`}><button>Go to game</button></Link>
		</div>
	);
}