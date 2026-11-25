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
        "Define the tasks and methods the system supports (MAP 2.1).",
        "As practical judgement, pick the simplest kind that fits."
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

  window.AIPO.scenarios.scDA2 = {
    title: "Pilot and phase two of the dispatch assistant",
    text: "The same parcel-delivery firm runs its internal dispatch assistant, built on a third-party generative model and the firm's own route notes. Its route notes come mainly from two of the firm's nine depots. Phase one drafts answers about delivery exceptions, and dispatch staff edit each draft before anything is sent. Phase two may let the assistant book vehicle changes itself. An executive is accountable for the risk of the assistant. You are the Product Owner."
  };

  window.AIPO.questions.push(
    S("da001", "data", "A scheduling tool flags any shift over ten hours because a fixed condition written by an analyst says so, and it gave identical flags on two re-runs of last month's rosters. What kind of system is this?",
      ["A machine learning system that learned the limit from past rosters", "A rules-based system applying written conditions", "A generative system that composes a fresh flag on each run", "An agentic system that picks its own goals and actions"],
      1, "It applies a condition that people wrote, which is the defining feature of rules-based software. Nothing was learned from examples, nothing is generated and no goals are chosen."),
    S("da002", "data", "A stakeholder asks whether the proposed churn-scoring feature is 'real machine learning' or a set of rules. How should the Product Owner describe machine learning at a working level?",
      ["Software that applies if-then steps that analysts wrote and can read", "Software that writes new text or images when a user asks for them", "Software that books and changes things for staff on its own initiative", "Software that learns its behaviour from examples, not rules"],
      3, "Learning behaviour from examples is what separates machine learning from rules. This is a working-level description from general practice."),
    S("da003", "data", "A team wants a tool that drafts a first reply to each customer email, for about 300 emails a day. Which description fits a generative AI system?",
      ["It produces a new draft in response to each request", "It sorts each email into one of five labels using stored rules", "It looks up a stored reply and returns it unchanged to the sender", "It measures how long each email waits for a reply from staff"],
      0, "Generative AI produces new content such as text from a request. Sorting by stored rules, returning a fixed reply and timing emails are not generation."),
    S("da004", "data", "A vendor says its product is an agentic system that can act on behalf of dispatch staff, for example by rebooking vehicles. Which extra question does this raise for the Product Owner?",
      ["How soon can the supplier switch the actions on for the whole firm?", "Is it accurate to call this artificial intelligence at all?", "Which actions may it take on its own, and who can stop or override it?", "Are its written answers polite and well formatted enough?"],
      2, "An agentic system chooses steps and takes actions, so the scope of its autonomy and the means to stop it become product questions. This is general practice."),
    M("da005", "data", 2, "Which TWO statements are true when comparing a machine learning feature with a rules-based one?",
      ["Its behaviour depends on the examples it learned from, so data quality matters", "Its output is fixed for a given input, so a few sample tests cover the risk", "It adapts by itself, so documented limits add little", "It can be wrong on cases that its examples did not cover", "Its decisions can be read straight off a short list of rules"],
      [0, 3], "A learned system is shaped by its examples, so data quality matters, and it can fail on cases the examples did not cover. Learned behaviour is not a short readable list of rules, and it still needs documented limits and real testing."),
    S("da006", "data", "Eligibility for a staff benefit follows a written policy with exact cut-offs, about 2,000 decisions a year, and auditors want the same answer for the same case. Which approach fits best?",
      ["A generative system that drafts each decision from the policy text, with a reviewer approving it", "An agentic system that decides which policy applies and records its reasoning", "Rules-based software applying the written cut-offs, tested against policy examples", "A machine learning model trained on past benefit decisions and tested on last year's cases"],
      2, "When the logic is already written and must be repeatable, rules are simpler to test and explain. Domain 3 covers this choice in more depth. This is general practice."),
    S("da007", "data", "Which data considerations does NIST AI RMF MAP 2.3 give as examples when data collection and selection are documented?",
      ["Volume, speed and storage cost of the data once collected", "Availability, representativeness and suitability", "Ownership, price and file format of the data and its source", "Accuracy, privacy, fairness and the cost of errors in use"],
      1, "MAP 2.3 names availability, representativeness and suitability in this context. Ownership and permission are good-practice questions that sit beside them."),
    S("da008", "data", "A model was built from records of 40 large city branches, and the product will be rolled out to 12 small rural branches next month. Which data question matters most?",
      ["Is there enough storage to keep all the records for audit review?", "Were the records collected quickly enough to be current?", "Are the records in one consistent file format for the engineers?", "Do the records reflect the rural branches it will actually serve?"],
      3, "Representativeness asks whether the data looks like the setting of real use. Storage, speed and format may matter later but do not address the mismatch."),
    S("da009", "data", "Data gathered over five years to process invoices is proposed as the base for predicting which customers will leave. What is the key check?",
      ["Whether the invoice archive is backed up each night and kept for seven years", "Whether the data sits in one system that the team can query easily", "Whether data gathered for billing is suitable for predicting behaviour", "Whether it is the largest dataset available to the firm this year"],
      2, "Suitability asks whether the data fits the job at hand. Data collected for billing may not hold what a prediction about behaviour needs."),
    S("da010", "data", "A team proposes training on 18 months of past support chats that contain customer names and account details, and the sprint ends on Friday. What should the Product Owner do?",
      ["Involve privacy and legal colleagues before agreeing to a training run", "Approve it, since the chats are already held in company systems and were kept for support", "Ask the engineers to review the chats and remove names on their own judgement", "Wait for test results from a pilot model and then ask whether the use is allowed"],
      0, "Permission to use data for a new purpose is a question for privacy and legal colleagues, and it comes before training. Stored does not mean permitted, and approval after results arrive is too late."),
    M("da011", "data", 2, "Which TWO questions test ownership and permission for a dataset?",
      ["Is the dataset large enough to train within a week?", "Who owns or controls this data, and what terms apply to reusing it?", "Which format will be tested first for loading speed?", "Which chart will show data quality best in the executive review?", "Do we have a confirmed basis for this use, checked with privacy or legal colleagues?"],
      [1, 4], "Ownership and terms of reuse, and a confirmed basis for the use, are the ownership and permission questions. Size, format and charts concern effort and presentation, not rights."),
    S("da012", "data", "An engineer says data questions are technical and the Product Owner can skip them, since the team has two senior data engineers. What is the best reply?",
      ["The engineers do the data work, but I stay accountable for the product decision", "Agreed, accountability for data passes to engineering once they take the work on", "I will ask when the first test results look poor", "I will ask the vendor instead, since the vendor sells the model to us"],
      0, "Work can be delegated but the Product Owner remains accountable for the product decision (Scrum Guide). Asking early is part of that accountability."),
    S("da013", "data", "A drafting tool cited a policy clause that does not exist, in a calm and fluent tone. Why can a generative model do this?",
      ["It looks facts up in a database that is sometimes out of date or incomplete for the task", "It generates output approximating its training patterns, which can be fluent but wrong", "Its developers did too little testing before release, so errors slipped through to staff", "It copies the user's own mistakes back to them when the prompt contains an error"],
      1, "NIST AI 600-1 describes confabulation as a natural result of how generative models are designed: they approximate the statistical pattern of training data. Fluent and accurate are different properties."),
    S("da014", "data", "A reviewer finds an invented citation in a draft. Which term does NIST AI 600-1 use for confidently stated but false output from a generative model?",
      ["Drift", "Overfitting", "Data poisoning", "Confabulation"],
      3, "The profile names this risk confabulation and notes that it is also called hallucination or fabrication. The other terms describe different problems."),
    S("da015", "data", "A team lead says adding the instruction 'only state true facts' to the system text solves wrong answers, and wants to release to 200 staff on Monday. What should the Product Owner do?",
      ["Accept the claim, since written instructions fully control what a model says, and release on Monday as planned", "Accept it once a ten-question test shows no wrong answers, then release to the 200 staff", "Keep the instruction as one control and ship a pilot to 30 staff with sources shown and spot checks", "Reject the instruction as having no effect and hold the release until a review shows zero errors"],
      2, "NIST AI 600-1 describes confabulation as a natural result of how generative models are designed. As practical judgement, an instruction cannot be relied on to remove it, but it may reduce errors, so keep it as one control and release in a limited way with sources shown and checks in place."),
    M("da016", "data", 2, "Which TWO design choices respond sensibly to confabulation in an answer-drafting feature?",
      ["Show the source passages used so reviewers can check the draft", "Hide the limits so users trust the tool more", "Send drafts for consequential decisions to a person who checks them before use", "Treat a fluent tone as a sign the content is correct", "Test on short factual questions and treat long open-ended ones as covered"],
      [0, 2], "Showing sources and adding human review for consequential output both work without relying on the model's confidence. NIST AI 600-1 notes that open-ended, long-form answers are where the risk is most relevant."),
    S("da017", "data", "A pilot of 40 staff shows the assistant cited a policy that does not exist, and the text went into a customer letter. What is the best next step?",
      ["Add the case to the demo script as a rare example and review it at the next sprint review", "Ask staff to check more carefully, continue the pilot unchanged and monitor customer complaints", "Pause the whole programme until the supplier ships a fix, then test it before restarting", "Pause the customer-letter use, tell the accountable owners and find why checks missed it before resuming"],
      3, "A consequential error that reached a customer calls for pausing that use and telling those accountable for the risk, then finding why review failed. Pausing the whole programme overreacts, and continuing unchanged leaves the harm in place."),
    S("da018", "data", "A user says the assistant explained its reasoning step by step, so the answer must be sound. How should the Product Owner respond?",
      ["Agree, since explanations are produced when answers have been verified", "Explain that stated reasoning can be confabulated too, so check the answer against a reliable source", "Agree, as long as the explanation sounds fluent and consistent", "Ask users to disregard explanations, since they add no value to a review"],
      1, "NIST AI 600-1 notes that logic or citations offered to justify an answer can be confabulated too, and may mislead people into trusting it. Verification needs a source outside the model."),
    S("da019", "data", "What does NIST AI RMF MAP 2.2 ask to be documented about an AI system?",
      ["Its training cost, hardware needs and running costs", "Its marketing claims, target segments and positioning against rival products", "Its release dates, team roster and the detailed plan for the next quarter", "Its knowledge limits and how humans may use and oversee its output"],
      3, "MAP 2.2 asks for information about knowledge limits and how output may be used and overseen by humans, in enough detail to help relevant people decide and act."),
    S("da020", "data", "Which knowledge-limit entry is most useful to the people operating an answer-drafting assistant?",
      ["Tested on English tickets from two regions; other languages and topics are not tested", "Reviewed by the team and found accurate on the ticket types we looked at", "Checked against the support backlog, with strong overall results and positive user feedback", "May occasionally make errors, so users should apply their own judgement"],
      0, "A specific statement of what was and was not tested lets an operator decide when to check closely. The other entries give nothing to act on."),
    M("da021", "data", 2, "Which TWO items belong in a use-and-oversight note for a drafting assistant?",
      ["Who checks output before it reaches customers, and for which kinds of output", "The supplier's promotional claims about quality", "The sprint dates of the next three releases", "Kinds of input and uses that were not tested or are out of scope", "The names of the people who tried the demo"],
      [0, 3], "Review responsibilities and untested or out-of-scope uses help people use and oversee the output. Promotional claims, release dates and demo attendance do not help anyone decide or act. The exact contents are good practice."),
    S("da022", "data", "Another department asks to reuse a document summariser for contract review next week. The limits note covers only internal meeting notes. What should the Product Owner do?",
      ["Allow it, since the model is the same, and test a few summaries first", "Allow it for a trial on five contracts and review complaints at month end", "Decline for now, and ask them to bring a separate assessment with legal input", "Refuse permanently, since a summariser cannot be used for any contract work"],
      2, "A new purpose is outside the documented limits, so declining for now is a clear call: it needs its own evaluation and specialist input, here legal colleagues, and a documented update before agreement. A permanent ban overreaches, since reuse is possible after proper checking."),
    S("da023", "data", "Reviewers say they cannot tell which of the 150 daily drafts need a close check. Which fix helps most?",
      ["Ask reviewers to read each draft more slowly and review it twice", "Document which output types need which checks", "Remove the review step and rely on the model's confident tone", "Tell reviewers to send each doubt to the vendor for assessment"],
      1, "Documenting how output may be used and overseen is the point of MAP 2.2. Clear guidance on checking levels turns a vague duty into something reviewers can apply."),
    S("da024", "data", "What is the core concern of the value chain and component integration risk in NIST AI 600-1?",
      ["Models cost too much to run at scale", "Suppliers deliver components too slowly to meet release plans", "Third-party components, including data, that are hard to trace", "Users prefer in-house products, so adoption of external parts falls"],
      2, "The profile describes non-transparent or untraceable integration of third-party components, including data that may be improperly obtained, reducing transparency and accountability for downstream users."),
    S("da025", "data", "A team plans to build on a third-party pre-trained model. Which request to the supplier best supports the Product Owner's risk work?",
      ["Information on the data and testing behind the model, and what it is not suited for", "A written promise that the model has been checked and is accurate on our use cases", "A list of the supplier's other customers and their reviews", "A statement that the supplier carries the risk of using the model"],
      0, "Product risk work needs facts about what sits behind a component and where it should not be used. Promises and customer lists are not evidence. The exact request is practical judgement, not NIST wording."),
    S("da026", "data", "Engineers want to add a purchased collection of about 80,000 images to training next week, and the licence wording is unclear. What is the best action?",
      ["Proceed, since the supplier sold it to the team, and review the licence after the first release", "Proceed with a 10,000-image sample first and check the licence while testing", "Pause use of the collection and ask legal and compliance colleagues to check infringement risk", "Let the engineering team decide on their own judgement, since they assessed the data quality"],
      2, "NIST MAP 4.1 expects legal risks of third-party data, including possible infringement of others' rights, to be mapped. Unclear terms belong with legal and compliance colleagues before use, and a sample is still use."),
    S("da027", "data", "A supplier model sits inside a feature used by 3,000 customers where a failure would be costly, and the supplier has made no commitment on how long it will support the model. What should the Product Owner do?",
      ["Nothing yet, since the supplier assessed its own outage risk and its terms cover it", "Make launch conditional on a documented fallback with named owners", "Commit the team to rebuild the model in-house within a year, reviewed quarterly", "Add a roadmap note to review the supplier again at the next planning session"],
      1, "GOVERN 6.2 asks for contingency processes for failures in third-party data or AI systems deemed high-risk. Making launch depend on a fallback with named owners makes that concrete."),
    S("da028", "data", "A team uses a bought model and a bought dataset it did not build. What does NIST MAP 4.2 imply for the team?",
      ["Internal controls cover what the team built; the supplier covers the rest", "Supplier assurances are enough, so internal checks can wait", "Testing starts after launch and continues if complaints arrive", "Identify and document its own internal risk controls around the bought parts"],
      3, "MAP 4.2 asks that internal risk controls for components, including third-party AI technologies, are identified and documented. Examples such as input and output checks and monitoring are general practice."),
    S("da029", "data", "The later phase lets the assistant book vehicle changes itself through the dispatch system. How should this phase be classified?",
      ["Agentic: it takes actions toward a goal as well as drafting text", "Rules-based: each booking follows a fixed rule", "Machine learning alone: it neither generates nor acts", "Generative alone: it writes answers that staff read after the fact"],
      0, "Booking changes means taking actions through connected tools, which is the mark of an agentic system. That raises questions about permitted actions and who can stop it.", "scDA1"),
    S("da030", "data", "The route notes come mainly from two large depots, but the assistant will serve all nine depots, including small rural ones. What is the most relevant data concern?",
      ["Availability: notes may be stored in too many places for staff to find them", "Suitability: notes are written in free text rather than structured fields", "Representativeness: notes from two depots may not reflect the others", "Ownership: depots may disagree about who wrote them or who may edit them"],
      2, "The mismatch between the source depots and the depots of real use is a representativeness gap. Record it and scope or test accordingly.", "scDA1"),
    S("da031", "data", "The purchased depot dataset, about 60,000 records, arrived with a short summary. Phase one is due in three weeks. What should the Product Owner do?",
      ["Include it in phase one, since the firm paid for it, and review the terms after the first release", "Ship phase one on route notes, and add the dataset after legal and privacy check the rights", "Include it in a small test first and check the terms while the test runs", "Include it once the engineers confirm it looks clean, then review the terms during the next sprint"],
      1, "Payment does not settle ownership or permitted use. Narrowing phase one to data with clear provenance keeps the date, and rights and personal data questions go to legal and privacy colleagues before the dataset is used, in line with MAP 4.1.", "scDA1"),
    S("da032", "data", "In testing, the assistant gives a confident, fluent but wrong answer about a delivery exception. Which design response fits best?",
      ["Add a standard apology line to the end of answers", "Tell staff in training that the assistant has been tested and is usually right", "Remove the source notes from answers to keep them short for reviewers", "Ship with sources shown on each answer and spot checks on consequential cases"],
      3, "Confabulation is a property of how generative models work, so the product needs checks that do not rest on the model: visible sources and human review where stakes are higher.", "scDA1"),
    S("da033", "data", "Which entry belongs in the use-and-oversight note for the assistant?",
      ["Drafts are suggestions a dispatcher checks before acting on them", "Answers are final once shown, so dispatchers need not review them before acting", "Staff may use it for tasks across the firm, including those not yet tested", "Oversight of the assistant is handled by the model provider"],
      0, "MAP 2.2 asks how output may be used and overseen by humans. Naming who checks, and before which actions, makes oversight specific. The firm keeps responsibility for how its product is used.", "scDA1"),
    S("da034", "data", "The third-party provider announces an update to the model behind the assistant, due in two weeks, and the old version can be kept running for now. What is the best Product Owner response?",
      ["Ask what changed, re-run the documented tests before switching, and keep a fallback ready", "Accept the update automatically, since the provider tested it and newer versions are better", "Re-test the assistant only if staff complain about errors after the update", "Freeze the assistant on the old version for good and review the provider contract"],
      0, "A supplier change can alter behaviour without any change on your side, so check what changed, re-run tests and keep a fallback. This is practical judgement, in the spirit of MAP 4.2 and GOVERN 6.2.", "scDA2"),
    M("da035", "data", 2, "Which TWO controls should be in place before the assistant may book vehicle changes by itself?",
      ["Treat the model's own confidence as the approval signal", "A limit on which bookings it may make, with a person approving costly ones", "Responsibility for errors assigned to the model provider", "A way for named people to stop the assistant and undo its bookings", "A launch date announced to the depots"],
      [1, 3], "Limits on permitted actions with human approval for costly ones, plus a way to stop and undo, keep autonomy bounded. Model confidence is not a safe approval signal, and accountability does not pass to the provider.", "scDA2"),
    S("da036", "data", "Phase one is ready. The route notes come mainly from 2 of the firm's 9 depots, and the other 7 have different volumes and exception types. What is the best launch decision?",
      ["Launch to all nine depots with a dashboard to monitor answer quality", "Launch to the two covered depots with a switch-off rule, and widen after testing", "Hold the launch until notes from the other seven depots are collected and documented", "Launch to four depots picked by who asked first, and check quality later"],
      1, "Launching where the data is representative, with a switch-off rule, ships value and limits the gap. Widening only after testing at each new depot closes it. This is practical judgement.", "scDA2"),
    S("da037", "data", "The assistant's drafts are edited by dispatch staff before anything is sent. In a 200-question test, 6% of drafts contained an unsupported claim, and the accountable executive has asked for a pilot decision this week. What should the Product Owner do?",
      ["Hold the pilot until a retest of the 200 questions shows zero unsupported claims, then ask the executive to approve a restart", "Release to customers directly with a disclaimer and monitor the unsupported-claim rate each week after launch", "Escalate the 6% result to the full risk committee and pause the dispatch pilot until it sets an acceptable rate", "Run the pilot with edit-before-send, a rate and stop threshold agreed with the accountable executive, and a review date"],
      3, "Staff editing before send is a real control, so a limited pilot is defensible. The acceptable rate and a stop threshold are agreed, before the pilot, by the executive who is accountable for the risk and not by the Product Owner alone, and a review date keeps it under watch. This is practical judgement.", "scDA2"),
    S("da038", "data", "Legal confirms that a purchased labelled dataset has clear rights for 70% of its records and says the rest is unclear. A training run is booked for this week. What is the best call?",
      ["Train on the full set and record the unclear 30% as a known risk, to be reviewed after release", "Train on the 70% with cleared rights, ship on that basis and hold the rest for legal", "Cancel the run and ask the supplier to confirm rights for every record before any work", "Train on a random 70% of the records and test the model for signs of copied content"],
      1, "Using only the cleared records keeps the work moving without using data whose rights are unclear. A random 70% does not match the rights position, and testing for copied content does not settle it. This is practical judgement; legal colleagues own the rights question."),
    S("da039", "data", "In phase two the assistant could make about 400 vehicle bookings a day, and 3 dispatchers work each shift. Most bookings are low-cost swaps and a few are costly. What is the best release decision?",
      ["Require a dispatcher to check low-cost swaps and costly ones alike for a full month", "Let it book swaps of any cost without limits for a month, then review the log of what it booked and cost", "Hold phase two until six months of draft-only use are reviewed and show no costly errors at any depot", "Auto-book low-cost swaps under a cap agreed with the accountable owner; approve costly ones; keep stop and undo"],
      3, "Approving 400 bookings a day with 3 dispatchers would turn into rubber-stamping, so bound the autonomy instead: a cap, human approval where cost is high, and stop and undo controls. The cap and threshold are agreed with the people accountable for the risk. Unlimited booking or an open-ended wait are both poor trades.", "scDA2")
  );

  Object.assign(window.AIPO.why, {
    "da001": ["A learned system would infer the limit from examples, but here an analyst wrote it down.", "The fixed condition was written by a person, and identical re-runs fit a rules-based tool.", "Nothing is generated; the same condition gives the same flag each time.", "The tool pursues no goals and takes no actions of its own."],
    "da002": ["That describes rules-based software, not learning from examples.", "That describes generative AI, which is one kind of ML but not the definition of it.", "That describes an agentic system acting on its own.", "Learning behaviour from examples is the core idea of ML."],
    "da003": ["Generative AI creates new content such as a draft in response to a request.", "Sorting by stored rules is classification by rules, not generation.", "Returning a stored reply is retrieval, not generating new content.", "Measuring waiting time is reporting, not generation."],
    "da004": ["Switching actions on quickly raises risk instead of managing it.", "The label matters less than what the system may do.", "Scope of autonomy and the means to stop or override it are the added questions.", "Politeness is a quality concern, not the new issue that autonomy brings."],
    "da005": ["True: learned behaviour reflects its examples, so data quality matters.", "Even if the same input gives the same output, a few samples cannot cover the cases it may meet, so more testing is needed.", "Adapting does not remove the need for documented limits.", "True: it can fail on cases its examples did not cover.", "Learned behaviour is generally not a short readable list of rules."],
    "da006": ["Generated decisions vary, which clashes with the need for the same answer for the same case, and an approver does not fix that.", "Letting a system choose the policy adds autonomy the task does not need.", "Written cut-offs and a repeatability need point to plain rules, which can be tested case by case.", "A learned model might drift from the written policy and is harder to explain, even if tested on last year."],
    "da007": ["These are cost and operations factors, not the MAP 2.3 examples.", "MAP 2.3 names availability, representativeness and suitability.", "Ownership matters but is a good-practice question, and price and format are not named.", "These are outcome qualities, not the data considerations named."],
    "da008": ["Storage is an operations detail that does not address the mismatch.", "Collection speed says nothing about whether the data fits the setting.", "A consistent format is useful but does not make the data representative.", "Representativeness asks whether the data reflects where the product is used."],
    "da009": ["Backup and retention of the archive are storage details, not a test of fit for the new purpose.", "Having one system is convenient but not a suitability test.", "Suitability asks whether data collected for billing fits a prediction task.", "The largest dataset can still be unsuitable."],
    "da010": ["Permission for a new use is a privacy and legal question and comes first.", "Being stored does not mean the use is permitted.", "Engineers cannot settle permission, and removing names may not be enough.", "Asking after results arrive means the data was already used."],
    "da011": ["Training speed concerns effort, not rights.", "Ownership and reuse terms are core ownership questions.", "Loading format is an engineering convenience.", "Presentation to executives has no bearing on rights.", "A confirmed basis for the use, checked with privacy or legal, is the permission question."],
    "da012": ["Work is delegated, accountability for the product decision stays with the Product Owner.", "Accountability for the product decision does not transfer to engineering.", "Asking after poor results means asking after the risk is built in.", "The vendor sells a model and does not own your product decision."],
    "da013": ["The problem is not a stale database; generative models do not just look up facts.", "Output approximates training-data patterns, which can read well and still be wrong.", "Even well-tested models confabulate, since it follows from how they work.", "This is not how confabulation arises."],
    "da014": ["Drift is change in behaviour over time, not confident false output.", "Overfitting is fitting training data too closely, a different problem.", "Data poisoning is deliberate tampering with data.", "Confabulation is the NIST AI 600-1 term for this risk."],
    "da015": ["Instructions can reduce errors but do not fully control output.", "A ten-question test is weak evidence and does not remove the underlying property.", "It may reduce errors, so keep it as one control and release in a limited way with sources and checks.", "Instructions can have some effect, and waiting for zero errors sets a target that cannot be met."],
    "da016": ["Showing sources lets reviewers check the draft, provided they confirm the sources are real.", "Hiding limits invites over-trust.", "Human checks for consequential output do not depend on model confidence.", "Fluent tone is not evidence of correctness.", "Open-ended long-form answers are where the risk matters most, so short factual tests do not cover them."],
    "da017": ["Treating it as a rare example hides a real failure.", "Asking for more care leaves the weak review step in place.", "Pausing the whole programme overreacts, since the failure is in one use and the supplier may never ship a fix.", "A consequential error reached a customer, so pause that use and tell those accountable for the risk."],
    "da018": ["Explanations are produced regardless of whether the answer is correct.", "Stated reasoning can be confabulated too, so check against a reliable source.", "Fluency and consistency do not show correctness.", "Explanations can help when they are checked; ignoring them is not the lesson."],
    "da019": ["Cost and hardware are not what MAP 2.2 asks for.", "Marketing claims are not documentation of limits and oversight.", "Release dates and rosters are project facts, not limits.", "MAP 2.2 asks for knowledge limits and how output may be used and overseen."],
    "da020": ["Specific tested conditions and untested areas tell operators when to check.", "This says what was looked at but not what was left out.", "A general claim of strength hides limits.", "This is too vague to act on."],
    "da021": ["Review responsibilities are core to oversight.", "Supplier claims do not help reviewers decide or act.", "Release dates are project planning, not oversight.", "Untested and out-of-scope uses state the knowledge limits.", "Demo attendance is irrelevant to use and oversight."],
    "da022": ["The same model does not mean the same limits for a new task, and a few summaries are a thin test for legal text.", "A trial on live contracts is use without evaluation of a higher-stakes task.", "A new purpose outside the documented limits needs its own assessment, so declining for now and asking for one with legal input is sound.", "Reuse is possible, but only after proper checking, so a permanent ban overreaches."],
    "da023": ["Reading slower does not tell reviewers what matters.", "Clear guidance on checking levels turns oversight into something usable.", "Confident tone is not a reliable sign of correctness.", "Pushing every doubt to the vendor does not give reviewers guidance."],
    "da024": ["Cost is not the stated concern of this risk.", "Delivery speed is not the concern.", "The concern is untraceable third-party components that reduce transparency downstream.", "In-house preference is not the concern."],
    "da025": ["Information about data, testing and unsuitable uses supports product risk work.", "A promise is not evidence.", "Other customers say nothing about suitability for your use.", "A claim that risk sits with the supplier does not remove your product's risk."],
    "da026": ["A sale does not settle licence or infringement risk.", "A sample is still use, so the licence question comes too late.", "Unclear terms and infringement risk go to legal and compliance colleagues before use.", "The team lacks the role to judge legal rights, whatever its view of data quality."],
    "da027": ["Supplier failure can still harm your users, so the product needs a plan.", "A contingency with fallback and owners matches GOVERN 6.2.", "Rebuilding in-house is a major choice and not a contingency.", "A review at the next planning session does not plan for sudden failure."],
    "da028": ["MAP 4.2 covers components including third-party AI technologies.", "Supplier assurances do not replace the team's own controls.", "Waiting for complaints puts the risk on users.", "MAP 4.2 asks for internal controls to be identified and documented."],
    "da029": ["Taking actions toward a goal is the mark of an agentic system.", "The booking is not a fixed rule; the system chooses steps.", "It still generates text and now also acts.", "It generates answers and also acts, so generative alone is incomplete."],
    "da030": ["Scattered storage is an availability issue, not the stated mismatch.", "Free text is a format point, not the main gap.", "Notes from two depots may not reflect conditions elsewhere.", "Authorship is not the concern raised."],
    "da031": ["Payment does not settle ownership or permitted use.", "Ship on data with clear provenance and add the dataset after rights and personal data are checked.", "A test is still use, so the questions come too late.", "Cleanliness does not answer rights questions."],
    "da032": ["An apology does not reduce wrong answers or harm.", "Claiming it is usually right encourages over-trust.", "Removing sources makes checking harder.", "Visible sources and checks for consequential cases do not rely on model confidence."],
    "da033": ["Names who checks and before which actions, which makes oversight specific.", "Treating answers as final removes oversight.", "Use beyond the documented scope is not covered by the testing done.", "Oversight of your product use does not belong to the provider."],
    "da034": ["Asking what changed, re-testing and keeping a fallback ready checks the update before users meet it.", "A supplier update can change behaviour in ways that harm your use, even if the provider tested it.", "Waiting for complaints puts the discovery on users.", "Staying on the old version for good is an overreaction to a routine change."],
    "da035": ["A model's confidence in its own output is not independent evidence that a booking is right, so it cannot serve as the approval.", "Bounded actions and human approval for costly ones limit harm.", "Accountability does not pass to the provider.", "Named people able to stop and undo keep autonomy controllable.", "An announcement does nothing to control risk."],
    "da036": ["Nine depots at once exposes seven the notes do not represent, and a dashboard shows poor answers only after users have met them.", "Launch where the data fits, with a switch-off rule, and widen after testing at each new depot.", "Waiting for notes from seven depots delays all value and is not needed to launch safely where data exists.", "Choosing depots by who asked first ignores whether the data fits, and reviewing after release is late."],
    "da037": ["Zero unsupported claims is not an achievable target, and waiting for it ignores the edit-before-send control.", "Customer release with a disclaimer removes the staff editing step that makes the risk acceptable.", "The accountable executive is already involved and a pilot with edit-before-send can run now, so pausing for a separate committee rate delays value without adding a control.", "A limited pilot with edit-before-send kept, an acceptable rate and stop threshold agreed by the accountable executive before launch, and a review date is defensible."],
    "da038": ["Training on records with unclear rights treats a known legal question as a risk to review later.", "Using cleared records only keeps work moving and respects the rights position.", "Cancelling everything is more than the facts need, since 70% is cleared.", "A random 70% does not match which records are cleared, and testing for copying does not settle rights."],
    "da039": ["Approving 400 bookings a day with 3 dispatchers would become rubber-stamping.", "Unlimited booking for a month exposes costly errors before any control exists.", "Six months of draft-only use delays value and does not test autonomy itself.", "A cap agreed with the accountable owner, approval for costly bookings, and stop and undo controls bound the autonomy."]
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
