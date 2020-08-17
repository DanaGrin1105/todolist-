import React from 'react';
import './App.css';


class Form extends React.Component {
    constructor(props) {
        super();
        this.state = {inputValue: "" };
        this.onInputChange = this.onInputChange.bind(this)
    }
    onInputChange(e){
        console.log(e.target.value)
        this.setState({inputValue:e.target.value})
    }
    render() {
        return (
            <div>
                <input onChange={this.onInputChange} type="text" value={this.state.inputValue} placeholder="What's Next?"></input>
            </div>
        )
    }
}




class App extends React.Component {
    state = {
        todos: [{ content: "eat", completed: false }]
    }
    render() {
        return (
            <div>
                <h1>To Do</h1>
                <Form />
            </div>

        )
    }
}
export default App;