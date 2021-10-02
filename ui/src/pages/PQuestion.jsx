import React, { Component } from 'react'
import {
    AbstractBetweenSpacingBlock,
    AbstractBlock,
    AuthorBlock,
    Block,
    BlockLine,
    BlockTitle,
    KeywordBlock,
    MessageBlock,
    Span
} from "../components/Blocks";
import { CustomInputFile, BigButtonWithIcon, Button, InlineBigButtonWithIcon, ButtonGray } from "../components/Buttons";
import { MiniQuestion, QuestionBody } from "../components/Questions";
import { Header, Navigation } from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowAltCircleLeft,
    faArrowLeft,
    faClock,
    faCoins,
    faComments,
    faImage,
    faGraduationCap,
    faHeart,
    faPaperPlane,
    faStar,
    faTimes
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as fasHeart, faHourglass } from '@fortawesome/free-regular-svg-icons'
import { notificationService, Post, profileService, questionsService, staticData, uploadStaticAnswerData, uploadStaticData } from "../config";
import { withCookies } from 'react-cookie';
import history from "../history";
import InfiniteScrollReverse from "react-infinite-scroll-reverse";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import axios from "axios";
import { SubjectColor } from "../constants";

class PQuestion extends Component {

    constructor(props) {
        super(props);

        this.chatInterval = null

        this.state = {
            expandedAnswers: new Set(),

            isChatLoading: true,
            addingAnswer: false,
            chatWithUser: undefined,

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

            calluser: "",
            userid: 0,
            // question: {
            //     id: 0,
            //     title: "Uncaught (in promise): FirebaseError",
            //     subject: "Алгебра",
            //     text: "I'm getting the error below. My problem is NOT with the actual error but the fact that it is saying that the error was Uncaught. If you take a look at my auth.service.ts and sign-in.component.ts files I am catching the error. I'm getting the error below. My problem is NOT with the actual error but the fact that it is saying that the error was Uncaught. If you take a look at my auth.service.ts and sign-in.component.ts files I am catching the error.",
            //     tags: ["Book", "School program"],
            //     date: "28 may 2020",
            //     until: "28-10-2021",
            //     cost: 335,
            //
            //     author: "Russ Cox",
            //     authorid: 0,
            //     profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
            // },
            //
            // answers: [{
            //     id: 1,
            //     text: "The answer is good, but not complete, this will not work properly if you will not add the focus modifier, such as textarea:focus { border: none; overflow: auto; outline: none; -webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none; resize: none; } Then it will work",
            //     best: true,
            //     likes: 130,
            //     date: "28 may 2020",
            //     author: "Russ Cox",
            //     authorid: 0,
            //     profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
            // }, {
            //     id: 2,
            //     text: "Tried your jsbin and that works, but not for me in my code. I wonder if it has something to do with Twitter Bootstrap maybe? When I put !important after every line a lot of styling was removed but there is still a small, light border in the top, on the left and on the right (the bottom is white). Strange",
            //     best: false,
            //     likes: 10,
            //     date: "28 may 2020",
            //     author: "Russ Cox",
            //     authorid: 0,
            //     profilePic: "https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png",
            // }],

            likedAnswer: undefined,
            donatedToQuestion: [{
                userid: 0,
                amount: 5,
            }]
        };
    }

    componentDidMount() {
        this.getInfo()
        this.loadUserCoins()
        this.loadLogin()
        this.loadDetailedQuestion()
    }

    // How much money current user has donated
    // 0 if none
    amountOfDonateToQuestion = () => {
        if (this.state.question === undefined) {
            return 0
        }

        if (this.state.question.upvoters) {
            for (const upvoter of this.state.question.upvoters) {
                if (upvoter.login === this.state.login) {
                    return upvoter.coins
                }
            }
        }

        return 0
    }

    onLikeAnswer = (answer) => {
        Post(questionsService + "concern", {
            questionid: this.state.question.id,
            answerid: answer.id
        }, () => {
            this.loadDetailedQuestion()
        })
    }

