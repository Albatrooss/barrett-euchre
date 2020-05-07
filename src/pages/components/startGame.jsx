import React from 'react';
import {Link} from 'react-router-dom';

export default function StartGame({blue, red, gamecode, input}) {
	
	if (blue[1] !== '' && red[1] != '') {
			return (
		 		<Link to={`/${gamecode}/${input}`}><button className=' g2gBtn'>Go to game</button></Link>
		 )
	} else {
		return (
			<button className='g2gBtn dark'>Go to game</button>
		)
	}
}