import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { ProfileLogo } from "./ProfileLogo";

export class User extends Component {
    render() {
        return (
            <div className="greetingNameHandler">
                <div className="greetingName">
                    Привет,
                </div>
                <ProfileLogo height="56px" width="56px" src={this.props.user.profilePic}/>
                <div className="greetingName">
                    {this.props.user.name}
                </div>
            </div>
        )
    }
}