
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-01";

const faqs = [
  {
    id: "1",
    title: "What is Vidhisaar?",
    content: "Vidhisaar is an AI-powered legal assistant that combines multi-agent intelligence, blockchain, and explainable AI to provide transparent, unbiased, and verifiable legal insights.",
  },
  {
    id: "2",
    title: "Is Vidhisaar available for use?",
    content: "Not yet! Vidhisaar is currently in development. Join the waitlist to get early access and stay updated on our progress.",
  },
  {
    id: "3",
    title: "How does Vidhisaar ensure accuracy in legal research?",
    content: "Vidhisaar uses AI-powered legal reasoning, retrieval-augmented generation (RAG), and blockchain-backed verification to provide reliable legal insights while ensuring fairness with xAI models.",
  },
  {
    id: "4",
    title: "Why should I join the waitlist?",
    content: "By joining the waitlist, you get exclusive early access, updates on our progress, and the chance to be among the first to experience Vidhisaar before its public launch.",
  },
  {
    id: "5",
    title: "Who can benefit from Vidhisaar?",
    content: "Vidhisaar is designed for lawyers, researchers, policymakers, students, and anyone seeking legal clarity with AI-driven insights and on-chain verification.",
  },
  {
    id: "6",
    title: "Will Vidhisaar replace human lawyers?",
    content: "No. Vidhisaar is designed to assist legal professionals, not replace them. It enhances research, speeds up case law retrieval, and ensures transparency, but human expertise remains essential.",
  },
  {
    id: "7",
    title: "How can I stay updated on Vidhisaar's progress?",
    content: "Sign up for our waitlist and follow us on social media to get the latest updates, behind-the-scenes insights, and early access opportunities.",
  },
];

export function FAQSection() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-16 z-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-white">FAQs</h2>
      <Accordion type="single" collapsible className="w-full bg-black/50 backdrop-blur-sm" defaultValue="1">
        {faqs.map((faq) => (
          <AccordionItem value={faq.id} key={faq.id} className="py-2 border-white/20">
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline text-white">
              {faq.title}
            </AccordionTrigger>
            <AccordionContent className="pb-2 text-white/80">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
