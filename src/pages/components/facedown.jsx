import React from 'react';

export default function facedown({user}) {
	return (
		<div className='facedown'>
			{user.username}
			<ul>
				{user.hand.map(x => { return <li key={x} className='otherHandLI'><img className='otherHand' src='/assets/FD.png' /></li> })}
			</ul>
		</div>
	);
}