import React from 'react';
import { useForm } from 'react-hook-form';
import Bg_Login from '../../../assets/Bg_Login.svg';
import Logo from '../../../assets/Logo_Salman.svg';
import { DataLogin } from '../types';
import { login } from '../mutations';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm<DataLogin>();

  const { mutateAsync } = useMutation({
    mutationKey: ["post-data"],
    mutationFn: login
  });


  const onSubmit = async (data: DataLogin) => {
    try {
      console.log(data);
      const res = await mutateAsync(data);
      localStorage.setItem("token", res.data.token)
      toast.success("berhasil login");
      window.location.pathname = "/app/dashboard"
    } catch (error:AxiosError | any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover flex items-center justify-center">
      <div className="fixed right-0">
        <img src={Bg_Login} alt="" />
      </div>
      <div className="container bg-white border-2 border-[#AEA0A7] rounded-2xl w-[25vw] flex flex-col items-center gap-y-5 py-10 z-50">
        <div>
          <img src={Logo} alt="" />
        </div>
        <p className="text-black font-regular">Silahkan masuk ke akun Anda</p>

        <form className="flex flex-col items-center w-full gap-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="textbox username w-[90%]">
            <input
              id="username"
              type="email"
              placeholder='Email'
              required
              {...register('email')}
              className="placeholder:text-sm placeholder-[#AEA0A7] w-full px-4 h-12 rounded-[7px] border-2 border-[#AEA0A7]"
            />
          </div>
          <div className="w-[90%]">
            <input
              id="password"
              type="password"
              placeholder='Password'
              required
              {...register('password')}
              className="placeholder:text-sm placeholder-[#AEA0A7] w-full px-4 h-12 rounded-[7px] border-2 border-[#AEA0A7]"
            />
          </div>
          <div className="flex justify-center w-[90%]">
            <button className="h-12 text-white w-full rounded-[7px] bg-[#967C55]" type="submit">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
