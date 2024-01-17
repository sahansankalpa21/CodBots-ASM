export default function Accordion(props) {
    return (
        <div className="border rounded-md mb-1">
            <button
                className="w-full px-4 py-2 text-left bg-[#e9e9e9]
                           hover:bg-gray-300 transition duration-300"
                onClick={props.toggleAccordion}
            >
                {props.title}
                <span className={`float-right transform ${props.isOpen ?
                    'rotate-180' : 'rotate-0'}  
                                 transition-transform duration-300`}>
                    &#9660;
                </span>
            </button>
            {props.isOpen && (
                <div className="ml-2">
                    {props.data.map((step, index) => (
                        <div key={index} className="bg-gray-100 my-1 px-2 cursor-pointer">
                            {step}
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};