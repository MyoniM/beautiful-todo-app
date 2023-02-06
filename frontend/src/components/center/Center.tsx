import { Col, Row } from "antd";
import React, { ReactNode } from "react";

import classes from "./center.module.css";

interface IProps {
  children: ReactNode;
}

export default function Center({ children }: IProps) {
  return (
    <Row align={"middle"} justify="center">
      <Col
        xs={{ span: 18, offset: 0 }}
        md={{ span: 16, offset: 0 }}
        lg={{ span: 12, offset: 0 }}
      >
        {children}
      </Col>
    </Row>
  );
}
