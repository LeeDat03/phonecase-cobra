import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "./ui/button";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModal = ({ isOpen, setIsOpen }: LoginModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="absolute z-[99999] ">
        <DialogHeader>
          <div className="relative mx-auto w-24 h-24 mb-2">
            <Image
              src="/snake-1.png"
              alt="Snake Logo"
              className="object-contain"
              fill
            />
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tight">
            Log in to continue
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-zinc-900">
              You configuration was saved!
            </span>{" "}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
          <LoginLink
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Login
          </LoginLink>
          <RegisterLink
            className={buttonVariants({
              variant: "default",
            })}
          >
            Sign up
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
