# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashCisl(Component):
    """A DashCisl component.
Cisl

A circular slider component. Features and customisation are somewhat limited
to what I need for my work. It has two handles which can be moved either
independently or at the same time (to shift the whole range). Handes can also
be moved with arrow keys, WASD keys, or the mouse wheel.

Keyword arguments:

- id (string; optional):
    The id of the circular slider.

- breaks_altitude (number; default 30):
    The height of the breaks.

- breaks_n (number; default 50):
    The total number of breaks in the 'ruler'.

- digits (number; default 2):
    The number of digits in the labels.

- labels_altitude (number; default 12):
    The height of the labels.

- major_breaks_every (number; default 5):
    Put a major break every ... breaks.

- max (number; default 100):
    Maximum value taken by the slider.

- min (number; default 0):
    Minimum value taken by the slider.

- postfix (string; default ''):
    The postfix for the labels.

- prefix (string; default ''):
    The prefix for the labels.

- rails_border_width (number; default 2):
    The thickness of the border of the rails.

- rails_width (number; default 10):
    The width of the rails.

- step (number; default 0):
    The initial value of the 'from' handle.

- value (list of numbers; default [0, 25]):
    Internal state, used by Dash.

- values_sep (string; default ':'):
    The separator for the labels."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_cisl'
    _type = 'DashCisl'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, min=Component.UNDEFINED, max=Component.UNDEFINED, step=Component.UNDEFINED, breaks_n=Component.UNDEFINED, major_breaks_every=Component.UNDEFINED, rails_width=Component.UNDEFINED, rails_border_width=Component.UNDEFINED, breaks_altitude=Component.UNDEFINED, labels_altitude=Component.UNDEFINED, digits=Component.UNDEFINED, prefix=Component.UNDEFINED, postfix=Component.UNDEFINED, values_sep=Component.UNDEFINED, value=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'breaks_altitude', 'breaks_n', 'digits', 'labels_altitude', 'major_breaks_every', 'max', 'min', 'postfix', 'prefix', 'rails_border_width', 'rails_width', 'step', 'value', 'values_sep']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'breaks_altitude', 'breaks_n', 'digits', 'labels_altitude', 'major_breaks_every', 'max', 'min', 'postfix', 'prefix', 'rails_border_width', 'rails_width', 'step', 'value', 'values_sep']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DashCisl, self).__init__(**args)
