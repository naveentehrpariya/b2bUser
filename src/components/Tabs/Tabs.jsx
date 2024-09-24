import React, { useState } from "react";
import "./tabs.css";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { useTranslate } from "../../hooks/useTranslate";

const Tabs = ({ details, description }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="my-2">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => toggle("1")}
          >
            {useTranslate("DESCRIPTION")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => toggle("2")}
          >
            {useTranslate("PRODUCT SPECIFICATION")}
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => toggle("2")}
          >
            CUSTOMER REVIEWS
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={activeTab} className="pt-4">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <p>{useTranslate(details)}</p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <p>{useTranslate(description)}</p>
            </Col>
          </Row>
        </TabPane>
        {/* <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Soluta, itaque suscipit? Similique non repellendus
                necessitatibus earum, mollitia accusantium aut molestias vitae
                distinctio recusandae, est inventore, soluta neque. Sunt,
                asperiores est!
              </p>
            </Col>
          </Row>
        </TabPane> */}
      </TabContent>
    </div>
  );
};

export default Tabs;
