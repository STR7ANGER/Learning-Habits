import { useState, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactUs = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  // Success message state
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);

    // Show success message
    setIsSubmitted(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      service: "",
      message: "",
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  // Contact information
  const contactInfo = [
    {
      icon: <Phone size={24} className="text-blue-600" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: <Mail size={24} className="text-blue-600" />,
      title: "Email Us",
      details: "info@learninghabits.com",
      action: "mailto:info@learninghabits.com",
    },
    {
      icon: <MapPin size={24} className="text-blue-600" />,
      title: "Visit Us",
      details:
        "Plot Nos 8, 11, TechZone 2, Greater Noida, Uttar Pradesh 201310, India",
      action:
        "https://www.google.com/maps/place/Bennett+University/@28.4506512,77.5816175,17z/data=!3m1!4b1!4m6!3m5!1s0x390cbf94deb6bc39:0x7ba6bedc9a2b537f!8m2!3d28.4506465!4d77.5841978!16s%2Fg%2F11c3wvm4q_?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MDQwOC4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  // Service options
  const serviceOptions = [
    "Online Courses",
    "Corporate Training",
    "Personalized Learning Plan",
    "Educational Consulting",
    "Technical Support",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with blue background and animated pattern */}
      <div className="bg-blue-800 text-white py-16 relative overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "absolute inset-0 opacity-60"
          )}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <BlurText
                text="Contact Us"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-5xl font-bold"
              />
            </div>
            <SplitText
              text="We'd love to hear from you. Reach out to our team for any questions, feedback, or assistance."
              className="text-xl text-gray-200 max-w-2xl mx-auto"
              delay={10}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              rootMargin="-50px"
            />
          </div>
        </div>
      </div>

      {/* Contact info and form section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left side: Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Reach Us</h2>

            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <a
                      href={item.action}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {item.details}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Location
              </h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80 w-full">
                {/* Replace the src with your actual Google Maps embed URL */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.053332168928!2d77.5816175!3d28.4506512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cbf94deb6bc39%3A0x7ba6bedc9a2b537f!2sBennett%20University!5e0!3m2!1sen!2sin!4v1712833312345!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Learning Habits Location"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Right side: Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Write to Us
            </h2>

            {isSubmitted ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg flex items-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Thank you! Your message has been sent successfully.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Services
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Office hours section */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Office Hours
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  Weekdays
                </h3>
                <p className="text-gray-700">Monday - Friday</p>
                <p className="text-gray-700 font-medium">9:00 AM - 6:00 PM</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  Weekends
                </h3>
                <p className="text-gray-700">Saturday</p>
                <p className="text-gray-700 font-medium">10:00 AM - 4:00 PM</p>
                <p className="text-gray-700">Sunday</p>
                <p className="text-gray-700 font-medium">Closed</p>
              </div>
            </div>
            <div className="mt-6 text-center text-gray-600">
              <p>
                We aim to respond to all inquiries within 24 hours during
                business days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                How quickly will I receive a response?
              </h3>
              <p className="text-gray-700">
                We typically respond to all inquiries within 24 hours during
                business days. For urgent matters, please call our customer
                support line.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                Do you offer technical support?
              </h3>
              <p className="text-gray-700">
                Yes, our technical support team is available Monday through
                Friday, 9:00 AM - 5:00 PM. You can reach them through the
                contact form or direct email.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                Can I schedule a demo of your platform?
              </h3>
              <p className="text-gray-700">
                Absolutely! Select "Educational Consulting" in the service
                dropdown and mention you'd like a demo in your message. Our team
                will arrange a convenient time.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-3">
                Do you have a physical office I can visit?
              </h3>
              <p className="text-gray-700">
                Yes, our headquarters is open for visits during regular business
                hours. We recommend scheduling an appointment for the best
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-action section */}
      <div className="bg-blue-800 text-white py-12 relative overflow-hidden">
        <AnimatedGridPattern
          numSquares={20}
          maxOpacity={0.3}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "absolute inset-0 opacity-50"
          )}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already improved their skills
            with Learning Habits.
          </p>
          <button className="bg-white text-blue-800 font-bold py-3 px-8 rounded-md hover:bg-blue-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
