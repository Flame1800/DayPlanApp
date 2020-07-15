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
  const filteredTasks = mappingTasks.filter((task) => task.userId === user.uid);
  return { tasks: filteredTasks, tasksDayFetchingState, user };
};

const actionCreators = {
  removeTask: actions.removeTask,
  completeTask: actions.completeTask,
  calculateMoney: actions.calculateMoney,
  startTask: actions.startTask,
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
    const props = { price, user };
    if (task.priceWork) {
      calculateMoney({ ...props, mode: "delete" });
    }
    if (task.priceRelax) {
      calculateMoney({ ...props, mode: "add" });
    }
  }

  // completeTask = (task) => (e) => {
  //   const { completeTask, calculateMoney, user } = this.props;
  //   completeTask({ task });
  //   let mode = '';

  //   switch (task.mode) {
  //     case 'work': mode = 'add'
  //       break;
  //     case 'relax': mode = 'delete'
  //       break;
  //     default: 
  //   }

  //   calculateMoney({ price: task.pomodors, user, mode: mode });
  // };


  startTask = (task) => (e) => {
    this.props.startTask({ task });
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
          const completedTask = task.state === "active" ? false : true

          const taskClasses = cn({
            task: true,
            "task-completed": completedTask,
          });

          return (
            <div className={taskClasses} key={task.id}>
              <div className="task__up">
                <div className="task__buttons">
                  <div className="icon edit-button"></div>
                  <div
                    className="icon delete-button"
                    onClick={this.handleRemoveTask(task.id)}
                  ></div>
                </div>
                <div className="items-up">
                  <div className="task__text">
                    {task.textWork || task.textRelax}
                  </div>
                </div>

              </div>

              <div className="task__down">
                <div className="items-right">
                  <div className="task__timer">
                    {task.time}

                    <div
                      className="icon ready-button"
                      onClick={this.startTask(task)}
                    ></div>
                  </div>
                  <div className="pomodors">
                    {task.pomodors} <div className='pomodoro-icon'></div>
                  </div>
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
