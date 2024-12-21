import { FC, useCallback, useEffect, useRef, useState } from "react";

interface EditorProps {}

const Editor: FC<EditorProps> = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [text, setText] = useState<string>("");
  console.log(text);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!textareaRef || !textareaRef.current) {
        e.preventDefault();
        return;
      }

      const start = textareaRef.current.selectionStart ?? 0;
      const end = textareaRef.current.selectionEnd ?? 0;

      switch (e.key) {
        case "Tab":
          setText(`${text.substring(0, start)}  ${text.substring(end)}`);
          // ensure the cursor position is not lost
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              textareaRef.current.setSelectionRange(start + 2, start + 2);
            }
          });
          e.preventDefault();
          break;
        default:
          break;
      }
    },
    [text]
  );

  useEffect(() => {
    const textareaElement = textareaRef?.current;
    textareaElement?.addEventListener("keydown", handleKeyDown);
    return () => {
      textareaElement?.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, textareaRef]);

  return <textarea ref={textareaRef} value={text} onChange={handleChange} />;
};

export { Editor };
