//Dependencies
import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Layout } from "antd";
import { Link } from "react-router";

//CSS
import "./App.css";
import "./style/style.scss";

//Component
import AppRouter from "./route/appRouter";
import logo from "./assets/logo.png";
const { Header, Content } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Layout className={"app-layout"}>
        <Header className={"app-header"}>
          <Link to={"/user"}>
            <span className={"header-left"}>
              <img src={logo} alt={"App Logo"} />
              <p className={"app-name text-primary"}>User Data</p>
            </span>
          </Link>
        </Header>
        <Content className={"app-body"}>
          <AppRouter />
        </Content>
      </Layout>
    </Provider>
  );
}
export default App;
