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
      "id": "ops-1", "n": 1, "domain": "ops",
      "title": "Plan the watch before launch: monitoring, user input and drift",
      "body": "Launch is the start of a product's working life, not the end of the work. NIST AI RMF 1.0 covers this in its MANAGE function. Subcategory 4.1 says post-deployment monitoring plans are implemented, including ways to capture and evaluate input from users and other relevant AI actors (the people and organisations involved with the system), appeal and override, decommissioning, incident response, recovery and change management. MEASURE 2.4 asks that the functionality and behaviour of the system and its components are monitored in production. MEASURE 3.1 asks for approaches, personnel and documentation to track existing, unanticipated and emergent risks, using intended and actual performance in deployed contexts.\n\nA dashboard of uptime, speed and usage counts is a start, but it does not show whether people are being served well. A plan says what is watched, who looks and what happens next.\n\nOn drift: this is a general-practice term for performance sliding as real inputs, user behaviour or the world move away from the conditions in which the system was built and tested. MANAGE 4.1 and MEASURE 2.4 do not use the word. NIST does mention data, model or concept drift elsewhere, as one reason AI systems may need more frequent corrective maintenance, but it gives no threshold. Specific trigger levels, for example an alert when a measure falls by a set amount, are general practice, not NIST requirements. Agree them with engineers, domain experts and the people accountable for the risk, preferably before launch, and review them as conditions change.",
      "points": [
        "Post-deployment plans in NIST MANAGE 4.1 include user input, appeal and override, incident response, recovery, change management and decommissioning.",
        "Monitor behaviour in production, not only before release (MEASURE 2.4).",
        "Track unanticipated and emergent risks, using actual performance in deployed contexts (MEASURE 3.1).",
        "Drift is general-practice vocabulary for performance sliding away from build-time conditions; treat it as one cause of change among several.",
        "Trigger levels are general practice: agree them before launch, name who responds, and review them."
      ],
      "traps": [
        "Calling monitoring done because uptime and cost are on a dashboard.",
        "Waiting for complaints to be the first signal of harm.",
        "Watching an average that hides one group or one costly kind of error.",
        "Attributing specific alert thresholds to NIST."
      ],
      "sources": ["NIST AI RMF 1.0 (AI 100-1, Jan 2023), MANAGE 4.1", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), MEASURE 2.4 and 3.1", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), Appendix B, list of AI-specific risks that are new or increased (mention of data, model or concept drift)", "General practice, not from a source"],
      "sourceVersion": "AI RMF 1.0, Jan 2023",
      "reviewed": false
    },
    {
      "id": "ops-2", "n": 2, "domain": "ops",
      "title": "When something goes wrong: respond, recover, communicate, switch off",
      "body": "Some problems will only be found after launch. NIST MANAGE 2.3 asks that procedures are followed to respond to and recover from a previously unknown risk when it is identified. MANAGE 4.3 asks that incidents and errors are communicated to relevant AI actors, including affected communities, and that processes for tracking, responding to and recovering from them are followed and documented. The procedure must exist before the incident.\n\nMANAGE 2.4 says mechanisms are in place and applied, and responsibilities assigned and understood, to supersede, disengage or deactivate systems that show performance or outcomes inconsistent with intended use. In plain language, supersede can be read as replacing the system's role with another method (a reading, not a NIST definition). The subcategory does not say who the people are, so the organisation must decide. As practical judgement: name the roles who may pause or switch off, write the criteria in advance, and make sure the switch can be used without waiting for a supplier. The AI 600-1 Generative AI Profile points the same way, with suggested actions on communication plans for deactivation (reasons, workarounds, alternative processes, contacts), escalation when deactivation criteria are met, and regular review of the criteria.\n\nThe PO stays accountable for the product decision, but NIST GOVERN 2.3 places responsibility for decisions about AI risks with executive leadership. In an incident the PO escalates and recommends; they do not carry a risk decision alone. Involve privacy, legal or compliance specialists when personal data or legal duties may be involved, and review afterwards so procedures improve.",
      "points": [
        "Have response and recovery procedures before a previously unknown risk appears (MANAGE 2.3).",
        "Communicate incidents to relevant AI actors, including affected communities, and document the handling (MANAGE 4.3).",
        "Assign and communicate who may supersede, disengage or deactivate, and on what criteria (MANAGE 2.4).",
        "Pausing a feature or rolling back is a legitimate first response while the cause is investigated.",
        "Escalate to those accountable for risk and involve privacy, legal or compliance specialists where needed."
      ],
      "traps": [
        "Having a switch that only a supplier engineer can use.",
        "Keeping an incident internal to avoid worry.",
        "Raising the alert threshold so that the criterion is no longer crossed.",
        "Closing the ticket without a review of how the response worked."
      ],
      "sources": ["NIST AI RMF 1.0 (AI 100-1, Jan 2023), MANAGE 2.3, 2.4 and 4.3", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), GOVERN 2.3", "NIST AI 600-1 (Jul 2024), suggested actions under MANAGE 2.4 and MANAGE 4.3", "Scrum Guide (Nov 2020), Product Owner accountability", "General practice, not from a source"],
      "sourceVersion": "AI RMF 1.0, Jan 2023; AI 600-1, Jul 2024",
      "reviewed": false
    },
    {
      "id": "ops-3", "n": 3, "domain": "ops",
      "title": "Keep the value and manage what you do not control",
      "body": "Value does not sustain itself. NIST MANAGE 2.2 asks that mechanisms are in place and applied to sustain the value of deployed AI systems. MANAGE 4.2 asks that measurable activities for continual improvement are built into system updates, with regular engagement with interested parties, including relevant AI actors. For a PO this means the backlog keeps room after launch for evaluation refreshes, monitoring work, fixes and updates, not only new features, and each update says how improvement will be measured. Reserving a share of capacity is practical judgement, not a NIST figure.\n\nMany AI products rely on things the team does not control: a model from a supplier, a pre-trained model used as a starting point, an external data feed. MANAGE 3.1 asks that risks and benefits from third-party resources are regularly monitored, with risk controls applied and documented. MANAGE 3.2 asks that pre-trained models used for development are monitored as part of regular monitoring and maintenance. GOVERN 6.2 asks for contingency processes to handle failures or incidents in third-party data or AI systems deemed high-risk. The AI 600-1 profile names value chain and component integration as a generative AI risk.\n\nAs practical judgement: treat an upstream change as a change to your own product. Ask suppliers for notice of changes, re-run your own evaluation on your own test set before accepting a new version, keep a fallback, and record each dependency with an owner. A supplier's statement that a new version is better is not evidence about your users and your risks.",
      "points": [
        "Mechanisms to sustain value after launch are part of the plan (MANAGE 2.2).",
        "Updates carry measurable improvement activities and engagement with interested parties (MANAGE 4.2).",
        "Third-party resources and pre-trained models are monitored regularly, with controls documented (MANAGE 3.1, 3.2).",
        "Contingency processes cover failures in high-risk third-party data or AI systems (GOVERN 6.2).",
        "Treat upstream changes as your own change: re-evaluate on your own test set and keep a fallback."
      ],
      "traps": [
        "Treating launch as proof that value will last.",
        "Accepting a supplier's new version because the release notes say it is better.",
        "Having a single supplier and no fallback or owner for the dependency.",
        "Measuring progress by the number of releases."
      ],
      "sources": ["NIST AI RMF 1.0 (AI 100-1, Jan 2023), MANAGE 2.2, 3.1, 3.2 and 4.2", "NIST AI RMF 1.0 (AI 100-1, Jan 2023), GOVERN 6.2", "NIST AI 600-1 (Jul 2024), value chain and component integration", "General practice, not from a source"],
      "sourceVersion": "AI RMF 1.0, Jan 2023; AI 600-1, Jul 2024",
      "reviewed": false
    },
    {
      "id": "ops-4", "n": 4, "domain": "ops",
      "title": "Retire a product on purpose",
      "body": "Every product ends. NIST GOVERN 1.7 asks for processes and procedures for decommissioning and phasing out AI systems safely, in a way that does not increase risks or reduce the organisation's trustworthiness. MANAGE 4.1 lists decommissioning among the parts of a post-deployment plan. Planning for retirement from the start means the exit is a designed step, not a scramble.\n\nThe AI 600-1 Generative AI Profile suggests factors to consider when decommissioning generative systems: data retention requirements; data security, including leakage after decommissioning; dependencies between upstream, downstream and other systems; use of open-source data or models; and users' emotional entanglement with the system's functions. It also suggests protocols so that systems can be deactivated when necessary. Although written for generative AI, the questions are sensible for any AI product.\n\nA retirement plan, as practical judgement, covers: the evidence and criteria that start the decision (such as low value, rising risk, a better alternative or an unmaintainable dependency); who recommends and who decides; what happens to data and models; which other systems and teams rely on the product; how and when users are told, with a workable alternative; and what is learned for the next product. Switching off on a quiet Friday is not a plan.\n\nThe PO is accountable for the product decision and gathers the evidence, but decisions about risk involve the people accountable for the risk. Check data retention and privacy duties with the relevant specialists rather than relying on memory.",
      "points": [
        "Decommissioning needs procedures that do not increase risk or lower trust (GOVERN 1.7).",
        "Decommissioning is named in the post-deployment plan (MANAGE 4.1).",
        "Consider data retention, data security, dependencies and users' emotional entanglement with the system (AI 600-1 suggested factors).",
        "Set retirement criteria and decision roles in advance, and tell users with a workable alternative.",
        "Record what was learned so the next product benefits."
      ],
      "traps": [
        "Turning a product off because usage is low without checking who depends on it.",
        "Keeping all data and models indefinitely just in case.",
        "Telling users on the day of shutdown with no alternative.",
        "Treating retirement as the PO's decision alone when risk is involved."
      ],
      "sources": ["NIST AI RMF 1.0 (AI 100-1, Jan 2023), GOVERN 1.7 and MANAGE 4.1", "NIST AI 600-1 (Jul 2024), suggested actions under GOVERN 1.7", "Scrum Guide (Nov 2020), Product Owner accountability", "General practice, not from a source"],
      "sourceVersion": "AI RMF 1.0, Jan 2023; AI 600-1, Jul 2024",
      "reviewed": false
    }
  );

  window.AIPO.scenarios.scOP1 = {
    title: "The rider help assistant, four months after launch",
    text: "A regional transport operator runs a rider help assistant that answers questions about fares and refunds. It uses a model service from an external supplier. The assistant has been live for four months. The team's dashboard shows response time and the share of thumbs-up ratings. A feedback button exists, but no alert levels or responders have been agreed.\n\nLast month the operator changed a refund rule. Since then, support agents report more riders asking them to correct the assistant's refund answers, which still quote the old rule. One rider complaint says the assistant wrongly told them they were not entitled to a refund, and they missed the claim window. The operations lead can switch off the refund topic with a setting, but no one has been named as allowed to decide that. The supplier has also announced that it will replace the model version behind the service in six weeks."
  };

  window.AIPO.questions.push(
    S("op001", "ops", "A team lead says the monitoring item on the launch checklist is done because a dashboard shows uptime, response time and cost. What is the best PO response?", [
      "Accept it, because uptime and speed data cover the main post-launch risks of the system",
      "Ask how user input, appeal, override and incidents are handled, and who acts on each",
      "Accept it now and add a user feedback channel only if complaints start to arrive",
      "Replace the dashboard with a weekly manual check of ten randomly chosen outputs"
    ], 1, "NIST MANAGE 4.1 describes post-deployment plans as more than health metrics: user input, appeal and override, incident response, recovery, change management and decommissioning all belong in them."),
    M("op002", "ops", 2, "Which TWO of these does NIST MANAGE 4.1 name as parts of post-deployment monitoring plans?", [
      "Mechanisms for capturing and evaluating input from users",
      "A fixed quarterly budget for new feature development",
      "Procedures for decommissioning the system",
      "A required minimum accuracy figure of ninety percent",
      "Approval of marketing claims by the sales team"
    ], [0, 2], "MANAGE 4.1 lists input from users and other relevant AI actors, appeal and override, decommissioning, incident response, recovery and change management. It sets no accuracy figure and says nothing about budgets or marketing sign-off."),
    S("op003", "ops", "Riders say the help assistant gave a wrong refund answer, but they have no way to contest it. Which part of a monitoring plan is missing?", [
      "Stricter uptime and response time targets for the service",
      "A bigger sample of positive thumbs-up ratings to report",
      "More frequent retraining of the underlying model by the team",
      "An appeal route for users and an override for staff"
    ], 3, "MANAGE 4.1 names appeal and override as parts of a post-deployment plan. Without them, users and staff have no route to contest or correct outcomes."),
    S("op004", "ops", "A team wants to release next week. The plan covers monitoring and incident contacts, but nobody has written how the system would be switched off or retired. 'We will work it out if needed.' What is the best decision?", [
      "Hold the release briefly until switch-off steps are drafted and an owner is named",
      "Release on schedule and write the switch-off steps in the first sprint afterwards",
      "Release, since switching off is rare and engineers can improvise if needed",
      "Release to everyone and ask the supplier to confirm it can stop the service"
    ], 0, "As practical judgement, a short pause to draft steps and name an owner costs little compared with improvising during an incident. Decommissioning and the ability to deactivate are part of a post-deployment plan (MANAGE 4.1, MANAGE 2.4)."),
    S("op005", "ops", "A PO is drafting the post-deployment plan for a clinic network's appointment assistant. Who should help shape it?", [
      "Engineering alone, since monitoring is mainly a technical task and needs no input from the business",
      "The PO alone, to keep the plan consistent with the Product Goal",
      "Engineering, support, domain experts and risk owners, with the PO owning the product decision",
      "The supplier, since it knows the technology best and operates it"
    ], 2, "The plan needs input from people who see failures, understand the domain and carry the risk (practical judgement). The PO stays accountable for the product decision (Scrum Guide), and decisions about risk involve those accountable for it (NIST GOVERN 2.3)."),
    S("op006", "ops", "A colleague says the assistant's quality has 'drifted' since launch. How should the term drift be understood in this course?", [
      "A NIST-defined duty to retrain the model on a fixed quarterly cycle, whatever the product or its risks",
      "A general-practice term for performance sliding as real use moves away from test conditions",
      "Any single poor output that one user reports from production use",
      "A planned change that the supplier announces ahead of a release"
    ], 1, "Drift is general-practice vocabulary for performance changing as inputs or the world move away from the conditions of building and testing. NIST mentions data, model or concept drift only in passing, with no fixed retraining cycle."),
    S("op007", "ops", "Overall accuracy on the live sample is steady, but complaints from users of one language are rising. What is the best next step?", [
      "Split results by language and group, then investigate that segment",
      "Report the steady overall figure to leadership as proof that quality is stable for all users",
      "Wait for the next quarterly review before looking at segments, since one month is too little data",
      "Treat the complaints as noise because the average is unchanged and the sample is small"
    ], 0, "An average can hide a group that is poorly served. Breaking monitoring results down by segment is how change for one group becomes visible."),
    S("op008", "ops", "Engineers suggest waiting a month after launch to see what normal looks like before setting any alert levels. What is the best approach?", [
      "Wait a month with no alert levels in place, then set levels close to whatever the first month shows to be normal",
      "Skip numeric triggers and rely on staff noticing when an answer looks wrong to them",
      "Copy trigger levels from another team's product and leave them unchanged",
      "Agree starting triggers before launch from risk tolerance, then refine and record changes"
    ], 3, "Good practice, not a NIST requirement: set starting triggers before launch from the risk tolerance agreed with the right people, then adjust from live evidence and record each change so the target is not set around the result."),
    M("op009", "ops", 2, "Which TWO belong in a well-defined trigger for action on a monitored measure? (general practice)", [
      "The engineer who originally built the model",
      "The measure and the level or pattern that counts as a breach",
      "A promise to review the dashboard when time allows",
      "A named role who responds, and the action they take",
      "The supplier's description of the feature"
    ], [1, 3], "A trigger needs a clear condition and a defined response with an owner. Trigger design is general practice; NIST does not prescribe thresholds."),
    S("op010", "ops", "Which description matches what NIST MEASURE 3.1 asks for?", [
      "One annual audit of the data that was used to train the model, then no further checks",
      "A fixed accuracy threshold that every AI system is required to meet",
      "Ways to track existing, unanticipated and emergent risks from actual performance",
      "A supplier statement that no new risks will appear after launch"
    ], 2, "MEASURE 3.1 asks for approaches, personnel and documentation to regularly identify and track existing, unanticipated and emergent risks, using intended and actual performance in deployed contexts."),
    S("op011", "ops", "Support reports that an internal drafting assistant gave unsafe guidance to several staff this morning. What is the best first action?", [
      "Follow the incident procedure: pause the affected feature, escalate and log it",
      "Wait for a second day of data to confirm that it is a real pattern before acting",
      "Quietly adjust the instructions and tell nobody until the next release notes are written",
      "Ask the team to find the root cause first and escalate once it is known"
    ], 0, "As practical judgement, contain the harm and escalate before diagnosis is complete. MANAGE 2.3 and 4.3 expect response and recovery procedures to be followed and incidents to be communicated to relevant parties and documented."),
    S("op012", "ops", "An incident affected a group of users and has been fixed. A manager wants to keep it internal to avoid worry. Which action fits MANAGE 4.3?", [
      "Keep it internal because the fix is already live and users have not noticed the fault",
      "Tell only the executive sponsor and then close the ticket",
      "Mention it in a footnote of the next quarterly report",
      "Tell affected users and relevant parties through the agreed process, and document it"
    ], 3, "MANAGE 4.3 asks that incidents and errors are communicated to relevant AI actors, including affected communities, and that handling is documented. Where legal duties may apply, involve legal or compliance for the content and timing."),
    S("op013", "ops", "During an incident the team finds that conversations containing personal details may have been shown to other users. What should the PO do?", [
      "Wait until engineering has a full root-cause report before telling anyone",
      "Escalate at once to privacy and security specialists and the risk owner, and let them lead the assessment",
      "Decide alone whether the exposure is serious enough to report",
      "Email the affected users from the product team before specialists review"
    ], 1, "Possible exposure of personal data is a case for the privacy team, security and the accountable risk owner. The PO supplies facts and recommends but does not decide reporting duties alone."),
    S("op014", "ops", "An incident has been resolved. What should happen next?", [
      "Close it, since the fix is deployed and the regression tests now pass in the usual way",
      "Remove the record so that incident metrics look healthy for the next reporting cycle",
      "Review the response, log errors and near-misses, and update procedures",
      "Wait for a similar incident before changing any procedure, to see if the pattern repeats"
    ], 2, "MANAGE 4.3 asks for incident handling to be tracked and documented. The AI 600-1 profile goes further for generative systems, suggesting after-action assessments of incidents (MG-4.3-001) and records of errors and near-misses (MG-4.3-002). Reviewing the response and updating procedures is good practice for any AI product."),
    S("op015", "ops", "A feature was paused after an incident. Users and sales ask to restore it today. What is the best condition for re-enabling it?", [
      "A supplier message saying that the underlying issue has been addressed on their side of the service",
      "Enough pressure from users and sales to justify restoring the feature today",
      "No new reports have arrived during the whole period of the pause",
      "The cause is addressed, criteria are met in testing, and the risk owner agrees"
    ], 3, "Good practice: recovery should rest on evidence against criteria agreed in advance, with sign-off from those accountable for the risk, not on pressure or on a supplier's statement."),
    S("op016", "ops", "Nobody in the organisation is named as able to switch a live AI assistant off. What should the PO do?", [
      "Get roles assigned and understood for pausing or deactivating, with written criteria, before issues arise",
      "Assume the engineer on call will decide at the time",
      "Let whoever first notices a problem decide for themselves",
      "Leave it to the supplier's support desk"
    ], 0, "MANAGE 2.4 asks that responsibilities are assigned and understood to supersede, disengage or deactivate systems. Deciding the roles in advance avoids confusion in a crisis. As practical judgement, write the criteria down in advance."),
    S("op017", "ops", "MANAGE 2.4 is about superseding, disengaging or deactivating an AI system. On what basis does it say this applies?", [
      "Whenever a quarterly revenue target is missed, whatever the cause of the shortfall",
      "When a competitor releases a newer product that attracts better reviews than ours",
      "When it shows performance or outcomes inconsistent with intended use",
      "When the supplier raises its service fees at the start of the next contract year"
    ], 2, "The subcategory ties these mechanisms to performance or outcomes inconsistent with intended use. Business reasons for ending a product are valid but belong to a retirement decision."),
    S("op018", "ops", "Logs show staff using an internal drafting assistant for tasks outside its intended use, and the errors matter. What is the best action?", [
      "Leave it running and add a warning about misuse to the tool's help text in the next release",
      "Disengage that use, escalate to the risk owner, then decide whether to evaluate it",
      "Ask users to be careful and check outputs themselves",
      "Wait for the next planned evaluation cycle to review the logs"
    ], 1, "Use outside the evaluated, intended context is a reason to restrict or disengage first and escalate. Evaluation for the new use can follow if the risk owner agrees."),
    M("op019", "ops", 2, "A product will be deactivated. Which TWO items belong in the communication plan for users and stakeholders? (AI 600-1 suggested actions, paraphrased)", [
      "The reasons and an alternative process that users can follow",
      "The names of the people who approved the budget",
      "A forecast of next year's revenue from the replacement",
      "Contact details for questions and what happens to user access",
      "The full tuning history of the model"
    ], [0, 3], "The AI 600-1 profile suggests (MG-2.4-001) communication plans covering reasons, workarounds, user access removal, alternative processes and contacts. Budget approvers, revenue forecasts and tuning history do not help affected users."),
    S("op020", "ops", "Monitoring has crossed an agreed deactivation criterion. A senior sponsor asks to keep the product running until a campaign ends. What should the PO do?", [
      "Keep it running quietly and note the breach in the retrospective after the campaign",
      "Raise the threshold so that the criterion is no longer crossed during the campaign period",
      "Overrule the sponsor and switch it off yourself without telling anyone else involved",
      "Escalate to the accountable risk decision makers with the evidence and a recommendation"
    ], 3, "GOVERN 2.3 places responsibility for AI risk decisions with executive leadership, and AI 600-1 suggests escalation when deactivation criteria are met. The PO brings evidence and a recommendation; moving the threshold after the fact defeats the criterion."),
    S("op021", "ops", "Launch is done and the PO's backlog now holds only new features. What is the best change to sustain value?", [
      "Keep features only, and let the team fix problems when users complain or stop using it",
      "Freeze all changes to the product until the next annual review has been completed",
      "Reserve room for evaluation, monitoring and fixes beside new features",
      "Move all capacity to monitoring work and stop delivering any new value to users"
    ], 2, "MANAGE 2.2 asks for mechanisms to sustain value after deployment. Keeping capacity for monitoring and evaluation work beside features is practical judgement, not a NIST percentage."),
    S("op022", "ops", "The team plans an update to a live AI product. Which plan best reflects MANAGE 4.2?", [
      "State the expected measurable improvement, check it against agreed measures and engage interested parties",
      "Ship when engineers feel that the new version is better",
      "Announce improvement based on the supplier's release notes",
      "Measure improvement by the number of changes shipped"
    ], 0, "MANAGE 4.2 asks for measurable continual-improvement activities in updates, with regular engagement of interested parties. Opinions, release notes and output counts are not measures of improvement."),
    M("op023", "ops", 2, "Which TWO fit NIST MANAGE 2.2 and 4.2 on sustaining value and continual improvement?", [
      "Treating a successful launch as proof that value will last",
      "Counting releases per month as the main indicator of progress",
      "Measurable improvement activities built into updates",
      "Skipping evaluation of updates that touch only the data",
      "Regular engagement with interested parties, including relevant AI actors"
    ], [2, 4], "MANAGE 4.2 asks for measurable improvement activities in updates and regular engagement with interested parties. Launch success and release counts do not show sustained value."),
    S("op024", "ops", "Adoption is high, but a measure of whether users complete their task successfully is slowly falling. What does this suggest?", [
      "Nothing to act on, because high adoption already shows that the product is working",
      "Value may be eroding despite use, so investigate causes and plan an update",
      "That the outcome measure should be dropped because it has become lower",
      "That the model must be replaced immediately by a different supplier"
    ], 1, "Usage is an activity measure; task success is closer to an outcome. A falling outcome measure calls for investigation and a planned update, not an automatic supplier change or dropping the measure."),
    S("op025", "ops", "The supplier of an address-lookup data feed used by your product says its format and coverage will change next month. What should the PO do first?", [
      "Accept it, because quality of the feed is the supplier's responsibility and not ours",
      "Wait and see whether complaints appear after the change",
      "Ask engineering to remove the feed permanently",
      "Treat it as your own change: assess impact, re-test and plan a fallback"
    ], 3, "MANAGE 3.1 asks for third-party resources to be monitored with risk controls applied and documented. Treating the change as your own change, with testing and a fallback, puts that into practice."),
    S("op026", "ops", "The product depends on one external model service and has no alternative ready. Which control best matches the idea of contingency in GOVERN 6.2 for a third-party system deemed high-risk?", [
      "A statement from the supplier that outages are unlikely and will be short",
      "A longer launch checklist that mentions the supplier",
      "A tested fallback, such as a manual process, if the third party fails",
      "An assumption that the supplier will not discontinue the service"
    ], 2, "GOVERN 6.2 asks for contingency processes to handle failures or incidents in third-party data or AI systems deemed high-risk. A tested fallback is the practical form."),
    S("op027", "ops", "The team fine-tunes a pre-trained model for its product. Under MANAGE 3.2, how should the pre-trained model be treated after launch?", [
      "Monitored as part of regular system monitoring",
      "As a finished component that needs no further checks once it has been integrated",
      "As the supplier's concern only, since the supplier built and trained it",
      "As something checked once at purchase and then filed away with the contract"
    ], 0, "MANAGE 3.2 says pre-trained models used for development are monitored as part of regular monitoring and maintenance of the AI system."),
    S("op028", "ops", "Which action best matches MANAGE 3.1 for third-party resources?", [
      "Review the supplier's contract once at signing and then rely on the terms agreed there",
      "Monitor their risks and benefits regularly, and apply and document risk controls",
      "Rely on the supplier's marketing as evidence of quality",
      "Monitor only the components the team built itself"
    ], 1, "MANAGE 3.1 asks that risks and benefits from third-party resources are regularly monitored, with controls applied and documented. A single contract review or marketing claims do not meet that."),
    S("op029", "ops", "Which set of items belongs in a retirement plan for an AI product?", [
      "Only the shutdown date and the command that stops the servers and the database",
      "Marketing copy and launch events for the replacement product that will take over",
      "Data retention, dependent systems, user communication and alternatives",
      "A list of the team members who will be reassigned to other work next quarter"
    ], 2, "GOVERN 1.7 asks for decommissioning that does not increase risk or reduce trust. AI 600-1 suggests considering data retention, data security, dependencies and users' emotional entanglement with the system, and, for deactivation, communication that gives reasons and alternatives. Together these are the substance of a retirement plan."),
    S("op030", "ops", "Usage of an internal assistant is low. A manager proposes to turn it off on Friday. What is the best PO response?", [
      "Agree, since low use means that nobody relies on the assistant for anything important",
      "Refuse, because low use alone cannot justify retiring a product",
      "Agree, but keep every log and model forever just in case",
      "Plan the phase-out: check dependents, handle data, tell users, then switch off"
    ], 3, "Retirement is a planned step: confirm who relies on the system, decide what happens to the data, communicate with a workable alternative, then deactivate. Low use is a reason to look at retirement, not a plan."),
    M("op031", "ops", 2, "Which TWO factors does the AI 600-1 profile suggest considering when decommissioning generative systems? (paraphrased)", [
      "The number of features shipped in the last year",
      "Data retention requirements and data security after shutdown",
      "The product's position in the roadmap presentation",
      "Which competitor is likely to gain the users",
      "Dependencies between this system and other upstream or downstream systems"
    ], [1, 4], "The suggested factors include data retention, data security (including leakage after decommissioning), dependencies, use of open-source data or models, and users' emotional entanglement with the system's functions (GV-1.7-002). Feature counts, roadmap position and competitors are not on the list."),
    S("op032", "ops", "Evidence shows rising risk and falling value for a product. Who decides on retirement?", [
      "The PO gathers evidence and recommends; the decision involves those accountable for the risk",
      "The PO alone, as the sole owner of risk",
      "The engineers, since they built the system",
      "The supplier, since it provides the model"
    ], 0, "The PO remains accountable for the product decision (Scrum Guide), while NIST GOVERN 2.3 puts responsibility for AI risk decisions with executive leadership. The PO is not the sole risk owner."),
    S("op033", "ops", "Based on the scenario, what is the best immediate action on refund answers?", [
      "Keep the refund topic running as it is, and update the refund rule text during the next sprint once planning allows, with no change to the assistant before then",
      "Add a disclaimer to every answer saying refund details may be out of date, and keep the topic live for all riders without other changes",
      "Escalate now for a decision to disengage the refund topic, route riders to staff meanwhile, and restore only after the rule is fixed and tested",
      "Switch off the entire assistant at once, without first assessing which topics are affected, which riders rely on it or who agrees"
    ], 2, "Answers are outdated and a rider has already been harmed. Once the decision is made, the topic-level switch allows a targeted response while the issue is escalated, fixed and tested.", "scOP1"),
    S("op034", "ops", "Based on the scenario, who should decide to disengage the refund topic?", [
      "Escalate now to the risk owner, then assign and document who may switch off",
      "The operations lead alone, quietly, because they hold the setting",
      "Whoever notices the next wrong answer, acting on their own judgement at that moment",
      "The supplier's support desk, since the supplier runs the model service"
    ], 0, "Nobody is named to decide, which is the gap MANAGE 2.4 warns about. The immediate step is escalation to those accountable for risk; the lasting fix is to assign and document roles and criteria.", "scOP1"),
    S("op035", "ops", "Based on the scenario, which communication fits the rider who missed the claim window?", [
      "Apologise only if the rider complains again about the missed claim window, and then offer a goodwill gesture",
      "Reply with a generic message to all riders and keep the cause confidential to avoid worry about the service",
      "Say the assistant is advisory only and that riders should check the rules, and leave it there",
      "Contact affected riders through the agreed process, offer a correction, and involve legal or compliance"
    ], 3, "MANAGE 4.3 asks that incidents and errors are communicated to those affected and that handling is documented. Legal or compliance should advise on duties and wording.", "scOP1"),
    S("op036", "ops", "Based on the scenario, what is the best plan for the supplier's model replacement in six weeks?", [
      "Accept it automatically, since the supplier says that new versions are better for every kind of user",
      "Re-run your own evaluation, with refund cases, then accept it",
      "Block the replacement permanently and stay on the old version for as long as possible",
      "Test only speed and cost on the new version, since quality is the supplier's concern"
    ], 1, "As practical judgement, your own evaluation on your own cases, such as refunds, is the evidence that matters, and a fallback should stay ready. MANAGE 3.1 points to monitoring third-party resources with controls applied, and GOVERN 6.2 to contingency if the service is high-risk.", "scOP1"),
    S("op037", "ops", "Based on the scenario, a feedback button exists but there are no alert levels or responders. What should happen next?", [
      "Add more thumbs-up reporting to the dashboard and share it with leadership each week",
      "Wait for the next complaint before deciding anything",
      "Define triggers for rising refund corrections and complaints, with named responders",
      "Let support agents decide on their own when to alert someone"
    ], 2, "MANAGE 4.1 expects user input to feed a monitoring plan. Specific triggers and responders are general practice, agreed with the people accountable for the risk and written down.", "scOP1"),
    M("op038", "ops", 2, "Based on the scenario, which TWO additions to monitoring fit best?", [
      "A regular check of refund answers against the current fare rules",
      "A count of total conversations per day",
      "The number of times managers open the dashboard",
      "A breakdown of agent corrections and complaints by topic",
      "Average response time by hour of the day"
    ], [0, 3], "The risk is wrong refund answers after a rule change. Checking answers against current rules and tracking corrections and complaints by topic show that directly, unlike volume or speed measures.", "scOP1"),
    S("op039", "ops", "Based on the scenario, the team plans an update to fix refund answers. Which update plan is best?", [
      "Ship it once engineers agree that the new version looks better to them in a few manual tries",
      "Set a measurable target, such as correct refund answers on a checked sample, and include rider and staff input",
      "Count the update as successful if thumbs-up ratings rise in the weeks after release",
      "Release it without any testing, since the old rule text was the only problem with the answers and the fix is small"
    ], 1, "MANAGE 4.2 asks for measurable improvement activities and regular engagement with interested parties. A checked sample against a baseline is evidence; ratings alone are not.", "scOP1")
  );

  Object.assign(window.AIPO.why, {
    "op001": ["System health data says little about whether people are served well, so it leaves out most of a monitoring plan.", "A plan covers user input, appeal and override, incident response and recovery, with an owner for each.", "Waiting for complaints makes harm the first signal.", "A small manual sample can help but does not replace a plan with user input, appeal and incident routes."],
    "op002": ["MANAGE 4.1 names capturing and evaluating input from users and other relevant AI actors.", "Budgets for features are not part of a monitoring plan.", "Decommissioning is named in MANAGE 4.1.", "NIST sets no fixed accuracy figure for monitoring plans.", "Marketing sign-off is not a monitoring mechanism."],
    "op003": ["Uptime and speed do not help a user contest a wrong answer.", "More positive ratings do not give users a route to contest outcomes.", "Retraining may help later but does not let users or staff contest a specific outcome.", "Appeal and override are named in MANAGE 4.1 and are the missing route."],
    "op004": ["A short pause to draft steps and name an owner is cheap and covers the gap before launch.", "Writing steps after launch leaves the system live with no way to stop it safely.", "Improvising under pressure is how incidents get worse.", "Relying on the supplier hands away the ability to act and may be slow."],
    "op005": ["Engineers lack the view of users, domain and risk.", "A plan written by the PO alone misses failures that others see.", "The plan benefits from many views while the PO keeps accountability for the product decision.", "A supplier does not own your users' risks or your product decisions."],
    "op006": ["NIST sets no fixed retraining cycle; this misstates the source.", "This is the general-practice meaning: performance sliding as conditions move away from build and test conditions.", "A single poor output is an error, not drift.", "A planned supplier change is a change, which is a separate cause to manage."],
    "op007": ["Splitting results by group exposes the problem the average hides.", "A steady average can hide a poorly served group.", "Waiting leaves a group harmed for months.", "Rising complaints from one group are a signal, not noise."],
    "op008": ["Leaving no alert levels for a month and then setting them around observed behaviour can normalise a problem.", "Relying on people noticing is slow and uneven.", "Another team's levels were set for different risks and users.", "Starting triggers from risk tolerance, refined with recorded evidence, avoids target-after-result."],
    "op009": ["Who built the model does not define a trigger.", "A trigger needs a clear condition that counts as a breach.", "A vague promise to look is not a trigger.", "A trigger needs a named responder and a defined action.", "A feature description says nothing about when to act."],
    "op010": ["A single audit of training data does not track deployed risks over time.", "MEASURE 3.1 sets no universal accuracy threshold.", "This paraphrases MEASURE 3.1: approaches, personnel and documentation to track risks in deployed contexts.", "Suppliers cannot promise that no new risks will appear."],
    "op011": ["Containing the harm and escalating first matches MANAGE 2.3 and 4.3.", "Waiting extends exposure to unsafe guidance.", "Quiet fixes hide the incident from those who should know.", "Diagnosis matters but escalation should not wait for it."],
    "op012": ["A live fix does not remove the duty to inform those affected.", "Informing only a sponsor is not communicating to those affected.", "A footnote is not timely communication to affected users.", "MANAGE 4.3 calls for communication to relevant AI actors, including affected communities, and documentation."],
    "op013": ["Waiting for a full report delays action on possible personal data exposure.", "Privacy, security and the risk owner are the right people to lead.", "The PO should not decide reporting duties alone.", "Contacting users before specialists review can create further problems."],
    "op014": ["A deployed fix does not show whether the response worked.", "Deleting records hides learning and weakens tracking.", "A review, with errors and near-misses recorded and procedures updated, matches the AI 600-1 after-action suggestions and good practice.", "Waiting for a repeat wastes the lesson of this incident."],
    "op015": ["A supplier statement is not evidence for your own use.", "Pressure is not a criterion for restoring service.", "A quiet pause proves little about the cause being addressed.", "Evidence against agreed criteria plus risk owner agreement is a sound condition to restore."],
    "op016": ["Roles and written criteria agreed in advance match MANAGE 2.4.", "Assuming on-call will decide leaves authority unclear.", "Letting anyone decide leads to inconsistent or unsafe actions.", "A supplier desk does not carry your accountability and may be slow."],
    "op017": ["Missing revenue is a business matter, not the basis MANAGE 2.4 names.", "A competitor's release is not evidence of the system's performance.", "MANAGE 2.4 ties these mechanisms to performance or outcomes inconsistent with intended use.", "Supplier fees may prompt a review but are not the basis in MANAGE 2.4."],
    "op018": ["A later warning leaves unevaluated use running with real errors.", "Restricting that use and escalating contains the risk and lets the risk owner decide next steps.", "Relying on users to check shifts the risk onto them.", "Waiting leaves the errors in place until the next cycle."],
    "op019": ["Reasons and alternatives let affected users carry on.", "Budget approvers are irrelevant to affected users.", "Revenue forecasts are not helpful to users losing a service.", "Contacts and information on access removal are part of the suggested communication.", "Tuning history is internal detail and does not help users."],
    "op020": ["Quiet continuation ignores a criterion agreed to protect people.", "Raising the threshold afterwards removes the purpose of the criterion.", "Acting alone without telling anyone bypasses those accountable for risk.", "Escalating with evidence and recommending the agreed action fits GOVERN 2.3 and the AI 600-1 suggestion."],
    "op021": ["Without capacity for upkeep, problems wait for complaints.", "Freezing prevents needed fixes and learning.", "Keeping room for evaluation, monitoring and measured updates sustains value.", "Stopping new value overcorrects and loses benefit to users."],
    "op022": ["Stating a measurable improvement, checking it and engaging interested parties follows MANAGE 4.2.", "Engineer opinion is not a measure.", "Release notes do not show improvement for your users.", "Counting changes measures activity, not improvement."],
    "op023": ["A launch is not proof that value will last.", "Release counts measure activity, not value.", "MANAGE 4.2 asks for measurable improvement activities in updates.", "Data-only changes can still change behaviour and need evaluation.", "MANAGE 4.2 asks for regular engagement with interested parties."],
    "op024": ["Adoption is an activity measure and can hide falling outcomes.", "A falling outcome measure is a signal to investigate and plan updates against it.", "Dropping the measure hides the problem.", "Replacing the supplier on one signal skips finding the cause."],
    "op025": ["Leaving it to the supplier ignores impact on your users.", "Waiting for complaints makes users the test.", "Removing the feed may remove value without assessing alternatives.", "Assessing impact, re-testing and planning a fallback treats the change as your own."],
    "op026": ["A supplier statement is not a control.", "A longer checklist does not provide an alternative.", "A tested fallback gives a way to continue if the third party fails.", "An assumption of continuity is not a contingency."],
    "op027": ["MANAGE 3.2 puts pre-trained models inside regular monitoring and maintenance.", "No component is exempt from monitoring.", "The team using the component shares responsibility for monitoring it.", "A one-time check at purchase misses later change."],
    "op028": ["A single contract review does not provide regular monitoring.", "This paraphrases MANAGE 3.1.", "Marketing is not evidence of risk control.", "MANAGE 3.1 covers third-party resources, not only the team's own."],
    "op029": ["A shutdown date and command cover only the technical step.", "Marketing copy does not manage retirement risks.", "Data, dependencies, users and alternatives are the substance of safe decommissioning.", "Staff reassignment is a project matter, not a risk step for the system."],
    "op030": ["Low use does not prove that nobody depends on it.", "Low use can be a valid reason to consider retirement, so refusing outright is wrong.", "Keeping everything indefinitely creates data security and retention risks.", "A planned phase-out covers dependents, data and users before shutdown."],
    "op031": ["Feature counts are not a decommissioning factor.", "Data retention and security after shutdown are suggested factors.", "Roadmap position is not a risk factor.", "Competitor gains are a business matter, not a decommissioning factor in the profile.", "Dependencies between systems are a suggested factor."],
    "op032": ["The PO gathers evidence and recommends, while accountable people decide on risk.", "The PO is not the sole risk owner.", "Engineers contribute but do not carry the product or risk decision.", "A supplier does not decide your product's retirement."],
    "op033": ["Keeping outdated answers live extends harm.", "A disclaimer does not stop wrong refund answers.", "Escalating for a decision, with riders routed to staff meanwhile and testing before restoring, limits harm while the issue is fixed.", "Switching off everything without assessment may remove value that is working."],
    "op034": ["Escalation now plus assigned roles later closes the gap shown in the scenario.", "A quiet decision by one person bypasses accountable decision makers.", "Leaving it to chance is not a mechanism.", "A supplier desk does not carry your accountability."],
    "op035": ["Waiting for another complaint delays an obvious correction.", "A generic message hides the cause from those affected.", "Describing the tool as advisory does not address the harm.", "Contacting affected riders, offering correction and involving legal or compliance follows MANAGE 4.3."],
    "op036": ["Supplier claims are not evidence for refund handling.", "Your own evaluation including refund cases before accepting fits MANAGE 3.1, and a ready fallback fits GOVERN 6.2.", "Permanently blocking updates is impractical and may add risk.", "Speed and cost say nothing about refund accuracy."],
    "op037": ["More positive ratings do not create triggers or responders.", "Waiting means harm is the signal.", "Defined triggers with named responders agreed with the risk owner make monitoring actionable.", "Agents deciding alone leaves criteria and escalation inconsistent."],
    "op038": ["Checking answers against current rules targets the actual failure.", "Volume does not show answer quality.", "Dashboard views by managers measure attention, not harm.", "Corrections and complaints by topic show where answers fail.", "Response time does not detect wrong refund answers."],
    "op039": ["Engineer opinion is not a measurable improvement.", "A checked sample against a baseline plus rider and staff input follows MANAGE 4.2.", "Ratings can rise while refund answers stay wrong.", "Skipping testing repeats the original mistake."]
  });

  window.AIPO.cards.push(
    { id: "opc01", domain: "ops", front: "Name the parts of a post-deployment monitoring plan listed in NIST MANAGE 4.1.", back: "Capturing and evaluating input from users and other relevant AI actors, appeal and override, decommissioning, incident response, recovery and change management.\nTrap: Calling monitoring done because a dashboard shows uptime and cost." },
    { id: "opc02", domain: "ops", front: "What does MEASURE 3.1 ask for?", back: "Approaches, personnel and documentation to regularly identify and track existing, unanticipated and emergent risks, using intended and actual performance in deployed contexts.\nTrap: Relying on pre-launch testing alone." },
    { id: "opc03", domain: "ops", front: "What is drift, and is it a NIST requirement?", back: "General-practice term for performance sliding as real conditions move away from build and test conditions. NIST mentions drift only as a reason for more maintenance; it sets no threshold.\nTrap: Attributing alert levels or retraining cycles to NIST." },
    { id: "opc04", domain: "ops", front: "What should a trigger for action contain?", back: "The measure, the level or pattern that counts as a breach, a named responder and the action to take. This is general practice.\nTrap: Setting levels after seeing the data, or having an alert nobody owns." },
    { id: "opc05", domain: "ops", front: "Why break monitoring results down by group?", back: "An average can look steady while one group or one costly error type gets worse.\nTrap: Reporting one overall figure as proof of stability." },
    { id: "opc06", domain: "ops", front: "What do MANAGE 2.3 and 4.3 ask about incidents?", back: "Follow procedures to respond to and recover from previously unknown risks, and communicate incidents and errors to relevant AI actors, including affected communities, with tracking and documentation.\nTrap: Keeping incidents internal to avoid worry." },
    { id: "opc07", domain: "ops", front: "What does MANAGE 2.4 require around switching a system off?", back: "Mechanisms in place and applied, and responsibilities assigned and understood, to supersede, disengage or deactivate systems whose performance or outcomes are inconsistent with intended use.\nTrap: A switch that nobody is named to use, or only a supplier can use." },
    { id: "opc08", domain: "ops", front: "In an incident, what does the PO do about the risk decision?", back: "Escalates with evidence and recommends. The PO stays accountable for the product decision, but executive leadership takes responsibility for AI risk decisions (GOVERN 2.3).\nTrap: Deciding alone, or saying the PO alone owns the risk." },
    { id: "opc09", domain: "ops", front: "When should you involve privacy, legal or compliance specialists during an incident?", back: "When personal data or legal duties may be involved, for example possible exposure of personal details.\nTrap: Waiting for a full root-cause report first." },
    { id: "opc10", domain: "ops", front: "What should happen after an incident is resolved?", back: "A review of whether response and recovery worked, errors and near-misses recorded, and procedures updated.\nTrap: Closing the ticket because the fix is live." },
    { id: "opc11", domain: "ops", front: "What do MANAGE 2.2 and 4.2 ask for after launch?", back: "Mechanisms to sustain the value of deployed systems, and measurable improvement activities in updates with regular engagement of interested parties.\nTrap: Measuring progress by releases shipped." },
    { id: "opc12", domain: "ops", front: "How should a PO treat a supplier's announced model change?", back: "As a change to the product: assess impact, re-run your own evaluation on your own cases before accepting, and keep a fallback. This is practical judgement.\nTrap: Accepting it because the supplier says it is better." },
    { id: "opc13", domain: "ops", front: "What do MANAGE 3.1 and 3.2 cover?", back: "Regular monitoring of risks and benefits from third-party resources with controls documented, and monitoring of pre-trained models as part of regular maintenance.\nTrap: Treating a purchased component as someone else's problem." },
    { id: "opc14", domain: "ops", front: "What does GOVERN 6.2 ask for?", back: "Contingency processes to handle failures or incidents in third-party data or AI systems deemed high-risk.\nTrap: Single-supplier dependency with no tested fallback." },
    { id: "opc15", domain: "ops", front: "Which risk in AI 600-1 relates to upstream third-party components?", back: "Value chain and component integration: non-transparent or untraceable upstream components, including data, and weak supplier vetting.\nTrap: Assuming upstream parts are traceable because the supplier is large." },
    { id: "opc16", domain: "ops", front: "What does GOVERN 1.7 ask about decommissioning?", back: "Processes for decommissioning and phasing out AI systems safely, in a way that does not increase risks or reduce trustworthiness.\nTrap: Treating retirement as an afterthought." },
    { id: "opc17", domain: "ops", front: "Name factors AI 600-1 suggests for decommissioning generative systems.", back: "Data retention, data security including leakage afterwards, dependencies on other systems, open-source data or models, and users' emotional entanglement with the system.\nTrap: Switching off without checking who depends on it." },
    { id: "opc18", domain: "ops", front: "What belongs in a deactivation communication plan?", back: "Reasons, workarounds, how access is removed, alternative processes and contact details, as AI 600-1 suggests.\nTrap: Telling users on the day of shutdown with no alternative." }
  );
})();
