import React, { Component, Suspense, lazy } from "react";
import { AutoComplete, Button, Card, Col, Divider, Drawer, Layout, Row, Select, Tag, Tooltip } from "antd";

import { connect } from "react-redux";
import * as IRedux from "../../redux/reduxInterface";

import * as PlayfieldTypes from "../../redux/store/playfield/types";
import Playfield from "../playfield/index";

const { Header, Footer, Sider, Content } = Layout;


interface IProps extends IRedux.IPropsRedux { }

interface IState { }

class App extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {};

  }

  componentDidMount() { }

  //
  // render
  //
  public render() {
    return (
      <div
        style={{
          width: "30%",
          margin: "10pt auto"
        }}
      >
        <Card
          style={{
            backgroundColor: "#FFE9C6"
          }}
          title="Kleine 1x1"
          extra={
            <Button
              size="large"
              onClick={(e) => {
                this.props.reduxActionsPlayfield.startMultiplicationGame();
              }}
            >
              {"Start"}
            </Button>
          }
          bodyStyle={{
            backgroundColor: "ghostwhite"
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "center"
            }}
          >
            <div
              style={{ paddingRight: 10 }}
            >
              {"Erreiche als Ergebnis"}
            </div>
            <Tag
              style={{
                fontSize: 20,
                textAlign: "center"
              }}
            >
              {this.props.reduxStatePlayfield.playfieldMultiplication?.multiplicationTarget}
            </Tag>

          </div>


          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Playfield />
          </div>

          <div
            style={{
              paddingTop: 30,
              display: "flex",
              flexFlow: "row",
              justifyContent: "left"
            }}
          >
            <div
              style={{ paddingRight: 10 }}
            >
              {"Fehlversuche:"}
            </div>
            <Tag
              style={{
                fontSize: 20,
              }}
            >
              {this.props.reduxStatePlayfield.playfieldMultiplication?.missed}
            </Tag>
          </div>

        </Card>

      </div>
    );
  }
}

export default connect(IRedux.mapStateToProps, IRedux.mapDispatchToProps)(App);
