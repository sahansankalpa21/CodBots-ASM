import React from 'react'
import Accordion from './Accordion';
import { useState } from 'react';

const Timeline = () => {

    const [sectionDetails, setSectionDetails] = useState({})

    const [accordions, setAccordion] = useState([
        {
            key: 1,
            title: 'Tail ASM',
            data: ['Step - 01', 'Step - 02', 'Step - 03', 'Step - 01', 'Step - 02', 'Step - 03', 'Step - 01', 'Step - 02', 'Step - 03', 'Step - 03', 'Step - 01', 'Step - 02', 'Step - 03'],
            isOpen: false
        },
        {
            key: 2,
            title: 'Logo ASM',
            data: ['Step - 01', 'Step - 02', 'Step - 03'],
            isOpen: false
        },
    ]);

    const getAllSections = () => {

    }

    const getSectionDetails = (section) => {

    }

    const toggleAccordion = (accordionkey) => {
        const updatedAccordions = accordions.map((accord) => {
            if (accord.key === accordionkey) {
                return { ...accord, isOpen: !accord.isOpen };
            } else {
                return { ...accord, isOpen: false };
            }
        });

        setAccordion(updatedAccordions);
    };

    return (
        <div>


            <div className="p-2">

                {accordions.map((accordion) => (

                    <div className="border rounded-md mb-1">
                        
                        <button
                            className="w-full px-4 py-2 text-left bg-[#e9e9e9] hover:bg-gray-300 transition duration-300"
                            onClick={() => toggleAccordion(accordion.key)}
                        >

                            {accordion.title}

                            <span className={`float-right transform ${accordion.isOpen ? 'rotate-180' : 'rotate-0'}  transition-transform duration-300`}>
                                &#9660;
                            </span>

                        </button>


                        {accordion.isOpen && (

                            <div className="ml-2">
                                {accordion.data.map((step, index) => (
                                    <div key={index} className="bg-gray-100 my-1 px-2 cursor-pointer">
                                        {step}
                                    </div>
                                ))}
                            </div>

                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline