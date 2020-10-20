
import React from 'react';
import ReactDOM from 'react-dom';

const AppHeader = () => <h1>My Todo List</h1>;

const SearchPanel = () => <input placeholder='search' />;

const TodoList = () => {
  return (
  <ul>
    <li>Learn</li>
    <li>Build</li>
  </ul>
  )
};

const App = () => (<div>
  <AppHeader />
  <SearchPanel />
  <TodoList />
</div>);

ReactDOM.render(<App />, document.getElementById('root'));