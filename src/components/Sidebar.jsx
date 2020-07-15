import React, { Component } from 'react';

export default class Sidebar extends Component {
    render() {
        return (
            <div className='todo__sidebar'>
                
                <div className="todo__sidebar_list">
                    <div className="todo__sidebar_list_item active">Планы на день</div>
                    <div className="todo__sidebar_list_item">Планы на неделю</div>
                    <div className="todo__sidebar_list_item">Проекты</div>
                    <div className="todo__sidebar_list_item">Статистика</div>
                </div>
            </div>
        )
    }
}