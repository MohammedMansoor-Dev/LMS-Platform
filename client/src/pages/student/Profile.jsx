import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi.js'
import { toast } from 'sonner'

const Profile = () => {
    const { data, isLoading, error, refetch } = useLoadUserQuery()
    const [updateUser, { isLoading: updateUserIsLoading, error: updateUserError, isSuccess, isError }] = useUpdateUserMutation()

    const [name, setName] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')

    useEffect(()=>{
        refetch()
    }, [])

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success(data?.message || 'Profile Updated.')
        }
        if (isError) {
            toast.error(error?.message || 'Profile Updation Failed.')
        }
    }, [isSuccess, isError, data, error])

    const onChangeHandler = (e) => {
        const file = e.target.files?.[0]
        if (file) setProfilePhoto(file)
    }

    const updateUserHandler = async () => {
        if (!name.trim()) {
            toast.error('Name cannot be empty.')
            return
        }
        if (!profilePhoto) {
            toast.error('Please select a profile photo.')
            return
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('profilePhoto', profilePhoto)
        await updateUser(formData)
    }

    if (isLoading) {
        return (
            <div className='my-24 max-w-4xl mx-auto px-4'>
                <h1 className='font-bold text-2xl text-center md:text-left'>PROFILE</h1>
                <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
                    <div className='flex flex-col items-center'>
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 rounded-full animate-pulse" />
                    </div>
                    <div>
                        <div className="mb-2">
                            <div className="w-1/2 h-6 bg-gray-300 animate-pulse"></div>
                        </div>
                        <div className="mb-2">
                            <div className="w-1/3 h-6 bg-gray-300 animate-pulse"></div>
                        </div>
                        <div className="mb-2">
                            <div className="w-1/4 h-6 bg-gray-300 animate-pulse"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='font-medium text-lg'>Courses you're enrolled in</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="w-full h-32 bg-gray-300 animate-pulse rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="my-24 max-w-4xl mx-auto px-4">
                <h1 className="text-red-600">Error: {error?.message || 'Failed to load user data'}</h1>
            </div>
        )
    }

    const user = data?.user

    if (!user) {
        return (
            <div className="my-24 max-w-4xl mx-auto px-4">
                <h1 className="text-red-600">No user data found</h1>
            </div>
        )
    }

    return (
        <div className='my-10 max-w-4xl mx-auto px-4'>
            <h1 className='font-bold text-2xl text-center md:text-left'>PROFILE</h1>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
                <div className='flex flex-col items-center'>
                    <Avatar className='h-24 w-24 md:h-32 md:w-32 mb-4'>
                        <AvatarImage className='rounded-full' src={user?.photoUrl || "https://github.com/shadcn.png"} />
                        <AvatarFallback>{user.name ? user.name[0] : 'U'}</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Name: <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.name}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Email: <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.email}</span>
                        </h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                            Role: <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.role?.toUpperCase()}</span>
                        </h1>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size='sm' className='mt-2'>Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name">Name</Label>
                                    <Input onChange={(e) => setName(e.target.value)} id="name" placeholder='Name' className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="profilePhoto">Profile Photo</Label>
                                    <Input onChange={onChangeHandler} type='file' id='profilePhoto' accept='image/*' className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                                    {updateUserIsLoading ? (
                                        <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait</>
                                    ) : 'Save changes'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                <h1 className='font-medium text-lg'>Courses you're enrolled in</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
                    {user.enrolledCourses.length === 0 ? (
                        <h1>You haven't enrolled yet</h1>
                    ) : (
                        user.enrolledCourses.map((course) => <Course course={course} key={course._id} />)
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
