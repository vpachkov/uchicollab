import React, { Component } from 'react'
import { User } from "../components/User";
import { AuthorBlock, Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { Button, BigButton, BigButtonWithIcon, InlineButton, ButtonHandler, InlineBigButtonWithIcon, InlineBigButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faTimes, faArrowAltCircleLeft, faThumbsUp, faHeart, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons'
import { Post, profileService } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Select from 'react-select';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";
import { Switch } from 'react-switch-input';

import 'bootstrap/dist/css/bootstrap.min.css';

class PQuestion extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            userid: 0,
            session: cookies.get('session') || '1c8fee65-2a98-4545-9f22-263819a52b7e',
            question: {
                id: 0,
                title: "Uncaught (in promise): FirebaseError",
                subject: "Math",
                text: "I'm getting the error below. My problem is NOT with the actual error but the fact that it is saying that the error was Uncaught. If you take a look at my auth.service.ts and sign-in.component.ts files I am catching the error. I'm getting the error below. My problem is NOT with the actual error but the fact that it is saying that the error was Uncaught. If you take a look at my auth.service.ts and sign-in.component.ts files I am catching the error.",
                tags: ["Book", "School program"],
                date: "28 may 2020",
                until: "28-10-2021",
                cost: 335,

                author: "Russ Cox",
                authorid: 0,
                profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
            },

            answers: [{
                id: 1,
                text: "Answer 1",
                best: true,
                likes: 130,
                date: "28 may 2020",
                author: "Russ Cox",
                authorid: 0,
                profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
            }, {
                id: 2,
                text: "Answer 2",
                best: false,
                likes: 10,
                date: "28 may 2020",
                author: "Russ Cox",
                authorid: 0,
                profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
            }],

            likedAnswers: [1],
            donatedToQuestion: [{
                userid: 0,
                amount: 50,
            }]
        };
    }

    componentDidMount() {
        // this.loadComments()
    }

    canUserUpvoteQuestion = () => {
        return true
    }

    // How much money current user has donated
    // 0 if none
    amountOfDonateToQuestion = () => {
        if (this.state.donatedToQuestion === undefined) {
            return 0
        }

        for (var donate of this.state.donatedToQuestion) {
            if (donate.userid === this.state.userid) {
                return donate.amount
            }
        }

        return 0
    }

    addLikesToAnswer = (answer, amount) => {
        if (this.state.answers === undefined) {
            return 0
        }
        var answers = this.state.answers
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].id == answer.id) {
                answers[i].likes += amount
            }
        }
        this.setState({ answers: answers });
    }

    onLikeAnswer = (answer) => {
        var likes_amount = this.amountOfDonateToQuestion() / 10 + 1
        var la = this.state.likedAnswers
        if (this.isLikedAnswer(answer)) {
            var index = la.indexOf(answer.id)
            la.splice(index, 1);
            this.addLikesToAnswer(answer, -likes_amount)
        } else {
            la.push(answer.id)
            this.addLikesToAnswer(answer, likes_amount)
        }
        this.setState({ likedAnswers: la });
    }

    isLikedAnswer = (answer) => {
        return this.state.likedAnswers.indexOf(answer.id) !== -1
    }

    onDonate = () => {
        // FIXME get amount from form
        var amount = 10
        var answers = this.state.answers
        var currnet_power = this.amountOfDonateToQuestion() / 10
        var new_power = (amount + this.amountOfDonateToQuestion()) / 10
        // Checked all liked and update like count
        for (var i = 0; i < answers.length; i++) {
            if (this.isLikedAnswer(answers[i])) {
                this.addLikesToAnswer(answers[i], new_power - currnet_power)
            }
        }

        var qss = this.state.question
        qss.cost += amount
        
        var dons = this.state.donatedToQuestion
        for (var i = 0; i < dons.length; i++) {
            if (dons[i].userid == this.state.userid) {
                dons[i].amount += amount
            }
        }
        
        this.setState({donatedToQuestion: dons, question: qss})
    }

    renderAnswer = (answer) => {
        // FIXME: NEW GRAY COLOR
        var bc = "lightgray"
        if (answer.best) {
            bc = "green"
        }
        return (
            <Row>
                <MiniQuestion borderColor={bc}>
                    <Span fontWeight="bold" color={this.state.maincolor}>{answer.likes} <FontAwesomeIcon color="#ee0000" icon={this.isLikedAnswer(answer) ? faHeart : fasHeart} onClick={() => { this.onLikeAnswer(answer) }} /></Span>
                    <QuestionBody max={-1} text={answer.text} />
                    <AuthorBlock author={answer.author} date={answer.date} profilePic={answer.profilePic} authorid={answer.authorid} />
                </MiniQuestion>
            </Row>
        )
    }

    getSubjectTextColor = () => {
        return "rgb(225, 113, 60)"
    }

    getSubjectBackgroundColor = () => {
        return "rgb(250, 225, 213)"
    }

    renderDonate = () => {
        return (
            <div>
                <div>You have donated {this.amountOfDonateToQuestion()}</div>
                <BlockTitle color="rgb(69, 68, 79)" text="bold">Donate</BlockTitle>
                <BlockLine color="rgb(133, 133, 138)">Стоимость</BlockLine>
                <input className="inputBox" type="number" rows="4" placeholder="Стоимость"></input>
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <Button title="Donate" onClick={() => {this.onDonate()}}/>
                </div>
            </div>
        )
    }

    renderSideBar = () => {
        return (
            <div>
                {this.renderDonate()}
            </div>
        )
    }

    renderQuestion = (question) => {
        return (
            <Block color="white">
                <BlockTitle color="rgb(69, 68, 79)" text="bold">{question.title}</BlockTitle>
                <AbstractBlock color="white">
                    <KeywordBlock backgroundColor={this.getSubjectBackgroundColor()} color={this.getSubjectTextColor()}><FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: ".9em" }} /><span style={{ marginLeft: "4px" }}>{question.subject}</span></KeywordBlock>
                    <KeywordBlock><FontAwesomeIcon color="#aaaaaa" icon={faClock} style={{ fontSize: ".9em" }} /><span style={{ marginLeft: "4px" }}>4 days</span></KeywordBlock>
                    <KeywordBlock><FontAwesomeIcon color="#aaaaaa" icon={faCoins} style={{ fontSize: ".9em" }} /><span style={{ marginLeft: "4px" }}>{question.cost}</span></KeywordBlock>
                </AbstractBlock>
                <QuestionBody max={-1} text={question.text} />
                <AbstractBlock color="white">
                    {
                        question.tags === undefined ? null :
                            question.tags.map(tag => {
                                return (
                                    <KeywordBlock><span>{tag}</span></KeywordBlock>
                                )
                            })
                    }
                </AbstractBlock>
                <AuthorBlock author={question.author} date={question.date} profilePic={question.profilePic} authorid={0} />
            </Block>
        )
    }

    render() {
        return (
            <div>
                <header>
                    <Container>
                        <AbstractBetweenSpacingBlock>
                            <div>
                                <div className="greetingName" style={{ color: this.state.maincolor }}>
                                    Вопрос по матемтике
                                </div>
                            </div>
                            <div>
                                <Span color={this.state.maincolor}>399 <FontAwesomeIcon icon={faCoins} /></Span>
                                <Span color={this.state.maincolor}>Russ Cox <FontAwesomeIcon icon={faUser} /></Span>
                            </div>
                        </AbstractBetweenSpacingBlock>
                    </Container>
                </header>
                {/* Rerender wave on width change to get the right amount of points */}
                <Wave className="wave" fill="url(#gradient)"
                    paused={false}
                    options={{
                        height: 8,
                        amplitude: 20,
                        speed: 0.10,
                        points: 10
                    }}
                >
                    <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                            <stop offset="0%" stopColor="rgb(161, 178, 190)" />
                            <stop offset="60%" stopColor="#f4f5f6" />
                        </linearGradient>
                    </defs>
                </Wave>
                <Container>
                    <main>
                        <ButtonHandler>
                            {
                                this.canUserUpvoteQuestion() ?
                                    <BigButtonWithIcon onClick={() => {
                                        history.push('/create')
                                    }} icon={faCoins} title="Upvote question" /> : null
                            }
                            <InlineBigButtonWithIcon onClick={() => {
                                history.goBack()
                            }} icon={faArrowAltCircleLeft} title="Назад" />
                            <InlineBigButton onClick={() => {
                                history.push('/')
                            }} title="Главная" />
                        </ButtonHandler>
                        <Row>
                            <Col xs={12} md={4}>
                                <Block color="white">
                                    {this.renderSideBar()}
                                </Block>
                            </Col>
                            <Col xs={12} md={8}>
                                {this.renderQuestion(this.state.question)}

                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Ответы</BlockTitle>
                                    {
                                        this.state.answers === undefined ? null :
                                            this.state.answers.map(answer => {
                                                return (
                                                    this.renderAnswer(answer)
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
}

export default withCookies(PQuestion);