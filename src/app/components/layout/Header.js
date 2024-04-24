"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSelector from "../language/LanguageSelector";
import { Button, Menu, MenuItem } from "@mui/material";
import logo from "../../../../public/assets/images/logo.png";
import { OSSIcons } from "../../../../public/assets/icons/parent";
import { toast } from "sonner";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Profile as ProfileImage } from "../../../../public/assets/emoji/index";

const Header = () => {
  const signOut = useSignOut();
  const router = useRouter();
  const auth = useAuthUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();
  const profile = [{ label: "Edit Perfíl" }, { label: "Sai" }];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut();
    router.push("/login");
    toast.success("Success Logout");
  };

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <>
      <div className="sticky top-0 z-30 p-5 px-28 lg:flex hidden justify-between text-navbar">
        <div
          className={`absolute inset-0 ${
            (pathname === "/" && auth) || pathname !== "/"
              ? "bg-white border-b-2"
              : scrollPosition > 60
              ? "bg-white border-b-2"
              : "bg-white opacity-30"
          }`}
        />

        <div className="relative z-10 m-0">
          <ul className="flex gap-5 mt-1">
            <li className="m-auto">
              <Link href="/">
                <Image src={logo} width={25} height={25} alt="" />
              </Link>
            </li>
            {!auth && (
              <li className="m-auto ">
                <Link href="/#step">Oinsá atu Aplika?</Link>
              </li>
            )}
            <li className="m-auto">
              <Link href="/#services">Aplikasaun</Link>
            </li>
            <li className="m-auto">
              <Link href={`${auth ? "/set-appointment" : "/#set-appointment"}`}>
                Marka Ajendamentu
              </Link>
            </li>
            <li className="m-auto">
              <Link href="/#contact-us" style={{ scrollBehavior: "smooth" }}>
                Kontaktu Ami
              </Link>
            </li>
          </ul>
        </div>
        {auth ? (
          <div className="relative z-10 mt-1">
            <ul className="flex gap-3">
              <li className="flex m-auto mr-5">
                <LanguageSelector />
              </li>
              <li className="m-auto">
                <OSSIcons name={"Bell"} />
              </li>
              <li className="m-auto">
                <Button
                  id="demo-positioned-button"
                  variant="text"
                  aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setMenuOpen(!menuOpen);
                  }}
                  style={{ minWidth: "40px" }}
                  className="text-[16px] h-[40px]  justify-center items-center flex rounded-md"
                >
                  <Image
                    src={ProfileImage}
                    width={23}
                    height={40}
                    alt="profile image"
                  />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  className=""
                  onClose={() => {
                    setAnchorEl(null);
                    setMenuOpen(false);
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {profile.map((e) => (
                    <MenuItem
                      className="text-gray-900 w-full text-start"
                      key={e.label}
                      onClick={() => {
                        if (e.label === "Sai") {
                          handleLogout();
                          setAnchorEl(null);
                          setMenuOpen(false);
                        }
                        if (e.label === "Edit Perfíl") {
                          router.push("/personal-informations");
                          setAnchorEl(null);
                          setMenuOpen(false);
                        }
                      }}
                    >
                      <div className="flex gap-3">{e.label}</div>
                    </MenuItem>
                  ))}
                </Menu>
              </li>
            </ul>
          </div>
        ) : (
          <div className="relative z-10 mt-1">
            <ul className="flex gap-7">
              <li className="flex m-auto">
                <LanguageSelector />
              </li>
              <li className="m-auto">
                <Link href="/login" className="text-[#1C25E7]">
                  Login
                </Link>
              </li>
              <li className="m-auto">
                <button className="bg-[#1C25E7] text-white py-2 px-3 rounded-lg block m-auto">
                  <Link href="/register">Rejistu</Link>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile */}
      <nav className="bg-white border-[1px] border-[#DCDCDC] lg:hidden sticky top-0 z-30">
        <div
          className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ${
            isMenuOpen ? "px-0" : "py-4"
          } `}
        >
          <Link
            href="/"
            className={`${isMenuOpen && "px-4"}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Image src={logo} width={25} height={25} alt="" />
          </Link>
          {auth ? (
            <div className="flex justify-end">
              <OSSIcons name={"Bell"} fill="#2E2D2D" />
              <button
                onClick={toggleMenu}
                type="button"
                className={`inline-flex items-center  ${
                  isMenuOpen && "mr-4"
                } w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden p-2`}
                aria-controls="navbar-default"
                aria-expanded={isMenuOpen ? "true" : "false"}
              >
                {isMenuOpen ? (
                  <>
                    <OSSIcons name={"Cancel"} fill="#2E2D2D" />
                  </>
                ) : (
                  <Image
                    src={ProfileImage}
                    width={20}
                    height={40}
                    alt="profile image"
                  />
                )}
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={toggleMenu}
                type="button"
                className={`inline-flex items-center  ${
                  isMenuOpen && "mr-4"
                } w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden p-2`}
                aria-controls="navbar-default"
                aria-expanded={isMenuOpen ? "true" : "false"}
              >
                {isMenuOpen ? (
                  <>
                    <OSSIcons name={"Cancel"} fill="#2E2D2D" />
                  </>
                ) : (
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                )}
              </button>
            </>
          )}

          <div
            className={`w-full h-screen lg:block lg:w-auto ${
              isMenuOpen
                ? "lg:block border-t-[1px] border-[#DCDCDC] mt-4"
                : "hidden"
            } relative`}
            id="navbar-default"
          >
            {auth ? (
              <ul className="font-medium px-4 flex flex-col gap-1">
                <Link
                  href="/personal-informations"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold mt-1"
                >
                  Edit Perfíl
                </Link>

                <li>
                  <a
                    href="/#services"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                    aria-current="page"
                  >
                    Aplikasaun
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    href={`${auth ? "/set-appointment" : "/#set-appointment"}`}
                    className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                    aria-current="page"
                  >
                    Marka Ajendamentu
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    href="/#contact-us"
                    className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                    aria-current="page"
                  >
                    Kontaktu Ami
                  </a>
                </li>

                <li>
                  <a
                    href="/login"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                    aria-current="page"
                  >
                    Sai
                  </a>
                </li>
              </ul>
            ) : (
              <>
                <ul className="font-medium px-4 flex flex-col gap-1">
                  <Link
                    href="/#step"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold mt-1"
                  >
                    Oinsá atu Aplika?
                  </Link>

                  <li>
                    <a
                      href="/#services"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                      aria-current="page"
                    >
                      Aplikasaun
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setIsMenuOpen(false)}
                      href={`${
                        auth ? "/set-appointment" : "/#set-appointment"
                      }`}
                      className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                      aria-current="page"
                    >
                      Marka Ajendamentu
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setIsMenuOpen(false)}
                      href="/#contact-us"
                      className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                      aria-current="page"
                    >
                      Kontaktu Ami
                    </a>
                  </li>
                </ul>
                <div className="grid grid-cols-2 absolute bottom-24 gap-x-2 m-auto w-full px-4">
                  <Link
                    href="/login"
                    className="text-[#1C25E7] m-auto font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <button
                    className="bg-[#1C25E7] text-white py-2 px-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/register">Rejistu</Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
