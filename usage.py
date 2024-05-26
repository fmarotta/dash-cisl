import dash_cisl
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)

app.layout = html.Div([
    dash_cisl.DashCisl(
        id='input',
        step=1,
        value=[0, 10],
        min=0,
        max=350,
        digits=0,
    ),
    html.Div(id='output')
])


@app.callback(Output('output', 'children'), [Input('input', 'value')])
def display_output(value):
    return f'You have entered {value[0]}, {value[1]}'


if __name__ == '__main__':
    app.run_server(debug=True)
