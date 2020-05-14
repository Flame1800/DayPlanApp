import React, { Component } from "react";
import { connect } from "react-redux";
import cn from "classnames";

import * as actions from "../../actions/index.js";

const mapStateToProps = (state) => {
  const {
    tasksDayFetchingState,
    tasksDay: { byId, allIds },
    user
  } = state;

  const mappingTasks = allIds.map((id) => byId[id]);
  const filteredTasks = mappingTasks.filter((task) => task.userId === user.id);
  return { tasks: filteredTasks, tasksDayFetchingState, user };
};

const actionCreators = {
  removeTask: actions.removeTask,
  completeTask: actions.completeTask,
  calculateMoney: actions.calculateMoney,
};

class TaskList extends Component {
  handleRemoveTask = (id) => () => {
    const { removeTask } = this.props;
    removeTask({ id });
  };

  resetTask = (task) => () => {
    const { completeTask, calculateMoney, user } = this.props;
    completeTask({ task });

    const price = task.priceWork || task.priceRelax;
    const props = {price, user};
    if (task.priceWork) {
      calculateMoney({...props, mode: "delete"});
    }
    if (task.priceRelax) {
      calculateMoney({...props, mode: "add"});
    }
  }

  completeTask = (task) => (e) => {
    const { completeTask, calculateMoney, user } = this.props;
    completeTask({ task });

    const price = task.priceWork || task.priceRelax;
    const props = {price, user};
    if (task.priceWork) {
      calculateMoney({...props, mode: "add"});
    }
    if (task.priceRelax) {
      calculateMoney({...props, mode: "delete"});
    }
  };

  render() {
    const { mode, tasks, tasksDayFetchingState } = this.props;

    if (tasksDayFetchingState === "requested") {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }
    if (tasksDayFetchingState === "failed") {
      return <span>Please, reload page!</span>;
    }

    if (tasks.length === 0) {
      return <div className='empty-tasks-text'> У вас нет текущих задач </div>
    }

    const modedTasks = tasks.filter((task) => task.mode === mode);

    return (
      <div className="tasks">
        {modedTasks.map((task) => {
          const completedTask = task.state === "active" ? false : true;
          const priceClasses = cn({
            task__price: true,
            "price-work-theme": task.priceWork || false,
            "price-relax-theme": task.priceRelax || false,
          });

          const taskClasses = cn({
            task: true,
            "task-completed": completedTask,
          });

          return (
            <div className={taskClasses} key={task.id}>
              <div className="task__text">
                {task.textWork || task.textRelax}
              </div>
              <div className="task__down">
                <div className="task__buttons">
                  {/* <div className="icon edit-button"></div> */}
                  <div
                    className="icon delete-button"
                    onClick={this.handleRemoveTask(task.id)}
                  ></div>
                  {!completedTask ? (
                    <div
                      className="icon ready-button"
                      onClick={this.completeTask(task)}
                    ></div>
                  ) : (
                      <div className="task-block-completed">
                        Задание выполненно
                        <div className="task-reset-button" onClick={this.resetTask(task)}>Отмена</div>
                      </div>
                    )}
                </div>
                <div className="items-right">
                  {/* <div className="task__timer">
                    3ч. 56мин
                  <div className="icon time-button"></div> 
                  </div> */}
                  {!completedTask && (
                    <div className={priceClasses}>
                      {task.priceWork || task.priceRelax || 0}$
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const ConnectedTaskList = connect(mapStateToProps, actionCreators)(TaskList);
export default ConnectedTaskList;
