import React, { Component } from 'react';
import App from '../components/App';
import axios from 'axios';
import uuid from 'uuid/v1';

class AppContainer extends Component {
	constructor() {
		super();

		this.state = {
			filterText: '',
			addText: '',
			isLoading: false,
			hasError: false,
			todos: []
		};
	}

	handleIsDoneToggle = async (todoId, isDone) => {
    this.setState({ isLoading: true });
		try {
      let resp = await axios.put(`https://react.axilis.com/lazanja/todo`, { id: todoId, isDone: isDone});

      if(resp.status >= 200 && resp.status < 400) {
        this.setState({
          todos: this.state.todos.map((todo) => {
            if (todo.id === todoId) {
              return { ...todo, isDone: isDone };
            } else {
              return todo;
            }
          })
        });
      } else {
        this.setState({ hasError: true });
      }
		} catch (err) {
			this.setState({ hasError: true });
		} finally {
			this.setState({ isLoading: false });
    }
	};

	onFilterTextChanged = (text) => {
		this.setState({
			filterText: text
		});
  };
  
  onAddTodoTextChanged = (text) => {
		this.setState({
			addText: text
		});
	};

	handleTrashClicked = async (todoId) => {
    this.setState({ isLoading: true });
		try {
      let resp = await axios.delete(`https://react.axilis.com/lazanja/todo/${todoId}`);

      if(resp.status >= 200 && resp.status < 400) {
        this.setState({
          todos: this.state.todos.filter((t) => t.id !== todoId)
        });
      } else {
        this.setState({ hasError: true });
      }
		} catch (err) {
			this.setState({ hasError: true });
		} finally {
			this.setState({ isLoading: false });
    }
  };
  
  handleAddTodoClicked = async () => {
    this.setState({ isLoading: true })
		try {
      let resp = await axios.post('https://react.axilis.com/lazanja/todo', { text: this.state.addText });

      if(resp.status >= 200 && resp.status < 400) {
        this.setState({
          todos: [...this.state.todos, {
            id: resp.data.id,
            text: resp.data.text,
            isDone: resp.data.isDone
          }],
          addText: "",
          filterText: ""
        });
      } else {
        this.setState({ hasError: true });
      }
		} catch (err) {
			this.setState({ hasError: true });
		} finally {
			this.setState({ isLoading: false });
		}
  }

	async componentDidMount() {
		this.setState({ isLoading: true });
		try {
			let resp = await axios.get('https://react.axilis.com/lazanja/todos');
			this.setState({
				todos: resp.data
			});
		} catch (err) {
			this.setState({ hasError: true });
		} finally {
			this.setState({ isLoading: false });
		}
	}

	filter = (todos, filter) => {
		if (filter && filter.trim().length > 0) {
			return todos.filter((t) => t.text.indexOf(filter) > -1);
		}
		return todos;
	};

	render() {
		return (
			<App
				filterText={this.state.filterText}
				addText={this.state.addText}
				isLoading={this.state.isLoading}
				hasError={this.state.hasError}
				todos={this.filter(this.state.todos, this.state.filterText)}
				handleIsDoneToggle={this.handleIsDoneToggle}
        handleTrashClicked={this.handleTrashClicked}
        handleAddTodoClicked={this.handleAddTodoClicked}
        onFilterTextChanged={this.onFilterTextChanged}
        onAddTodoTextChanged={this.onAddTodoTextChanged}
			/>
		);
	}
}

export default AppContainer;
