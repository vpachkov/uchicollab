import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import '../css/Main.css';
import { ProfileLogo } from "./ProfileLogo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Subjects, SubjectColor } from "../constants";
import { Row, Col } from "react-bootstrap";

export class Block extends Component {
    render() {
        return (
            <div className="block" style={{ backgroundColor: this.props.color }}>
                {this.props.children}
            </div>
        )
    }
}

export class AbstractBlock extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


export class BlockTitle extends Component {
    render() {
        return (
            <div className="blockTitle" style={{ color: this.props.color, fontWeight: this.props.text }}>
                {this.props.children}
            </div>
        )
    }
}

export class BlockText extends Component {
    render() {
        return (
            <div className="blockText" style={{ color: this.props.color, fontWeight: this.props.text }}>
                {this.props.children}
            </div>
        )
    }
}

export class BlockLine extends Component {
    render() {
        return (
            <div className="blockLine" style={{ color: this.props.color, fontWeight: this.props.text }}>
                {this.props.children}
            </div>
        )
    }
}

export class Span extends Component {
    render() {
        return (
            <div className="spanInBlock" style={{ color: this.props.color, fontWeight: this.props.fontWeight }}>
                {this.props.children}
            </div>
        )
    }
}

export class BlockSpacing extends Component {
    render() {
        return (
            <div style={{ width: "100%", height: this.props.size }}></div>
        )
    }
}

export class CommentBlock extends Component {
    render() {
        var stars = []
        for (var i = 0; i < 5; i++) {
            if (i < this.props.raiting) {
                stars.push(<FontAwesomeIcon icon={faStar} />)
            } else {
                stars.push(<FontAwesomeIcon icon={faStar} style={{ opacity: ".3" }} />)
            }
        }
        return (
            <div style={{ color: this.props.textColor }}>
                <div className="commentBlock" style={{ backgroundColor: this.props.color, color: this.props.textColor }}>
                    {this.props.children}
                    {stars}
                </div>
                <div className="commentAuthorBlock" style={{ color: this.props.textColor }}>
                    <span style={{ marginRight: "8px" }}>{this.props.user.name}</span><ProfileLogo height="16px" width="16px" src={this.props.user.profilePic} />
                </div>
            </div>
        )
    }
}

export class CommentText extends Component {
    render() {
        var rt = this.props.text
        if (this.props.max != -1 && rt.length > this.props.max) {
            rt = rt.substring(0, this.props.max - 3) + "..."
        }
        return (
            <div>
                {rt}
            </div>
        )
    }
}

export class MessageBlock extends Component {
    render() {
        var bg = this.props.isMine === true ? "rgb(194,226,230)" : "rgb(203,216,226)"
        var fl = this.props.isMine === true ? "right" : "lift"
        var borderTL = this.props.isMine === true ? "12px" : "4px"
        var borderBR = this.props.isMine === true ? "4px" : "12px"

        return (
            <div style={{ color: this.props.textColor, textAlign: fl }}>
                <div>
                    <div className="messageBlock" style={{ backgroundColor: bg, borderTopLeftRadius: borderTL, borderBottomRightRadius: borderBR }}>
                        {this.props.text}
                    </div>
                    <div style={{ fontSize: ".7em", color: "lightgray" }}>{this.props.time} от <ProfileLogo height="8px" width="8px" src={this.props.profilePic} /> {this.props.author}</div>
                </div>
            </div>
        )
    }
}

export class AbstractAroundSpacingBlock extends Component {
    render() {
        return (
            <div className="aroundSpacingBlock" style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

export class AbstractBetweenSpacingBlock extends Component {
    render() {
        return (
            <div className="betweenSpacingBlock" style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

export class HeaderSquareBlock extends Component {
    render() {
        return (
            <div className="headerSquareBlock" style={{ backgroundColor: this.props.color }}>
                {this.props.children}
            </div>
        )
    }
}

export class SquareBlock extends Component {
    render() {
        return (
            <div className="squareBlock" style={{ backgroundColor: this.props.color }}>
                {this.props.children}
            </div>
        )
    }
}

export class SquareBlockImage extends Component {
    render() {
        return (
            <div className="squareBlockImage" style={{ backgroundColor: this.props.color }} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}

export class SquareBlockText extends Component {
    render() {
        return (
            <div className="squareBlockText" style={{ color: this.props.color }}>
                {this.props.children}
            </div>
        )
    }
}

export class KeywordBlock extends Component {
    render() {
        var tinycolor = require("tinycolor2");
        var backgroundColor = this.props.backgroundColor
        var color = this.props.color
        for (var subj of Subjects) {
            if (subj.label === this.props.subject) {
                backgroundColor = tinycolor(SubjectColor[subj.value]).lighten(10).toString()
                color = tinycolor(backgroundColor).darken(50).toString()
            }
        }

        return (
            <div className="keywordBlock" style={{ backgroundColor: backgroundColor, color: color }}>
                {this.props.children}
            </div>
        )
    }
}

export class AuthorBlock extends Component {
    render() {
        return (
            <div className="commentAuthorBlock">
                <span style={{ marginRight: "8px" }}>{this.props.date ? this.props.date + "," : ""}</span> <ProfileLogo height="16px" width="16px" src={this.props.profilePic} /><span><a href={`/user/` + this.props.authorid}>{this.props.author}</a></span>
            </div>
        )
    }
}