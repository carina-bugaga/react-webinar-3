import {useState} from 'react';

// Пользовательский хук для отображения и скрытия модального окна
const useModal = () => {
	const [isShowing, setIsShowing] = useState(false);

	function toggle() {
		setIsShowing(!isShowing);
	}

	return [
		isShowing,
		toggle
	];
}

export default useModal;