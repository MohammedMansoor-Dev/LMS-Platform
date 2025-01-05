import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
    const prams = useParams()
    const courseId = prams.courseId
    const [lectureTitle, setLectureTitle] = useState('')
    const navigate = useNavigate()
    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation()

    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId })
    }

    const { data: lectureData, isLoading: lectureLoading, isError: lectureError, refetch } = useGetCourseLectureQuery(courseId)

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success(data.message || 'Lecture Created.')
            setLectureTitle('')
        }
        if (error) {
            toast.error(error.data.message || 'Failed to Create Lecture.')
        }
    }, [isSuccess, error, refetch])
    
    return (
        <div className='flex-1 mx-10'>
            <div className="mb-4 mt-24">
                <h1 className="font-bold text-xl">Let's add Lecture, add some basic course details for your new lecture</h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, voluptatem?</p>
            </div>
            <div className='space-y-4'>
                <div>
                    <Label>Lecture Title</Label>
                    <Input value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} type='text' className='' name='lectureTitle' placeholder='Your Lecture Name' />
                </div>

                <div className='flex items-center gap-2'>
                    <Button variant='outline' onClick={() => navigate(`/admin/course/${courseId}`)}>Back to course</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait
                                </>
                            ) : 'Create Lecture'
                        }
                    </Button>
                </div>
                <div className='mt-10'>
                    {
                        lectureLoading ? (<p>Loading Lecture...</p>) : lectureError ? (<p>Failed to load Lecture</p>) : lectureData.lectures.length === 0 ? <p>No Lecture available</p> : (
                            lectureData.lectures.map((lecture, index) => (
                                <Lecture key={lecture._id} courseId={courseId} lecture={lecture} index={index} />
                            ))
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default CreateLecture
