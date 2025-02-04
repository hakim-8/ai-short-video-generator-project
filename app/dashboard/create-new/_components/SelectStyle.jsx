import Image from 'next/image';
import React,  { useState } from 'react';

const SelectStyle = ({onUserSelect}) => {
    const styleOptions = [
        {
            name: 'Realistic',
            image: '/realistic.jpg',
        },
        {
            name: 'Cartoon',
            image: '/cartoon.jpg',
        },
        {
            name: 'Comic',
            image: '/comic.jpg',
        },
        {
            name: 'WaterColor',
            image: '/watercolor.jpg',
        },
        {
            name: 'GTA',
            image: '/gta.jpg',
        },
    ];

    const [selectedOption, setSelectedOption] = useState();

    return (
        <div className='pt-10'>
            <h2 className='font-bold text-xl text-primary'>Style</h2>
            <p className='text-grey-500 pb-2'>Select the style of your video?</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                {styleOptions.map((item, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col items-center
                            hover:scale-105 transition-all cursor-pointer rounded-xl
                            ${selectedOption === item.name && 'border-4 border-primary'}`}
                    >
                        {/* Using Next.js Image component */}
                        <Image
                            className="rounded-lg"
                            src={item.image}
                            alt={item.name}
                            width={150} // Adjust width as needed
                            height={100} // Adjust height as needed
                            objectFit="cover" // Ensures the image covers the container area
                            onClick={() => {
                                setSelectedOption(item.name)
                                onUserSelect('imageStyle',item.name)
                            }}
                        />
                        <h2 className='absolute p-1 bg-black bottom-0 w-full text-xl text-white text-center mt-2'>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectStyle;
