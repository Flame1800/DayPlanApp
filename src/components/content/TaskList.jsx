import React, { Component } from "react";
import { connect } from "react-redux";
import cn from "classnames";

import * as actions from "../../actions/index.js";

const mapStateToProps = (state) => {
  const {
    tasksDayFetchingState,
    tasksDay: { byId, allIds },
  } = state;
  const tasks = allIds.map((id) => byId[id]);
  return { tasks, tasksDayFetchingState };
};

const actionCreators = {
  removeTask: actions.removeTask,
  completeTask: actions.completeTask,
  editTask: actions.editTask,
  addMoney: actions.addMoneySuccess,
  deleteMoney: actions.deleteMoneySuccess,
};

class TaskList extends Component {
  handleRemoveTask = (id) => () => {
    const { removeTask } = this.props;
    removeTask({ id });
  };

  completeTask = (task) => () => {
    const { completeTask, addMoney, deleteMoney } = this.props;
    completeTask({ task });
    const price = task.priceWork || task.priceRelax;

    if (task.priceWork) {
      addMoney({ price });
    }
    if (task.priceRelax) {
      deleteMoney({ price });
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
      return null;
    }

    const modedTasks = tasks.filter((task) => task.mode === mode);

    return (
      <div className="tasks">
        {modedTasks.map((task) => {
          const competedTask = task.state === "active" ? false : true;
          const priceClasses = cn({
            task__price: true,
            "price-work-theme": task.priceWork || false,
            "price-relax-theme": task.priceRelax || false,
          });

          const taskClasses = cn({
            task: true,
            "task-completed": competedTask,
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
                  {!competedTask ? (
                    <div
                      className="icon ready-button"
                      onClick={this.completeTask(task)}
                    ></div>
                  ) : (
                    "Задание выполненно"
                  )}
                </div>
                <div className="items-right">
                  {/* <div className="task__timer">
                    3ч. 56мин
                  <div className="icon time-button"></div> 
                  </div> */}
                  {!competedTask && (
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
