import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'


const BuyCourseButton = ({ courseId }) => {

  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation()

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId)
  }

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url
      } else {
        toast.error('Invalid response from server.')
      }
    }
    if (isError) {
      toast.error(error?.data?.message || 'Failed to create checkout')
    }
  }, [data, isSuccess, isError, error])

  return (
    <div className='w-full'>
      <Button disabled={isLoading} className='w-full' onClick={purchaseCourseHandler}>
        {
          isLoading ? (
            <>
              <Loader2 className='h-4 w-4 animate-spin mr-2' />Please wait
            </>
          ) : 'Purchase Course'
        }
      </Button>
    </div>
  )
}

export default BuyCourseButton
