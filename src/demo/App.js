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
            max: 816421
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <DashCisl
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
