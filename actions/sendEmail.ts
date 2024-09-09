"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

// 3rd paty responsible for sending emails
const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async (formData: FormData) => {
    console.log("Running on server...")
    const senderEmail = formData.get("senderEmail");
    const message = formData.get("message");

    // Simple Server side vaidations.
    if (!validateString(senderEmail, 500)){
        return {
            error: "Invalid sender email"
        }
    }
    if (!validateString(message, 5000)){
        return {
            error: "Invalid message"
        }
    }


    let data;
    try {
        data = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: "ntaimonaheng@gmail.com",
            subject: "Message from contact form",
            reply_to: senderEmail as string,
            // text: message as string,
            react: React.createElement(ContactFormEmail, {
                message: message as string,
                senderEmail: senderEmail as string,
            })
            // (.jsx) react: <ContactFormEmail message={message} senderEmail={senderEmail} />
        });
        
    } catch (error: unknown) {
        return {
            error: getErrorMessage(error)
        }

    }
    
    return {
        data,
    };

  };