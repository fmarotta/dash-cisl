/* eslint no-magic-numbers: 0 */
import React, { useState } from 'react';

import { DashCisl } from '../lib';

const App = () => {

    const [state, setState] = useState({
        min: 0,
        max: 100,
        value: [0, 10],
        rails_width: 10,
        rails_border_width: 2,
        breaks_n: 50,
        step: 2,
        major_breaks_every: 5,
        breaks_altitude: 20,
        labels_altitude: 30,
        prefix: "",
        postfix: "",
        values_sep: ":",
        digits: 0,
    });
    const setProps = (newProps) => {
        setState(newProps);
    };

    return (
        <div>
            <DashCisl
                setProps={setProps}
                {...state}
            />
        </div>
    )
};


export default App;
