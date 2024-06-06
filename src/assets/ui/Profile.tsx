import Setting from "../icon/Setting";
import Notification from "../icon/Notification";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useQuery } from "@tanstack/react-query";
import { getNotif, getUserByToken } from "../../features/Login/queries";
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Alert from '../icon/alert.svg'
import { Bell, User } from "phosphor-react";
import Popover from "../../components/popover";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

const TransitionModal = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const profile = () => {
    const { data: dataUser } = useQuery({queryKey: ["user-data"], queryFn: getUserByToken})
    const [ notif, setNotif ] = React.useState(false)
    const [ listNotifs, setListNotifs ] = React.useState()
    const { data: notifs, isSuccess } = useQuery({queryKey: ["logs"], queryFn: getNotif, refetchInterval: 4*60*1000})

    React.useEffect(() => {
        if(isSuccess){
            if(listNotifs !== notifs){
                setListNotifs(notifs.data.data)
                setNotif(true)
            }
        }
    }, [notifs])

    

    const remove = () => {
        localStorage.removeItem('token')
        window.location.pathname = "/auth/login"
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
    <div className="flex p-3 gap-5 items-center cursor-pointer">
        <div>
            {
                dataUser?.data.data.role == "ADMIN" &&
                    <Popover 
                        trigger={
                            <button className="relative mt-1.5" onClick={() => setNotif(false)}>
                                <Bell size={28}/>
                                {
                                    notif && <div className="absolute h-2 w-2 rounded-full bg-blue-400 right-1 top-1"></div>
                                }
                            </button>
                        }
                        children={
                            <>
                                {
                                    isSuccess &&
                                    notifs.data.data.map((item: {name: string, activity: string}) => 
                                        <div>
                                            <h4>{item.name}</h4>
                                            <p>{item.activity}</p>
                                        </div>
                                    )
                                }
                            </>
                        }
                    />
            }
        </div>
        <div className="p-1 border-[2px] border-black rounded-full">
            <User size={20} color="black"/>
        </div>
        <div className="flex justify-between items-center mr-[5vw]" >
            <div className="leading-4">
                <h4 className="font-semibold">{dataUser?.data.data.name}</h4>
                <span className="text-xs text-gray-600">{dataUser?.data.data.email}</span>
                </div>
            </div>
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900">
                    <Setting />
                    </Menu.Button>
                </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                    <Menu.Items className="absolute right-0 z-10 mt-5 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                            {({ active }) => (
                                <a
                                href="change-password"
                                className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                )}
                                >
                                Reset Password
                                </a>
                            )}
                            </Menu.Item>
                                <Menu.Item>
                                {({ active }) => (
                                    <React.Fragment>
                                        <a
                                        // href="auth/login"
                                        // onClick={remove}
                                        onClick={handleClickOpen}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        >
                                        Logout
                                        </a>
                                        <Dialog
                                            open={open}
                                            TransitionComponent={TransitionModal}
                                            keepMounted
                                            onClose={handleClose}
                                            aria-describedby="alert-dialog-slide-description"
                                            className="px-10"
                                        >
                                            <DialogTitle className="w-full flex justify-center">
                                                <img className="mx-[10vw] my-5" src={Alert} alt="alert " />
                                            </DialogTitle>
                                            <DialogContent className="flex justify-center">
                                                <DialogContentText fontSize={20} id="alert-dialog-slide-description">
                                                    Apakah anda yakin ingin Logout?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="gap-x-5 mt-5">
                                                <button onClick={handleClose}>Batal</button>
                                                <button className="bg-[#b23b3b] px-5 py-2 rounded-md text-white font-semibold" onClick={remove}>Logout</button>
                                            </DialogActions>
                                        </Dialog>
                                    </React.Fragment>
                                )}
                                </Menu.Item>
                                
                            
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    </div>
    )

};
export default profile;
