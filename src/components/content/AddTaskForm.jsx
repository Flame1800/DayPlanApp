import React, { Component } from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import * as actions from "../../actions/index.js";

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const actionCreators = {
  addTask: actions.addTask,
};

const generateTomatos = (time) => {
  const hours = Number(time.slice(0, 2));
  const mapHours = (hours * 60) - (10 * hours);
  const minutes = Number(time.slice(3));

  const pomodors = Math.floor((mapHours + minutes) / 25);
  return pomodors;
}

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { pomodors: 0 };
  }

  handleSubmit = (mode) => (values) => {
    const userId = this.props.user.uid;
    const task = { userId, state: "active", mode, ...values, pomodors: this.state.pomodors };
    this.props.addTask(task);
    this.props.reset();
    this.setState({ pomodors: 0 });
  };

  setPomodors = (e) => {
    this.setState({ pomodors: generateTomatos(e.target.value) });
  }

  render() {
    const { mode, handleSubmit, modalToggler, text } = this.props;
    return (
      <form
        className="form-work"
        onSubmit={handleSubmit(this.handleSubmit(mode))}
      >
        <div className="add-task-modal">
          <Field
            type="text"
            name={text}
            component="input"
            className="add-task-modal__input"
            placeholder="Введите свою задачу"
          />
          <div className="add-task-modal__container">
            <Field type="time" name='time' component='input' onChange={this.setPomodors} className="add-task-modal__set-time" />
            <div className="stat">{this.state.pomodors} <div className="tomato-icon"></div></div>
            <div className="btns">
              <input type="submit" className="add-task-modal__acept" value="Добавить" />
              <div
                className="add-task-modal__reset"
                onClick={modalToggler(mode)}

              >Отмена</div>
            </div>
          </div>
          <div className="tag-task">
            <div className="add-tag">+ Добавить тег</div>
          </div>
        </div>
      </form>
    );
  }
}

const ConnectedAddTaskForm = connect(mapStateToProps, actionCreators)(AddTaskForm);
export default reduxForm({ form: "NewTask" })(ConnectedAddTaskForm);
