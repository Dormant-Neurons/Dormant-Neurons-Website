export interface Publication {
  slug: string;
  title: string;
  authors: string;
  shortAuthors: string;
  date: Date;
  venue: string;
  paperLink: string;
  codeLink?: string;
  demoLink?: string;
  bibtex: string;
  abstract: string;
}

export const publications: Publication[] = [
  {
    slug: "2005-expl",
    title: "Exploring the Potential of LLMs for Code Deobfuscation",
    authors: "David Beste, Grégoire Menguy, Hossein Hajipour, Mario Fritz, Antonio Emanuele Cinà, Sébastien Bardin, Thorsten Holz, Thorsten Eisenhofer, Lea Schönherr",
    shortAuthors: "David Beste et al.",
    date: new Date("2025-06-20"),
    venue: "SIG SIDAR Conference on Detection of Intrusions and Malware & Vulnerability Assessment (DIMVA)",
    paperLink: "https://eisenhofer.me/data/beste-25-exploring.pdf",
    bibtex: `@inproceedings{beste-25-deobfuscation,
  title={Exploring the Potential of LLMs for Code Deobfuscation},
  author={David Beste and Grégoire Menguy and Hossein Hajipour and Mario Fritz and Antonio Emanuele Cinà and Sébastien Bardin and Thorsten Holz and Thorsten Eisenhofer and Lea Schönherr},
  booktitle={SIG SIDAR Conference on Detection of Intrusions and Malware & Vulnerability Assessment (DIMVA)},
  year={2025}
}`,
    abstract: "Code obfuscation alters software code to conceal its logic while retaining functionality, aiding intellectual property protection but hindering security audits and malware analysis. To address this, automated deobfuscation techniques have been developed, though existing approaches remain constrained by limited scope and specificity. Motivated by these challenges, this paper explores a novel approach for code deobfuscation based on Large Language Models (LLMs). First, we investigate the general capabilities of LLMs in reducing code complexity by choosing five different source-to-source obfuscation methods. Despite challenges regarding semantical correctness, our findings indicate that LLMs can be very effective in this task. Building on this, we fine-tune two versatile models capable of simplifying code obfuscated through up to seven different chained obfuscation transformations while consistently outperforming deobfuscation based on compiler optimizations and general-purpose LLMs. Our best model demonstrates an average Halstead metric program length reduction of 89.21% for our most challenging scenario. Finally, we conduct a memorization test to assess if performance stems from memorized code rather than true deobfuscation capabilities, which our models pass."
  },
  {
    slug: "2004-sigm",
    title: "σ-zero: Gradient-based Optimization of ℓ0-norm Adversarial Examples",
    authors: "Antonio Emanuele Cinà, Francesco Villani, Maura Pintor, Lea Schönherr, Battista Biggio, Marcello Pelillo",
    shortAuthors: "Antonio Emanuele Cinà et al.",
    date: new Date("2025-04-20"),
    venue: "International Conference on Learning Representations (ICLR)",
    paperLink: "https://arxiv.org/pdf/2402.01879.pdf",
    bibtex: `@inproceedings{cina-24-l0,
  title={σ-zero: Gradient-based Optimization of ℓ0-norm Adversarial Examples},
  author={Antonio Emanuele Cinà and Francesco Villani and Maura Pintor and Lea Schönherr and Battista Biggio and Marcello Pelillo},
  booktitle={International Conference on Learning Representations (ICLR)},
  year={2025}
}`,
    abstract: "Evaluating the adversarial robustness of deep networks to gradient-based attacks is challenging. While most attacks consider ℓ2- and ℓ∞-norm constraints to craft input perturbations, only a few investigate sparse ℓ1- and ℓ0-norm attacks. In particular, ℓ0-norm attacks remain the least studied due to the inherent complexity of optimizing over a non-convex and non-differentiable constraint. However, evaluating adversarial robustness under these attacks could reveal weaknesses otherwise left untested with more conventional ℓ2- and ℓ∞-norm attacks. In this work, we propose a novel ℓ0-norm attack, called σ-zero, which leverages an ad hoc differentiable approximation of the ℓ0 norm to facilitate gradient-based optimization, and an adaptive projection operator to dynamically adjust the trade-off between loss minimization and perturbation sparsity. Extensive evaluations using MNIST, CIFAR10, and ImageNet datasets, involving robust and non-robust models, show that σ-zero finds minimum ℓ0-norm adversarial examples without requiring any time-consuming hyperparameter tuning, and that it outperforms all competing sparse attacks in terms of success rate, perturbation size, and scalability."
  },
  {
    slug: "0910-data",
    title: "Dataset and Lessons Learned from the 2024 SaTML LLM Capture-the-Flag Competition",
    authors: "Edoardo Debenedetti, Javier Rando, Daniel Paleka, Silaghi Fineas Florin, Dragos Albastroiu, Niv Cohen, Yuval Lemberg, Reshmi Ghosh, Rui Wen, Ahmed Salem, Giovanni Cherubin, Santiago Zanella-Beguelin, Robin Schmid, Victor Klemm, Takahiro Miki, Chenhao Li, Stefan Kraft, Mario Fritz, Florian Tramèr, Sahar Abdelnabi, Lea Schönherr",
    shortAuthors: "Edoardo Debenedetti et al.",
    date: new Date("2024-10-09"),
    venue: "Conference on Neural Information Processing Systems (NeurIPS)",
    paperLink: "https://arxiv.org/abs/2406.07954",
    bibtex: `@article{debenedetti2024dataset,
  title={Dataset and lessons learned from the 2024 satml llm capture-the-flag competition},
  author={Debenedetti, Edoardo and Rando, Javier and Paleka, Daniel and Florin, Silaghi and Albastroiu, Dragos and Cohen, Niv and Lemberg, Yuval and Ghosh, Reshmi and Wen, Rui and Salem, Ahmed and others},
  journal={Advances in Neural Information Processing Systems},
  volume={37},
  pages={36914--36937},
  year={2024}
}`,
    abstract: "Large language model systems face important security risks from maliciously crafted messages that aim to overwrite the system's original instructions or leak private data. To study this problem, we organized a capture-the-flag competition at IEEE SaTML 2024, where the flag is a secret string in the LLM system prompt. The competition was organized in two phases. In the first phase, teams developed defenses to prevent the model from leaking the secret. During the second phase, teams were challenged to extract the secrets hidden for defenses proposed by the other teams. This report summarizes the main insights from the competition. Notably, we found that all defenses were bypassed at least once, highlighting the difficulty of designing a successful defense and the necessity for additional research to protect LLM systems. To foster future research in this direction, we compiled a dataset with over 137k multi-turn attack chats and open-sourced the platform."
  },
  {
    slug: "0910-coop",
    title: "Cooperation, Competition, and Maliciousness: LLM-Stakeholders Interactive Negotiation",
    authors: "Sahar Abdelnabi, Amr Gomaa, Sarath Sivaprasad, Lea Schönherr, Mario Fritz",
    shortAuthors: "Sahar Abdelnabi et al.",
    date: new Date("2024-10-09"),
    venue: "Conference on Neural Information Processing Systems (NeurIPS)",
    paperLink: "https://openreview.net/forum?id=59E19c6yrN#discussion",
    bibtex: `@article{abdelnabi2024cooperation,
  title={Cooperation, competition, and maliciousness: LLM-stakeholders interactive negotiation},
  author={Abdelnabi, Sahar and Gomaa, Amr and Sivaprasad, Sarath and Schönherr, Lea and Fritz, Mario},
  journal={Advances in Neural Information Processing Systems},
  volume={37},
  pages={83548--83599},
  year={2024}
}`,
    abstract: "There is a growing interest in using Large Language Models (LLMs) in multi-agent systems to tackle interactive real-world tasks that require effective collaboration and assessing complex situations. Yet, we have a limited understanding of LLMs' communication and decision-making abilities in multi-agent setups. The fundamental task of negotiation spans many key features of communication, such as cooperation, competition, and manipulation potentials. Thus, we propose using scorable negotiation to evaluate LLMs. We create a testbed of complex multi-agent, multi-issue, and semantically rich negotiation games. To reach an agreement, agents must have strong arithmetic, inference, exploration, and planning capabilities while integrating them in a dynamic and multi-turn setup. We propose metrics to rigorously quantify agents' performance and alignment with the assigned role. We provide procedures to create new games and increase games' difficulty to have an evolving benchmark. Importantly, we evaluate critical safety aspects such as the interaction dynamics between agents influenced by greedy and adversarial players. Our benchmark is highly challenging; GPT-3.5 and small models mostly fail, and GPT-4 and SoTA large models (e.g., Llama-3 70b) still underperform in reaching agreement in non-cooperative and more difficult games."
  },
  {
    slug: "1905-gene",
    title: "Generated Audio Detectors are Not Robust in Real-World Conditions",
    authors: "Soumya Shaw, Ben Nassi, Lea Schönherr",
    shortAuthors: "Soumya Shaw et al.",
    date: new Date("2024-05-19"),
    venue: "ICML Workshop on Next Generation of AI Safety Workshop",
    paperLink: "https://openreview.net/forum?id=1R7RD1dfcC",
    bibtex: `@inproceedings{shaw-24-wild,
  title={Generated Audio Detectors are Not Robust in Real-World Conditions},
  author={Soumya Shaw and Ben Nassi and Lea Schönherr},
  booktitle={ICML Workshop on Next Generation of AI Safety Workshop},
  year={2024}
}`,
    abstract: "The misuse of generative AI (genAI) has raised significant ethical and trust issues. To mitigate this, substantial focus has been placed on detecting generated media, including fake audio. In this paper, we examine the efficacy of state-of-the-art fake audio detection methods under real-world conditions. By analyzing typical audio alterations of transmission pipelines, we identify several vulnerabilities: (1) minimal changes such as sound level variations can bias detection performance, (2) inevitable physical effects such as background noise lead to classifier failures, (3) classifiers struggle to generalize across different datasets, and (4) network degradation affects the overall detection performance. Our results indicate that existing detectors have major issues in differentiating between real and fake audio in practical applications and that significant improvements are still necessary for reliable detection in real-world environments."
  },
  {
    slug: "1905-buil",
    title: "BUILD: Buffer-free Incremental Learning with OOD Detection for the Wild",
    authors: "Srishti Gupta, Daniele Angioni, Lea Schönherr, Ambra Demontis, Battista Biggio",
    shortAuthors: "Srishti Gupta et al.",
    date: new Date("2024-05-19"),
    venue: "ICML Workshop on Foundation Models in the Wild",
    paperLink: "https://openreview.net/pdf?id=WaGj1QfgCH",
    bibtex: `@inproceedings{gupta-24-build,
  title={BUILD: Buffer-free Incremental Learning with OOD Detection for the Wild},
  author={Srishti Gupta and Daniele Angioni and Lea Schönherr and Ambra Demontis and Battista Biggio},
  booktitle={ICML Workshop on Foundation Models in the Wild},
  year={2024}
}`,
    abstract: "Having a model that can dynamically learn new classes while detecting Out-of-Distribution (OOD) samples is a desirable property for most applications operating in the wild. While there is limited work in this direction, some works have attempted to achieve both by combining Incremental Learning (IL) and OOD detection, showing promising results for both tasks. Most of the works use a buffer containing some samples to either replay past samples while learning or to detect outliers at testing, which can cause potential issues: 1) it does not scale well with a growing number of samples, 2) it causes privacy issues as storing samples may not always be a compliant option, 3) it limits the outlier detection to the distribution in the buffer, and 4) it is computationally and memory expensive. In this work, we tackle this issue with a very simple yet effective framework: BUILD, which performs both IL and OOD detection in a buffer-free manner with the capability to work in the wild. BUILD integrates a pre-trained vision transformer that is fine-tuned with hard attention masks, along with post-hoc OOD detectors applied during testing. We show that BUILD, when combined with activation-based post-hoc OOD technique, can give not just competitive but better performance than the state-of-the-art baselines. To support our claims, we evaluate the proposed framework on the CIFAR-10 classification benchmark and the results show that BUILD gives superior and stabler performance in detecting OOD samples while being computationally cheaper."
  },
  {
    slug: "2005-thei",
    title: "The Imitation Game: Exploring Brand Impersonation Attacks on Social Media Platforms",
    authors: "Bhupendra Acharya, Dario Lazzaro, Efren Lopez-Morales, Adam Oest, Muhammad Saad, Antonio Emanuele Cinà, Lea Schönherr, Thorsten Holz",
    shortAuthors: "Bhupendra Acharya et al.",
    date: new Date("2024-08-20"),
    venue: "USENIX Security Symposium",
    paperLink: "https://www.usenix.org/conference/usenixsecurity24/presentation/acharya",
    bibtex: `@inproceedings{acharya-24-imitation,
  title={The Imitation Game: Exploring Brand Impersonation Attacks on Social Media Platforms},
  author={Bhupendra Acharya and Dario Lazzaro and Efren Lopez-Morales and Adam Oest and Muhammad Saad and Antonio Emanuele Cinà and Lea Schönherr and Thorsten Holz},
  booktitle={USENIX Security Symposium},
  year={2024}
}`,
    abstract: "The rise of social media users has led to an increase in customer support services offered by brands on various platforms. Unfortunately, attackers also use this as an opportunity to trick victims through fake profiles that imitate official brand accounts. In this work, we provide a comprehensive overview of such brand impersonation attacks on social media. We analyze the fake profile creation and user engagement processes on X, Instagram, Telegram, and YouTube and quantify their impact. Between May and October 2023, we collected 1.3 million user profiles, 33 million posts, and publicly available profile metadata, wherein we found 349,411 squatted accounts targeting 2,625 of 2,847 major international brands. Analyzing profile engagement and user creation techniques, we show that squatting profiles persistently perform various novel attacks in addition to classic abuse such as social engineering, phishing, and copyright infringement. By sharing our findings with the top 100 brands and collaborating with one of them, we further validate the real-world implications of such abuse. Our research highlights a weakness in the ability of social media platforms to protect brands and users from attacks based on username squatting. Alongside strategies such as customer education and clear indicators of trust, our detection model can be used by platforms as a countermeasure to proactively detect abusive accounts."
  },
  {
    slug: "2005-arep",
    title: "A Representative Study on Human Detection of Artificially Generated Media Across Countries",
    authors: "Joel Frank, Franziska Herbert, Jonas Ricker, Lea Schönherr, Thorsten Eisenhofer, Asja Fischer, Markus Dürmuth, Thorsten Holz",
    shortAuthors: "Joel Frank et al.",
    date: new Date("2024-05-20"),
    venue: "IEEE Security and Privacy (S&P)",
    paperLink: "https://arxiv.org/pdf/2312.05976.pdf",
    bibtex: `@inproceedings{frank-24-human,
  title={A Representative Study on Human Detection of Artificially Generated Media Across Countries},
  author={Joel Frank and Franziska Herbert and Jonas Ricker and Lea Schönherr and Thorsten Eisenhofer and Asja Fischer and Markus Dürmuth and Thorsten Holz},
  booktitle={IEEE Security and Privacy (S&P)},
  year={2024}
}`,
    abstract: "AI-generated media has become a threat to our digital society as we know it. These forgeries can be created automatically and on a large scale based on publicly available technology. Recognizing this challenge, academics and practitioners have proposed a multitude of automatic detection strategies to detect such artificial media. However, in contrast to these technical advances, the human perception of generated media has not been thoroughly studied yet. In this paper, we aim at closing this research gap. We perform the first comprehensive survey into people's ability to detect generated media, spanning three countries (USA, Germany, and China) with 3,002 participants across audio, image, and text media. Our results indicate that state-of-the-art forgeries are almost indistinguishable from real media, with the majority of participants simply guessing when asked to rate them as human- or machine-generated. In addition, AI-generated media receive is voted more human like across all media types and all countries. To further understand which factors influence people's ability to detect generated media, we include personal variables, chosen based on a literature review in the domains of deepfake and fake news research. In a regression analysis, we found that generalized trust, cognitive reflection, and self-reported familiarity with deepfakes significantly influence participant's decision across all media categories."
  },
  {
    slug: "2005-conn",
    title: "Conning the Crypto Conman: End-to-End Analysis of Cryptocurrency-based Technical Support Scams",
    authors: "Bhupendra Acharya, Muhammad Saad, Antonio Emanuele Cinà, Lea Schönherr, Hoang Dai Nguyen, Adam Oest, Phani Vadrevu, Thorsten Holz",
    shortAuthors: "Bhupendra Acharya et al.",
    date: new Date("2024-05-20"),
    venue: "IEEE Security and Privacy (S&P)",
    paperLink: "https://arxiv.org/pdf/2401.09824.pdf",
    bibtex: `@inproceedings{acharya-24-crypto,
  title={Conning the Crypto Conman: End-to-End Analysis of Cryptocurrency-based Technical Support Scams},
  author={Bhupendra Acharya and Muhammad Saad and Antonio Emanuele Cinà and Lea Schönherr and Hoang Dai Nguyen and Adam Oest and Phani Vadrevu and Thorsten Holz},
  booktitle={IEEE Security and Privacy (S&P)},
  year={2024}
}`,
    abstract: "The mainstream adoption of cryptocurrencies has led to a surge in wallet-related issues reported by ordinary users on social media platforms. In parallel, there is an increase in an emerging fraud trend called cryptocurrency-based technical support scam, in which fraudsters offer fake wallet recovery services and target users experiencing wallet-related issues. In this paper, we perform a comprehensive study of cryptocurrency-based technical support scams. We present an analysis apparatus called HoneyTweet to analyze this kind of scam. Through HoneyTweet, we lure over 9K scammers by posting 25K fake wallet support tweets (so-called honey tweets). We then deploy automated systems to interact with scammers to analyze their modus operandi. In our experiments, we observe that scammers use Twitter as a starting point for the scam, after which they pivot to other communication channels (eg email, Instagram, or Telegram) to complete the fraud activity. We track scammers across those communication channels and bait them into revealing their payment methods. Based on the modes of payment, we uncover two categories of scammers that either request secret key phrase submissions from their victims or direct payments to their digital wallets. Furthermore, we obtain scam confirmation by deploying honey wallet addresses and validating private key theft. We also collaborate with the prominent payment service provider by sharing scammer data collections. The payment service provider feedback was consistent with our findings, thereby supporting our methodology and results. By consolidating our analysis across various vantage points, we provide an end-to-end scam lifecycle analysis and propose recommendations for scam mitigation."
  },
  {
    slug: "2005-codellm",
    title: "CodeLMSec Benchmark: Systematically Evaluating and Finding Security Vulnerabilities in Black-Box Code Language Models",
    authors: "Hossein Hajipour, Keno Hassler, Thorsten Holz, Lea Schönherr, Mario Fritz",
    shortAuthors: "Hossein Hajipour et al.",
    date: new Date("2024-04-20"),
    venue: "IEEE Secure and Trustworthy Machine Learning (SatML)",
    paperLink: "https://arxiv.org/pdf/2302.04012.pdf",
    bibtex: `@inproceedings{hajipour-24-codellm,
  title={CodeLMSec Benchmark: Systematically Evaluating and Finding Security Vulnerabilities in Black-Box Code Language Models},
  author={Hossein Hajipour and Keno Hassler and Thorsten Holz and Lea Schönherr and Mario Fritz},
  booktitle={IEEE Secure and Trustworthy Machine Learning (SatML)},
  year={2024}
}`,
    abstract: "Large language models (LLMs) for automatic code generation have achieved breakthroughs in several programming tasks. Their advances in competition-level programming problems have made them an essential pillar of AI-assisted pair programming, and tools such as GitHub Copilot have emerged as part of the daily programming workflow used by millions of developers. The training data for these models is usually collected from the Internet (e.g., from open-source repositories) and is likely to contain faults and security vulnerabilities. This unsanitized training data can cause the language models to learn these vulnerabilities and propagate them during the code generation procedure. While these models have been extensively assessed for their ability to produce functionally correct programs, there remains a lack of comprehensive investigations and benchmarks addressing the security aspects of these models. In this work, we propose a method to systematically study the security issues of code language models to assess their susceptibility to generating vulnerable code. To this end, we introduce the first approach to automatically find generated code that contains vulnerabilities in black-box code generation models. To achieve this, we present an approach to approximate inversion of the black-box code generation models based on few-shot prompting. We evaluate the effectiveness of our approach by examining code language models in generating high-risk security weaknesses. Furthermore, we establish a collection of diverse non-secure prompts for various vulnerability scenarios using our method. This dataset forms a benchmark for evaluating and comparing the security weaknesses in code language models."
  },
  {
    slug: "1905-uncertainty",
    title: "On the Limitations of Model Stealing with Uncertainty Quantification Models",
    authors: "David Pape, Sina Däubener, Thorsten Eisenhofer, Antonio Emanuele Cinà, Lea Schönherr",
    shortAuthors: "David Pape et al.",
    date: new Date("2023-10-19"),
    venue: "European Symposium on Artificial Neural Networks, Computational Intelligence and Machine Learning (ESANN)",
    paperLink: "https://arxiv.org/pdf/2305.05293.pdf",
    bibtex: `@inproceedings{pape-23-uncertainty,
  title={On the Limitations of Model Stealing with Uncertainty Quantification Models},
  author={David Pape and Sina Däubener and Thorsten Eisenhofer and Antonio Emanuele Cinà and Lea Schönherr},
  booktitle={European Symposium on Artificial Neural Networks, Computational Intelligence and Machine Learning (ESANN)},
  year={2023}
}`,
    abstract: "Model stealing aims at inferring a victim model's functionality at a fraction of the original training cost. While the goal is clear, in practice the model's architecture, weight dimension, and original training data can not be determined exactly, leading to mutual uncertainty during stealing. In this work, we explicitly tackle this uncertainty by generating multiple possible networks and combining their predictions to improve the quality of the stolen model. For this, we compare five popular uncertainty quantification models in a model stealing task. Surprisingly, our results indicate that the considered models only lead to marginal improvements in terms of label agreement (i.e., fidelity) to the stolen model. To find the cause of this, we inspect the diversity of the model's prediction by looking at the prediction variance as a function of training iterations. We realize that during training, the models tend to have similar predictions, indicating that the network diversity we wanted to leverage using uncertainty quantification models is not (high) enough for improvements on the model stealing task."
  },
  {
    slug: "1905-venomave",
    title: "VENOMAVE: Clean-Label Poisoning Against Speech Recognition",
    authors: "Hojjat Aghakhani, Lea Schönherr, Thorsten Eisenhofer, Dorothea Kolossa, Thorsten Holz, Christopher Kruegel, Giovanni Vigna",
    shortAuthors: "Hojjat Aghakhani et al.",
    date: new Date("2023-04-19"),
    venue: "IEEE Secure and Trustworthy Machine Learning (SatML)",
    paperLink: "https://arxiv.org/pdf/2010.10682.pdf",
    bibtex: `@inproceedings{aghakhani-23-venomave,
  title={VENOMAVE: Clean-Label Poisoning Against Speech Recognition},
  author={Hojjat Aghakhani and Lea Schönherr and Thorsten Eisenhofer and Dorothea Kolossa and Thorsten Holz and Christopher Kruegel and Giovanni Vigna},
  booktitle={IEEE Secure and Trustworthy Machine Learning (SatML)},
  year={2023}
}`,
    abstract: "Despite remarkable improvements, automatic speech recognition is susceptible to adversarial perturbations. Compared to standard machine learning architectures, these attacks are significantly more challenging, especially since the inputs to a speech recognition system are time series that contain both acoustic and linguistic properties of speech. Extracting all recognition-relevant information requires more complex pipelines and an ensemble of specialized components. Consequently, an attacker needs to consider the entire pipeline. In this paper, we present VENOMAVE, the first training-time poisoning attack against speech recognition. Similar to the predominantly studied evasion attacks, we pursue the same goal: leading the system to an incorrect and attacker-chosen transcription of a target audio waveform. In contrast to evasion attacks, however, we assume that the attacker can only manipulate a small part of the training data without altering the target audio waveform at runtime. We evaluate our attack on two datasets: TIDIGITS and Speech Commands. When poisoning less than 0.17% of the dataset, VENOMAVE achieves attack success rates of more than 80.0%, without access to the victim's network architecture or hyperparameters. In a more realistic scenario, when the target audio waveform is played over the air in different rooms, VENOMAVE maintains a success rate of up to 73.3%. Finally, VENOMAVE achieves an attack transferability rate of 36.4% between two different model architectures."
  },
  {
    slug: "1905-drone",
    title: "Drone Security and the Mysterious Case of DJI's DroneID",
    authors: "Nico Schiller, Merlin Chlosta, Moritz Schloegel, Nils Bars, Thorsten Eisenhofer, Tobias Scharnowski, Felix Domke, Lea Schönherr, Thorsten Holz",
    shortAuthors: "Nico Schiller et al.",
    date: new Date("2023-02-19"),
    venue: "Network and Distributed System Security Symposium (NDSS)",
    paperLink: "https://www.ndss-symposium.org/wp-content/uploads/2023/02/ndss2023_f217_paper.pdf",
    bibtex: `@inproceedings{schiller-23-drone,
  title={Drone Security and the Mysterious Case of DJI's DroneID},
  author={Nico Schiller and Merlin Chlosta and Moritz Schloegel and Nils Bars and Thorsten Eisenhofer and Tobias Scharnowski and Felix Domke and Lea Schönherr and Thorsten Holz},
  booktitle={Network and Distributed System Security Symposium (NDSS)},
  year={2023}
}`,
    abstract: "Consumer drones enable high-class aerial video photography, promise to reform the logistics industry, and are already used for humanitarian rescue operations and during armed conflicts. Contrasting their widespread adoption and high popularity, the low entry barrier for air mobility---a traditionally heavily regulated sector---poses many risks to safety, security, and privacy. Malicious parties could, for example, (mis-)use drones for surveillance, transportation of illegal goods, or cause economic damage by intruding the closed airspace above airports. To prevent harm, drone manufacturers employ several countermeasures to enforce safe and secure use of drones, e.g., they impose software limits regarding speed and altitude, or use geofencing to implement no-fly zones around airports or prisons. Complementing traditional countermeasures, drones from the market leader DJI implement a tracking protocol called DroneID, which is designed to transmit the position of both the drone and its operator to authorized entities such as law enforcement or operators of critical infrastructures. In this paper, we analyze security and privacy claims for drones, focusing on the leading manufacturer DJI with a market share of 94%. We first systemize the drone attack surface and investigate an attacker capable of eavesdropping on the drone's over-the-air data traffic. Based on reverse engineering of DJI firmware, we design and implement a decoder for DJI's proprietary tracking protocol DroneID, using only cheap COTS hardware. We show that the transmitted data is not encrypted, but accessible to anyone, compromising the drone operator's privacy. Second, we conduct a comprehensive analysis of drone security: Using a combination of reverse engineering, a novel fuzzing approach tailored to DJI's communication protocol, and hardware analysis, we uncover several critical flaws in drone firmware that allow attackers to gain elevated privileges on two different DJI drones and their remote control. Such root access paves the way to disable or bypass countermeasures and abuse drones. In total, we found 16 vulnerabilities, ranging from denial of service to arbitrary code execution. 14 of these bugs can be triggered remotely via the operator's smartphone, allowing us to crash the drone mid-flight."
  }
];
