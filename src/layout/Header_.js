import React, { Component } from "react";
import Logo from "../../images/quote.png";

function Header() {
   return (
      <header className="hdr">
         <div className="container">
            <div className="row">
               <div className="col-xl-3">
                  <img src={Logo} alt="" />
               </div>
               <div className="col-xl-9">
                  <nav className="navbar navbar-expand-sm">
                     <ul className="list-inline d-flex top_menu">
                        <li>
                           <a href="#">Home</a>
                        </li>
                        <li>
                           <a href="#">About</a>
                        </li>
                        <li>
                           <a href="#">Services</a>
                        </li>
                        <li>
                           <a href="#">Professionals</a>
                        </li>
                        <li>
                           <a href="#">Blog</a>
                        </li>
                        <li>
                           <a href="#">Shop</a>
                        </li>
                        <li>
                           <a href="#">Appointment</a>
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
         </div>
      </header>
   );
}

export default Header;
