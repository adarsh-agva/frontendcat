import React from 'react'
import { Link } from "react-router-dom";
import NavBarForAll from './NavBarForAll';
function TermsAndCondition() {

  return (
    <>
      <NavBarForAll />
      <div
        className="main-overview"
        style={{
          position: "relative",
          top: "4rem",
          width: "99%",
          height: '100%'
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
              <span style={{ color: 'black', fontSize: '2rem', fontWeight: '600' }}>Terms of Services</span>
              <span style={{ color: 'gray', fontSize: '1.2rem rem', fontWeight: '200' }}>How AgVa Healthcare handles your data</span>
              <span style={{ color: 'gray', fontSize: '0.8rem', fontWeight: '200' }}>Updated Juune 14 2024</span>
            </div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ width: '50%', marginTop: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontWeight: 'bolder', color: 'black', fontSize: '1.5rem' }}> 1. Introduction</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  Welcome to AgVa Healthcare. These Terms and Conditions ("Terms") govern your use of our website, located at <Link to="https://www.agvahealthtech.com/">AgVa Healthcare</Link>, and any related services provided by AgVa Healthcare. By accessing or using the Website, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use the Website.</span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontWeight: 'bolder', color: 'black', fontSize: '1.5rem' }}>2. Intellectual Property</span>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  All content, trademarks, service marks, logos, text, graphics, images, and other materials available on the Website are the property of AgVa Healthcare or its licensors and are protected by copyright, trademark, and other intellectual property laws. Unauthorized use of any materials on the Website is prohibited.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontWeight: 'bolder', color: 'black', fontSize: '1.5rem' }}>3. Use of the Website</span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>3.1 Permitted Use</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  You may use the Website for lawful purposes only. You agree not to use the Website:
                </span>
                <ul style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', listStyleType: 'circle' }}>
                  <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
                  <li>To impersonate or attempt to impersonate AgVa Healthcare, an AgVa Healthcare employee, another user, or any other person or entity.</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of the Website, or which, as determined by us, may harm AgVa Healthcare or users of the Website or expose them to liability.</li>
                </ul>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>3.2 User Accounts</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  If you create an account on the Website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>3.3 Medical Disclaimer</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  The information provided on the Website is for general informational purposes only and is not intended as medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or device. Never disregard professional medical advice or delay in seeking it because of something you have read on the Website.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>3.4 Limitation of Liability</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                  To the fullest extent permitted by law, AgVa Healthcare shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Website; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from the Website; (iv) any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Website by any third party; (v) any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available through the Website.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>3.5 Indemnification</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                You agree to indemnify, defend, and hold harmless AgVa Healthcare, its officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, liabilities, expenses, damages, and costs, including reasonable attorneys' fees, arising out of or relating to your use of the Website, your violation of these Terms, or your violation of any rights of another.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>3.6 Governing Law</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. You agree to submit to the personal jurisdiction of the courts located in India for the purpose of litigating all such claims or disputes.
                </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>3.7 Changes to the Terms</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                AgVa Healthcare reserves the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. You are advised to review these Terms periodically for any changes. Changes to these Terms are effective when they are posted on this page.
              </span>
              </div>
            </div>
            <div style={{ width: '50%', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h6>3.8 Contact Us</h6>
                <span style={{ color: 'gray', fontSize: '1rem' }}>
                If you have any questions about these Terms, please contact us at:
              </span>
              <ul>
                <li>Email:  info@agvahealthcare.com</li>
                <li>Address:  A-1 Sector 83 Noida, Uttar Pradesh 201301 (IN)</li>
                <li>Phone: +91-7330405060</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsAndCondition