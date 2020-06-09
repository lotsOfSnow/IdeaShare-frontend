import { createContext } from "react";

interface AlertContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: (option: boolean) => void;
  selectedArticleId: number;
  selectArtcle: (newArticleId: number) => void;
}

const AlertContext = createContext<AlertContextProps>({
  isOpen: false,
  onOpen: () => undefined,
  onClose: () => false,
  selectedArticleId: -1,
  selectArtcle: () => undefined,
});

export default AlertContext;
