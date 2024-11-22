import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext ,useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import { UserContext } from '../../context/user.context';
import cn from 'classnames';
import Input from '../Input/Input';

function JournalForm({ onSubmit, selectedCard, setDeletedCard}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const { userId } = useContext(UserContext);



	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (selectedCard) {
			dispatchForm({ type: 'SET_VALUE', payload: { ...selectedCard } });
		}
		else dispatchForm({ type: 'CLEAR' });
	}, [selectedCard]);

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value }, userId});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT'});
	};

	const setDeletedCardId = () => {
		console.log(values.id);
		setDeletedCard(values.id);
		dispatchForm({ type: 'CLEAR' });

	};
	


	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['header-form']}>
				<Input
					type='text'
					ref={titleRef}
					onChange={onChange}
					value={values.title}
					name='title'
					isValid={!isValid.title}
					appearence='text'
					header='header'
				/>
				<img
					src='/archive.svg'
					alt='Удалить запись'
					onClick={setDeletedCardId}
					className={styles['delete-item']}
				></img>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='/calendar.svg' alt='Иконка календаря' />
					<span>Дата</span>
				</label>
				<Input
					type='date'
					ref={dateRef}
					onChange={onChange}
					name='date'
					value={
						values.date
							? new Date(values.date).toISOString().split('T')[0]
							: ''
					}
					id='date'
					appearence='text'
					isValid={!isValid.title}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<Input
					type='text'
					onChange={onChange}
					id='tag'
					value={values.tag}
					appearence='text'
					name='tag'
				/>
			</div>
			<textarea
				ref={postRef}
				name='post'
				id=''
				onChange={onChange}
				value={values.post}
				cols='30'
				rows='10'
				className={cn(styles['input'], {
					[styles['invalid']]: !isValid.post
				})}
			></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;