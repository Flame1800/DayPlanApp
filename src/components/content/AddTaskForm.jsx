import React, { Component } from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import * as actions from "../../actions/index.js";

const actionCreators = {
  addTask: actions.addTask,
};

class AddTaskForm extends Component {
  
  handleSubmit = (mode) => (values) => {
    const task = {state: "active", mode, ...values };
    this.props.addTask(task);
    this.props.reset();
  };

  render() {
    const { mode, handleSubmit, modalToggler, text, price } = this.props;
    return (
      <form
        className="form-work"
        onSubmit={handleSubmit(this.handleSubmit(mode))}
      >
        <div className="add-task-modal">
          <Field
            type="textarea"
            name={text}
            component="input"
            className="add-task-modal__input"
          />
          <div className="add-task-modal__container">
            <div className="add-task-modal__price">
              Укажите цену:
              <Field
                type="text"
                name={price}
                component="input"
                className="add-task-modal__price-input"
              />
            </div>
            <input type="time" className="add-task-modal__set-time" />
            <input type="submit" className="add-task-modal__acept" value="" />
            <div
              className="add-task-modal__reset"
              onClick={modalToggler(mode)}
            ></div>
          </div>
        </div>
      </form>
    );
  }
}

const ConnectedAddTaskForm = connect(null, actionCreators)(AddTaskForm);
export default reduxForm({ form: "NewTask" })(ConnectedAddTaskForm);
