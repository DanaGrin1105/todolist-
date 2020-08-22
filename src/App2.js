import React from 'react';
import './App.css';

class App extends React.Component {
    constructor() {
      super();
      this.addTodo = this.addTodo.bind(this);
      this.toggleTodo = this.toggleTodo.bind(this);
      this.deleteTodo = this.deleteTodo.bind(this);
      this.showActive = this.showActive.bind(this);
      this.showCompleted = this.showCompleted.bind(this);
      this.clearFilter = this.clearFilter.bind(this);
    }
  
    state = {
      todos: [],
      filter: ''
    };
  
    addTodo(todo) {
      this.setState({ todos: [...this.state.todos, todo] });
    }
  
    toggleTodo(todoIndex) {
      const todosCopy = [...this.state.todos];
      todosCopy[todoIndex].completed = !todosCopy[todoIndex].completed;
      this.setState({ todos: [...todosCopy] });
    }
  
    deleteTodo(index) {
      const todosCopy = [...this.state.todos];
      todosCopy.splice(index, 1);
      this.setState({ todos: [...todosCopy] });
    }
  
    showActive() {
      this.setState({ filter: 'active' });
    }
    showCompleted() {
      this.setState({ filter: 'completed' });
    }
    clearFilter() {
      this.setState({ filter: '' });
    }
  
    render() {
      return (
        <div className="App">
          <h1>Yet Another Todo List</h1>
          <Form addTodo={this.addTodo} />
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            toggleTodo={this.toggleTodo}
            deleteTodo={this.deleteTodo}
          />
  
          <div
            style={{
              display: 'flex',
              width: '35%',
              justifyContent: 'space-between',
              margin: 'auto'
            }}
          >
            <span>
              Items left:{' '}
              {this.state.todos.filter(({ completed }) => !completed).length}
            </span>
            <FilterButtons
              showActive={this.showActive}
              showCompleted={this.showCompleted}
              clearFilter={this.clearFilter}
            />
          </div>
        </div>
      );
    }
  }

class Form extends React.Component {
    constructor(props) {
      super();
  
      this.state = {
        inputValue: ''
      };
  
      this.onInputChange = this.onInputChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
    //this function saves whatever the user inputs into the input fields into the component state
    onInputChange(e) {
      this.setState({ inputValue: e.target.value });
    }
  //this function triggers when the form is submitted i.e. presses enter
    onSubmit(e) {
        //we need to prevent the default behaviour of the form (to put the content of the form 
        // in action/with ajax:post to a url, when none is provided, the fallback is "/"
        // then it refresh the page) 
      e.preventDefault();
      //the below function is what was passed from the parent
      this.props.addTodo({ content: this.state.inputValue, completed: false });
      //then we set the state to an empty string to reset the input
      this.setState({ inputValue: '' });
    }
  
    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <input value={this.state.inputValue} placeholder="What's next?" onChange={this.onInputChange} />
        </form>
      );
    }
  }
  
  class TodoList extends React.Component {
    render() {
      console.log(this.props.filter);
      const { filter: filterValue } = this.props;
    //   const filter = this.props.filter;
      const todosToShow = this.props.todos.filter((todo) => {
        if (filterValue === 'active') {
          return !todo.completed;
        }
        if (filterValue === 'completed') {
          return todo.completed;
        }
        return true;
      });

      return (
        <div>
          {todosToShow.map((todo, i) => {
            const style = {
              textDecoration: todo.completed ? 'line-through' : ''
            };
  
            return (
              <div key={i}>
                <input
                  onChange={() => this.props.toggleTodo(i)}
                  type="checkbox"
                  checked={todo.completed}
                />
                <label style={style}>
                  {todo.content}
                </label>
                <button onClick={() => this.props.deleteTodo(i)}>X</button>
              </div>
            );
          })}
        </div>
      );
    }
  }

  class FilterButtons extends React.Component {
    render() {
      return (
        <div>
          <button onClick={this.props.clearFilter}>All</button>
          <button onClick={this.props.showActive}>Active</button>
          <button onClick={this.props.showCompleted}>Completed</button>
        </div>
      );
    }
  }
  
 
  
export default App;