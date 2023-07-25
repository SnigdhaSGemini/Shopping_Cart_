import React from 'react'
import Layout from '../Components/Layouts/Layout'

// about page
const About = () => {
  return (
    <Layout title={"About Us"}>
    <div className="row contactus ">
      <div className="col-5 ">
        <img
          src="/Images/aboutus.jpg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-6">
        <p className="text-justify mt-2">
        <h1 className="bg-light p-2 text-dark text-center contact">ABOUT US</h1>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
            <li>Ducimus officiis obcaecati esse tempore unde ratione, eveniet mollitia,
          perferendis eius temporibus dicta blanditiis doloremque explicabo
          quasi sunt vero optio cum aperiam vel consectetur! </li>
          <li>Laborum enim accusantium atque, excepturi sapiente amet! </li>
          <li>Tenetur ducimus aut
          commodi illum quidem neque tempora nam.</li>
          </ul>
        </p>
      </div>
    </div>
  </Layout>
  )
}

export default About
