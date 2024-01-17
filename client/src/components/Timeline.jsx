import React, { useState, useEffect } from 'react';

const Timeline = ({ allSections , getSectionDetails}) => {
    const [accordions, setAccordions] = useState([]);
    const [filledSections, setFilledSections] = useState([])

    useEffect(() => {
        const transformedSections = Object.entries(allSections).map(([section, data], index) => ({
            key: index,
            title: section,
            isOpen: false,
            data,
        }));

        if (accordions.length === 0) {
            setAccordions(transformedSections);
        }

        setFilledSections([]);
    }, [allSections]);


    const toggleAccordion = (accordion) => {
        
        if (filledSections.indexOf(accordion.title) === -1) {
            getSectionDetails(accordion.title)
            setFilledSections([...filledSections, accordion.title]);
        }

        setAccordions((prevAccordions) =>
            prevAccordions.map((accord) => ({
                ...accord,
                isOpen: accord.key === accordion.key ? !accord.isOpen : false,
            }))
        );
    };

    const handleClickOnStep = (step_id) => {
        console.log(step_id)
    }


    return (
        <div>
            <div className="p-2">
                {accordions.map((accordion) => (
                    <div key={accordion.key} className="border rounded-md mb-1">
                        <button
                            className="w-full px-4 py-2 text-left bg-[#e9e9e9] hover:bg-gray-300 transition duration-300"
                            onClick={() => toggleAccordion(accordion)}
                        >
                            {accordion.title}
                            <span className={`float-right transform ${accordion.isOpen ? 'rotate-180' : 'rotate-0'}  transition-transform duration-300`}>
                                &#9660;
                            </span>
                        </button>

                        {accordion.isOpen && (
                            <div className="ml-2">
                                {accordion.data.map((step) => (
                                    <div key={step.id} className="bg-gray-100 my-1 px-2 cursor-pointer" >
                                        <button onClick={() => handleClickOnStep(step.id)}>
                                            {step.title}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
