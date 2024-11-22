import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';
import { useEffect, useState } from 'react';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map((i) => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [selectedCard, setSelectedCard] = useState(undefined);
	const [deletedCard, setDeletedCard] = useState(undefined);

	const selectCard = (CardId) => {
		let filteredItems = items.filter((el) => el.id === CardId);
		setSelectedCard(filteredItems[0]);
	};

	const addItem = item => {
		if (!item.id) {
			setItems([...mapItems(items),{
				...item,
				date: new Date(item.date),
				id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
			}]);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id == item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}
		
	};

	const newCard = () => {
		setSelectedCard(undefined);
	};

	useEffect (() => {
		if (deletedCard) {
			const storage = JSON.parse(localStorage.getItem('data'));
			const filteredStorage = storage.filter((el) => el.id != deletedCard);
			localStorage.setItem('data', JSON.stringify(filteredStorage));
			setItems(JSON.parse(localStorage.getItem('data')));
		}
	}, [deletedCard]);


	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAddButton newCard={newCard} />
					<JournalList
						items={mapItems(items)}
						selectCard={selectCard}
					/>
				</LeftPanel>
				<Body>
					<JournalForm
						onSubmit={addItem}
						selectedCard={selectedCard}
						setDeletedCard={setDeletedCard}
					/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
