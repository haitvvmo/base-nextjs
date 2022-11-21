/* eslint-disable react/display-name */
import { createRef, forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";

import { RootState } from "store/reducers";

import { useSelector } from "common/hooks/useSelector";

type ActionBase<T = any> = {
  type: string;
  payload?: T;
};

const RXStoreComponent = forwardRef((props, ref) => {
  const rnDispatch = useDispatch();
  const store = useSelector((x) => x);

  // effect
  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: ActionBase) => {
        rnDispatch(action);
      },
      getState: (state: keyof RootState) => {
        return store[state];
      },
    }),
    [rnDispatch, store]
  );
  return null;
});

type RXStoreType = {
  dispatch: (action: ActionBase) => void;
  getState: <K extends keyof RootState>(selector: K) => RootState[K];
};

const storeRef = createRef<RXStoreType>();

export const RXStore = () => <RXStoreComponent ref={storeRef} />;

export const dispatch = (action: ActionBase) => {
  if (storeRef.current) {
    storeRef.current.dispatch(action);
  }
};
export function getState<K extends keyof RootState>(selector: K): RootState[K] {
  if (storeRef.current) {
    return storeRef.current.getState(selector);
  }
  return {} as RootState[K];
}
