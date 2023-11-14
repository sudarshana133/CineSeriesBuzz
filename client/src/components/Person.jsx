import React from 'react'

const Person = ({name,character,url,dept,id}) => {
  return (
    <a href={`/cast/${name}/${id}`}>
      <div className='flex flex-col px-[15px]'>
        <div className='flex w-[180px] sm:w-[170px] md:w-[210px] lg:w-[200px]  rounded-md overflow-hidden'>
          <img src={url} alt="photo" className='border-[1px] border-solid border-gray-400 rounded-md'/>
        </div>
        <div className=' mt-2'>
          <div className="name mb-1">
            <p className='text-center mt-4 lg:w-[200px] md:w-[150px] text-[19px] sm:text-[14.5px] md:text-[19px] lg:text-[17px] mx-auto font-bold'>{name}</p>
          </div>
          <div className='text-center mt-2 lg:w-[200px] md:w-[150px] text-[16px] sm:text-[14.5px] md:text-[19px] lg:text-[17px] mx-auto font-bold'>
            <p>{character}</p>
            <div>
              <p className='text-center mt-1 lg:w-[200px] md:w-[150px] lg:text-[18px] md:text-[15px] max-[450px]:text-[12px] mx-auto font-bold text-blue-500'>{dept}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default Person
