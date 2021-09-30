import React, { Component, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import '../css/Main.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export class ProgressBar extends Component {
    render() {
        const bars = []
        this.props.content.map((item, index) => {
            bars.push(
                <div className="circularProgressbarHandler">
                    <div style={{ width: 150, height: 150, display: 'inline-block' }}>
                        <CircularProgressbar value={item.percentage} text={`${item.percentage}%`} styles={{
                            root: {},
                            path: {
                                stroke: item.color,
                            },
                            trail: {
                                stroke: '#fff',
                                strokeLinecap: 'butt',
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            text: {
                                fill: '#fff',
                                fontSize: '16px',
                            },
                            background: {
                                fill: '#fff',
                            },
                        }} />
                    </div>
                    <div className='text'>{item.name}</div>
                </div>);
        })
        return (
            <div className="progressbarHandler">
                {bars}
            </div>
        )
    }
}