declare global {
    interface Window {
      webkit: {
        messageHandlers: {
          spWebNovel: {
            postMessage: (parameter: string) => void;
          };
        };
      };
      // 안드와 통신할 때 주고 받을 객체를 나눴다
      androidWebApi: {
        initContent: (parameter: InitContent) => void;
      androidWebViewApi: {
        spWebNovel: (parameter: string) => void;
      };
  
      initContent: (parameter: InitContent) => void;
    }
  }
}

export {};