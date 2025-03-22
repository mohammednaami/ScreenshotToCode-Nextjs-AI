"use client";
import React from 'react'
import ImageUpload from './_components/ImageUpload'

function Dashboard() {

    return (
        <div className='lg:px-20 xl:px-40'>
            <h2 className='font-bold text-3xl'>Convert Screenshoot To Code with AI </h2>
                <ImageUpload />
        </div>
    )
}

export default Dashboard