    isLikedAnswer = (answer) => {
        if (answer.donators) {
            for (const donator of answer.donators) {
                if (donator.login === this.state.login) {
                    return true
                }
            }
        }
        return false
    }

    onDonate = () => {
        if (this.state.question === undefined) {
            return
        }

        Post(questionsService + "upvote", {
            questionid: this.state.question.id,
            coins: this.state.donateCoins,
        }, () => {
            this.setState({
                donateCoins: 0
            })
            this.loadUserCoins()
            this.loadDetailedQuestion()
        })
        // // FIXME get amount from form
        // var amount = 10
        // var answers = this.state.question.answers
        // var currnet_power = this.amountOfDonateToQuestion()
        // var new_power = (amount + this.amountOfDonateToQuestion())
        // // Checked all liked and update like count
        // for (var i = 0; i < answers.length; i++) {
        //     if (this.isLikedAnswer(answers[i])) {
        //         this.addLikesToAnswer(answers[i], new_power - currnet_power)
        //     }
        // }
        //
        // var qss = this.state.question
        // qss.cost += amount
        //
        // var dons = this.state.donatedToQuestion
        // for (var i = 0; i < dons.length; i++) {
        //     if (dons[i].userid == this.state.userid) {
        //         dons[i].amount += amount
        //     }
        // }
        //
        // this.setState({ donatedToQuestion: dons, question: qss })
    }

    openChat = () => {

    }

