import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Table } from "reactstrap";
import { fetchInquiries } from "../../redux/slices/inquirySlice";
import { useTranslate } from "../../hooks/useTranslate";
import { translate } from "../../utils";
import { LanguageContext } from "../../utils/LanguageContext";

const MyEnquires = () => {
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const { inquiries, loading, error } = useSelector((state) => state.inquiries);

  const [translatedInquiries, setTranslatedInquiries] = useState([]);

  useEffect(() => {
    const translateCategoryNames = async () => {
      if (inquiries) {
        const translations = await Promise.all(
          inquiries.map(async (inquiry) => {
            const name = await translate(inquiry.product.name, language);
            const firstName = await translate(
              inquiry.vendor.firstName,
              language
            );
            const lastName = await translate(inquiry.vendor.lastName, language);
            const email = await translate(inquiry.vendor.email, language);
            return {
              ...inquiry,
              product: {
                ...inquiry.product,
                name,
              },
              vendor: {
                ...inquiry.vendor,
                firstName,
                lastName,
                email,
              },
            };
          })
        );
        setTranslatedInquiries(translations);
      }
    };

    translateCategoryNames();
  }, [inquiries, language]);

  useEffect(() => {
    dispatch(fetchInquiries());
  }, [dispatch]);

  return (
    <div className="contact-form p-lg-5 p-4">
      <h2 className="fw-bold">{useTranslate("My Enquiries")}</h2>
      {loading && <Spinner />}
      {error && <p>Error: {error}</p>}
      {/* {!loading && !error && ( */}
      <Table responsive>
        <thead>
          <tr>
            <th>{useTranslate("Product Name")}</th>
            <th>{useTranslate("ProductPrice")}</th>
            <th>{useTranslate("Vendor Name")}</th>
            <th>{useTranslate("Vendor Email")}</th>
          </tr>
        </thead>
        <tbody>
          {translatedInquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td>{inquiry?.product?.name}</td>
              <td>{inquiry?.product?.price}</td>
              <td>{`${inquiry?.vendor?.firstName} ${inquiry?.vendor?.lastName}`}</td>
              <td>
                <a href={`mailto:${inquiry?.vendor?.email}`}>
                  {inquiry?.vendor?.email}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* )} */}
    </div>
  );
};

export default MyEnquires;
