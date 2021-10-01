import React, { Component } from 'react'
import { User } from "../components/User";
import { AuthorBlock, HeaderSquareBlock, Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { CustomSelect, Button, BigButton, BigButtonWithIcon, InlineButton, ButtonHandler, InlineBigButtonWithIcon, InlineBigButton } from "../components/Buttons";
import { BriefQuestion } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faTimes, faArrowAltCircleLeft, faFire, faComment } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService, questionsService, staticData } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";
import { Switch } from 'react-switch-input';
import { Tags } from '../components/Tags'

import { utc } from 'moment'

import 'bootstrap/dist/css/bootstrap.min.css';
import { SubjectColor, Subjects } from "../constants";
import { parse } from "@fortawesome/fontawesome-svg-core";
import { Header, Navigation } from '../components/Header';

class PHelp extends Component {
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

            maincolor: "rgb(62, 134, 247)",
            selectedSubjectOption: null,
            tags: [],
        };
    }

    componentDidMount() {
        this.loadBriefQuestions()
    }

    submit() {

    }

    renderFilters() {
        const selectedSubjectOption = this.state.selectedSubjectOption;

        return (
            <div>
                <CustomSelect
                    value={selectedSubjectOption}
                    onChange={(selectedOption) => {
                        this.setState({
                            selectedSubjectOption: selectedOption,
                            maincolor: SubjectColor[selectedOption.value]
                        }, this.loadBriefQuestions)
                    }}
                    options={Subjects}
                    placeholder="Выберите предмет"
                />
                <BlockLine color="rgb(133, 133, 138)">Тэги</BlockLine>
                <Tags
                    onChange={(tags) => {
                        this.setState({ tags: tags }, this.loadBriefQuestions)
                    }}
                />
                <BlockLine color="rgb(133, 133, 138)">Стоимость</BlockLine>
                <Row>
                    <Col>
                        <input
                            onChange={(event) => {
                                this.setState({ costFrom: parseInt(event.target.value) }, this.loadBriefQuestions)
                            }}
                            className="inputBox" type="number" placeholder="от"
                        />
                    </Col>
                    <Col>
                        <input
                            onChange={(event) => {
                                this.setState({ costTo: parseInt(event.target.value) }, this.loadBriefQuestions)
                            }}
                            className="inputBox" type="number" placeholder="до"
                        />
                    </Col>
                </Row>
                <BlockLine color="rgb(133, 133, 138)">Выполнить до</BlockLine>
                <input
                    onChange={(event) => {
                        this.setState({
                            deadline: + new Date(event.target.value)
                        }, this.loadBriefQuestions)
                    }}
                    className="inputBox" type="datetime-local" rows="4"
                />
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header prefix="Список вопросов," user={this.state.user} />
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
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Фильтры</BlockTitle>
                                    {this.renderFilters()}
                                </Block>
                            </Col>
                            <Col xs={12} md={8}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Вопросы</BlockTitle>
                                    {
                                        this.state.questions === undefined || this.state.questions === null ? null :
                                            this.state.questions.map(question => {
                                                return (
                                                    <BriefQuestion question={question} />
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
                tags: this.state.tags,
                costfrom: this.state.costFrom,
                costto: this.state.costTo,
                deadline: this.state.deadline,
            },
            (response) => {
                this.setState({
                    questions: response.data.questions
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

export default withCookies(PHelp);