# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dashCisl <- function(id=NULL, breaks_altitude=NULL, breaks_n=NULL, digits=NULL, labels_altitude=NULL, major_breaks_every=NULL, max=NULL, min=NULL, postfix=NULL, prefix=NULL, rails_border_width=NULL, rails_width=NULL, step=NULL, value=NULL, values_sep=NULL) {
    
    props <- list(id=id, breaks_altitude=breaks_altitude, breaks_n=breaks_n, digits=digits, labels_altitude=labels_altitude, major_breaks_every=major_breaks_every, max=max, min=min, postfix=postfix, prefix=prefix, rails_border_width=rails_border_width, rails_width=rails_width, step=step, value=value, values_sep=values_sep)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashCisl',
        namespace = 'dash_cisl',
        propNames = c('id', 'breaks_altitude', 'breaks_n', 'digits', 'labels_altitude', 'major_breaks_every', 'max', 'min', 'postfix', 'prefix', 'rails_border_width', 'rails_width', 'step', 'value', 'values_sep'),
        package = 'dashCisl'
        )

    structure(component, class = c('dash_component', 'list'))
}
