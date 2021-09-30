import React, { Component } from 'react'
import { User } from "../components/User";
import { Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { Button, BigButton, BigButtonWithIcon, InlineButton, ButtonHandler, InlineBigButtonWithIcon, InlineBigButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faTimes, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Select from 'react-select';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";
import { Switch } from 'react-switch-input';
import { Tags } from '../components/Tags'

import 'bootstrap/dist/css/bootstrap.min.css';
import {SubjectColor, Subjects} from "../constants";

class PHelp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maincolor: "rgb(62, 134, 247)",
            selectedSubjectOption: null,
        };
    }

    componentDidMount() {
        // this.loadComments()
    }

    submit() {

    }

    renderFilters() {
        const selectedSubjectOption = this.state.selectedSubjectOption;

        return (
            <div>
                <Select
                    className="textSelector"
                    value={ selectedSubjectOption }
                    onChange={ (selectedOption) => {
                        this.setState({
                            selectedSubjectOption: selectedOption,
                            maincolor: SubjectColor[selectedOption.value]
                        });
                    } }
                    options={ Subjects }
                    placeholder="Выберите предмет"
                />
                <BlockLine color="rgb(133, 133, 138)">Тэги</BlockLine>
                <Tags
                    onChange={ (tags) => {
                        this.setState({ tags: tags })
                    }}
                />
                <BlockLine color="rgb(133, 133, 138)">Стоимость</BlockLine>
                <Row>
                    <Col><input className="inputBox" type="number" placeholder="от"></input></Col>
                    <Col><input className="inputBox" type="number" placeholder="до"></input></Col>
                </Row>
                <BlockLine color="rgb(133, 133, 138)">Выполнить до</BlockLine>
                <input className="inputBox" type="date" rows="4"></input>
                <Switch
                    name={"themeTwo"}
                    theme={"one"}
                    labelRight="Исключить отвеченные"
                    onChange={() => { }}
                />
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <InlineButton title="сбросить" />
                    <Button
                        onClick={ ()=> {

                        }}
                        title="применить" />
                </div>
            </div>
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
                                    Помощь
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
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Фильтры</BlockTitle>
                                    {this.renderFilters()}
                                </Block>
                            </Col>
                            <Col xs={12} md={8}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Вопросы</BlockTitle>
                                    <MiniQuestion>
                                        <Row>
                                            <Col xs={4} lg={2}>
                                                <QuestionLable>Ответов 132</QuestionLable>
                                            </Col>
                                            <Col xs={8} lg={10}>
                                                <QuestionTitle>Рещение задачи по ТСАУ</QuestionTitle>
                                                <QuestionBody max={128} text="Russ Cox was raised by a pack of crazed hillbillies in the backwoods of Tennessee. With the bulk of his life spent in Pennsylvania, he met his wife; became a graphic designer; played in punk, alternative " />
                                                <div className="commentAuthorBlock">
                                                    <span style={{ marginRight: "8px" }}>Asked by Russ Cox</span><ProfileLogo height="16px" width="16px" src="https://pbs.twimg.com/profile_images/1137178645880037377/aeaRCnJV.png" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </MiniQuestion>
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

export default withCookies(PHelp);