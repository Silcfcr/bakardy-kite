export const EMAILJS_CONFIG = {

    serviceId: 'service_iy10zjp',

    // Use the default "Contact Us" template
    templateId: 'template_evsi0z2',
    publicKey: 'UzYS6ueU1umFjTmcS',

    // Recipient email address
    toEmail: 'silcf.cr@gmail.com'
};

// EmailJS template parameters for your custom template
export interface EmailTemplateParams {
    name: string;           // Sender's name
    time: string;           // Current time
    title: string;          // Message title/subject
    email: string;          // Sender's email
    [key: string]: string;  // Index signature for EmailJS compatibility
}
