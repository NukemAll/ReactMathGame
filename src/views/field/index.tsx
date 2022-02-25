import React, { Component, CSSProperties } from "react";
import { AutoComplete, Button, DatePicker, Input, Radio } from "antd";
import { v4 as uuidv4 } from 'uuid';

import { connect } from "react-redux";
import * as IRedux from "../../redux/reduxInterface";

import * as  TypesPlayfield from "../../redux/store/playfield/types";

import "./field.css";

const regExStandard = "[A-Z,a-z,0-9,_,-]*";
const regExNumeric = "^-?[0-9]*[.]?[0-9]*";

const stylePressed: CSSProperties = {
  backgroundColor: "#8FF077",
  transition: "background-color 2s ease-out",
}

interface IProps extends IRedux.IPropsRedux {
  field: TypesPlayfield.IField;
}

interface IState { }

class Field extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {}
  }

  //
  public getFieldStyle = (): CSSProperties => {
    const {
      field
    } = this.props;

    let ret: CSSProperties = {}

    if (field.pressed === true) {
      ret = stylePressed;
    }

    return ret;
  }

  //
  //
  //
  public render() {
    const {
      field
    } = this.props;

    return (
      <div
        key={uuidv4()}
      >
        <Button
          className="field"
          disabled={field.disabled}
          style={this.getFieldStyle()}
          onClick={(e) => {
            if (field.pressed === false) {
              const pressedField: TypesPlayfield.IField = JSON.parse(JSON.stringify(field));
              pressedField.pressed = true;
              // pressedField.disabled = true;
              this.props.reduxActionsPlayfield.setFieldInPlayfield(pressedField);
            }
          }}
        >
          {field.value}
        </Button>
      </div>
    );
  }

}

export default connect(IRedux.mapStateToProps, IRedux.mapDispatchToProps)(Field);