    renderAnswer = (answer) => {
        var tinycolor = require("tinycolor2")

        // FIXME: NEW GRAY COLOR
        var bc = "lightgray"
        if (answer.best) {
            bc = "#e7d27c"
        }
        return (
            <Row style={{ marginTop: "16px" }}>
                <MiniQuestion borderColor={bc} style={{ cursor: "default" }}>
                    {answer.best ? <Span fontWeight="bold"> <FontAwesomeIcon color="#e7d27c" icon={faStar} /> Лучший
                        ответ</Span> : null}
                    <QuestionBody max={-1} text={answer.text} />
                    <AbstractBetweenSpacingBlock style={{ marginTop: "8px" }}>
                        <div style={{ width: "100%" }}>
                            <Span fontWeight="regular" color={this.state.maincolor}>{answer.likes}
                                <FontAwesomeIcon
                                    style={{ marginLeft: "4px", cursor: "pointer" }}
                                    color="#FAA0A0"
                                    icon={this.isLikedAnswer(answer) ? faHeart : fasHeart}
                                    onClick={() => {
                                        this.onLikeAnswer(answer)
                                    }}
                                />
                            </Span>
                            {this.state.login === this.state.question.askedbylogin ?
                                <div className="privateChat">
                                    <FontAwesomeIcon style={{ marginRight: "4px" }} icon={faComments} onClick={() => {
                                    }} />
                                    Начать чат
                                </div> : null
                            }
                            {answer.imagepath !== undefined &&
                                answer.imagepath !== "" &&
                                !this.state.expandedAnswers.has(answer.id) ?
                                <div>
                                    <div
                                        className="privateChat"
                                        onClick={() => {
                                            disableBodyScroll(document.querySelector('#mainScroll'))
                                            const ea = this.state.expandedAnswers
                                            ea.add(answer.id)
                                            this.setState({
                                                expandedAnswers: ea
                                            })
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            style={{ marginRight: "4px" }}
                                            icon={faImage}
                                        />
                                        Открыть вложения
                                    </div>
                                </div>
                                :
                                null
                            }
                            {
                                this.state.expandedAnswers.has(answer.id) ?
                                    <div>
                                        <div className="attachmentClose"
                                            style={{ backgroundColor: "#ffe2e1", color: tinycolor("#ffe2e1").darken(50).toString() }}
                                            onClick={() => {
                                                enableBodyScroll(document.querySelector('#mainScroll'))
                                                const ea = this.state.expandedAnswers
                                                ea.delete(answer.id)
                                                this.setState({
                                                    expandedAnswers: ea
                                                })
                                            }}><FontAwesomeIcon icon={faTimes} /></div>
                                        <div className="tintHandler"></div>
                                        <div className="attachmentViewer">
                                            <img
                                                style={{ cursor: 'pointer' }}
                                                src={staticData + answer.imagepath}
                                                onClick={() => {
                                                    enableBodyScroll(document.querySelector('#mainScroll'))
                                                    const ea = this.state.expandedAnswers
                                                    ea.delete(answer.id)
                                                    this.setState({
                                                        expandedAnswers: ea
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <AuthorBlock
                            author={answer.authorname}
                            date={answer.date}
                            profilePic={staticData + answer.authorimagepath}
                            authorid={answer.authologin}
                        />
                    </AbstractBetweenSpacingBlock>
                </MiniQuestion>
            </Row>

        )
    }

    questionIsActive = () => {
        return this.state.question && this.state.question.active
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
                <BlockTitle color="rgb(69, 68, 79)" text="bold">Поднять стоимость</BlockTitle>
                <BlockLine color="rgb(39, 38, 49)">Вы уже внесли голосов: {this.amountOfDonateToQuestion()}</BlockLine>
                <BlockLine color="rgb(133, 133, 138)">Если вопрос вам интересен, Вы можете поднять стоимость, что бы
                    эксперты ответили быстрее. </BlockLine>
                <input
                    onChange={(event) => {
                        this.setState({
                            donateCoins: parseInt(event.target.value)
                        })
                    }}
                    className="inputBox"
                    type="number"
                    min={0}
                    max={this.state.user.coins}
                    placeholder="Стоимость"
                    value={this.state.donateCoins}
                />
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <Button title="Внести голоса" onClick={() => {
                        this.onDonate()
                    }} />
                </div>
            </div>
        )
    }

    renderInformation = () => {
        return (
            <div>
                <BlockTitle color="rgb(69, 68, 79)" text="bold">Пригласить пользователя</BlockTitle>
                <input
                    className="inputBox"
                    min={0}
                    max={this.state.user.coins}
                    placeholder="Введите логин"
                    value={this.state.calluser}
                    onChange={(event) => {
                        this.setState({
                            calluser: event.target.value
                        })
                    }}
                />

                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <Button title="Пригласить" onClick={() => {
                        this.calluserfunc()
                    }} />
                </div>
            </div>
        )
    }

    renderSideBar = () => {
        if (!this.questionIsActive()) {
            return (
                <Col xs={12} md={4}>
                    <Block color="white">
                        <div>
                            <div style={{textAlign: "center", fontSize: "3em", color: "lightgray", marginBottom: "-20px"}}><FontAwesomeIcon icon={faHourglass} /></div>
                            <BlockTitle color="rgb(69, 68, 79)" text="bold">Вопрос решен</BlockTitle>
                            <BlockLine>Вопрос закрыт и дальнеейшее обсуждения вопроса возможно только в общем чате.</BlockLine>
                        </div>
                    </Block>
                </Col>
            )
        }
        return (
            <Col xs={12} md={4}>
                <Block color="white">
                    <div>
                        {this.renderDonate()}
                        {this.renderInformation()}
                    </div>
                </Block>
            </Col>
        )
    }

    chatHasMore = () => {
        return false
    }

    chatLoadMore = () => {

    }

    renderChatPopup = () => {
        // console.log(this.state.chatMessages)
        var tinycolor = require("tinycolor2");
        return (
            <div>
                <div className="tintHandler" onClick={() => {
                    enableBodyScroll(document.querySelector('#mainScroll'))
                    clearInterval(this.chatInterval)
                    this.setState({ chatWithUser: undefined })
                }} />
                <div className="popupChatHandler">
                    <div className="chatClose"
                        style={{ backgroundColor: "#ffe2e1", color: tinycolor("#ffe2e1").darken(50).toString() }}
                        onClick={() => {
                            enableBodyScroll(document.querySelector('#mainScroll'))
                            clearInterval(this.chatInterval)
                            this.setState({ chatWithUser: undefined })
                        }}><FontAwesomeIcon icon={faTimes} /></div>
                    <InfiniteScrollReverse
                        className="chatHandler"
                        hasMore={this.chatHasMore()}
                        isLoading={this.state.isChatLoading}
                        loadMore={this.chatLoadMore()}
                    >
                        {
                            this.state.chatMessages === undefined ||
                                this.state.chatMessages === null ? <BlockLine>Добро пожаловать в чат</BlockLine> :
                                this.state.chatMessages.map((message) => {
                                    return (
                                        <MessageBlock
                                            time={this.formatTimestamp(message.usertime / 1000000)}
                                            author={message.username}
                                            profilePic={staticData + message.userimagepath}
                                            text={message.text}
                                            isMine={this.state.login === message.userlogin}
                                        />
                                    )
                                })
                        }
                    </InfiniteScrollReverse>
                    {
                        !this.questionIsActive() ? null :
                            <div>
                                <input
                                    className="chatInput"
                                    placeholder="Ваше сообщение"
                                    onChange={(event) => {
                                        this.setState({
                                            myMessage: event.target.value,
                                        })
                                    }}
                                    value={this.state.myMessage}
                                />
                                <div
                                    onClick={() => {
                                        Post(
                                            questionsService + "sendmessage", {
                                            questionid: this.state.question.id,
                                            text: this.state.myMessage,
                                        }, () => {
                                            this.loadChatMessages()
                                            this.setState({
                                                myMessage: ""
                                            })
                                        })
                                    }}
                                    className="sendInput"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }

    formatTimestamp = (timestamp) => {
        var date = new Date(timestamp);
        var year = date.getFullYear()
        var date2 = ("0" + date.getDate()).substr(-2)
        var month = ("0" + date.getMonth()).substr(-2)
        var hours = ("0" + date.getHours()).substr(-2)
        var minutes = ("0" + date.getMinutes()).substr(-2)
        var seconds = ("0" + date.getSeconds()).substr(-2)
        var formattedTime = date2 + '/' + month + '/' + year + ' ' + hours + ':' + minutes
        return formattedTime
    }

    renderQuestion = (question) => {
        if (question === undefined) {
            return null
        }
        return (
            <Block color="white">
                <BlockTitle color="rgb(69, 68, 79)" text="bold">{question.title}</BlockTitle>
                <QuestionBody max={-1} text={question.text} />
                <AbstractBlock color="white">
                    <KeywordBlock subject={question.subject}><FontAwesomeIcon icon={faGraduationCap}
                        style={{ fontSize: ".9em" }} /><span
                            style={{ marginLeft: "4px" }}>{question.subject}</span></KeywordBlock>
                    <KeywordBlock><FontAwesomeIcon color="#aaaaaa" icon={faClock} style={{ fontSize: ".9em" }} /><span
                        style={{ marginLeft: "4px" }}>{this.formatTimestamp(question.until / 1000000)}</span></KeywordBlock>
                    <KeywordBlock><FontAwesomeIcon color="#aaaaaa" icon={faCoins} style={{ fontSize: ".9em" }} /><span
                        style={{ marginLeft: "4px" }}>{question.cost}</span></KeywordBlock>
                </AbstractBlock>
                <AbstractBlock color="white">
                    {
                        question.tags === undefined ||
                            question.tags === null ? null :
                            <BlockLine color="rgb(133, 133, 138)">Теги</BlockLine>
                    }
                    {
                        question.tags === undefined ||
                            question.tags === null ? null :
                            question.tags.map(tag => {
                                return (
                                    <KeywordBlock><span>{tag}</span></KeywordBlock>
                                )
                            })
                    }
                </AbstractBlock>
                <AuthorBlock
                    author={question.askedbyname}
                    date={this.formatTimestamp(question.date / 1000000)}
                    profilePic={staticData + question.askedbyimagepath}
                    authorid={question.askedbylogin} />
            </Block>
        )
    }

    render() {
        return (
            <div>
                {this.state.chatWithUser === undefined ? null : this.renderChatPopup()}
                <div id="mainScroll">
                    <Header prefix="Вопрос от" user={this.state.user} />
                    <Container>
                        <main>
                            <Navigation>
                                <BigButtonWithIcon onClick={() => {
                                    disableBodyScroll(document.querySelector('#mainScroll'))
                                    this.loadChatMessages()
                                    this.chatInterval = setInterval(() => this.loadChatMessages(), 2000);
                                }} backgroundColor="rgb(194,226,230)" icon={faComments} title="Общий чат" />
                                <InlineBigButtonWithIcon onClick={() => {
                                    history.goBack()
                                }} icon={faArrowLeft} title="Назад" />
                            </Navigation>
                            <Row>
                                {this.renderSideBar()}
                                <Col xs={12} md={8}>
                                    {this.renderQuestion(this.state.question)}

                                    <Block color="white">
                                        <BlockTitle color="rgb(69, 68, 79)" text="bold">Ответы</BlockTitle>
                                        {
                                            this.state.addingAnswer ?
                                                <div>
                                                    <BlockLine color="rgb(133, 133, 138)">Ваш ответ</BlockLine>
                                                    <textarea
                                                        className="textBox"
                                                        rows="4"
                                                        placeholder="Ответ"
                                                        onChange={(event) => {
                                                            this.setState({
                                                                answerText: event.target.value
                                                            })
                                                        }}
                                                    />
                                                    <CustomInputFile
                                                        type="file"
                                                        id="answerImage"
                                                        name="answerImage"
                                                        accept="image/png, image/jpeg"
                                                        onChange={(event) => {
                                                            this.setState({
                                                                answerImage: event.target.files[0]
                                                            })
                                                        }} />
                                                    <div style={{ textAlign: "right", marginTop: "4px" }}>
                                                        <ButtonGray title="Отправить ответ" onClick={() => {
                                                            Post(
                                                                questionsService + "answer", {
                                                                questionid: this.state.question.id,
                                                                text: this.state.answerText,
                                                            }, ((response) => {
                                                                const formData = new FormData();
                                                                formData.append(
                                                                    'answerImage',
                                                                    this.state.answerImage,
                                                                    this.state.answerImage.name,
                                                                )
                                                                formData.append(
                                                                    'answerID',
                                                                    response.data.answerid,
                                                                )
                                                                axios.post(uploadStaticAnswerData, formData, {
                                                                    headers: {
                                                                        'Content-Type': 'multipart/form-data'
                                                                    }
                                                                }).then(() => {
                                                                    this.loadDetailedQuestion()
                                                                    this.setState({
                                                                        addingAnswer: false
                                                                    })
                                                                })

                                                            })
                                                            )
                                                        }} />
                                                    </div>
                                                </div> :
                                                !this.questionIsActive() ? null :
                                                    <div style={{ marginTop: "-42px", textAlign: "right" }}>
                                                        <ButtonGray title="Добавить ответ" onClick={() => {
                                                            this.setState({
                                                                addingAnswer: true
                                                            })
                                                        }} />
                                                    </div>
                                        }
                                        {
                                            this.state.question === undefined ||
                                                this.state.question.answers === undefined ||
                                                this.state.question.answers === null ? null :
                                                this.state.question.answers.map(answer => {
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
            </div >
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
    }

    calluserfunc() {
        Post(notificationService + "calluser", {
            questionid: this.state.question.id,
            login: this.state.calluser
        }, (response) => {
            this.setState(prevState => ({
                calluser: ''
            }))
        })
    }

    loadChatMessages() {
        Post(questionsService + "chatmessages", {
            questionid: this.state.question.id
        }, (response) => {
            this.setState({
                chatMessages: response.data.messages,
                chatWithUser: "all",
            })
            console.log(response.data.messages)
        })
    }

    loadLogin() {
        Post(profileService + "userinfo", {}, (response) => {
            this.setState({
                login: response.data.login
            })
        })
    }

    loadUserCoins() {
        Post(profileService + "usercoins", {}, (response) => {
            this.setState(prevState => ({
                user: {
                    ...prevState.user,
                    coins: response.data.coin,
                }
            }))
        })
    }

    loadDetailedQuestion() {
        Post(
            questionsService + "detailedquestion", {
            id: parseInt(this.props.match.params.id)
        }, (response) => {
            this.setState({
                question: response.data
            })
        }
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