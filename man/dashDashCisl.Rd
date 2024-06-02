% Auto-generated: do not edit by hand
\name{dashDashCisl}

\alias{dashDashCisl}

\title{DashCisl component}

\description{
Cisl  A circular slider component. Features and customisation are somewhat limited to what I need for my work. It has two handles which can be moved either independently or at the same time (to shift the whole range). Handes can also be moved with arrow keys, WASD keys, or the mouse wheel.
}

\usage{
dashDashCisl(id=NULL, breaks_altitude=NULL, breaks_n=NULL, digits=NULL,
labels_altitude=NULL, major_breaks_every=NULL, max=NULL,
min=NULL, postfix=NULL, prefix=NULL,
rails_border_width=NULL, rails_width=NULL, step=NULL,
value=NULL, values_sep=NULL)
}

\arguments{
\item{id}{Character. The id of the circular slider.}

\item{breaks_altitude}{Numeric. The height of the breaks.}

\item{breaks_n}{Numeric. The total number of breaks in the 'ruler'.}

\item{digits}{Numeric. The number of digits in the labels.}

\item{labels_altitude}{Numeric. The height of the labels.}

\item{major_breaks_every}{Numeric. Put a major break every ... breaks.}

\item{max}{Numeric. Maximum value taken by the slider.}

\item{min}{Numeric. Minimum value taken by the slider.}

\item{postfix}{Character. The postfix for the labels.}

\item{prefix}{Character. The prefix for the labels.}

\item{rails_border_width}{Numeric. The thickness of the border of the rails.}

\item{rails_width}{Numeric. The width of the rails.}

\item{step}{Numeric. The initial value of the 'from' handle.}

\item{value}{List of numerics. Internal state, used by Dash.}

\item{values_sep}{Character. The separator for the labels.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

