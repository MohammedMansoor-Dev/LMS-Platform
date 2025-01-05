import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='flex'>
            <div className='sticky lg:block w-[140px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 top-0 h-screen'>
                <div className='space-y-4'>
                    <Link to='dashboard' className='flex items-center gap-2'>
                        <ChartNoAxesColumn size={22} />
                        <h1>Dashboard</h1>
                    </Link>
                    <Link to='course' className='flex items-center gap-2'>
                        <SquareLibrary size={22} />
                        <h1>Courses</h1>
                    </Link>
                </div>
            </div>
            <div className='flex-1 p-12'>
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar
