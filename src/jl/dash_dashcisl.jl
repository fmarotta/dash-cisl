# AUTO GENERATED FILE - DO NOT EDIT

export dash_dashcisl

"""
    dash_dashcisl(;kwargs...)

A DashCisl component.
Cisl

A circular slider component. Features and customisation are somewhat limited
to what I need for my work. It has two handles which can be moved either
independently or at the same time (to shift the whole range). Handes can also
be moved with arrow keys, WASD keys, or the mouse wheel.
Keyword arguments:
- `id` (String; optional): The id of the circular slider.
- `breaks_altitude` (Real; optional): The height of the breaks.
- `breaks_n` (Real; optional): The total number of breaks in the 'ruler'.
- `digits` (Real; optional): The number of digits in the labels.
- `labels_altitude` (Real; optional): The height of the labels.
- `major_breaks_every` (Real; optional): Put a major break every ... breaks.
- `max` (Real; optional): Maximum value taken by the slider.
- `min` (Real; optional): Minimum value taken by the slider.
- `postfix` (String; optional): The postfix for the labels.
- `prefix` (String; optional): The prefix for the labels.
- `rails_border_width` (Real; optional): The thickness of the border of the rails.
- `rails_width` (Real; optional): The width of the rails.
- `step` (Real; optional): The initial value of the 'from' handle.
- `value` (Array of Reals; optional): Internal state, used by Dash.
- `values_sep` (String; optional): The separator for the labels.
"""
function dash_dashcisl(; kwargs...)
        available_props = Symbol[:id, :breaks_altitude, :breaks_n, :digits, :labels_altitude, :major_breaks_every, :max, :min, :postfix, :prefix, :rails_border_width, :rails_width, :step, :value, :values_sep]
        wild_props = Symbol[]
        return Component("dash_dashcisl", "DashCisl", "dash_cisl", available_props, wild_props; kwargs...)
end

