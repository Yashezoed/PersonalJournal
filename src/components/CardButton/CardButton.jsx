import './CardButton.css';

function CardButton({ children, className, selectCard, Id }) {
	const cl = 'card-button' + (className ? ' ' + className : '');


	return (
		<button className={cl} onClick={() => selectCard(Id)}>
			{children}
		</button>
	);
}

export default CardButton;