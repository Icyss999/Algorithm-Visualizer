"use client"
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { SignUpForm, signUpFormSchema } from "@/src/types/schema";
import { authClient } from "@/src/lib/authClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {

    const [error,setError] = useState<string|null>(null)
    const router = useRouter()

    const {register,handleSubmit, formState:{errors}} = useForm<SignUpForm>({
        resolver: zodResolver(signUpFormSchema) 
    })

    const onSubmit = async (submission: SignUpForm)=>{
        await authClient.signUp.email({
            name: submission.name,
            email: submission.email,
            password: submission.password,
            fetchOptions:{
                onSuccess: ()=>{
                   router.push("/algorithm") 
                },
                onError: (ctx)=>{
                    setError(ctx.error.message)
                }
            }
        }
        )
    }



  return (
    <div
      className="flex flex-col gap-10 bg-foreground min-h-screen justify-center"
      style={{ fontFamily: "'Inter', monospace" }}
    >
      <div className="flex flex-col gap-5">
        <Label className="font-mono text-white font-medium text-3xl flex flex-col tracking-widest">
          {" "}
          Welcome to Icyrhythm
        </Label>
        <Label className="font-mono text-white/40 text-base tracking-widest flex flex-col ">
          {" "}
          Please sign in your account to proceed
        </Label>
      </div>

      <div className="flex justify-center">
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[500px]">
            <div className="flex flex-col gap-1.5">
            <Label className="text-white text-xs font-mono uppercase tracking-widest">
              Name
            </Label>
            <Input
              type="text"
              placeholder="Mr Sakk"
              className="bg-[#0d1117] border-zinc-500 rounded-md px-3 py-2.5 text-white text-sm font-mono placeholder:text-white/50 focus:outline-none focus:border-[#4F8EF7]/50 transition-colors focus-visible:ring-0"
              {...register("name")}
            />
            {errors.name?.message && <Label className="text-red-500"> {errors.name.message} </Label>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-white text-xs font-mono uppercase tracking-widest">
              Email
            </Label>
            <Input
              type="email"
              placeholder="sakk@example.com"
              className="bg-[#0d1117] border-zinc-500 rounded-md px-3 py-2.5 text-white text-sm font-mono placeholder:text-white/50 focus:outline-none focus:border-[#4F8EF7]/50 transition-colors focus-visible:ring-0"
                {...register("email")}
            />
            {errors.email?.message && <Label className="text-red-500"> {errors.email.message} </Label>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-white text-xs font-mono uppercase tracking-widest">
              Password
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-[#0d1117] border-zinc-500 rounded-md px-3 py-2.5 text-white text-sm font-mono placeholder:text-white/50 focus:outline-none focus:border-[#4F8EF7]/50 transition-colors focus-visible:ring-0"
                {...register("password")}
            />
            {errors.password?.message && <Label className="text-red-500"> {errors.password.message} </Label>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-white text-xs font-mono uppercase tracking-widest">
              Confirm Password
            </Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-[#0d1117] border-zinc-500 rounded-md px-3 py-2.5 text-white text-sm font-mono placeholder:text-white/50 focus:outline-none focus:border-[#4F8EF7]/50 transition-colors focus-visible:ring-0"
                {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && <Label className="text-red-500"> {errors.confirmPassword.message} </Label>}
          </div>
            <Button 
            type = "submit"
            className="w-full bg-[#4F8EF7] hover:bg-[#3d7de6] text-white text-sm font-mono py-2.5 rounded-md transition-colors cursor-pointer mt-1">
                Create my account
            </Button>
            {error && <Label className="text-red"> {error} </Label>}
        </form>
      </div>


      <div className="flex justify-center gap-3">
        <Label className="text-white text-sm"> Don&apos;t have an account? </Label>
        <Link href="/signin" className="text-white/70 text-sm hover:underline hover:text-white"> Click here</Link>
      </div>
    </div>
  );
}
