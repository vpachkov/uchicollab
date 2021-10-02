import React, { Component } from 'react'
import { User } from "../components/User";
import { Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { CustomInputFile, CustomSelect, Button, ButtonHandler, BigButton, BigButtonWithIcon, InlineBigButtonWithIcon, InlineBigButton, InlineButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faPlus, faArrowAltCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import {authorizationService, Post, profileService, uploadStaticData} from "../config";
import { withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Select from 'react-select';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";

import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tags } from "../components/Tags";
import { SubjectColor, Subjects } from "../constants";
import axios from "axios";

class PRegister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedSubjectOption: null,
            subjectInterest: new Set(),
        };
    }

    componentDidMount() {
        // this.loadComments()
    }

    submit() {

    }

    render() {
        const selectedSubjectOption = this.state.selectedSubjectOption;

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
                <Col className="zindex1" xs={10} sm={8} md={6} lg={7}>
                    <Block color="white">
                        <Row>
                            <Col>
                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Регистрация</BlockTitle>
                                <BlockLine color="rgb(133, 133, 138)">Имя*</BlockLine>
                                <input
                                    className="inputBox"
                                    rows="4"
                                    placeholder="Придумайте имя"
                                    required
                                    onChange={ (event) => {
                                        this.setState({
                                            name: event.target.value
                                        })
                                    } }
                                />
                                <BlockLine color="rgb(133, 133, 138)">Логин*</BlockLine>
                                <input
                                    className="inputBox"
                                    rows="4"
                                    placeholder="Придумайте логин"
                                    required
                                    onChange={ (event) => {
                                        this.setState({
                                            login: event.target.value
                                        })
                                    } }
                                />
                                <BlockLine color="rgb(133, 133, 138)">Пароль*</BlockLine>
                                <input
                                    className="inputBox"
                                    type="password"
                                    rows="4"
                                    placeholder="Придумайте пароль"
                                    onChange={ (event) => {
                                        this.setState({
                                            password: event.target.value
                                        })
                                    } }
                                />
                                <BlockLine color="rgb(133, 133, 138)">Повторить пароль*</BlockLine>
                                <input
                                    className="inputBox"
                                    type="password"
                                    rows="4"
                                    placeholder=""
                                    onChange={ (event) => {
                                        this.setState({
                                            passwordRepeat: event.target.value
                                        })
                                    } }
                                />
                                <BlockLine color="rgb(133, 133, 138)">Загрузите аватар*</BlockLine>
                                <CustomInputFile
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/png, image/jpeg"
                                    onChange={ (event) => {
                                        this.setState({
                                            avatar: event.target.files[0]
                                        })
                                    } }
                                />
                                <BlockLine color="rgb(133, 133, 138)"/>
                            </Col>
                            <Col>
                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Мой профиль</BlockTitle>
                                <BlockLine color="rgb(133, 133, 138)">Место обучение</BlockLine>
                                <input
                                    className="inputBox"
                                    rows="4"
                                    placeholder="Например, Школа 1034"
                                    onChange={ (event) => {
                                        this.setState({
                                            school: event.target.value
                                        })
                                    } }
                                />
                                <BlockLine color="rgb(133, 133, 138)">Обо мне</BlockLine>
                                <textarea
                                    className="textBox"
                                    rows="3"
                                    placeholder="Я..."
                                    onChange={ (event) => {
                                        this.setState({
                                            about: event.target.value
                                        })
                                    } }
                                />
                                <BlockLine color="rgb(133, 133, 138)">Профиль</BlockLine>
                                <CustomSelect
                                    value={selectedSubjectOption}
                                    onChange={(selectedOption) => {
                                        const tags = this.state.subjectInterest
                                        tags.add(selectedOption.label)
                                        this.setState({ subjectInterest: tags })
                                    }}
                                    options={Subjects}
                                    placeholder="Выберите предмет"
                                />
                                <AbstractBlock color="white">
                                    {
                                        this.state.subjectInterest === undefined ? null :
                                            [...this.state.subjectInterest].map(tag => {
                                                return (
                                                    <KeywordBlock subject={tag}>
                                                        <span style={{ marginRight: "4px" }}>{tag}</span>
                                                        <FontAwesomeIcon
                                                            icon={faTimes}
                                                            style={{ fontSize: ".8em" }}
                                                            onClick={() => {
                                                                const tags = this.state.subjectInterest
                                                                tags.delete(tag)
                                                                this.setState({ subjectInterest: tags })
                                                            }}
                                                        />
                                                    </KeywordBlock>
                                                )
                                            })
                                    }
                                </AbstractBlock>
                                <div style={{ textAlign: "right", marginTop: "16px" }}>
                                    <InlineButton onClick={() => {
                                        history.push('/login')
                                    }} title="Вход" />
                                    <Button onClick={() => {
                                        if (this.state.password !== this.state.passwordRepeat) {
                                            return
                                        }

                                        Cookies.remove('session')
                                        Cookies.remove('login')
                                        Cookies.remove('password')

                                        axios.post(profileService+"register", JSON.stringify({
                                            name: this.state.name,
                                            login: this.state.login,
                                            password: this.state.password,
                                            school: this.state.school,
                                            about: this.state.about,
                                            subjects: [...this.state.subjectInterest],
                                        })).then(() => {
                                            Cookies.set('login', this.state.login)
                                            Cookies.set('password', this.state.password)

                                            const formData = new FormData();
                                            formData.append(
                                                'avatar',
                                                this.state.avatar,
                                                this.state.avatar.name,
                                            )

                                            formData.append(
                                                'login',
                                                this.state.login,
                                            )

                                            axios.post(uploadStaticData, formData,{
                                                headers: {
                                                    'Content-Type': 'multipart/form-data'
                                                }
                                            }).then(() => {
                                                history.push('/')
                                            })


                                        }).catch((error) => {
                                            if (error.response !== undefined && error.response.status === 401) {
                                                this.setState({
                                                    incorrectUser: true
                                                })
                                            }
                                        })
                                    }} title="Регистрация" />
                                </div>
                            </Col>
                        </Row>
                    </Block>
                </Col>
            </div >
        )
    }
}

export default withCookies(PRegister);