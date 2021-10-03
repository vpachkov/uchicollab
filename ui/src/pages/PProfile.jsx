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
    Span,
    SquareBlock,
    SquareBlockImage,
    SquareBlockText
} from "../components/Blocks";
import { BriefAnswer, BriefQuestion } from "../components/Questions";
import { Header, Navigation, ProfileHeader } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { SubjectColor } from "../constants";
import { BigButtonWithIcon, InlineBigButton, ButtonHandler } from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faClock, faCoins, faComment, faChartLine, faFire, faHeart, faPlus, faQuestion, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService, questionsService, staticData } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import history from "../history";

class PProfile extends Component {
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

            userinfo: {
                aboutUser: "Russ Cox was raised by a pack of crazed hillbillies in the backwoods of Tennessee. With the bulk of his life spent in Pennsylvania, he met his wife; became a graphic designer; played in punk, alternative.",
                education: "MIT",
            },
        }
    }

    componentDidMount() {
        this.getInfo()
        this.loadPublicUserInfo()
        this.loadPopularAnswers()
        this.loadPopularQuestions()
    }

    isUserProfile = () => {
        if (this.state.user === undefined) {
            return false
        }

        return true
    }

    renderSubscribedTags = () => {
        if (this.state.profileUser === undefined) {
            return null
        }

        return (
            <div>
                {
                    this.state.profileUser.subjects === undefined || this.state.profileUser.subjects === null ? null :
                        this.state.profileUser.subjects.map(subject => {
                            return (
                                <KeywordBlock subject={subject}><span>{subject}</span></KeywordBlock>
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
        console.log(this.state.user, this.state.profileUser)
        if (this.state.user === undefined || this.state.profileUser === undefined) {
            return null
        }
        return (
            <div>
                <ProfileHeader prefix="Пользователь" profileUser={this.state.profileUser} user={this.state.user} />
                <Container>
                    <main>
                        <Navigation />
                        <Row>
                            <Col sm={12} sm={12}>
                                <Block color="white">
                                    <Row>
                                        <Col xs={12} lg={6}>
                                            <AbstractBlock color="white">
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Учебное заведение</BlockTitle>
                                                <AbstractBlock color="white">
                                                    <KeywordBlock><span>{this.state.profileUser.school}</span></KeywordBlock>
                                                </AbstractBlock>
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Любимые предметы</BlockTitle>
                                                <AbstractBlock color="white">
                                                    {this.renderSubscribedTags()}
                                                </AbstractBlock>
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">О себе</BlockTitle>
                                                <AbstractBlock color="white">
                                                    {this.state.profileUser.about}
                                                </AbstractBlock>
                                            </AbstractBlock>
                                        </Col>
                                        <Col xs={12} lg={6}>
                                            <AbstractBlock color="white">
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Активность</BlockTitle>
                                                <AbstractBetweenSpacingBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(220, 222, 242)"><FontAwesomeIcon
                                                            color="rgb(74, 89, 183)"
                                                            icon={faChartLine} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)"><span style={{ color: "rgb(69, 68, 79)" }}>{this.state.profileUser.rating}</span> Очков рейтинга</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(244, 222, 250)"><FontAwesomeIcon
                                                            color="rgb(213, 98, 234)"
                                                            icon={faCoins} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)"><span style={{ color: "rgb(69, 68, 79)" }}>{this.state.profileUser.likes}</span> Монет заработано</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(211, 239, 229)"><FontAwesomeIcon
                                                            color="rgb(105, 193, 153)"
                                                            icon={faComment} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)"><span style={{ color: "rgb(69, 68, 79)" }}>{this.state.profileUser.answers}</span> Всего ответов</SquareBlockText></SquareBlock>
                                                </AbstractBetweenSpacingBlock>
                                            </AbstractBlock>
                                        </Col>
                                    </Row>
                                </Block>
                            </Col>
                            <Col sm={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Популярные вопросы</BlockTitle>
                                    {
                                        this.state.popularQuestions === undefined || this.state.popularQuestions === null ? null :
                                            this.state.popularQuestions.map(question => {
                                                return (
                                                    <div style={{ marginBottom: "8px" }}> <BriefQuestion question={question} /></div>
                                                )
                                            })
                                    }
                                </Block>
                            </Col>
                            <Col sm={12} md={6}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Популярные ответы</BlockTitle>
                                    {
                                        this.state.popularAnswers === undefined || this.state.popularAnswers === null ? null :
                                            this.state.popularAnswers.map(answer => {
                                                return (
                                                    <div style={{ marginBottom: "8px" }}> <BriefAnswer answer={answer} /></div>
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

    loadPopularQuestions() {
        Post(questionsService + "popularquestions", {
            login: this.props.match.params.login,
        }, (response) => {
            this.setState({
                popularQuestions: response.data.questions,
            })
        })
    }

    loadPopularAnswers() {
        Post(questionsService + "popularanswers", {
            login: this.props.match.params.login,
        }, (response) => {
            this.setState({
                popularAnswers: response.data.answers,
            })
        })
    }

    loadPublicUserInfo() {
        Post(profileService + "publicuserinfo", {
            login: this.props.match.params.login
        }, (response) => {
            this.setState({
                profileUser: response.data
            })
        })
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
}

export default withCookies(PProfile);