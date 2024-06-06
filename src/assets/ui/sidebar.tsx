import { useState, useEffect} from "react";
import { TiChevronRightOutline, TiChevronLeftOutline  } from "react-icons/ti";
import Dashboard from '../../assets/icon/dashboard.svg';
import Tagihan from '../../assets/icon/invoice.svg';
import Recap_Off from "../../assets/icon/Rekap.svg";
import Collapse from '@mui/material/Collapse';
import Penanganan from '../../assets/icon/distribution.svg';
import Penjualan from '../../assets/icon/penjualan.svg';
import Sedekah from '../../assets/icon/sedekah.svg';
import Pengangkutan from '../../assets/icon/truck.svg';
import Manajemen from '../../assets/icon/manajemen.svg';
import Kolaborator from '../../assets/icon/kolaborator.svg';
import QuickCount from '../../assets/icon/QuickCount.svg';
import ReportKolaborator from '../../assets/icon/ReportKolaborator.svg';
import logo from "../Logo_Salman.svg";
import logo_off from "../Logo_Salman_Off.svg"
import { Sidebar, Label, Flowbite } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useStore } from "../../stores";
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/system';

const RedHoverMenuItem = styled(MenuItem)({
  '&.Mui-selected:hover': {
    backgroundColor: '#CABDA9',
  },
  '&.Mui-selected': {
    backgroundColor: '#CABDA9',
  },
  '&.Mui-focused': {
    backgroundColor: '#CABDA9',
  },

});


