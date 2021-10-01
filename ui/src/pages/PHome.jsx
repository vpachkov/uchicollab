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
    SquareBlockText,
    HeaderSquareBlock
} from "../components/Blocks";
import { BriefQuestion } from "../components/Questions";
import { Header, Navigation } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { SubjectColor } from "../constants";
import { BigButtonWithIcon, InlineBigButton, ButtonHandler } from "../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import Wave from 'react-wavify'

import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faCoins, faPlus, faStar, faUser, faHeart, faQuestion, faComment, faFire} from '@fortawesome/free-solid-svg-icons'
import {Post, profileService, staticData} from "../config";
import {Cookies, withCookies} from 'react-cookie';
import {instanceOf} from 'prop-types';
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
                bestAnswersRate: 0,
                subscribedTages: ["Math", "Russian"],
            },
        }
    }

    componentDidMount() {
        this.getInfo()
        this.loadComments()
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
                                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Аналитика</BlockTitle>
                                                <AbstractBetweenSpacingBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(250, 225, 213)"><FontAwesomeIcon
                                                            color="rgb(225, 113, 60)"
                                                            icon={faHeart} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)">{this.state.user.likesRecieved}</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(220, 222, 242)"><FontAwesomeIcon
                                                            color="rgb(74, 89, 183)"
                                                            icon={faQuestion} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)">{this.state.user.questions}</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(211, 239, 229)"><FontAwesomeIcon
                                                            color="rgb(105, 193, 153)"
                                                            icon={faComment} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)">{this.state.user.answers}</SquareBlockText></SquareBlock>
                                                    <SquareBlock color="white"><SquareBlockImage
                                                        color="rgb(244, 222, 250)"><FontAwesomeIcon
                                                            color="rgb(213, 98, 234)"
                                                            icon={faFire} /></SquareBlockImage><SquareBlockText
                                                                color="rgb(133, 133, 138)">{this.state.user.bestAnswersRate}%</SquareBlockText></SquareBlock>
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
                            <Col sm={12} md={4}>
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
                            <Col sm={12} md={4}>
                                <Block color="white">
                                    <BlockTitle color="black" text="bold">Новые вопросы</BlockTitle>
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
                            <Col sm={12} md={4}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Последние отзывы</BlockTitle>
                                    {
                                        this.state.comments === undefined ? null :
                                            this.state.comments.map(comment => {
                                                return (
                                                    <CommentBlock color="#eeeeee" textColor="rgb(69, 68, 79)"
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
            this.setState({
                user: {
                    name: response.data.name,
                    profilePic: staticData + response.data.imagepath,
                }
            })
        })
    }
}

export default withCookies(PHome);