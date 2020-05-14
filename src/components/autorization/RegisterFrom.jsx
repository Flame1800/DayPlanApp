import React, { Component } from 'react'
import { Field } from "redux-form";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import * as actions from "../../actions/index.js";

const mapStateToProps = (state) => {
    const { setUserState } = state;
    return { setUserState };
};

const actionCreators = {
    addUser: actions.addUser,
    loginUser: actions.loginUser,
    fetchTasks: actions.fetchTasks,
    addTask: actions.addTask,
    setUserEmptyState: actions.setUserEmptyState
};

export class RegisterFrom extends Component {
    constructor(props) {
        super(props);
        this.state = { passwordErr: '', fromMode: 'register' };
    }

    changeFormMode = (mode) => () => {
        this.setState({ fromMode: mode })
        this.props.setUserEmptyState();
    }

    handleSubmitRegister = (values) => {
        if (values.password !== values.confirmPassword) {
            this.setState({ passwordErr: 'Пароли не совпадают!' })
        }
        else {
            this.setState({ passwordErr: '' })
            this.props.addUser({ user: values });
            this.props.fetchTasks();
        }
    }

    handleSubmitLogin = (values) => {
        this.props.loginUser({ user: values });
        this.props.fetchTasks();
    }

    render() {
        const { handleSubmit, setUserState } = this.props;

        const registerFrom = (<form className="autorization-card" onSubmit={handleSubmit(this.handleSubmitRegister)}>
            <div className="title">Регистрация</div>
            <Field className="field" name="name" reqiued="true" type="text" component='input' placeholder="Имя" />
            <Field className="field" name="email" type="email" reqiued="true" component='input' placeholder="E-mail" />
            <Field className="field" name="password" type='password' reqiued="true" component='input' placeholder="Пароль" />
            <Field className="field" name="confirmPassword" type="password" reqiued="true" component='input' placeholder="Потвердите пароль" />
            <input type="submit" className="button-confirm" value={setUserState === 'requested' ? 'Загрузка...' : 'Продолжить'} />
            <div className="password-error">{this.state.passwordErr}</div>
            {setUserState === 'failed' && <div className="email-error">Этот email уже используеться <br /> другим пользователем</div>}
            <div className="toggle-form" onClick={this.changeFormMode('login')}>Уже зарегистрированны?</div>
        </form>)

        const loginFrom = (<form className="autorization-card" onSubmit={handleSubmit(this.handleSubmitLogin)}>
            <div className="title">Войти</div>
            <Field className="field" name="email" type="email" reqiued="true" component='input' placeholder="E-mail" />
            <Field className="field" name="password" type='password' reqiued="true" component='input' placeholder="Пароль" />
            <input type="submit" className="button-confirm" value={setUserState === 'requested' ? 'Загрузка...' : 'Продолжить'} />
            <div className="password-error">{this.state.passwordErr}</div>
            {setUserState === 'failed' && <div className="email-error">Не верный email или Пароль</div>}
            <div className="toggle-form" onClick={this.changeFormMode('register')}>Зарегистрироваться</div>
        </form>)
        return (
            this.state.fromMode === 'register' ? registerFrom : loginFrom
        )
    }
}


const conntectedRegisterForm = connect(mapStateToProps, actionCreators)(RegisterFrom)
export default reduxForm({ form: "NewUser" })(conntectedRegisterForm);