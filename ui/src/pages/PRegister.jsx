import React, { Component } from 'react'
import { User } from "../components/User";
import { Span, AbstractBlock, Block, BlockTitle, BlockText, BlockLine, BlockSpacing, CommentBlock, CommentText, SquareBlock, AbstractBetweenSpacingBlock, SquareBlockImage, SquareBlockText, KeywordBlock } from "../components/Blocks";
import { ProgressBar } from "../components/ProgressBar";
import { CustomSelect, Button, ButtonHandler, BigButton, BigButtonWithIcon, InlineBigButtonWithIcon, InlineBigButton, InlineButton } from "../components/Buttons";
import { MiniQuestion, QuestionTitle, QuestionBody, QuestionLable } from "../components/Questions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Wave from 'react-wavify'
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock, faCoins, faUser, faPlus, faArrowAltCircleLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Post, profileService } from "../config";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Select from 'react-select';
import { ProfileLogo } from "../components/ProfileLogo";
import history from "../history";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Tags } from "../components/Tags";
import { SubjectColor, Subjects } from "../constants";

class PRegister extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            selectedSubjectOption: null,
            subjectInterest: new Set(),
        };
    }

    componentDidMount() {
        // this.loadComments()
    }

    submit() {

    }

    render() {
        const selectedSubjectOption = this.state.selectedSubjectOption;

        return (
            <div className="loginPage">
                <Wave className="loginWave" fill='#f4f5f6'
                    paused={false}
                    options={{
                        height: 8,
                        amplitude: 20,
                        speed: 0.10,
                        points: 10
                    }}
                />
                <Col className="zindex1" xs={10} sm={8} md={6} lg={7}>
                    <Block color="white">
                        <Row>
                            <Col>
                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Регистрация</BlockTitle>
                                <BlockLine color="rgb(133, 133, 138)">Логин*</BlockLine>
                                <input className="inputBox" rows="4" placeholder="Придумайте логин" required></input>
                                <BlockLine color="rgb(133, 133, 138)">Пароль*</BlockLine>
                                <input className="inputBox" type="password" rows="4" placeholder="Придумайте пароль"></input>
                                <BlockLine color="rgb(133, 133, 138)">Повторить пароль*</BlockLine>
                                <input className="inputBox" type="password" rows="4" placeholder=""></input>
                                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"/>
                                <BlockLine color="rgb(133, 133, 138)"></BlockLine>
                            </Col>
                            <Col>
                                <BlockTitle color="rgb(69, 68, 79)" text="bold">Мой профиль</BlockTitle>
                                <BlockLine color="rgb(133, 133, 138)">Место обучение</BlockLine>
                                <input className="inputBox" rows="4" placeholder="Например, Школа 1034"></input>
                                <BlockLine color="rgb(133, 133, 138)">Обо мне</BlockLine>
                                <textarea className="textBox" rows="3" placeholder="Я..."></textarea>
                                <BlockLine color="rgb(133, 133, 138)">Профиль</BlockLine>
                                <CustomSelect
                                    value={selectedSubjectOption}
                                    onChange={(selectedOption) => {
                                        const tags = this.state.subjectInterest
                                        tags.add(selectedOption.label)
                                        this.setState({ subjectInterest: tags })
                                    }}
                                    options={Subjects}
                                    placeholder="Выберите предмет"
                                />
                                <AbstractBlock color="white">
                                    {
                                        this.state.subjectInterest === undefined ? null :
                                            [...this.state.subjectInterest].map(tag => {
                                                return (
                                                    <KeywordBlock subject={tag}>
                                                        <span style={{ marginRight: "4px" }}>{tag}</span>
                                                        <FontAwesomeIcon
                                                            icon={faTimes}
                                                            style={{ fontSize: ".8em" }}
                                                            onClick={() => {
                                                                const tags = this.state.subjectInterest
                                                                tags.delete(tag)
                                                                this.setState({ subjectInterest: tags })
                                                            }}
                                                        />
                                                    </KeywordBlock>
                                                )
                                            })
                                    }
                                </AbstractBlock>
                                <div style={{ textAlign: "right", marginTop: "16px" }}>
                                    <InlineButton onClick={() => {
                                        history.push('/login')
                                    }} title="Вход" />
                                    <Button onClick={() => {
                                        console.log("Enter")
                                    }} title="Регистрация" />
                                </div>
                            </Col>
                        </Row>
                    </Block>
                </Col>
            </div >
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

export default withCookies(PRegister);