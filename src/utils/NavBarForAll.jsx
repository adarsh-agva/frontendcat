import React from "react";
import { Navbar } from "./NavBar";
import { Link } from "react-router-dom";
function NavBarForAll() {
  return (
    <div>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 position-fixed">
        <div
          class="px-3 py-3 lg:px-5 lg:pl-3"
          style={{ backgroundColor: "#98004c" }}
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              <Link
                to="/"
                class="flex ml-2 md:mr-24"
                style={{ textDecoration: "none" }}
              >
                <span
                  style={{ color: "white" }}
                  class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"
                >
                  AgVa Healthcare
                </span>
              </Link>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ml-3">
                <Navbar />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarForAll;
