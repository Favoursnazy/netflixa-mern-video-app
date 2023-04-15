import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    {
      title: "Company",
      links: [
        {
          name: "Home",
          links: "/",
        },
        {
          name: "About Us",
          links: "/about-us",
        },
        {
          name: "Contact Us",
          links: "/contact-us",
        },
        {
          name: "Movies",
          links: "/movies",
        },
      ],
    },
    {
      title: "Top Categories",
      links: [
        {
          name: "Actions",
          links: "#",
        },
        {
          name: "Romance",
          links: "#",
        },
        {
          name: "Drama",
          links: "#",
        },
        {
          name: "Historical",
          links: "#",
        },
      ],
    },
    {
      title: "My Account",
      links: [
        {
          name: "Dahboard",
          links: "/dashboard",
        },
        {
          name: "My Favourites",
          links: "/favourites",
        },
        {
          name: "Profile",
          links: "/profile",
        },
        {
          name: "Change Password",
          links: "/reset-password",
        },
      ],
    },
  ];
  return (
    <div className="bg-dry py-4 bprder=t-2 border-black">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {links &&
            links.map((link, index) => (
              <div
                className="col-span-1 md:col-span-2 lg:col-span-3 sm:pb-0"
                key={index}
              >
                <h3 className="text-md lg:leading-7 font-meduim mb-4 sm:mb-5 lg:mb-6 font-bold mb-3-5 lg:mb06 pb-0.5">
                  {link.title}
                </h3>
                <ul className="text-sm flex flex-col space-y-3">
                  {link.links.map((text, index) => (
                    <li key={index} className="flex items-baseline">
                      <Link
                        to={text.links}
                        className="text-border inline-block w-full hover:text-subMain"
                      >
                        {text.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to="/">
              <img
                src="/logo.png"
                alt="footer-logo"
                className="w-2/4 object-contain h-12"
              />
            </Link>
            <p className="leading-7 text-sm text-border mt-3">
              <span>
                Lorem 100 World Bank Road, Owerri, <br /> Imo State Nigeria.
              </span>
              <br />
              <span> Tel: +234 903 021 7486</span>
              <br />
              <span>Email: info@Favoursnazy.dev</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
