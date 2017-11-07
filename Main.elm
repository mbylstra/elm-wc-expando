module Main exposing (..)

import Html exposing (Html, div, text, node, p, button)
import Html.Attributes exposing (attribute)
import Html.Events exposing (onClick)

webComponent : String -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
webComponent = node


type alias Model =
    { open : Bool }

type Msg = Toggle

init : Model
init =
    { open = False }

update : Msg -> Model -> Model
update msg model =
    case msg of
        Toggle ->
            { model | open = not model.open }

view : Model -> Html Msg
view model =
    div []
        [ webComponent
            "expandable-container"
            [ attribute "open" (if model.open then "true" else "false")]
            [ p [] [ text <| String.repeat 100 (if model.open then "HELLO " else "hello ") ] ]
        , button [ onClick Toggle ] [ text "toggle" ]
        , text <| "open: " ++ (toString model.open)
        ]

main : Program Never Model Msg
main = Html.beginnerProgram
    { model = init
    , view = view
    , update = update
    }
