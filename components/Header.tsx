"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import useAuthModal from "@/hooks/UseAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import Button from "./Button";
import { log } from "console";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // TODO: Refresh any playing song
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  return (
    <div
      className={twMerge(
        `
        h-fit
        bg-gradient-to-b
      from-emerald-800
        p-6`,
        className
      )}
    >
      <div className='w-full mb-4 flex items-center justify-between'>
        {/* Desktop View */}
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            onClick={() => router.back()}
            className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
          >
            <RxCaretLeft className='text-white' size={35} />
          </button>
          <button
            onClick={() => router.forward}
            className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
          >
            <RxCaretRight className='text-white' size={35} />
          </button>
        </div>
        {/* Mobile View */}
        <div className='flex md:hidden gap-x-2 items-center'>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiHome className='text-black' size={20} />
          </button>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <BiSearch className='text-black' size={20} />
          </button>
        </div>
        {/* Log In, Sign Up */}
        <div className='flex justify-between items-center gap-x-4'>
          {/* Empty Fragment which helps with dynamic styles */}
          {user ? (
            <div className='flex gap-x-4 items-center'>
              <Button onClick={handleLogout} className='bg-white px-6 py-2'>
                Logout
              </Button>
              <Button
                onClick={() => router.push("./account")}
                className='bg-white'
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className='bg-transparent text-neutral-300 font-medium'
                >
                  SignUp
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className='bg-white px-6 py-2'
                >
                  LogIn
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
