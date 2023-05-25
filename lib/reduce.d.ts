import type { EditorState, Kinds, Schema } from "./state.js";
import type { EditorAction } from "./actions.js";
export declare const makeReducer: <S extends Schema>(kinds: Kinds<S>) => (state: EditorState<S>, action: EditorAction<S>) => EditorState<S>;
export declare function reduce<S extends Schema>(kinds: Kinds<S>, state: EditorState<S>, action: EditorAction<S>): EditorState<S>;
