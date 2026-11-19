(function () {
  window.AIPO = window.AIPO || {};
  window.AIPO.domains = [
    { id: "intro", name: "Start here: what is an AI Product Owner?", weight: 12, desc: "The Product Owner accountability, what makes a product an AI product, and the core questions of the role." },
    { id: "po", name: "Product ownership in an AI context", weight: 8, desc: "Outcome-oriented goals, an ordered backlog with AI work in it, value measures and evidence-based decisions." },
    { id: "frame", name: "Problem framing: is AI the right answer?", weight: 13, desc: "Start from the user problem, judge when AI adds value, and state purpose, scope and the cost of errors." },
    { id: "data", name: "Data and models for non-engineers", weight: 10, desc: "Rules, machine learning, generative and agentic systems, data questions, and third-party dependencies." },
    { id: "eval", name: "Evaluation and acceptance", weight: 15, desc: "Define good enough early, demand honest evidence, involve independent people and decide at release gates." },
    { id: "hax", name: "Human-AI experience", weight: 11, desc: "Honest expectations, human oversight, graceful failure, and guarding against over-reliance." },
    { id: "risk", name: "Risk, ethics, security and privacy", weight: 13, desc: "Mapping and managing risks, accountability for risk decisions, security, privacy and fairness." },
    { id: "ops", name: "Release, operations and retirement", weight: 11, desc: "Monitoring, incidents, escalation, fallback, switch-off criteria, change control and retirement." },
    { id: "use", name: "Using AI as a Product Owner", weight: 7, desc: "Using AI tools in your own work responsibly, checking output and keeping accountability." }
  ];
})();
