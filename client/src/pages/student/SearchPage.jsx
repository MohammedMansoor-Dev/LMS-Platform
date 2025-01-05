import React from 'react'
import Filter from './Filter'
import SearchResult from './SearchResult'
import { useGetSearchCoursesQuery } from '@/features/api/courseApi'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const SearchPage = () => {

    const [searchParams] = useSearchParams()
    const query = searchParams.get('query')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [sortByPrice, setSortByPrice] = useState('')

    const { data, isLoading } = useGetSearchCoursesQuery({ searchQuery: query, categories: selectedCategories, sortByPrice })

    const isEmpty = !isLoading && data?.courses.length === 0

    const handleFilterChange = (categories, price) => {
        setSelectedCategories(categories)
        setSortByPrice(price)
    }

    return (
        <div className='max-w-7xl mx-auto p-4 md:p-8'>
            <div className='my-6'>
                <h1 className='font-bold text-xl md:text-2xl'>Result for '{query}'</h1>
                <p>Showing results for {' '}
                    <span className='text-blue-800 font-bold italic'>{query}</span>
                </p>
            </div>
            <div className='flex flex-col md:flex-row gap-10'>
                <Filter handleFilterChange={handleFilterChange} />
                <div className='flex-1'>
                    {
                        isLoading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <CourseSkeleton key={index} />
                            ))
                        ) : isEmpty ? (<CourseNotFound />) : (
                            data?.courses.map((course) => (
                                <SearchResult course={course} key={course._id} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchPage

const CourseSkeleton = () => {
    return (
        <p>Loading...</p>
    )
}

const CourseNotFound = () => {
    return (
        <p>Course not found</p>
    )
}
