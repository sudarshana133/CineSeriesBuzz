import React from 'react';

const Genre = ({ genreIds }) => {
  if (!genreIds) {
    return null; 
  }

  const genresArray = Object.values(genreIds);

  return (
    <div className='flex'>
      {
        genresArray.map((genre, index) => (
          <div className='px-1' key={index}>
            <p className='bg-[#5b5b5b] px-2 rounded-md flex items-center justify-center max-[431px]:h-12'>{genre.name}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Genre;
