import React, { Component } from "react";
import TaskList from "./TaskList.jsx";
import AddTaskForm from "./AddTaskForm.jsx";

export default class ContentBar extends Component {
  constructor(props) {
    super(props);
    this.state = { workModalOpen: false, relaxModalOpen: false };
  }

  renderButton = (mode) => {
    return (
      <div className="add-task" onClick={this.modalToggler(mode)}>
        Добавить задачу
      </div>
    );
  };

  modalToggler = (mode) => (e) => {
    e.preventDefault();
    if (mode === "work") {
      this.setState({ workModalOpen: !this.state.workModalOpen });
    }
    if (mode === "relax") {
      this.setState({ relaxModalOpen: !this.state.relaxModalOpen });
    }
  };

  render() {
    const { workModalOpen, relaxModalOpen } = this.state;

    return (
      <div className="content-bar">
        <div className="work-list task-list">
          <div className="list-header">Работа</div>
          {!workModalOpen ? (
            this.renderButton("work")
          ) : (
            <AddTaskForm
              mode="work"
              modalToggler={this.modalToggler}
              text="textWork"
              price="priceWork"
            />
          )}
          <TaskList mode="work" />
        </div>
        <div className="relax-list task-list">
          <div className="list-header list-header-white-theme">Отдых</div>
          {!relaxModalOpen ? (
            this.renderButton("relax")
          ) : (
            <AddTaskForm
              mode="relax"
              modalToggler={this.modalToggler}
              text="textRelax"
              price="priceRelax"
            />
          )}
          <TaskList mode="relax" />
        </div>
      </div>
    );
  }
}
