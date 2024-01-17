import React from 'react'

const Summary = () => {
    return (
        <div className='bg-[#f8f8f8]'>

            <p className='p-4 font-mono'>
                Part A place on the table, then get the part B, Connect both together as shown
                Part A place on the table, then get the part B, Connect both together as shown
                Part A place on the table, then get the part B, Connect both together as shown
                Part A place on the table, then get the part B, Connect both together as shown
                Part A place on the table, then get the part B, Connect both together as shown
            </p>

            <div className='flex flex-wrap gap-2 justify-center'>
                <img src="/src/assets/images/004.jpg" alt="" srcSet="" width='250px'/>
                <img src="/src/assets/images/003.jpg" alt="" srcSet="" width='250px'/>
            </div>

            <p className='text-center py-6'> After assembled</p>

            <div className='flex justify-center pb-4'>
                <img src="/src/assets/images/006.png" alt="" width='500px' />
            </div>
        </div>
    )
}

export default Summary