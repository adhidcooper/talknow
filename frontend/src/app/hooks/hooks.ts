import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch; // Typed dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;  