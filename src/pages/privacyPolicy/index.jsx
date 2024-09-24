import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Container, Row, Col } from "reactstrap";
import Layout from "../../components/Layout";
import { useTranslate } from "../../hooks/useTranslate";

const PrivacyPolicy = () => {
  return (
    <>
      <Layout>
        <div   className="container mx-auto mt-[100px] lg:mt-[180px]">
          <Row>
            <Col>
              <h2 className="fw-bold">{useTranslate("Privacy Policy")}</h2>
              <section className="my-4">
                <h4 className="fw-bold">{useTranslate("Introduction")}</h4>
                <p>
                  {useTranslate(
                    "Welcome to B2B Market! We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services."
                  )}
                </p>
              </section>

              <section className="my-4">
                <h4 className="fw-bold">
                  {useTranslate("Information We Collect")}
                </h4>
                <p>
                  {useTranslate(
                    "We collect various types of information to provide and improve our services, including:"
                  )}
                </p>
                <h5 className="fw-bold">
                  {useTranslate("Personal Information:")}
                </h5>
                <ul>
                  <li>{useTranslate("Name")}</li>
                  <li>{useTranslate("Email address")}</li>
                  <li>{useTranslate("Phone number")}</li>
                  <li>{useTranslate("Billing and shipping addresses")}</li>
                </ul>
                <h5 className="fw-bold">{useTranslate("Usage Data:")}</h5>
                <ul>
                  <li>{useTranslate("IP address")}</li>
                  <li>{useTranslate("Browser type")}</li>
                  <li>{useTranslate("Pages visited")}</li>
                  <li>{useTranslate("Time and date of visits")}</li>
                </ul>
                <h5 className="fw-bold">{useTranslate("AI Interactions:")}</h5>
                <ul>
                  <li>{useTranslate("Questions asked to our AI")}</li>
                  <li>{useTranslate("Preferences and product searches")}</li>
                </ul>
              </section>

              <section className="my-4">
                <h4 className="fw-bold">
                  {useTranslate("How We Use Your Information")}
                </h4>
                <p>{useTranslate("We use your information to:")}</p>
                <ul>
                  <li>
                    {useTranslate(
                      "Facilitate transactions between users and shops"
                    )}
                  </li>
                  <li>{useTranslate("Provide and improve our services")}</li>
                  <li>{useTranslate("Personalize user experience")}</li>
                  <li>
                    {useTranslate("Respond to customer service requests")}
                  </li>
                  <li>
                    {useTranslate(
                      "Send periodic emails for updates and promotions"
                    )}
                  </li>
                  <li>
                    {useTranslate(
                      "Analyze data to enhance our AI capabilities"
                    )}
                  </li>
                </ul>
              </section>

              <section className="my-4">
                <h4 className="fw-bold">{useTranslate("Data Security")}</h4>
                <p>
                  {useTranslate(
                    "We implement various security measures to maintain the safety of your personal information. However, please note that no method of transmission over the internet or electronic storage is completely secure."
                  )}
                </p>
              </section>

              <section className="my-4">
                <h4 className="fw-bold">
                  {useTranslate("Cookies and Tracking")}
                </h4>
                <p>
                  {useTranslate(
                    "We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interactions."
                  )}
                </p>
              </section>

              <section className="my-4">
                <h4 className="fw-bold">{useTranslate("Third-Party Links")}</h4>
                <p>
                  {useTranslate(
                    "Occasionally, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We have no responsibility or liability for the content and activities of these linked sites."
                  )}
                </p>
              </section>

              <section className="my-4">
                <h4 className="fw-bold">
                  {useTranslate("Changes to Our Privacy Policy")}
                </h4>
                <p>
                  {useTranslate(
                    "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."
                  )}
                </p>
              </section>
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
};

export default PrivacyPolicy;
