import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'



import AuthButton from '../../elements/AuthButton'
import facebookLogo from '../../assets/imgs/facebook-icon.svg'
import googleLogo from '../../assets/imgs/google-icon.svg'
import refreshIcon from '../../assets/imgs/refresh-icon.svg'

import { loginUser } from '../../reducers/user'


const Form = styled.form`
    max-width: 100%;
    width: 400px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 30px;

    div.forgotPass {
        font-size: .8em;
        display: flex;
        justify-content: flex-end;
        align-content: center;
        margin: 7px;
        cursor: pointer;

        img {
            width: 12px;
            margin-left: 4px;
        }
    }

    div.createAcc {
        font-size: .8em;
        margin-top: 4px;
        cursor: pointer;
    }
`

const Input = styled.input`
    font-size: inherit;
    border: none;
    padding: 10px 20px;
    margin: 5px 0;
    border-radius: 8px;
    font-family: inherit;
`

const AuthSocial = styled(AuthButton)`
    padding: 3px 5px;
    border-radius: 8px;

    img {
        width: 30px;
    }

    div {
        margin: auto;
        position: relative;
        left: -13.5px;
    }

`

const Agreement = styled.p`
    font-family: 'Arial', sans-serif;
    font-size: .8em;
    text-align: center;
    margin-top: 20px;
`

const Divider = styled.div`
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;

    div {
        margin: 0 20px;
    }

    &::before, &::after {
        
        width: 100%;
        content: '';
        font-weight: normal;
        display: flex;
        height: 1px;
        background-color: white;
    }
`

const LoginForm = (props) => {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()

        if(username !== '' && password !== '') {

            let loginUser = {
                username,
                password
            }

            props.loginUser(loginUser)
            props.history.push('/main/my-polls')


        } else {
          alert('Don\'t leave fields empty')
        }
    }


    return (
        <main>
            <Form onSubmit={handleLogin}>
                
                {props.user ? <Redirect to="/main/my-polls"/> : null}

                <Input value={username} onChange={(e) => setUsername(e.target.value)} aria-label="Никнэйм" type="text" autoComplete="username" placeholder="Никнэйм"/>
                <Input value={password}  onChange={(e) => setPassword(e.target.value)} aria-label="Пароль" type="password" autoComplete="current-password" placeholder="Пароль"/>
                <div className="forgotPass">Забыли пароль? <img src={refreshIcon} alt=""/></div>
                <AuthButton red type="submit">Войти</AuthButton>
                <div className="createAcc"><Link to="/registration">Создать аккаунт</Link></div>
                <Divider><div>OR</div></Divider>
                <AuthSocial blue><img src={facebookLogo} alt="facebook logo"/><div>Войти через Facebook</div></AuthSocial>
                <AuthSocial red><img src={googleLogo} alt="google logo"/><div>Войти через Google</div></AuthSocial>

                <Agreement>Продолжая, вы соглашаетесь с <b>Условиями<br/> использования</b> и Политикой <br/> конфиденциальности Survey App</Agreement>

            </Form>
        </main>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, {loginUser})(LoginForm))