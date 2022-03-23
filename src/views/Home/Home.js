import React from 'react';
import CardList from '../../components/CardList/CardList';
import './Home.css';

const Home = () => {
	return (
		<div className='HomeContainer' style={{display: "flex", maxWidth: "1000px", flexWrap: "wrap", gap: "50px", padding: "50px", boxSizing: "border-box"}}>
			<CardList />
		</div>
	);
};

export default Home;
