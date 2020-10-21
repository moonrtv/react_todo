import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/app-header/app-header';
import SearchPanel from './components/search-panel/search-panel';
import TodoList from './components/todo-list/todo-list';
import ItemStatusFilter from './components/item-status-filter/item-status-filter';

import './index.css';
import todoData from './data.json';

const App = () => {
	return (<div className="todo-app">
		<AppHeader toDo={1} done={3} />
		<div className="top-panel d-flex">
			<SearchPanel />
			<ItemStatusFilter />
		</div>
		<TodoList todos={todoData} />
	</div>);
};

ReactDOM.render(<App />, document.getElementById('root'));