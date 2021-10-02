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
import { faArrowAltCircleLeft, faCoins, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService, questionsService, staticData } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Select from 'react-select';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";
import { Header, Navigation } from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tags } from "../components/Tags";
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
        this.getInfo()
    }

    submit() {

    }

    renderTextInput() {
        const selectedSubjectOption = this.state.selectedSubjectOption;

        return (
            <div>
                <CustomSelect
                    value={selectedSubjectOption}
                    onChange={(selectedOption) => {
                        this.setState({
                            selectedSubjectOption: selectedOption,
                        });
                    }}
                    options={Subjects}
                    placeholder="Выберите предмет"
                />
                <Tags
                    onChange={(tags) => {
                        this.setState({ tags: tags })
                    }}
                />
                <BlockLine color="rgb(133, 133, 138)">Заголовок</BlockLine>
                <input className="inputBox" rows="4" placeholder="Опшите вопрос максимально кратко" maxLength={60}></input>
                <BlockLine color="rgb(133, 133, 138)">Вопрос</BlockLine>
                <textarea className="textBox" rows="4" placeholder="Название"></textarea>
                <BlockLine color="rgb(133, 133, 138)">Стоимость</BlockLine>
                <input className="inputBox" type="number" rows="4" placeholder="Стоимость" min={0} max={this.state.user.coins}></input>
                <BlockLine color="rgb(133, 133, 138)">Выполнить до</BlockLine>
                <input className="inputBox" type="date" rows="4"></input>
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <Button title="Проверьте Ваш вопрос" />
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
                            }} icon={faArrowAltCircleLeft} title="Назад" />
                        </Navigation>
                        <Row>
                            <Col xs={12} md={4}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Сформулируйте вопрос</BlockTitle>
                                    {this.renderTextInput()}
                                </Block>
                            </Col>
                            <Col xs={12} md={8}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Похожие вопросы</BlockTitle>
                                    <BriefQuestion question={this.state.question} />
                                </Block>
                            </Col>
                        </Row>
                    </main>
                </Container>
            </div>
        )
    }

    getInfo() {
        Post(profileService + "userinfo", {}, (response) => {
            this.setState(prevState => ({
                user: {
                    ...prevState.user,
                    name: response.data.name,
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