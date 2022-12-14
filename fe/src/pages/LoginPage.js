import React, {Component} from 'react';
import Input from "../components/Input";
import {withTranslation} from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {withApiProgress} from "../shared/ApiProgress";
import {connect} from 'react-redux';
import {loginHandler} from "../redux/authActions";

class LoginPage extends Component {

    state = {
        username: null,
        password: null,
        error: null
    }
    onChangeInput = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value, error: null
        });
    }

    onClickLogin = async event => {
        event.preventDefault();
        const {username, password} = this.state;
        const creds = {
            username, password
        };

        const {history, dispatch} = this.props;
        const {push} = history;

        this.setState({
            error: null
        });
        try {
            await dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            });
        }
    };

    render() {
        const {t, pendingApiCall} = this.props;
        const {username, password, error} = this.state;
        const buttonDisabled = !(username && password);
        return (<div className={"container"}>
            <form>
                <div>
                    <h1 className={'d-inline-flex'}>{t('Login')}</h1>
                </div>
                <Input
                    id={'login_username'}
                    label={t('Username')}
                    type={'text'}
                    name={'username'}
                    placeholder={t('Username')}
                    onchange={this.onChangeInput}
                ></Input>
                <Input
                    id={'login_password'}
                    label={t('Password')}
                    type={'password'}
                    name={'password'}
                    placeholder={t('Password')}
                    onchange={this.onChangeInput}
                ></Input>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className={'text-center'}>
                    <ButtonWithProgress
                        onClick={this.onClickLogin}
                        pendingApiCall={pendingApiCall}
                        disabled={buttonDisabled || pendingApiCall}
                        text={t('Login')}/>
                </div>
            </form>
        </div>);
    }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);

export default connect()(withApiProgress(LoginPageWithTranslation, '/api/1.0/auth'));