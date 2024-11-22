import styles from './SelectUser.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
	const { userId, setUserId } = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};
	return (
		<select name='user' id='user' value={userId} onChange={changeUser} className={styles['select']}>
			<option value='1' className={styles['select-option']}>Антон</option>
			<option value='2' className={styles['select-option']}>Вася</option>
		</select>
	);
}

export default SelectUser;
