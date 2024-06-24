/* eslint-disable */

import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/images/DDTECH.png';
import Logcat_small from '../assets/images/lgnewsmall.png';
import LogcatLarge from '../assets/images/LgLargeIcon.png';
import settings from '../assets/icons/History.png';

import Style from '../css/Sidebar.module.css';
import { ThemeContext, sideMenus } from './ThemeContext';
function SideBar(props) {
  const { sidebar_details } = props;
  let { sideMenu } = React.useContext(ThemeContext);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;
  const [sideBar, setSideBar] = useState(false);
  // URL STRING
  var url_string = window.location.href;
  var url = new URL(url_string);
  return (
    <>
      <section className={`${Style.sidebarOuter} noSidebar`}>
        <section className={`${Style.Sidebar} noSidbarInner`}>
          <section className={`${Style.LogoSection} sidebarMenu`}>
            <Link
              to='/'
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <section
                className={
                  sideMenu == 'sidebar'
                    ? `noSideBarLogcatLogo`
                    : `${Style.LogcatLogo}`
                }
              >
                {sideMenu == 'sidebar' ? (
                  <Image src={Logcat_small} alt="logcat" />
                ) : (
                  <Image src={LogcatLarge} alt="logcat" />
                )}
              </section>
            </Link>
          </section>

          <section className={Style.linkSection}>
            {/* LINK FIRST  */}
            {!url.href.includes('update') && (
              <section className={Style.navMenuIcons}>

                {/* LINK SECOND  */}
                {adminInfo && adminInfo.data && adminInfo.data.userType === "Super-Admin" ? (
                  <>
                    {url.pathname == '/update' ? (
                      <></>
                    ) : (
                      <section
                        className={
                          url.href.includes('settings')
                            ? `${Style.linkActive} `
                            : `${Style.linkInActive} `
                        }
                      >
                        <Link to='/history'
                          className={`${Style.linkData} noSideBarLink`}
                        >
                          <img src={settings} style={{ height: '1.5rem' }} />
                          <section className="hidelinkName">
                          </section>
                        </Link>
                      </section>
                    )}
                  </>
                ) : ""}
              </section>
            )}
          </section>
          <ThemeContext.Consumer>
            {({ changeSideMenu }) => (
              <section
                className={Style.ClickSlideSection}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSideBar(!sideBar);
                  changeSideMenu(
                    sideBar ? sideMenus.menuShow : sideMenus.menuHide
                  );
                }}
              ></section>
            )}
          </ThemeContext.Consumer>
          <section >
            <Image src={logo} className={Style.ComponyLogo} />
            <p className="hideComponyName">Technologies</p>
          </section>
        </section>
      </section>
    </>
  );
}

export default SideBar;
