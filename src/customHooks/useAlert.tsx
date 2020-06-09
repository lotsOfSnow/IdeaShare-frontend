import { Color } from "@material-ui/lab";
import { useState } from "react";

function useAlert(initialText: string, initialSeverity: Color) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(initialText);
  const [severity, setSeverity] = useState(initialSeverity);

  return { isOpen, setIsOpen, text, setText, severity, setSeverity };
}

export default useAlert;
