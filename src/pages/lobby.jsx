import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import firebase from '../firebase';
import './App.css';
import StartGame from './components/startGame';
let db = firebase.firestore();

export default function Lobby() {
	let {gamecode} = useParams();
	
	const [input, setInput] = useState('');
	const [blue, setBlue] = useState([]);
	const [red, setRed] = useState([]);
	const [username, setUsername] = useState('');
	
	
	const joinBlue = () => {
		if (input !== '') {
			if (blue[0] === '') {
				db.collection(gamecode).doc('teamblue').set({player1: {username: input, hand: []}, score: 0}, {merge: true})
				db.collection(gamecode).doc('dealer').set({flipped: 'FD', phase: 3, trump: 'click deck to deal'})
				document.querySelector('.userInput').classList.add('hidden');
				document.querySelector('.standby').classList.remove('hidden');
			} else if (blue[1] === '') {
				db.collection(gamecode).doc('teamblue').set({player2: {username: input, hand: []}}, {merge: true})
				document.querySelector('.userInput').classList.add('hidden');
				document.querySelector('.standby').classList.remove('hidden');
			}
		}
		setUsername(input);
	}
	
	const joinRed = () => {
		if (input !== '') {
			if (red[0] === '') {
				db.collection(gamecode).doc('teamred').set({player1: {username: input, hand: []}, score: 0}, {merge: true})
				document.querySelector('.userInput').classList.add('hidden');
				document.querySelector('.standby').classList.remove('hidden');
			} else if (red[1] === '') {
				db.collection(gamecode).doc('teamred').set({player2: {username: input, hand: []}}, {merge: true})
				document.querySelector('.userInput').classList.add('hidden');
				document.querySelector('.standby').classList.remove('hidden');
			}
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
	
	console.log(input)
	
	if (blue[1] === '' && red[1] === '') {
		return (
			<div className='lobbyContainer'>
				<div className='lobbyTitleContainer'>
					<p>WELCOME TO</p><h1>{gamecode.toUpperCase()}</h1><p> GAMELOBBY</p>
				</div>
				<div className='row'>
					<div className='redTeam'>
						<p>TEAM 1:</p>
						<ul className='teamList'>{red.map(x => {return x !== '' ? <li key={x} className='lobbyLI'>{x.toUpperCase()}</li> : null})}</ul>
						<button className='joinTeamBtn' onClick={joinRed}>JOIN</button>
					</div>
					<div className='blueTeam'>
						<p>TEAM 2:</p>
						<ul className='teamList'>{blue.map(x => {return x !== '' ? <li key={x} className='lobbyLI'>{x.toUpperCase()}</li> : null})}</ul>
						<button className='joinTeamBtn' onClick={joinBlue}>JOIN</button>
					</div>
				</div>
				<div className='userInput'>
					<input type='text' placeholder='USERNAME' value={input} onChange={e => setInput(e.currentTarget.value)} />
				</div>
				<h3 className='standby hidden'>Please wait while the others join</h3>
			</div>
		);
	} else if (blue[1] === '' && red[1] !== '') {
		return (
			<div className='lobbyContainer'>
				<div className='lobbyTitleContainer'>
					<p>WELCOME TO</p><h1>{gamecode.toUpperCase()}</h1><p> GAMELOBBY</p>
				</div>
				<div className='row'>
					<div className='redTeam'>
						<p>TEAM 1:</p>
						<ul className='teamList'>{red.map(x => {return x !== '' ? <li key={x} className='lobbyLI'>{x.toUpperCase()}</li> : null})}</ul>
					</div>
					<div className='blueTeam'>
						<p>TEAM 2:</p>
						<ul className='teamList'>{blue.map(x => {return x !== '' ? <li key={x} className='lobbyLI'>{x.toUpperCase()}</li> : null})}</ul>
						<button className='joinTeamBtn' onClick={joinBlue}>JOIN</button>
					</div>
				</div>
				<div className='userInput'>
					<input type='text' placeholder='USERNAME' value={input} onChange={e => setInput(e.currentTarget.value)} />
				</div>
				<h3 className='standby hidden'>Please wait while the others join</h3>
			</div>
		); 
 	} else if (blue[1] !== '' && red[1] === '') {
		return (
			<div className='lobbyContainer'>
				<div className='lobbyTitleContainer'>
					<p>WELCOME TO</p><h1>{gamecode.toUpperCase()}</h1><p> GAMELOBBY</p>
				</div>
				<div className='row'>
					<div className='redTeam'>
						<p>TEAM 1:</p>
						<ul className='teamList'>{red.map(x => {return x !== '' ? <li key={x} className='lobbyLI'>{x.toUpperCase()}</li> : null})}</ul>
						<button className='joinTeamBtn' onClick={joinRed}>JOIN</button>
					</div>
					<div className='blueTeam'>
						<p>TEAM 2:</p>
						<ul className='teamList'>{blue.map(x => {return x !== '' ? <li key={x} className='lobbyLI'>{x.toUpperCase()}</li> : null})}</ul>
					</div>
				</div>
				<div className='userInput'>
					<input type='text' placeholder='USERNAME' value={input} onChange={e => setInput(e.currentTarget.value)} />
				</div>
				<h3 className='standby hidden'>Please wait while the others join</h3>
			</div>
		);						 
	 } else if (blue[1] !== '' && red[1] !== '') {
		return (
		<div className='lobbyContainer'>
			<div className='lobbyTitleContainer'>
				<p>WELCOME TO</p><h1>{gamecode.toUpperCase()}</h1><p> GAMELOBBY</p>
			</div>
			<div className='row'>
				<div className='redTeam'>
					<p>TEAM 1:</p>
					<ul className='teamList'>{red.map(x => {return x !== '' ? <li key={x} className='lobbyLI'>{x.toUpperCase()}</li> : null})}</ul>
				</div>
				<div className='blueTeam'>
					<p>TEAM 2:</p>
					<ul className='teamList'>{blue.map(x => {return x !== '' ? <li key={x} className='lobbyLI'>{x.toUpperCase()}</li> : null})}</ul>
				</div>
			</div>
			<div className='lobbyLink'>
				<StartGame blue={blue} red={red} gamecode={gamecode} input={input} />
			</div>
		</div>
	);
	}
}

