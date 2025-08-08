// This is the "brain" of our AI.
// We use keywords to find the best answer for the user's query.

export const knowledgeBase = [
  {
    keywords: ["mission", "vision", "about", "company", "what do you do"],
    answer: "Our mission is to contribute to the spread of the kingdom of God by helping people through jobs, good services, and charitable works. Our vision is to become a leader in the creative industry by delivering exceptional design and IT solutions.",
  },
  {
    keywords: ["services", "offer", "what can you do"],
    answer: "We offer a wide range of services in two main categories: Technology Solutions (like website design, networking, and visa assistance) and Graphic Design Services (like logo design, printing, and custom apparel). What are you interested in?",
  },
  {
    keywords: ["phone", "track", "stolen", "lost"],
    answer: "We offer a specialized Stolen Phone Tracking service. We can assist in the process of locating a lost or stolen phone using its serial number. This involves providing guidance on coordinating with the proper authorities and advice on data protection.",
  },
  {
    keywords: ["visa", "study abroad", "scholarship", "travel"],
    answer: "Yes, we provide comprehensive assistance for visa applications, including for studying abroad, tourism, and permanent residence. We help connect students with international universities and guide them through the scholarship application process.",
  },
  {
    keywords: ["internship", "career", "job", "experience"],
    answer: "We are passionate about nurturing talent! We offer an internship program for individuals looking to gain real-world experience in Technology or Graphic Design. You can apply directly on our Careers page.",
  },
  {
    keywords: ["printing", "uv printing", "heat press", "mug", "t-shirt"],
    answer: "Our Graphic Design department offers many advanced printing services, including UV printing on various surfaces, heat press sublimation for apparel like T-shirts and mugs, and large format printing for banners and signs.",
  },
  {
    keywords: ["location", "address", "where are you"],
    answer: "BHT Corporation is located in Musanze, Rwanda. You can find our exact location and a map on our Contact Us page.",
  },
  {
    keywords: ["contact", "phone number", "email"],
    answer: "You can reach us by phone at +250 784 589 508, or by email at info.bhtcorporation@gmail.com. We also have a contact form on our Contact Us page.",
  },
  // Add more Q&A objects here
];

export const defaultAnswer = "That's a great question. I'm still learning about that topic. Could you try rephrasing, or would you like to get in touch with our human team via the Contact Us page for more detailed information?";