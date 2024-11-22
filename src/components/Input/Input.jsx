import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input({ isValid, appearence, header, className, ...props }, ref) {
	return (
		<input
			ref={ref}
			className={cn(className, {
				[styles['invalid']]: isValid,
				[styles['input']]: appearence == 'text',
				[styles['input-header']]: header == 'header'
			})}
			{...props}
		/>
	);
});

export default Input;