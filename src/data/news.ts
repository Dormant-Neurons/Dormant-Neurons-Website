export interface News {
    title: string;
    description: string;
    date: Date;
}

export const news: News[] = [
    {
        title: "Paper accepted at DIMVA",
        description: "Our <a href=\"https://eisenhofer.me/data/beste-25-exploring.pdf\">paper</a>  \"Exploring the Potential of LLMs for Code Deobfuscation\" has been accepted for DIMVA 2025.",
        date: new Date("2025-05-19")
    },
    {
        title: "Our Website is Live",
        description: "Our Website is Live! Dormant Neurons has officially awakened \u2014 starting with a humble \u201cHello World!\u201d and now here to share, build, and grow with you.",
        date: new Date("2025-04-24")
    },
]