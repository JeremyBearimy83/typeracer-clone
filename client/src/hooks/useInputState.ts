import { useState } from "react";

const useInputState = (
  initialState = ""
): [string, (e: any) => void, () => void] => {
  const [value, setValue] = useState(initialState);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleReset = () => {
    setValue(initialState);
  };

  return [value, handleChange, handleReset];
};

export default useInputState;
