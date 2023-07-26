import React from 'react'
import Layout from '../Components/Layouts/Layout'
import {MdPrivacyTip} from 'react-icons/md'

// privacy policy page
const PrivacyPolicy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus h-100">
        <div className="col-6 ">
          <img
            src="/Images/policy.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-6">
        <h1 className="bg-light p-2 text-dark text-center contact">PRIVACY POLICY</h1>
        <p> <MdPrivacyTip/> &nbsp; Lorem ipsum dolor sit amet,dunt ut labore et dolore magna aliqua. </p>
        <p><MdPrivacyTip/>  &nbsp; Lorem ipsum dolor sit amet,dunt ut labore et dolore magna aliqua. </p>
        <p><MdPrivacyTip/> &nbsp; Lorem ipsum dolor sit amet,dunt ut labore et dolore magna aliqua. </p>
        <p><MdPrivacyTip/>  &nbsp; Lorem ipsum dolor sit amet,dunt ut labore et dolore magna aliqua. </p>
        </div>
      </div>
    </Layout>
  )
}

export default PrivacyPolicy
