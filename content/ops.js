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
    S("op001", "ops", "A team lead says the monitoring item on the launch checklist is done: a dashboard shows uptime, response time and cost, and 2,000 staff start using the assistant on Monday. What is the best PO response?", [
      "Accept it, because engineering has confirmed the dashboard covers the main post-launch risks in daily use",
      "Name who acts on user input, appeal, override and incidents ahead of Monday, then sign off the item",
      "Accept it and add a feedback channel after Monday if complaints arrive",
      "Replace the dashboard with a weekly manual look at ten random outputs"
    ], 1, "NIST MANAGE 4.1 describes post-deployment plans as more than health metrics: user input, appeal and override, incident response, recovery, change management and decommissioning all belong in them. As practical judgement, a named actor for each makes the plan workable."),
    M("op002", "ops", 2, "Which TWO of these does NIST MANAGE 4.1 name as parts of post-deployment monitoring plans?", [
      "Mechanisms for capturing and evaluating input from users",
      "A quarterly budget meeting with finance",
      "Procedures for decommissioning the system",
      "A fixed minimum accuracy figure of ninety percent",
      "Sales team sign-off of marketing claims"
    ], [0, 2], "MANAGE 4.1 lists input from users and other relevant AI actors, appeal and override, decommissioning, incident response, recovery and change management. It sets no accuracy figure and says nothing about budgets or marketing sign-off."),
    S("op003", "ops", "Riders say the help assistant gave a wrong refund answer, but they have no way to contest it, and support agents cannot correct the answer in the chat. Which part of a monitoring plan is missing?", [
      "Tighter uptime and response time targets set with the supplier",
      "A larger sample of thumbs-up ratings reported to leadership",
      "More frequent retraining of the underlying model",
      "A route to appeal, and a staff override"
    ], 3, "MANAGE 4.1 names appeal and override as parts of a post-deployment plan. Without them, users and staff have no route to contest or correct outcomes."),
    S("op004", "ops", "A team plans to release next week to 40,000 users. The plan covers monitoring and incident contacts, but nobody has written how the system would be switched off or retired. 'We will work it out if needed.' A pilot group of 500 users is available. What is the best decision?", [
      "Ship to the 500-user pilot with a named owner and written switch-off criteria, then widen in stages",
      "Hold the release for the quarter until a full retirement plan is drafted",
      "Release to everyone on schedule and write the switch-off steps in the first sprint",
      "Release to everyone on schedule, and get the supplier to confirm in writing that it can stop the service"
    ], 0, "As practical judgement, a small pilot with a named owner and written switch-off criteria keeps the schedule and limits harm if the plan is missing something. Deactivation and decommissioning belong in a post-deployment plan (MANAGE 4.1, MANAGE 2.4)."),
    S("op005", "ops", "A PO is drafting the post-deployment plan for a clinic network's appointment assistant, which handles bookings and some symptom questions. Who should help shape it?", [
      "Engineering, who understand the technical side and can set the alert levels for the product",
      "The PO and the sponsor, who know the Product Goal and the launch date",
      "Engineering, support, clinical experts and risk owners, working with the PO",
      "The supplier, who knows how the service behaves and operates it day to day"
    ], 2, "The plan needs input from people who see failures, understand the domain and carry the risk (practical judgement). The PO stays accountable for the product decision (Scrum Guide), and decisions about risk involve those accountable for it (NIST GOVERN 2.3)."),
    S("op006", "ops", "A colleague says the assistant's quality has 'drifted' since launch. Which description of drift is accurate?", [
      "A NIST duty to retrain on a fixed quarterly cycle, whatever the performance data show",
      "Performance sliding away from the conditions the product was built and evaluated for",
      "A single poor output reported by a user",
      "A planned change announced by the supplier"
    ], 1, "Drift is general-practice vocabulary for performance changing as inputs or the world move away from the conditions of building and testing. NIST mentions data, model or concept drift only in passing, with no fixed retraining cycle."),
    S("op007", "ops", "Overall accuracy on the live sample is steady at 91%, but complaints from users of one language, about 8% of traffic, have doubled in a month. What is the best next step?", [
      "Split results by language, read a sample of that segment, and open a fix item",
      "Report the steady 91% overall figure to leadership as proof that quality is stable for users",
      "Wait for the next quarterly cycle, since one month is a small sample",
      "Treat the complaints as noise, since the overall average is unchanged"
    ], 0, "An average can hide a group that is poorly served. Breaking results down by segment, looking at real answers and opening a fix item if needed is how change for one group becomes visible and acted on."),
    S("op008", "ops", "Engineers suggest waiting a month after launch to see what normal looks like before setting any alert levels. The assistant handles refund answers from day one. What is the best approach?", [
      "Wait a month, then set alert levels close to whatever the first month shows",
      "Use staff judgement for the first month, and set numeric triggers once the data is in",
      "Copy trigger levels from another team's product and keep them",
      "Set starting triggers ahead of launch from the risk tolerance already settled, then refine them and record each change"
    ], 3, "Good practice, not a NIST requirement: set starting triggers before launch from the risk tolerance agreed with the right people, then adjust from live evidence and record each change so the target is not set around the result."),
    M("op009", "ops", 2, "Which TWO belong in a well-defined trigger for action on a monitored measure? (general practice)", [
      "The name of the engineer who built the model, for reference",
      "The measure and the level or pattern that counts as a breach",
      "A commitment to review the dashboard when time allows",
      "A named role who responds, and the action they take",
      "The supplier's description of the feature"
    ], [1, 3], "A trigger needs a clear condition and a defined response with an owner. Trigger design is general practice; NIST does not prescribe thresholds."),
    S("op010", "ops", "A PO is writing the monitoring plan and wants to cite NIST MEASURE 3.1 correctly. Which description matches what it asks for?", [
      "A yearly audit of the training data, then nothing more planned after launch",
      "A fixed accuracy threshold that systems must meet to be released",
      "Approaches, people and records to track existing, unanticipated and emergent risks from actual performance",
      "A supplier statement at contract signing that no new risks will appear after launch"
    ], 2, "MEASURE 3.1 asks for approaches, personnel and documentation to regularly identify and track existing, unanticipated and emergent risks, using intended and actual performance in deployed contexts."),
    S("op011", "ops", "Support reports that an internal drafting assistant gave unsafe guidance to eleven staff this morning, and the cause is unknown. What is the best first action?", [
      "Switch the affected feature off, tell the risk owner and log it, then investigate",
      "Gather a second day of data to confirm it is a real pattern first",
      "Adjust the instructions yourself and mention the change in the next release notes",
      "Ask the team to find the root cause first, and report the incident once it is confirmed"
    ], 0, "As practical judgement, contain the harm and escalate before diagnosis is complete. MANAGE 2.3 and 4.3 expect response and recovery procedures to be followed and incidents to be communicated to relevant parties and documented."),
    S("op012", "ops", "An incident affected about 300 users and has been fixed. A manager wants to keep it internal to avoid worry. Which action fits MANAGE 4.3?", [
      "Keep it internal, since the fix is live and users have not noticed the fault",
      "Tell the executive sponsor and close the ticket",
      "Mention it in the next quarterly report",
      "Tell the affected users through the usual process and write it up, with legal or compliance reading the wording first"
    ], 3, "MANAGE 4.3 asks that incidents and errors are communicated to relevant AI actors, including affected communities, and that handling is documented. Where legal duties may apply, legal or compliance should review the content and timing."),
    S("op013", "ops", "During an incident the team finds that conversations containing personal details may have been shown to other users, and engineering expects a root-cause report in a week. What should the PO do?", [
      "Hold off telling anyone outside engineering until the root-cause report is in",
      "Hand it to privacy and security staff and the risk owner",
      "Judge for yourself, with engineering, whether the exposure is serious enough to report",
      "Email the affected users from the product team, with wording drafted by engineering"
    ], 1, "Possible exposure of personal data is a case for the privacy team, security and the accountable risk owner. The PO supplies facts and recommends but does not decide reporting duties alone."),
    S("op014", "ops", "An incident in the refund flow was fixed this morning and the regression tests pass. What should happen next?", [
      "Close it, since the fix is deployed and the regression suite is green",
      "Archive the record so incident metrics stay healthy",
      "Look back at the response and update the procedure",
      "Change a procedure if a similar incident happens again"
    ], 2, "MANAGE 4.3 asks for incident handling to be tracked and documented. The AI 600-1 profile goes further for generative systems, suggesting after-action assessments of incidents (MG-4.3-001) and records of errors and near-misses (MG-4.3-002). Reviewing the response and updating procedures is good practice for any AI product."),
    S("op015", "ops", "A feature was paused after an incident. Users and sales ask to restore it today. The cause has been found and a fix is built. What is the best condition for re-enabling it?", [
      "A supplier message saying the issue is addressed on their side and the service looks stable again",
      "Strong demand from users and sales, with complaints handled after restoring it today",
      "A quiet spell with no new reports in the period",
      "Restore it for a small group once the fix meets the set criteria and the risk owner signs off"
    ], 3, "Good practice: recovery should rest on evidence against criteria agreed in advance, with sign-off from those accountable for the risk, not on pressure or on a supplier's statement. A small first group limits harm if the fix falls short."),
    S("op016", "ops", "Nobody in the organisation is named as able to switch off a live AI assistant used by 3,000 staff. What should the PO do?", [
      "Agree with the risk owner who may switch it off, write the criteria, and publish both now",
      "Expect the engineer on call to decide at the time, with nothing written down beyond the on-call rota sheet",
      "Let whoever first notices a problem decide for themselves",
      "Leave it to the supplier's support desk and review its response times at renewal"
    ], 0, "MANAGE 2.4 asks that responsibilities are assigned and understood to supersede, disengage or deactivate systems. As practical judgement, the PO agrees the roles and written criteria now, before the next incident, with those accountable for the risk (GOVERN 2.3), rather than naming them alone, which avoids confusion in a crisis."),
    S("op017", "ops", "MANAGE 2.4 is about superseding, disengaging or deactivating an AI system. On what basis does it say this applies?", [
      "When a quarterly revenue target is missed",
      "When a competitor releases a newer product that is rated better",
      "When outcomes diverge from intended use",
      "When the supplier raises its service fees"
    ], 2, "The subcategory ties these mechanisms to performance or outcomes inconsistent with intended use. Business reasons for ending a product are valid but belong to a retirement decision."),
    S("op018", "ops", "Logs show 40 staff using an internal drafting assistant for customer policy letters, which is outside its intended use, and the errors matter. What is the best action?", [
      "Leave it running and add a warning about misuse to the help text in the next release cycle",
      "Block that use today, tell the risk owner, and evaluate it properly first",
      "Ask users to judge the outputs themselves and look at the logs again in a month",
      "Wait for the planned evaluation cycle, then decide on a response"
    ], 1, "Use outside the evaluated, intended context is a reason to restrict first and tell the risk owner. Evaluation for the new use can follow if the risk owner agrees."),
    M("op019", "ops", 2, "A product will be deactivated. Which TWO items belong in the communication plan for users and stakeholders? (AI 600-1 suggested actions, paraphrased)", [
      "The reasons and an alternative process that users can follow",
      "The names of the people who approved the budget, for audit",
      "A forecast of next year's revenue from the replacement",
      "Contact details for questions and what happens to user access",
      "The full tuning history of the model"
    ], [0, 3], "The AI 600-1 profile suggests (MG-2.4-001) communication plans covering reasons, workarounds, user access removal, alternative processes and contacts. Budget approvers, revenue forecasts and tuning history do not help affected users."),
    S("op020", "ops", "Monitoring has crossed an agreed deactivation criterion for the third day. A senior sponsor asks to keep the product running until a campaign ends in two weeks. What should the PO do?", [
      "Keep it running and note the breach for the retrospective after the campaign",
      "Raise the threshold so the criterion is not crossed during the campaign period",
      "Overrule the sponsor and switch it off yourself the same day",
      "Take it to the risk decision makers, recommending switch-off"
    ], 3, "GOVERN 2.3 places responsibility for AI risk decisions with executive leadership, and AI 600-1 suggests escalation when deactivation criteria are met. The PO brings evidence and a recommendation; moving the threshold after the fact defeats the criterion."),
    S("op021", "ops", "Launch is done and the PO's backlog now holds new features only. Support reports a rising number of fix requests. What is the best change to sustain value?", [
      "Keep building features and take up fixes at quarterly planning",
      "Freeze changes to the product until the annual look-back is complete",
      "Set aside a share of each sprint for evaluation, upkeep and fixes, beside new features",
      "Move most capacity to upkeep work and stop delivering new value for a while until the backlog of fixes is cleared"
    ], 2, "MANAGE 2.2 asks for mechanisms to sustain value after deployment. Keeping capacity for monitoring and evaluation work beside features is practical judgement, not a NIST percentage."),
    S("op022", "ops", "The team plans an update to a live AI product to fix an error type that affects about 5% of cases. Which plan best reflects MANAGE 4.2?", [
      "Ship with a stated target, such as errors under 2%, measure it after release and report to interested parties",
      "Ship when engineers feel the new version is better",
      "Announce improvement based on the supplier's release notes",
      "Measure improvement by the number of changes shipped"
    ], 0, "MANAGE 4.2 asks for measurable continual-improvement activities in updates, with regular engagement of interested parties. Opinions, release notes and output counts are not measures of improvement."),
    M("op023", "ops", 2, "Which TWO fit NIST MANAGE 2.2 and 4.2 on sustaining value and continual improvement?", [
      "Treating a successful launch as proof that value will last",
      "Counting releases per month as the main indicator of progress",
      "Measurable improvement activities built into updates",
      "Little evaluation of updates that touch the data",
      "Regular engagement with interested parties, including relevant AI actors"
    ], [2, 4], "MANAGE 4.2 asks for measurable improvement activities in updates and regular engagement with interested parties. Launch success and release counts do not show sustained value."),
    S("op024", "ops", "Adoption is high, but a task success measure has fallen from 82% to 74% over three months. What is the best next step?", [
      "Take no action yet, because high adoption shows the product is working",
      "Put a fix for the success drop in the next sprint, and look at causes by topic and user group",
      "Retire the success measure, since adoption is the better indicator of whether the product is working",
      "Replace the model supplier now, and compare the new one with the old success rate"
    ], 1, "Usage is an activity measure; task success is closer to an outcome. A falling outcome measure calls for a planned fix and a look at causes, not an automatic supplier change or dropping the measure."),
    S("op025", "ops", "The supplier of an address-lookup data feed used by your product says its format and coverage will change next month. About 12% of your orders use the feed. What should the PO do first?", [
      "Accept the change, because feed quality is the supplier's responsibility",
      "Wait and see, then read the support log for complaints after the change",
      "Ask engineering to drop the feed for good and move the product to the manual route for address lookups",
      "Treat it as your own change: size the impact on those orders, try the new format and keep a fallback"
    ], 3, "MANAGE 3.1 asks for third-party resources to be monitored with risk controls applied and documented. Treating the change as your own change, with testing and a fallback, puts that into practice."),
    S("op026", "ops", "The product depends on one external model service and has no alternative ready. Which control best matches the idea of contingency in GOVERN 6.2 for a third-party system deemed high-risk?", [
      "A supplier statement that outages are unlikely and short, filed with the contract",
      "A longer launch list that mentions the supplier",
      "A rehearsed fallback, such as a manual process the team can switch to if the third party fails",
      "A planning note that the supplier is expected to keep the service running, as its contract suggests"
    ], 2, "GOVERN 6.2 asks for contingency processes to handle failures or incidents in third-party data or AI systems deemed high-risk. A tested fallback is the practical form."),
    S("op027", "ops", "The team fine-tunes a pre-trained model on 5,000 internal tickets for its product. Under MANAGE 3.2, how should the pre-trained model be treated after launch?", [
      "As something to watch and maintain with the system",
      "As a finished component, signed off at integration and then left as it is",
      "As the supplier's concern, since the supplier built it",
      "As something approved once at purchase and then filed with the contract"
    ], 0, "MANAGE 3.2 says pre-trained models used for development are monitored as part of regular monitoring and maintenance of the AI system."),
    S("op028", "ops", "Which action best matches MANAGE 3.1 for third-party resources?", [
      "Read the supplier contract at signing and rely on the terms set there",
      "Keep watching their risks and benefits regularly, and apply and record risk controls",
      "Rely on the supplier's published quality claims, confirmed once by a pilot",
      "Keep watching the components the team built itself, and look at third-party parts at renewal"
    ], 1, "MANAGE 3.1 asks that risks and benefits from third-party resources are regularly monitored, with controls applied and documented. A single contract review or marketing claims do not meet that."),
    S("op029", "ops", "A team is writing a retirement plan for an AI product that four other teams rely on. Which set of items belongs in it?", [
      "The shutdown date, and the command that stops the servers",
      "Marketing copy and launch events for the replacement product",
      "Data retention, dependent systems, user communication and alternatives, worked through with experts",
      "A list of the team members to be reassigned next quarter"
    ], 2, "GOVERN 1.7 asks for decommissioning that does not increase risk or reduce trust. AI 600-1 suggests considering data retention, data security, dependencies and users' emotional entanglement with the system, and, for deactivation, communication that gives reasons and alternatives. Together these are the substance of a retirement plan."),
    S("op030", "ops", "Usage of an internal assistant is low, about 30 staff a week. A manager proposes to turn it off on Friday. Two claims teams use it for a monthly report. What is the best PO response?", [
      "Accept Friday, since low use means no team depends on it",
      "Decline retirement, because low use cannot justify retiring a product that the operator paid to build and run",
      "Accept Friday, and keep the logs and model for years in case of audit",
      "Decline Friday and plan the phase-out: find the dependents, handle the data, tell users, then switch off"
    ], 3, "Retirement is a planned step: confirm who relies on the system, decide what happens to the data, communicate with a workable alternative, then deactivate. Low use is a reason to look at retirement, not a plan."),
    M("op031", "ops", 2, "Which TWO factors does the AI 600-1 profile suggest considering when decommissioning generative systems? (paraphrased)", [
      "The number of features shipped in the last year",
      "Data retention requirements and data security after shutdown",
      "The product's position in the roadmap presentation",
      "Which competitor is likely to gain the users",
      "Dependencies between this system and other upstream or downstream systems"
    ], [1, 4], "The suggested factors include data retention, data security (including leakage after decommissioning), dependencies, use of open-source data or models, and users' emotional entanglement with the system's functions (GV-1.7-002). Feature counts, roadmap position and competitors are not on the list."),
    S("op032", "ops", "The PO has gathered evidence showing rising risk and falling value for a product. Who decides on retirement?", [
      "The PO recommends with the facts; the decision rests with those who own the risk",
      "The PO, as owner of the product and its risk, after talking to engineering",
      "The engineers, since they built the system and can judge its condition best in daily operation",
      "The supplier, since it provides the model and knows its own roadmap"
    ], 0, "The PO remains accountable for the product decision (Scrum Guide), while NIST GOVERN 2.3 puts responsibility for AI risk decisions with executive leadership. The PO is not the sole risk owner."),
    S("op033", "ops", "Based on the scenario, what is the best immediate action on refund answers?", [
      "Keep the refund topic running while the rule text is updated next sprint, and look at the complaints in the meantime",
      "Add a disclaimer to answers that refund details may be out of date, and read the complaints that arrive each week",
      "Use the topic setting to switch off refunds today, route riders to staff, tell the risk owner, and restore once fixed",
      "Switch off the entire assistant today, then work out which topics are affected and restore service afterwards"
    ], 2, "Answers are outdated and a rider has already been harmed. As practical judgement, the topic-level switch is a containing step that allows a targeted response today, with riders still served by staff and the risk owner asked to confirm. The formal decision on whether it stays off and when it returns is a separate question about who decides.", "scOP1"),
    S("op034", "ops", "Based on the scenario, who should decide whether the refund topic stays off and when it is restored?", [
      "The risk owner, with the PO bringing the facts, and decision roles then assigned in writing",
      "The operations lead alone, because they hold the setting and know the refund answers best",
      "Whoever first notices the next wrong answer, using their own judgement at that moment",
      "The supplier's support desk, since the supplier runs the model service used by the operator"
    ], 0, "Nobody is named to decide, which is the gap MANAGE 2.4 warns about. Switching the topic off today is the emergency containment step (the earlier refund-topic question); whether it stays off and when it returns is decided by the people accountable for the risk (GOVERN 2.3), with the PO bringing the evidence, and roles and criteria are then assigned and documented.", "scOP1"),
    S("op035", "ops", "Based on the scenario, which communication fits the rider who missed the claim window?", [
      "Apologise if the rider complains again about the missed window",
      "Send a generic message to riders and keep the cause confidential",
      "State that the assistant is advisory and riders should read the rules, and close the complaint as resolved",
      "Contact the affected riders, offer a correction and write it up, with legal or compliance reading the wording"
    ], 3, "MANAGE 4.3 asks that incidents and errors are communicated to those affected and that handling is documented. Legal or compliance should advise on duties and wording.", "scOP1"),
    S("op036", "ops", "Based on the scenario, what is the best plan for the supplier's model replacement in six weeks?", [
      "Accept it on the date, since the supplier says new versions are better",
      "Try the new version on your own refund cases, accept it if it passes, and keep a fallback ready",
      "Block the replacement for good and stay on the old version",
      "Compare speed and cost on the new version, since the supplier owns quality and has promised improvement"
    ], 1, "As practical judgement, your own evaluation on your own cases, such as refunds, is the evidence that matters, and a fallback should stay ready. MANAGE 3.1 points to monitoring third-party resources with controls applied, and GOVERN 6.2 to contingency if the service is high-risk.", "scOP1"),
    S("op037", "ops", "Based on the scenario, a feedback button exists but there are no alert levels or responders. What should happen next?", [
      "Add more thumbs-up reporting to the dashboard and show it to leadership each week as a sign of progress",
      "Wait for the next complaint, then decide whether an alert level is needed",
      "Set triggers for rising refund corrections and complaints, name responders, and start this sprint",
      "Let support agents judge when to alert someone"
    ], 2, "MANAGE 4.1 expects user input to feed a monitoring plan. Specific triggers and responders are general practice, agreed with the people accountable for the risk and written down.", "scOP1"),
    M("op038", "ops", 2, "Based on the scenario, which TWO additions to monitoring fit best?", [
      "A regular check of refund answers against the current fare rules",
      "A count of total conversations per day",
      "The number of times managers open the dashboard",
      "A breakdown of agent corrections and complaints by topic",
      "Average response time by hour of the day"
    ], [0, 3], "The risk is wrong refund answers after a rule change. Checking answers against current rules and tracking corrections and complaints by topic show that directly, unlike volume or speed measures.", "scOP1"),
    S("op039", "ops", "Based on the scenario, the team plans an update to fix refund answers. Which update plan is best?", [
      "Ship once engineers try a few answers by hand and feel that the new version looks clearly better than the old one did",
      "Ship with a target, such as correct refund answers on a sampled set of cases, and include rider and staff input",
      "Count the update as successful if thumbs-up ratings rise",
      "Release it straight away, since the old rule text was the problem and the fix is small"
    ], 1, "MANAGE 4.2 asks for measurable improvement activities and regular engagement with interested parties. A checked sample against a baseline is evidence; ratings alone are not.", "scOP1"),
    S("op040", "ops", "Based on the scenario, the new model version passes 38 of 40 refund test cases and fails two rare multi-leg fare cases. The old version stays available for four weeks, and the refund topic can route chosen question types to staff. What is the best decision?", [
      "Hold the update until 40 of 40 cases pass",
      "Roll out the update and drop the two failing cases from the case list, to keep the pass rate high",
      "Roll out the update and review the two fare types if complaints arrive from riders in the weeks that follow the rollout",
      "Roll out the update with multi-leg fares routed to staff, and a switch-back rule agreed with the risk owner"
    ], 3, "As practical judgement, a known, narrow gap can be accepted with a stated control when the accountable people have agreed the switch-back rule. Holding for a perfect score, editing the test set after seeing results, or relying on complaints are weaker.", "scOP1"),
    S("op041", "ops", "A sales director asks the PO to remove the manual fallback route for a claims assistant to save two staff, because the assistant has run six weeks with no major incident. The supplier's service had two short outages last quarter. What is the best response?", [
      "Accept the request, since six weeks with no major incident is a good record",
      "Remove one of the two fallback staff now and look at the outage log at quarter end",
      "Decline for now and keep the fallback, then agree a date with the risk owner to revisit it using measured outage and error data",
      "Decline and pause the assistant until the supplier gives a written outage guarantee"
    ], 2, "As practical judgement, two recent outages are a fact the request does not address, so the fallback stays until measured data supports a decision agreed with the risk owner. If the assistant is rated high-risk, GOVERN 6.2 on contingency for third-party systems applies directly."),
    S("op042", "ops", "A summarisation feature is ready for five teams. Evaluation on real cases is good for four teams' documents and weaker for the fifth team's scanned files. The release is due Friday. What is the best decision?", [
      "Delay the whole release until the fifth team's results match the others",
      "Release to the four teams on Friday, hold the fifth team's files out, and go over results with that team's lead",
      "Release to five teams with a note that scanned files may be weaker",
      "Release to five teams, and look at the scanned files later if complaints come in from the fifth team's staff"
    ], 1, "As practical judgement, a partial release limits the risk to the group where evidence is weak, while the rest gets the value on time. Releasing to the weak group and checking later puts harm before evidence."),
    S("op043", "ops", "An assistant sometimes gives out-of-date opening hours, about 1 answer in 200, with low consequence: a rider arrives early. The fix needs a data feed change that takes three months. The risk owner and operations lead know. What is the best decision?", [
      "Get the risk owner's acceptance in writing, and keep it live with a visible notice and a monthly error count",
      "Switch the hours topic off until the feed is fixed",
      "Keep it live and note the issue in the backlog, to be picked up when complaints reach 5% of weekly visitors to the page",
      "Take it to the executive committee for approval of a halt and a full external audit"
    ], 0, "As practical judgement, a low-consequence, measured risk can be kept live with a control once the risk owner has accepted it in writing, which the PO obtains rather than assumes. Switching off or escalating is out of proportion, and a loose complaint threshold defers the decision.")
  );

  Object.assign(window.AIPO.why, {
    "op001": ["A dashboard of health data leaves out user input, appeal, override and incident routes, which MANAGE 4.1 places in a post-deployment plan.", "A named actor for user input, appeal, override and incidents turns the plan from a list into something that works on day one.", "Waiting for complaints makes harm the first signal, which is slow for a launch to 2,000 staff.", "A small manual sample is useful evidence but does not provide user input, appeal or incident routes."],
    "op002": ["MANAGE 4.1 names capturing and evaluating input from users and other relevant AI actors.", "A finance review of feature budgets is not part of a monitoring plan.", "Decommissioning is named in MANAGE 4.1.", "NIST sets no fixed accuracy figure for monitoring plans.", "Sales review of marketing claims is not a monitoring mechanism."],
    "op003": ["Uptime and speed targets do not help a rider contest a wrong answer.", "More positive ratings do not give riders or staff a route to contest outcomes.", "Retraining may help later but does not let riders or staff contest a specific outcome.", "Appeal and override are named in MANAGE 4.1 and are the missing route."],
    "op004": ["A small pilot with a named owner and written switch-off criteria keeps the schedule and limits harm if the plan has gaps.", "Holding a whole release for a full retirement plan is out of proportion when a controlled pilot is possible.", "Writing the steps after a full release leaves 40,000 users on a system with no agreed way to stop it.", "Supplier confirmation does not replace your own named owner and criteria, and the supplier may be slow."],
    "op005": ["Engineers lack the view of users, domain and risk, so the plan would miss failures others see.", "The PO and sponsor alone miss the clinical and support view, even though they know the Product Goal.", "Many views shape the plan while the PO keeps accountability for the product decision.", "A supplier does not own your users' risks or your product decisions."],
    "op006": ["NIST sets no fixed retraining cycle; this misstates the source.", "This is the general-practice meaning: performance sliding as conditions move away from build and test conditions.", "A single poor output is an error, not drift.", "A planned supplier change is a change, which is a separate cause to manage."],
    "op007": ["Splitting results by language and looking at real answers exposes the problem the average hides, and a fix item turns it into action.", "A steady average can hide a poorly served group, so reporting it as proof of stability misleads.", "Waiting leaves a group harmed for months, and doubled complaints are already a signal.", "Rising complaints from one group are a signal; checking the average does not explain them."],
    "op008": ["Setting levels around the first month can normalise a problem that is already present.", "Staff judgement is uneven, and triggers defined later still leave the first month unprotected.", "Another team's levels were set for different risks and users.", "Starting triggers from agreed risk tolerance, refined with recorded evidence, avoids target-after-result."],
    "op009": ["Who built the model does not define a trigger.", "A trigger needs a clear condition that counts as a breach.", "A vague commitment to look is not a trigger.", "A trigger needs a named responder and a defined action.", "A feature description says nothing about when to act."],
    "op010": ["A single audit of training data does not track deployed risks over time.", "MEASURE 3.1 sets no universal accuracy threshold.", "This paraphrases MEASURE 3.1: approaches, personnel and documentation to track risks in deployed contexts.", "Suppliers cannot promise that no new risks will appear."],
    "op011": ["Containing the harm and escalating first matches MANAGE 2.3 and 4.3.", "Waiting extends exposure to unsafe guidance.", "A quiet fix mentioned only in later release notes hides the incident from those who should know.", "Diagnosis matters but escalation should not wait for it."],
    "op012": ["A live fix does not remove the duty to inform those affected.", "Informing only a sponsor is not communicating to those affected.", "A line in a quarterly report is not timely communication to affected users.", "MANAGE 4.3 calls for communication to relevant AI actors, including affected communities, and documentation."],
    "op013": ["Waiting for a full report delays action on possible personal data exposure.", "Privacy, security and the risk owner are the right people to lead.", "The PO should not decide reporting duties alone, even with engineering's view.", "Contacting users before specialists decide the content can create further problems."],
    "op014": ["A deployed fix does not show whether the response worked.", "Archiving records hides learning and weakens tracking.", "A review, with errors and near-misses recorded and procedures updated, matches the AI 600-1 after-action suggestions and good practice.", "Waiting for a repeat wastes the lesson of this incident."],
    "op015": ["A supplier statement is not evidence for your own use.", "Demand is not a criterion for restoring service, and handling complaints afterwards puts harm first.", "A quiet pause proves little about the cause being addressed.", "Evidence against agreed criteria plus risk owner agreement is a sound condition, and a small group first limits harm."],
    "op016": ["Roles and written criteria agreed now with those accountable for the risk match MANAGE 2.4 and GOVERN 2.3.", "With nothing written down, authority stays unclear when the time comes.", "Letting anyone decide leads to inconsistent or unsafe actions.", "A supplier desk does not carry your accountability and may be slow."],
    "op017": ["Missing revenue is a business matter, not the basis MANAGE 2.4 names.", "A competitor's release is not evidence of the system's performance.", "MANAGE 2.4 ties these mechanisms to performance or outcomes inconsistent with intended use.", "Supplier fees may prompt a review but are not the basis in MANAGE 2.4."],
    "op018": ["A later warning leaves unevaluated use running with real errors.", "Blocking that use and telling the risk owner contains the risk, and testing comes before any decision to allow it.", "Relying on users to check shifts the risk onto them.", "Waiting leaves the errors in place until the next cycle."],
    "op019": ["Reasons and alternatives let affected users carry on.", "Budget approvers are irrelevant to affected users.", "Revenue forecasts are not helpful to users losing a service.", "Contacts and information on access removal are part of the suggested communication.", "Tuning history is internal detail and does not help users."],
    "op020": ["Continuing past a breached criterion ignores a rule agreed to protect people.", "Raising the threshold afterwards removes the purpose of the criterion.", "Overruling the sponsor yourself bypasses those accountable for risk, who own the agreed criterion.", "Escalating with evidence and recommending the agreed action fits GOVERN 2.3 and the AI 600-1 suggestion."],
    "op021": ["Without capacity for upkeep, problems wait for complaints.", "Freezing prevents needed fixes and learning.", "Keeping room for evaluation, monitoring and fixes beside features sustains value.", "Stopping new value overcorrects and loses benefit to users."],
    "op022": ["A stated target, checked after release and shared with interested parties, follows MANAGE 4.2.", "Engineer opinion is not a measure.", "Release notes do not show improvement for your users.", "Counting changes measures activity, not improvement."],
    "op023": ["A launch is not proof that value will last.", "Release counts measure activity, not value.", "MANAGE 4.2 asks for measurable improvement activities in updates.", "Updates that touch the data can still change behaviour and need proper evaluation.", "MANAGE 4.2 asks for regular engagement with interested parties."],
    "op024": ["Adoption is an activity measure and can hide falling outcomes.", "A falling outcome measure is a signal to plan a fix and look at causes.", "Dropping the measure hides the problem.", "Replacing the supplier on one signal skips finding the cause."],
    "op025": ["Leaving it to the supplier ignores impact on your users.", "Waiting for complaints makes users the test.", "Dropping the feed for good may remove value without assessing alternatives.", "Assessing impact, testing and planning a fallback treats the change as your own."],
    "op026": ["A supplier statement is not a control.", "A longer checklist does not provide an alternative.", "A tested fallback gives a way to continue if the third party fails.", "An expectation of continuity is not a contingency."],
    "op027": ["MANAGE 3.2 puts pre-trained models inside regular monitoring and maintenance.", "No component is exempt from monitoring.", "The team using the component shares responsibility for monitoring it.", "A one-time check at purchase misses later change."],
    "op028": ["A single contract review does not provide regular monitoring.", "This paraphrases MANAGE 3.1.", "Published claims are not evidence of risk control.", "MANAGE 3.1 covers third-party resources, not only the team's own."],
    "op029": ["A shutdown date and command cover only the technical step.", "Marketing copy does not manage retirement risks.", "Data, dependencies, users and alternatives are the substance of safe decommissioning.", "Staff reassignment is a project matter, not a risk step for the system."],
    "op030": ["Low use does not prove that nobody depends on it, and two teams do.", "Low use can be a valid reason to consider retirement, so refusing outright is wrong.", "Keeping data and models for years creates security and retention risks.", "A planned phase-out covers dependents, data and users before shutdown."],
    "op031": ["Feature counts are not a decommissioning factor.", "Data retention and security after shutdown are suggested factors.", "Roadmap position is not a risk factor.", "Competitor gains are a business matter, not a decommissioning factor in the profile.", "Dependencies between systems are a suggested factor."],
    "op032": ["The PO gathers evidence and recommends, while accountable people decide on risk.", "The PO is not the sole risk owner, even after talking to engineering.", "Engineers contribute but do not carry the product or risk decision.", "A supplier does not decide your product's retirement."],
    "op033": ["Keeping outdated answers live extends harm.", "A disclaimer does not stop wrong refund answers.", "A targeted switch-off with riders routed to staff and the risk owner told and asked to confirm limits harm today, and a tested fix comes before restoring.", "Switching off the whole assistant removes value that is working."],
    "op034": ["Keeping the topic off or restoring it is a risk decision, so it involves the risk owner with the PO supplying evidence, and assigned roles close the gap shown in the scenario.", "The operations lead can act today as the emergency step, but how long it stays off and when it returns is a risk decision for those accountable, not for one person.", "Leaving it to chance is not a mechanism.", "A supplier desk does not carry your accountability."],
    "op035": ["Waiting for another complaint delays an obvious correction.", "A generic message hides the cause from those affected.", "Describing the tool as advisory does not address the harm.", "Contacting affected riders, offering correction and involving legal or compliance follows MANAGE 4.3."],
    "op036": ["Supplier claims are not evidence for refund handling.", "Your own evaluation including refund cases before accepting fits MANAGE 3.1, and a ready fallback fits GOVERN 6.2.", "Permanently blocking updates is impractical and may add risk.", "Speed and cost say nothing about refund accuracy."],
    "op037": ["More positive ratings do not create triggers or responders.", "Waiting means harm is the signal.", "Defined triggers with named responders make monitoring actionable.", "Agents deciding on their own leaves criteria and escalation inconsistent."],
    "op038": ["Checking answers against current rules targets the actual failure.", "Volume does not show answer quality.", "Dashboard views by managers measure attention, not harm.", "Corrections and complaints by topic show where answers fail.", "Response time does not detect wrong refund answers."],
    "op039": ["Engineer opinion on a few tries is not a measurable improvement.", "A checked sample against a baseline plus rider and staff input follows MANAGE 4.2.", "Ratings can rise while refund answers stay wrong.", "Releasing on a small fix with no real evidence repeats the original mistake."],
    "op040": ["Waiting for a perfect score delays value when a narrow gap can be controlled.", "Editing the test set after seeing the result sets the target around the outcome.", "Relying on complaints puts harm before evidence.", "Routing the failing fare types to staff, with a switch-back rule agreed with the risk owner, accepts a narrow gap with a control that the accountable people have agreed."],
    "op041": ["Six weeks with no major incident does not offset two recent outages.", "Cutting the fallback and looking at the log at quarter end cuts the safety net before the data supports it.", "As practical judgement, keep the fallback until measured data supports removal, agreed with the risk owner. If the assistant is rated high-risk, GOVERN 6.2 (contingency processes for third-party systems deemed high-risk) applies directly.", "Pausing the assistant over a supplier guarantee is out of proportion to the facts."],
    "op042": ["Delaying the whole release withholds value from four teams that are ready.", "A partial release gives four teams the value on time and limits risk to the group where evidence is weak.", "A note does not protect the fifth team from weaker results.", "Testing after complaints puts harm before evidence."],
    "op043": ["Written acceptance by the risk owner, with a notice and a count, controls a low-consequence risk; the PO does not accept it alone.", "Switching the topic off is out of proportion to a low-consequence error.", "A loose complaint threshold with no owner agreement defers the decision.", "Escalating for a pause and an external review is out of proportion."]
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
