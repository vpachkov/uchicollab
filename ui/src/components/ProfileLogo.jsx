import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import '../css/Header.css';

export class ProfileLogo extends Component {
    render() {
        return (
            <img className="profileImage" height={this.props.height} width={this.props.width} src={this.props.src}/>
        )
    }
}