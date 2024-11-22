import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items, selectCard }) {
	const { userId } = useContext(UserContext);


	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	const filteredItems = items.filter((el) =>
		el.userId === userId
	);

	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}


	return (
		<>
			{filteredItems.sort(sortItems).map((el) => (
				<CardButton key={el.id} selectCard={selectCard} Id={el.id}>
					<JournalItem
						title={el.title}
						post={el.post}
						date={el.date}
					/>
				</CardButton>
			))}
		</>
	);
}

export default JournalList;
