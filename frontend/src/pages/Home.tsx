import logo from "../assets/logo.png"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import {X,Menu, LogOut, Hand} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader ,DialogTitle} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "@/utils/Firebase"
import api from "@/utils/axios"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { logoutUser, setUser } from "@/redux/userSlice"
import { toast } from "sonner"



const Home = () =>{
  
  const [openMenu, setOpenMenu] = useState(false)  
  const [modelOpen, setmodelOpen] = useState(false) // this is the box which comes when clicked SignIN
  
  const {user} = useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch<AppDispatch>()


    // Google Auth
    const googleAuth = async()=>{
        try{
            const result = await signInWithPopup(auth,provider)
            const token = await result.user?.getIdToken()
            const response = await api.post("/api/auth/login",{token})
            dispatch(setUser(response.data.user))
            setmodelOpen(false);

            toast.success("Login Successfully")

        }catch(error){
            console.log(error)
            toast.error("Failed to Login")
        }    
    }
    // HandleLogout 
    const HandleLogout = async()=>{
        try{
            const response = await api.get("/api/auth/logout")
            if(response.data.success){
                dispatch(logoutUser()) // current user ka data null ho jayega
            }
            toast.success("Logout Successfully")
        }catch(error){
            console.log(error)
            toast.error("Failed to Logout")
        }
    }

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 ">
        <header className="sticky top-0 z-50 border-b bg-white  border-slate-100
         backdrop-blur">

            {/* Nav-Bar */}
            <div className="mx-auto flex max-w-6x1 items-center justify-between px-4 py-4 sm:px-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="h-6 w-6 rounded-sm object-contain" />
                    <span className="text-lg font-semibold tracking-tight">DigiSeller</span>
                </div>
                {/* SignIn Button */}
                <div className="hidden items-center gap-3 md:flex">
                    {user?(
                        <div className="flex items-center gap-3">
                            {/* Avtar */}
                            <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-indigo-100 text-xs font-medium text-indigo-600">
                                       {user?.name.split(" ").map((part)=>part[0]).join(" ").toUpperCase()} 
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-slate-700">{user?.name}</span>
                            </div>
                            {/* Logout button */}
                            <Button onClick={HandleLogout} variant="outline" className="gap-1.5">
                                <LogOut className="w-4 h-4"/>
                                Logout
                            </Button>

                        </div>
                    ):(
                        <Button onClick={()=>setmodelOpen(!modelOpen)} className="bg-indigo-600 hover:bg-indigo-700">
                            SignIn
                        </Button>
                    )}
                    
                </div>
                {/* Hamberger */}
                <button className="md:hidden" onClick={()=>setOpenMenu(!openMenu)}>
                    {openMenu?<X className="h-6 w-6"/>:<Menu className="h-6 w-6"/>}
                </button>
            </div>

            {openMenu &&(
                <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py- 4 sm:px-6 md:hidden  ">
                    {user?<>
                      {/* Avtar */}
                            <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-indigo-100 text-xs font-medium text-indigo-600">
                                       {user?.name.split(" ").map((part)=>part[0]).join(" ").toUpperCase()} 
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-slate-700">{user?.name}</span>
                            </div>
                            {/* Logout Button */}
                            <Button onClick={HandleLogout} variant="outline" className="w-full">
                                <LogOut className="w-4 h-4"/>
                                Logout
                            </Button>

                    </>:<Button onClick={()=>setmodelOpen(!modelOpen)} className="bg-indigo-600 hover:bg-indigo-700"> SignIn</Button>
                }
                </div>
                    
            )}
        </header>

        <Dialog open={modelOpen} onOpenChange={setmodelOpen}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader className="items-center text-center">
                    <img src={logo} alt="logo" className="h-10 w-10 rounded-md object-contain" />
                    <DialogTitle className= "mt-2 text-lg font-semibold">
                        DigiSeller
                    </DialogTitle>
                </DialogHeader>
                <Button onClick={googleAuth} variant="outline" className="mt-2 w-full gap-2">
                    <FcGoogle className="w-4 h-4"/>
                    Continue with Google
                </Button>
                <p className="mt-4 text-center text-xs text-slate-400">
                    Secure authentication by Firebase
                </p>
            </DialogContent>
        </Dialog>
    </div>
  )
}



export default Home;
