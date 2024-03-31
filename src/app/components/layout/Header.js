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
  const profile = [{ label: "Edit Profile" }, { label: "Logout" }];

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
    <div className="sticky top-0 z-30 p-5 px-28 flex justify-between text-navbar">
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
              <Image src={logo} width={70} height={70} alt="" />
            </Link>
          </li>
          {!auth && (
            <li className="m-auto ">
              <Link href="/#step">How To Apply</Link>
            </li>
          )}
          <li className="m-auto">
            <Link href="/#services">Services</Link>
          </li>
          <li className="m-auto">
            <Link href="/set-appointment">Set Appointment</Link>
          </li>
          <li className="m-auto">
            <Link href="/#contact-us" style={{ scrollBehavior: "smooth" }}>
              Contact us
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
                      if (e.label === "Logout") {
                        handleLogout();
                        setAnchorEl(null);
                        setMenuOpen(false);
                      }
                      if (e.label === "Edit Profile") {
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
                <Link href="/register">Sign Up</Link>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
