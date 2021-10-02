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
import { InlineBigButtonWithIcon, InlineBigButton, ButtonHandler } from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faChartLine, faClock, faCoins, faComment, faFire, faHeart, faPlus, faQuestion, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService, staticData, notificationService } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import history from "../history";
import { ProfileLogo } from '../components/ProfileLogo';
import '../css/Main.css';

class PRaiting extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "",
                profilePic: undefined,
                coins: 0,
                questions: 0,
                likesRecieved: 0,
                answers: 0,
                bestAnswers: 0,
                subscribedTages: [],
            },
        }
    }

    componentDidMount() {
        this.getInfo()
        this.getRaiting()
        this.loadComments()
        this.getRaitings()
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
                <Header prefix="Вот рейтинг," user={this.state.user} />
                <Container>
                    <main>
                        <Navigation>
                            <InlineBigButtonWithIcon onClick={() => {
                                history.goBack()
                            }} icon={faArrowLeft} title="Назад" />
                        </Navigation>
                        <Row>
                            <Col sm={12} md={4}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">О рейтинге</BlockTitle>
                                    <BlockLine>Рейтинг позволяет определить лучших среди лучших и составляен на основе влияния ответов экспертов на аудиторию.</BlockLine>
                                </Block>
                            </Col>
                            <Col sm={12} md={8}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Лучшие эксперты</BlockTitle>
                                    <Row>
                                        <Col className="allCenterFlex" sm={2} md={2} lg={1}>
                                            
                                        </Col>
                                        <Col className="allCenterFlex">
                                            Имя
                                        </Col>
                                        <Col className="allCenterFlex" xs={2}>
                                            Рейтинг
                                        </Col>
                                        <hr />
                                    </Row>
                                    {
                                        this.state.raitings === undefined || this.state.raitings === null ? null :
                                            this.state.raitings.map((raiting, value) => {
                                                return (
                                                    <Row style={{cursor: "pointer"}} onClick={() => { history.push("/user/" + raiting.login) }}>
                                                        <Col className="allCenterFlex" sm={2} md={2} lg={1}>
                                                            <ProfileLogo height="46px" width="46px" src={staticData + raiting.imagepath} />
                                                        </Col>
                                                        <Col className="allCenterFlex">
                                                            {value+1}. {raiting.name}
                                                        </Col>
                                                        <Col style={{fontWeight: "bold"}} className="allCenterFlex" xs={2}>
                                                            {raiting.raiting}
                                                        </Col>
                                                        <hr />
                                                    </Row>
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

    getRaitings() {
        Post(
            profileService + "userraitinglist", {}, (response) => {
                this.setState(prevState => ({
                    raitings: response.data.raitings,
                }))
            })
    }
}

export default withCookies(PRaiting);