import React, {useState, useEffect} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import './App.css';
import firebase from '../firebase';
import deck from './deck.js';

import MyHand from './components/myHand';
import Facedown from './components/facedown';
import Cardtable from './components/cardtable';
import UI from './components/ui';
import Buttons from './components/buttons';

const db = firebase.firestore();

function App({match}) {
	let {username} = useParams();
	let {gamecode} = useParams();
	
	const [user, setUser] = useState({});
	const [teammate, setTeammate] = useState({});
	const [enemy1, setEnemy1] = useState({});
	const [enemy2, setEnemy2] = useState({});
	const [dealer, setDealer] = useState({});
	const [cardsPlayed, setCardsPlayed] = useState([]);
	const [team1, setTeam1] = useState({});
	const [team2, setTeam2] = useState({});
	
	const [usernames, setUsernames] = useState([]);
	
	const deal = () => {
		db.collection(gamecode).doc('cardsPlayed').set({cards: []});
		db.collection(gamecode).doc('teamblue').update({tricks: 0});
		db.collection(gamecode).doc('teamred').update({tricks: 0});
		let blue1hand = [];
		let blue2hand = [];
		let red1hand = [];
		let red2hand = [];
		let cardNum = 0;
		let deckdeck = deck();
		while (cardNum <= 20) {
			let newDeck = deckdeck.filter(x => x.inDeck)
			if (cardNum === 0) {
				let card = newDeck[Math.floor(Math.random() * newDeck.length)];
				card.inDeck = false;
				let trump = getTrump(card.card[1])
				db.collection(gamecode).doc('dealer').set({trump: trump, flipped: card.card, phase: 1});
				
				cardNum++
			} else {
				let ind = Math.floor(Math.random() * newDeck.length)
				let card = newDeck[ind];
				card.inDeck = false;
				cardNum++;
				if (cardNum % 4 === 0) {
					blue1hand.push(card.card)
				} else if (cardNum % 4 === 1) {
					blue2hand.push(card.card)
				} else if (cardNum % 4 === 2) {
					red1hand.push(card.card)
				} else if (cardNum % 4 === 3) {
					red2hand.push(card.card)
				}
			}
		}
		if (user.place === 'blue1') {
			if (enemy1.place === 'red1') {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: blue1hand, username: user.username}});
				db.collection(gamecode).doc('teamblue').update({player2: {hand: blue2hand, username: teammate.username}});
				db.collection(gamecode).doc('teamred').update({player1: {hand: red1hand, username: enemy1.username}});
				db.collection(gamecode).doc('teamred').update({player2: {hand: red2hand, username: enemy2.username}});
			} else {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: blue1hand, username: user.username}});
				db.collection(gamecode).doc('teamblue').update({player2: {hand: blue2hand, username: teammate.username}});
				db.collection(gamecode).doc('teamred').update({player1: {hand: red1hand, username: enemy2.username}});
				db.collection(gamecode).doc('teamred').update({player2: {hand: red2hand, username: enemy1.username}});
			}
		} else if (user.place === 'blue2') {
			if (enemy1.place === 'red1') {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: blue1hand, username: teammate.username}});
				db.collection(gamecode).doc('teamblue').update({player2: {hand: blue2hand, username: user.username}});
				db.collection(gamecode).doc('teamred').update({player1: {hand: red1hand, username: enemy1.username}});
				db.collection(gamecode).doc('teamred').update({player2: {hand: red2hand, username: enemy2.username}});
			} else {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: blue1hand, username: user.username}});
				db.collection(gamecode).doc('teamblue').update({player2: {hand: blue2hand, username: teammate.username}});
				db.collection(gamecode).doc('teamred').update({player1: {hand: red1hand, username: enemy2.username}});
				db.collection(gamecode).doc('teamred').update({player2: {hand: red2hand, username: enemy1.username}});
			} 
		} else if (user.place === 'red1') {
			if (enemy1.place === 'blue1') {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: blue1hand, username: enemy1.username}});
				db.collection(gamecode).doc('teamblue').update({player2: {hand: blue2hand, username: enemy2.username}});
				db.collection(gamecode).doc('teamred').update({player1: {hand: red1hand, username: user.username}});
				db.collection(gamecode).doc('teamred').update({player2: {hand: red2hand, username: teammate.username}});
			} else {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: blue1hand, username: enemy2.username}});
				db.collection(gamecode).doc('teamblue').update({player2: {hand: blue2hand, username: enemy1.username}});
				db.collection(gamecode).doc('teamred').update({player1: {hand: red1hand, username: user.username}});
				db.collection(gamecode).doc('teamred').update({player2: {hand: red2hand, username: teammate.username}});
			}
		} else if (user.place === 'red2') {
			if (enemy1.place === 'blue1') {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: blue1hand, username: enemy1.username}});
				db.collection(gamecode).doc('teamblue').update({player2: {hand: blue2hand, username: enemy2.username}});
				db.collection(gamecode).doc('teamred').update({player1: {hand: red1hand, username: teammate.username}});
				db.collection(gamecode).doc('teamred').update({player2: {hand: red2hand, username: user.username}});
			} else {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: blue1hand, username: enemy2.username}});
				db.collection(gamecode).doc('teamblue').update({player2: {hand: blue2hand, username: enemy1.username}});
				db.collection(gamecode).doc('teamred').update({player1: {hand: red1hand, username: teammate.username}});
				db.collection(gamecode).doc('teamred').update({player2: {hand: red2hand, username: user.username}});
			}
		}
	}
	
	const getTrump = (t) => {
		if (t === 'S') {
			return 'Spades'
		} else if (t === 'C') {
			return 'Clubs'
		} else if (t === 'D') {
			return 'Diamonds'
		} else if (t === 'H') {
			return 'Hearts'
		}
	}

	const playCard = (card) => {
		
		if (dealer.phase === 1) {
			sort(card);
		} else {
			if (dealer.phase === 3) {
				let temp = cardsPlayed;
				temp.push(card);
				db.collection(gamecode).doc('cardsPlayed').set({cards: temp});
			}
			let index = user.hand.findIndex(x => x === card);
			let newHand = user.hand;
			newHand.splice(index, 1)
			if (user.place === 'blue1') {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: newHand, username: username}});
			} else if (user.place === 'blue2') {
				db.collection(gamecode).doc('teamblue').update({player2: {hand: newHand, username: username}});
			} else if (user.place === 'red1') {
				db.collection(gamecode).doc('teamred').update({player1: {hand: newHand, username: username}});
			}else if (user.place === 'red2') {
				db.collection(gamecode).doc('teamred').update({player2: {hand: newHand, username: username}});
			}
			db.collection(gamecode).doc('dealer').update({phase: 3});
		}
	}
	
	const sort = (card) => {
		let newHand = user.hand;
		let ind = newHand.findIndex(x => x === card);
		let sortedCard = newHand.splice(ind, 1);
		newHand.push(sortedCard[0]);
		if (user.place === 'blue1') {
				db.collection(gamecode).doc('teamblue').update({player1: {hand: newHand, username: username}});
			} else if (user.place === 'blue2') {
				db.collection(gamecode).doc('teamblue').update({player2: {hand: newHand, username: username}});
			} else if (user.place === 'red1') {
				db.collection(gamecode).doc('teamred').update({player1: {hand: newHand, username: username}});
			}else if (user.place === 'red2') {
				db.collection(gamecode).doc('teamred').update({player2: {hand: newHand, username: username}});
			}
	}

	const woopsie = (card) => {
		let ind = cardsPlayed.findIndex(x => x === card);
		let newCards = cardsPlayed;
		newCards.splice(ind, 1);
		db.collection(gamecode).doc('cardsPlayed').set({cards: newCards});
		if (user.place === 'blue1') {
			db.collection(gamecode).doc('teamblue').update({player1: {username: user.username, hand: [...user.hand, card]}});
		} else if (user.place === 'blue2') {
			db.collection(gamecode).doc('teamblue').update({player2: {username: user.username, hand: [...user.hand, card]}});
		} else if (user.place === 'red1') {
			db.collection(gamecode).doc('teamred').update({player1: {username: user.username, hand: [...user.hand, card]}});
		} else if (user.place === 'red2') {
			db.collection(gamecode).doc('teamred').update({player2: {username: user.username, hand: [...user.hand, card]}});
		}
	}
	
	const claimTrick = (team) => {
		if (team === 2) {
			let tricks = team2.tricks + 1;
			db.collection(gamecode).doc('teamblue').update({tricks: tricks})
		} else if (team === 1) {
			let tricks = team1.tricks + 1;
			db.collection(gamecode).doc('teamred').update({tricks: tricks})
		}
		db.collection(gamecode).doc('cardsPlayed').set({cards: []});
	}
	
	const pickUp = (card) => {
		if (dealer.phase === 1) {
			if (user.place === 'blue1') {
				db.collection(gamecode).doc('dealer').update({flipped: 'FD', phase: 2});
				db.collection(gamecode).doc('teamblue').update({player1: {username: user.username, hand: [...user.hand, card]}})
			} else if (user.place === 'blue2') {
				db.collection(gamecode).doc('dealer').update({flipped: 'FD', phase: 2});
				db.collection(gamecode).doc('teamblue').update({player2: {username: user.username, hand: [...user.hand, card]}})
			} else if (user.place === 'red1') {
				db.collection(gamecode).doc('dealer').update({flipped: 'FD', phase: 2});
				db.collection(gamecode).doc('teamred').update({player1: {username: user.username, hand: [...user.hand, card]}})
			} else if (user.place === 'red2') {
				db.collection(gamecode).doc('dealer').update({flipped: 'FD', phase: 2});
				db.collection(gamecode).doc('teamred').update({player2: {username: user.username, hand: [...user.hand, card]}})
			}			
		} else if (dealer.phase === 3 && card === 'FD') {
			deal();
		}
	}
	
	const turnDown = (newTrump) => {
		db.collection(gamecode).doc('dealer').set({trump: newTrump, phase: 3, flipped: 'FD'})
	}
	
	const addScore = (team) => {
		if (team === 1) {
			let newScore = team1.score + 1;
			let capped = newScore > 10 ? 10 : newScore;
			db.collection(gamecode).doc('teamred').update({score: capped});
		} else if (team === 2) {
			let newScore = team2.score + 1;
			let capped = newScore > 10 ? 10 : newScore;
			db.collection(gamecode).doc('teamblue').update({score: capped});
		}
	}
	
	const minusScore = (team) => {
		if (team === 1) {
			let newScore = team1.score - 1;
			let capped = newScore < 0 ? 0 : newScore;
			db.collection(gamecode).doc('teamred').update({score: capped});
		} else if (team === 2) {
			let newScore = team2.score - 1;
			let capped = newScore < 0 ? 0 : newScore;
			db.collection(gamecode).doc('teamblue').update({score: capped});
		}
	}
	
	useEffect(() => {
		let unsubscribe = db.collection(gamecode).onSnapshot(snap => {
			let blue1 = {};
			let blue2 = {};
			let red1 = {};
			let red2 = {};
			let blueScore = 0;
			let blueTricks = 0;
			let redScore = 0;
			let redTricks = 0;
			snap.docs.forEach(doc => {
				if (doc.id === 'teamblue') {
					blue1 = doc.data().player1;
					blue2 = doc.data().player2;
					blueScore = doc.data().score;
					blueTricks = doc.data().tricks;
				} else if (doc.id === 'teamred') {
					red1 = doc.data().player1;
					red2 = doc.data().player2;
					redScore = doc.data().score;
					redTricks = doc.data().tricks;
				} else if (doc.id === 'cardsPlayed') {
					setCardsPlayed(doc.data().cards);
				} else if (doc.id === 'dealer') {
					setDealer(doc.data())
				}
			})
			setTeam1({name: `${red1.username}/ ${red2.username}`, score: redScore, tricks: redTricks});
			setTeam2({name: `${blue1.username}/ ${blue2.username}`, score: blueScore, tricks: blueTricks});
			if (blue1.username === username) {
					setUser({...blue1, place: 'blue1'});
					setTeammate({...blue2, place: 'blue2'});
					setEnemy1({...red2, place: 'red2'});
					setEnemy2({...red1, place: 'red1'});
			} else if (blue2.username === username) {
					setUser({...blue2, place: 'blue2'});
					setTeammate({...blue1, place: 'blue1'});
					setEnemy1({...red1, place: 'red1'});
					setEnemy2({...red2, place: 'red2'});
			} else if (red1.username === username) {
					setUser({...red1, place: 'red1'});
					setTeammate({...red2, place: 'red2'});
					setEnemy1({...blue1, place: 'blue1'});
					setEnemy2({...blue2, place: 'blue2'});
			} else if (red2.username === username) {
					setUser(red2);
					setTeammate(red1);
					setEnemy1(blue2);
					setEnemy2(blue1);
					setUser({...red2, place: 'red2'});
					setTeammate({...red1, place: 'red1'});
					setEnemy1({...blue2, place: 'blue2'});
					setEnemy2({...blue1, place: 'blue1'});
			} else {
				setUser({busted: true});
			}
			
		})
		return unsubscribe;
	}, []);
	
	if (user.busted) {
		return (<Redirect to={`/${gamecode}`} />)
	} else if (user.username && teammate.username && enemy1.username && enemy2.username) {
		  return (
    <div className="app">	
			<div className ='teammate'>
				<Facedown user={teammate} />
			</div>
			<div className='row'>
				<Facedown user={enemy1} />
				<Cardtable cards={cardsPlayed} woopsie={woopsie} />
				<Facedown user={enemy2} />
			</div>
			<div className='myHandContainer'>
				<UI team1={team1} team2={team2} dealer={dealer} addScore={addScore} minusScore={minusScore} claim={claimTrick} />
				<MyHand user={user} handleClick={playCard}/>
				<Buttons pickUp={pickUp} dealer={dealer} turnDown={turnDown} />
			</div>
		</div>
  );
	} else {
		return (<div clasName='loading'>Loading</div>)
	}
		

}

export default App;
