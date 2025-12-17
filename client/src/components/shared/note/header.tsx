const Header = () => {
	return (
		<header className='mb-4 text-center'>
			<h1 className='text-2xl font-bold text-white'>View Note</h1>
			<p className='text-sm text-slate-300 mt-1'>
				This note is encrypted — paste the key (after the # in your link) if it
				wasn't provided.
			</p>
		</header>
	);
};

export default Header;
