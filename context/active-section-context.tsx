"use client"

import React, { useState, createContext, useContext } from 'react';
import { links } from "@/lib/data";

type SectionName = typeof links[number]["name"];

type ActiveSectionContextType = {
    activeSection: SectionName;
    setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
    timeOfLastClick: number;
    setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
}

export const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
    children
}:{
    children: React.ReactNode;
}) {

    const [activeSection, setActiveSection] = useState<SectionName>("Home");
    const [timeOfLastClick, setTimeOfLastClick] = useState(0); // tracks last time clicked to prevent active section nav link changes when passing through

    return <ActiveSectionContext.Provider 
        value={{
            activeSection,
            setActiveSection,
            timeOfLastClick,
            setTimeOfLastClick
    }}>
        {children}
    </ActiveSectionContext.Provider>
  
}

/* Custom hook for using the ActiveSectionContext and hanldling the possible null  */
export function useActiveSectionContext(){
    const context = useContext(ActiveSectionContext);

    if (context === null){
        throw new Error(
            "useActiveSectionContext must be used within an ActiveSectionConteextProvider"
        );
    } 
    return context;
}