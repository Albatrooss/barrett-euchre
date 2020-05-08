import React from 'react';

export default function myHand({user, handleClick}) {
	
	return (
		<div className='myHand'>
			<h4>{user.username}</h4>
			<ul className='myHandUL'>
				{user.hand.map(x => {return <li key={x} className='myHandLI' onClick={() => handleClick(x)} ><img className='hand' src={`/assets/${x}.png`} /></li>})}
			</ul>
		</div>
	);
}