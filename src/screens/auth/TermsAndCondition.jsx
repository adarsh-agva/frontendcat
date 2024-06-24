import React from 'react'
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
function TermsAndCondition() {
    const goBack=()=>{
        window.history.go(-1)
      }
  return (
    <>
        <div
        className="main-overview"
        style={{ position: "absolute", top: "2rem", left: "4rem" }}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Heading  */}
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              color: "#707070",
            }}
          >
            <Link onClick={goBack}>
              <img src={back} style={{ width: "3rem" }} />
            </Link>
            <h4>Terms Of Services</h4>
            
          </div>
          {/* Details */}
          <div
              className="container"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10rem",
                width: "100%",
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                boxShadow: "0px 0px 50px #00000029",
                borderRadius: "15px",
                padding: "2rem",
                marginLeft: "0px",
              }}
            >
              <div className="d-flex" style={{flexDirection:"column", gap:"1rem"}}>
                {/* <div> */}
                <h4>
                  Section 1.10.32 of "de Finibus Bonorum et Malorum", written by
                  Cicero in 45 BC
                </h4>
                <p>
                  "Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                  quia dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?"
                </p>
                {/* </div> */}
                {/* <div> */}
                <h4>1914 translation by H. Rackham</h4>
                <p>
                  "But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure, but because
                  those who do not know how to pursue pleasure rationally
                  encounter consequences that are extremely painful. Nor again
                  is there anyone who loves or pursues or desires to obtain pain
                  of itself, because it is pain, but because occasionally
                  circumstances occur in which toil and pain can procure him
                  some great pleasure. To take a trivial example, which of us
                  ever undertakes laborious physical exercise, except to obtain
                  some advantage from it? But who has any right to find fault
                  with a man who chooses to enjoy a pleasure that has no
                  annoying consequences, or one who avoids a pain that produces
                  no resultant pleasure?"
                </p>
                {/* </div> */}
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default TermsAndCondition