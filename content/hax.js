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
      "body": "People start forming a picture of what a product can do before they ever use it. This picture is called a mental model: a person's understanding of how something works and how their actions affect it. The Google People + AI Guidebook (chapter Mental Models) notes that mismatched mental models lead to unmet expectations, frustration, misuse and abandonment, and that creators often set the wrong model by promising 'AI magic' or by not explaining how the product works. As practical judgement, the Product Owner owns the promise made in marketing, onboarding and the interface, so these messages deserve the same care as the features.\n\nA practical first-use message covers the benefit, the main things the system cannot do yet and, where it applies, how the user's feedback helps it improve. Introduce an AI feature at the moment it becomes relevant, and tell users again when behaviour changes enough that they would notice. If the interface is conversational or human-like, say clearly that it is an automated system, because people may over-share or over-rely when they take it for a person. NIST AI 600-1 lists inappropriate anthropomorphising among its human-AI configuration concerns and includes an action to track it in interfaces.\n\nMicrosoft Research published 18 human-AI interaction guidelines in four phases (count only, not read from the original). As practical judgement, thinking in phases reminds the team that expectation setting does not end at launch.",
      "points": [
        "A mental model is the user's picture of what the system does and how their actions affect it.",
        "Marketing, onboarding and the interface all shape expectations, and the PO owns that promise.",
        "A first-use message names the benefit, the main limits and how feedback helps.",
        "Say plainly that the system is automated, especially when the interface sounds human.",
        "Re-introduce users when behaviour changes in a way they would notice.",
        "Reviewing expectation setting in phases, from first use onwards, helps a team structure the work."
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
        "Microsoft Human-AI Interaction Guidelines: only the count of 18 guidelines and four phases, not read from the original",
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
    S("hx001", "hax", "A marketing lead wants the launch line for an internal drafting assistant to read 'Answers anything, instantly.' The pilot showed it handles routine leave and expense questions well but is weak on contract wording, and launch is in two weeks. As Product Owner, what do you do?", ["Keep the bold line for launch week and set out the limits in a help article that staff can read later","Decline the line and ship a message naming the benefit, the main limits and how feedback helps","Soften the line to 'Answers most questions' and see whether staff still try the tool in the first week","Describe the model technique in detail so users can judge for themselves how far to trust the results"], 1, "Honest expectation setting starts with the first message users see: benefit, limits and how the system improves."),
    S("hx002", "hax", "Users of a recommendation feature say it is 'broken' because it suggests items outside their saved favourites. The team confirms it works as designed, and 40 percent of this month's support tickets mention it. What is the most useful next step?", ["Close the tickets as invalid, since the system behaves as designed","Retrain it to stick to saved favourites and watch overall click-through numbers over the next few weeks","Switch the feature off for these users and revisit it in a month","Compare what users expect with what it does, then change onboarding or the design to close the gap"], 3, "Mismatched mental models cause frustration and misuse even when the system works as intended."),
    S("hx003", "hax", "A help assistant uses a friendly first-person voice and a human-style avatar. Support logs show about one in ten sessions include sensitive personal details shared as if with a colleague. What should the Product Owner do?", ["Add a plain 'automated assistant' notice at first use, tone down the human-like cues and watch what users share","Keep the persona, since warmth drives engagement","Add a longer terms section on data use and leave the interface as it is","Replace the conversation with a plain form for all users"], 0, "Human-like presentation should come with plain disclosure that the user is dealing with an automated system."),
    M("hx004", "hax", 2, "A team drafts the first-use message for a new AI feature. Which TWO items belong in it?", ["The main tasks it helps with and the benefit users can expect","A statement that it is right in nearly all cases","A description of the model architecture","The most important things it cannot do yet","A promise that feedback will change results by the next day"], [0,3], "A good first-use message pairs the benefit with honest limits."),
    S("hx005", "hax", "Which structure could a team borrow to review the whole human-AI experience, from first contact to long-term use?", ["Polish the first screen in detail, since first impressions decide adoption","Split the work into two parts: the build and the release","Group the journey into phases that run from first use, through errors, to long-term change","Organise the work by team, with each team owning its own code"], 2, "Phases that run from first use through errors to long-term change cover the whole journey."),
    S("hx006", "hax", "A team says 'a person will review the drafts' but has not said who, what they check, or what they may do. Eight reviewers start in three weeks. Which step is most useful before launch?", ["Let the reviewers agree working practices among themselves in the first weeks and write down what they settle on","Add the reviewers to a chat group, share the product guide and invite questions","Write down who reviews, what they check and who may reject output, and launch with that role in place","Wait for the first complaint from a user and then write the review process around it"], 2, "Oversight is a defined process with named roles, checks and authority, not a hope."),
    S("hx007", "hax", "A Product Owner argues that because a vendor supplies the assistant and a reviewer approves each output, accountability for outcomes sits with them. Which response is best?", ["The PO may delegate the work but stays accountable for the product decision; risk calls involve those accountable for it","Agree, because accountability follows whoever approved the output last before release","Agree for outputs the reviewer changed, and keep accountability with the PO for those left unchanged","Disagree on the vendor point, since the PO is accountable and should set the risk tolerance personally"], 0, "Delegating work is allowed; delegating accountability away is not, and risk decisions are shared with leadership."),
    S("hx008", "hax", "An assistant drafts refund approvals, and refunds above a set value are costly to reverse once paid. A team proposes that a person checks a sample of approved refunds at month end. Where should human review sit for the high-value refunds?", ["After approval, in a weekly sample of paid refunds, because a later sample is cheaper to run","At month end, in one sample of the whole month's refunds, so individual cases are not slowed","Nowhere for now, since the demo showed a high average accuracy","Ahead of approval for high-value refunds, with a sample taken afterwards for low-value ones"], 3, "Place review before the harm where errors are costly or hard to reverse, and sample where errors are cheap."),
    S("hx009", "hax", "A Product Owner must choose between a system that acts alone, one that defers to an expert, and one that gives a decision maker an extra opinion, for a process with occasional costly errors. Which question helps most?", ["Which option is cheapest to staff in the first year?","What would an error cost, and can it be caught?","Which option have competitors chosen in their public products?","Which option scored best on average accuracy in the demo?"], 1, "Choose the configuration by stakes and by whether oversight can be effective."),
    S("hx010", "hax", "During a pilot, a reviewer reports that draft quality seems noticeably worse for one language group, about 15 percent of users. The team wants to keep the release date. What is the best action?", ["Retest within the team on the pooled data and release if the overall average still passes the bar","Ask the person who raised it to hold the concern until after launch, and raise it in the first retrospective","Add a disclaimer about uneven quality to the interface and mention the issue in the release notes","Take it to the people who own the risk and settle whether to halt or limit the rollout"], 3, "Escalate serious findings to the accountable people instead of absorbing them in the team."),
    M("hx011", "hax", 2, "Which TWO belong in an oversight design for an AI-assisted decision?", ["A rule that reviewer sign-off moves product accountability to the reviewer","Who may reject or override output, and what they must check","Review that starts when a user complains","The same person both producing and approving the output","Training so reviewers understand the system's performance and limits"], [1,4], "Roles, authority and reviewer proficiency are core parts of an oversight design."),
    S("hx012", "hax", "An AI feature cannot produce an answer for about one request in twenty and shows only 'Error 12'. Which redesign should ship first?", ["Retry in the background until it works, then show the answer","Explain the limit and offer a manual route","Keep the code and link to a technical page for the support team","Hide the feature for that user after one failure"], 1, "Graceful failure explains the limit and lets the user finish the task."),
    S("hx013", "hax", "A forecasting feature lacks enough data to give a reliable estimate for a new product line. What should it do?", ["Show its best guess in the normal format and compare it with actuals next month","Show a blank result so the screen stays clean","Explain why no estimate is given and suggest a next step","Show the nearest past result as if it applied"], 2, "When the system is unsure, honesty plus a next step beats a silent guess."),
    S("hx014", "hax", "Users rarely report wrong results from a search-style assistant, so reported errors look small: 12 in a quarter. Which action best finds errors users do not notice?", ["Run expert sampling and stress exercises","Treat the low count as a sign of a low true error rate","Ask users for more thumbs-up ratings across releases","Wait for support tickets to reveal a pattern"], 0, "Unseen errors need proactive checking; user reports will not reveal them."),
    S("hx015", "hax", "An AI feature guides field staff through a task and sometimes stops part-way. Stopping outright could leave staff in an unsafe position. What is the best design response?", ["Hand back control with the context and the next step, and try the handover with real staff","Stop and show a generic apology message","Let the system carry on with its best guess, with a note in small text at the bottom of the screen","Disable overrides so staff cannot take control"], 0, "A safe handover gives the person the context, next step and method, and is tested."),
    S("hx016", "hax", "A spam-filter style feature could explain exactly why each message was blocked, but some users will try to game it. Which approach is best?", ["Explain each rule in full, because transparency outranks other concerns for this kind of feature","Give no reason for blocks, so users cannot learn how it works","Give helpful, actionable messages but hold back detail abusers could exploit","Trust users to be honest and act on misuse if complaints rise"], 2, "Balance helpful error messages against the chance of deliberate misuse."),
    S("hx017", "hax", "A pilot shows wrong answers in one high-stakes use case, and the design has no fallback or escalation route. The other uses of the feature are low-stakes and performed well. The launch date is close. What is the best decision?", ["Launch the feature on the date and add the fallback in the first update","Hold that use back, ship the low-stakes uses on the date with risk owners told, and resume when a fallback and a route to a person work","Launch with a warning banner and rely on users to spot the errors in time","Shorten the trial period to protect the date and look at the results after release"], 1, "When errors are costly and no fallback exists, hold that use, and ship the parts that are safe."),
    M("hx018", "hax", 2, "An AI feature is unsure about a request. Which TWO give users a useful path forward?", ["Pick one answer silently and present it as certain","Show a confidence figure with no guidance on what to do","Show a few likely alternatives so the user can choose","Explain what is missing and let the user report the gap","Make users restart the whole task each time"], [2,3], "Alternatives and an explained gap with a reporting route give users a way forward."),
    S("hx019", "hax", "Which description best fits automation bias in an AI product?", ["People reject an automated system even when it would clearly help them do the work","A model's accuracy drifts downward because live data changes","A model treats groups unequally because training data was skewed","People over-defer to an automated system and accept its output too easily"], 3, "Automation bias is a human behaviour: too much deference to the machine."),
    S("hx020", "hax", "Experienced analysts refuse to use a drafting assistant, though pilot evidence shows it helps on routine items (about 30 percent faster, similar error rate). What is the best response?", ["Mandate use from next month and track compliance by logins","Show the pilot results and say where to look closely","Drop the feature, because experienced experts know best","Hide that drafts are machine-made so analysts try them"], 1, "Counter aversion with evidence and calibrated guidance, not force or concealment."),
    S("hx021", "hax", "Reviewers approve nearly every AI draft within seconds. Which design change most directly counters over-reliance for high-stakes items?", ["Send a reminder email telling reviewers to take care when approving","Raise the number of items each reviewer clears per hour","Remove the review step because approvals rarely change the draft, and audit a sample after release","Require reviewers to record the evidence they checked before approving a high-stakes item"], 3, "Structure the review so checking is visible and required where stakes are high."),
    M("hx022", "hax", 2, "Which TWO are warning signs of over-reliance on an AI assistant?", ["Reviewers almost never change or reject output, and approve very quickly","Weekly active users keep rising","Users stop checking sources even for high-stakes cases","Users leave thumbs-up ratings on most drafts","Sessions are getting longer"], [0,2], "Look at what people do with the output, not at activity counts."),
    S("hx023", "hax", "A designer wants every output to show a figure such as '87.3 percent confident'. What is the best Product Owner response?", ["Try it with users first, and ship simple categories or no display if they cannot act on it","Approve it as designed, since a precise number builds more trust in the answers and looks more rigorous","Approve it, since showing no figure would be dishonest","Reject uncertainty cues because users find them confusing"], 0, "Show confidence only if testing shows users can act on it."),
    S("hx024", "hax", "A tool recommends holding a supplier payment worth ten times a typical payment. How should its explanation differ from those for low-stakes suggestions?", ["Give no reason, since users find explanations distracting","Give the same short explanation as for low-stakes suggestions, to keep the screen consistent","Give a specific reason and prompt a second look, because the stakes are higher","Show how the system was trained in general"], 2, "Scale the explanation to the stakes of the decision."),
    S("hx025", "hax", "The reasoning behind a model's output is too complex to explain in plain words. What is the best approach?", ["Publish the full technical detail of the model and its training","Offer no explanation, since a partial one would mislead","Offer a partial explanation of what matters most, such as key sources or similar examples, and try it with users","Write a reassuring sentence that sounds plausible"], 2, "Explain what matters to the decision and no more."),
    S("hx026", "hax", "A user is surprised that an assistant used information from their calendar. Which fix best rebuilds trust?", ["Explain which data is used, whether personal or pooled and how to remove it, and try the wording on users","Add a line about this data use to the long terms page","Stop using the data in the next release, with no notice to users and no mention of the earlier use of calendar data","Tell the user the system is too complex to explain in everyday language, and log the query"], 0, "Explain scope, reach and removal of data use, in context."),
    M("hx027", "hax", 2, "Which TWO conditions suggest NOT showing a model confidence score?", ["It would not change what the user does next","Less-savvy users could read a high score as a reason to accept output blindly","The model is probabilistic","Stakeholders like seeing numbers on screen","Competing products show scores"], [0,1], "Show confidence only when it informs action and will not mislead."),
    S("hx028", "hax", "A product will make decisions about individual people that they may want to contest. How should the Product Owner decide the level of explanation?", ["Use the shortest explanation that users find easy to read","Decide within the team, based on what the model can output easily and what is quickest to build this quarter","Offer no explanation, since a confidence display is enough","Work with legal, compliance and domain experts to set it, and expect it may need to be detailed"], 3, "For contestable decisions about people, involve specialists to set the explanation level."),
    S("hx029", "hax", "After a user rates an output as unhelpful, the screen says 'Thanks for your feedback.' Which improvement is best?", ["Promise instant personalisation of results to encourage more ratings from a wider group of users","Say what the feedback changes and roughly when, once the product can really deliver it","Remove the message so users are not interrupted","Add a prize draw for each rating"], 1, "Feedback needs a truthful statement of what it will change and when."),
    S("hx030", "hax", "A 'show less of this' button filters the user's screen but does not affect the model. Users think it teaches the system. What is the best fix?", ["Relabel the button to say what it does, ship the change this sprint, and try the new wording with users","Leave the label as it is, since users like believing the button helps them and the screen design is settled","Claim the model learns instantly from presses, to keep engagement up","Remove the button and the other controls"], 0, "Say truthfully what feedback and controls do."),
    S("hx031", "hax", "A team wants to log how users accept or reject suggestions to tune the model, and users are not told. What is the best step?", ["Collect it now since it is behavioural data with no names attached","Collect now and ask the privacy team to read it over after the model has improved and launched","Ask users to rate each action instead of logging","Tell users what behaviour data is used, offer opt-out, and bring in the privacy team first"], 3, "Be transparent about implicit feedback and involve privacy specialists."),
    S("hx032", "hax", "Users of a drafting feature in a sensitive process want to turn the AI off and complete the task the usual way. What is the best product decision?", ["Remove the manual route to push adoption of the new feature and cut the cost of running two separate routes","Ship a non-AI route, editing of AI output and an off switch in the next release, then look at usage","Keep AI on by default and hide the off switch","Allow turning it off after a support ticket"], 1, "Give users editing, opt-out and a manual route."),
    S("hx033", "hax", "How should the Product Owner read the 96 percent unedited approval figure?", ["As proof that the review step is no longer needed and the reviewers can be moved to other work this quarter","As evidence the model will be near perfect on new tasks","As a prompt to audit a sample of approved drafts and see whether reviewers still scrutinise them","As a reason to give each reviewer more drafts per hour"], 2, "Read very high approval cautiously and verify that review is real.", "scHX1"),
    S("hx034", "hax", "What is the best response to the proposed 'Verified' badge on every draft?", ["Accept it, since the pilot approval rate was high","Accept it for drafts above a chosen confidence cut-off","Decline it, and make the label say what was actually confirmed and by whom","Accept it and drop the approval step as proposed, with a sample audit afterwards"], 2, "Labels must be honest about what has been verified.", "scHX1"),
    S("hx035", "hax", "What is the best way to extend the assistant to customer delivery-claim disputes?", ["Reuse the leave-policy approval process unchanged to save time","Start a limited pilot on one claim type, with the oversight role, its tasks and a switch-off rule set with the risk owners","Launch to customers broadly and set up oversight after the first month","Let the PO set the switch-off rule alone, since the PO owns the product"], 1, "A new use needs oversight defined for its own stakes, and a limited start with a switch-off rule keeps the risk bounded.", "scHX1"),
    S("hx036", "hax", "Nobody reads the thumbs up and down results. What is the best action?", ["Remove the control, since it adds no value","Wait for a larger volume of ratings, then look at the patterns","Read the thumbs-up ratings to report progress to the sponsor, and leave the thumbs-down for later","Name an owner, read the results weekly, and route issues to the backlog or incident handling"], 3, "Feedback needs an owner and a route to action.", "scHX1"),
    S("hx037", "hax", "For customer disputes, what should the design include for wrong or unfair drafts?", ["A clear route to a person, with a way to contest the outcome and an answer within a set time","A disclaimer on drafts that they may contain errors, shown in small print at the bottom of each message","A chatbot that retries the claim until the customer stops asking","A FAQ page covering the most common disputes"], 0, "Give affected people a route to a human and a way to appeal.", "scHX1"),
    S("hx038", "hax", "The team proposes showing reviewers a numeric confidence score on each draft. What is the best decision?", ["Show the number to reviewers, since staff can interpret percentages","Show it after approval, and count how often reviewers disagree","Pilot simple levels with one reviewer group and test whether their checking differs from a group with no score","Hide confidence information from reviewers, since a score will bias their judgement"], 2, "Test confidence displays with real users before committing.", "scHX1"),
    M("hx039", "hax", 2, "Which TWO measures best detect over-reliance during the extension pilot?", ["Count drafts approved per day","Track how often reviewers change or reject drafts, and record why","Report staff satisfaction with speed","Audit a sample of approved drafts, including known test errors","Track total thumbs-up ratings"], [1,3], "Measure what reviewers do and whether they still catch errors.", "scHX1"),
    S("hx040", "hax", "A pilot of a drafting assistant shows reliable quality in English but clearly weaker quality in two other languages, which cover about 20 percent of users. Quality is judged per language against an agreed bar. The launch date is fixed. What is the best decision?", ["Launch the languages that passed, keep the others on the manual route, and agree the gap with the risk owners","Launch in English and the two weaker languages together and watch complaints from the weaker language groups","Delay the whole launch for all users until the weaker languages reach the same quality as English","Launch everywhere with a disclaimer about uneven quality and document it in the release notes for users"], 0, "A partial release with a stated control, and the residual gap agreed with those accountable for the risk, is a defensible decision."),
    S("hx041", "hax", "A sponsor asks the Product Owner to remove the reviewer step for an assistant that drafts supplier credit notes above a set value, citing 93 percent unedited approvals in a pilot of 400 drafts. Two credit notes above that value carried wrong amounts and reached suppliers. What should the PO do?", ["Accept the removal for all credit notes, since the sponsor owns the cost target and the approval rate is high in the pilot","Decline for high-value notes, show the sponsor and risk owner the errors, and lighten review for low-value notes","Accept removing the step for a trial month and review the wrong amounts at the end of that month","Pass the decision to the sponsor and note in writing that the PO advised against it"], 1, "The PO is accountable for the product decision and brings the evidence to the sponsor and the risk owner; the pilot errors support keeping review before issue for high-value credit notes."),
    S("hx042", "hax", "A summariser of internal meeting notes produced 3 minor wording errors in a pilot of 500 notes, and none changed a decision. Notes carry a machine-drafted label, and the named risk owner has reviewed the results. What should the PO do?", ["Hold the release until the tool shows no errors in a further 5,000 notes","Send the three minor errors to the executive committee and hold the whole release until they respond","Add a second human read-through of each note before it is released to staff","Release with the label once the named risk owner accepts the risk, and set a review trigger"], 3, "For a low-stakes use with a labelled output, shipping once the named risk owner accepts the minor-error risk is proportionate."),
    S("hx043", "hax", "An internal assistant suggests replies to IT service tickets, and agents choose whether to send each suggestion. A pilot of 300 tickets found 92 percent of suggestions usable and none harmful. The help desk lead wants to roll out to all 40 agents next month. What should the PO decide?", ["Hold the rollout until a second pilot of 300 tickets reaches 99 percent accuracy and is reviewed","Roll out to all 40 agents at once and look at the results after a full quarter has passed in use","Roll out with agent approval of each reply, a weekly audit sample and a switch-off rule set with the lead","Run a second pilot of 3,000 tickets and ask an outside expert to weigh in on the results before any rollout"], 2, "Proceeding with a human approval step, an audit sample and an agreed switch-off rule fits the low stakes shown by the pilot.")
  );

  Object.assign(window.AIPO.why, {
    "hx001": [
      "Most users never open a help article, so the bold line sets the expectation and later disappointment follows.",
      "Naming the benefit, the main limits and the role of feedback helps users form an accurate mental model (Google People + AI Guidebook, Mental Models). As practical judgement, declining the line is the PO's call on the promise.",
      "Softer wording still overclaims and still hides the contract-wording weakness, and measuring early adoption does not measure understanding.",
      "Technical detail rarely helps a user decide when to rely on the tool; benefit and limits matter more."
    ],
    "hx002": [
      "Correct but unexpected behaviour still costs trust, and closing the tickets does not close the expectation gap.",
      "Forcing the model to match one assumption may remove the value the feature was meant to add, and it leaves onboarding unchanged.",
      "Switching it off hides the cause and leaves users confused about what happened.",
      "A gap between a user's mental model and the real behaviour is a design problem, fixed by better explanation or by changing the behaviour."
    ],
    "hx003": [
      "Users who take a system for a person may over-share or over-rely. The guidebook advises disclosing its automated nature, and NIST AI 600-1 includes tracking anthropomorphic interface cues.",
      "Engagement is not the goal here, and the logs already show the persona is creating a risk, so waiting a quarter prolongs it.",
      "A terms page is rarely read, even when reviewed by legal, and does not correct the impression formed during the conversation.",
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
      "Microsoft Research published 18 human-AI interaction guidelines in four phases (count only; not read from the original). Used as a structuring idea, not a verified checklist.",
      "A team-based split follows the org chart, not the user's experience over time."
    ],
    "hx006": [
      "Reviewers settling practice among themselves leaves roles, checks and authority undefined at the start, when the first outputs are already live.",
      "A chat group is communication, not a defined process with checks and authority.",
      "NIST MAP 3.5 asks that processes for human oversight are defined, assessed and documented in line with organisational policies, and GOVERN 3.2 asks for clear roles.",
      "Writing the process after a complaint puts oversight after the harm."
    ],
    "hx007": [
      "The Scrum Guide lets the PO delegate work while staying accountable. NIST GOVERN 2.3 says executive leadership takes responsibility for decisions about AI risk, so risk decisions involve those people.",
      "Accountability does not move to whoever last touched an output.",
      "Limiting accountability to unchanged outputs would leave changed ones with no owner.",
      "The PO is accountable for the product decision but does not set the risk tolerance personally; that involves those accountable for the risk."
    ],
    "hx008": [
      "A later sample finds errors only after the money has moved, which matters most for high-value refunds.",
      "Month-end review puts oversight after the harm for every high-value case.",
      "An average hides rare costly errors, so a strong average does not remove the need for review.",
      "As practical judgement, review belongs before the action takes effect where an error is costly and hard to undo, and a sample is enough where errors are cheap."
    ],
    "hx009": [
      "Cost matters but is not the first test of whether oversight is adequate.",
      "NIST notes that human-AI configurations span fully autonomous to fully manual. As practical judgement, stakes and the human ability to catch errors drive the choice.",
      "Copying competitors says nothing about your users' stakes.",
      "Demo accuracy is not evidence of real conditions and ignores the cost of errors."
    ],
    "hx010": [
      "An overall average can hide a weak group, and a private retest on pooled data keeps decision makers uninformed.",
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
      "A code and a technical page, even one written for support, leave the user stuck and unhelped.",
      "Hiding the feature removes a chance to shape the right mental model and gives users no route forward."
    ],
    "hx013": [
      "A guess presented without caveat invites users to over-trust it, and a check next month is too late for the decision made today.",
      "A blank screen is a dead end with no explanation or alternative.",
      "For low-confidence cases the guidebook advises explaining why a result could not be given and offering a way forward.",
      "Presenting an old result as current misleads the user, and assessing the gap later does not undo that."
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
      "Waiting for complaints leaves predictable abuse unplanned."
    ],
    "hx017": [
      "Shipping the risky use first puts the fix after the harm, even with the issues noted.",
      "As practical judgement, a high-stakes use with known wrong answers and no safety net should not ship; holding that use while shipping the safe parts, with the risk owners told, keeps the date and bounds the risk.",
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
      "Removing review treats a symptom of over-reliance as proof that review is unnecessary, and an audit after release finds harm late.",
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
      "A general description of training does not help the user judge this specific output."
    ],
    "hx025": [
      "Full detail is rarely understandable to users and may bury what matters.",
      "Silence removes information users need to calibrate trust.",
      "The guidebook recommends partial explanations that cover what affects user trust and decisions, and leave out what is unknown or unhelpful.",
      "A plausible but unfounded sentence is misleading, whoever reads it."
    ],
    "hx026": [
      "The guidebook suggests explaining the scope, reach and removal of data use to avoid contextual surprises.",
      "Terms are rarely read and do not fix the surprise in context.",
      "Removing the data with no notice changes the product without explanation and leaves the user's question unanswered.",
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
      "Convenience of output should not set the level of explanation, and a team-only choice leaves out the specialists.",
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
      "Behavioural data can still be personal and surprise users, and a later privacy review comes after collection.",
      "Asking afterwards puts review after the data has been collected.",
      "Rating each action adds burden and does not replace transparent logging.",
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
      "NIST MAP 3.5 and GOVERN 3.2 call for defined, documented oversight and clear roles. A limited start with a switch-off rule agreed by those accountable bounds the risk, and the PO does not take risk decisions alone.",
      "Oversight set up after launch puts review after possible harm.",
      "The oversight design is part of the product, but the switch-off rule is a risk decision, which the PO does not take alone."
    ],
    "hx036": [
      "The control is not the problem; the missing owner is.",
      "Waiting delays learning and leaves serious issues unseen.",
      "Looking at positives first hides the signals that matter.",
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
    ],
    "hx040": [
      "Launching the passed languages keeps the date and a manual route for the rest, and the residual gap is agreed with those accountable for the risk (GOVERN 2.3). The partial-release design is general practice, not a NIST requirement.",
      "Releasing to the weaker groups as if they were equal exposes about a fifth of users to known weaker quality.",
      "Delaying the whole launch for the weaker languages punishes the groups that passed and is more than the evidence requires.",
      "A disclaimer does not fix unequal quality and does not give the weaker groups a working route."
    ],
    "hx041": [
      "A high approval rate does not show that errors were caught, and two costly errors have already reached suppliers; owning the cost target does not outweigh that.",
      "The PO is accountable for the product decision, and the pilot errors support keeping review before issue for high-value credit notes. Showing the sponsor and the risk owner the evidence, rather than settling the risk alone, and offering lighter review for low-value ones meets the cost goal where it is safe.",
      "A trial month with a later count puts the harm before the check.",
      "Passing the decision on does not move the PO's accountability for the product decision."
    ],
    "hx042": [
      "Demanding zero errors in a much larger sample is out of proportion for minor errors on a labelled, low-stakes use.",
      "Escalating minor errors and pausing the release is over-reaction; the risk owner has already reviewed the results.",
      "A second review of each note adds cost that the low stakes do not justify.",
      "For a low-stakes, labelled use, the PO can ship once the named risk owner accepts the residual risk; the PO does not accept it alone. A review trigger keeps the decision open to change. This is general practice, not NIST wording."
    ],
    "hx043": [
      "Holding for a higher accuracy figure delays a use where the pilot showed no harmful suggestions and a human still approves each reply.",
      "Rolling out at once and reviewing after a quarter leaves no stated control during the first months.",
      "Agent approval, an audit sample and a switch-off rule agreed with the help desk lead are proportionate controls for a low-stakes internal use, so the PO can proceed.",
      "A second, larger pilot and an outside specialist add delay that the low stakes and the pilot results do not call for."
    ]
  });

  window.AIPO.cards.push(
    {"id":"hxc01","domain":"hax","front":"What is a mental model in product design?","back":"A person's understanding of how something works and how their actions affect it. It sets expectations of what the product can and cannot do.\nTrap: Assuming users will form the right model without help from onboarding and messaging."},
    {"id":"hxc02","domain":"hax","front":"What belongs in a first-use message for an AI feature?","back":"The benefit, the main things it cannot do yet, and how feedback helps it improve.\nTrap: Leading with 'AI magic' and leaving limits to a help page."},
    {"id":"hxc03","domain":"hax","front":"Why say plainly that an interface is automated?","back":"People who take a system for a person may over-share or over-rely on it. NIST AI 600-1 lists anthropomorphising as a human-AI configuration concern.\nTrap: Letting a friendly human-like persona do the explaining."},
    {"id":"hxc04","domain":"hax","front":"How many human-AI interaction guidelines did Microsoft Research publish, and in how many phases (count only, not read from the original)?","back":"18 guidelines in four phases; the count is the only point kept here.\nTrap: Stopping expectation setting at launch."},
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
