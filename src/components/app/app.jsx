import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";
import todoData from "../../data.json";

export default class App extends Component {
  maxId = 100;
  state = {
    todoData: [],
    term: "",
    filter: "all"
  };

  componentDidMount() {
    this.setState({
      todoData
    });
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  addItem = label => {
    const newItem = this.createTodoItem(label);

    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem]
      };
    });
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return { todoData: newArr };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  toggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  toggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  searchItems = (items, search) => {
    if (search.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  };

  filterItems(items, filter) {
    if (filter === "all") {
      return items;
    } else if (filter === "active") {
      return items.filter(item => !item.done);
    } else if (filter === "done") {
      return items.filter(item => item.done);
    }
  }
  searchChange = term => {
    this.setState({ term });
  };

  filterChange = filter => {
    this.setState({ filter });
  };

  render() {
    let { todoData, term, filter } = this.state;

    let visibleItems = this.filterItems(
      this.searchItems(todoData, term),
      filter
    );

    const doneCount = todoData.filter(el => el.done).length;
    const totalCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={totalCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.searchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.filterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.toggleImportant}
          onToggleDone={this.toggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
