
module DashCisl
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/dashcisl.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_cisl",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dash_cisl.min.js",
    external_url = "https://unpkg.com/dash_cisl@0.0.1/dash_cisl/dash_cisl.min.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_cisl.min.js.map",
    external_url = "https://unpkg.com/dash_cisl@0.0.1/dash_cisl/dash_cisl.min.js.map",
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
