import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export default function NumberFilter(props, ref) {
  useImperativeHandle(ref, () => {
    return {
      isFilterActive() {
        return false
      },
      doesFilterPass(params) {
        return false
      },
      getModel() {
          return undefined;
      },
      setModel(){

      }
    };
  });

  return <div>NumberFilter</div>;
}
