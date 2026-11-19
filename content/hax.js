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
      "id": "hax-1",
      "n": 1,
      "domain": "hax",
      "title": "Set honest expectations before users form their own",
      "body": "People start forming a picture of what a product can do before they ever use it. This picture is called a mental model: a person's understanding of how something works and how their actions affect it. The Google People + AI Guidebook (chapter Mental Models) notes that mismatched mental models lead to unmet expectations, frustration, misuse and abandonment, and that creators often set the wrong model by promising 'AI magic' or by not explaining how the product works. As practical judgement, the Product Owner owns the promise made in marketing, onboarding and the interface, so these messages deserve the same care as the features.\n\nA practical first-use message covers the benefit, the main things the system cannot do yet and, where it applies, how the user's feedback helps it improve. Introduce an AI feature at the moment it becomes relevant, and tell users again when behaviour changes enough that they would notice. If the interface is conversational or human-like, say clearly that it is an automated system, because people may over-share or over-rely when they take it for a person. NIST AI 600-1 lists inappropriate anthropomorphising among its human-AI configuration concerns and includes an action to track it in interfaces.\n\nMicrosoft Research published 18 human-AI interaction guidelines grouped into four phases: initially, during interaction, when the system is wrong, and over time (count and phases only, not read from the original). As practical judgement, the phases remind the team that expectation setting does not end at launch.",
      "points": [
        "A mental model is the user's picture of what the system does and how their actions affect it.",
        "Marketing, onboarding and the interface all shape expectations, and the PO owns that promise.",
        "A first-use message names the benefit, the main limits and how feedback helps.",
        "Say plainly that the system is automated, especially when the interface sounds human.",
        "Re-introduce users when behaviour changes in a way they would notice.",
        "Four phases (initially, during interaction, when wrong, over time) help structure a review."
      ],
      "traps": [
        "Promising 'AI magic' or 'answers anything' in launch copy.",
        "Burying the limits on a help page few people open.",
        "Explaining the technology instead of the benefit and the limits.",
        "Treating expectation setting as a one-off launch task."
      ],
      "sources": [
        "Google People + AI Guidebook, chapter Mental Models (local PDF may be an older edition)",
        "NIST AI 600-1 (Jul 2024), Human-AI Configuration risk and action MS-2.5-004",
        "Microsoft Human-AI Interaction Guidelines: only the count of 18 and the four phases, not read from the original",
        "General practice, not from a source"
      ],
      "sourceVersion": "PAIR Guidebook (edition not confirmed); AI 600-1, Jul 2024",
      "reviewed": false
    },
    {
      "id": "hax-2",
      "n": 2,
      "domain": "hax",
      "title": "Decide where people oversee the system and who answers for it",
      "body": "Human oversight is a design choice, not a reassurance. NIST AI RMF 1.0 observes that human-AI configurations span from fully autonomous to fully manual: a system may decide alone, defer to an expert, or give a decision maker an extra opinion. MAP 3.5 asks that processes for human oversight are defined, assessed and documented in line with organisational policies, and GOVERN 3.2 asks for policies that define and differentiate roles and responsibilities for human-AI configurations and oversight. As practical judgement, ask what an error costs and whether a person can realistically catch it in the time available. Where harm is fast or large, review belongs before the action takes effect, not after.\n\nRoles must be specific: who reviews, what they check, and who may reject, override or pause. The Product Owner may delegate the work but remains accountable for the product decision (Scrum Guide). Decisions about AI risk involve the people accountable for the risk, and GOVERN 2.3 says executive leadership takes responsibility for them, so escalate serious findings instead of absorbing them.\n\nOversight can fail quietly. NIST AI 600-1 describes automation bias, meaning excessive deference to automated systems, which can grow as systems seem more reliable and can worsen other risks such as confabulation. It also names the opposite problem, algorithmic aversion, where experts reject a useful system. AI 100-1 notes that how far people are empowered to challenge output needs further study, and that data on how often humans overrule the system may be useful. As practical judgement, track override rates and audit samples of accepted output.",
      "points": [
        "Human-AI configurations range from fully autonomous to fully manual; choose by stakes.",
        "Define and document oversight (MAP 3.5) and differentiate roles (GOVERN 3.2).",
        "Put review before the action takes effect where harm is fast or large.",
        "The PO may delegate work but stays accountable; risk decisions involve leadership.",
        "Automation bias is excessive deference; algorithmic aversion is unwarranted rejection.",
        "Watch what reviewers actually do, for example override rates and audited samples."
      ],
      "traps": [
        "Saying 'a person will review it' without naming who, what and with what authority.",
        "Placing review after the harm, for example a month-end sample for costly decisions.",
        "Treating reviewer sign-off as a transfer of the PO's accountability.",
        "Rewarding reviewer speed so that nobody has time to challenge output."
      ],
      "sources": [
        "NIST AI RMF 1.0 (AI 100-1, Jan 2023), MAP 3.5",
        "NIST AI RMF 1.0 (AI 100-1, Jan 2023), MAP 3.4",
        "NIST AI RMF 1.0 (AI 100-1, Jan 2023), GOVERN 3.2 and GOVERN 2.3",
        "NIST AI RMF 1.0 (AI 100-1, Jan 2023), Appendix C, AI Risk Management and Human-AI Interaction",
        "NIST AI 600-1 (Jul 2024), Human-AI Configuration risk",
        "Scrum Guide (Nov 2020), Product Owner accountability",
        "General practice, not from a source"
      ],
      "sourceVersion": "AI RMF 1.0, Jan 2023; AI 600-1, Jul 2024; Scrum Guide, Nov 2020",
      "reviewed": false
    },
    {
      "id": "hax-3",
      "n": 3,
      "domain": "hax",
      "title": "Design for the wrong answer before it happens",
      "body": "AI output is probabilistic, so it will sometimes be wrong. The Google People + AI Guidebook (chapter Errors + Graceful Failure) advises designing for this from the start. First, define with users what counts as an error: a recommender that is useful 60 percent of the time may feel like a failure or a success depending on expectations and stakes. The chapter separates limits of the system, context errors where the system works as intended but the user expected otherwise, and background errors that nobody notices. Background errors will not appear in user reports, so a dedicated quality process is needed to find them.\n\nNext, give every failure a path forward. Say what the system could not do and why, offer alternatives or a regular non-AI route, and invite feedback. Avoid dead ends. When control returns to the user, give them the situation, the next step and how to take it. Reverting to manual can itself be risky. As practical judgement, test the handover. As practical judgement, add escalation to a person when stakes are high or a user keeps rejecting outputs.\n\nAlso assume some misuse, and keep messages helpful without exposing detail that lets someone game the system. NIST AI 600-1 includes an action to use human moderation where appropriate, including settings where models are shown to perform poorly. If a high-stakes use has no fallback or escalation route, pausing that use until they exist is a legitimate product decision, as practical judgement rather than NIST wording.",
      "points": [
        "Define errors with users; what counts as failure depends on expectations and stakes.",
        "Look for system limits, context errors and background errors that nobody reports.",
        "Every failure needs a path forward: explanation, alternatives, a non-AI route.",
        "When control returns to the user, give context, next step and how to do it, and test it.",
        "Plan escalation to a person where stakes are high.",
        "Pause a high-stakes use that has no fallback or escalation route."
      ],
      "traps": [
        "Showing a code or generic apology and leaving the user at a dead end.",
        "Reading a low count of user reports as a low error rate.",
        "Shipping first and adding the fallback in a later update.",
        "Explaining blocks in so much detail that abusers can exploit it."
      ],
      "sources": [
        "Google People + AI Guidebook, chapter Errors + Graceful Failure (local PDF may be an older edition)",
        "NIST AI 600-1 (Jul 2024), action MG-3.2-008 (human moderation)",
        "General practice, not from a source"
      ],
      "sourceVersion": "PAIR Guidebook (edition not confirmed); AI 600-1, Jul 2024",
      "reviewed": false
    },
    {
      "id": "hax-4",
      "n": 4,
      "domain": "hax",
      "title": "Explain, show confidence and listen only where it helps",
      "body": "Explanation is a means to calibrated trust: users should know when to rely on the system and when to use their own judgement (Google People + AI Guidebook, chapter Explainability + Trust). Match the explanation to the stakes. For routine outputs a short explanation or none may do. For higher-stakes outputs give a specific reason and prompt a cross-check. A partial explanation of what matters most, such as how the system works in general, why it gave this output, or similar examples, often works better than a full one. Explaining data use (scope, reach, removal) avoids unpleasant surprises. Contested decisions about people may need a detailed account; involve legal, compliance and domain experts to set the level.\n\nConfidence scores are not automatically helpful. The guidebook suggests not showing confidence when it would not change what the user does, or when it could mislead less-savvy users into accepting output blindly. Numbers presume an understanding of probability, so categories tied to actions, or a short list of alternatives, may work better. Test any display with real users.\n\nImplicit feedback comes from behaviour, such as accepting or rejecting suggestions; explicit feedback is a rating or comment. Tell users what is collected and why, say truthfully what feedback will change and when, and let users edit, reset or opt out. NIST AI 600-1 suggests policies for user feedback mechanisms including recourse, and AI RMF 1.0 MEASURE 3.3 asks for end-user feedback and appeal processes. Someone must own reading the feedback. As practical judgement, have reviewers record the evidence they checked on high-stakes items.",
      "points": [
        "The goal of explanation is calibrated trust, not maximum trust.",
        "Scale explanations to stakes; partial explanations of what matters are often best.",
        "Show confidence only if users can act on it and it will not mislead; test the display.",
        "Explain data use: scope, reach and how to remove it.",
        "Distinguish implicit from explicit feedback, and state truthfully what feedback changes.",
        "Give users edit, reset and opt-out, and name an owner who reads the feedback."
      ],
      "traps": [
        "Showing a precise number that users cannot interpret or act on.",
        "Promising that feedback will change results immediately.",
        "Collecting behaviour data without telling users or involving the privacy team.",
        "Collecting feedback that nobody owns or reads."
      ],
      "sources": [
        "Google People + AI Guidebook, chapters Explainability + Trust and Feedback + Control (local PDF may be an older edition)",
        "NIST AI RMF 1.0 (AI 100-1, Jan 2023), MEASURE 3.3",
        "NIST AI 600-1 (Jul 2024), action GV-3.2-004",
        "General practice, not from a source"
      ],
      "sourceVersion": "PAIR Guidebook (edition not confirmed); AI RMF 1.0, Jan 2023; AI 600-1, Jul 2024",
      "reviewed": false
    }
  );

  window.AIPO.scenarios.scHX1 = {"title":"An internal drafting assistant grows into customer disputes","text":"A logistics firm runs an internal assistant that drafts replies to staff questions about leave and expense rules. A reviewer approves each draft before it is sent. In the pilot, reviewers approved 96 percent of drafts with no edit, usually within a few seconds. Two wrong policy answers led to a payroll correction. The sponsor now wants the assistant extended to draft replies to customer delivery-claim disputes. A team member proposes a green 'Verified' badge on every draft and removing the reviewer step to save time, and another proposes showing reviewers a numeric confidence score. Users have thumbs up and down buttons, but nobody reads the results. There is no named owner for reviewer guidance, and customers would have no obvious way to reach a person."};

  window.AIPO.questions.push(
    S("hx001", "hax", "A marketing lead wants the launch line for an internal drafting assistant to read 'Answers anything, instantly.' As Product Owner, which message is best?", ["Keep the bold line now and list the limits on a help page for anyone who looks","Describe the benefit, state what it cannot do yet, and say how feedback helps it improve","Leave limits out so staff are not put off trying the tool in the first week","Explain the underlying technique in detail so that users trust the results"], 1, "Honest expectation setting starts with the first message users see: benefit, limits and how the system improves."),
    S("hx002", "hax", "Users of a recommendation feature say it is 'broken' because it suggests items outside their saved favourites. The team confirms it works as designed. What is the most useful next step?", ["Close the reports as invalid, because the system is behaving exactly as it was designed to","Retrain it to return only saved favourites, whatever the cost to its overall value to users","Hide the feature from these users without telling them why it has been switched off","Compare user assumptions with real behaviour, then adjust onboarding or the design"], 3, "Mismatched mental models cause frustration and misuse even when the system works as intended."),
    S("hx003", "hax", "A help assistant uses a friendly first-person voice and a human-style avatar. Support logs show some users sharing sensitive personal details as if talking to a colleague. What should the Product Owner do?", ["Disclose at first use that it is automated, state its limits, and review the human-like cues","Keep the persona, because warmth is what drives engagement","Add a longer terms page about data use and leave the interface and persona exactly as they are","Replace all conversation with a plain form for every user"], 0, "Human-like presentation should come with plain disclosure that the user is dealing with an automated system."),
    M("hx004", "hax", 2, "A team drafts the first-use message for a new AI feature. Which TWO items belong in it?", ["The main tasks it helps with and the benefit users can expect","A statement that it is right in nearly all cases","A description of the model architecture","The most important things it cannot do yet","A promise that every piece of feedback will change results the next day"], [0,3], "A good first-use message pairs the benefit with honest limits."),
    S("hx005", "hax", "Which structure could a team borrow to review the whole human-AI experience, from first contact to long-term use?", ["Review only the first screen, since first impressions decide everything","Split the review into two parts: before the build and after release","Group the review into four phases: initially, during interaction, when the system is wrong, and over time","Organise the review by team, with each team checking its own code"], 2, "The four phases cover the whole journey, including failure and long-term change."),
    S("hx006", "hax", "A team says 'a person will review the drafts' but has not said who, what they check, or what they may do. Which step is most useful before launch?", ["Assume reviewers will work it out for themselves and revisit the question after launch","Add the reviewers to a chat group, share the product guide with them and ask for questions","Define and document the review role, the checks and the authority to reject output","Wait for the first complaint from a user or customer and only then write the process"], 2, "Oversight is a defined process with named roles, checks and authority, not a hope."),
    S("hx007", "hax", "A Product Owner argues that because a vendor supplies the assistant and a reviewer approves each output, accountability for outcomes sits with them. Which response is best?", ["The PO may delegate work but stays accountable, and involves those accountable for risk","Agree, because accountability follows whoever last touched the output before release","Agree, but only for outputs the reviewer actually changed","Disagree with the vendor point, and state that the PO alone must own every AI risk decision"], 0, "Delegating work is allowed; delegating accountability away is not, and risk decisions are shared with leadership."),
    S("hx008", "hax", "An assistant drafts refund approvals. A team proposes that a person checks a sample of approved refunds at month end. For high-value refunds, where should human review sit?", ["After approval, since a later sample is cheaper and finds all the same errors","At month end only, so individual cases are not slowed down","Nowhere, if testing showed a high average accuracy","Before approval takes effect, with sampling afterwards for low-value items"], 3, "Place review before the harm where errors are costly or hard to reverse."),
    S("hx009", "hax", "A Product Owner must choose between a system that acts alone, one that defers to an expert, and one that gives a decision maker an extra opinion. Which question helps most?", ["Which option is cheapest to staff in the first year?","What does an error cost, and can a person realistically catch it in the time available?","Which option do competitors seem to have chosen?","Which option scored best on average accuracy in the demo?"], 1, "Choose the configuration by stakes and by whether oversight can be effective."),
    S("hx010", "hax", "During a pilot, a reviewer reports that draft quality seems noticeably worse for one language group. The team wants to keep the release date. What is the best action?", ["Quietly retest within the team and release if the overall average still passes the bar","Ask the reviewer to hold the concern until after launch so that the release date is not put at risk","Add a disclaimer about uneven quality to the interface and proceed with the plan as agreed","Take it to those accountable for the risk and agree whether to pause or limit rollout"], 3, "Escalate serious findings to the accountable people instead of absorbing them in the team."),
    M("hx011", "hax", 2, "Which TWO belong in an oversight design for an AI-assisted decision?", ["A rule that reviewer sign-off moves product accountability to the reviewer","Who may reject or override output, and what they must check","Review only when a user complains","The same person both producing and approving the output","Training so reviewers understand the system's performance and limits"], [1,4], "Roles, authority and reviewer proficiency are core parts of an oversight design."),
    S("hx012", "hax", "An AI feature cannot produce an answer and shows only 'Error 12'. Which redesign is best?", ["Retry silently in the background until it works, then show the answer when ready","Say plainly what it could not do and offer a manual route to finish the task","Keep the code and link to a long technical page","Hide the feature after one failure for that user"], 1, "Graceful failure explains the limit and lets the user finish the task."),
    S("hx013", "hax", "A forecasting feature lacks enough data to give a reliable estimate for one case. What should it do?", ["Show its best guess in the normal format with no mention of the weak data behind it","Show a blank result so that the screen stays clean and nobody is alarmed by the gap","Explain why no estimate is given and suggest a next step, such as checking later","Show the nearest past result as if it applied to the current case, without comment"], 2, "When the system is unsure, honesty plus a next step beats a silent guess."),
    S("hx014", "hax", "Users rarely report wrong results from a search-style assistant, so the reported error count looks small. Which action best finds errors users do not notice?", ["Run a dedicated quality process, such as expert sampling and stress tests","Treat the low count of reports as proof of a low true error rate","Ask users for more thumbs-up ratings to confirm quality","Wait for support tickets to reveal a pattern"], 0, "Unseen errors need proactive checking; user reports will not reveal them."),
    S("hx015", "hax", "An AI feature guides field staff through a task and sometimes stops part-way. Stopping outright could leave staff in an unsafe position. What is the best design response?", ["Hand control back with the situation, next step and how to do it, and test it","Stop and show a generic apology message","Let the system carry on with its best guess, with a note in small text about uncertainty","Disable overrides so staff cannot take control"], 0, "A safe handover gives the person the context, next step and method, and is tested."),
    S("hx016", "hax", "A spam-filter style feature could explain exactly why each message was blocked, but some users will try to game it. Which approach is best?", ["Explain every rule in full, because transparency outranks every other concern","Say nothing at all about why messages are blocked, so no user can learn how it works","Give helpful, actionable messages but withhold detail abusers could exploit","Assume that users are honest and skip any testing for deliberate misuse of the feature"], 2, "Balance helpful error messages against the chance of deliberate misuse."),
    S("hx017", "hax", "A pilot shows wrong answers in a high-stakes use case, and the design has no fallback or escalation route. The launch date is close. What is the best decision?", ["Launch and add the fallback in the first update","Pause release of that use until a fallback and escalation route exist and are tested","Launch with a warning banner and rely on users to catch the errors before they matter","Shorten testing to protect the date and review later"], 1, "When errors are costly and no fallback exists, pause that use."),
    M("hx018", "hax", 2, "An AI feature is unsure about a request. Which TWO give users a useful path forward?", ["Pick one answer silently and present it as certain","Show a confidence figure with no guidance on what to do","Show a few likely alternatives so the user can choose","Explain what is missing and let the user report the gap","Make users restart the whole task each time"], [2,3], "Alternatives and an explained gap with a reporting route give users a way forward."),
    S("hx019", "hax", "Which description best fits automation bias in an AI product?", ["People refuse to use an automated system even when it would clearly help them do the work","A model's accuracy slowly drifts downward because the data it sees in live use changes over time","A model treats groups unequally because its training data was skewed against some of them","People over-defer to an automated system and accept its output without enough checking"], 3, "Automation bias is a human behaviour: too much deference to the machine."),
    S("hx020", "hax", "Experienced analysts refuse to use a drafting assistant, though pilot evidence shows it helps on routine items. What is the best response?", ["Mandate use and track compliance by counting logins each week","Show the evidence and its limits, explain where to trust and where to check, and listen","Drop the feature, because experienced experts know best","Hide that drafts are machine-made so analysts try them"], 1, "Counter aversion with evidence and calibrated guidance, not force or concealment."),
    S("hx021", "hax", "Reviewers approve nearly every AI draft within seconds. Which design change most directly counters over-reliance for high-stakes items?", ["Send a reminder email telling reviewers to be careful","Raise the number of items each reviewer must clear per hour","Remove the review step altogether, because approvals so rarely change the draft at all","Ask reviewers to record the evidence they checked before approving high-stakes items"], 3, "Structure the review so checking is visible and required where stakes are high."),
    M("hx022", "hax", 2, "Which TWO are warning signs of over-reliance on an AI assistant?", ["Reviewers almost never change or reject output, and approve very quickly","Weekly active users keep rising","Users stop checking sources even for high-stakes cases","Users leave thumbs-up ratings on most drafts","Sessions are getting longer"], [0,2], "Look at what people do with the output, not at activity counts."),
    S("hx023", "hax", "A designer wants every output to show a figure such as '87.3 percent confident'. What is the best Product Owner response?", ["Test whether users can act on it, and consider simple categories or no display","Approve it as designed, since a precise number builds more trust than a vague one","Approve it, since showing no confidence figure at all would be dishonest to users","Reject every kind of uncertainty cue because users generally find them confusing"], 0, "Show confidence only if testing shows users can act on it."),
    S("hx024", "hax", "A tool recommends holding a large supplier payment. How should its explanation differ from those for low-stakes suggestions?", ["Give no reason, since users find explanations distracting","Give the same short explanation as for low-stakes suggestions","Give a specific reason and prompt a cross-check, because the stakes are higher","Show only how the system was trained in general"], 2, "Scale the explanation to the stakes of the decision."),
    S("hx025", "hax", "The reasoning behind a model's output is too complex to explain in plain words. What is the best approach?", ["Publish the full technical detail of the model and its training so that nothing is hidden","Offer no explanation, since a partial one would mislead","Offer a partial explanation of what matters most, such as key sources or examples","Write a reassuring sentence that sounds plausible"], 2, "Explain what matters to the decision and no more."),
    S("hx026", "hax", "A user is surprised that an assistant used information from their calendar. Which fix best rebuilds trust?", ["Explain which data is used, whether personal or pooled, and how to remove it","Add a line about this kind of data use to the long terms and conditions document","Stop using the data everywhere at once and say nothing to anyone about the reason","Tell the user that the system is far too complex to explain in everyday language"], 0, "Explain scope, reach and removal of data use, in context."),
    M("hx027", "hax", 2, "Which TWO conditions suggest NOT showing a model confidence score?", ["It would not change what the user does next","Less-savvy users could read a high score as a reason to accept output blindly","The model is probabilistic","Stakeholders like seeing numbers on screen","Competing products show scores"], [0,1], "Show confidence only when it informs action and will not mislead."),
    S("hx028", "hax", "A product will make decisions about individual people that they may want to contest. How should the Product Owner decide the level of explanation?", ["Use the shortest explanation that tests well with users and keeps the screen simple and clean","Decide alone, based on what the model can output easily","Skip explanation, since a confidence display is enough","Work with legal, compliance and domain experts to set it, and expect it may be detailed"], 3, "For contestable decisions about people, involve specialists to set the explanation level."),
    S("hx029", "hax", "After a user rates an output as unhelpful, the screen says 'Thanks for your feedback.' Which improvement is best?", ["Promise instant personalisation of results to encourage many more ratings from users","Say what will change and when, but only if the product can deliver that promise","Remove the message so users are not interrupted","Add a prize draw for every rating given"], 1, "Feedback needs a truthful statement of what it will change and when."),
    S("hx030", "hax", "A 'show less of this' button only filters the user's screen and does not affect the model. Users think it teaches the system. What is the best fix?", ["Describe accurately what the button does so expectations match the effect","Leave the label as it is, since users like believing that the button helps","Claim that the model learns instantly from every press, to keep engagement up","Remove the button and all controls"], 0, "Say truthfully what feedback and controls do."),
    S("hx031", "hax", "A team wants to log how users accept or reject suggestions to tune the model, and users are not told. What is the best step?", ["Collect it quietly, since it is only behavioural data and no names are attached","Collect now and ask the privacy team after the model improves","Ask users to rate every single action instead of logging anything","Tell users what behaviour data is used, offer opt-out, and involve the privacy team"], 3, "Be transparent about implicit feedback and involve privacy specialists."),
    S("hx032", "hax", "Users of a drafting feature in a sensitive process want to turn the AI off and complete the task the usual way. What is the best product decision?", ["Remove the manual route to push adoption of the new feature as quickly as possible","Keep a non-AI route, let users edit AI output, and let them turn the feature off","Keep AI on by default and hide the off switch","Allow turning it off only after a support ticket"], 1, "Give users editing, opt-out and a manual route."),
    S("hx033", "hax", "How should the Product Owner read the 96 percent unedited approval figure?", ["As proof that review is no longer needed","As evidence the model will be near perfect on any new task","As a prompt to check whether reviewers still scrutinise, such as auditing approved drafts","As a reason to give each reviewer more drafts per hour, now that quality looks this high so far"], 2, "Read very high approval cautiously and verify that review is real.", "scHX1"),
    S("hx034", "hax", "What is the best response to the proposed 'Verified' badge on every draft?", ["Accept it, since the pilot approval rate was high","Accept it, but show it only for drafts that score above a chosen confidence cut-off value","Decline it, and make any label say only what has actually been checked, and by whom","Accept it, and remove the reviewer step as proposed"], 2, "Labels must be honest about what has been verified.", "scHX1"),
    S("hx035", "hax", "Before extending the assistant to customer delivery-claim disputes, which step comes first?", ["Reuse the existing leave-policy review process unchanged, to save time","Define and document the review role, checks and authority for the new use with those accountable","Start with customers and set up oversight after the first month","Let the Product Owner decide alone, since the PO owns the product"], 1, "A new use needs oversight defined for its own stakes before launch.", "scHX1"),
    S("hx036", "hax", "Nobody reads the thumbs up and down results. What is the best action?", ["Remove the control, since it adds no value","Wait for a larger volume before looking","Review only the thumbs-up ratings so that progress can be reported upward to the project sponsor","Name an owner, set a review routine, and route issues to the backlog or incident handling"], 3, "Feedback needs an owner and a route to action.", "scHX1"),
    S("hx037", "hax", "For customer disputes, what should the design include for wrong or unfair drafts?", ["A clear route to a person and a way to contest the outcome","A disclaimer that drafts may contain errors","A chatbot that keeps retrying until the customer finally stops asking","A FAQ page covering the most common disputes"], 0, "Give affected people a route to a human and a way to appeal.", "scHX1"),
    S("hx038", "hax", "The team proposes showing reviewers a numeric confidence score on each draft. What is the best decision?", ["Show the number, since staff can interpret percentages","Show it only after the reviewer has approved the draft","Test with reviewers whether it changes their checking, and prefer simple levels","Hide all confidence information from reviewers, since any score will bias their judgement"], 2, "Test confidence displays with real users before committing.", "scHX1"),
    M("hx039", "hax", 2, "Which TWO measures best detect over-reliance during the extension pilot?", ["Count drafts approved per day","Track how often reviewers change or reject drafts, and record why","Report staff satisfaction with speed","Audit a sample of approved drafts, including known test errors","Track total thumbs-up ratings"], [1,3], "Measure what reviewers do and whether they still catch errors.", "scHX1")
  );

  Object.assign(window.AIPO.why, {
    "hx001": [
      "Most users never open a help page, so the bold line sets the expectation and later disappointment follows.",
      "Naming the benefit, the main limits and the role of feedback helps users form an accurate mental model (Google People + AI Guidebook, Mental Models).",
      "Hiding limits invites over-trust and misuse, and users who meet a limit unprepared tend to lose trust.",
      "Technical detail rarely helps a user decide when to rely on the tool; benefit and limits matter more."
    ],
    "hx002": [
      "Correct but unexpected behaviour still costs trust, so the gap between expectation and design needs attention.",
      "Forcing the model to match one assumption may remove the value it was meant to add and ignores onboarding.",
      "Silently removing the feature skips the cause and leaves users confused about what happened.",
      "A gap between a user's mental model and the real behaviour is a design problem, fixed by better explanation or by changing the behaviour."
    ],
    "hx003": [
      "Users who take a system for a person may over-share or over-rely. The guidebook advises disclosing its automated nature, and NIST AI 600-1 includes tracking anthropomorphic interface cues.",
      "Engagement is not the goal here, and the logs show the persona is creating a risk.",
      "A terms page is rarely read and does not correct the impression formed during the conversation.",
      "Dropping the whole interaction style overreacts; clear disclosure and tuned cues address the problem."
    ],
    "hx004": [
      "Leading with the benefit shows users when the feature is worth using.",
      "Overclaiming accuracy sets an expectation the system will eventually break.",
      "Architecture detail rarely helps users decide when to rely on the output.",
      "Naming key limits early helps users form an accurate mental model and reduces disappointment.",
      "Feedback effects are often gradual or invisible, so promising speed sets up disappointment."
    ],
    "hx005": [
      "Expectation setting and error handling continue well beyond the first screen.",
      "Two coarse parts miss the moments that matter most, such as when the system is wrong.",
      "Microsoft Research published 18 human-AI interaction guidelines grouped into four phases (count and phases only; not read from the original). Used as a structuring idea, not a verified checklist.",
      "A team-based split follows the org chart, not the user's experience over time."
    ],
    "hx006": [
      "Undefined roles make oversight nominal, and problems then surface after harm.",
      "A chat group is communication, not a defined process with checks and authority.",
      "NIST MAP 3.5 asks that processes for human oversight are defined, assessed and documented in line with organisational policies.",
      "Writing the process after a complaint puts oversight after the harm."
    ],
    "hx007": [
      "The Scrum Guide lets the PO delegate work while staying accountable. NIST GOVERN 2.3 says executive leadership takes responsibility for decisions about AI risk, so risk decisions involve those people.",
      "Accountability does not move to whoever last touched an output.",
      "Limiting accountability to edited outputs would leave unchanged ones with no owner.",
      "The PO is accountable for the product decision but does not decide AI risk alone."
    ],
    "hx008": [
      "A later sample finds errors only after the money has moved.",
      "Month-end review puts oversight after the harm for every high-value case.",
      "An average hides rare costly errors, so a strong average does not remove the need for review.",
      "As practical judgement, review belongs before the action takes effect where an error is costly and hard to undo."
    ],
    "hx009": [
      "Cost matters but is not the first test of whether oversight is adequate.",
      "NIST notes that human-AI configurations span fully autonomous to fully manual. As practical judgement, stakes and the human ability to catch errors drive the choice.",
      "Copying competitors says nothing about your users' stakes.",
      "Demo accuracy is not evidence of real conditions and ignores the cost of errors."
    ],
    "hx010": [
      "An overall average can hide a weak group, and a private retest keeps decision makers uninformed.",
      "Delaying the concern removes the one early warning the pilot produced.",
      "A disclaimer does not fix unequal quality and does not involve the risk owners.",
      "A possible harm to a group is a risk decision, and NIST GOVERN 2.3 places those decisions with executive leadership, so escalate and agree the next step."
    ],
    "hx011": [
      "Sign-off does not transfer the PO's accountability for the product decision.",
      "Clear roles and authority are what make human oversight real (NIST MAP 3.5 and GOVERN 3.2).",
      "Complaint-driven review puts oversight after the harm.",
      "Self-approval removes the independent view that oversight is meant to give.",
      "NIST MAP 3.4 asks for processes covering operator and practitioner proficiency with system performance."
    ],
    "hx012": [
      "Silent retries can hang or loop, and give the user no sense of what the system can do.",
      "The guidebook (Errors + Graceful Failure) advises avoiding dead ends: explain the limit and give a way to carry on, such as a regular non-AI route.",
      "A code and a technical page leave the user stuck and unhelped.",
      "Hiding the feature removes a chance to shape the right mental model and gives users no route forward."
    ],
    "hx013": [
      "A guess presented without caveat invites users to over-trust it.",
      "A blank screen is a dead end with no explanation or alternative.",
      "For low-confidence cases the guidebook advises explaining why a result could not be given and offering a way forward.",
      "Presenting an old result as current misleads the user."
    ],
    "hx014": [
      "The guidebook describes background errors that neither users nor the system notice, and says a dedicated quality process is needed to find them.",
      "Users cannot report errors they cannot see, so a low count proves little.",
      "Positive ratings say nothing about errors that go unseen.",
      "Tickets only capture errors that someone noticed and cared to report."
    ],
    "hx015": [
      "The guidebook says reverting to manual control can itself be risky, so the handover must give users the situation, the next step and how to take it. As practical judgement, test the handover.",
      "A generic apology gives staff nothing to act on at a risky moment.",
      "Continuing on a guess in a risky situation puts the whole risk on a small note.",
      "Removing overrides takes away the human fallback exactly when it matters."
    ],
    "hx016": [
      "Full detail can give abusers a recipe for evading the filter.",
      "Silence frustrates honest users and gives them no path forward.",
      "The guidebook advises assuming some subversive use and making failure safe and boring while staying helpful.",
      "Skipping misuse testing leaves predictable abuse unplanned."
    ],
    "hx017": [
      "Shipping first puts the fix after the harm.",
      "As practical judgement, a high-stakes use with known wrong answers and no safety net should not ship; pausing is a legitimate product decision.",
      "A banner shifts the burden to users who may be unable to check.",
      "Less testing increases the chance of harm and hides the issue from decision makers."
    ],
    "hx018": [
      "A silent, certain-looking answer hides the uncertainty.",
      "A bare number gives no action, and confidence is only useful when users can act on it.",
      "Alternatives prompt the user's own judgement when confidence is low (Explainability + Trust).",
      "Explaining the gap and inviting a report keeps the user going and feeds improvement (Errors + Graceful Failure).",
      "Restarting each time adds friction and teaches nothing."
    ],
    "hx019": [
      "That describes algorithmic aversion, the opposite problem.",
      "That describes drift, a performance problem rather than a human behaviour.",
      "That describes harmful bias in the data or model, not human deference.",
      "NIST AI 600-1 describes automation bias as excessive deference to automated systems, which can grow as systems appear more reliable."
    ],
    "hx020": [
      "Forced use measured by logins risks box-ticking use and resentment, and does not build trust.",
      "NIST AI 600-1 notes experts may be unnecessarily averse and miss benefits, and the guidebook aims for calibrated trust: rely in some cases, check in others.",
      "Dropping a helpful feature on opinion alone ignores the evidence.",
      "Hiding the machine origin is deceptive and undermines trust when discovered."
    ],
    "hx021": [
      "Reminders fade quickly and change no structure.",
      "Higher throughput targets reduce the time available to check.",
      "Removing review treats a symptom of over-reliance as proof that review is unnecessary.",
      "As practical judgement, an explicit check makes review an active task rather than a click. This is good practice, not a NIST requirement."
    ],
    "hx022": [
      "Near-zero overrides with fast approval may mean review has become a formality; AI RMF 1.0, Appendix C, suggests data on how often humans overrule output may be useful to collect and analyse.",
      "Usage growth says nothing about whether checking still happens.",
      "Skipping checks where stakes are high is the behaviour automation bias produces.",
      "Ratings show satisfaction, not whether people still verify.",
      "Longer sessions have many causes and do not indicate verification."
    ],
    "hx023": [
      "The guidebook says confidence displays are hard to make intuitive, numbers presume a grasp of probability, and the value should be tested; categories with actions or no display can be better.",
      "False precision can confuse users and may not help any decision.",
      "Choosing not to show a number is not dishonest if uncertainty is communicated another way.",
      "Some uncertainty cues help in the right cases, so blanket rejection overreaches."
    ],
    "hx024": [
      "Without a reason the user cannot judge whether to rely on it.",
      "Uniform explanations ignore the extra cost of an error here.",
      "The guidebook advises accounting for situational stakes: in high-stakes cases do not say what without saying why, and prompt checking.",
      "A general description does not help the user judge this specific output."
    ],
    "hx025": [
      "Full detail is rarely understandable to users and may bury what matters.",
      "Silence removes information users need to calibrate trust.",
      "The guidebook recommends partial explanations that cover what affects user trust and decisions, and leave out what is unknown or unhelpful.",
      "A plausible but unfounded sentence is misleading."
    ],
    "hx026": [
      "The guidebook suggests explaining the scope, reach and removal of data use to avoid contextual surprises.",
      "Terms are rarely read and do not fix the surprise in context.",
      "Removing the data silently changes the product with no explanation.",
      "Calling it too complex dismisses a concern that data-use explanations can address."
    ],
    "hx027": [
      "The guidebook says to consider not showing it if confidence is not impactful on decisions.",
      "The guidebook warns a misleadingly high score may cause blind acceptance.",
      "Nearly all AI models are probabilistic, so that alone cannot decide it.",
      "Stakeholder taste is not evidence that users benefit.",
      "Competitor choices say nothing about your users."
    ],
    "hx028": [
      "User preference for short text does not settle what contestability requires.",
      "Convenience of output should not set the level of explanation.",
      "A score is not an explanation of why a person was treated as they were.",
      "The guidebook notes some cases need a very complete explanation to support accountability and contestability. The PO should not set that level alone or give legal advice, so involve specialists."
    ],
    "hx029": [
      "An instant promise the model cannot meet erodes trust.",
      "The guidebook suggests connecting feedback to a change in experience and being clear about timing, while making sure the product can deliver.",
      "Silence gives users no reason to give feedback again.",
      "Material rewards can bias who responds and lower quality, and do not explain impact."
    ],
    "hx030": [
      "The guidebook warns that feedback not tied to learning can mislead users, and advises clear scope and timing messages.",
      "A false belief will eventually cause disappointment.",
      "An untrue claim is dishonest and sets up distrust.",
      "Removing all controls takes away user control for no good reason."
    ],
    "hx031": [
      "Behavioural data can still be personal and surprise users.",
      "Asking afterwards puts review after the data has been collected.",
      "Rating every action adds burden and does not replace transparent logging.",
      "The guidebook says to tell people what implicit data is collected and give a way to see and opt out. Data that may be personal also calls for the privacy team."
    ],
    "hx032": [
      "Removing the manual route takes away the safe fallback.",
      "The guidebook advises balancing control and automation: let users edit output, turn the feature off and complete the task the regular way, which is a useful fallback especially in the early days.",
      "Hiding the switch removes control and is likely to erode trust.",
      "A ticket barrier turns a simple control into an obstacle."
    ],
    "hx033": [
      "High approval does not show that errors were caught, and the two payroll errors show some got through.",
      "Quality on one task does not carry to a different task with different conditions.",
      "A very high unedited approval rate could mean high quality or automation bias. NIST AI 600-1 describes excessive deference to automated systems, so check what review is actually doing.",
      "More volume per reviewer cuts the time available to check."
    ],
    "hx034": [
      "A high approval rate is not evidence of correctness.",
      "A cut-off still labels unchecked drafts as verified.",
      "A label that overstates what is checked sets a false expectation and encourages over-reliance, and the pilot already had wrong answers.",
      "Removing the reviewer makes the label false and takes away oversight."
    ],
    "hx035": [
      "Customer disputes carry different stakes, so the old process may not fit.",
      "NIST MAP 3.5 and GOVERN 3.2 call for defined, documented oversight and clear roles. A new use has new stakes, and risk decisions involve those accountable, not the PO alone.",
      "Oversight set up after the first month puts review after possible harm.",
      "The PO stays accountable for the product decision but does not take risk decisions alone."
    ],
    "hx036": [
      "The control is not the problem; the missing owner is.",
      "Waiting delays learning and leaves serious issues unseen.",
      "Looking only at positives hides the signals that matter.",
      "Feedback only improves a system if someone owns reading it and acting on it. NIST AI 600-1 suggests policies for user feedback mechanisms, including recourse."
    ],
    "hx037": [
      "NIST MEASURE 3.3 asks for feedback and appeal processes for end users, and the guidebook says to avoid dead ends.",
      "A disclaimer shifts the burden to customers and gives them no route.",
      "Retrying without end is a dead end for the customer.",
      "A FAQ helps with common cases but not with a wrong or unfair draft."
    ],
    "hx038": [
      "Interpreting probability cannot be assumed and may not change behaviour.",
      "After approval the score cannot inform the check.",
      "The guidebook advises testing whether confidence affects decisions and notes categories with clear actions can work better than numbers.",
      "Blanket hiding gives up a potentially useful cue without testing it."
    ],
    "hx039": [
      "Throughput shows activity, not checking.",
      "AI RMF 1.0, Appendix C, suggests data on how often and why humans overrule output may be useful to collect and analyse.",
      "Satisfaction with speed may rise as checking falls.",
      "As practical judgement, seeded known errors show whether reviewers still catch problems.",
      "Ratings do not show whether errors are caught."
    ]
  });

  window.AIPO.cards.push(
    {"id":"hxc01","domain":"hax","front":"What is a mental model in product design?","back":"A person's understanding of how something works and how their actions affect it. It sets expectations of what the product can and cannot do.\nTrap: Assuming users will form the right model without help from onboarding and messaging."},
    {"id":"hxc02","domain":"hax","front":"What belongs in a first-use message for an AI feature?","back":"The benefit, the main things it cannot do yet, and how feedback helps it improve.\nTrap: Leading with 'AI magic' and leaving limits to a help page."},
    {"id":"hxc03","domain":"hax","front":"Why say plainly that an interface is automated?","back":"People who take a system for a person may over-share or over-rely on it. NIST AI 600-1 lists anthropomorphising as a human-AI configuration concern.\nTrap: Letting a friendly human-like persona do the explaining."},
    {"id":"hxc04","domain":"hax","front":"What are the four phases used to group Microsoft Research's 18 human-AI interaction guidelines (count and phases only, not read from the original)?","back":"Initially, during interaction, when the system is wrong, and over time.\nTrap: Stopping expectation setting at launch."},
    {"id":"hxc05","domain":"hax","front":"What does NIST MAP 3.5 ask for?","back":"Processes for human oversight that are defined, assessed and documented, in line with organisational policies from GOVERN.\nTrap: Saying 'a person will review it' without defining who, what and with what authority."},
    {"id":"hxc06","domain":"hax","front":"What does NIST GOVERN 3.2 ask for?","back":"Policies that define and differentiate roles and responsibilities for human-AI configurations and oversight of AI systems.\nTrap: Leaving roles implicit so that nobody can reject, override or pause."},
    {"id":"hxc07","domain":"hax","front":"Who is accountable for the product decision when a reviewer approves AI output?","back":"The Product Owner, who may delegate work but stays accountable. Decisions about AI risk involve those accountable for the risk, including leadership.\nTrap: Believing reviewer sign-off transfers accountability, or that the PO alone decides risk."},
    {"id":"hxc08","domain":"hax","front":"Where should human review sit when an error is costly or hard to undo?","back":"Before the action takes effect (practical judgement, not a NIST requirement).\nTrap: A sample taken after the money has moved or the message has been sent."},
    {"id":"hxc09","domain":"hax","front":"What is automation bias?","back":"Excessive deference to an automated system, accepting its output without enough checking. NIST AI 600-1 says it can worsen risks such as confabulation.\nTrap: Mistaking a high approval rate for proof that the output is right."},
    {"id":"hxc10","domain":"hax","front":"What is algorithmic aversion?","back":"Experts being unnecessarily averse to an AI system and missing its benefits (NIST AI 600-1).\nTrap: Forcing use instead of showing evidence and where to trust or check."},
    {"id":"hxc11","domain":"hax","front":"Name two signs of over-reliance.","back":"Reviewers almost never change or reject output and approve very fast; users stop checking even where stakes are high.\nTrap: Reading rising usage or thumbs-up ratings as evidence that checking still happens."},
    {"id":"hxc12","domain":"hax","front":"Which error types should a team sort and watch for when designing for failure?","back":"System limits, context errors (works as intended but the user expected otherwise), and background errors that nobody notices.\nTrap: Counting only the errors users report."},
    {"id":"hxc13","domain":"hax","front":"What makes a failure graceful?","back":"It says what could not be done and why, offers alternatives or a non-AI route, returns control with context, and invites feedback.\nTrap: A generic error code that leaves the user at a dead end."},
    {"id":"hxc14","domain":"hax","front":"How do you find background errors?","back":"With a dedicated quality process such as expert sampling and stress tests, since users cannot report what they cannot see.\nTrap: Treating a low report count as a low error rate."},
    {"id":"hxc15","domain":"hax","front":"When might you decide not to show a confidence score?","back":"When it would not change what the user does, or when it could mislead less-savvy users into blind acceptance.\nTrap: Showing a precise percentage because it looks rigorous."},
    {"id":"hxc16","domain":"hax","front":"What is a partial explanation?","back":"An explanation of what matters most to the user's decision, such as key data sources or similar examples, leaving out what is unknown or unhelpful.\nTrap: Dumping full technical detail, or offering a plausible but unfounded sentence."},
    {"id":"hxc17","domain":"hax","front":"What is the difference between implicit and explicit feedback?","back":"Implicit comes from behaviour, such as accepting or rejecting suggestions. Explicit is deliberate, such as a rating or comment.\nTrap: Collecting implicit data without telling users or involving the privacy team."},
    {"id":"hxc18","domain":"hax","front":"What should a product promise after a user gives feedback?","back":"Only what it can deliver: what will change and roughly when, and the scope of that change.\nTrap: Promising instant personalisation, or saying only 'thanks' and giving no owner to read the feedback."}
  );
})();
