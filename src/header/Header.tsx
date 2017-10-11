import * as React from 'react';
import './Header.css';

export class Header extends React.Component {
    private logo: any;

    constructor() {
        super();

        this.logo = require('./img/logo.svg');
    }

    render() {
        return (
            <div className="header">
                <div className="header-header">
                    <img src={this.logo} className="header-logo" alt="logo" />
                    <h2>Welcome to Snake</h2>
                </div>
            </div>
        );
    }
}