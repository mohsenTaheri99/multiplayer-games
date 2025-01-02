import { wsMessageFromClient, wsMessageFromServer } from "ws-message-types";
export const createWS = async (url: string) => {
  const webSocket = new WebSocket(url);

  await new Promise<void>((resolve, reject) => {
    webSocket.addEventListener("open", () => {
      console.log(" WebSocket connection established.");
      resolve();
    });
    webSocket.addEventListener("error", (error) => {
      console.error("WebSocket connection failed:", error);
      reject(new Error("WebSocket connection failed."));
    });
  });

  const handleMessage = (event: MessageEvent) => {};

  const handleClose = () => {
    console.log("WebSocket connection closed.");
  };

  const handleError = (error: Event) => {
    console.error("WebSocket encountered an error:", error);
  };

  webSocket.addEventListener("message", handleMessage);
  webSocket.addEventListener("close", handleClose);
  webSocket.addEventListener("error", handleError);

  return {
    send: (message: wsMessageFromClient) => {
      if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify(message));
      } else {
        console.warn("Cannot send message: WebSocket is not open.");
      }
    },
    disconnect: () => {
      webSocket.close();
    },
    onMessage: (callback: (data: wsMessageFromServer) => void) => {
      webSocket.addEventListener("message", (event) => {
        try {
          const data = JSON.parse(event.data) as wsMessageFromServer;
          callback(data);
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
      });
    },
  };
};
