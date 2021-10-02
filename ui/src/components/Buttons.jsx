import React, { Component } from 'react'
import '../css/Buttons.css';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

export class CustomInputFile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTagsOption: null,
            tags: new Set(),
        }
    }

    render() {
        return (
            <div>
                <label for="upload-photo">Browse...</label>
                <input type="file" name="photo" id="upload-photo" />
            </div>
        )
    }
}