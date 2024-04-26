/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { DashCisl } from '../lib';

class App extends Component {

    constructor() {
        super();
        this.state = {
            value: [0, 25000],
            step: 1,
            digits: 0,
            min: 0,
            max: 816421,
            digits: 0
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
                <DashCisl
                    setProps={this.setProps}
                    {...this.state}
                />
        )
    }
}

export default App;
