import React from 'react';

export default function UI({dealer, team1, team2, handleClick, addScore, minusScore, claim}) {
	let trump = dealer.trump;

	return (
		<div className='UI'>
			<div className='row'>
				<div className='nameCol1' onClick={() => minusScore(1)}>
					<h2>{team1.name}</h2>
				</div>
				<div className='scoreCol1' onClick={() => addScore(1)}>
					{team1.score}
				</div>
				<div className='tricksCol1' onClick={() => claim(1)} >{team1.tricks}</div>
			</div>
			<div className='row'>
				<div className='nameCol2' onClick={() => minusScore(2)}>
					<h2>{team2.name}</h2>
				</div>
				<div className='scoreCol2' onClick={() => addScore(2)}>
					{team2.score}
				</div>
				<div className='tricksCol2' onClick={() => claim(2)} >{team2.tricks}</div>
			</div>
		</div>
	);
}