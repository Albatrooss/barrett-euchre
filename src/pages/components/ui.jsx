import React from 'react';

export default function UI({dealer, team1, team2, handleClick, addScore}) {
	let trump = dealer.trump;

	return (
		<div className='UI'>
			<h2>Trump: {trump} </h2>
			<h4>Tricks: </h4>
			<p>{team1.name}: {team1.tricks}<br/>
				{team2.name}: {team2.tricks}</p>
			<h3>Score:</h3>
			<p><span onClick={() => addScore(1)} >{team1.name}: {team1.score}<br/></span>
				<span onClick={() => addScore(2)} >{team2.name}: {team2.score}</span></p>
		</div>
	);
}