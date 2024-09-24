import React from "react";
import "./AIsteps.css";
import { Col, Row } from "reactstrap";
import { Images } from "../../assets/Images";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaSearch, FaChartLine, FaCheckCircle } from "react-icons/fa";
import { TbMessage2Question } from "react-icons/tb";
import { useTranslate } from "../../hooks/useTranslate";

const AiSteps = () => {
  return (
    <div className="find-best-deal-ai my-5 ">
      <div className="text-white text-center">
        <span className="h2">{useTranslate("Find best deal with AI")}</span>
        <p className="h5 py-3">
          {useTranslate(
            "Get the best deal on verity of products from electronics to cosmetic there are many categories to choose from"
          )}
        </p>
        <div className="row py-2 d-flex justify-content-center align-items-center ">
          <div className="col-lg-6 py-5">
            <VerticalTimeline layout="1-column-left">
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "transparent",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "none",
                }}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<FaSearch />}
              >
                <h3 className="vertical-timeline-element-title text-start fs-4">
                  {useTranslate("Search the product you want")}
                </h3>
                <p className="text-start fs-5">
                  {useTranslate(
                    "search and filter from millions of product and supplier offerings to find the matching ones for your business"
                  )}
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "transparent",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "none",
                }}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<TbMessage2Question />}
              >
                <h3 className="vertical-timeline-element-title text-start fs-4">
                  {useTranslate("Answer to few questions from AI")}
                </h3>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "transparent",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "none",
                }}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<FaChartLine />}
              >
                <h3 className="vertical-timeline-element-title text-start fs-4">
                  {useTranslate(
                    "AI will analyse and find best product for you"
                  )}
                </h3>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "transparent",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "none",
                }}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<FaCheckCircle />}
              >
                <h3 className="vertical-timeline-element-title text-start fs-4">
                  {useTranslate("Explore Best Deal On AI Suggestion")}
                </h3>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
          <div className="col-lg-6">
            <img src={Images.searchimg} className="w-100" alt="search" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSteps;
