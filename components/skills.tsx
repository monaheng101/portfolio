"use client";

import React, { useEffect } from 'react'
import SectionHeading from './section-heading'
import { skillsData } from '@/lib/data'
import { useInView } from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context';
import { motion } from "framer-motion";

// framer motion animation variants 
const fadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 100,
    },
    animate: (index: number)=> ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * index
        },
    }),
    
}


export default function Skills() {

  /* To refactor */
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
      setActiveSection("Skills");
    }
  },[inView, setActiveSection, timeOfLastClick])
  /* End of refactor */


  return (
    <section className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-80" 
    ref={ref}
    id="skills">
      <SectionHeading>My skills</SectionHeading>
        <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
            {
                skillsData.map((skill, index)=>(
                    <motion.li 
                        className="bg-white border border-black/[0.1] rounded-xl px-5 py-3"
                        key={index}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{
                            once: true,
                        }}
                        custom={index}
                    > {skill} 
                    </motion.li>
                ))
            }
        </ul>
    </section>
  )
}
