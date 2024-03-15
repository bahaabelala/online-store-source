import { useEffect } from 'react';

const useClickOutside = (ref, action) => {
	useEffect(() => {
		const handleClickOutside = e => {
			if (ref.current && !ref.current.contains(e.target)) {
				action();
			}
		}

		document.addEventListener('click', handleClickOutside);

		return () => document.removeEventListener('click', handleClickOutside);
	}, [ref]);
}

export default useClickOutside;