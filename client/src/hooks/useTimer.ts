import { useRef } from "react";

export default function useTimer() {
  const time = useRef(0);
  const timer = useRef<any>();

  const startTimer = () => {
    timer.current = setInterval(() => {
      time.current++;
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer.current);
    return time.current;
  };

  return [startTimer, stopTimer];
}
