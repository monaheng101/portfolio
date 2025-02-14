"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import potriat from './../public/suit-business2.jpg';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { FaGithubSquare } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context';


export default function Intro() {

  /* To refactor to custom hook */
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
      setActiveSection("Home");
    }
  },[inView, setActiveSection, timeOfLastClick])
  /* End of Refactor */

  const { setTimeOfLastClick} = useActiveSectionContext()

  return (
    <section 
    ref={ref}
    className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]" id="home">
      <div className="flex items-center justify-center">
        <div> 
            <motion.div
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                    type: "tween",
                    duration: 0.2,
                }}
            >
                <Image 
                src={potriat} 
                alt="Monaheng potriat"
                className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-x1"/>

            </motion.div>
            </div>
      </div>

      <motion.h1 className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-3xl"
      initial={{opacity: 0, y: 100}}
      animate={{opacity: 1, y: 0}}
      >
        <span className="font-bold">Hello, I'm Monaheng.</span> I'm a{" "}
        <span className="font-bold">full-stack developer</span> with{" "}
        <span className="font-bold">4 years</span> of experience. I enjoy
        building <span className="italic">sites & apps</span>. My focus is{" "}
        <span className="underline">React (Next.js)</span>.
      </motion.h1>

      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            // temporarily deactivate scrolling through other nav links when going to contact section
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>
        
        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer border border-black/10"
          href="/CV.pdf"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>
        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer border border-black/10"
          href="https://linkedin.com"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer border border-black/10"
          href="https://github.com"
          target="_blank"
        >
          <FaGithubSquare />
        </a>



      </motion.div>
    </section>
  )
}
