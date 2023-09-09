import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ItemProps } from './json/DemoItem.ts'
import './index.css'

declare global {
  interface Window {
    Android?: {
      showToast: (message: string) => void | undefined;
      getItem: () => string | void;
      webViewIsVisible: () => void | undefined;
      zombie: () => void | undefined;
      userHPUp: (num: number) => void | undefined;
      userHPDown: (num: number) => void | undefined;
      userGetItem: (item: ItemProps[string]) => void | undefined;
      userLoseItem: (item: ItemProps[string]) => void | undefined;
      selectDeathToRevival: () => void | undefined;
    },
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
      showToast: (message: string) => void | undefined;
      getItem: () => string | void;
      webViewIsVisible: () => void | undefined;
    };
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
)
