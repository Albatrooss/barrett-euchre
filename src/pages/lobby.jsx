import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import firebase from '../firebase';
import './App.css';
let db = firebase.firestore();

export default function Lobby() {
	let {gamecode} = useParams();
	
	const [input, setInput] = useState('');
	const [blue, setBlue] = useState([]);
	const [red, setRed] = useState([]);
	const [username, setUsername] = useState('');
	
	
	const joinBlue = () => {
		if (blue[0] === '') {
			db.collection(gamecode).doc('teamblue').set({player1: {username: input, hand: []}}, {merge: true})
			document.querySelector('.userInput').classList.add('hidden');
		} else if (blue[1] === '') {
			db.collection(gamecode).doc('teamblue').set({player2: {username: input, hand: []}}, {merge: true})
			document.querySelector('.userInput').classList.add('hidden');
		}
		setUsername(input);
	}
	
	const joinRed = () => {
		if (red[0] === '') {
			db.collection(gamecode).doc('teamred').set({player1: {username: input, hand: []}}, {merge: true})
			document.querySelector('.userInput').classList.add('hidden');
		} else if (red[1] === '') {
			db.collection(gamecode).doc('teamred').set({player2: {username: input, hand: []}}, {merge: true})
			document.querySelector('.userInput').classList.add('hidden');
		}
		setUsername(input);
	}
		
	useEffect(() => {
		let unsubscribe = db.collection(gamecode).onSnapshot(snap => {
			let red = {};
			let blue = {};
			snap.docs.forEach(doc => {
				if (doc.id === 'teamblue') {
					blue = doc.data();
				} else if (doc.id === 'teamred') {
					red = doc.data();
				}
			})
			setRed([red.player1 ? red.player1.username : '', red.player2 ? red.player2.username : '']);
			setBlue([blue.player1 ? blue.player1.username : '', blue.player2 ? blue.player2.username : '']);
		})
		return unsubscribe;
	}, [])
	
	return (
		<div>
			<h1>WELCOME TO {gamecode} LOBBY</h1>
			<div className='team redTeam'>
				<ul className='redTeamList'>RED TEAM: {red.map(x => {return x !== '' ? <li key={x}>{x}</li> : null})}</ul>
			</div>
			<div className='team blueTeam'>
				<ul className='blueTeamList'>BLUE TEAM: {blue.map(x => {return x !== '' ? <li key={x}>{x}</li> : null})}</ul>
			</div>
			<div className='userInput'>
				<input type='text' placeholder='USERNAME' value={input} onChange={e => setInput(e.currentTarget.value)} />
				<button onClick={joinBlue}>JOIN BLUE</button>
				<button onClick={joinRed}>JOIN RED</button>
			</div>
			<div className='lobbyLink'>
				<Link to={`/${gamecode}/${input}`}><button>Go to game</button></Link>
			</div>
		</div>
	);
}