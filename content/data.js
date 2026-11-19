(function () {
  window.AIPO = window.AIPO || {};
  window.AIPO.lessons = window.AIPO.lessons || [];
  window.AIPO.scenarios = window.AIPO.scenarios || {};
  window.AIPO.why = window.AIPO.why || {};
  window.AIPO.questions = window.AIPO.questions || [];
  window.AIPO.cards = window.AIPO.cards || [];
  function S(id, d, stem, options, correct, explanation, scenario) { var q = { id: id, domain: d, type: "single", stem: stem, options: options, correct: [correct], explanation: explanation, reviewed: false }; if (scenario) q.scenario = scenario; return q; }
  function M(id, d, pick, stem, options, correct, explanation, scenario) { var q = { id: id, domain: d, type: "multi", pick: pick, stem: stem, options: options, correct: correct, explanation: explanation, reviewed: false }; if (scenario) q.scenario = scenario; return q; }

  window.AIPO.lessons.push(
    {
      "id": "data-1", "n": 1, "domain": "data",
      "title": "Four kinds of system and the question each one raises",
      "body": "Product owners hear four labels used loosely: rules-based software, machine learning, generative AI and agentic systems. At a working level (general practice, not drawn from a standards text) each raises a different question. Rules-based software does what people wrote down: if this condition holds, do that. Its behaviour can be read, predicted and tested case by case. Machine learning (ML) is software whose behaviour is learned from examples rather than written rule by rule. Deep learning is one family of ML. The name tells a product owner little, so ask about the data and the results instead.\n\nGenerative AI is ML that produces new content, such as text, images or code, in response to a request. Its output varies from one request to the next and can be fluent without being right. An agentic system goes a step further: it pursues a goal by choosing steps and taking actions, often through connected tools, with some degree of autonomy. The extra product questions are what it may do on its own, what it must ask permission for, and who can stop it.\n\nNIST AI RMF 1.0 describes an AI system as an engineered or machine-based system that generates outputs such as predictions, recommendations or decisions, and that operates with varying levels of autonomy. Its MAP 2.1 asks that the tasks the system will support, and the methods used, are defined, for example classifiers, generative models or recommenders. As practical judgement, choose the simplest kind that meets the need. Domain 3 covers when a plain rule is the better answer.",
      "points": [
        "Rules-based software follows conditions people wrote, so it is predictable and easy to test case by case.",
        "Machine learning learns behaviour from examples, so data quality and coverage shape results.",
        "Generative AI creates new content and can be fluent but wrong.",
        "Agentic systems choose steps and take actions, so ask what they may do alone and who can stop them.",
        "Define the tasks and methods the system supports (MAP 2.1) and pick the simplest kind that fits."
      ],
      "traps": [
        "Using the labels interchangeably, so a stakeholder thinks a rules-based tool learns by itself.",
        "Treating generated output as repeatable, or assuming a learned model is as predictable on new cases as a rule.",
        "Letting an agentic feature launch without limits on its actions or a way to stop it.",
        "Choosing deep learning or generative AI for prestige when a simple rule would meet the need."
      ],
      "sources": ["NIST AI RMF 1.0 (AI 100-1, Jan 2023), definition of an AI system in Part 1", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), MAP 2.1", "General practice, not from a source: the four-way distinction"],
      "sourceVersion": "AI RMF 1.0, Jan 2023",
      "reviewed": false
    },
    {
      "id": "data-2", "n": 2, "domain": "data",
      "title": "Ask the data questions before the model is trained",
      "body": "Behaviour in ML and generative systems comes from data, so a product owner who never asks about data is not owning the product. NIST AI RMF 1.0, MAP 2.3, asks that considerations about experimental design, data collection and selection are identified and documented, and gives availability, representativeness and suitability as examples. In plain terms: do we have the data, does it look like the situation where the product will be used, and is it fit for this particular job?\n\nRepresentativeness is where many products fail quietly. Data from large branches, one region or one customer group may say little about the others, and a good average result can hide the gap. Suitability asks whether data gathered for one purpose, such as billing, tells you what you need for another, such as predicting behaviour.\n\nOwnership and permission are two further questions. They are good practice and are not listed in MAP 2.3 itself. Who owns or controls the data? What terms limit its reuse? Do the rules around it, and the expectations of the people it came from, allow this use? The product owner is not the person to answer the legal part. Raise it with privacy, legal or compliance colleagues before the data is used, not after the model has been trained. The engineers do the data work, but the product owner stays accountable for the product decision, so record the answers and the gaps where decision makers can see them.",
      "points": [
        "MAP 2.3 names availability, representativeness and suitability as data considerations to document.",
        "Representativeness: does the data look like the people and situations of real use?",
        "Suitability: was the data gathered in a way that fits this new purpose?",
        "Ownership and permission are good-practice questions that need privacy, legal or compliance input.",
        "Record data gaps and answers so decision makers can see them."
      ],
      "traps": [
        "Equating a large dataset with a good one.",
        "Reusing data collected for another purpose without asking whether it fits.",
        "Training first and asking about permission afterwards.",
        "Leaving data questions to engineers because they sound technical."
      ],
      "sources": ["NIST AI RMF 1.0 (AI 100-1, Jan 2023), MAP 2.3", "Scrum Guide (Nov 2020), Product Owner accountability", "General practice, not from a source: ownership and permission questions"],
      "sourceVersion": "AI RMF 1.0, Jan 2023",
      "reviewed": false
    },
    {
      "id": "data-3", "n": 3, "domain": "data",
      "title": "Confident and wrong: why it happens and what to document",
      "body": "NIST AI 600-1 uses the term confabulation, also called hallucination, for the confident presentation of false content. It describes confabulation as a natural result of how generative models are designed: they produce output that approximates the statistical pattern of their training data, for example by predicting the next word. That can give accurate output, and it can give fluent output that is wrong or contradicts itself. The profile says this matters most for open-ended, long-form answers and in fields that need deep domain expertise. It also notes that the reasoning a system offers for an answer can itself be confabulated.\n\nFor a product owner the consequence is practical. Fluency is not evidence. Plan checks that do not depend on the model's own tone: show the sources used and check that each cited source exists and supports the claim (the profile notes that offered logic or citations can be confabulated too), send consequential output to a person who checks it, and test on realistic, open-ended questions. Better instructions to the model may help, but treat that as a reduction at best, not a fix.\n\nNIST AI RMF 1.0, MAP 2.2, asks that the system's knowledge limits, and how humans may use and oversee its output, are documented well enough to help the people who must decide and act. As good practice, state the intended uses, what was not tested, who reviews which output, and when to escalate. A vague line such as 'may be inaccurate' gives a reviewer nothing to act on.",
      "points": [
        "Confabulation is confidently stated false content, and NIST describes it as a natural result of how generative models are designed.",
        "Fluent tone is not evidence of accuracy, and a stated explanation can also be confabulated.",
        "Plan checks that do not rely on the model: sources shown and verified, human review of consequential output, realistic testing.",
        "Document knowledge limits and how output may be used and overseen (MAP 2.2).",
        "Make the documentation specific enough for reviewers to act on."
      ],
      "traps": [
        "Treating a prompt instruction as a complete fix.",
        "Judging quality from how convincing the answer sounds.",
        "Writing a generic disclaimer and calling the limits documented.",
        "Reusing the system for a new purpose without checking it against the documented limits."
      ],
      "sources": ["NIST AI 600-1 (Jul 2024), section 2.2 Confabulation", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), MAP 2.2", "General practice, not from a source: content of a use-and-oversight note"],
      "sourceVersion": "AI 600-1, Jul 2024; AI RMF 1.0, Jan 2023",
      "reviewed": false
    },
    {
      "id": "data-4", "n": 4, "domain": "data",
      "title": "Third-party models and data: what you depend on but do not control",
      "body": "Most AI products use parts that someone else built: a pre-trained model, a purchased or open dataset, a software library. NIST AI 600-1 describes the value chain and component integration risk: third-party components may be improperly obtained or not properly vetted, which reduces transparency and accountability for those downstream. It adds that the risk is greater for generative AI because training data can be too large for people to vet, a few models are widely reused, and these systems are integrated into many services. Problems can also be hard to trace to one source.\n\nNIST AI RMF 1.0 gives several anchors. MAP 4.1 asks for approaches to map the legal risks of components, including third-party data or software and possible infringement of others' intellectual property or rights. MAP 4.2 asks that internal risk controls for components, including third-party AI, are identified and documented. GOVERN 6.1 asks for policies on third-party risks, and GOVERN 6.2 asks for contingency processes for failures in third-party data or AI systems deemed high-risk.\n\nAs practical judgement rather than NIST wording: ask suppliers what sits behind the component and what it is not suited for, take licence and permission questions to legal and compliance colleagues, test what you integrate, and keep a fallback. A supplier change is a change to your product, so plan to re-check it.",
      "points": [
        "Third-party models, datasets and libraries can reduce transparency and accountability downstream.",
        "Issues can be hard to attribute to one component or source.",
        "MAP 4.1 and 4.2: map legal risks of components and document internal controls around them.",
        "GOVERN 6.1 and 6.2: have policies for third-party risk and contingency for high-risk third-party failures.",
        "A supplier update is a product change, so re-test and keep a fallback."
      ],
      "traps": [
        "Assuming the supplier carries the risk, so no internal controls are needed.",
        "Accepting a supplier's quality claims in place of documentation or testing.",
        "Using bought data or assets before licence and permission are checked.",
        "Having no fallback if the third-party component fails or is withdrawn."
      ],
      "sources": ["NIST AI 600-1 (Jul 2024), section 2.12 Value Chain and Component Integration", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), MAP 4.1", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), MAP 4.2", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), GOVERN 6.1", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), GOVERN 6.2", "General practice, not from a source: supplier questions and fallback"],
      "sourceVersion": "AI 600-1, Jul 2024; AI RMF 1.0, Jan 2023",
      "reviewed": false
    }
  );

  window.AIPO.scenarios.scDA1 = {
    title: "A help assistant for dispatch staff",
    text: "A regional parcel-delivery firm plans an internal assistant for dispatch staff. It is built on a third-party generative model and draws on the firm's own route notes, which come mainly from two large depots, plus a purchased dataset of depot records that arrived with only a brief summary. In phase one the assistant drafts answers to staff questions about delivery exceptions. In a later phase it may book vehicle changes itself. You are the Product Owner."
  };

  window.AIPO.questions.push(
    S("da001", "data", "A scheduling tool flags any shift over ten hours because a fixed condition written by an analyst says so. What kind of system is this?",
      ["A machine learning system that learned the limit from past shifts", "A rules-based system that follows conditions people wrote down", "A generative system that composes a new answer each time", "An agentic system that chooses its own goals"],
      1, "It applies a condition that people wrote, which is the defining feature of rules-based software. Nothing was learned from examples, nothing is generated and no goals are chosen."),
    S("da002", "data", "How should a Product Owner describe machine learning to a stakeholder at a working level?",
      ["Software that follows a fixed list of if-then steps written by people","Software that writes new text or images whenever a user asks for them","Software that books and changes things on its own, without being asked","Software that learns its behaviour from examples"],
      3, "Learning behaviour from examples is what separates machine learning from rules. This is a working-level description from general practice."),
    S("da003", "data", "A team wants a tool that drafts a first reply to each customer email. Which description fits a generative AI system?",
      ["It produces new content, here a draft, in response to a request", "It sorts each email into one of five fixed labels using stored rules", "It looks up a stored reply and returns it unchanged", "It only measures how long each email waits for a reply"],
      0, "Generative AI produces new content such as text from a request. Sorting by stored rules, returning a fixed reply and timing emails are not generation."),
    S("da004", "data", "A vendor says its product is an agentic system that can act on behalf of staff. Which extra question does this raise for the Product Owner?",
      ["How quickly can every available action be switched on for all users?","Is it right to call this artificial intelligence at all?","Which actions may it take on its own, and who can stop or override it?","Are its written answers polite and well formatted enough for customers to read?"],
      2, "An agentic system chooses steps and takes actions, so the scope of its autonomy and the means to stop it become product questions. This is general practice."),
    M("da005", "data", 2, "Which TWO statements are true when comparing a machine learning feature with a rules-based one?",
      ["Its behaviour depends on the examples it learned from, so data quality matters", "Its output is fixed for a given input, so a few sample tests are enough", "It needs no documented limits because it adapts by itself", "It can be wrong on cases that its examples did not cover", "Its decisions can be read straight off a short list of rules"],
      [0, 3], "A learned system is shaped by its examples, so data quality matters, and it can fail on cases the examples did not cover. Learned behaviour is not a short readable list of rules, and it still needs documented limits and real testing."),
    S("da006", "data", "Eligibility for a staff benefit follows a written policy with exact cut-offs, and auditors want the same answer every time. Which approach fits best?",
      ["A generative system that drafts each decision from the policy text","An agentic system that decides for itself which policy applies","Plain rules-based software applying the written cut-offs","A machine learning model trained on the past benefit decisions"],
      2, "When the logic is already written and must be repeatable, rules are simpler to test and explain. Domain 3 covers this choice in more depth. This is general practice."),
    S("da007", "data", "Which data considerations does NIST AI RMF MAP 2.3 give as examples when data collection and selection are documented?",
      ["Volume, speed and storage cost","Availability, representativeness and suitability","Ownership, price and file format","Accuracy, privacy, fairness and the cost of errors"],
      1, "MAP 2.3 names availability, representativeness and suitability in this context. Ownership and permission are good-practice questions that sit beside them."),
    S("da008", "data", "A model was built from records of large city branches, and the product will be rolled out to small rural branches. Which data question matters most?",
      ["Is there enough storage for all the records?", "Were the records collected quickly enough?", "Are the records in one consistent file format?", "Do the records reflect the rural branches where it will be used?"],
      3, "Representativeness asks whether the data looks like the setting of real use. Storage, speed and format may matter later but do not address the mismatch."),
    S("da009", "data", "Data gathered to process invoices is proposed as the base for predicting which customers will leave. What is the key check?",
      ["Whether invoices are stored for long enough", "Whether all the data sits in one system", "Whether data gathered for one purpose is suitable for this new one", "Whether this is the largest dataset available"],
      2, "Suitability asks whether the data fits the job at hand. Data collected for billing may not hold what a prediction about behaviour needs."),
    S("da010", "data", "A team proposes training on past support chats that contain customer details. What should the Product Owner do before agreeing?",
      ["Raise the permission question with privacy and legal first","Approve it, since the chats are already stored in company systems","Let the engineers remove the names and proceed on their own judgement","Wait for good test results and then ask whether the use is allowed"],
      0, "Permission to use data for a new purpose is a question for privacy and legal colleagues, and it comes before training. Stored does not mean permitted, and approval after results arrive is too late."),
    M("da011", "data", 2, "Which TWO questions test ownership and permission for a dataset?",
      ["Is the dataset big enough to train within a week?", "Who owns or controls this data, and what terms apply to reusing it?", "Which format will make loading easiest for the engineers?", "Which chart will show data quality best to executives?", "Do we have a confirmed basis for this use, checked with privacy or legal colleagues?"],
      [1, 4], "Ownership and terms of reuse, and a confirmed basis for the use, are the ownership and permission questions. Size, format and charts concern effort and presentation, not rights."),
    S("da012", "data", "An engineer says data questions are technical and the Product Owner can skip them. What is the best reply?",
      ["The engineers do the data work, but I stay accountable for the product decision, so I need clear answers", "Agreed, accountability for data passes to engineering once they take it on", "I will ask only if the first test results look poor", "I will ask the vendor instead, since the vendor sells the model"],
      0, "Work can be delegated but the Product Owner remains accountable for the product decision (Scrum Guide). Asking early is part of that accountability."),
    S("da013", "data", "Why can a generative model state something false in a confident tone?",
      ["It looks up facts in a database that is sometimes out of date", "It generates output that approximates patterns in its training data, which can be fluent but wrong", "It was built with too little testing by its developers", "It copies the user's own mistakes back to them"],
      1, "NIST AI 600-1 describes confabulation as a natural result of how generative models are designed: they approximate the statistical pattern of training data. Fluent and accurate are different properties."),
    S("da014", "data", "Which term does NIST AI 600-1 use for confidently stated but false output from a generative model?",
      ["Drift", "Overfitting", "Data poisoning", "Confabulation"],
      3, "The profile names this risk confabulation and notes that it is also called hallucination or fabrication. The other terms describe different problems."),
    S("da015", "data", "A team lead says adding the instruction 'only state true facts' to the system text solves wrong answers. What is the best Product Owner view?",
      ["Accept it, since written instructions fully control what a model will say","Accept it once a demo shows no wrong answers during the first few tries","Treat it as a possible reduction at best, and still test and oversee","Reject it, since written instructions have no effect on model output at all"],
      2, "NIST AI 600-1 describes confabulation as a natural result of how generative models are designed, so an instruction cannot be relied on to remove it. As practical judgement, an instruction may reduce errors in some cases, which is something to test rather than assume, and testing, checks and human oversight remain necessary."),
    M("da016", "data", 2, "Which TWO design choices respond sensibly to confabulation in an answer-drafting feature?",
      ["Show the source passages used so reviewers can check the draft", "Remove any hint of limits so users trust the tool more", "Send drafts for consequential decisions to a person who checks them before use", "Treat a fluent tone as a sign the content is correct", "Skip testing on long open-ended questions because most are easy"],
      [0, 2], "Showing sources and adding human review for consequential output both work without relying on the model's confidence. NIST AI 600-1 notes that open-ended, long-form answers are where the risk is most relevant."),
    S("da017", "data", "A pilot shows the assistant cited a policy that does not exist, and the text went into a customer letter. What is the best next step?",
      ["Add the case to the demo script as a rare example","Ask staff to be more careful, continue the pilot unchanged and monitor complaints from customers","Wait for the vendor to announce a fix before changing anything in the pilot","Pause that use, tell the people accountable for the risk and review why checks missed it"],
      3, "A consequential error that reached a customer calls for pausing the use and escalating to those accountable for the risk, then finding why review failed. Waiting or continuing unchanged leaves the harm in place."),
    S("da018", "data", "A user says the assistant explained its reasoning step by step, so the answer must be sound. How should the Product Owner respond?",
      ["Agree, since explanations are produced only for verified answers", "Explain that the stated reasoning can also be confabulated, so check the answer against a reliable source", "Agree, if the explanation sounds fluent and consistent", "Ask users to ignore explanations because they add no value"],
      1, "NIST AI 600-1 notes that logic or citations offered to justify an answer can be confabulated too, and may mislead people into trusting it. Verification needs a source outside the model."),
    S("da019", "data", "What does NIST AI RMF MAP 2.2 ask to be documented about an AI system?",
      ["Its training cost, hardware needs and expected running costs each month","Its marketing claims, target segments and positioning against rival products","Its release dates, team roster and the detailed plan for the next quarter","Its knowledge limits and how humans may use and oversee its output"],
      3, "MAP 2.2 asks for information about knowledge limits and how output may be used and overseen by humans, in enough detail to help relevant people decide and act."),
    S("da020", "data", "Which knowledge-limit entry is most useful to the people operating an answer-drafting assistant?",
      ["Tested only on English tickets from two regions; other languages and topics are untested","May occasionally make errors","Please use responsibly","Performance is strong overall across the cases we looked at, and users have been positive about it"],
      0, "A specific statement of what was and was not tested lets an operator decide when to check closely. The other entries give nothing to act on."),
    M("da021", "data", 2, "Which TWO items belong in a use-and-oversight note for a drafting assistant?",
      ["Who checks output before it reaches customers, and for which kinds of output", "The supplier's promotional claims about quality", "The sprint dates of the next three releases", "Kinds of input and uses that were not tested or are out of scope", "The names of everyone who tried the demo"],
      [0, 3], "Review responsibilities and untested or out-of-scope uses help people use and oversee the output. Promotional claims, release dates and demo attendance do not help anyone decide or act. The exact contents are good practice."),
    S("da022", "data", "Another department asks to reuse a document summariser for contract review, which its limits note does not cover. What should the Product Owner do?",
      ["Allow it, since the model is the same","Allow it with a warning banner on each summary and revisit the decision if any complaints arise","Treat it as a new use: evaluate it, involve the specialists and update the limits note first","Refuse, since reuse of a summariser is not possible"],
      2, "A new purpose is outside the documented limits, so it needs its own evaluation and specialist input, here legal colleagues, and a documented update before agreement."),
    S("da023", "data", "Reviewers say they cannot tell which drafts need a close check. Which fix helps most?",
      ["Ask reviewers to read every draft more slowly and more carefully","Document which output types need which checks and share it","Remove reviewers and rely on the model's confident tone instead","Tell reviewers to send every single doubt they have to the vendor"],
      1, "Documenting how output may be used and overseen is the point of MAP 2.2. Clear guidance on checking levels turns a vague duty into something reviewers can apply."),
    S("da024", "data", "What is the core concern of the value chain and component integration risk in NIST AI 600-1?",
      ["Models cost too much to run at scale", "Suppliers deliver components too slowly", "Untraceable third-party components, including data, that reduce transparency and accountability downstream", "Users prefer products built in-house"],
      2, "The profile describes non-transparent or untraceable integration of third-party components, including data that may be improperly obtained, reducing transparency and accountability for downstream users."),
    S("da025", "data", "A team plans to build on a third-party pre-trained model. Which request to the supplier best supports the Product Owner's risk work?",
      ["Information on the data and testing behind the model, and what it is not suited for","A promise that the model is accurate","A list of the supplier's other customers","A written statement that all risk of using the model sits entirely with the supplier"],
      0, "Product risk work needs facts about what sits behind a component and where it should not be used. Promises and customer lists are not evidence. The exact request is practical judgement, not NIST wording."),
    S("da026", "data", "Engineers want to add a purchased image collection to training, and the licence wording is unclear. What is the best action?",
      ["Proceed, since the supplier sold it to the team","Proceed and review the licence after launch","Pause and ask legal and compliance colleagues to check infringement risk before use","Let the engineering team decide on their own, since they know the data best and the product"],
      2, "NIST MAP 4.1 expects legal risks of third-party data, including possible infringement of others' rights, to be mapped. Unclear terms belong with legal and compliance colleagues before use."),
    S("da027", "data", "A supplier model sits inside a high-impact feature and might fail or be withdrawn. What should the Product Owner ask for?",
      ["Nothing, because outages are the supplier's responsibility to handle","A written contingency, with a fallback and named owners","A commitment from the team to rebuild the model in-house","A note on the roadmap to review the supplier again next year"],
      1, "GOVERN 6.2 asks for contingency processes for failures in third-party data or AI systems deemed high-risk. A fallback and named owners make that concrete."),
    S("da028", "data", "A team uses a bought model and a bought dataset it did not build. What does NIST MAP 4.2 imply for the team?",
      ["Nothing, since internal controls cover only the parts the team built itself","Rely on supplier assurances and skip internal checks","Test only after launch, and only if complaints arrive","Identify and document its own risk controls around those components"],
      3, "MAP 4.2 asks that internal risk controls for components, including third-party AI technologies, are identified and documented. Examples such as input and output checks and monitoring are general practice."),
    S("da029", "data", "The later phase lets the assistant book vehicle changes itself. How should this phase be classified?",
      ["Agentic: it takes actions toward a goal, not only drafting text","Rules-based: any booking follows a fixed rule","Machine learning only: it neither generates nor acts","Generative only: it still just writes answers for staff to read after the fact"],
      0, "Booking changes means taking actions through connected tools, which is the mark of an agentic system. That raises questions about permitted actions and who can stop it.", "scDA1"),
    S("da030", "data", "The route notes come mainly from two large depots, but the assistant will serve every depot including small rural ones. What is the most relevant data concern?",
      ["Availability: notes may be stored in too many places", "Suitability: notes are written in free text", "Representativeness: notes from two depots may not reflect conditions at the others", "Ownership: depots may disagree about who wrote them"],
      2, "The mismatch between the source depots and the depots of real use is a representativeness gap. Record it and scope or test accordingly.", "scDA1"),
    S("da031", "data", "The purchased depot dataset arrived with only a short summary of its contents. What should the Product Owner do before it is used?",
      ["Use it, since the firm paid for it","Ask the supplier, and legal and privacy colleagues, about ownership, permitted use and any personal data before use","Use it for a small test first and check the terms later","Use it once the engineers confirm it looks clean, then ask the supplier about terms in the next sprint"],
      1, "Payment does not settle ownership or permitted use. Rights and personal data questions go to legal and privacy colleagues before the data is used, in line with MAP 4.1.", "scDA1"),
    S("da032", "data", "In testing, the assistant gives a confident, fluent but wrong answer about a delivery exception. Which design response fits best?",
      ["Add a standard apology line to the end of every answer shown to staff","Tell staff in training sessions that the assistant is usually right","Remove the source notes from answers to keep them short and quick to read","Show sources with each answer and check consequential cases"],
      3, "Confabulation is a property of how generative models work, so the product needs checks that do not rest on the model: visible sources and human review where stakes are higher.", "scDA1"),
    S("da033", "data", "Which entry belongs in the use-and-oversight note for the assistant?",
      ["Drafted answers on exceptions are suggestions that a dispatcher checks before any customer-facing action","Answers are final once shown","Staff may use it for any task in the firm","Oversight of the assistant is handled by the model provider on behalf of the whole firm and all of its dispatchers"],
      0, "MAP 2.2 asks how output may be used and overseen by humans. Naming who checks, and before which actions, makes oversight specific. The firm keeps responsibility for how its product is used.", "scDA1"),
    S("da034", "data", "The third-party model provider announces an update to the model behind the assistant. What is the best Product Owner response?",
      ["Ask what changed, re-run documented tests and keep a fallback","Accept the update automatically, since newer versions are better","Ask the team to re-test only if staff start to complain about errors","Freeze the assistant for good and stop using the provider altogether"],
      0, "A supplier change can alter behaviour without any change on your side, so check what changed, re-run tests and keep a fallback. This is practical judgement, in the spirit of MAP 4.2 and GOVERN 6.2.", "scDA1"),
    M("da035", "data", 2, "Which TWO controls should be in place before the assistant may book vehicle changes by itself?",
      ["Trust the model's own confidence as the approval signal", "A limit on which bookings it may make, with a person approving costly ones", "Responsibility for errors passing to the model provider", "A way for named people to stop the assistant and undo its bookings", "A launch date announced to all depots"],
      [1, 3], "Limits on permitted actions with human approval for costly ones, plus a way to stop and undo, keep autonomy bounded. Model confidence is not a safe approval signal, and accountability does not pass to the provider.", "scDA1")
  );

  Object.assign(window.AIPO.why, {
    "da001": ["A learned system would infer the limit from examples, but here an analyst wrote it down.", "The fixed condition was written by a person, so the tool is rules-based.", "Nothing is generated; the same condition gives the same flag each time.", "The tool pursues no goals and takes no actions of its own."],
    "da002": ["That describes rules-based software, not learning from examples.","That describes generative AI, which is one kind of ML but not the definition of it.","That describes an agentic system acting on its own.","Learning behaviour from examples is the core idea of ML."],
    "da003": ["Generative AI creates new content such as a draft in response to a request.", "Sorting by stored rules is classification by rules, not generation.", "Returning a stored reply is retrieval, not generating new content.", "Measuring waiting time is reporting, not generation."],
    "da004": ["Switching on every action quickly raises risk instead of managing it.","The label matters less than what the system may do.","Scope of autonomy and the means to stop or override it are the added questions.","Politeness is a quality concern, not the new issue that autonomy brings."],
    "da005": ["True: learned behaviour reflects its examples, so data quality matters.", "Even if the same input gives the same output, a few samples cannot cover the cases it may meet, so more testing is needed.", "Adapting does not remove the need for documented limits.", "True: it can fail on cases its examples did not cover.", "Learned behaviour is generally not a short readable list of rules."],
    "da006": ["Generated decisions vary, which clashes with the need for the same answer every time.","Letting a system choose the policy adds autonomy the task does not need.","Written cut-offs and a repeatability need point to plain rules.","A learned model might drift from the written policy and is harder to explain."],
    "da007": ["These are cost and operations factors, not the MAP 2.3 examples.","MAP 2.3 names availability, representativeness and suitability.","Ownership matters but is a good-practice question, and price and format are not named.","These are outcome qualities, not the data considerations named."],
    "da008": ["Storage is an operations detail that does not address the mismatch.", "Collection speed says nothing about whether the data fits the setting.", "A consistent format is useful but does not make the data representative.", "Representativeness asks whether the data reflects where the product is used."],
    "da009": ["Retention length does not show the data fits the new purpose.", "Having one system is convenient but not a suitability test.", "Suitability asks whether data collected for billing fits a prediction task.", "The largest dataset can still be unsuitable."],
    "da010": ["Permission for a new use is a privacy and legal question and comes first.","Being stored does not mean the use is permitted.","Engineers cannot settle permission, and removing names may not be enough.","Asking after results arrive means the data was already used."],
    "da011": ["Training speed concerns effort, not rights.", "Ownership and reuse terms are core ownership questions.", "Loading format is an engineering convenience.", "Presentation to executives has no bearing on rights.", "A confirmed basis for the use, checked with privacy or legal, is the permission question."],
    "da012": ["Work is delegated, accountability for the product decision stays with the Product Owner.", "Accountability for the product decision does not transfer to engineering.", "Asking only after poor results means asking after the risk is built in.", "The vendor sells a model and does not own your product decision."],
    "da013": ["The problem is not a stale database; generative models do not just look up facts.", "Output approximates training-data patterns, which can read well and still be wrong.", "Even well-tested models confabulate, since it follows from how they work.", "This is not how confabulation arises."],
    "da014": ["Drift is change in behaviour over time, not confident false output.", "Overfitting is fitting training data too closely, a different problem.", "Data poisoning is deliberate tampering with data.", "Confabulation is the NIST AI 600-1 term for this risk."],
    "da015": ["Instructions can reduce errors but do not fully control output.","A clean demo is weak evidence and does not remove the underlying property.","It may reduce errors, but testing, checks and oversight are still needed.","Instructions can have some effect, so rejecting them outright is wrong."],
    "da016": ["Showing sources lets reviewers check the draft, provided they confirm the sources are real.", "Hiding limits invites over-trust.", "Human checks for consequential output do not depend on model confidence.", "Fluent tone is not evidence of correctness.", "Open-ended long-form answers are where the risk matters most, so they need testing."],
    "da017": ["Treating it as a rare example hides a real failure.","Asking for more care leaves the weak review step in place.","Waiting for the vendor leaves the harm risk in place.","A consequential error reached a customer, so pause and escalate to those accountable for the risk."],
    "da018": ["Explanations are produced regardless of whether the answer is correct.", "Stated reasoning can be confabulated too, so check against a reliable source.", "Fluency and consistency do not show correctness.", "Explanations can help when they are checked; ignoring them is not the lesson."],
    "da019": ["Cost and hardware are not what MAP 2.2 asks for.","Marketing claims are not documentation of limits and oversight.","Release dates and rosters are project facts, not limits.","MAP 2.2 asks for knowledge limits and how output may be used and overseen."],
    "da020": ["Specific tested conditions and untested areas tell operators when to check.","This is too vague to act on.","This gives no information about limits.","A general claim of strength hides limits."],
    "da021": ["Review responsibilities are core to oversight.", "Supplier claims do not help reviewers decide or act.", "Release dates are project planning, not oversight.", "Untested and out-of-scope uses state the knowledge limits.", "Demo attendance is irrelevant to use and oversight."],
    "da022": ["The same model does not mean the same limits for a new task.","A banner does not replace evaluation of a new, higher-stakes use.","A new use needs evaluation, specialist input and an updated note before agreement.","Reuse is possible, but only after proper checking."],
    "da023": ["Reading slower does not tell reviewers what matters.","Clear guidance on checking levels turns oversight into something usable.","Confident tone is not a reliable sign of correctness.","Pushing every doubt to the vendor does not give reviewers guidance."],
    "da024": ["Cost is not the stated concern of this risk.", "Delivery speed is not the concern.", "The concern is untraceable third-party components that reduce transparency and accountability.", "In-house preference is not the concern."],
    "da025": ["Information about data, testing and unsuitable uses supports product risk work.","A promise is not evidence.","Other customers say nothing about suitability for your use.","A claim that risk sits with the supplier does not remove your product's risk."],
    "da026": ["A sale does not settle licence or infringement risk.","Reviewing after launch accepts the risk first.","Unclear terms and infringement risk go to legal and compliance colleagues before use.","The team lacks the role to judge legal rights."],
    "da027": ["Supplier failure can still harm your users, so the product needs a plan.","A contingency with fallback and owners matches GOVERN 6.2.","Rebuilding in-house is a major choice and not a contingency.","A review next year does not plan for sudden failure."],
    "da028": ["MAP 4.2 covers components including third-party AI technologies.","Supplier assurances do not replace the team's own controls.","Waiting for complaints puts the risk on users.","MAP 4.2 asks for internal controls to be identified and documented."],
    "da029": ["Taking actions toward a goal is the mark of an agentic system.","The booking is not a fixed rule; the system chooses steps.","It still generates text and now also acts.","It generates answers and also acts, so generative alone is incomplete."],
    "da030": ["Scattered storage is an availability issue, not the stated mismatch.", "Free text is a format point, not the main gap.", "Notes from two depots may not reflect conditions elsewhere.", "Authorship is not the concern raised."],
    "da031": ["Payment does not settle ownership or permitted use.","Ownership, permitted use and personal data go to the right people before use.","A test is still use, so the questions come too late.","Cleanliness does not answer rights questions."],
    "da032": ["An apology does not reduce wrong answers or harm.","Claiming it is usually right encourages over-trust.","Removing sources makes checking harder.","Visible sources and checks for consequential cases do not rely on model confidence."],
    "da033": ["Names who checks and before which actions, which makes oversight specific.","Treating answers as final removes oversight.","Unlimited use goes beyond the documented scope.","Oversight of your product use does not belong to the provider."],
    "da034": ["Ask what changed, re-run tests and keep a fallback.","A supplier update can change behaviour in ways that harm your use.","Waiting for complaints puts the discovery on users.","Stopping for good is an overreaction to a routine change."],
    "da035": ["Model confidence is not a safe approval signal.", "Bounded actions and human approval for costly ones limit harm.", "Accountability does not pass to the provider.", "Named people able to stop and undo keep autonomy controllable.", "An announcement does nothing to control risk."]
  });

  window.AIPO.cards.push(
    { id: "datac01", domain: "data", front: "How do rules-based software and machine learning differ at a working level?", back: "Rules-based software follows conditions people wrote. Machine learning learns behaviour from examples.\nTrap: assuming a learned system behaves as predictably as a rule." },
    { id: "datac02", domain: "data", front: "What does generative AI add compared with other machine learning?", back: "It produces new content, such as text or images, in response to a request.\nTrap: treating fluent output as verified output." },
    { id: "datac03", domain: "data", front: "What extra question does an agentic system raise?", back: "What may it do on its own, what needs permission, and who can stop it?\nTrap: enabling every action at launch." },
    { id: "datac04", domain: "data", front: "When is a plain rule often the better choice?", back: "When the logic is already written, must be repeatable and must be easy to explain.\nTrap: picking AI for prestige." },
    { id: "datac05", domain: "data", front: "Which three data considerations does MAP 2.3 name as examples?", back: "Availability, representativeness and suitability.\nTrap: judging data by size alone." },
    { id: "datac06", domain: "data", front: "What does representativeness ask?", back: "Does the data look like the people and situations of real use?\nTrap: trusting an average that hides weak groups." },
    { id: "datac07", domain: "data", front: "What does suitability ask?", back: "Is the data fit for this specific purpose, not just any purpose?\nTrap: reusing data gathered for another job without checking." },
    { id: "datac08", domain: "data", front: "Who do you involve on data ownership and permission?", back: "Privacy, legal or compliance colleagues, before the data is used.\nTrap: asking after the model is trained." },
    { id: "datac09", domain: "data", front: "What is confabulation in NIST AI 600-1?", back: "Confidently stated but false content from a generative model, also called hallucination.\nTrap: reading it as a rare bug rather than a property of how these models work." },
    { id: "datac10", domain: "data", front: "Why can generative models be confidently wrong?", back: "They produce output that approximates patterns in training data, which can be fluent and wrong.\nTrap: using a confident tone as a sign of accuracy." },
    { id: "datac11", domain: "data", front: "Name two product responses to confabulation.", back: "Show sources, and send consequential output to a person who checks it. Test on realistic open-ended questions too.\nTrap: relying on a prompt instruction alone." },
    { id: "datac12", domain: "data", front: "What does MAP 2.2 ask to be documented?", back: "The system's knowledge limits and how output may be used and overseen by humans.\nTrap: a generic disclaimer that gives reviewers nothing to act on." },
    { id: "datac13", domain: "data", front: "What is the value chain and component integration risk?", back: "Third-party components, including data, that are improperly obtained or not vetted, reducing transparency and accountability downstream.\nTrap: assuming the supplier carries the risk." },
    { id: "datac14", domain: "data", front: "What do MAP 4.1 and 4.2 ask about components?", back: "Map legal risks of components, including third-party data or software, and document internal risk controls around them.\nTrap: skipping controls for parts you did not build." },
    { id: "datac15", domain: "data", front: "What do GOVERN 6.1 and 6.2 cover?", back: "Policies for third-party risks, and contingency processes for failures in third-party data or AI systems deemed high-risk.\nTrap: having no fallback for a failing supplier." },
    { id: "datac16", domain: "data", front: "A supplier updates the model inside your product. What do you do?", back: "Ask what changed, re-run documented tests and keep a fallback ready.\nTrap: accepting the update automatically." }
  );
})();
