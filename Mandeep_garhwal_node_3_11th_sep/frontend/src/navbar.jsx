import React from 'react'
import { useState, useEffect } from "react";
import Cookies from "js-cookie"
import { CNavbar, CContainer, CNavbarNav, CNavLink, CDropdownMenu, CForm, CFormInput, CButton, CDropdownItem, CDropdownDivider, CNavItem, CCollapse, CNavbarToggler,CNavbarBrand, CDropdown, CDropdownToggle } from '@coreui/react';
import {useNavigate } from "react-router-dom"
export default function Navbar() {
    const [visible, setVisible] = useState(false)
  const [username, setusername] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    setusername(Cookies.get("user"))
  }, [])

  const logout = () => {
    console.log("logout is called")
    Cookies.remove("user")
    Cookies.remove("usertype")
    Cookies.remove("mobile")
    Cookies.remove("userID")
    Cookies.remove("likedmovies")
    Cookies.remove("likedgenre")
    window.location.assign("/home")
  }
  console.log(username)
  console.log(username? "none" : "")
  return (
    <>
        <CNavbar expand="lg" className="bg-body-tertiary">
      <CContainer fluid>
        <CNavbarBrand href="#">Netflix M</CNavbarBrand>
        <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav>
            <CNavItem>
              <CNavLink href="#" active>
                My Account
              </CNavLink>
            </CNavItem>
            <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle color="secondary">Movie Category</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#">Comedy Movies</CDropdownItem>
                <CDropdownItem href="#">Drama Movies</CDropdownItem>
                <CDropdownItem href="#">Action Movies</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#">All movies</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <div style={{display: username? "none" : ""}}>
            <CNavItem>
              <CNavLink href="/login" active>
                Log In
              </CNavLink>
            </CNavItem>
            </div>
            <div style={{display: username? "" : "none"}} onClick={() => logout()}> 
            <CNavItem>
              <CNavLink href="#" active >
                Log Out
              </CNavLink>
            </CNavItem>
            </div>
          </CNavbarNav>
          <CForm className="d-flex">
            <CFormInput type="search" className="me-2" placeholder="Search" />
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
            {/* <CNavItem>
              <CNavLink href="#" >
                Sign Up
              </CNavLink>
            </CNavItem> */}
        </CCollapse>
      </CContainer>
    </CNavbar>
    </>
  )
}
