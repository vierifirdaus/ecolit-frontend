import React, { useState } from "react";
import Sidebar from "../../../assets/ui/sidebar"
import Navbar from '../../../assets/ui/Navbar';
import Hide from '../../../assets/icon/Hide.svg';
import Show from '../../../assets/icon/Show.svg';
import { DataChangePassword } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { putChangePassword } from "../mutations";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function changePasswordPage() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState('password');
    const [newType, setNewType] = useState('password');
    const [confirmType, setConfirmType] = useState('password');
    const [icon, setIcon] = useState(Show);
    const [newicon, setNewIcon] = useState(Show);
    const [confirmicon, setConfirmIcon] = useState(Show);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<DataChangePassword>();

    const { mutateAsync, error } = useMutation({
        mutationKey: ["post-data"],
        mutationFn: putChangePassword
    });

    const onSubmit = async (data: DataChangePassword) => {
        console.log("klik submit")
        try {
          console.log(data);
          const res = await mutateAsync(data);
          toast.success("berhasil ganti akun");
        } catch (error:AxiosError | any) {
          toast.error(error.response.data.message);
        }
    };

    const handleTogglePassword = () => {
        if (type === 'password') {
            setType('text');
            setIcon(Hide);
        } else {
            setType('password');
            setIcon(Show);
        }
    }

    const handleToggleNewPassword = () => {
        if (newType === 'password') {
            setNewType('text');
            setNewIcon(Hide);
        } else {
            setNewType('password');
            setNewIcon(Show);
        }
    }

    const handleToggleConfirmPassword = () => {
        if (confirmType === 'password') {
            setConfirmType('text');
            setConfirmIcon(Hide);
        } else {
            setConfirmType('password');
            setConfirmIcon(Show);
        }
    }
    

    return (
        <div className='flex w-screen'>
            <div className="absolute z-[100]">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full h-screen bg-[#F6F6F6] pl-[5vw]">
                <div className="flex justify-between items-center p-5">
                    <Navbar/>
                </div>
                <div className="body h-full px-5 pb-5 pt-1">
                    <div className="container flex flex-col h-full w-full shadow-md bg-white rounded-md p-5">
                        <h1 className="text-3xl font-bold">Change Password</h1>
                        <h2 className="text-md text-gray-500 font-normal mt-2">Change your account password</h2>
                        <div className="border border-gray-300 mt-5"></div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6 mt-5 flex items-center gap-10">
                                <label htmlFor="password" className="text-sm font-medium w-[12vw] text-gray-900">Password Lama</label>
                                <div className="flex justify-between bg-gray-50 border w-[40vw] border-gray-300 rounded-lg pr-2">
                                    <input 
                                        id="password" 
                                        type={type} 
                                        placeholder="Password Lama" 
                                        required 
                                        {...register('oldPassword')}
                                        className="bg-gray-50 w-full text-gray-900 text-sm rounded-lg border-none p-2.5 focus:ring-transparent"
                                    /> 
                                    <span className="flex justify-around items-center cursor-pointer" onClick={handleTogglePassword}>
                                        <img src={icon} alt="icon" />
                                    </span>
                                </div>
                            </div> 
                            <div className="mb-6 mt-5 flex items-center gap-10">
                                <label htmlFor="password" className="text-sm font-medium w-[12vw] text-gray-900">Password Baru</label>
                                <div className="flex justify-between bg-gray-50 border w-[40vw] border-gray-300 rounded-lg pr-2">
                                    <input 
                                    type={newType}
                                    {...register('newPassword')}
                                    id="password"  
                                    className="bg-gray-50 w-full text-gray-900 text-sm rounded-lg border-none p-2.5 focus:ring-transparent" 
                                    placeholder="Password Baru" required />
                                    <span className="flex justify-around items-center cursor-pointer" onClick={handleToggleNewPassword}>
                                        <img src={newicon} alt="icon" />
                                    </span>
                                </div>
                            </div> 
                            <div className="mb-6 mt-5 flex items-center gap-10">
                                <label htmlFor="password" className="text-sm font-medium w-[12vw] text-gray-900">Konfirmasi Password Baru</label>
                                <div className="flex justify-between bg-gray-50 border w-[40vw] border-gray-300 rounded-lg pr-2">
                                    <input 
                                    type={confirmType} 
                                    {...register('confNewPassword')}
                                    id="password"  
                                    className="bg-gray-50 w-full text-gray-900 text-sm rounded-lg border-none p-2.5 focus:ring-transparent" 
                                    placeholder="Konfirmasi Password Baru" required />
                                    <span className="flex justify-around items-center cursor-pointer" onClick={handleToggleConfirmPassword}>
                                        <img src={confirmicon} alt="icon" />
                                    </span>
                                </div>
                            </div> 
                            <div className="w-[55vw] flex justify-end mt-5">
                                <button type="submit" className="bg-[#967C55] text-white font-semibold text-sm rounded-lg px-5 py-2.5">Change Password</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>

        </div>
    );
}

export default changePasswordPage;