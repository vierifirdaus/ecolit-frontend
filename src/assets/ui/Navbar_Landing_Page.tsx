import { Button, Navbar, Flowbite } from "flowbite-react";
import Logo_Landing_Page from "../Logo_Landing_Page.svg";
import type { CustomFlowbiteTheme } from "flowbite-react";
import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";

const pengelolaanSampah = [
    {
      key: '1',
      label: (
        <Navbar.Link href="/pengelolaan-sampah/detail" className="font-semibold">
          Detail Pengelolaan Sampah
        </Navbar.Link>
      ),
    },
  ];

const wadahQurban = [
    {
      key: '1',
      label: (
        <Navbar.Link href="/wadah-qurban/detail" className="font-semibold">
          Detail Wadah Qurban
        </Navbar.Link>
      ),
    },
    {
      key: '2',
      label: (
        <Navbar.Link href="/wadah-qurban/dropt-point" className="font-semibold">
          Dropt Point
        </Navbar.Link>
      ),
    },
    {
      key: '3',
      label: (
        <Navbar.Link href="/wadah-qurban/report" className="font-semibold">
          Report
        </Navbar.Link>
      ),
    },
  ];

const customTheme: CustomFlowbiteTheme = {
    navbar: {
        root: {
            base: "bg-[#121212] px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 lg:px-20",
        },
        collapse: {
            list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-20 md:text-base md:font-bold"
        },
        link: {
            active: {
                on: "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-white",
                off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
            }
        }
    },
    button: {
        color: {
            primary: "bg-[#967C55] hover:[#CABDA9]",
            transparent: "text-white hover:text-gray-100 bg-transparent"
        }
    }
};


export default function NavbarLandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth/login');
  };
  return (
    <Flowbite theme={{ theme: customTheme }}>
        <Navbar fluid>
            <Navbar.Brand href="/">
                <img src={Logo_Landing_Page} className="h-6 sm:h-14" alt="Salman Logo" />
            </Navbar.Brand>
            <div className="flex items-center space-x-20">
                <Navbar.Collapse>
                    <Navbar.Link href="/" active>
                        <Button color="transparent" className="text-gray-700 md:text-base md:font-bold">Home</Button>
                    </Navbar.Link>
                    <Navbar.Link href="/#pengelolaan-sampah">
                        <Dropdown menu={{ items: pengelolaanSampah }} placement="bottomRight">
                            <Button color="transparent" className="text-gray-700 md:text-base md:font-bold">Pengelolaan Sampah</Button>
                        </Dropdown>
                    </Navbar.Link>
                    <Navbar.Link href="/#wadah-qurban">
                        <Dropdown menu={{ items: wadahQurban }} placement="bottomRight">
                            <Button color="transparent" className="text-gray-700 md:text-base md:font-bold">Wadah Qurban</Button>
                        </Dropdown>
                    </Navbar.Link>

                </Navbar.Collapse>
                <Button color="primary" className="text-white px-4" onClick={handleLoginClick}>Login</Button>
                <Navbar.Toggle />
            </div>
        </Navbar>
    </Flowbite>
  );
}