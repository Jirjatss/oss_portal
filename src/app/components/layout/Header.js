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
import useLanguage from "@/app/useLanguage";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "@/app/store/actions/languageAction";

const Header = () => {
  const signOut = useSignOut();
  const router = useRouter();
  const { t } = useLanguage();
  const auth = useAuthUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();
  const profile = [{ label: t("edit_profile") }, { label: t("logout") }];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { lang } = useSelector((state) => state.languageReducer);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut();
    router.push("/login");
    toast.success(t("success_logout"));
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
          <ul className="flex gap-5 mt-2">
            <li className="m-auto">
              <Link href="/">
                <Image src={logo} width={25} height={25} alt="" />
              </Link>
            </li>
            {!auth && (
              <li className="m-auto ">
                <Link href="/#step">{t("how_to_apply")}</Link>
              </li>
            )}
            <li className="m-auto">
              <Link href="/#services">{t("applications")}</Link>
            </li>
            <li className="m-auto">
              <Link href={`${auth ? "/set-appointment" : "/#set-appointment"}`}>
                {t("home_menu_set-appointment_title")}
              </Link>
            </li>
            <li className="m-auto">
              <Link href="/#contact-us" style={{ scrollBehavior: "smooth" }}>
                {t("contact_us")}
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
                        if (e.label === t("logout")) {
                          handleLogout();
                          setAnchorEl(null);
                          setMenuOpen(false);
                        }
                        if (e.label === t("edit_profile")) {
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
                <Link href="/login" className="text-[#8B0000]">
                  {t("login")}
                </Link>
              </li>
              <li className="m-auto">
                <button className="bg-[#8B0000] text-white py-2 px-3 rounded-lg block m-auto">
                  <Link href="/register">{t("sign_up")}</Link>
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
                  {t("edit_profile")}
                </Link>

                <Link
                  href="/#services"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                  aria-current="page"
                >
                  {t("applications")}
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href={`${auth ? "/set-appointment" : "/#set-appointment"}`}
                  className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                  aria-current="page"
                >
                  {t("home_menu_set-appointment_title")}
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/#contact-us"
                  className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                  aria-current="page"
                >
                  {t("contact_us")}
                </Link>

                <Link
                  href="/login"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                  aria-current="page"
                >
                  {t("logout")}
                </Link>
                <li>
                  <a
                    className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                    aria-current="page"
                  >
                    {t("language")}

                    <ul
                      className="flex justify-between items-center mt-1"
                      onClick={() => {
                        dispatch(setLang("en"));
                      }}
                    >
                      <p
                        className="block py-2 text-[16px] text-[#646464] font-thin"
                        aria-current="page"
                      >
                        {t("english")}
                      </p>
                      <div
                        className={`w-[24px] h-[24px] rounded-full ${
                          lang === "en" ? "bg-[#8B0000]" : "bg-transparent"
                        } border-[1px] border-[#DCDCDC]  cursor-pointer justify-center items-center flex`}
                      >
                        {lang === "en" && <OSSIcons name={"Approve"} />}
                      </div>
                    </ul>

                    <ul
                      className="flex justify-between items-center"
                      onClick={() => {
                        dispatch(setLang("tl"));
                      }}
                    >
                      <p
                        className="block py-2 text-[16px] text-[#646464] font-thin"
                        aria-current="page"
                      >
                        {t("timor_leste")}
                      </p>
                      <div
                        className={`w-[24px] h-[24px] rounded-full ${
                          lang === "tl" ? "bg-[#8B0000]" : "bg-transparent"
                        } border-[1px] border-[#DCDCDC]  cursor-pointer justify-center items-center flex`}
                      >
                        {lang === "tl" && <OSSIcons name={"Approve"} />}
                      </div>
                    </ul>
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
                    {t("how_to_apply")}
                  </Link>

                  <Link
                    href="/#services"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                    aria-current="page"
                  >
                    {t("applications")}
                  </Link>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    href={`${auth ? "/set-appointment" : "/#set-appointment"}`}
                    className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                    aria-current="page"
                  >
                    {t("home_menu_set-appointment_title")}
                  </Link>
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    href="/#contact-us"
                    className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                    aria-current="page"
                  >
                    {t("contact_us")}
                  </Link>
                  <li>
                    <a
                      className="block py-2 px-3 text-[16px] text-[#646464] border-b-[1px] border-[#DCDCDC] font-semibold"
                      aria-current="page"
                    >
                      {t("language")}

                      <ul
                        className="flex justify-between items-center mt-1"
                        onClick={() => {
                          dispatch(setLang("en"));
                        }}
                      >
                        <p
                          className="block py-2 text-[16px] text-[#646464] font-thin"
                          aria-current="page"
                        >
                          {t("english")}
                        </p>
                        <div
                          className={`w-[24px] h-[24px] rounded-full ${
                            lang === "en" ? "bg-[#8B0000]" : "bg-transparent"
                          } border-[1px] border-[#DCDCDC]  cursor-pointer justify-center items-center flex`}
                        >
                          {lang === "en" && <OSSIcons name={"Approve"} />}
                        </div>
                      </ul>

                      <ul
                        className="flex justify-between items-center"
                        onClick={() => {
                          dispatch(setLang("tl"));
                        }}
                      >
                        <p
                          className="block py-2 text-[16px] text-[#646464] font-thin"
                          aria-current="page"
                        >
                          {t("timor_leste")}
                        </p>
                        <div
                          className={`w-[24px] h-[24px] rounded-full ${
                            lang === "tl" ? "bg-[#8B0000]" : "bg-transparent"
                          } border-[1px] border-[#DCDCDC]  cursor-pointer justify-center items-center flex`}
                        >
                          {lang === "tl" && <OSSIcons name={"Approve"} />}
                        </div>
                      </ul>
                    </a>
                  </li>
                </ul>
                <div className="grid grid-cols-2 absolute bottom-44 gap-x-2 m-auto w-full px-4">
                  <Link
                    href="/login"
                    className="text-[#8B0000] m-auto font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("login")}
                  </Link>

                  <button
                    className="bg-[#8B0000] text-white py-2 px-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/register">{t("register")}</Link>
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
