export interface ResearchArea {
    title: string;
    description: string;
    details: string[];
    image: string;
}

export const researchAreas: ResearchArea[] = [
    {
        title: "Trustworthy Generative AI",
        description: "We develop mitigation strategies to address the misuse of AI-generated media across various modalities, including images, text, and audio.",
        details: [
            "Fake audio detection systems evaluation",
            "AI-generated image detector robustness",
            "Adversarial manipulation prevention",
            "Cross-modal fake media detection"
        ],
        image: "research/genAI.svg"
    },
    {
        title: "LLM Security",
        description: "Our research on large language model (LLM) security explores vulnerabilities such as prompt injection attacks across various application settings, as well as the models' capacity to maintain confidentiality of contextual information.",
        details: [
            "Prompt injection attack analysis",
            "Contextual information confidentiality",
            "Secure code generation",
            "Security professional tooling"
        ],
        image: "research/llm.svg"
    },
    {
        title: "Security in ML",
        description: "Beyond LLMs, our work encompasses broader security-related topics in machine learning across multiple modalities.",
        details: [
            "Audio and speech recognition security",
            "Continual learning in security contexts",
            "Out-of-distribution detection",
            "Multi-modal security evaluation"
        ],
        image: "research/signal-short.svg"
    }
]