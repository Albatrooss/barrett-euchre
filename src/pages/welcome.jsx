import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

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
	
		let history = useHistory();
	
	const goToLobby = (e) => {
		e.preventDefault();
		console.log(gamecode)
		let path = `/${gamecode}`
		history.push(path);
	}
	
	return (
		<div className='welcomeDiv'>
			<h2>WELCOME TO EUCHRE</h2>
			<h4>Use Game Code to join a game lobby</h4>
			<form onSubmit={goToLobby}>
				<input id='codeInput' onChange={event => setgamecode(event.target.value)} placeholder={randomcode}/>
				<button type='submit' className='goToGameBtn'>LOBBY</button>
			</form>
			
		</div>
	);
}