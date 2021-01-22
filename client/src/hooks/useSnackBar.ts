import { useState } from "react";

const useSnackBar = () => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const startTimer = () => {
    setShowSnackBar(true);
  };

  return [startTimer];
};
