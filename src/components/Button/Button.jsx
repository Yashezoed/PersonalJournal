import './Button.css';

function Button({ children, className }) {
	return (
		<button className={className ? className : 'button accent'} >
			{children}
		</button>
	);
}

export default Button;