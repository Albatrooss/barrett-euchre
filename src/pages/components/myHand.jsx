import React from 'react';

export default function myHand({user, handleClick}) {
	
	return (
		<div className='myHand'>
			{user.username}
			<ul className='myHandUL'>
				{user.hand.map(x => {return <li key={x} className='myHandLI' onClick={() => handleClick(x)} ><img className='hand' src={`/assets/${x}.png`} /></li>})}
			</ul>
		</div>
	);
}