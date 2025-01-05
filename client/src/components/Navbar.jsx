import { Menu, School } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DarkMode from '@/DarkMode'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'


const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await logoutUser()
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || 'User Logout.')
            navigate('/login')
        }
    }, [isSuccess])

    return (
        <div className='h-16 dark:bg-[#141414] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School size={'30'} />
                    <h1 className='hidden md:block font-extrabold text-2xl cursor-pointer' onClick={() => navigate('/')}>E-Learning</h1>
                </div>
                <div className='flex items-center gap-8'>
                    {
                        user ?
                            (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem><Link to='my-learning'>My Learning</Link></DropdownMenuItem>
                                        <DropdownMenuItem><Link to='profile'>Edit Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        {
                                            user.role === 'instructor' && (
                                                <DropdownMenuItem><Link to='admin/dashboard'>Dashboard</Link></DropdownMenuItem>
                                            )
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <Button onClick={() => navigate('/login')} variant='outline'>Login</Button>
                                    <Button onClick={() => navigate('/login')}>Signup</Button>
                                </div>
                            )
                    }
                    <DarkMode />
                </div>
            </div>

            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='font-extrabold text-2xl'>E-Learning</h1>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar

const MobileNavbar = () => {

    const { user } = useSelector(store => store.auth)
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await logoutUser()
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || 'User Logout.')
            navigate('/login')
        }
    }, [isSuccess])

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className='rounded-full' variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
                <SheetHeader className='flex flex-row items-center justify-between mt-2'>
                    <SheetTitle>E-Learning</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className='mr-2' />
                <nav className='flex flex-col space-y-4'>
                    <span><Link to='my-learning'>My Learning</Link></span>
                    <span><Link to='profile'>Edit Profile</Link></span>
                    <span onClick={logoutHandler}>Log out</span>
                </nav>
                {
                    user?.role === 'instructor' && (
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button><Link to='admin/dashboard'>Dashboard</Link></Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }
            </SheetContent>
        </Sheet>
    )
}
