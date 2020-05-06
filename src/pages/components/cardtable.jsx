import React from 'react';

export default function cardtable({cards, handleClick}) {
	if(cards.length > 0) {
		return (
			<div className='cardTable'>
				<ul className='cardsplayedUL'>
					{cards.map(x => { return <li key={x} className='cardsplayedLI'><img className='played' src={`/assets/${x}.png`} /></li> })}
				</ul>
				<button onClick={handleClick} >CLAIM</button>
			</div>
		);
	} else {
		return (
			<div className='cardtable'>
			</div>
		);
	}
}