import React, { Component } from 'react';

class AddTodo extends Component {
  onInputChange = (e) => {
		this.props.onAddTodoTextChanged(e.target.value);
  };

  onAddItemClick = () => {
		this.props.handleAddTodoClicked();
  };
  
	render() {
		return (
			<div className="pb-2">
				<div className="row">
					<div className="col">
						<input
              value={this.props.inputText}
              type="text"
              placeholder=""
              className="form-control"
              onChange={this.onInputChange} />
					</div>
					<div className="col">
						<button
              className="btn btn-dark"
              onClick={this.onAddItemClick}> Add Todo</button>
					</div>
				</div>
			</div>
		);
	}
}

export default AddTodo;
