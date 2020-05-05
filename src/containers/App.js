import React, { Component } from 'react';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: '',
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		//destructuring to make it clean
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter( robot => {
			return robot.name.toLowerCase().includes(searchfield);
		})
		return !robots.length ? 
			<h1 className='tc header'>loading...</h1> :
			(
				<div className='tc'>
					<h1 className='header '>friends list</h1>
					<SearchBox searchChange={ this.onSearchChange } />
					<Scroll>
						<CardList robots={ filteredRobots } />
					</Scroll>
				</div>
			);
	}
}

export default App;