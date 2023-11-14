import React from "react";

const Skeleton = ({ number, confirmHomePage, youtubeSkeleton,castProfileSkeleton }) => {
  return (
    <div className="flex flex-col">
      {confirmHomePage && (
        <>
          <div className="random_photo">
            <div className="random_photo random_photo_text z-30"></div>
            <div className="random_photo random_photo_text z-30"></div>
            <div className="random_photo random_photo_text z-30"></div>
            <div className="random_photo random_photo_text z-30"></div>
            <div className="random_photo random_photo_text z-30"></div>
            <div className="random_photo random_photo_text z-30"></div>
          </div>
        </>
      )}
      <div className="movieTemplate grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-2">
        {Array.from({ length: number }, (_, index) => (
          <span className="skeleton-bg" key={index}>
            <p className="slider"></p>
          </span>
        ))}
      </div>
      {youtubeSkeleton && (
        <>
          <div className="movieTemplate flex gap-3 mt-3">
            <span className="youtube-bg"></span>
            <span className="youtube-bg"></span>
          </div>
        </>
      )}
      {
        castProfileSkeleton &&(
          <>
            <div className="flex flex-col items-center justify-start translate-y-[-90px]">
              <div className="random_photo random_photo_text h-[15px] w-[160px] mx-0"></div>
              <div className="random_photo w-[150px] h-[190px] mt-[100px]"></div>
              <div className="random_photo random_photo_text h-[15px] w-[160px] mx-0 mt-[-80px]"></div>
              <div className="random_photo random_photo_text h-[15px] w-[160px] mx-0"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto mt-4 h-3"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto h-3"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto h-3"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto h-3"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto h-3"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto h-3"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto h-3"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto h-3"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto h-3"></div>
              <div className="random_photo random_photo_text w-[90%] text-center mx-auto h-3"></div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default Skeleton;
