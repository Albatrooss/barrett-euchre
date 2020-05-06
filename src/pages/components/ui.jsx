import React from 'react';

export default function UI({dealer, team1, team2, handleClick, addScore}) {
	let trump = dealer.trump;
	let deck = dealer.flipped;

	return (
		<div className='UI'>
			<img onClick={() => handleClick(deck)} src={`/assets/${deck}.png`} alt='deck' />
			<br/>Trump: {trump} <br/>
			Tricks: <br />
			{team1.name}: {team1.tricks}<br/>
			{team2.name}: {team2.tricks}<br />
			Score:<br />
			<span onClick={() => addScore(1)} >{team1.name}: {team1.score}<br/></span>
			<span onClick={() => addScore(2)} >{team2.name}: {team2.score}</span>
		</div>
	);
}