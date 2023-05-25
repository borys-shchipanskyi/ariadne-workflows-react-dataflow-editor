import React, { useCallback, useMemo, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toolbox } from "./Toolbox.js";
import { Canvas } from "./EditableCanvas.js";
import { focus } from "../actions.js";
import { CanvasContext } from "../context.js";
import { isFocusEqual } from "../utils.js";
import { defaultOptions } from "../options.js";
export function Editor(props) {
    const stateRef = useRef(props.state);
    stateRef.current = props.state;
    const dispatch = useCallback((action) => props.dispatch(action), []);
    const context = useMemo(() => {
        return {
            options: { ...defaultOptions, ...props.options },
            nodesRef: { current: null },
            edgesRef: { current: null },
            svgRef: { current: null },
            previewRef: { current: null },
            onFocus: (subject) => {
                if (!isFocusEqual(stateRef.current.focus, subject)) {
                    dispatch(focus(subject));
                }
            },
        };
    }, []);
    return (React.createElement(CanvasContext.Provider, { value: context },
        React.createElement(DndProvider, { backend: HTML5Backend },
            React.createElement("div", { className: "editor", style: { display: "flex", flexDirection: "row" } },
                React.createElement(Toolbox, { kinds: props.kinds }),
                React.createElement(Canvas, { kinds: props.kinds, state: props.state, dispatch: dispatch })))));
}
