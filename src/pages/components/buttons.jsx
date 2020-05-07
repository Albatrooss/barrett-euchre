import React, {useState} from 'react';

export default function Buttons({deal, pickUp, dealer, turnDown}) {
	
	let deckCard = dealer.flipped;
	const [newTrump, setNewTrump] = useState('');
	
	return (
		<div className='btns'>
			<div className='deckContainer'>
				<img className='deck' onClick={() => pickUp(deckCard)} src={`/assets/${deckCard}.png`} alt='deck' />
			</div>
			<div className='turnDownContainer'>
				<button className='turnDownBtn' onClick={() => turnDown(newTrump)} >Turn Down</button>
				<input type='text' placeholder='NEW TRUMP' value={newTrump} onChange={e => setNewTrump(e.currentTarget.value)} />
			</div>
		</div>
	);
}