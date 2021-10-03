import React, { Component } from 'react'
import { User } from "../components/User";
import { HeaderSquareBlock, AuthorBlock, Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { CustomSelect, Button, ButtonHandler, BigButton, BigButtonWithIcon, InlineBigButtonWithIcon, InlineBigButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable, BriefQuestion } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import Wave from 'react-wavify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faArrowLeft, faCoins, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService, questionsService, staticData } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Select from 'react-select';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";
import { Header, Navigation } from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddableTags, Tags } from "../components/Tags";
import { SubjectColor, Subjects } from "../constants";

class PCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maincolor: "#551a8b",
            selectedSubjectOption: null,

            user: {
                name: "Russ Cox",
                profilePic: undefined,
                coins: 0,
                questions: 0,
                likesRecieved: 0,
                answers: 0,
                bestAnswersRate: 0,
                subscribedTages: ["Math", "Russian"],
            },

            question: {
                id: 0,
                title: "Uncaught (in promise): FirebaseError",
                subject: "Алгебра",
                description: "I'm getting the error below. My problem is NOT with the actual error but the fact that it is saying that the error was Uncaught. If you take a look at my auth.service.ts and sign-in.component.ts files I am catching the error. I'm getting the error below. My problem is NOT with the actual error but the fact that it is saying that the error was Uncaught. If you take a look at my auth.service.ts and sign-in.component.ts files I am catching the error.",
                tags: ["Book", "School program"],
                date: "28 may 2020",
                until: "28-10-2021",
                cost: 335,

                author: "Russ Cox",
                authorid: 0,
                profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
            },
        };
    }

    componentDidMount() {
        this.fillFinalDate()
        this.getInfo()
        this.loadBriefQuestions()
    }

    fillFinalDate() {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 3)
        tomorrow.setHours(12)
        tomorrow.setMilliseconds(0)
        tomorrow.setSeconds(0)
        tomorrow.setMinutes(0)
        document.getElementById('dateInput').value = tomorrow.toISOString().slice(0, -13) + "12:00:00.000"
        this.setState({
            deadline: + tomorrow
        })
    }

    submit() {

    }

    renderTextInput() {
        var tinycolor = require("tinycolor2");
        const selectedSubjectOption = this.state.selectedSubjectOption;

        return (
            <div>
                <CustomSelect
                    value={selectedSubjectOption}
                    onChange={(selectedOption) => {
                        this.setState({
                            selectedSubjectOption: selectedOption,
                        }, this.loadBriefQuestions);
                    }}
                    options={Subjects}
                    placeholder="Выберите предмет"
                />
                <AddableTags
                    onChange={(tags) => {
                        this.setState({ tags: tags })
                    }}
                />
                <BlockLine color="rgb(133, 133, 138)">Заголовок</BlockLine>
                <input
                    className="inputBox"
                    rows="4"
                    placeholder="Кратко опишите вопрос..."
                    maxLength={60}
                    onChange={(event) => {
                        this.setState({
                            title: event.target.value
                        })
                    }}
                />
                <BlockLine color="rgb(133, 133, 138)">Вопрос</BlockLine>
                <textarea
                    className="textBox"
                    placeholder="Сформулируйте свой вопрос..."
                    onChange={(event) => {
                        this.setState({
                            text: event.target.value
                        }, this.loadBriefQuestions)
                    }}
                />
                <BlockLine color="rgb(133, 133, 138)">Вознагрждение</BlockLine>
                <input
                    className="inputBox"
                    type="number"
                    placeholder="Введите сумму, которое получит эксперт за лучший ответ"
                    min={0}
                    max={this.state.user.coins}
                    onChange={(event) => {
                        this.setState({
                            cost: parseInt(event.target.value)
                        })
                    }}
                />
                <BlockLine color="rgb(133, 133, 138)">Выполнить до</BlockLine>
                <input
                    id="dateInput"
                    className="inputBox"
                    type="datetime-local"
                    onChange={(event) => {
                        this.setState({
                            deadline: + new Date(event.target.value)
                        })
                    }}
                />
                <BlockLine color={tinycolor("#ffe2e1").darken(50).toString()}>{this.state.errorMsg}</BlockLine>
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <Button
                        title="Создать"
                        onClick={() => {
                            var today = new Date();
                            if (this.state.selectedSubjectOption === undefined || this.state.selectedSubjectOption === null) {
                                this.setState({
                                    errorMsg: "Не выбран предмет"
                                })
                                return
                            }
                            if (this.state.title === undefined || this.state.title === null || this.state.title == "") {
                                this.setState({
                                    errorMsg: "Пустой заголовок"
                                })
                                return
                            }
                            if (this.state.text === undefined || this.state.text === null ||  this.state.text == "") {
                                this.setState({
                                    errorMsg: "Пустое поле текста"
                                })
                                return
                            }
                            if (this.state.cost === undefined || this.state.cost === null ||  this.state.cost <= 0) {
                                this.setState({
                                    errorMsg: "Не указана стоимость"
                                })
                                return
                            }
                            if (this.state.cost > this.state.user.coins) {
                                this.setState({
                                    errorMsg: "Стоимость вопроса превышает Ваш бюджет"
                                })
                                return
                            }
                            if (this.state.deadline === undefined || this.state.deadline === null || this.state.deadline <= today) {
                                this.setState({
                                    errorMsg: "Указана прошедшая дата"
                                })
                                return
                            }


                            console.log(this.state.deadline)
                            Post(questionsService + "create", {
                                title: this.state.title,
                                text: this.state.text,
                                cost: this.state.cost,
                                deadline: this.state.deadline,
                                subject: this.state.selectedSubjectOption.label,
                                tags: this.state.tags,
                            }, (response) => {
                                history.push(`question/${response.data.id}`)
                            })
                        }}
                    />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header prefix="Создай вопрос," user={this.state.user} />
                <Container>
                    <main>
                        <Navigation>
                            <InlineBigButtonWithIcon onClick={() => {
                                history.goBack()
                            }} icon={faArrowLeft} title="Назад" />
                        </Navigation>
                        <Row>
                            <Col xs={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Сформулируйте вопрос</BlockTitle>
                                    {this.renderTextInput()}
                                </Block>
                            </Col>
                            <Col xs={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Похожие вопросы</BlockTitle>
                                    {
                                        this.state.questions === undefined || this.state.questions === null ? <BlockLine>Начните состовлять вопрос и система подберет наиболее похожие</BlockLine> :
                                            this.state.questions.map(question => {
                                                return (
                                                    <div style={{ marginBottom: "8px" }}> <BriefQuestion question={question} /></div>
                                                )
                                            })
                                    }
                                </Block>
                            </Col>
                        </Row>
                    </main>
                </Container>
            </div>
        )
    }

    loadBriefQuestions() {
        Post(
            questionsService + "briefquestions",
            {
                subject: this.state.selectedSubjectOption ? this.state.selectedSubjectOption.label : undefined,
                text: this.state.text !== undefined ? this.state.text : "",
            },
            (response) => {
                this.setState({
                    questions: response.data.questions
                })
            }
        )
    }

    getInfo() {
        Post(profileService + "userinfo", {}, (response) => {
            this.setState(prevState => ({
                user: {
                    ...prevState.user,
                    name: response.data.name,
                    login: response.data.login,
                    profilePic: staticData + response.data.imagepath,
                }
            }))
        })

        Post(profileService + "usercoins", {}, (response) => {
            this.setState(prevState => ({
                user: {
                    ...prevState.user,
                    coins: response.data.coin,
                }
            }))
        })
    }
}

export default withCookies(PCreate);