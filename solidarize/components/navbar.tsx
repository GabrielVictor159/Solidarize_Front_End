/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Kbd,
  Link,
  Input,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/Domain/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";

import styles from "../styles/components/navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Provider/Store";
import { useEffect, useRef, useState } from "react";
import { setLoginResponse } from "@/Provider/Slices/LoginSlice";
import { useRouter } from "next/router";
import UsersView from "./usersView";

export const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const loginResponse = useSelector((state: RootState) => state.loginResponse);
  const [userSearch, setUserSearch] = useState<string>("");
  const [usersView, setUsersView] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement|any>(null);

  useEffect(()=>{
    if(userSearch===""){
      setUsersView(false);
    }
    else{
      setUsersView(true);
    }
  },[userSearch])
  const searchInput = (
    <Input
      ref={inputRef}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={<></>}
      labelPlacement="outside"
      placeholder="Search..."
      onClear={()=>{setUserSearch("");}}
      onChange={(e)=>{
        setUserSearch(e.target.value)
      }}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  const Sair = () => {
    dispatch(
      setLoginResponse({
        Token: undefined,
        UserInformation: undefined,
      })
    );
    router.push("/");
  };
  return (
    <NextUINavbar
      className={styles.background}
      maxWidth="xl"
      position="sticky"
      isBlurred={false}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img src="/Logo_Ong.png" className={styles.logo}/>
            <p className="font-bold text-inherit">SOLIDARIZE</p>
          </NextLink>
        </NavbarBrand>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
          <div className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-high",
                    styles.textAnimation
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{usersView ? <UsersView search={userSearch}/>:<></>}{searchInput}</NavbarItem>
        {loginResponse.UserInformation == undefined ? (
          <NavbarItem style={{ cursor: "pointer" }}>
            <NextLink href="/Login">
              <img
                className={styles.icon_register}
                src="/icons8-register-96.png"
              />
            </NextLink>
          </NavbarItem>
        ) : (
          <>
            <Dropdown>
              <DropdownTrigger>
                <NavbarItem style={{ cursor: "pointer" }}>
                    <Avatar
                      src={
                        (loginResponse.UserInformation.Icon === undefined || loginResponse.UserInformation.Icon === null || loginResponse.UserInformation.Icon === "")
                          ? "/0587496e-6e1f-4e5b-a60f-19c3cf931a3d.png"
                          : `${process.env.NEXT_PUBLIC_CONTAINER_IMAGE}${
                              loginResponse.UserInformation.Icon!.split(".")[0]
                            }`
                      }
                      className="w-6 h-6 text-tiny"
                    />
                </NavbarItem>
              </DropdownTrigger>
              <DropdownMenu aria-label="Link Actions">
                <DropdownItem key="Perfil" href="/Profile/myProfile">
                  Perfil
                </DropdownItem>
                <DropdownItem
                  key="Sair"
                  className="text-danger"
                  onPress={() => {
                    Sair();
                  }}
                >
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
