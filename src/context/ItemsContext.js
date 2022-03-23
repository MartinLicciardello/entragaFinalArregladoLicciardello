import React, { useState, createContext } from 'react';

export const ItemsContext = createContext();



const initialState = () => [
	{
		id: 45454,
		nombre: 'A52',
		marca: 'Samsung',
		gama: 'media',
		stock: 12,
		precio: 63000,
	},
];


export const ItemsProvider = ({ children }) => {
	const [items, setItems] = useState([initialState]);

	return (
		<ItemsContext.Provider value={[items, setItems]}>
			{children}
		</ItemsContext.Provider>
	);
};
