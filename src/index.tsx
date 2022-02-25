// import "@babel/polyfill";
import { ConfigProvider } from "antd";
import deDE from "antd/lib/locale-provider/de_DE";
import * as React from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import * as ReactDOM from "react-dom";
import App from "./views/viewApp/index";

import * as serviceWorker from './serviceWorker';
import './index.css';

import { Provider } from "react-redux";
import configureStore from "./redux/store/index";

const store = configureStore();

interface IComponentError {
  hasError: boolean;
  error: any;
  info: any;
}

/**
 * Zeigt Laufzeit-Fehler an.
 */
class ErrorBoundary extends React.Component<{}, IComponentError> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: {}, info: {} };
  }

  public componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
    //console.log("ERROR", error)
    //console.log("INFO ", info)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1>Sorry, something went wrong.</h1>
          <br />
          <h5>{"Got Error:"}</h5>
          <pre>{this.state.error.message}</pre>
          <br />
          <h5>{"Information:"}</h5>
          <pre>{this.state.info.componentStack}</pre>
        </section>
      );
    } else {
      return this.props.children || null;
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <ConfigProvider locale={deDE}>
        <DragDropContextProvider backend={HTML5Backend} >
          <App />
        </DragDropContextProvider>
      </ConfigProvider >
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
