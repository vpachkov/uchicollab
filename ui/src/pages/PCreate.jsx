import React, { Component } from 'react'
import { User } from "../components/User";
import { HeaderSquareBlock, AuthorBlock, Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { CustomSelect, Button, ButtonHandler, BigButton, BigButtonWithIcon, InlineBigButtonWithIcon, InlineBigButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import Wave from 'react-wavify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faCoins, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService, questionsService } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Select from 'react-select';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";
import { Header, Navigation } from "../components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Tags } from "../components/Tags";
import { SubjectColor, Subjects } from "../constants";

class PCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maincolor: "#551a8b",
            selectedSubjectOption: null,

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
        };
    }

    submit() {

    }

    renderTextInput() {
        const selectedSubjectOption = this.state.selectedSubjectOption;

        return (
            <div>
                <CustomSelect
                    value={selectedSubjectOption}
                    onChange={(selectedOption) => {
                        this.setState({
                            selectedSubjectOption: selectedOption,
                        });
                    }}
                    options={Subjects}
                    placeholder="Выберите предмет"
                />
                <Tags
                    onChange={(tags) => {
                        this.setState({ tags: tags })
                    }}
                />
                <BlockLine color="rgb(133, 133, 138)">Вопрос</BlockLine>
                <textarea className="textBox" rows="4" placeholder="Название"></textarea>
                <BlockLine color="rgb(133, 133, 138)">Стоимость</BlockLine>
                <input className="inputBox" type="number" rows="4" placeholder="Стоимость"></input>
                <BlockLine color="rgb(133, 133, 138)">Выполнить до</BlockLine>
                <input className="inputBox" type="date" rows="4"></input>
                <div style={{ textAlign: "right", marginTop: "16px" }}>
                    <Button title="Проверьте Ваш вопрос" />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header prefix="Создай вопрос," user={this.state.user} />
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
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Сформулировать вопрос</BlockTitle>
                                    {this.renderTextInput()}
                                </Block>
                            </Col>
                            <Col xs={12} md={8}>
                                <Block color="white">
                                    <BlockTitle color="rgb(69, 68, 79)" text="bold">Похожие вопросы</BlockTitle>
                                    <MiniQuestion>
                                        <Row>
                                            <Col>
                                                <QuestionTitle>Рещение задачи по ТСАУ</QuestionTitle>
                                                <QuestionBody max={128} text="Russ Cox was raised by a pack of crazed hillbillies in the backwoods of Tennessee. With the bulk of his life spent in Pennsylvania, he met his wife; became a graphic designer; played in punk, alternative " />
                                                <AuthorBlock author={"Русс"} date={"28"} profilePic={""} authorid={0} />
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
}

export default withCookies(PCreate);