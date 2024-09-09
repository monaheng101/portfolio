"use client";

import React, { useEffect } from 'react'
import SectionHeading from './section-heading'
import { FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context';
import { sendEmail } from "@/actions/sendEmail"
import toast from "react-hot-toast";

export default function Contact() {

        /* To refactor to custom hook */
        const {ref, inView} = useInView({
            threshold: 0.3,
          });
          const {setActiveSection, timeOfLastClick} = useActiveSectionContext();
          /* 
            useEffect hook to synchronize the state with external system
            Runs every time inView and setActiveSection Changes.
          */
          useEffect(()=> {
            if (inView && Date.now() - timeOfLastClick > 1000) {
              setActiveSection("Contact");
            }
          },[inView, setActiveSection, timeOfLastClick])
          /* End of refactor */

  return (
    <motion.section 
    ref={ref}
    id="contact" 
    className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
    initial={{
        opacity: 0,
    }}
    whileInView={{
        opacity: 1,
    }}
    transition={{
        duration: 1
    }}
    viewport={{
        once: true,
    }}
    >
      <SectionHeading>
        Contact me
      </SectionHeading>

      <p 
      className="text-gray-700 -mt-5">
        Please contact me directly at {" "}
        <a className="underline" href="mailto:ntaimonaheng@gmail.com">
            ntaimonaheng@gmail.com
        </a>{" "}
        or throught the form.
      </p>

      <form 
      action={async formData => {
        const { data, error } = await sendEmail(formData);

        if (error){
          // alert(error);
          toast.error(error);
          return;
        }
        // alert("Email sent succeefully!");
        toast.success("Email sent successfully!");

      }}       
       className="mt-10 flex flex-col">
        <input 
        className="h-14 px-4 rounded-lg border border-black/10" 
        name="senderEmail"
        type="email" 
        required
        maxLength={500}
        placeholder="Your email"
        />
        <textarea 
        className="h-52 my-3 rounded border border-black/10 p-4"
        required
        maxLength={5000} 
        name="message"
        placeholder="Your message..."
        />
        <button 
        
        className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:bg-gray-950 hover:scale-110" 
        type="submit">
            Submit <FaPaperPlane  className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"/>
        </button>
      </form>
    </motion.section>
  )
}
