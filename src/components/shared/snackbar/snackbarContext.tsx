import { createContext } from "react";

interface SnackbarContextProps {
  onOpen: () => void;
  text: string;
  setText: (newText: string) => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
  onOpen: () => undefined,
  setText: (newText: string) => undefined,
  text: "",
});

export default SnackbarContext;
