"use client";

import React, { useEffect } from 'react'
import { projectsData } from "@/lib/data" ;
import Image from 'next/image';
import { useInView } from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context';


type ProjectProps = (typeof projectsData)[number];

export default function Project({ title, description, tags, imageUrl }: ProjectProps){

  /* To be refactored */
  const {ref, inView} = useInView({
    threshold: 0.5,
  });
  const {setActiveSection, timeOfLastClick} = useActiveSectionContext();
  /* 
    useEffect hook to synchronize the state with external system
    Runs every time inView and setActiveSection Changes.
  */
  useEffect(()=> {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection("Projects");
    }
  },[inView, setActiveSection, timeOfLastClick])
  /* End of refactor */

  return (
    <section 
    ref={ref}
    className="group bg-gray-100 max-w-[42rem] border border-black/5 overflow-hidden sm:pr-8 relative sm:h-[20rem] mb-3 sm:mb-8 last-mb-0 rounded-lg hover:bg-gray-200 transition"
    >
    <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:tp-10 sm:max-w-[50%] flex flex-col h-full">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-2 leading-relaxed text-gray-700">{description}</p>

      <ul className="flex flex-wrap gap-2 mt-4 sm:mt-auto">
        {
          tags.map((tag, index) => (
            <li className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full" key={index}> {tag} </li>
          ))
        }
      </ul>
    </div>

    <Image 
    src={imageUrl} 
    alt="Projects I worked on" 
    quality={95}
    className="absolute top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl group-hover:-translate-x-3 group:hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-105 transition"
    />
  </section>
  )
}