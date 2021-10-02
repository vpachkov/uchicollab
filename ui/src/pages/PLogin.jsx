import React, { Component } from 'react'
import { User } from "../components/User";
import { Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { Button, ButtonHandler, BigButton, BigButtonWithIcon, InlineBigButtonWithIcon, InlineBigButton, InlineButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faPlus, faArrowAltCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import {authorizationService, Post, profileService} from "../config";
import { withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Select from 'react-select';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";
import Cookies from 'js-cookie'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class PLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incorrectUser: false
        }
    }

    componentDidMount() {
        // this.loadComments()
    }

    submit() {

    }

    render() {
        return (
            <div className="loginPage">
                <Wave className="loginWave" fill='#f4f5f6'
                    paused={false}
                    options={{
                        height: 8,
                        amplitude: 20,
                        speed: 0.10,
                        points: 10
                    }}
                />
                <Col className="zindex1" xs={10} sm={8} md={6} lg={4}>
                    <Block color="white">
                        <BlockTitle color="rgb(69, 68, 79)" text="bold">Войти</BlockTitle>
                        <BlockLine color="rgb(133, 133, 138)">Логин</BlockLine>
                        <input
                            className="inputBox"
                            rows="4"
                            placeholder="Ваш логин"
                            color={ this.state.incorrectUser ? 'red' : 'black' }
                            onChange={ (event) => {
                                this.setState({
                                    login: event.target.value
                                })
                            } }
                        />
                        <BlockLine color="rgb(133, 133, 138)">Пароль</BlockLine>
                        <input
                            className="inputBox"
                            type="password"
                            rows="4"
                            color={ this.state.incorrectUser ? 'red' : 'black' }
                            onChange={ (event) => {
                                this.setState({
                                    password: event.target.value
                                })
                            } }
                        />
                        <BlockLine color="rgb(133, 133, 138)"/>
                        <div style={{ textAlign: "right", marginTop: "16px" }}>
                            <InlineButton onClick={() => {
                                history.push('/register')
                            }} title="Регистрация" />
                            <Button onClick={ () => {
                                console.log("Enter")

                                Cookies.remove('session')
                                Cookies.set('login', this.state.login)
                                Cookies.set('password', this.state.password)

                                axios.post(authorizationService+"authorize", JSON.stringify({
                                    login: this.state.login, password: this.state.password
                                })).then((response)=> {
                                    Cookies.set('session', response.data.session)
                                    history.push('/')
                                }).catch((error) => {
                                    if (error.response !== undefined && error.response.status === 401) {
                                        this.setState({
                                            incorrectUser: true
                                        })
                                    }
                                })
                            }} title="Войти" />
                        </div>
                    </Block>
                </Col>
            </div>
        )
    }

    loadComments() {
        Post(
            profileService + "comments", {
            number: 5
        }, (response) => {
            this.setState({ comments: response.data.comments })
        })
    }
}

export default withCookies(PLogin);