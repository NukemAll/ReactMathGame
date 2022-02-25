import React, { Component } from "react";
import { AutoComplete, DatePicker, Input, Radio, Row } from "antd";
import { v4 as uuidv4 } from 'uuid';

import { connect } from "react-redux";
import * as IRedux from "../../redux/reduxInterface";

import Field from "../field/index";
import { IField } from "../../redux/store/playfield/types";

const regExStandard = "[A-Z,a-z,0-9,_,-]*";
const regExNumeric = "^-?[0-9]*[.]?[0-9]*";

interface IProps extends IRedux.IPropsRedux { }

interface IState { }

class Playfield extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {}
  }

  componentDidMount() { }


  public generatePlayfield = () => {
    const {
      reduxStatePlayfield
    } = this.props;

    const ret = [];

    let row = [];
    let rowCount = 1;
    this.props.reduxStatePlayfield.playfieldMultiplication?.fields.forEach((f, index) => {
      if (index === rowCount * reduxStatePlayfield.playfieldMultiplication?.sizeX) {
        ret.push(
          <Row key={uuidv4()}>{row}</Row>
        )
        row = [];

        rowCount++;
      }
      row.push(
        <Field
          key={uuidv4()}
          field={f}
        />
      );
    })
    ret.push(
      <Row key={uuidv4()}>{row}</Row>
    )

    return ret;
  }

  //
  //
  //
  public render() {

    return (
      <div>
        {this.generatePlayfield()}
      </div>
    );
  }

}

export default connect(IRedux.mapStateToProps, IRedux.mapDispatchToProps)(Playfield);

