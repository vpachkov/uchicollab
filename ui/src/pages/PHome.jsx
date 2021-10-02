import React, { Component } from 'react'
import { User } from "../components/User";
import {
    AbstractBetweenSpacingBlock,
    AbstractBlock,
    Block,
    BlockLine,
    BlockSpacing,
    BlockTitle,
    CommentBlock,
    CommentText,
    KeywordBlock,
    SquareBlock,
    SquareBlockImage,
    SquareBlockText,
} from "../components/Blocks";
import { Notification, BriefQuestion } from "../components/Questions";
import { Header, Navigation } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { SubjectColor } from "../constants";
import { BigButtonWithIcon, InlineBigButton, ButtonHandler } from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faChartLine, faClock, faCoins, faComment, faFire, faHeart, faPlus, faQuestion, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import {Post, profileService, staticData, notificationService, questionsService} from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import history from "../history";

class PHome extends Component {
    renderProgress = [
        {
            "name": "Математика",
            "percentage": 66,
            "color": SubjectColor.algebra,
        },
        {
            "name": "Русский Язык",
            "percentage": 32,
            "color": SubjectColor.russian,
        },
        {
            "name": "Информатика",
            "percentage": 32,
            "color": SubjectColor.informatics,
        }
    ]
    review = "Russ Cox was raised by a pack of crazed hillbillies in the backwoods of Tennessee. With the bulk of his life spent in Pennsylvania, he met his wife; became a graphic designer; played in punk, alternative "

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "Russ Cox",
                profilePic: undefined,
                coins: 0,
                questions: 0,
                likesRecieved: 0,
                answers: 0,
                bestAnswers: 0,
                subscribedTages: ["Math", "Russian"],
            },

            notifications: [
                {
                    title: "Создан чат",
                    description: "Пользователь Russ Cox создал чат по вопросу №6",
                    action: "/question/6/chat/23424"
                }
            ]
        }
    }

    componentDidMount() {
        this.getInfo()
        this.getRaiting()
        this.getNotifications()
        this.loadPopularQuestions()
        this.loadRecommendations()
    }

    renderSubscribedTags = () => {
        if (this.state.user === undefined) {
            return null
        }

        return (
            <div>
                {
                    this.state.user.subscribedTages === undefined ? null :
                        this.state.user.subscribedTages.map(tag => {
                            return (
                                <KeywordBlock><span>{tag}</span></KeywordBlock>
                            )
                        })
                }
            </div>
        )
    }

    recalcRaiting = (allAnswers, bestAnswers) => {
        if (allAnswers == 0) {
            return 0
        }
        return bestAnswers * 10 + (allAnswers / 4)
    }

    render() {
        if (this.state.user === undefined) {
            return null
        }
        return (
            <div>
                <Header prefix="Привет," user={this.state.user} />
                <Container>
                    <main>
                        <Navigation>
                            <BigButtonWithIcon onClick={() => {
                                history.push('/create')
                            }} backgroundColor="#ddd6f3" icon={faPlus} title="новый вопрос" />
                        </Navigation>
                        <Row>
                            <Col sm={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Популярные вопросы</BlockTitle>
                                    {
                                        this.state.popularQuestions === undefined || this.state.popularQuestions === null ? null :
                                            this.state.popularQuestions.map(question => {
                                                return (
                                                    <BriefQuestion question={question} />
                                                )
                                            })
                                    }
                                </Block>
                            </Col>
                            <Col sm={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Рекомендованные вопросы</BlockTitle>
                                    {
                                        this.state.recommendationsQuestions === undefined || this.state.recommendationsQuestions === null ? null :
                                            this.state.recommendationsQuestions.map(question => {
                                                return (
                                                    <BriefQuestion question={question} />
                                                )
                                            })
                                    }
                                </Block>
                            </Col>
                            <Col sm={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Уведомления</BlockTitle>
                                    {
                                        this.state.notifications === undefined || this.state.notifications === null ? null :
                                            this.state.notifications.map(notification => {
                                                return (
                                                    <Notification notification={notification} />
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

    loadRecommendations() {
        Post(questionsService + "recommendations", {}, (response) => {
            this.setState({
                recommendationsQuestions: response.data.questions
            })
        })
    }

    loadPopularQuestions() {
        Post(questionsService + "popular", {}, (response) => {
            this.setState({
                popularQuestions: response.data.questions
            })
        })
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

    getRaiting() {
        Post(profileService + "userraiting", {}, (response) => {
            this.setState(prevState => ({
                user: {
                    ...prevState.user,
                    answers: response.data.answers,
                    bestAnswers: response.data.bestAnswers,
                }
            }))
        })
    }

    getNotifications() {
        Post(
            notificationService + "list", {
            number: 4
        }, (response) => {
            console.log(response.data.list)
            this.setState({ notifications: response.data.list })
        })
    }
}

export default withCookies(PHome);