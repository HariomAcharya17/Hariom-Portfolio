import { useEffect } from "react";
import ContactSection from "@/components/ContactSection";
import FeedbackSection from "@/components/FeedbackSection";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Get in touch with Hariom Acharya for opportunities, collaborations, or feedback."
      );
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      <ContactSection />
      <FeedbackSection />
    </div>
  );
}
