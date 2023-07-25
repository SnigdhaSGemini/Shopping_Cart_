import React from 'react'
import Layout from '../Components/Layouts/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

// contact us page
const ContactUs = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus col-12">
        <div className="col-5 ">
          <img
            src="/Images/contact.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-6">
          <h1 className="bg-light p-2 text-dark text-center contact">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call anytime we 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@shoppingcart.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91 9999999999
          </p>
          <p className="mt-3">
            <BiSupport /> : 1000-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs
