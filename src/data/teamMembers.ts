export interface TeamMember {
  name: string;
  position: string;
  image: string;
  slug: string;
  coAdvised?: string;
  email?: string;
  office?: string;
  linkedin?: string;
  googleScholar?: string;
  website?: string;
  about?: string;
  researchInterests?: string[];
}

export const teamMembers: TeamMember[] = [
  {
    name: "Lea Schönherr",
    position: "Group Leader",
    image: "team/lea-schoenherr.jpg",
    slug: "lea-schoenherr",
    email: "schoenherr@cispa.de",
    office: "Room 2.20",
    linkedin: "https://linkedin.com/in/lea-sch%C3%B6nherr-33113a156",
    googleScholar: "https://scholar.google.com/citations?user=DtLfiGoAAAAJ&hl=en&oi=ao",
    website: "https://leaschoenherr.me/",
    about: "I love growing plants (very often not successful) and baking. Also, I am tenure-track faculty at CISPA Helmholtz Center for Information Security since 2022. My research focuses on information security, particularly adversarial machine learning, trustworthy generative AI, and ML security applications. I am especially interested in language as an interface to machine learning models, including their cognitive representations and code generation with LLMs and their interactions with humans. I have obtained my PhD from Ruhr University Bochum, Germany, in 2021.",
    researchInterests: ["Trustworthy Machine Learning", "Trustworthy Generative AI"]
  },
  {
    name: "David Pape",
    position: "PhD Student",
    image: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    slug: "david-pape",
    email: "david.pape@cispa.de",
    office: "Room 2.21",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et magna vel tortor efficitur lacinia ac id magna. Mauris sit amet nisi eget augue pulvinar sodales et ut purus. Phasellus elementum velit auctor porta porttitor. Donec ligula metus, placerat vitae tortor eu, porta cursus magna. Sed eleifend rhoncus sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus mi, mollis imperdiet feugiat molestie, semper eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo placerat urna quis maximus. Nulla mollis magna sed quam vehicula fermentum. Fusce mollis condimentum lobortis. Vestibulum ante ipsum.",
    researchInterests: ["Data Privacy", "Machine Learning", "Federated Learning"]
  },
  {
    name: "Jonathan Evertz",
    position: "PhD Student",
    image: "team/jonathan-evertz.jpg",
    slug: "jonathan-evertz",
    email: "jonathan.evertz@cispa.de",
    office: "Room X.XX",
    linkedin: "",
    googleScholar: "https://scholar.google.com/citations?user=2r1eQf4AAAAJ&hl=en",
    website: "",
    about: "My research interests center on the security and privacy implications of modern machine learning systems, with a particular emphasis on adversarial machine learning and generative artificial intelligence. My latest projects focused on Large Language Models and their relevance to the security and robustness of computer systems. In my spare time—when I am not tinkering on computers—I enjoy various sports, photography and cooking (and eating as well).",
    researchInterests: ["LLMs", "Trustworthy Machine Learning", "GenAI"]
  },
  {
    name: "Sina Mavali",
    position: "PhD Student",
    image: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    slug: "sina-mavali",
    email: "sina.mavali@cispa.de",
    office: "Room 2.21",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Hi there! I'm Sina, and I'm passionate about both the security of AI and using AI to improve computer security. My goal is to find effective ways to reduce the risks that come with deploying AI systems. Right now, I’m especially focused on making AI agents safer.",
    researchInterests: ["Machine Learning", "Computer Security"]
  },
  {
    name: "Devansh Srivastav",
    position: "PhD Student",
    image: "team/devansh-srivastav.jpg",
    slug: "devansh-srivastav",
    email: "devansh.srivastav@cispa.de",
    office: "Room 2.16",
    linkedin: "https://www.linkedin.com/in/devanshsrivastav/",
    googleScholar: "https://scholar.google.com/citations?user=4C3CZHUAAAAJ&hl=en",
    website: "https://devanshsrivastav.com/",
    about: "My work focuses on LLM security and robustness. I did my master's in Data Science and Artificial Intelligence at Saarland University, and completed my master's thesis at CISPA on red teaming for LLM jailbreaks. Previously, I was a research assistant at the German Research Center for Artificial Intelligence (DFKI), working on interpretability and multi-agent AI systems. I completed my bachelor's in Computer Science from Amity University, India. Outside of research, I’m also a musician, passionate about exploring the creative synergy between technology and the arts.",
    researchInterests: ["LLM Security", "Adversarial Robustness", "Multiagent Workflows", "RAG", "Trustworthy AI"]
  },
  {
    name: "David Beste",
    position: "PhD Student",
    coAdvised: "Co-Advisor: Thorsten Holz",
    image: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    slug: "david-beste",
    email: "david.beste@cispa.de",
    office: "Room X.XX",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et magna vel tortor efficitur lacinia ac id magna. Mauris sit amet nisi eget augue pulvinar sodales et ut purus. Phasellus elementum velit auctor porta porttitor. Donec ligula metus, placerat vitae tortor eu, porta cursus magna. Sed eleifend rhoncus sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus mi, mollis imperdiet feugiat molestie, semper eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo placerat urna quis maximus. Nulla mollis magna sed quam vehicula fermentum. Fusce mollis condimentum lobortis. Vestibulum ante ipsum.",
    researchInterests: ["Data Privacy", "Machine Learning", "Federated Learning"]
  },
  {
    name: "Soumya Shaw",
    position: "Student Assistant",
    image: "team/soumya-shaw.jpg",
    slug: "soumya-shaw",
    email: "soumya.shaw@cispa.de",
    office: "Room 2.21",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et magna vel tortor efficitur lacinia ac id magna. Mauris sit amet nisi eget augue pulvinar sodales et ut purus. Phasellus elementum velit auctor porta porttitor. Donec ligula metus, placerat vitae tortor eu, porta cursus magna. Sed eleifend rhoncus sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus mi, mollis imperdiet feugiat molestie, semper eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo placerat urna quis maximus. Nulla mollis magna sed quam vehicula fermentum. Fusce mollis condimentum lobortis. Vestibulum ante ipsum.",
    researchInterests: ["Data Privacy", "Machine Learning", "Federated Learning"]
  },
  {
    name: "Anupam Varshney",
    position: "Student Assistant",
    image: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    slug: "anupam-varshney",
    email: "anupam.varshney@cispa.de",
    office: "Room X.XX",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et magna vel tortor efficitur lacinia ac id magna. Mauris sit amet nisi eget augue pulvinar sodales et ut purus. Phasellus elementum velit auctor porta porttitor. Donec ligula metus, placerat vitae tortor eu, porta cursus magna. Sed eleifend rhoncus sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus mi, mollis imperdiet feugiat molestie, semper eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo placerat urna quis maximus. Nulla mollis magna sed quam vehicula fermentum. Fusce mollis condimentum lobortis. Vestibulum ante ipsum.",
    researchInterests: ["Data Privacy", "Machine Learning", "Federated Learning"]
  },
  {
    name: "Samira Abedini",
    position: "Student Assistant",
    image: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    slug: "samira-abedini",
    email: "samira.abedini@cispa.de",
    office: "Room 2.21",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et magna vel tortor efficitur lacinia ac id magna. Mauris sit amet nisi eget augue pulvinar sodales et ut purus. Phasellus elementum velit auctor porta porttitor. Donec ligula metus, placerat vitae tortor eu, porta cursus magna. Sed eleifend rhoncus sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus mi, mollis imperdiet feugiat molestie, semper eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo placerat urna quis maximus. Nulla mollis magna sed quam vehicula fermentum. Fusce mollis condimentum lobortis. Vestibulum ante ipsum.",
    researchInterests: ["Data Privacy", "Machine Learning", "Federated Learning"]
  },
  {
    name: "Yage Zhang",
    position: "Student Assistant",
    image: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    slug: "yage-zhang",
    email: "yage.zhang@cispa.de",
    office: "Room X.XX",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et magna vel tortor efficitur lacinia ac id magna. Mauris sit amet nisi eget augue pulvinar sodales et ut purus. Phasellus elementum velit auctor porta porttitor. Donec ligula metus, placerat vitae tortor eu, porta cursus magna. Sed eleifend rhoncus sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus mi, mollis imperdiet feugiat molestie, semper eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo placerat urna quis maximus. Nulla mollis magna sed quam vehicula fermentum. Fusce mollis condimentum lobortis. Vestibulum ante ipsum.",
    researchInterests: ["Data Privacy", "Machine Learning", "Federated Learning"]
  },
  {
    name: "Abdul Rafay Syed",
    position: "Student Assistant",
    image: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    slug: "abdul-rafay-syed",
    email: "abdul.syed@cispa.de",
    office: "Room X.XX",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et magna vel tortor efficitur lacinia ac id magna. Mauris sit amet nisi eget augue pulvinar sodales et ut purus. Phasellus elementum velit auctor porta porttitor. Donec ligula metus, placerat vitae tortor eu, porta cursus magna. Sed eleifend rhoncus sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus mi, mollis imperdiet feugiat molestie, semper eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo placerat urna quis maximus. Nulla mollis magna sed quam vehicula fermentum. Fusce mollis condimentum lobortis. Vestibulum ante ipsum.",
    researchInterests: ["Data Privacy", "Machine Learning", "Federated Learning"]
  },
  {
    name: "Srishti Gupta",
    position: "Intern",
    coAdvised: "From: Univeristy",
    image: "team/srishti-gupta.jpg",
    slug: "srishti-gupta",
    email: "srishti.gupta@uniroma1.it",
    office: "Room 2.16",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et magna vel tortor efficitur lacinia ac id magna. Mauris sit amet nisi eget augue pulvinar sodales et ut purus. Phasellus elementum velit auctor porta porttitor. Donec ligula metus, placerat vitae tortor eu, porta cursus magna. Sed eleifend rhoncus sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus mi, mollis imperdiet feugiat molestie, semper eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo placerat urna quis maximus. Nulla mollis magna sed quam vehicula fermentum. Fusce mollis condimentum lobortis. Vestibulum ante ipsum.",
    researchInterests: ["Data Privacy", "Machine Learning", "Federated Learning"]
  },
  {
    name: "Valentin Giraudeau",
    position: "Intern",
    coAdvised: "From: Univeristy",
    image: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    slug: "valentin-giraudeau",
    email: "valentin.giraudeau@viacesi.fr",
    office: "Room 2.21",
    linkedin: "",
    googleScholar: "",
    website: "",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et magna vel tortor efficitur lacinia ac id magna. Mauris sit amet nisi eget augue pulvinar sodales et ut purus. Phasellus elementum velit auctor porta porttitor. Donec ligula metus, placerat vitae tortor eu, porta cursus magna. Sed eleifend rhoncus sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque tellus mi, mollis imperdiet feugiat molestie, semper eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo placerat urna quis maximus. Nulla mollis magna sed quam vehicula fermentum. Fusce mollis condimentum lobortis. Vestibulum ante ipsum.",
    researchInterests: ["Data Privacy", "Machine Learning", "Federated Learning"]
  }
]; 