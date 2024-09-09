"use client"

import React, { useEffect } from 'react'
import SectionHeading from './section-heading'
import { useInView } from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context';


export default function About() {

  /* TO BE REFACTORED */
  const {ref, inView} = useInView({
    threshold: 0.75,
  });
  const {setActiveSection, timeOfLastClick} = useActiveSectionContext();
  /* 
    useEffect hook to synchronize the state with external system
    Runs every time inView and setActiveSection Changes.
  */
  useEffect(()=> {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection("About");
    }
  },[inView, setActiveSection, timeOfLastClick])
  /* END OF REFACTOR */

  return (
    <section 
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      id="about">
        
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3">
        I found passion for programming the day I built my first program in{" "}
        <span className="font-medium">Python</span>. I decided to follow my passion and persued a degree in Computer
         Science at University of Botswana.{" "}
        <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I <span className="underline">love</span> the
        feeling of finally figuring out a solution to a problem. lately, my focus 
        has been on {" "}<span className="font-medium">full-stack development</span>.{" "}. My core stack
        is{" "}
        <span className="font-medium">
          React, Next.js, Node.js, and MongoDB
        </span>
        . I am also familiar with TypeScript and Prisma. I am always looking to
        learn new technologies. I am currently looking for a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      </p>
    </section>
  )
}
