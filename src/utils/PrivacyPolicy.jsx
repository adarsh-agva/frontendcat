import React from 'react'
import NavBarForAll from './NavBarForAll';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <>
      <NavBarForAll />
      <div
        className="main-overview"
        style={{
          position: "relative",
          top: "4rem",
          width: "99%",
          height:'100%'
        }}
      >
        <div
          className="inside-overview"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Details */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10rem",
              width: "101%",
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              boxShadow: "0px 0px 50px #00000029",
              padding: "2rem",
              marginLeft: "0px",
              height: '250px'
            }}
          >
            <div style={{ alignItems: 'center', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
              <span style={{ color: 'black', fontSize: '2rem', fontWeight: '600' }}>Privacy Policy</span>
              <span style={{ color: 'gray', fontSize: '1.2rem rem', fontWeight: '200' }}>How AgVa Healthcare handles your data</span>
              <span style={{ color: 'gray', fontSize: '0.8rem', fontWeight: '200' }}>Updated Juune 14 2024</span>
            </div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',marginBottom:'3rem' }}>
            <div style={{ width: '50%', marginTop: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontWeight:'bolder',color:'black',fontSize:'1.5rem'}}>Introduction</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>AgVa Healthcare ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, <Link to="https://www.agvahealthtech.com/">AgVa Healthcare</Link>, and our practices regarding data we collect through other means (such as email communications, phone calls, or other offline activities). By accessing or using our Website, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use our Website.</span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontWeight:'bolder',color:'black',fontSize:'1.5rem'}}>Information We Collect</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  We may collect information about you in a variety of ways. The information we may collect on the Website includes:
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{color: 'black',fontSize:'1rem'}}>Personal Data</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Website, purchase products, or when you choose to participate in various activities related to the Website (such as online chat and message boards).
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>Derivative Data</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  Information our servers automatically collect when you access the Website, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Website.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>Financial Data</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Website. [We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, [name of payment processor], and you are encouraged to review their privacy policy and contact them directly for responses to your questions.]
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontWeight:'bolder',color:'black',fontSize:'1.5rem'}}>How We Use Your Information</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Website to:
                </span>
                <ul style={{display:'flex',gap:'0.5rem',flexDirection:'column',listStyleType:'circle'}}>
                  <li>Create and manage your account.</li>
                  <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
                  <li>Send you marketing and promotional communications.</li>
                  <li>Respond to your comments, questions, and provide customer service.</li>
                  <li>Improve our services and Website performance.</li>
                  <li>Monitor and analyze usage and trends to improve your experience with the Website.</li>
                  <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                </ul>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontWeight:'bolder',color:'black',fontSize:'1.5rem'}}>Disclosure of Your Information</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontSize:'1.1rem',fontWeight:'400',color:'black'}}>By Law or to Protect Rights</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontSize:'1.1rem',fontWeight:'400',color:'black'}}>Third-Party Service Providers</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontSize:'1.1rem',fontWeight:'400',color:'black'}}>Marketing Communications</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontSize:'1.1rem',fontWeight:'400',color:'black'}}>Affiliates</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontSize:'1.1rem',fontWeight:'400',color:'black'}}>Business Transfers</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontSize:'1.1rem rem',fontWeight:'400',color:'black'}}>Other Third Parties</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                We may share your information with advertisers and investors for the purpose of conducting general business analysis. We may also share your information with such third parties for marketing purposes, as permitted by law.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{fontWeight:'bolder',color:'black',fontSize:'1.5rem'}}>Security of Your Information</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy