export const CONTACT_BACKGROUNDS = {
  hero: "/images/sections/contact/hero-bg.jpg",
  form: "/images/sections/contact/form-bg.jpg",
  whatNext: "/images/sections/contact/what-next-bg.jpg",
  faq: "/images/sections/contact/faq-bg.jpg",
  cta: "/images/sections/contact/cta-bg.jpg",
} as const;

export const contactProcessSteps = [
  {
    step: "1",
    title: "Share Your Goals",
    description: "Tell us about your dealership and marketing objectives.",
    icon: "Target",
  },
  {
    step: "2",
    title: "Choose A Time",
    description: "Select a preferred date and time for your strategy call.",
    icon: "Calendar",
  },
  {
    step: "3",
    title: "Start The Conversation",
    description: "Join a focused, no-pressure conversation with our team.",
    icon: "MessageCircle",
  },
] as const;

export const whatHappensNextSteps = [
  {
    step: "01",
    title: "We Review Your Information",
    description:
      "Our team will review your goals, dealership details, and areas of interest before your call.",
  },
  {
    step: "02",
    title: "We Get Prepared",
    description:
      "We'll bring relevant insights and questions tailored to your dealership's marketing needs.",
  },
  {
    step: "03",
    title: "You Join A Strategy Call",
    description:
      "A no-pressure, high-value conversation to explore what's possible. Submission does not guarantee confirmation until reviewed.",
  },
] as const;

export const contactFaqs = [
  {
    question: "What is a strategy call?",
    answer:
      "A strategy call is a focused conversation to understand your dealership goals and explore how our solutions may support your marketing objectives.",
  },
  {
    question: "Is there any cost?",
    answer:
      "Replace with client-approved pricing policy. Strategy calls are typically complimentary consultations.",
  },
  {
    question: "How long does a call take?",
    answer:
      "Most strategy calls last 30–45 minutes, depending on your questions and dealership needs.",
  },
  {
    question: "What should I prepare?",
    answer:
      "Share your current marketing goals, challenges, and any tools or campaigns you're already using.",
  },
  {
    question: "When will I hear back?",
    answer:
      "Our team will review your request and follow up to confirm or reschedule your preferred time.",
  },
] as const;

export const interestedSolutions = [
  "AI Marketing Suite",
  "Dealer Email Engine",
  "General Consultation",
  "Not Sure Yet",
] as const;

export const preferredTimes = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 6pm)",
] as const;
