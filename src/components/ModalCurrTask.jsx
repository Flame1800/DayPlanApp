import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import cn from "classnames";


const actionCreators = {
    stopTask: actions.stopTask,
    passPomodor: actions.passPomodor,
};



class ModalCurrTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeLeft: {
                min: 25,
                sec: `00`,
            },
            breakOutTimer: false,
            startTimer: false,
            breaks: 0,
        }
    }

    startTimer = () => {
        this.setState({ startTimer: true });
        this.timer();
    }

    timer = () => {
        let { breakOutTimer, startTimer, breaks } = this.state;


        setTimeout(() => {
            let { min, sec } = this.state.timeLeft;

            min = Number(min);
            sec = Number(sec);

            if (startTimer) {
                if (sec === 0 && min === 0) {
                    this.setState({ breakOutTimer: !breakOutTimer, });
                    const breakOut = breaks === 3 ? 20 : 5;

                    if (breakOutTimer) {
                        this.props.passPomodor();
                        this.setState({ breaks: breakOut === 5 ? breaks + 1 : breaks });
                    }
                    if (breaks === 3) {
                        this.setState({ breaks: 0 });
                    }

                    min = breakOutTimer ? 25 : breakOut;
                }
                if (sec === 0) {
                    min -= 1;
                    sec = 60;
                }

                sec -= 1;
            }

            this.setState({
                timeLeft: {
                    min: min < 10 ? `0${min}` : min,
                    sec: sec < 10 ? `0${sec}` : sec,
                },
            });

            return this.timer();
        }, 1000);
    }

    generatePomodors = (pomodors) => {
        let arr = [];

        for (let i = 1; i < pomodors + 1; i++) {
            arr.push(i)
        }
        return arr;
    }

    stopTask = () => {
        this.props.stopTask();
        this.timer();
        this.setState({
            timeLeft: {
                min: 25,
                sec: 2,
            },
            startTimer: false
        });
    }


    render() {
        const { currentTask } = this.props;
        const { min, sec } = this.state.timeLeft;
        const { breakOutTimer, startTimer } = this.state;

        const content = cn({
            'content': true,
            'breakout-bg': breakOutTimer
        })

        if (currentTask !== null) {
            return (
                <div className="modal-curr-task">
                    <div className="container-task">
                        <div className={content}>
                            <div className="title">{currentTask.textWork || currentTask.textRelax}</div>
                            <div className='info'>
                                Время на выполнение: <span className='inf-span'> {currentTask.time} ч</span> 
                                </div>
                                <div className="pomodors-info">
                                {currentTask.pomodors} <div className='pomodoro-icon'></div>
                                </div>
                            <div className="time-container">
                                <div className="time">{min}:{sec}</div>
                                {breakOutTimer && <div className="break-out-text">Перерыв</div>}
                            </div>
                            <div className='pomodors d-flex'>
                                {
                                    this.generatePomodors(currentTask.pomodors).map(el => {
                                        return <div key={el} className='pomodoro-icon pomodoro-modal'></div>;
                                    })
                                }
                            </div>
                            <div className="btns">
                                {!startTimer && <div className="btn-start" onClick={this.startTimer}>Начать</div>}
                                <div className="btn-stop" onClick={this.stopTask}>Отмена</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;

    }
}
const connectedModalCurrTask = connect(null, actionCreators)(ModalCurrTask);

export default connectedModalCurrTask;
