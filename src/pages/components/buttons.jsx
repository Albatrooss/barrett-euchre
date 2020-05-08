import React, {useState} from 'react';

export default function Buttons({deal, pickUp, dealer, turnDown, claim}) {
	
	let deckCard = dealer.flipped;
	const [newTrump, setNewTrump] = useState('');
	
	const submit = (e) => {
		e.preventDefault();
		turnDown(newTrump)
		setNewTrump('');
	}
	
	return (
		<div className='btns'>
			<div className='deckContainer'>
				<img className='deck' onClick={() => pickUp(deckCard)} src={`/assets/${deckCard}.png`} alt='deck' />
			</div>
			<div className='turnDownContainer'>
				<form className='turnDownForm' onSubmit={submit} >
					<input type='text' placeholder='NEW TRUMP' placeholder={dealer.trump.toUpperCase()} value={newTrump.toUpperCase()} onChange={e => setNewTrump(e.currentTarget.value)} />
				</form>
			</div>
		</div>
	);
}