import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import Button from './Button.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
gsap.registerPlugin(useGSAP);
import { TiLocationArrow } from 'react-icons/ti';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadVideos((prev) => prev + 1);
    
  }

  //0%4 =0+1 => 1
  //1%4 = 1+1 => 2
  //2%4 = 2+1 => 3
  //3%4 = 3+1 => 4
  //4%4 = 0+1 => 1

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const handleMiniVidClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  }
useEffect(() => {
  if (loadedVideos === totalVideos-1) {
    setIsLoading(false);
  }
}, [loadedVideos, totalVideos]);


  useGSAP(()=> {
   if(hasClicked){
    gsap.set('#next-video',{visibility:'visible'})
    gsap.to('#next-video',{
      transformOrigin:'center center',
      scale: 1,
      width: '100%',
      height: '100%',
      duration: 1,
      ease: 'power1.inOut',
      onStart: () => nextVideoRef.current.play(),
    })
   }
  }, {dependencies: [currentIndex],revertOnUpdate:true})

  useGSAP(() => {
    gsap.set( '#video-frame',{
      clipPath: 'polygon(12% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%'
    })

    gsap.from('#video-frame',{
      clipPath: 'polygon(0% 0% , 100% 0% , 100% 100% , 0% 100%',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger:{
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      }
    })
  })

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;


  return (
    <div className='relative h-dvh w-screen overflow-hidden'>

      {isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className="three-body">

          <div className="three-body__dot"/>
            <div className='three-body__dot'/>
            <div className='three-body__dot'/>
          </div>
             </div>
      )}
      <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div onClick={handleMiniVidClick} className="origin-center scale-50 opacity-100 transition-all duration-500 ease-in hover:scale-100 hover:border-opacity-100">

              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id='current-video'
                className='size-64 origin-center scale-150 object-cover object-center '
                onLoadedData={handleVideoLoad}

              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id='next-video'
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
             autoPlay
            loop
            muted
            className='absolute left-0 top-0 size-full object-cover object-center'
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
          G<b>a</b>ming
        </h1>
        <div className='absolute left-0 top-0 z-40 size-full'>
          <div className='mt-24 px-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>Enter the Metagame Layer <br /> Unleash the Play Economy</p>

            <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>}  containerClass="relative flex items-center justify-center gap-2 rounded-full bg-yellow-400 text-black px-6 py-3 font-semibold shadow-lg hover:shadow-yellow-300 transition-all duration-300"/>
       

          </div>
        </div>
      </div>
      <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black-75'>
          G<b>a</b>ming
        </h1>
    </div>
  )
}

export default Hero