function SidebarComponent(){
  const isSidebarOpen = useStore(state => state.isSidebarOpen)
  const {setIsSidebarOpen} = useStore(state => state.actions)
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = useState(false);
  const [data, setData] = React.useState('sampah');
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleChange = (event: SelectChangeEvent) => {
    setData(event.target.value as string);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleSelectClick = () => {
    setIsSidebarOpen(true);
  };

  const buttonStyle = {
    backgroundColor: hover ? '#CABDA9' : 'transparent' && location.pathname === '/app/quick-count/besek' ? '#CABDA9' : 'transparent' && location.pathname === '/app/quick-count/thinwal' ? '#CABDA9' : 'transparent',
  };

  const handleClick = () => {
    setIsSidebarOpen(true)
    setOpen(!open);
  };

  useEffect(() => {
    if (location.pathname === '/app/quick-count/besek' || location.pathname === '/app/laporan-wadah-kolaborator' || location.pathname === '/app/quick-count/thinwal') {
      setData('qurban');
    }
  }, [location.pathname]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      ::-webkit-scrollbar {
        width: 0;
        background-color: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: transparent;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const customSidebar: CustomFlowbiteTheme = {
    sidebar: {
      root: {
        inner: "h-screen bg-white shadow-sm px-3 py-5 overflow-y-auto overflow-x-hidden",
      },
      collapse: {
        button: "group flex w-full items-center rounded-lg py-2 px-6 text-base font-normal text-gray-900 transition duration-75 hover:bg-[#CABDA9] dark:text-white dark:hover:bg-gray-700",
        icon: {
          "base": "border-2 border-black h-6 w-10 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
          "open": {
            "off": "",
            "on": "text-gray-900"
          }
        },
        label: {
          base: "ml-5 flex-1 whitespace-nowrap text-left",
          icon: {
            "base": "h-6 w-10 transition delay-0 ease-in-out",
            "open": {
              "on": "rotate-180",
              "off": ""
            }
          }
        },
        list: "space-y-2 py-2",
      },
    },
    
  };

  return (
    <Flowbite theme={{ theme: customSidebar }}>
      <Sidebar className="w-max" style={{ width: isSidebarOpen ? "15vw" : "5vw", transition: "width 0.3s ease", }} 
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <Sidebar.ItemGroup>
          <Sidebar.Item className={`flex hover:bg-transparent ${isSidebarOpen ? "":""}`} href="/app/dashboard">
            <div className="flex gap-4 w-max">
              <img className={`${isSidebarOpen ? "w-32" : "w-full h-full"}`} src={isSidebarOpen ? logo : logo_off} alt="" />
            </div>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <div className="max-w-md mt-5">
          <div className="mb-2 block">
            <Label htmlFor="countries" value={isSidebarOpen? "Pilih Data":""} />
          </div>
          <Box className="w-full">
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Data</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data}
                label="Data"
                onChange={handleChange}
                onClick={handleSelectClick}
              >
                <RedHoverMenuItem value="sampah">{isSidebarOpen ? "Data Sampah" : "1"}</RedHoverMenuItem>
                <RedHoverMenuItem value="qurban">{isSidebarOpen ? "Data Qurban" : "2"}</RedHoverMenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        {data === 'qurban' && (
        <Sidebar.Items className="sidebar-qurban mt-5">
          <Sidebar.ItemGroup className="space-y-2">
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/dashboard') ? 'bg-[#CABDA9]' : ''}`} href="/app/dashboard">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Dashboard} alt="" />
                {isSidebarOpen && "Dashboard"}
              </div>
            </Sidebar.Item>
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/laporan-wadah-kolaborator') ? 'bg-[#CABDA9]' : ''}`} href="/app/laporan-wadah-kolaborator">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={ReportKolaborator} alt="" />
                {isSidebarOpen && "Report Kolaborator"}
              </div>
            </Sidebar.Item>
            <ListItemButton sx={{borderRadius:2,py:2,}} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-full gap-5" onClick={handleClick}>
              <img className="w-[24px] h-[24px]" src={QuickCount} alt="" />
              <ListItemText className={`${isSidebarOpen?"block":"hidden"}`} primary={
                  <Typography variant="body2" style={{ fontSize: '14px' }}>
                    Quick Count
                  </Typography>
                } />
              {isSidebarOpen && 
                <div>
                  {open ? <ExpandLess /> : <ExpandMore />}
                </div>
              }
            </ListItemButton>
              {isSidebarOpen && 
                <Collapse className="text-left" in={open} timeout="auto" unmountOnExit>
                  <Sidebar.Item className=" hover:bg-[#CABDA9] overflow-hidden flex justify-start" href="/app/quick-count/besek">Besek</Sidebar.Item>
                  <Sidebar.Item className=" hover:bg-[#CABDA9] overflow-hidden flex justify-start" href="/app/quick-count/thinwal">Thinwall</Sidebar.Item>
              </Collapse>
              }
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className="space-y-5">
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/admin/managemen-pengguna') ? 'bg-[#CABDA9]' : ''}`} href="/app/managemen-pengguna">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Manajemen} alt="" />
                {isSidebarOpen && "Manajemen"}
              </div>
            </Sidebar.Item>
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/data-kolaborator') ? 'bg-[#CABDA9]' : ''}`} href="/app/data-kolaborator">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Kolaborator} alt="" />
                {isSidebarOpen && "Kolaborator"}
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        )}

        {data === 'sampah' && (
        <Sidebar.Items className="sidebar-sampah mt-5">
          <Sidebar.ItemGroup className="space-y-2">
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/dashboard') ? 'bg-[#CABDA9]' : ''}`} href="/app/dashboard">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Dashboard} alt="" />
                {isSidebarOpen && "Dashboard"}
              </div>
            </Sidebar.Item>
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/penanganan-sampah') ? 'bg-[#CABDA9]' : ''}`} href="/app/penanganan-sampah">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Penanganan} alt="" />
                {isSidebarOpen && "Penanganan"}
              </div>
            </Sidebar.Item>
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/pengangkutan-sampah') ? 'bg-[#CABDA9]' : ''}`} href="/app/pengangkutan-sampah">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Pengangkutan} alt="" />
                {isSidebarOpen && "Pengangkutan"}
              </div>
            </Sidebar.Item>
            <ListItemButton sx={{borderRadius:2,py:2,}} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-full gap-5" onClick={handleClick}>
              <img className="w-[24px] h-[24px]" src={Recap_Off} alt="" />
              <ListItemText className={`${isSidebarOpen?"block":"hidden"}`} primary={
                  <Typography variant="body2" style={{ fontSize: '14px' }}>
                    Rekap
                  </Typography>
                } />
              {isSidebarOpen && 
                <div>
                  {open ? <ExpandLess /> : <ExpandMore />}
                </div>
              }
            </ListItemButton>
              {isSidebarOpen && 
                <Collapse className="text-left" in={open} timeout="auto" unmountOnExit>
                  <Sidebar.Item className=" hover:bg-[#CABDA9] overflow-hidden flex justify-start" href="/app/rekap/hasil-total-penanganan-sampah">
                    <span className="inline-block animate-marquee">Hasil Total Penanganan Sampah</span>
                  </Sidebar.Item>
                  <Sidebar.Item className=" hover:bg-[#CABDA9] overflow-hidden flex justify-start" href="/app/rekap/hasil-pengangkutan-sampah-residu">
                    <span className="inline-block animate-marquee">Hasil Pengangkutan Sampah Residu</span>
                  </Sidebar.Item>
                  <Sidebar.Item className=" hover:bg-[#CABDA9] overflow-hidden flex justify-start" href="/app/rekap/hasil-pemilahan-mandiri">Hasil Pemilihan Mandiri</Sidebar.Item>
              </Collapse>
              }
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/tagihan') ? 'bg-[#CABDA9]' : ''}`} href="/app/tagihan">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Tagihan} alt="" />
                {isSidebarOpen && "Tagihan"}
              </div>
            </Sidebar.Item>
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/penjualan-sampah') ? 'bg-[#CABDA9]' : ''}`} href="/app/penjualan-sampah">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Penjualan} alt="" />
                {isSidebarOpen && "Penjualan Sampah"}
              </div>
            </Sidebar.Item>
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/sedekah-sampah') ? 'bg-[#CABDA9]' : ''}`} href="/app/sedekah-sampah">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Sedekah} alt="" />
                {isSidebarOpen && "Sedekah Sampah"}
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className="space-y-5">
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/managemen-pengguna') ? 'bg-[#CABDA9]' : ''}`} href="/app/managemen-pengguna">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Manajemen} alt="" />
                {isSidebarOpen && "Manajemen"}
              </div>
            </Sidebar.Item>
            <Sidebar.Item className={`flex hover:bg-[#CABDA9] py-4 focus:bg-[#CABDA9] ${isActive('/app/pihak-ketiga') ? 'bg-[#CABDA9]' : ''}`} href="/app/pihak-ketiga">
              <div className={`flex gap-4 justify-start items-center ${isSidebarOpen ? "W-full" : "w-max"}`}>
                <img className="w-[24px] h-[24px]" src={Kolaborator} alt="" />
                {isSidebarOpen && "Pihak Ketiga"}
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        )}
      </Sidebar>
    </Flowbite>
  );
}

export default SidebarComponent;