import React, { Component } from 'react';
import RegisterForm from "./autorization/RegisterFrom.jsx";

export default class LandingPart extends Component {
    render() {
        return (
            <div className="landing">
                <div className="card">
                    <div className="card-title">Day Planer</div>
                    <div className="card-subtitle">Пусть ваш день будет продуктивным </div>
                    <div className="card-messages">
                        <div className="card-message left">
                            <div className="text">
                                Планируте свою работу
                                и отдых сбалансированно
                            </div>
                            <div className="timer">
                                <div className="time">0ч. 55мин</div>
                            </div>
                        </div>
                        {/* <div className="card-message right">
                            <div className="text">
                                Получайте монеты за выполненые
                                задачи и покупайте свои же задачи
                                для отдыха
                            </div>
                            <div className="timer">
                                <div className="time">3ч. 20мин</div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <RegisterForm />
            </div>
        )
    }
}
