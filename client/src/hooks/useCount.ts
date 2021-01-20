import { useRef } from "react";

export default function useCount() {
  const count = useRef(0);

  const increment = () => {
    count.current++;
    return count.current;
  };

  const decrement = () => {
    count.current--;
    return count.current;
  };

  const reset = () => {
    count.current = 0;
  };

  return [count.current, increment, decrement, reset];
}
