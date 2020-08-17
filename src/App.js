import React from 'react';
import './App.css';


class SubmitForm extends React.Component {
  state = { term: '' };
  render() {
    return (
      <form onSubmit={ (e) => {
        e.preventDefault();
        this.props.onFormSubmit(this.state.term)
      } }>
        <input
          type='text'
          className='input'
          placeholder='Enter Task'
          value={this.state.term}
          onChange={(e) => this.setState({ term: e.target.value })}
        />
        <button className='button'>Submit</button>
      </form>
    );
  }
}
class TodoList extends React.Component {
  render() {
    const todos = this.props.tasks.map((todo, index) => {
      return <Todo content={todo} key={index} id={index} onDelete={this.props.onDelete} />
    });

    return (
      <div className='list-wrapper'>
        {todos}
      </div>
    );
  }
}

class Todo extends React.Component {
  render() {
    return (
      <div className='list-item'>
        {this.props.content}
        <button class="delete is-pulled-right" onClick={() => { this.props.onDelete(this.props.id) }}>x</button>
      </div>
    );
  }
}

class Counter extends React.Component {
  render() {
    return (
      <div className='items-counter'>
        <p className='left-items-counter'>
          {this.props.numItems} items left
      </p>
      </div>
    );
  }
}

class FilterButtons extends React.Component {
  render () {
    return (
      <div className="filters btn-group">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>      
    );
  }
}

class App extends React.Component {

  state = {
    tasks: ['task 1', 'task 2', 'task 3', 'eat', 'sleep', 'f']
  };

  handleDelete = (index) => {
    const newArr = [...this.state.tasks];
    newArr.splice(index, 1);
    this.setState({ tasks: newArr });
  }

  handleSubmit = (val) => {
    this.setState({ tasks: [...this.state.tasks, val] })
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='card frame'>
          <div><h1>To Do</h1></div>
          <SubmitForm onFormSubmit={this.handleSubmit} />
          <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
          <Counter numItems={this.state.tasks.length} />
          <FilterButtons/>
        </div>
      </div>
    );
  }
}

export default App;
