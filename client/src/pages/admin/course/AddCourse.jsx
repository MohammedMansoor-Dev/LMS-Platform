import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { useEffect } from 'react'
import { toast } from 'sonner'

const AddCourse = () => {
    const navigate = useNavigate()
    const [courseTitle, setCourseTitle] = useState('')
    const [category, setCategory] = useState('')
    const [createCourse, { data, isLoading, isSuccess, error }] = useCreateCourseMutation()

    const getSelectedCategory = (value) => {
        setCategory(value)
    }

    const createCouseHandler = async () => {
        await createCourse({ courseTitle, category })
    }

    useEffect(() => {
        if(isSuccess){
            toast.success(data?.message || 'Course Created')
            navigate('/admin/course')
        }
    }, [isSuccess, error])
    

    return (
        <div className='flex-1 mx-10'>
            <div className="mb-4 mt-24">
                <h1 className="font-bold text-xl">Let's add course, add some basic course details for your new course</h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, voluptatem?</p>
            </div>
            <div className='space-y-4'>
                <div>
                    <Label>Title</Label>
                    <Input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} type='text' className='' name='courseTitle' placeholder='Your Course Name' />
                </div>
                <div>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="html">HTML</SelectItem>
                                <SelectItem value="css">CSS</SelectItem>
                                <SelectItem value="js">JS</SelectItem>
                                <SelectItem value="react">React</SelectItem>
                                <SelectItem value="nodejs">Node JS</SelectItem>
                                <SelectItem value="expressjs">Express JS</SelectItem>
                                <SelectItem value="mongodb">MongoDB</SelectItem>
                                <SelectItem value="fullstackdeveloper">Full Stack Development</SelectItem>
                                <SelectItem value="devops">Devops</SelectItem>
                                <SelectItem value="devsecops">DevSecops</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant='outline' onClick={() => navigate('/admin/course')}>Back</Button>
                    <Button disabled={isLoading} onClick={createCouseHandler}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait
                                </>
                            ) : 'Create'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddCourse
