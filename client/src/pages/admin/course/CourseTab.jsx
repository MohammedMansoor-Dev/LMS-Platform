import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const SkeletonLoader = ({ className }) => (
    <div className={`${className} bg-gray-200 animate-pulse rounded-md`} />
);

const CourseTab = () => {
    const params = useParams()
    const courseId = params.courseId

    const [input, setInput] = useState({
        courseTitle: '',
        subTitle: '',
        description: '',
        category: '',
        courseLevel: '',
        coursePrice: '',
        courseThumbnail: ''
    })

    const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true })
    const course = courseByIdData?.course

    useEffect(() => {
        if (course) {
            setInput({
                courseTitle: course.courseTitle || '',
                subTitle: course.subTitle || '',
                description: course.description || '',
                category: course.category || '',
                courseLevel: course.courseLevel || '',
                coursePrice: course.coursePrice || '',
                courseThumbnail: course.courseThumbnail || ''
            })
        }
    }, [courseByIdData])

    const [previewThumbnail, setPreviewThumbnail] = useState('')
    const navigate = useNavigate()

    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation()
    const [publishCourse, { }] = usePublishCourseMutation()

    const changeEventHandler = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const selectCategory = (value) => {
        setInput({ ...input, category: value })
    }

    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setInput({ ...input, courseThumbnail: file })
            const fileReader = new FileReader()
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result)
            fileReader.readAsDataURL(file)
        }
    }

    const updateCourseHandler = async () => {
        const formData = new FormData()
        formData.append('courseTitle', input.courseTitle)
        formData.append('subTitle', input.subTitle)
        formData.append('description', input.description)
        formData.append('category', input.category)
        formData.append('coursePrice', input.coursePrice)
        formData.append('courseLevel', input.courseLevel)
        formData.append('courseThumbnail', input.courseThumbnail)
        await editCourse({ formData, courseId })
    }

    const publishStatusHandler = async (action) => {
        try {
            const response = await publishCourse({ courseId, query: action })
            if (response.data) {
                refetch()
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error('Failed to publish or unpublish course')
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Course updated.')
            navigate('/admin/course')
        }
        if (error) {
            toast.error(error.data?.message || 'Failed to update Course.')
        }
    }, [isSuccess, error])

    if (courseByIdLoading) {
        return (
            <Card>
                <CardHeader className='flex justify-between flex-row'>
                    <div>
                        <CardTitle>
                            <SkeletonLoader className="h-5 w-48" />
                        </CardTitle>
                        <CardDescription>
                            <SkeletonLoader className="h-3 w-80 mt-2" />
                        </CardDescription>
                    </div>
                    <div className='space-x-2'>
                        <SkeletonLoader className="h-10 w-28" />
                        <SkeletonLoader className="h-10 w-28" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 mt-5">
                        <div>
                            <Label><SkeletonLoader className="h-4 w-20" /></Label>
                            <SkeletonLoader className="h-10 w-full mt-2" />
                        </div>
                        <div>
                            <Label><SkeletonLoader className="h-4 w-20" /></Label>
                            <SkeletonLoader className="h-10 w-full mt-2" />
                        </div>
                        <div>
                            <Label><SkeletonLoader className="h-4 w-20" /></Label>
                            <SkeletonLoader className="h-36 w-full mt-2" />
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <Label><SkeletonLoader className="h-4 w-20" /></Label>
                                <SkeletonLoader className="h-10 w-40 mt-2" />
                            </div>
                            <div>
                                <Label><SkeletonLoader className="h-4 w-20" /></Label>
                                <SkeletonLoader className="h-10 w-40 mt-2" />
                            </div>
                            <div>
                                <Label><SkeletonLoader className="h-4 w-20" /></Label>
                                <SkeletonLoader className="h-10 w-32 mt-2" />
                            </div>
                        </div>
                        <div>
                            <Label><SkeletonLoader className="h-4 w-20" /></Label>
                            <SkeletonLoader className="h-10 w-48 mt-2" />
                        </div>
                        <div className='space-x-2'>
                            <SkeletonLoader className="h-10 w-28" />
                            <SkeletonLoader className="h-10 w-28" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    // const isPublished = false
    return (
        <Card>
            <CardHeader className='flex justify-between flex-row'>
                <div>
                    <CardTitle>Best Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you're done
                    </CardDescription>
                </div>
                <div className='space-x-2'>
                    <Button disabled={courseByIdData?.course.lectures.length === 0} variant='outline' onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? 'false' : 'true')}>
                        {courseByIdData?.course.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Title</Label>
                        <Input value={input.courseTitle} onChange={changeEventHandler} type='text' placeholder='Ex. Full Stack developer' name='courseTitle' />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input value={input.subTitle} onChange={changeEventHandler} type='text' placeholder='Ex. Become a Full Stack developer with MERN Stack' name='subTitle' />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>
                    <div className='flex items-center gap-5'>
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={selectCategory} value={input.category}>
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
                        <div>
                            <Label>Course Level</Label>
                            <Select onValueChange={selectCourseLevel} value={input.courseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Course Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price in (INR)</Label>
                            <Input type='number' name='coursePrice' value={input.coursePrice} onChange={changeEventHandler} placeholder='₹ 999' className='w-fit' />
                        </div>
                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input onChange={selectThumbnail} type='file' accept='image/*' className='w-fit' />
                        {previewThumbnail && <img src={previewThumbnail} className='w-64 h-64 my-2' alt='Course Thumbnail' />}
                    </div>
                    <div className='space-x-2'>
                        <Button variant='outline' onClick={() => navigate('/admin/course')}>Cancel</Button>
                        <Button disabled={isLoading} onClick={updateCourseHandler}>
                            {isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
                                </>
                            ) : 'Save'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab
