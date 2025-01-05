import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { useState } from 'react';

const categories = [
    { id: 'react', label: 'React' },
    { id: 'nodejs', label: 'Nodejs' },
    { id: 'expressjs', label: 'Express' },
    { id: 'mongodb', label: 'MongoDB' },
    { id: 'devsecops', label: 'DevSecOps' },
    { id: 'devops', label: 'DevOps' },
    { id: 'fullstackdeveloper', label: 'Full Stack Developer' },
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JS' },
];

const Filter = ({ handleFilterChange }) => {

    const [selectedCategories, setSelectedCategories] = useState([])
    const [sortByPrice, setSortByPrice] = useState('')

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevCategories) => {
            const newCategories = prevCategories.includes(categoryId) ? prevCategories.filter((id) => id !== categoryId) : [...prevCategories, categoryId]

            handleFilterChange(newCategories, sortByPrice)
            return newCategories
        })
    }

    const selectByPriceHandler = (selectedValue) => {
        setSortByPrice(selectedValue)
        handleFilterChange(selectedCategories, selectedValue)
    }

    return (
        <div className='w-full md:w-[20%]'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold text-lg md:text-xl'>Filter Options</h1>
                <Select onValueChange={selectByPriceHandler}>
                    <SelectTrigger>
                        <SelectValue placeholder='Sort by' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort by Price</SelectLabel>
                            <SelectItem value='low'>Low to High</SelectItem>
                            <SelectItem value='high'>High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator className='my-4' />
            <div>
                <h1 className='font-semibold mb-2'>CATEGORY</h1>
                {
                    categories.map((category, index) => (
                        <div className='flex items-center space-x-2 my-2' key={index}>
                            <Checkbox id={category.id} onCheckedChange={() => handleCategoryChange(category.id)} />
                            <label
                                htmlFor={category.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {category.label}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Filter
