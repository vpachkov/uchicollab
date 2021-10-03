import React, { Component } from 'react'
import '../css/Buttons.css';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

export class BigButton extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="bigButton" style={{ backgroundColor: this.props.color }}>
                {this.props.title}
            </div>
        )
    }
}

export class BigButtonWithIcon extends Component {
    render() {
        var tinycolor = require("tinycolor2");
        var backgroundColor = this.props.backgroundColor === undefined ? "white" : this.props.backgroundColor
        var color = this.props.color === undefined ? tinycolor(backgroundColor).darken(50).toString() : this.props.color

        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="bigButton" style={{ color: color, backgroundColor: backgroundColor }}>
                <FontAwesomeIcon icon={this.props.icon} /> <span style={{ marginLeft: "4px" }}>{this.props.title}</span>
            </div>
        )
    }
}

export class Button extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="button">
                {this.props.title}
            </div>
        )
    }
}

export class ButtonGray extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="buttonGray">
                {this.props.title}
            </div>
        )
    }
}

export class InlineBigButton extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="inlineBigButton">
                {this.props.title}
            </div>
        )
    }
}

export class InlineBigButtonWithIcon extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="inlineBigButton">
                <FontAwesomeIcon color="rgb(133, 133, 138)" icon={this.props.icon} /> <span style={{ marginLeft: "4px" }}>{this.props.title}</span>
            </div>
        )
    }
}

export class InlineButton extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="inlineButton">
                {this.props.title}
            </div>
        )
    }
}

export class InlineButtonWithIcon extends Component {
    render() {
        return (
            <div onClick={() => {
                this.props.onClick()
            }} className="inlineButton">
                <FontAwesomeIcon color="rgb(133, 133, 138)" icon={this.props.icon} /> <span style={{ marginLeft: "4px" }}>{this.props.title}</span>
            </div>
        )
    }
}

export class ButtonHandler extends Component {
    render() {
        return (
            <div className="buttonHandler">
                {this.props.children}
            </div>
        )
    }
}

export class CustomSelect extends Component {
    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            color: "rgb(69, 68, 79)",
        }),
    }

    render() {
        var tinycolor = require("tinycolor2");

        return (
            <Select
                id={this.props.id}
                styles={this.customStyles}
                className="textSelector"
                value={this.props.value}
                onChange={this.props.onChange}
                options={this.props.options}
                placeholder={this.props.placeholder}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary25: '#d7f4d2',
                        primary50: tinycolor('#d7f4d2').darken(6).toString(),
                        primary75: tinycolor('#d7f4d2').darken(20).toString(),
                        primary: tinycolor('#d7f4d2').darken(50).toString(),
                    },
                })}
            />
        )
    }
}

export class CustomAddableSelect extends Component {
    customStyles = {
        menu: (provided, state) => ({
            ...provided,
            color: "rgb(69, 68, 79)",
        }),
    }

    render() {
        var tinycolor = require("tinycolor2");

        return (
            <Creatable
                id={this.props.id}
                styles={this.customStyles}
                className="textSelector"
                value={this.props.value}
                onChange={this.props.onChange}
                options={this.props.options}
                placeholder={this.props.placeholder}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        primary25: '#d7f4d2',
                        primary50: tinycolor('#d7f4d2').darken(6).toString(),
                        primary75: tinycolor('#d7f4d2').darken(20).toString(),
                        primary: tinycolor('#d7f4d2').darken(50).toString(),
                    },
                })}
            />
        )
    }
}

export class CustomInputFile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openedFile: "",
        }
    }

    render() {
        var id = this.props.id === undefined ? "upload__photo" : this.props.id

        return (
            <div>
                <label className="attachFiles" for={id}><FontAwesomeIcon style={{ marginRight: "4px" }} icon={faPaperclip} /> Приложить файлы</label>
                <div className="attachFileText">{this.state.openedFile}</div>
                <input
                    style={{ visibility: "hidden" }}
                    name={this.props.name}
                    id={id}
                    type={this.props.type}
                    accept={this.props.accept}
                    onChange={(event) => {
                        this.setState({
                            openedFile: event.target.files[0].name
                        }, this.props.onChange(event))
                    }} />
            </div>
        )
    }
}