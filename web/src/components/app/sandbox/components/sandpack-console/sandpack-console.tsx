import { useSandpackConsole } from "@codesandbox/sandpack-react";
import { useEffect, useRef, useState } from "react";
import { Console } from "console-feed";
import type { Message } from "console-feed/lib/definitions/Component";
import { SquareCode } from "lucide-react";

import "./sandpack-console.css";

export const SandpackConsole = () => {
  const { logs } = useSandpackConsole({
    resetOnPreviewRestart: false,
    maxMessageCount: 100,
  });

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const consoleRef = useRef<HTMLDivElement | null>(null);

  const messages: Message[] = logs.map((log) => {
    return {
      id: log.id,
      data: log.data,
      method: log.method,
    } as Message;
  });

  const handleConsoleVisibility = () => {
    setCollapsed((collapsed: boolean) => !collapsed);
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className={collapsed ? `sandpack-console collapsed` : `sandpack-console`}
    >
      <button
        className="sandpack-console__toggle"
        onClick={handleConsoleVisibility}
      >
        <SquareCode className="sandpack-console__toggle-icon" />
      </button>
      <div
        ref={consoleRef}
        className={
          collapsed
            ? "sandpack-console__container collapsed"
            : "sandpack-console__container"
        }
      >
        <Console
          logs={messages}
          variant="dark"
          styles={{
            BASE_FONT_FAMILY: `"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace`,
            BASE_FONT_SIZE: "14px",
            BASE_LINE_HEIGHT: 1.4,
            LOG_BACKGROUND: "#242424ff",
            LOG_COLOR: "#d4d4d4",
            LOG_BORDER: "none",
            LOG_ERROR_BACKGROUND: "#2d1b1b",
            LOG_WARN_BACKGROUND: "#2d2b1b",
            LOG_INFO_BACKGROUND: "#1b2d2d",
          }}
        />
      </div>
    </div>
  );
};
