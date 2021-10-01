import React, { Component } from 'react'
import { User } from "../components/User";
import { AuthorBlock, Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { Button, BigButton, BigButtonWithIcon, InlineButton, ButtonHandler, InlineBigButtonWithIcon, InlineBigButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable } from "../components/Questions";
import { Header, Navigation } from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faTimes, faArrowAltCircleLeft, faThumbsUp, faHeart, faGraduationCap, faCheck, faComments } from '@fortawesome/free-solid-svg-icons'
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

            userid: 0,
            session: cookies.get('session') || '1c8fee65-2a98-4545-9f22-263819a52b7e',
            question: {
                id: 0,
                title: "Uncaught (in promise): FirebaseError",
                subject: "Алгебра",
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
                text: "The answer is good, but not complete, this will not work properly if you will not add the focus modifier, such as textarea:focus { border: none; overflow: auto; outline: none; -webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none; resize: none; } Then it will work",
                best: true,
                likes: 130,
                date: "28 may 2020",
                author: "Russ Cox",
                authorid: 0,
                profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
            }, {
                id: 2,
                text: "Tried your jsbin and that works, but not for me in my code. I wonder if it has something to do with Twitter Bootstrap maybe? When I put !important after every line a lot of styling was removed but there is still a small, light border in the top, on the left and on the right (the bottom is white). Strange",
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
        var likes_amount = this.amountOfDonateToQuestion() + 1
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
        var currnet_power = this.amountOfDonateToQuestion()
        var new_power = (amount + this.amountOfDonateToQuestion())
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

        this.setState({ donatedToQuestion: dons, question: qss })
    }

    renderAnswer = (answer) => {
        // FIXME: NEW GRAY COLOR
        var bc = "lightgray"
        if (answer.best) {
            bc = "#e7d27c"
        }
        return (
            <Row style={{ marginTop: "16px" }}>
                <MiniQuestion borderColor={bc} style={{ cursor: "default" }}>
                    {answer.best ? <Span fontWeight="bold"> <FontAwesomeIcon color="#e7d27c" icon={faStar} /> Лучший ответ</Span> : null}
                    <QuestionBody max={-1} text={answer.text} />
                    <AbstractBetweenSpacingBlock style={{ marginTop: "8px" }}>
                        <div style={{ width: "100%" }}>
                            <Span fontWeight="regular" color={this.state.maincolor}>{answer.likes}
                                <FontAwesomeIcon style={{ marginLeft: "4px", cursor: "pointer" }} color="#FAA0A0" icon={this.isLikedAnswer(answer) ? faHeart : fasHeart} onClick={() => { this.onLikeAnswer(answer) }} />
                            </Span>
                            <FontAwesomeIcon style={{ marginLeft: "12px", cursor: "pointer" }} color="lightgray" icon={faComments} onClick={() => { }} />
                        </div>
                        <AuthorBlock author={answer.author} date={answer.date} profilePic={answer.profilePic} authorid={answer.authorid} />
                    </AbstractBetweenSpacingBlock>
                </MiniQuestion>
            </Row>

        )
    }

    questionIsActive = () => {
        // FIXME
        return true
    }

    getSubjectTextColor = () => {
        return "rgb(225, 113, 60)"
    }

    getSubjectBackgroundColor = () => {
        return "rgb(250, 225, 213)"
    }

    renderDonate = () => {
        if (!this.questionIsActive()) {
            return (
                <div></div>
            )
        }
        return (
            <div>
                <BlockTitle color="rgb(69, 68, 79)" text="bold">Поднять стоимость</BlockTitle>
                <BlockLine color="rgb(0, 0, 0)">Ваши голоса за вопрос: {this.amountOfDonateToQuestion()}</BlockLine>
                <BlockLine color="rgb(133, 133, 138)">Если вопрос вам интересен, Вы можете поднять стоимость, что бы эксперты ответили быстрее. </BlockLine>
                <input className="inputBox" type="number" rows="4" placeholder="Стоимость"></input>
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <Button title="Внести голоса" onClick={() => { this.onDonate() }} />
                </div>
            </div>
        )
    }

    renderInformation = () => {
        return (
            <div>
                <BlockTitle color="rgb(69, 68, 79)" text="bold">Информация</BlockTitle>
                <BlockLine color="rgb(0, 0, 0)">Ваши голоса за вопрос: {this.amountOfDonateToQuestion()}</BlockLine>
            </div>
        )
    }

    renderSideBar = () => {
        return (
            <div>
                {this.renderDonate()}
                {this.renderInformation()}
            </div>
        )
    }

    renderQuestion = (question) => {
        return (
            <Block color="white">
                <BlockTitle color="rgb(69, 68, 79)" text="bold">{question.title}</BlockTitle>
                <QuestionBody max={-1} text={question.text} />
                <AbstractBlock color="white">
                    <KeywordBlock subject={question.subject}><FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: ".9em" }} /><span style={{ marginLeft: "4px" }}>{question.subject}</span></KeywordBlock>
                    <KeywordBlock><FontAwesomeIcon color="#aaaaaa" icon={faClock} style={{ fontSize: ".9em" }} /><span style={{ marginLeft: "4px" }}>4 days</span></KeywordBlock>
                    <KeywordBlock><FontAwesomeIcon color="#aaaaaa" icon={faCoins} style={{ fontSize: ".9em" }} /><span style={{ marginLeft: "4px" }}>{question.cost}</span></KeywordBlock>
                </AbstractBlock>
                <AbstractBlock color="white">
                    <BlockLine color="rgb(133, 133, 138)">Тэги</BlockLine>
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
                <Header prefix="Вопрос от" user={this.state.user} />
                <Container>
                    <main>
                        <Navigation>
                            <BigButtonWithIcon onClick={() => {
                                history.push('/chat/CHAT_ID_HERE')
                            }} backgroundColor="#ffe2e1" icon={faComments} title="Общий чат" />
                            <InlineBigButtonWithIcon onClick={() => {
                                history.goBack()
                            }} icon={faArrowAltCircleLeft} title="Назад" />
                        </Navigation>
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