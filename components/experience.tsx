"use client";

import React, { useEffect } from 'react'
import SectionHeading from './section-heading'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiencesData } from '@/lib/data';
import { useInView } from 'react-intersection-observer'
import { useActiveSectionContext } from '@/context/active-section-context';

export default function Experience() {

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
        setActiveSection("Experience");
      }
    },[inView, setActiveSection, timeOfLastClick])
    /* End of refactor */

  return (
    <section ref={ref} id="experience" className="scroll-mt-28 mb-2 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
                <React.Fragment key={index}>
                    <VerticalTimelineElement
                    visible={true}
                    className="vertical-timeline-element--work"
                    contentStyle={{ 
                        background: "#f3f4f6",
                        boxShadow: "none",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        textAlign: "left",
                        padding: "1.3rem 2rem",
                    }}
                    contentArrowStyle={{ 
                        borderRight: "0.4rem solid #9ca3af" 
                    }}
                    date={item.date}
                    icon={item.icon}
                    iconStyle={{
                        background: "#fff",
                        fontSize: "1.5rem",
                    }}
                    >
                        <h3 className="font-semibold capitalize">{item.title}</h3>
                        <p className="font-normal !mt-0 ">{item.location}</p>
                        <p className="!mt-1 !font-normal text-gray-700">{item.description}</p>
                    </VerticalTimelineElement>
                </React.Fragment>  
            ))}
      </VerticalTimeline>
    </section>
  )
}
