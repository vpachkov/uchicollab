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
import { Post, profileService, staticData, notificationService } from "../config";
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

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

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
        this.loadComments()
        this.getNotifications()
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
                            <Col sm={12} sm={12}>
                                <Block color="white">
                                    <Row>
                                        <Col xs={12} lg={6}>
                                            <AbstractBlock color="white">
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Текущая
                                                    задача</BlockTitle>
                                                <ProgressBar content={this.renderProgress} />
                                                <BlockSpacing size="20px" />
                                                <BlockLine color="rgb(133, 133, 138)"><FontAwesomeIcon
                                                    color="rgb(133, 133, 138)" icon={faStar} /> Ты работаешь отлично!
                                                    Продолжай в том же духе!</BlockLine>
                                                <BlockLine color="rgb(133, 133, 138)"><FontAwesomeIcon
                                                    color="rgb(133, 133, 138)" icon={faClock} /> 6 дней</BlockLine>
                                                <BlockLine color="rgb(133, 133, 138)"><FontAwesomeIcon
                                                    color="rgb(133, 133, 138)" icon={faCoins} /> 20</BlockLine>
                                            </AbstractBlock>
                                        </Col>
                                        <Col xs={12} lg={6}>
                                            <AbstractBlock color="white">
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Рейтинг</BlockTitle>
                                                <AbstractBetweenSpacingBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(220, 222, 242)"><FontAwesomeIcon
                                                            color="rgb(74, 89, 183)"
                                                            icon={faChartLine} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)">{this.recalcRaiting(this.state.user.answers, this.state.user.bestAnswers)}</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(244, 222, 250)"><FontAwesomeIcon
                                                            color="rgb(213, 98, 234)"
                                                            icon={faFire} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)">{this.state.user.bestAnswers / this.state.user.answers}%</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(211, 239, 229)"><FontAwesomeIcon
                                                            color="rgb(105, 193, 153)"
                                                            icon={faComment} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)">{this.state.user.answers}</SquareBlockText></SquareBlock>
                                                </AbstractBetweenSpacingBlock>
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Популярные
                                                    темы</BlockTitle>
                                                <AbstractBlock color="white">
                                                    {this.renderSubscribedTags()}
                                                </AbstractBlock>
                                            </AbstractBlock>
                                        </Col>
                                    </Row>
                                </Block>
                            </Col>
                            <Col sm={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Популярные вопросы</BlockTitle>
                                    {
                                        this.state.newQuestions === undefined || this.state.newQuestions === null ? null :
                                            this.state.newQuestions.map(question => {
                                                return (
                                                    <BriefQuestion question={question} />
                                                )
                                            })
                                    }
                                </Block>
                            </Col>
                            <Col sm={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Новые вопросы</BlockTitle>
                                    {
                                        this.state.yourQuestions === undefined || this.state.yourQuestions === null ? null :
                                            this.state.yourQuestions.map(question => {
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
                            <Col sm={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Последние отзывы</BlockTitle>
                                    {
                                        this.state.comments === undefined || this.state.comments === null ? null :
                                            this.state.comments.map(comment => {
                                                return (
                                                    <CommentBlock textColor="rgb(69, 68, 79)"
                                                        raiting={comment.score}
                                                        user={{
                                                            name: comment.name,
                                                            profilePic: staticData + comment.imagepath
                                                        }}>
                                                        <CommentText text={comment.text} max={60} />
                                                    </CommentBlock>
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

    loadComments() {
        Post(
            profileService + "comments", {
            number: 5
        }, (response) => {
            this.setState({ comments: response.data.comments })
        })
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