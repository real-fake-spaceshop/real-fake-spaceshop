import React from 'react';

export const LandingPage = () => {
	return (
		<div>
			<div>
				<h1>Real Fake Spaceships!</h1>
			</div>
			<div>
				{/* OB/JL: beware relative URLs (the leading dot) */}
				<img id="splash-logo" src="./images/default_ship_transparent.png" />
			</div>
			<div>
				<button>Login</button>
			</div>
			<div>
				<button>Sign Up</button>
			</div>
			<div>
				<button>Product Catalogue</button>
			</div>
		</div>
	);
};
