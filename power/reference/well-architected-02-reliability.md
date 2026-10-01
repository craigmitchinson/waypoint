# Power Platform Well-Architected — Reliability Pillar

Verbatim Markdown pulled directly from Microsoft's published documentation source, snapshot dated 20 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading, and transcluded `[!INCLUDE]` snippets are resolved inline where the include content was reachable. Source repository: `MicrosoftDocs/power-platform`, folder `power-platform/well-architected/reliability/`. Companion files: well-architected-01 (Experience Optimization), well-architected-03 (Performance Efficiency), well-architected-04 (Operational Excellence). The Security pillar was not requested and is not included.

Pages in this file: 12

## Contents

1. [Reliability design principles for well-architected Power Platform workloads](#reliability-design-principles-for-well-architected-power-platform-workloads)
2. [Recommendation checklist for Reliability for Power Platform workloads](#recommendation-checklist-for-reliability-for-power-platform-workloads)
3. [Reliability tradeoffs for Power Platform workloads](#reliability-tradeoffs-for-power-platform-workloads)
4. [Design for simplicity and efficiency recommendation for Power Platform workloads](#design-for-simplicity-and-efficiency-recommendation-for-power-platform-workloads)
5. [Identify and rate flows recommendation for Power Platform workloads](#identify-and-rate-flows-recommendation-for-power-platform-workloads)
6. [Failure mode analysis recommendation for Power Platform workloads](#failure-mode-analysis-recommendation-for-power-platform-workloads)
7. [Define reliability targets recommendation for Power Platform workloads](#define-reliability-targets-recommendation-for-power-platform-workloads)
8. [Develop background jobs recommendation for Power Platform workloads](#develop-background-jobs-recommendation-for-power-platform-workloads)
9. [Handle transient faults recommendation for Power Platform workloads](#handle-transient-faults-recommendation-for-power-platform-workloads)
10. [Design a reliability testing strategy recommendation for Power Platform workloads](#design-a-reliability-testing-strategy-recommendation-for-power-platform-workloads)
11. [Design a disaster recovery strategy recommendation for Power Platform workloads](#design-a-disaster-recovery-strategy-recommendation-for-power-platform-workloads)
12. [Design a reliable monitoring and alerting strategy recommendation for Power Platform workloads](#design-a-reliable-monitoring-and-alerting-strategy-recommendation-for-power-platform-workloads)

---

## Reliability design principles for well-architected Power Platform workloads

Source: [principles.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/principles)

*Understand the design principles of the Power Platform Well-Architected Reliability pillar.*

# Reliability design principles

A reliable workload must be resilient so that it can detect and recover from outages and malfunctions and consistently deliver functionality. It must be capable of recovering from failures within a reasonable timeframe. It must also be available so that users can consistently and reliably access the workload during the agreed timeframe and at the agreed quality level.

Use the following design principles from the [Microsoft Azure Well-Architected Framework](/azure/well-architected) to help ensure reliability throughout the entire lifecycle. Start with the recommended best practices and justify the benefits of each reliability principle. Once you set your strategy, use the [Reliability checklist](./checklist.md) as your next step.

If you don't apply these principles to your design, the workload likely won't be prepared to anticipate or handle problems in production. The outcome might be service disruptions that lead to financial loss. For critical workloads, failing to apply these principles could jeopardize safety.

## Design for business requirements  

| ![Goal icon](../_images/goal.svg) Collect and understand business needs with a focus on the expected use of the workload. |
| -- |

Requirements should include the user experience, workflows, data, and workload-specific features. The goals should be realistic and agreed with all stakeholders, based on a given budget. The requirements should clearly define the expectations with the team and stakeholders. Document requirements to guide technology choices, implementations, and operations.

Learn more about [designing for business requirements](/azure/well-architected/reliability/principles#design-for-business-requirements) in the Azure Well-Architected Framework.

## Design for resilience

| ![Goal icon](../_images/goal.svg) The workload must respond to failures and continue to operate with full or reduced functionality. |
| -- |

Design your workload to be able to identify faults and component outages. Make the system resilient so that it can tolerate faults and handle them smoothly. Inform users about the system state and set the expectations of what components are unavailable and how long expected recovery will take.

Learn more about [designing for resilience](/azure/well-architected/reliability/principles#design-for-resilience) in the Azure Well-Architected Framework.

## Design for recovery

| ![Goal icon](../_images/goal.svg) The workload must be able to recover from failures with minimal disruption to the user experience and business objectives. |
| -- |

Put in place structured, tested, and documented recovery plans that lead to quick recovery. Ensure your support and operations teams have access to these plans and recovery drills are performed frequently to avoid confusion and chaos during an actual outage.

Learn more about [design for recovery](/azure/well-architected/reliability/principles#design-for-recovery) in the Azure Well-Architected Framework.

## Design for operations

| ![Goal icon](../_images/goal.svg) The workload must be observable, and development teams must be able to learn from failures. |
| -- |

Build monitoring into your workload so that development and support teams have enough data to analyze when, why, and what component is failing. Build meaningful alerts to notify support teams when a failure occurs. Use analytics and insights to drive improvements.

Learn more about [designing for operations](/azure/well-architected/reliability/principles#design-for-operations) in the Azure Well-Architected Framework.

## Keep it simple

| ![Goal icon](../_images/goal.svg) Avoid overengineering the architecture design, application code, and operations. |
| -- |

Focus on the business requirements and remove features and components that aren't necessary. Establish standards for development and deployment that increase consistency. Take advantage of platform-provided features and pre-built assets to minimize development time.

Learn more about [keeping it simple](/azure/well-architected/reliability/principles#keep-it-simple) in the Azure Well-Architected Framework.

## Next steps

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

---

## Recommendation checklist for Reliability for Power Platform workloads

Source: [checklist.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/checklist)

*Learn about the recommendations that will help you to identify the best infrastructure and application design for your Power Platform workload.*

# Recommendation checklist for Reliability

This checklist presents a set of recommendations for you to use to evaluate the reliability, resiliency, and failure recovery strategies in your architecture design. To ensure reliability, identify the best infrastructure and application design for your workload. Make these decisions based on your business requirements that are mapped to availability and recoverability target metrics.

To implement a reliable design, thoroughly consider decision points in your design and be aware of how those decisions affect your workload. This checklist and the guides that come with it offer resources to help you make those decisions. Make workload reliability a central consideration at every stage of the workload design, development, and operation lifecycle.

## Checklist

Approach your design with a focus on reliability to help ensure that you design a workload that's resilient, manageable, and repeatable. If you don't include reliability practices and consider the tradeoffs, your design is potentially at risk. Carefully consider all the points covered in the checklist to instill confidence in your system's success.

|&nbsp; |Code  |Recommendation  |
|-|-|-|
| &#9744; |[RE:01](simplify.md)     |  **Design your workload to align with business objectives and avoid unnecessary complexity or overhead**. Use a practical and balanced approach to make design decisions that deliver the desired results. Contain your design to the necessities to reduce inefficiencies and potential problems.       |
| &#9744; |[RE:02](identify-flows.md)    |  **Identify and rate user and system flows.** Use a criticality scale based on your business requirements to prioritize the flows. |
| &#9744; |[RE:03](failure-mode-analysis.md)     |  **Use failure mode analysis (FMA) to identify and prioritize potential failures in your solution components.** Perform FMA to help you assess the risk and effect of each failure mode. Determine how the workload responds and recovers.       |
| &#9744; |[RE:04](metrics.md)     |   **Define reliability and recovery targets** for the components, the flows, and the overall solution. Visualize the targets to **negotiate, gain consensus, set expectations, and drive actions** to achieve the ideal state. Use the defined targets to build the health model. The health model defines what healthy, degraded, and unhealthy states look like.      |
| &#9744; |[RE:05](background-jobs.md) <br> [RE:05](handle-transient-faults.md)  |  **Strengthen the resiliency of your workload by implementing error handling and transient fault handling**. Build capabilities into the solution to handle component failures and transient errors.      |
| &#9744; |[RE:06](testing-strategy.md)      |  **Test for resiliency and availability scenarios by applying the principles of chaos engineering in your test and production environments**. Use testing to ensure that your graceful degradation implementation strategies are effective by performing active malfunction and simulated load testing.       |
| &#9744; |[RE:07](disaster-recovery.md)     |  **Implement structured, tested, and documented business continuity and disaster recovery (BCDR) plans that align with the recovery targets**. Plans must cover all components and the system as a whole.       |
| &#9744; |[RE:08](monitoring-alerting-strategy.md)     |  **Measure and publish the solution's health indicators**. Continuously capture uptime and other reliability data from across the workload and also from individual components and key flows.       |

## Next steps

> [!div class="nextstepaction"]
> [Reliability tradeoffs](tradeoffs.md)

---

## Reliability tradeoffs for Power Platform workloads

Source: [tradeoffs.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/tradeoffs)

*Learn about the Reliability tradeoffs you might encounter when optimizing for the other Power Platform Well-Architected pillars.*

# Reliability tradeoffs for Power Platform workloads

A reliable workload consistently meets its defined reliability objectives. It should reach established resiliency targets, ideally by circumventing events that affect reliability. Realistically, however, a workload must tolerate and control the impact of such events and maintain operations at a predetermined level during active malfunction. Even during a disaster, a reliable workload must recover to a specific state within a given period of time, both of which are agreed upon among the stakeholders. An incident response plan that enables you to achieve rapid detection and recovery is vital.

During the design phase of a workload, you need to consider how decisions based on the [Reliability design principles](./principles.md) and the recommendations in the [Design review checklist for Reliability](./checklist.md) might influence the goals and optimizations of other pillars. Certain decisions might benefit some pillars but constitute a tradeoff for others. This article describes example tradeoffs that a workload team might encounter when designing workload architecture and operations for reliability.

## Reliability tradeoffs with Security

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased workload surface area**. The Security pillar prioritizes a reduced and contained surface area to minimize attack vectors and reduce the management of security controls.

- Reliability is often obtained through replication. Replication can occur at the component level, at the data level, or even at a geographic level. Replicas, by design, increase the surface area of a workload. From a security perspective, a reduced and contained surface area is preferred to minimize potential attack vectors and streamline the management of security controls.

- Similarly, disaster recovery solutions, like backups, increase a workload's surface area. However, they're often isolated from the workload's runtime. This requires the implementation of additional security controls, which might be specific to the disaster recovery solution.

- For the sake of reliability goals, additional components might be needed for the architecture, which increases the surface area. This increased complexity increases the surface area of the workload by adding new components that need to be secured, possibly in ways that aren't already used in the system. Typically, these components are accompanied by additional code to support their use or general reliability patterns, which also increases the application's surface area.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Security control bypass**. The Security pillar recommends that all controls remain active in both normal and stressed systems.

- When a workload is experiencing a reliability event that's being addressed under active incident response, urgency might create pressure for workload teams to bypass security controls that are optimized for routine access.

- Troubleshooting activities can cause the team to temporarily disable security protocols, leaving an already stressed system potentially exposed to additional security risks. There's also a risk that the security protocols won't be reestablished promptly.

- Granular implementations of security controls, like role-based access control assignments or firewall rules, introduce configuration complexity and sensitivity, increasing the chance for misconfiguration. Mitigating this potential reliability impact by using broad rules erodes all three Zero Trust architecture principles.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Old software versions**. The Security pillar encourages a "get current, stay current" approach to vendor security patches.

- Applying release wave updates or updates to vendor libraries, like third-party components or solutions, can potentially disrupt the target component, causing unavailability during the change. Delaying or avoiding patching might avoid the potential reliability risks, but it leaves the system unprotected against evolving threats.

- The preceding consideration also applies to the workload's code. For example, it applies to application code that uses old libraries and components. If updating and deploying application code is viewed as an unmitigated reliability risk, the application is exposed to additional security risks over time.

## Reliability tradeoffs with Operational Excellence

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased operational complexity**. Operational Excellence, like Reliability itself, prioritizes simplicity.

- Having a comprehensive monitoring strategy for a workload is a key part of operational excellence. Introducing additional components into an architecture to implement reliability design patterns results in more data sources to manage, increasing the complexity of implementing distributed tracing and observability.

- Using multiple regions to overcome single region resource capacity constraints and/or implement an active/active architecture increases the complexity of the workload's operational management. This complexity is introduced by the need to manage multiple regions and the need to manage the data replication between them.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased effort to generate team knowledge and awareness**. The Operational Excellence pillar recommends keeping and maintaining a documentation repository for procedures and topologies.

- As a workload becomes more robust through the addition of reliability components and patterns, it takes more time to maintain operational procedures and artifact documentation.

- Training becomes more complex as the number of components in the workload increases. This complexity affects the time required for onboarding and increases the knowledge that's needed to track product roadmaps and service-level guidance.

## Reliability tradeoffs with Experience Optimization

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Decreased agility**. The Experience Optimization pillar prioritizes user efficiency.

- Emphasizing rigorous testing can delay the release of experience features that are essential for adoption.

- Optimizing for reliability can overindex on minimizing complexity, which deprioritizes features for more engaging user experiences, such as custom components and integrations.

## Reliability tradeoffs with Performance Efficiency

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased latency**. Performance Efficiency requires a system to achieve performance targets for user and data flows.

- Reliability patterns often incorporate data replication to survive replica malfunction. Replication introduces additional latency for reliable data-write operations, which consumes a part of the performance budget for a specific user or data flow.

- Reliability sometimes employs various forms of resource balancing to distribute or redistribute load to healthy replicas. A dedicated component that's used for balancing usually affects the performance of the request or process that's being balanced.

- Distributing components across geographical boundaries or availability zones to survive a scoped impact introduces network latency in the communication between components that span those availability boundaries.

- Extensive processes are used to observe the health of a workload. Although monitoring is critical for reliability, instrumentation can affect system performance. As observability increases, performance might decrease.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased over-provisioning**. The Performance Efficiency pillar discourages over-provisioning, instead recommending the use of just enough resources to satisfy demand.

- Automatic scaling operations aren't instantaneous and therefore can't reliably handle a sudden and dramatic spike in demand that can't be shaped or smoothed. Therefore, over-provisioning via either larger instances or more instances is a critical reliability tactic to account for the lag between demand signal and supply creation. Unused capacity counters the goals of performance efficiency.

- Sometimes a component can't be scaled in reaction to demand, and that demand isn't fully predictable. Using large instances to cover the worst case leads to over-provisioning waste in situations that are outside that use case.

## Related information

- [Operational Excellence tradeoffs](../operational-excellence/tradeoffs.md)
- [Experience Optimization tradeoffs](../experience-optimization/tradeoffs.md)
- [Security tradeoffs](../security/tradeoffs.md)
- [Performance Efficiency tradeoffs](../performance-efficiency/tradeoffs.md)

---

## Design for simplicity and efficiency recommendation for Power Platform workloads

Source: [simplify.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/simplify)

*Learn how to design your Power Platform workload with business requirements in mind and minimize complexity by keeping your workloads simple and efficient.*

# Recommendations for designing for simplicity and efficiency

**Applies to this Power Platform Well-Architected Reliability checklist recommendation:**

| [RE:01](checklist.md) | **Design your workload to align with business objectives and avoid unnecessary complexity or overhead. Use a practical and balanced approach to make design decisions that deliver the desired results. Contain your design to the necessities to reduce inefficiencies and potential problems.** |
| --- | --- |

This guide describes the recommendations for minimizing unnecessary complexity and overhead to keep your workloads simple and efficient. Choose the best components to perform the necessary workload tasks to optimize the reliability of your workload. To lessen your development and management burdens, take advantage of efficiencies that platform-provided services offer. This design helps you create a workload architecture that's resilient, repeatable, scalable, and manageable.

**Definitions**

| Term | Definition |
| --- | --- |
| Workload | A discrete capability or computing task that you can logically separate from other tasks. |

## Key design strategies

A key tenet of designing for reliability is to keep things simple and efficient. Focus your workload design on meeting business requirements to reduce the risk of unnecessary complexity or excess overhead. Consider the recommendations in this article to help you make decisions about your design to create a lean, efficient, and reliable workload. Different workloads might have different requirements for availability, scalability, data consistency, and disaster recovery.

You must justify every design decision with a business requirement. This design principle might seem obvious, but it's crucial for workload design. Does your workload support millions of users, or a few thousand? Are there large traffic bursts, or a steady workload? What level of outage is acceptable? Business requirements drive these design considerations.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff:** A complex solution can offer more features and flexibility, but it might affect the reliability of the workload because it requires more coordination, communication, and management of components. Alternatively, a simpler solution might not fully meet user expectations, or it might have a negative effect on extensibility as the workload evolves.

### Collaborative design exercises

Work with stakeholders to:

- **Define and assign a criticality level to your workload and its components**. This exercise will help you determine the required components and the best approach to achieve the required resiliency level. See [Define tiers of applications](/power-platform/guidance/adoption/support-strategy-solutions#define-tiers-of-applications) for more information.

- **Define functional and nonfunctional requirements**. Functional requirements define the features and behavior of the system. They're specified by the user and captured in use cases. Nonfunctional requirements define the performance and quality attributes of the system. Ensure that you understand nonfunctional requirements like availability, compliance, data retention/residency, performance, privacy, recovery time, security, and scalability. These requirements influence design decisions and technology choices.

    Here are some examples of functional and nonfunctional requirements, in the context of a workload that handles expense reports:

    | **Functional requirements** | **Nonfunctional requirements** |
    | --- | --- |
    | The workload should allow users to log in with their credentials and only access their personal data. | The workload should be available at least 99.9% of the time. |
    | The workload should include a dashboard that provides an overview of open, approved, and declined expense reports. | The workload should comply with the relevant regulations and standards for data protection and privacy. |
    | The workload should support backup and restore operations for the workload data. | The workload should have a response time of less than 5 seconds for most user requests. |
    | The workload should send notifications to users and administrators when certain events or thresholds are triggered. | The workload should have a high level of security and encryption for the data in transit and at rest. |

    For more information, see the training module entitled [Work with requirements for Microsoft Power Platform and Dynamics 365](/training/modules/work-with-requirements/).

- **Break down the workload into components**. During the discovery and requirement gathering process, some solution ideas should start to become clear. Identify solution components that might make up the proposed solution to meet your business requirement. Prioritize simplicity, efficiency, and reliability in your design. Determine the components that you need to support your workload. Highlight where out-of-the-box capabilities can be used, and where custom development may be needed.

- **Use failure mode analysis** to identify single points of failure and potential risks. Clearly understand your business's tolerance for risk. For more information, see [Recommendations for performing failure mode analysis](failure-mode-analysis.md).

- **Define availability and recovery targets** for your workload to inform the architecture decisions. Business metrics include service-level objectives (SLOs), service-level agreements (SLAs), mean time to recover (MTTR), mean time between failure (MTBF), recovery time objectives (RTOs), and recovery point objectives (RPOs). Define target values for these metrics. This exercise might require compromise and mutual understanding between technology and business teams to ensure that each team's goals meet business objectives and are realistic. For more information, see [Recommendations for defining reliability targets](metrics.md). Power Platform SLAs provide the Microsoft commitments for uptime and connectivity. Different services have different SLAs, and sometimes SKUs within a service have different SLAs. For more information, see [Service-level agreements for online services](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services).

### Additional design recommendations

You can perform the following recommendations without stakeholder engagement:

- **Strive for simplicity and clarity** in your design. Use the appropriate level of abstraction and granularity for your components and services. Avoid overengineering or underengineering your solution. For example:

  - If you solve a process automation requirement with Power Automate, breaking a large process into multiple smaller cloud flows might make it more difficult to understand, test, and maintain. On the other hand, keeping everything in a large flow might have a negative impact on performance and API call volume.

  - If you solve a user-facing requirement with Power Apps, a large monolithic canvas app with many controls might have a negative impact on performance. Breaking it down into single apps or custom pages might make testing more difficult, but it could have a significant positive impact on performance.

- **Anticipate change over time**, whether to fix bugs, implement new features or technologies, or make existing systems more scalable and resilient.

- **Offload cross-cutting concerns to a separate service**. Minimize the need to duplicate code across different functions. Prefer reusing services with well-defined interfaces that can be easily consumed by different components. For example, if a set of data operations needs to be performed from different places, you can move this functionality to a low-code plug-in.

- **Evaluate the suitability of common patterns and practices** for your needs. Avoid following trends or recommendations that might not be best for your context or requirements. For example, implementing custom code components might not be the best option for every application because they can introduce complexity, overhead, and dependency issues.

### Develop just enough code

The principles of simplicity, efficiency, and reliability also apply to your development practices. Consider these recommendations:

- Use platform capabilities when they meet your business requirements. For example:
    - Use modern controls instead of developing your own code components to achieve a Fluent 2 design standard.
    - Use native connectors instead of developing custom connectors to reduce custom code.
    - Use generative answers in Microsoft Copilot Studio to enable your agent to find and present information from multiple sources, internal or external, without manually created topics.

- Introduce dedicated code review sessions as a development practice.

- Implement an approach to identify *dead code*. Be skeptical of the code that your automated tests don't cover.

- Consider the skill set of your development team. It takes time to learn a new skill or adopt a new technology.

### Consider where your data is

As part of your architectural design, you need to consider how to store your data or how to retrieve your data for read activities. Data can be retrieved and stored in different ways:

- **New data**: If your app creates data that doesn't already exist, such as when the existing business process was done on paper, we recommend storing the data in Microsoft Dataverse.

- **Read/write from an existing system**: If your app needs to retrieve data from an existing database or system, you need to evaluate the best way to connect to the database or system: using an out-of-the-box connector, a custom connector, or virtual tables.

- **Make a copy of the data**: In situations where original data should never be modified or overwritten, you can copy the data to another data store such as Dataverse. This strategy keeps the original system's data unchanged while allowing your app to work with it. This scenario is common when working with data in accounting and revenue-related systems. You need to consider how data is copied, how often it's updated, and whether a two-way sync needs to take place.

## Power Platform facilitation

You can use [Plan designer](/power-apps/maker/plan-designer/plan-designer) to describe your business case in natural language and provide information, like business process flows or screenshots of legacy systems. Plan designer will then generate a complete Power Platform solution tailored to your needs. Plan designer also generates process diagrams to help you clarify user interactions.

For practical design advice, consult the following articles:

- Power Apps:
    - Determining [where to place logic in your system: Canvas apps, model-driven apps, Microsoft Dataverse, or Power Automate flows](/power-apps/guidance/planning/logic)
    - [Determining which type of app to make](/power-apps/guidance/planning/app-type): model-driven or canvas apps
    - [Data modeling: Designing your data structure](/power-apps/guidance/planning/data-modeling)
    - Data design: [Working with enterprise systems](/power-apps/guidance/planning/enterprise-systems)

- Power Automate:
    - [Determining which automation method to use](/power-automate/guidance/planning/determine-automation-methods)
    - [Reducing risk and planning for error handling](/power-automate/guidance/planning/reducing-risk)
    - [Separate flows into smaller automated processes](/power-automate/guidance/planning/separate-flows)

- Copilot Studio:
    - The [Microsoft Copilot Studio implementation guide](https://aka.ms/copilotStudioImplementationGuide) provides a framework for conducting a 360-degree review of your project. By asking probing questions, it identifies potential risks and gaps, aligns the project with the product roadmap, and shares guidance, best practices, and reference architecture examples.
    - The [Microsoft Copilot Studio guidance documentation](/microsoft-copilot-studio/guidance/) provides best practices, implementation tips, and architecture guidance from the team that collaborates with our enterprise customers.

## Related information

- [Service-level agreements for online services](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services)
- [Work with requirements for Microsoft Power Platform and Dynamics 365](/training/modules/work-with-requirements/)
- [Planning a Power Apps project](/power-apps/guidance/planning/planning-phase)
- [Planning a Power Automate project](/power-automate/guidance/planning/separate-flows)
- [Planning a conversational AI project](/microsoft-copilot-studio/guidance/project-best-practices)

## Reliability checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

---

## Identify and rate flows recommendation for Power Platform workloads

Source: [identify-flows.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/identify-flows)

*Learn how to create a catalog of user and system flows for your Power Platform workload and how to determine their criticality and impact on reliability.*

# Recommendations for identifying and rating flows

**Applies to this Power Platform Well-Architected Reliability checklist recommendation:**

| [RE:02](checklist.md) | **Identify and rate user and system flows. Use a criticality scale based on your business requirements to prioritize the flows.** |
| --- | --- |

This guide describes the recommendations for identifying and prioritizing workload flows. Identifying and prioritizing workload flows involves mapping user flows and system flows to determine their criticality to the organization. This practice ensures that you identify and prioritize the most critical workload functionality to reduce the risk of damaging failures. Failure to identify and prioritize workload flows can lead to system breakdowns and compromised workload reliability.

**Definitions**

| Term | Definition |
| --- | --- |
| User flow | The paths or sequences of actions that users take within an application or system. |
| System flow | The flow of information and processes within a system. The system automatically follows this flow to enable user flows or workload functionality. |

## Key design strategies

When you design your workload, it's essential to define the user flows and system flows.

- User flows chart the movement of a user through your application. They focus on the user interface, interactions, decisions, and the steps required to complete a task. User flows provide a user-centric perspective on user experience and interface design.

- System flows chart the internal workings of your workload. They focus on data movement, input processing, output processing, and interactions among workload components, back-end services, and external APIs. System flows indicate the intricate details of how the workload operates internally.

You should identify and define flows early in the design phase of your workload. It gives you a clearer understanding of what affects the reliability of your workload. It aligns your architectural decisions closely with the reliability goals of your workload.

### Identify all user and system flows

The output of identifying all user and system flows is a catalog of all the flows in your workload. This identification process requires you to map out every user interaction and process within a system from beginning to end. This mapping is a prerequisite for identifying critical flows. Here are recommendations for identifying all user and system flows in a workload:

- **Identify key contributors**. Think through everyone who contributes to the process. This includes people in your department and other departments who all work together on the problem. Understand what they do in the context of the business problem that's being solved.

- **Interview stakeholders**. Stakeholders can provide valuable information to identify flows, and they can even help you map and prioritize flows. You can also interview users, business analysts, and technical teams to gather insights about user interactions and dependencies within the workload.

- **Discover processes to improve on using process mining**. If your task is done fully on the desktop, you can use [process mining](/power-automate/process-advisor-overview) to discover all the steps that people in your organization take to complete the task. Process mining visualizes your process in a [process map](/power-automate/process-advisor-visualize) and reveals bottlenecks and metrics for your process in an analytical report. Use [Plan designer](/power-apps/maker/plan-designer/process-diagram) to generate process diagrams as part of the plan to clarify user interactions.

- **Review documentation**. In the design phase, you might not have documentation to review. However, if documentation exists, you should use it. Ask for system architecture diagrams, user manuals, and process descriptions. These documents can help you understand the intended functionality of the workload and its individual flows. You can use existing documentation to [create a plan](/power-apps/maker/plan-designer/create-plan) using Plan designer. Plan designer generates a complete Power Platform solution tailored to your needs.

- **Observe what activities are being performed**. If the task is performed today in a different way, monitor the task in operation. Write down the activities that the user does to complete the tasks in this step of the business process. Get into the details of the activities. When deciding on the activities, you'll want to consider cause and effect for each one, how they relate to each other, and how they move you closer to your desired objective. Identify the starting point of the process, and fill in the activities that lead to the objective. Activities can be sequential, meaning that one activity can't occur until the previous one is completed, or parallel, meaning that two or more activities can occur at the same time.

- **Identify what data is needed and where it's coming from**. Make a list of all data sources and observe where data is coming from. Is it from an internal system or an external data source? How do users authenticate to get the data? Are there different permission levels? Does the data change based on who is using the system?

- **Identify what data is created or edited**. Is a paper form or electronic form used to capture the data today? Such a form can serve as a starting point as you think about the layout of screens and how the data is captured. What is the data that's being captured? What is it called? Is this the real name from the data source or a common name that's used in this part of the business? You might need to map the name in the data source to the "friendly" name your users know.

- **Determine the decisions made as part of the user or system flow**. At the conclusion of this activity in the process, is a decision being made? Is there a way that the solution can make the decision automatically based on the data? Is there a hierarchy for the data? For example, each expense report can have multiple expenses, and some expense types require additional information. Is this decision communicated to anyone? How is it communicated? Are approvals needed before the next step of the process begins? How are those approvals captured? Is there a specific user or role that can approve the next step in the process?

- **List identified flows**. The interviews, documentation, and observation should enable you to identify all the flows in the workload. Compile a list of all the flows you identify and categorize them into user flows (focusing on user interactions) and system flows (focusing on back-end processes and data movement).

- **Define flow start and end points**. For each identified flow, clearly define where the flow starts and where it ends. For user flows, document each user interaction and its expected outcome. Focus on the user experience and interface design. For system flows, you need to identify underlying triggers and expected outcomes.

- **Break down each flow**. Break down each flow into individual steps, describing the actions, decisions, or processes that occur at each point. Note how each step interacts with other parts of the system, including dependencies on other flows or external systems. You should be able to pinpoint how flows integrate with and affect the workload and user experience. This dual approach provides a holistic view of your entire workload.

- **Document unique outputs**. Identify any alternative paths or exceptions within each flow, such as error handling or conditional branching. If a flow has multiple possible outcomes, you should add them to the catalog as distinct entries. For user flows, you should identify the intended behavior of the interaction. For system flows, you should identify the intended behavior of the process.

- **Visualize with diagrams**. Create flowcharts or diagrams to visually represent the flow and its steps. You can use tools like Microsoft Visio, Unified Modeling Language (UML) sequence diagrams, use-case diagrams, simple drawing tools, or a descriptive list in text format (see [Example flow catalog](#example-flow-catalog)).

- **Update flow mapping iteratively**. Flow mapping is an iterative process. Flows can change, split, or combine, especially in the design phase. As the workload flows become more clearly defined, you should update the catalog of flows to match. Validate and refine your flow diagrams with feedback from stakeholders to ensure accuracy and completeness.

### Identify business processes for each flow

Business processes are a series of tasks to achieve an output, such as expense reporting, annual leave management, order fulfillment, or inventory control. The identification of business processes for each flow involves mapping flows to one or more business processes. This mapping helps you understand the importance of each flow to the business.

You might have existing documentation or business plans that provide a mapping of flows to business processes. Sometimes user manuals, training materials, or system specifications can provide insights into the intended use and purpose of the workload and its flows. If not, you need to map flows to the business processes they support. Here are recommendations to identify business processes for each flow:

- **Use workload outputs**. You can use the workload outputs and flow breakdown to correlate flows with the business processes they support. First, review the outputs the workload generates. The output could be sales reports, data files, or completed tasks.

- **Conduct interviews**. Speak with team members and stakeholders who interact with the workload. You should ask specific questions about their daily tasks, how they use the workload, and what objectives they achieve with it. Technical teams often have a deeper understanding of the workload structure and can provide insights into the business processes it supports.

- **Monitor workload usage**. For existing workloads, monitor the workload and look for patterns in usage that indicate underlying business processes, such as data entry, order processing, or customer interaction.

- **Connect the output to a business process**. Connect the dots from the flow outputs to the overall business process they support. For example, if a flow step involves processing customer orders, then it directly supports the business process of order fulfillment. Order fulfillment contributes to the business objectives of maintaining customer satisfaction and generating revenue. Finally, use the flow breakdown to help determine which flow created the sales report.

### Identify process owners and stakeholders for each flow

The process owner for a flow is the individual who's responsible for the successful execution of a given process. They're responsible for that process and the flows that support it. You should identify the process owner for each workload flow. You should also identify the stakeholders for each flow. Stakeholders can be involved in the workload, have dependencies on a flow, or manage a dependency that the flow has.

You might have a responsibility assignment matrix (RAM) or Responsible, Accountable, Consulted, and Informed (RACI) matrix that already identifies process owners and stakeholders. Typically, process owners are responsible or accountable for a process, and you consult or inform stakeholders.

### Identify escalation paths for each flow

The identification of escalation paths is about determining channels for escalating issues related to a flow. Issues that need escalation could be urgent updates, security concerns, degradations, or technical incidents. The goal of identifying an escalation path is to ensure timely and effective resolution of issues.

The escalation path you map out should start with the person or group most likely to resolve a particular issue. If this person or group can't resolve the issue, the escalation path should identify the next point of contact. The next point of contact has broader responsibilities and can coordinate mitigation strategies with more parts of the organization. The number of people on an escalation path varies by flow and organization. Too many people on an escalation path can slow the resolution efforts.

### Identify the business impact of each flow

The identification of the business impact of each flow is essential for understanding how each flow contributes to key business objectives. Business impact could include performance improvement, direct or indirect cost savings, risk mitigation, or business transformation. By understanding both the positive and negative impact of each flow, you can prioritize efforts to ensure the reliability of the flows that matter the most to your business. It's important to consider the direct impact of flow failure and its indirect effect on other interconnected processes. Here are steps to identify the business impact of each flow:

- **Identify positive impact**. Determine the expected benefits when a flow runs as intended. The expected benefits could include improved operational efficiency and effectiveness, increased customer or employee satisfaction, improved data security, ensuring compliance with regulatory requirements, or any other positive effect on the business.

- **Identify negative impact**. Assess the potential negative impacts if a process fails or doesn't work as expected. Consider quantifying specific losses, such as revenue drops. Include subjective effects like damage to reputation, erosion of customer trust, or adverse effects on other related business processes.

- **Define capacity and availability assumptions**. Establish assumptions about the expected capacity and availability of each process. Consider factors like expected business hours and target percentage uptime. If there are expectations for recovery time objective (RTO) or recovery point objective (RPO), you should include these expectations. These assumptions help in understanding reliability requirements of each flow.

By systematically evaluating these aspects, you can gain a comprehensive view of how each flow impacts the business and make strategic decisions about reliability optimization.

### Assign a criticality rating to each flow

A detailed evaluation of flow importance relative to the overall business impacts allows you to assign a criticality rating to each flow. The purpose is to sort the flows by priority and assign a label that allows you to identify the critical flows. This process is a logical continuation of identifying, mapping, and aligning with business processes and impact. Use the following criticality descriptions to assign your critical ratings:

- **Critical (high criticality)**: Critical flows are integral to core business functions. They directly affect critical aspects of a business such as customer experience, financial transactions, security protocols, human health, and safety. The failure or disruption of these flows could lead to significant immediate or long-term negative effects. Examples of negative effects include loss of revenue, breach of trust, and legal issues. Prioritizing these flows ensures that the most crucial aspects of the workload are robust and resilient.

- **Important (medium criticality)**: Important flows fulfill part of a business function but don't directly interface with or affect critical business operations. For example, if an issue disrupts an internal data processing flow, you can retry the data processing without immediate external effects. These flows are essential for smooth operations but offer a buffer in terms of immediate customer or financial effect, allowing for managed responses to issues.

- **Productivity (low criticality)**: Productivity flows don't have a direct or significant effect on the core business functions or customer experience. Examples include ancillary processes and small team use cases like transferring files regularly to backup storage or processing feedback surveys. While these flows contribute to the overall system, their disruption is unlikely to cause significant immediate business or operational issues, and often a manual workaround exists.

By following this structured approach to assigning criticality, you can effectively prioritize resources and focus on maintaining and enhancing the reliability and effectiveness of your most critical flows.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: Higher expectations for reliability sometimes coincide with higher operational costs and management burden for operators. Ensure that stakeholders understand the potential cost increases of improving the reliability of critical flows.

## Example flow catalog

The following example provides a complete scenario and illustrates important points to help you identify, map, and prioritize your flows. The example workload is a line-of-business app for expense reporting, which enables employees to fill in expense forms, managers to review and approve the expenses, and auditors to review weekly reports.

:::image type="content" source="media/identify-flows/image1.png" alt-text="Example business process flowchart showing the steps of filling in the expense report, getting it approved, entering the data into the accounting system, and creating reports.":::

### User flow 1: Fill in the expense form

**Flow description**: Employees use the application to fill in the expense form.

- **Business processes**: This flow supports **filling in and submitting the expense form**, but it's asynchronous, making it less critical.

- **Process owner**: Business admin

- **Stakeholders**: Employees, line manager, business admin

- **Escalation paths**: Application team, platform team

- **Business impact**: This flow is important for employees to claim expenses, but it doesn't directly influence the main revenue stream of the business or have a direct customer impact. When employees are unable to create expense claims due to unavailability of this flow, it doesn't have a negative impact on the revenue or reputation of the company. Employees can file expenses at a later time. A prolonged downtime might lead to credit card surcharges if payments of expenses are missed. However, high availability isn't essential for this process. The business admins specified a requirement of 90% availability for this process and are agreeable to downtime outside of business hours for maintenance purposes.

- **Criticality rating**: Productivity (Low)

### User flow 2: Review and approve expenses

**Flow description**: Line managers of the employee review and approve the expense claim.

- **Business processes**: This flow supports the **reviewing and approving of expense claims**, but it's an asynchronous process.

- **Process owner**: Business admin

- **Stakeholders**: Employees, line manager, business admin

- **Escalation path**: Application team, platform team

- **Business impact**: This flow allows line managers to review and approve expense claims and request more details. High availability of this flow isn't critical, since line managers have seven days to approve expense claims. When employees are unable to create expense claims due to unavailability of this flow, it doesn't have a negative impact on the revenue or reputation of the company. Employees can file expenses at a later time. A prolonged downtime might lead to credit card surcharges if payments of expenses are missed. However, high availability isn't essential for this process. The business admins specified a requirement of 90% availability for this process and are agreeable to downtime outside of business hours for maintenance purposes.

- **Criticality rating**: Productivity (Low)

### User flow 3: Enter and post transactions

**Flow description**: Business admins need to review expenses and post transactions for credit cards to be paid.

- **Business processes**: This flow supports the payment of credit card charges.

- **Process owner**: Business admin

- **Stakeholders**: Business admin, platform team, data team

- **Escalation path**: Platform team, data team, platform team on-call engineer

- **Business impact**: This flow is integral to paying expenses, and missing payments could lead to credit card charges. However, there's usually enough time between expenses being filed and payment being due. The business admins specified a requirement of 90% availability for this process and are agreeable to downtime outside of business hours for maintenance purposes.

- **Criticality rating**: Medium

### System flow 4: Create weekly expense report

**Flow description**: A weekly report of expenses is created for the CFO to review. The report is generated and published to Power BI, and a notification is sent to the CFO.

- **Business processes**: This flow supports the review of expenses.

- **Process owner**: CFO

- **Stakeholders**: Business admin, all technical teams

- **Escalation path**: Application team on-call engineer, platform team on-call engineer, data team on-call engineer

- **Business impact**: Unavailability of this flow doesn't affect the revenue or reputation of the company. The business admins specified a requirement of 90% availability for this process and are agreeable to downtime outside of business hours for maintenance purposes.

- **Criticality rating**: Medium

### User flow 5: Audit expenses

**Flow description**: External auditors perform just-in-time audits of expenses to check whether the reports meet compliance requirements.

- **Business processes**: This flow directly supports the **compliance and auditing processes**. Without this functionality, the company might face fines from external auditors.

- **Process owner**: Platform team

- **Stakeholders**: Platform team, operations team, business admins

- **Escalation path**: Platform team on-call engineer

- **Business impact**: This flow requires high availability because external auditors can request reporting of expenses without warning or notification. If this flow isn't available, it could lead to fines. It's a key process that the business expects 99.9% uptime for, including during extended business hours.

- **Criticality rating**: High

## Power Platform facilitation

Use [Plan designer](/power-apps/maker/plan-designer/plan-designer) to describe your business case in natural language and provide information, like business process flows or screenshots of legacy systems. Plan designer will then generate a complete Power Platform solution tailored to your needs. Plan designer also generates process diagrams to help you clarify user interactions.

Consider using [process mining and task mining in Power Automate](/power-automate/process-advisor-overview) including a [process map](/power-automate/process-advisor-visualize), a powerful tool that can help you visualize and analyze your business processes.

## Reliability checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

---

## Failure mode analysis recommendation for Power Platform workloads

Source: [failure-mode-analysis.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/failure-mode-analysis)

*Learn how to identify potential failure points within your Power Platform workload and plan mitigation actions accordingly.*

# Recommendations for performing failure mode analysis

**Applies to this Power Platform Well-Architected Reliability checklist recommendation:**

| [RE:03](checklist.md) | **Use failure mode analysis (FMA) to identify and prioritize potential failures in your solution components. Perform FMA to help you assess the risk and effect of each failure mode. Determine how the workload responds and recovers.** |
| --- | --- |

This guide describes the best practices for performing failure mode analysis (FMA) for your workload. FMA is the practice of identifying potential points of failure within your workload and the associated flows and planning mitigation actions accordingly. At each step of the flow, you identify the blast radius of multiple failure types, which helps you design a new workload or refactor an existing workload to minimize the widespread effect of failures.

A key tenet of FMA is that failures happen no matter how many layers of resiliency you apply. More complex environments are exposed to more types of failures. Given this reality, FMA allows you to design your workload to withstand most types of failures and recover gracefully when a failure occurs.

If you skip FMA altogether or perform an incomplete analysis, your workload is at risk of unpredicted behavior and potential outages caused by suboptimal design.

**Definitions**

| Term | Definition |
| --- | --- |
| Failure mode | A type of problem that can cause one or more workload components to be degraded or severely affected to the point of being unavailable. |
| Mitigation | The activities that you have identified to address problems either proactively or reactively. |
| Detection | Your data and app monitoring and alerting processes and procedures. |

## Key design strategies

In the context of FMA, understanding the prerequisites is crucial. Begin by reviewing and implementing recommendations for identifying flows, prioritizing them based on criticality. Your data artifacts play a pivotal role in describing the data paths within these flows. As you delve into the FMA approach, focus on planning components for critical flows, identifying dependencies (both internal and external), and devising mitigation strategies.

### Prerequisites

Review and implement the [recommendations for identifying and rating flows](identify-flows.md). It's assumed that you have identified and prioritized user and system flows based on criticality.

The data that you have gathered and the artifacts that you have created in your work provide you with a concrete description of your data paths involved throughout the flows. To be successful in your FMA work, accuracy and thoroughness in your artifacts is critical.

### FMA approach

After you determine the critical flows, you can plan their required components. Next, follow each flow step by step to identify dependencies, including third-party services and potential points of failure, and plan your mitigation strategies.

#### Decompose the workload

As you move from ideation to design, you need to identify the component types that are required to support your workload. Your workload determines the necessary components that you must plan for.

After you create your initial architecture design, you can overlay your flows to identify the discrete components that are used in those flows and create lists or workflow diagrams that describe the flows and their components. To understand the criticality of the components, use the criticality definitions that you have assigned to the flows. Consider the effect of a component malfunction on your flows.

#### Identify dependencies

Identify your workload dependencies to perform your single-point-of-failure analysis. Decomposing your workload and overlaying flows provides insight into dependencies that are internal and external to the workload.

Internal dependencies are components in the workload scope that are required for the workload to function. Typical internal dependencies include APIs or secret/key management solutions like Azure Key Vault. For these dependencies, capture the reliability data, like availability service-level agreements (SLAs) and scaling limits. External dependencies are required components outside the scope of the workload, such as another application or third-party service. Typical external dependencies include authentication solutions, like Microsoft Entra ID, and Power Platform infrastructure.

Identify and document the dependencies in your workload and include them in your flow documentation artifacts.

### Failure points

In your workload's critical flows, consider each component and determine how that component, and its dependencies, might be affected by a failure mode. Remember that there are many failure modes to consider when planning for resiliency and recovery. Any one component can be affected by more than one failure mode at any given time. These failure modes include:

- Regional outage: An entire Power Platform or Azure region is unavailable
- Service outage: One or more Power Platform or Azure services are unavailable
- Distributed denial-of-service (DDoS) or other malicious attack
- App or component misconfiguration
- Operator error
- Planned maintenance outage
- Component overload

Consider the likelihood of each type of failure mode. Some are very unlikely, like multi-zone or multi-region outages, and adding mitigation planning beyond redundancy isn't a good use of resources and time.

#### Mitigation

Mitigation strategies fall into two broad categories: building more resiliency and designing for degraded performance.

Building more resiliency means ensuring that your application design follows best practices for durability; for example, breaking up monolithic applications into isolated apps and microservices and using platform-provided resiliency configurations, like retry policies. For more information, see [Recommendations for redundancy](/azure/well-architected/reliability/redundancy) and [Recommendations for self-preservation](/azure/well-architected/reliability/self-preservation).

To design for degraded performance, identify potential failure points that might disable one or more components of your flow but don't fully disable that flow. To maintain the functionality of the end-to-end flow, you might need to reroute one or more steps to other components or accept that a failed component runs a function, so the function is no longer available in the user experience. To return to the e-commerce application example, a failed component like a microservice might cause your recommendation engine to be unavailable, but the customers can still search for products and complete their transaction.

You also need to plan mitigation around dependencies. Strong dependencies play a critical role in application function and availability. If they're absent or experiencing a malfunction, there might be significant effect. The absence of weak dependencies might only affect specific features and not affect overall availability. This distinction reflects the cost to maintain the high availability relationship between the service and its dependencies. Classify dependencies as either strong or weak to help you identify which components are essential to the application.

If the application has strong dependencies that it can't operate without, the availability and recovery targets of these dependencies should align with the targets of the application itself. If the application lifecycle is closely coupled with the lifecycle of its dependencies, the operational agility of the application might be limited, particularly for new releases.

#### Detection

Failure detection is essential to ensure that you have correctly identified failure points in your analysis and properly planned your mitigation strategies. Detection in this context means the monitoring of your infrastructure, data, and application, and alerting when issues arise. Automate detection as much as possible, and build redundancy into your operations processes to ensure that alerts are always caught and are responded to quickly enough to meet your business requirements. For more information, see [Recommendations for monitoring](./monitoring-alerting-strategy.md).

#### Outcome

For the outcome of your analysis, create a set of documents that effectively communicate your findings, the decisions that you have made relative to the flow components and mitigation, and the effect of the failure on your workload.

In your analysis, prioritize the failure modes and mitigation strategies that you have identified based on severity and likelihood. Use this prioritization to focus your documentation on those failure modes that are common and severe enough to warrant spending the time, effort, and resources on designing mitigation strategies around. For example, there might be some failure modes that are very rare in occurrence or detection. Designing mitigation strategies around them isn't worth the cost.

Refer to the [example table](#example) for a documentation starting point.

During your initial FMA exercise, the documents you produce will be mostly theoretical planning. The FMA documents should be reviewed and updated regularly to ensure that they stay up to date with your workload. Chaos testing and real-world experiences will help you refine your analyses over time.

## Example

The following table shows an FMA example for an expense application that's hosted as a Power Apps canvas app with a Microsoft Dataverse backend and APIs hosted in APIM to interact with a third party system.

**User flow**: User sign in, submission of expense claim, and interaction with expense report

| Component | Risk | Likelihood | Effect/Mitigation/Note | Outage |
|---|---|---|---|---|
| Microsoft Entra ID | Service outage | Low | Full workload outage. Dependent on Microsoft to remediate. | Full |
| Microsoft Entra ID | Misconfiguration | Medium | Users unable to sign in. No downstream effect. Help desk reports configuration issue to identity team. | None |
| Power Apps | Service outage | Low | Full outage for external users. Dependent on Microsoft to remediate. | Full |
| Power Apps | Regional outage | Very low | Full outage for external users. Dependent on Microsoft to remediate. | Full |
| Power Apps | DDoS attack | Medium | Potential for disruption. Microsoft manages DDoS (L3 and L4) protection. | Potential for partial outage |
| Dataverse | Service outage | Low | Full workload outage. Dependent on Microsoft to remediate. | Full |
| Dataverse | Regional outage | Very low | Auto-failover group fails over to secondary region. Potential outage during failover. Recovery time objectives (RTOs) and recovery point objectives (RPOs) to be determined during reliability testing. | Potential full |
| Dataverse | Malicious attack (injection) | Medium | Minimal risk. | Potential low risk |
| API Management | Service outage | Low | Full outage for external users. Dependent on Microsoft to remediate. | Full |
| API Management | Regional outage | Very low | Full outage for external users. Dependent on Microsoft to remediate. | Full |
| API Management | DDoS attack | Medium | Potential for disruption. Microsoft manages DDoS (L3 and L4) protection. | Potential for partial outage |
| Your Power Platform solution | Misconfiguration | Medium | Misconfigurations should be caught during deployment. If these happen during a configuration update, administrators must roll back changes. Configuration update causes a brief external outage. | Potential for full outage |

## Power Platform facilitation

Power Platform integrates with [Application Insights](/azure/azure-monitor/app/app-insights-overview), which is part of the [Azure Monitor](/azure/azure-monitor/overview) ecosystem. You can use this integration to:

- Subscribe to receive telemetry captured by the [Dataverse platform in Application Insights](/power-platform/admin/overview-integration-application-insights) on diagnostics, performance, and operations that applications perform on your Dataverse database and within model-driven apps. This telemetry provides information that you can use to diagnose and troubleshoot issues related to errors and performance.

- Connect your [canvas apps to Application Insights](/power-apps/maker/canvas-apps/application-insights) to use these analytics to diagnose issues, understand what users actually do with your apps, drive better business decisions, and improve the quality of your apps.

- Configure [Power Automate telemetry](/power-platform/admin/app-insights-cloud-flow) to flow into Application Insights. You can use this telemetry to monitor cloud flow executions and create alerts for cloud flow run failures.

- Capture telemetry data from your [Microsoft Copilot Studio agent](/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry) for use in Azure Application Insights. You can use this telemetry to monitor logged messages and events sent to and from your agent, topics to be triggered during user conversations, and custom telemetry events that can be sent from your topics.

Power Platform resources log activities in the [Microsoft Purview compliance portal](/purview/purview). Most events are available within 24 hours of the activity. Don't use this information for real-time monitoring. Learn more:

- [Power Apps](/power-platform/admin/logging-powerapps)
- [Power Automate](/power-platform/admin/logging-power-automate)
- [Copilot Studio](/microsoft-copilot-studio/admin-logging-copilot-studio)
- [Power Pages](/power-platform/admin/logging-power-pages)
- [Power Platform connectors](/power-platform/admin/connector-events-power-platform)
- [Data policy activity logging](/power-platform/admin/dlp-activity-logging)
- [View Power Platform administrative logs using auditing solutions in Microsoft Purview](/power-platform/admin/admin-activity-logging)
- [Dataverse auditing](/power-platform/admin/manage-dataverse-auditing)

## Reliability checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

---

## Define reliability targets recommendation for Power Platform workloads

Source: [metrics.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/metrics)

*Learn how to define a health model that includes availability and recovery target metrics for critical Power Platform workloads.*

# Recommendations for defining reliability targets

**Applies to this Power Platform Well-Architected Reliability checklist recommendation:**

|[RE:04](checklist.md)| **Define reliability and recovery targets for the components, the flows, and the overall solution. Visualize the targets to negotiate, gain consensus, set expectations, and drive actions to achieve the ideal state. Use the defined targets to build the health model. The health model defines what healthy, degraded, and unhealthy states look like.**  |
|---|---|

This guide describes the recommendations for defining availability and recovery target metrics for critical workloads. Reliability targets are derived through workshop exercises with business stakeholders.

The targets are improved through monitoring and testing. Work with your internal stakeholders to establish realistic expectations for reliability. This exercise will also help stakeholders support your architectural design choices and understand that you're designing to best meet the targets you agreed on.

Microsoft Power Platform handles most [infrastructure-level](/power-platform/admin/business-continuity-disaster-recovery) availability and reliability concerns for you. However, the availability of the workloads you build is a shared responsibility. It's important to understand that even with Microsoft's [commitment to high availability](https://servicetrust.microsoft.com/), the risk of system downtime is never zero.

Consider using the following metrics to quantify the business requirements.

| Term                      | Definition                                      |
|----------------------------------|------------------------------------------|
| Service-level objective (SLO)    | A percentage target that represents the health of the component and the reliability tier. The higher the tier, the more reliable the component. *Composite SLO* represents the aggregate target of the entire workload and accounts for the component SLOs. |
| Service-level indicator (SLI)    | A metric emitted by a service. SLI metrics are aggregated to quantify an SLO value. |
| Service-level agreement (SLA)    | A contractual agreement between the service provider and the service customer. The agreement defines the SLOs. Failure to meet the agreement might have financial consequences for the service provider.  |
| Mean time to recover (MTTR)      | The time taken to restore a component after a failure is detected.  |
| Mean time between failure (MTBF) | The duration for which the workload can perform the expected function without interruption, until it fails.  |
| Recovery time objective (RTO)    | The maximum acceptable time that an application can be unavailable after an incident.   |
| Recovery point objective (RPO)   | The maximum acceptable duration of data loss during an incident.   |

Define the workload's target values for these metrics in the context of user and system flows. [Identify and score those flows](identify-flows.md) by how critical they are to your requirements. Use the values to drive the design of your workload in terms of architecture, review, testing, and incident management operations. Failure to meet the targets will affect the business beyond the tolerance level.

## Key design strategies

Technical discussions shouldn't drive how you define reliability targets for your critical flows. Instead, business stakeholders should focus on their requirements and the expectations of the end users of the workload. Technical experts help the stakeholders assign realistic numerical values that meet those requirements. By exchanging information, technical experts enable discussion and agreement on feasible SLOs.

Consider an example of how to map requirements to measurable numerical values. Stakeholders estimate that for a critical user flow, an hour of downtime during regular business hours results in a loss of *X* dollars in monthly revenue. That dollar amount is compared to the estimated cost of designing a flow that has an availability SLO of 99.95 percent rather than 99.9 percent. Decision makers must discuss whether the risk of that revenue loss outweighs the added costs and management burden required to protect against it.

Follow this pattern as you examine flows and build a complete list of targets.

Remember that reliability targets differ from performance targets. Reliability targets focus on availability and recovery. To set reliability targets, start by defining the broadest requirements and then define more specific metrics to meet the high-level requirements.

Highest-level reliability and recovery requirements and correlated metrics might include, for example, an application availability of 99.9 percent for all regions or a target RTO of 5 hours for the Americas region. Defining these types of targets helps you identify which critical flows are involved in those targets. Then you can consider component-level targets.

### Availability metrics

Availability targets correspond to SLO, SLA, and SLI metrics.

#### SLOs and SLAs

Availability metrics correlate to SLOs, which you use to define SLAs. The workload SLO determines how much downtime is tolerable in a given period; for example, less than 1 hour per month. To make sure you can meet the SLO target, review the Microsoft SLAs for each component.

To establish your SLOs, think about:

- Non-functional requirements of your workload (for example, peak request rates, concurrent users) over the next 1-2 years.

- Available metrics on what you can measure, over a specific period of time. This data will inform what SLIs to specify.

After you gather the SLAs for the individual workload components, calculate a composite SLA. The composite SLA should match the workload's target SLO. Calculating a composite SLA involves several factors, depending on your architecture design.

Defining proper SLOs takes time and careful consideration. Business stakeholders should understand the reliability tolerance. This feedback should inform the targets.

#### SLA values

The following table defines common SLA values.

| SLA     | Downtime per week     | Downtime per month     | Downtime per year     |
|---------|-----------------------|------------------------|-----------------------|
| 99%     | 1.68 hours            | 7.2 hours              | 3.65 days             |
| 99.9%   | 10.1 minutes          | 43.2 minutes           | 8.76 hours            |
| 99.95%  | 5 minutes             | 21.6 minutes           | 4.38 hours            |
| 99.99%  | 1.01 minutes          | 4.32 minutes           | 52.56 minutes         |
| 99.999% | 6 seconds             | 25.9 seconds           | 5.26 minutes          |

When you think about composite SLAs in the context of user and system flows, remember that different user and system flows have different criticality definitions. Consider these differences when you build your composite SLAs. Noncritical flows might have components that you should omit from your calculations because they don't affect the customer experience if they're briefly unavailable.

#### SLIs

Think of SLIs as component-level metrics that contribute to an SLO. The most significant SLIs are the ones that affect your critical flows from the perspective of your customers. For many flows, SLIs include latency, throughput, error rate, and availability. A good SLI helps you identify when an SLO is at risk of being breached. Correlate the SLI to specific customers when possible.

To avoid collecting useless metrics, limit the number of SLIs for each flow. Aim for three SLIs per flow if possible.

### Recovery metrics

Recovery targets correspond to RTO, RPO, MTTR, and MTBF metrics. In contrast to availability targets, recovery targets for these measurements don't depend heavily on Microsoft SLAs. Microsoft publishes RTO and RPO guarantees only for some products, like [SQL Database](/azure/azure-sql/database/business-continuity-high-availability-disaster-recover-hadr-overview).

Definitions for realistic recovery targets rely on your [failure mode analysis](failure-mode-analysis.md) and your plans and testing for business continuity and [disaster recovery](disaster-recovery.md). Before you finish this work, discuss aspirational targets with stakeholders and ensure that your architecture design supports the recovery targets to the best of your understanding. Clearly communicate to stakeholders that any parts of the workload that aren't thoroughly tested for recovery metrics shouldn't have guaranteed SLAs. Make sure that stakeholders understand that recovery targets can change over time as workloads are updated. The workload can become more complex as you adopt new technologies to improve the user experience. These changes can increase or decrease your recovery metrics.

> [!NOTE]
> MTBF can be challenging to define and guarantee. Platforms as a service (PaaS) or software as a service (SaaS) can fail and recover without any notification from the cloud provider, and the process can be completely transparent to you. If you define targets for this metric, cover only components that are under your control.

### Building a health model

Use the data you gathered for your reliability targets to build your health model for each workload and associated critical flows. A health model defines *healthy*, *degraded*, and unhealthy* states for the flows and workloads. The states ensure appropriate operational prioritization. This model is also known as a *traffic light model*. The model assigns green for healthy, yellow for degraded, and red for unhealthy. A health model ensures that you know when a flow's state changes from healthy to degraded or unhealthy.

How you define healthy, degraded, and unhealthy states depends on your reliability targets. Here are some examples of ways you might define the states:

- A **green or healthy** state indicates that key nonfunctional requirements and targets are fully satisfied and that resources are used optimally.

- A **yellow or degraded** state indicates that one or more components of the flow are alerting against their defined threshold, but the flow is operational. For example, storage throttling has been detected.

- A **red or unhealthy** state indicates that degradation has persisted longer than allowable by your reliability targets or that the flow has become unavailable.

> [!NOTE]
> The health model shouldn't treat all failures the same. The health model should distinguish between *transient* and *nontransient* faults. It should clearly distinguish between expected-transient but recoverable failures and a true disaster state.

This model works by using a monitoring and alerting strategy that is developed and operated on the principles of continuous improvement. As your workloads evolve, your health models must evolve with them.

For detailed guidance about monitoring and alerting configurations, see the [health monitoring](monitoring-alerting-strategy.md) guide.

### Visualization

To keep your operations teams and workload stakeholders informed about the real-time status and overall trends of the workload health model, consider creating [dashboards](/azure/azure-monitor/visualize/tutorial-logs-dashboards) in your monitoring solution. Discuss visualization solutions with the stakeholders to ensure that you deliver the information that they value and that's easy to consume. They might also want to see generated reports weekly, monthly, or quarterly.

## Power Platform facilitation

Power Platform SLAs provide the Microsoft commitments for uptime and connectivity. Different services have different SLAs, and sometimes SKUs within a service have different SLAs. For more information, see [Service-level agreements for online services](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services).

The Power Platform SLA includes procedures for obtaining a service credit if the SLA isn't met, along with definitions of availability for each service. That aspect of the SLA acts as an enforcement policy.

Microsoft Business Applications provides Business Continuity and Disaster Recovery (BCDR) capabilities to all [production type](/power-platform/admin/environments-overview) environments in Dynamics 365 and Power Platform SaaS applications. [Learn how Microsoft ensures your production data is resilient during regional outages](/power-platform/admin/business-continuity-disaster-recovery).

## Organizational alignment

Cloud Adoption Framework provides guidance for recommendations for SLOs and SLIs related to monitoring across the organization.

For more information, see [Cloud monitoring SLOs](/azure/cloud-adoption-framework/manage/monitor/service-level-objectives#how-do-you-define-slis).

## Reliability checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

---

## Develop background jobs recommendation for Power Platform workloads

Source: [background-jobs.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/background-jobs)

*Learn how to develop background jobs that run automatically without the need for user interaction, to improve availability and reduce interactive response time.*

# Recommendations for developing background jobs

**Applies to this Power Platform Well-Architected Reliability checklist recommendation:**

| [RE:05](checklist.md) | **Strengthen the resiliency of your workload by implementing error handling and transient fault handling. Build capabilities into the solution to handle component failures and transient errors.** |
| --- | --- |

This guide describes the recommendations for developing background jobs. Background jobs run automatically without the need for user interaction. Many applications require background jobs that run independent of the user interface (UI).

Some examples of background jobs include batch jobs, intensive processing tasks, and long-running processes, such as workflows. The application starts the job and processes interactive requests from users.

For example, an application might need to generate a summary and extract sentiment and key points from documents that users upload. A background job can be performed to run the AI actions and save the summary and key points to the database. The user doesn't have to wait for the process to complete. As another example, a user might submit an expense claim, which initiates a background workflow that processes the expense claim and submits it for approval. The user can continue to file another expense claim or leave the application while the background job runs. After the background job finishes, it sends an email to the user to confirm the expense claim has been submitted for approval.

Background jobs help minimize the load on the application UI, which improves availability and reduces interactive response time.

## Key design strategies

To choose which task to designate as a background job, consider whether the task runs without user interaction and whether the UI needs to wait for the task to complete. Tasks that require the user or the UI to wait while they run are typically not appropriate background jobs.

### Types of background jobs

Some examples of background jobs are:

- Resource-intensive jobs that take a long time to complete, such as running a series of transactions.

- Batch jobs, such as nightly data updates or scheduled processing.

- Long-running workflows, such as order fulfillment or provisioning services and systems.

- Workflows that require asynchronous collaboration, such as approvals.

- Sensitive-data processing that transfers the task to a more secure location for processing. For example, you might not want to process sensitive data within a web app. Instead, you might use a pattern such as the [Gatekeeper pattern](/azure/architecture/patterns/gatekeeper) to transfer the data to an isolated background process that has access to protected storage.

### Triggers

Initiate background jobs with:

- [Event-driven triggers](#event-driven-triggers): An event, either a user action in the application or an event that occurs against a data source, triggers the task.

- [Schedule-driven triggers](#schedule-driven-triggers): A schedule that's based on a timer invokes the task. The job can be scheduled on a recurring basis or for a single run.

#### Event-driven triggers

An action triggers an event-driven invocation that starts the background task. Examples of event-driven triggers include:

- The UI or a different job triggers the background job and passes data from the performed action to the background job. For example, a user submits an expense claim via a form, and the form details are passed to the background job for processing.

- The UI or a different job saves or updates a value that's in storage. The background job monitors the storage and detects changes, such as new values being added or existing values being modified, and triggers the background job based on that change.

- The UI or a different job makes a request to an endpoint, such as an HTTPS URI or an API that's exposed as a web service. As part of the request, the UI or job transfers the data that the background task requires. The endpoint or web service invokes the background task, which uses the data as its input.

Other examples of event-driven triggers include a form being submitted in an application, a new row being added to the data store, a trigger phrase in an agent starting a topic that calls a flow, the value of a field changing in the data store, an email with a specific subject or from a specific sender arriving in the inbox, and a file being uploaded to a file storage location.

Use trigger conditions to streamline your workflows and reduce the number of unnecessary runs. Trigger conditions set up multiple conditions that must be met before a workflow is triggered.

>[!NOTE]
>Make sure to use trigger conditions to prevent endless loops if, as part of the workflow, you change the data source that starts the workflow. For example, the application might change fields in a Microsoft Dataverse table row, and the workflow perform additional queries based on those changed fields, further modifying the same row. Use trigger conditions to start the workflow only when fields that are changed by the application are updated, but not any other fields.

#### Schedule-driven triggers

A timer triggers a schedule-driven invocation that starts the background task. Examples of schedule-driven triggers include:

- A background job runs on a daily or weekly basis and performs a set of actions.

- A separate process or application starts a timer that invokes the background task after a time delay or at a specific time.

Other examples of tasks that are suited to schedule-driven invocation include batch-processing routines (such as updating related products lists for customers based on their recent behavior), routine data-processing tasks (such as generating accumulated results), data analysis for daily reports, data retention cleanup, and data consistency checks.

### Return results

Background jobs run asynchronously in a separate process from the UI or the process that invoked the background job. Ideally, background jobs are *fire and forget* operations. Their runtime progress doesn't influence the UI or the calling process, which means that the calling process doesn't wait for the tasks to complete. The UI and the calling process can't detect when the task ends.

If you require a background task to communicate with the calling task to indicate progress or completion, you must implement a mechanism such as:

- Write a status indicator value to storage that's accessible to the UI or the caller task, which can monitor or check this value. Other data that the background task returns to the caller can be placed in the same storage.

- Expose an API or endpoint from the background task that the UI or caller can access to obtain status information. The response can include the data that the background task returns to the caller.

- Configure the background task to respond with the status or the data that it processed back to the UI.

### Coordination

Background tasks can be complex and require multiple tasks to run. In these scenarios, it's common to divide the task into smaller discrete steps or subtasks that multiple consumers can run. Multistep jobs are more efficient and more flexible because individual steps are often reusable in multiple jobs. It's also easy to add, remove, or modify the order of the steps.

It can be a challenge to coordinate multiple tasks and steps, but there are three common patterns to guide your solution:

- **Decompose a task into multiple reusable steps**. An application might be required to perform various tasks of different complexity on the information that it processes. A straightforward but inflexible approach to implementing such an application is to perform this processing as a monolithic module. But this approach is likely to reduce the opportunities for refactoring the code, optimizing it, or reusing it if the application requires parts of the same processing elsewhere.

- **Manage the orchestration of the steps for a task**. An application might perform tasks that comprise many steps, some of which might invoke remote services or access remote resources. Sometimes the individual steps are independent of each other, but they're orchestrated by the application logic that implements the task.

- **Manage the recovery for task steps that fail**. If one or more of the steps fail, an application might need to undo the work that a series of steps performs, which together defines an eventually consistent operation.

### Resiliency considerations

Create resilient background tasks to provide reliable services for the application. When you plan and design background tasks, consider the following points:

- Background tasks need to gracefully handle restarts without corrupting data or introducing inconsistency into the application. For long-running or multistep tasks, consider using *checkpoints*. Use checkpoints to save the state of jobs in persistent storage or as messages in a queue and configure retry logic in case of unexpected failures of an action.

- When you use queues to communicate with background tasks, the queues can act as a buffer to store requests that are sent to the tasks while the application is under higher than usual load. The tasks can catch up with the UI during less busy periods, and restarts don't block the UI.

### Scaling and performance considerations

Background tasks must offer sufficient performance to ensure that they don't block the application or delay operation when the system is under load. Typically, performance improves when you scale the compute instances that host the background tasks. When you plan and design background tasks, consider the following points related to scalability and performance:

- Background jobs might affect the user experience if the results of the background tasks are presented to the user. For example, background jobs might require the user to wait for a notification, refresh the page, or manually check the status of the task. These behaviors can increase the complexity of the user interaction and negatively affect the user experience. Consider alternatives to responding data back to the UI, such as sending a notification via email or Microsoft Teams, or including the ability to check for status updates in your UI. In our example of submitting expense forms, rather than responding the status back to the UI, you could have a page in the application that lists all submitted expense forms with their status and the ability to trigger a refresh.

- Background jobs can create challenges for data synchronization and process coordination, especially if the background tasks depend on each other or on other data sources. For example, background jobs might handle data consistency problems, race conditions, deadlocks, or timeouts.

- To prevent the loss of performance under load, you might implement logic so that a single point of the processing chain doesn't cause a bottleneck. Consider other limitations, such as the maximum throughput of workflow actions, storage, and other services that the application and the background tasks rely on.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: Background jobs introduce more components and dependencies to the system, which can increase the complexity and maintenance costs of the solution. For example, background jobs might require a separate monitoring service and retry mechanism.

## Example

[Use Dataverse background operations](/power-platform/architecture/reference-architectures/dataverse-background-operations) provides example scenarios and a generalized example architecture to illustrate how to use background operations in Dataverse.

## Power Platform facilitation

The following sections describe the services that you can use to host, run, configure, and manage background jobs.

### Power Automate

[Power Automate cloud flows](/power-automate/flow-types) are workflows that run in the cloud. They can be automated flows that are triggered by an event, such as the arrival of an email from a specific person. They can be instant flows that you start with a click of a button, like a reminder to your team that you send from your mobile device. They can be scheduled flows that run at a certain time, such as a daily data upload to SharePoint or a database. You can also automate repetitive tasks from your desktop or mobile device.

Get familiar with the [limits of automated, scheduled, and instant flows](/power-automate/limits-and-config) with regards to throughput, request, concurrency, looping, and debatching. Make sure that you take these limits into consideration as you design your workflow.

Reduce the risk by [planning for error handling](/power-automate/guidance/planning/reducing-risk).

Here are some examples of where you can use Power Automate flows to run background jobs:

- [Canvas apps](/power-apps/maker/canvas-apps/working-with-flows)
- [Agents](/microsoft-copilot-studio/advanced-flow)
- [Custom pages](/power-apps/maker/model-driven-apps/commanding-designer-use-custom-pages-as-dialogs)
- [Command bar actions](/power-apps/maker/model-driven-apps/command-designer-overview#key-differences-between-classic-and-modern-commands)

### Microsoft Dataverse

[Microsoft Dataverse calculated columns and rollups](/power-apps/developer/data-platform/calculated-rollup-attributes):

- [Formula columns](/power-apps/maker/data-platform/formula-columns?tabs=type-or-paste) are columns that display a calculated value in a Microsoft Dataverse table.

- Calculated columns automate manual calculations used in your business process. For example, a salesperson might want to know the weighted revenue for an opportunity, which is based on the estimated revenue from an opportunity multiplied by the probability. Or, they want to automatically apply a discount if an order is greater than a certain amount. A calculated column can contain values such as the result of simple math operations, or conditional operations such as greater than or if-else.

- Rollup columns help users obtain insights into data by monitoring key business metrics. A rollup column contains an aggregate value that's computed over the rows that are related to a specified row. This includes regular tables and activity tables such as emails and appointments. In more complex scenarios, you can aggregate data over the hierarchy of rows. As an administrator or customizer, you can define rollup columns by using the customization tools in Power Apps, without needing to write code.

[Background operations](/power-apps/developer/data-platform/background-operations?tabs=sdk) can send requests that Dataverse processes asynchronously. Background operations are useful when you don't want to maintain a connection while a request runs.

[Plug-ins](/power-apps/developer/data-platform/plug-ins) are custom event handlers that execute in response to a specific event raised during processing of a Microsoft Dataverse data operation.

Microsoft Dataverse also offers a powerful solution for achieving more efficient data architecture and reducing client-side workload through [low-code plug-ins](/power-apps/maker/data-platform/low-code-plug-ins?tabs=automated). These plug-ins are reusable, real-time workflows that execute a specific set of commands within Dataverse, running server-side and triggered by personalized event handlers.

## Reliability checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

---

## Handle transient faults recommendation for Power Platform workloads

Source: [handle-transient-faults.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/handle-transient-faults)

*Learn how to strengthen the resiliency of your Power Platform workload by implementing transient fault handling.*

# Recommendations for handling transient faults

**Applies to this Power Platform Well-Architected Reliability checklist recommendation:**

|[RE:05](checklist.md)| **Strengthen the resiliency of your workload by implementing error handling and transient fault handling. Build capabilities into the solution to handle component failures and transient errors.** |
|---|---|

This guide describes the recommendations for handling transient faults in your cloud applications. All applications that communicate with remote services and resources must be sensitive to transient faults. This is especially true for applications that run in the cloud, where, because of the nature of the environment and connectivity over the internet, this type of fault is likely to be encountered more often. Transient faults include the momentary loss of network connectivity to components and services, the temporary unavailability of a service, and timeouts that occur when a service is busy. These faults are often self-correcting, so, if the action is repeated after a suitable delay, it's likely to succeed.

## Key design strategies

Transient faults can occur in any environment, on any platform or operating system, and in any kind of application.

### Challenges

Transient faults can have a significant effect on the perceived availability of an application, even if it's been thoroughly tested under all foreseeable circumstances. To ensure that your Power Platform workload can operate reliably, you need to ensure that it can respond to the following challenges:

- The application must be able to detect faults when they occur and determine if the faults are likely to be transient, are long-lasting, or are terminal failures. Different resources are likely to return different responses when a fault occurs, and these responses can also vary depending on the context of the operation. For example, the response for an error when the application is retrieving data from a custom connector might be different from the response when the application is running a cloud flow and waiting for the response.

- The application must be able to retry the operation if it determines that the fault is likely to be transient.

- The application must use an appropriate strategy for retries. The strategy specifies the number of times the application should retry, the delay between each attempt, and the actions to take after a failed attempt. The appropriate number of attempts and the delay between each one are often difficult to determine. The strategy varies depending on the type of resource and on the current operating conditions of the resource and the application.

### General guidelines

The following guidelines can help you design suitable transient fault handling mechanisms for your applications.

#### Determine if there's a built-in retry mechanism

Some services you're connecting to might already provide a transient fault handling mechanism. The retry policy it uses is typically tailored to the nature and requirements of the target service. Alternatively, REST interfaces for services might return information that can help you determine whether a retry is appropriate and how long to wait before the next retry attempt.

You should use the built-in retry mechanism when one is available, unless you have specific and well-understood requirements that make a different retry behavior more appropriate.

#### Determine if the operation is suitable for retrying

Perform retry operations only when the faults are transient (typically indicated by the nature of the error) and when there's at least some likelihood that the operation will succeed when retried. There's no point in retrying operations that attempt an invalid operation, like updating a row in Microsoft Dataverse that doesn't exist or that the user doesn't have permission to, or calling an API endpoint that doesn't exist.

Implement retries only when you can determine the full effect of doing so and when the conditions are well understood and can be validated. Remember that the errors returned from resources and services outside your control might evolve over time, and you might need to revisit your transient fault detection logic.

When you develop individual components or services that are called from your applications, make sure to return error codes and messages that help clients determine whether they should retry failed operations. Consider indicating whether the client should retry the operation; for example, by returning an **isTransient** value. If you build a web service, consider returning custom errors that are defined within your service contracts.

#### Determine an appropriate retry count and interval

Optimize the retry count and the interval to the type of use case. If you don't retry enough times, the application can't complete the operation and will probably fail. If you retry too many times, or with too short an interval between tries, the application might hold resources for long periods, which adversely affects the health of the application.

Adapt values for the time interval and the number of retry attempts to the type of operation. For example, if the operation is part of a user interaction, the interval should be short and only a few retries should be attempted. By using this approach, you can avoid making users wait for a response. If the operation is part of a long-running or critical workflow, where canceling and restarting the process is expensive or time-consuming, it's appropriate to wait longer between attempts and retry more times.

Keep in mind that determining the appropriate intervals between retries is the most difficult part of designing a successful strategy. Typical strategies use the following types of retry interval:

- **Exponential interval**. The application waits a short time before the first retry and then exponentially increases the time between each subsequent retry. For example, it might retry the operation after 3 seconds, 12 seconds, 30 seconds, and so on.

- **Fixed intervals**. The application waits for the same period of time between each attempt.

- **Immediate retry**. Sometimes a transient fault is brief, and retrying the operation immediately is appropriate because it might succeed if the fault is cleared in the time that it takes the application to send the next request. However, there should never be more than one immediate retry attempt. You should switch to alternative strategies, like exponential interval or fallback actions, if the immediate retry fails.

As a general guideline, use an exponential interval strategy for background operations, and use immediate or fixed interval retry strategies for interactive operations. In both cases, you should choose the delay and the retry count so that the maximum latency for all retry attempts is within the required end-to-end latency requirement.

Consider the combination of all factors that contribute to the overall maximum timeout for a retried operation. These factors include the time it takes for a failed connection to produce a response, the delay between retry attempts, and the maximum number of retries. The total of all these times can result in long overall operation times, especially when you use an exponential delay strategy where the interval between retries grows rapidly after each failure. If a process must meet a specific service-level agreement (SLA), the overall operation time, including all timeouts and delays, must be within the limits defined in the SLA.

Don't implement overly aggressive retry strategies. These are strategies that have intervals that are too short or retries that are too frequent. They can have an adverse effect on the target resource or service. These strategies might prevent the resource or service from recovering from its overloaded state, and it will continue to block or refuse requests. This scenario results in a vicious circle, where more and more requests are sent to the resource or service. Consequently, its ability to recover is further reduced.

Consider the timeout of the operations when you choose retry intervals to avoid launching a subsequent attempt immediately (for example, if the timeout period is similar to the retry interval).

Use the type of error or the error codes and messages returned from the service to optimize the number of retries and the interval between them. For example, some exceptions or error codes (like the HTTP code 503, Service Unavailable, with a Retry-After header in the response) might indicate how long the error might last, or that the service failed and won't respond to any subsequent attempt.

#### Avoid anti-patterns

In most cases, avoid implementations that include duplicated layers of retry code. Avoid designs that include cascading retry mechanisms or that implement retry at every stage of an operation that involves a hierarchy of requests, unless you have specific requirements to do so. In these exceptional circumstances, use policies that prevent excessive numbers of retries and delay periods, and make sure you understand the consequences. For example, say one component makes a request to another, which then accesses the target service. If you implement retry with a count of three on both calls, there are nine retry attempts in total against the service. Many services and resources implement a built-in retry mechanism. You should investigate how you can disable or modify these mechanisms if you need to implement retries at a higher level.

Never implement an endless retry mechanism. Doing so is likely to prevent the resource or service from recovering from overload situations and to cause throttling and refused connections to continue for a longer time.

Never perform an immediate retry more than once.

Avoid using a fixed retry interval when you access services and resources on Azure, especially when you have a high number of retry attempts. The best approach in this scenario is an exponential interval strategy.

#### Test your retry strategy and implementation

Fully test your retry strategy under as wide a set of circumstances as possible, especially when both the application and the target resources or services that it uses are under extreme load. To check behavior during testing, you can:

- Inject transient and nontransient faults into the service. For example, send invalid requests or add code that detects test requests and responds with different types of errors.

- Create a mockup of the resource or service that returns a range of errors that the real service might return. Cover all the types of errors that your retry strategy is designed to detect.

- For custom services that you create and deploy, force transient errors to occur by temporarily disabling or overloading the service. (Don't attempt to overload any shared resources or shared services in Azure.)

- When testing a client web application's resiliency to transient faults, use the browser's developer tools or your testing framework's ability to [mock](https://playwright.dev/docs/network) or [block](/microsoft-edge/devtools-guide-chromium/network/) network requests.

- Perform high load factor and concurrent tests to ensure that the retry mechanism and strategy work correctly under these conditions. These tests also help ensure that the retry doesn't have an adverse effect on the operation of the client or cause cross-contamination between requests.

#### Manage retry policy configurations

A *retry policy* is a combination of all the elements of your retry strategy. It defines the detection mechanism that determines whether a fault is likely to be transient, the type of interval to use (like fixed or exponential), the actual interval values, and the number of times to retry.

Take advantage of built-in or default retry strategies but only when they're appropriate for your scenario. These strategies are typically generic. In some scenarios, they might be all you need, but in other scenarios they don't offer the full range of options to suit your specific requirements. To determine the most appropriate values, you need to perform testing to understand how the settings affect your application.

#### Log and track transient and nontransient faults

As part of your retry strategy, include exception handling and other instrumentation that logs retry attempts. An occasional transient failure and retry are expected and don't indicate a problem. Regular and increasing numbers of retries, however, are often an indicator of a problem that might cause a failure or that degrades application performance and availability.

Log transient faults as warning entries rather than as error entries so that monitoring systems don't detect them as application errors that might trigger false alerts.

Consider storing a value in your log entries that indicates whether retries are caused by throttling in the service or by other types of faults, like connection failures, so that you can differentiate them during analysis of the data. An increase in the number of throttling errors is often an indicator of a design flaw in the application or the need to add premium capacity to the environment.

Consider implementing a telemetry and monitoring system that can raise alerts when the number and rate of failures, the average number of retries, or the overall times elapsed before operations succeed is increasing.

#### Manage operations that continually fail

Consider how to handle operations that continue to fail at every attempt. Situations like this are inevitable.

Although a retry strategy defines the maximum number of times that an operation should be retried, it doesn't prevent the application from repeating the operation with the same number of retries. For example, submitting a form in your application might trigger a flow. The retry strategy might detect a connection timeout and consider it to be a transient fault. The flow will retry the operation a specified number of times and then give up. However, when the same or a new user tries to submit the form again, the operation is attempted again, even though it might continue to fail.

The application can periodically test the service, on an intermittent basis and with long intervals between requests, to detect when it becomes available. An appropriate interval depends on factors like the criticality of the operation and the nature of the service. It might be anything between a few minutes and several hours. When the test succeeds, the application can resume normal operations and pass requests to the newly recovered service.

In the meantime, you might be able to perform some alternative operations based on the hope that the service will be available soon. For example, it might be appropriate to store requests for the service in a queue or data store and retry them later. Or you might have to return a message to the user to indicate that the application isn't available.

#### Other considerations

When you're deciding on the values for the number of retries and the retry intervals for a policy, consider whether the operation on the service or resource is part of a long-running or multistep operation. It might be difficult or expensive to compensate for all the other operational steps that have already succeeded when one fails. In this case, a long interval and a large number of retries might be acceptable, as long as that strategy doesn't block other operations by holding or locking scarce resources.

Consider whether retrying the same operation could cause inconsistencies in data. If some parts of a multistep process are repeated and the operations aren't idempotent, inconsistencies might occur. For example, if an operation that inserts a record into Microsoft Dataverse is repeated, it might cause incorrect values in the table. Or, if you repeat an operation that sends a notification to the user, they might receive duplicate messages.

Consider the scope of operations that are retried. For example, it might be easier to implement retry code at a level that encompasses several operations and retry them all if one fails. However, doing so might result in idempotency issues or unnecessary rollback operations.

If you choose a retry scope that encompasses several operations, consider the total latency of all of them when you determine retry intervals, when you monitor the elapsed times of the operation, and before you raise alerts for failures.

## Power Platform facilitation

The following sections describe the mechanisms you can use to manage transient faults.

### Power Automate

Power Automate includes a feature to retry an action if it fails. Configure this on a per-action level. [Learn about reducing risk and planning for error handling in a Power Automate project](/power-automate/guidance/planning/reducing-risk). Power Automate also offers actions to return custom errors and data to the calling app or flow.

Some transient flows can be caused by throughput and request limits. Learn about the [limits of automated, scheduled, and instant flows](/power-automate/limits-and-config) and [request limits and allocations](/power-platform/admin/api-request-limits-allocations).

[Configure error and exception handling in cloud flows](/training/modules/error-handling/) by using scopes and run-after settings.

### Power Apps

Power Apps canvas apps provide the capability to [check the connection status](/power-platform/power-fx/reference/signals), allowing them to behave differently if the app is offline. [Learn how to develop offline-capable canvas apps](/power-apps/maker/canvas-apps/offline-apps).

You can also [use Error, IfError, IsError, and IsBlankOrError functions](/power-platform/power-fx/reference/function-iferror) in canvas apps to decide what to do next if an error occurs.

Learn more about transient fault handling in Power Apps:

- [Mobile offline overview](/power-apps/mobile/mobile-offline-overview)
- [Mobile offline for canvas apps](/power-apps/mobile/canvas-mobile-offline-overview)

### Azure and custom connectors

If your workload connects to Azure services, [learn how to handle transient faults using the Azure Well-Architected Framework](/azure/well-architected/reliability/handle-transient-faults).

To manage custom connector responses to errors, follow [coding standards](/connectors/custom-connectors/coding-standards).

### Application Insights

Use the Application Insights integrations to log errors in Power Automate and Power Apps:

- [Set up Application Insights with Power Automate (preview)](/power-platform/admin/app-insights-cloud-flow)
- [Analyze system-generated logs using Application Insights in Power Apps](/power-apps/maker/canvas-apps/application-insights)

## Related information

- [Business continuity and disaster recovery for Dynamics 365 SaaS apps](/power-platform/admin/business-continuity-disaster-recovery)
- [Power Automate coding guidelines](/power-automate/guidance/coding-guidelines/)
- [Use Dataverse background operations](/power-platform/architecture/reference-architectures/dataverse-background-operations)

## Reliability checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

---

## Design a reliability testing strategy recommendation for Power Platform workloads

Source: [testing-strategy.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/testing-strategy)

*Learn how to establish a reliability testing strategy that tests resiliency and availability scenarios.*

# Recommendations for designing a reliability testing strategy

**Applies to this Power Platform Well-Architected Reliability checklist recommendation:**

|[RE:06](checklist.md)| **Test for resiliency and availability scenarios by applying the principles of chaos engineering in your test and production environments. Use testing to ensure that your graceful degradation implementation strategies are effective by performing active malfunction and simulated load testing.** |
|---|---|

This guide describes the recommendations for designing a reliability testing strategy to validate and optimize the reliability of your workload. Reliability testing focuses on the resiliency and availability of your workload, specifically the critical flows that you identify when you design your solution. This guide provides general testing guidance and guidance that's specific to fault injection and chaos engineering.

**Definitions**

| Term | Definition |
| --- | --- |
| Availability | The amount of time that an application workload runs in a healthy state without significant downtime. |
| Chaos engineering | The practice of subjecting applications and services to real-world stresses and failures. The goal of chaos engineering is to build and validate resilience to unreliable conditions and missing dependencies. |
| Fault injection | The act of introducing an error to a system to test the resiliency of the system. |
| Recoverability | A synonym for resiliency. |
| Resiliency | An application workload's ability to withstand and recover from failure modes. |

## Key design strategies

Testing is essential to ensure that your workload meets its reliability targets and can handle failures gracefully. Fault injection is a type of testing that deliberately introduces faults or stress into your system to simulate real-world scenarios. By using fault injection and chaos engineering techniques, you can proactively discover and fix issues before they affect your production environment. This section provides general guidance on testing, fault injection, and chaos engineering for your workload.

### General testing guidance

Routinely perform testing to validate existing thresholds, targets, and assumptions. When a major change occurs in your workload, run regular testing. Perform most testing in testing and staging environments. It's also beneficial to run a subset of tests against the production system.

Automate testing to help ensure consistent test coverage and reproducibility. Automate common testing tasks and integrate them into your build processes. Manually testing software is tedious and susceptible to error, but you can conduct manual exploratory testing. For cases in which you need to develop automated testing, use manual testing to determine the scope of the tests to develop.

Adopt a shift-left testing approach to perform resiliency and availability testing early in the development cycle.

Adapt a simple documentation format, so it's easy for everyone to understand the process and the results of every regular test.

Share the documented results with the appropriate teams, like operational teams, technology leadership, business stakeholders, and disaster recovery stakeholders. The results should inform the refinement of reliability targets, such as service-level objectives (SLOs), service-level agreements (SLAs), recovery time objectives (RTOs), and recovery point objectives (RPOs).

Create a regular testing cadence for your backups. Restore the data to isolated systems to help ensure that the backups are valid and that restores are functional.

Document and share recovery time metrics with your disaster recovery stakeholders to ensure that expectations for recovery are appropriate.

Use industry-standard deployment testing procedures to help ensure that you have an automated, predictable, and efficient deployment process.

Test your workload's ability to withstand transient failures. For more information, see [Recommendations for handling transient faults](./handle-transient-faults.md).

Test how your workload handles failures in dependent services or other dependencies by using fault injection.

Test your [disaster recovery plan](disaster-recovery.md) to respond to catastrophic failures and other major incidents.

Test your workload's ability to degrade gracefully and minimize the blast radius of component malfunction by using fault injection.

### Take advantage of planned and unplanned outages

When your workload is offline due to planned maintenance or an unplanned outage, you have a unique opportunity to perform testing and improve your understanding of your workload. The following sections provide recommendations for each scenario.

#### Planned maintenance

When you have planned maintenance windows for updates or patches, you can test components and flows that aren't involved in the maintenance work. Perform tests without the potential risk of unexpectedly degrading the workload or taking it offline altogether. If you have enough time during your maintenance window, you can also test the components and flows that are involved in the maintenance after the maintenance work is complete.

#### Unplanned outage

Use every outage incident as an opportunity to learn more about your workload and improve its resiliency by following these steps, ordered by priority:

1. Get the workload back online for your users. You might need to perform a workaround for the issue, resolve the issue, or initiate the recovery processes.

1. Determine the root cause of the outage and address it. If you can fix the root cause as part of the investigation, document the root cause and the measures that you took to fix it. If the issue requires taking another maintenance window later, ensure that your mitigation measures can handle the expected load by thoroughly testing them. Ensure that you have set up sufficient monitoring to cover your mitigation measures.

1. If applicable, look for the same issue, or configuration weaknesses that might be affected by similar issues, across all the components in your workload. Use this opportunity to proactively address those components. Consult your incident history to detect patterns of similar issues across your workload.

1. Use your findings to improve your testing strategy. Ensure that you have successfully addressed the root cause and similar problems by directly testing the same failure.

### Fault injection and chaos engineering guidance

Fault injection testing follows the principles of chaos engineering by highlighting the workload's ability to react to component failures. Perform fault injection testing in preproduction and production environments. Apply the information that you learned from [performing failure mode analysis](failure-mode-analysis.md) to ensure that you test only faults that you prioritize and that you have mitigation strategies that address faults.

The key guidelines of chaos engineering are:

- **Be proactive.** Don't wait for failures to happen. Try to anticipate failures by conducting chaos experiments to discover and fix issues before they affect your production environment.

- **Embrace failure.** Accept and learn from the failures that occur in your system. See failures as a natural part of complex systems and use them as opportunities to learn and improve your system's reliability.

- **Break the system.** Deliberately inject faults or stress into your system to test its resilience. Simulate real-world failures or disruptions to test and improve your workload's recovery capabilities.

- **Build immunity.** Use chaos engineering experiments to improve your workload's ability to prevent and recover from failures.

Chaos engineering is an integral part of workload team culture and an ongoing practice, not a short-term tactical effort in response to a single outage. Follow this standard method when you design your chaos experiments:

1. Start with a hypothesis. Each experiment should have a clear goal, like testing a flow's ability to withstand the loss of a particular component.

1. Measure baseline behavior. Ensure that you have consistent reliability and performance metrics for the flow and components involved in an experiment to compare with the degraded state when running your experiment.

1. Inject a fault or faults. The experiment should intentionally target specific components that can be recovered quickly, and you should have an informed expectation of the effect that the fault injection will cause to help control the experiment's blast radius.

1. Monitor the resulting behavior. Gather telemetry about the individual flow components and the end-to-end flow behavior that the experiment targets to properly understand the effects of the fault. Compare the metrics that you gather with the baseline metrics for a full picture of the fault injection results.

1. Document the process and observations. Keeping detailed records of your experiments will inform future decisions about the workload design, ensuring that you address the gaps that have been revealed over time.

1. Identify and act on the result. Plan for remediation steps that can be added to your workload backlog as improvements. Ensure that design improvement plans are reviewed and tested in nonproduction environments according to the same processes as other deployments.

Periodically validate your process, architecture choices, and code to quickly detect technical debt, integrate new technologies, and adapt to changing requirements.

When you conduct fault-injection experiments, you:

- Confirm that monitoring is in place and alerts are set up.

- Validate your process of assigning a directly responsible individual (DRI) to take ownership of an incident.

- Ensure that your documentation and investigation processes are up to date.

Integrate the following recommendations and considerations to optimize your chaos testing strategy:

- Challenge system assumptions. With testing, you try to improve the resiliency of your workload and your workload design strategies. Look for opportunities to inject faults into components and flows that you assume are reliable based on past experiences. They might not be reliable in your new workload.

- Validate change. Without thorough testing, including fault injection testing, you might have an incomplete picture of your workload after changes are made. For example, you might introduce new dependencies that aren't immediately apparent.

- Use SLA buffers. Limit chaos testing to stay within your SLAs and avoid potential adverse effects from outages. Your flow and component recovery targets help define the scope of your testing.

- Establish an error budget as an investment in chaos and fault injection. Your error budget is the difference between achieving 100% of the SLO and achieving the agreed-on SLO.

- Stop the experiment if it goes beyond scope. Unknown results are an expected outcome of chaos experiments. Strive to achieve balance between collecting substantial result data and affecting as few production users as possible.

- Work closely with development teams to ensure the relevance of the injected failures. Use past incidents or issues as a guide. Examine dependencies and evaluate the results when you remove those dependencies.

- Identify and document previously undiscovered dependencies between different components within your workload that are revealed through chaos testing.

- Adjust recovery plans as necessary to account for dependencies that are discovered during chaos testing.

- Use the results from your experiments and tests as the basis for new experiments and tests. As unexpected behaviors arise, new tests might target those behaviors directly and give you the opportunity to design remediation strategies for them.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: Fault injection testing in production can be disruptive and can potentially cause downtime. Be transparent with stakeholders about this possibility and ensure that you have safeguards in place to terminate experiments and rollback plans to quickly reverse the failures that you introduce.

## Power Platform facilitation

You can use [static results in Power Automate](/azure/logic-apps/test-logic-apps-mock-data-static-results?tabs=consumption#set-up-mock-outputs-on-an-action) to return a fixed result to test your workload.

You can use [Power Platform Playwright samples](../../developer/playwright-samples/overview.md) to test all types of Power Apps.

[Azure Test Plans](/azure/devops/test/overview) is an easy-to-use, browser-based test management solution that provides all the capabilities required for planned manual testing, user acceptance testing, exploratory testing, and gathering feedback from stakeholders.

If your workload includes Azure resources, you can use [Azure Chaos Studio](https://azure.microsoft.com/services/chaos-studio), a managed service that uses chaos engineering to help you measure, understand, and improve your cloud application and service resilience.

If your workload includes a Microsoft Copilot Studio agent, you can use the [Copilot Agent Kit](/microsoft-copilot-studio/guidance/kit-overview) to configure agents and tests. By running individual tests against the Copilot Studio APIs (Direct Line), the agent responses are evaluated against expected results.

## Related information

- [Power Apps coding guidelines - Monitoring and testing](/power-apps/guidance/coding-guidelines/monitoring-testing)

## Reliability checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

---

## Design a disaster recovery strategy recommendation for Power Platform workloads

Source: [disaster-recovery.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/disaster-recovery)

*Learn how to design a disaster recovery strategy for a Power Platform workload and prepare to handle incidents and outages.*

# Recommendations for designing a disaster recovery strategy

**Applies to this Power Platform Well-Architected Reliability checklist recommendation:**

|[RE:07](checklist.md)| **Implement structured, tested, and documented business continuity and disaster recovery (BCDR) plans that align with the recovery targets. Plans must cover all components and the system as a whole.**  |
|---|---|

This guide describes recommendations for designing a reliable disaster recovery strategy for a workload. To meet internal service-level objectives (SLOs) or even a service-level agreement (SLA) that you have guaranteed for your customers, you must have a robust and reliable disaster recovery strategy. Failures and other major issues are expected. Your preparations to deal with these incidents determine how much your customers can trust your business to reliably deliver for them. A disaster recovery strategy is the backbone of preparation for major incidents.

**Definitions**

| Term | Definition |
| --- | --- |
| Failover | The automated and/or manual shifting of production workload traffic from an unavailable region to an unaffected region. |
| Failback | The automated and/or manual shifting of production workload traffic from a failover region back to the primary region. |

## Key design strategies

This guide assumes that you have already performed the following tasks as part of your reliability planning:

- Identify [critical and noncritical flows](identify-flows.md).

- Perform [failure mode analysis (FMA)](failure-mode-analysis.md) for your flows.

- Identify [reliability targets](metrics.md).

- Design a robust [testing strategy](testing-strategy.md).

A reliable workload architecture is the basis for a reliable disaster recovery (DR) strategy. Consider reliability at every stage of creating your workload to make sure that you have the needed components for efficient recovery before you begin planning your DR strategy. This foundation ensures that your workload's reliability goals, such as recovery time objective (RTO) and recovery point objective (RPO), are practical and attainable.

## Maintain a disaster recovery plan

The key to a reliable DR strategy for a workload is the *DR plan*. Your plan should be a living document that's regularly revised and updated as your environment changes. Share the plan with the relevant teams (operations, technology leadership, and business stakeholders) regularly (for example, every six months). Keep it in a highly available, secure data store like OneDrive.

Follow these recommendations to develop your DR plan:

- Clearly define what constitutes a disaster and requires activation of the DR plan.

    Disasters are large-scale issues. They might be regional outages, outages of services like Microsoft Entra ID or Azure DNS, or severe malicious attacks like ransomware attacks or DDoS attacks.

    Include examples of failure modes that aren't considered disasters, such as the unavailability or failure of a single resource, in your DR plan so that operators don't mistakenly invoke their DR escalations.

- Build the DR plan on your FMA documentation. Ensure that your DR plan captures the failure modes and mitigation strategies for outages that are defined as disasters. If updates are required, update both your DR plan and your FMA documents at the same time so they're accurate when the environment changes or when testing uncovers unexpected behaviors.

- Clearly define roles and responsibilities within the workload team and understand any related external roles within your organization. If the disaster is caused by the outage of an external service, such as Microsoft Entra ID, ensure that you have a role defined that's responsible for communication with the external party and can share updates with the workload team. Roles should include:

  - The party responsible for declaring a disaster
  - The party responsible for declaring incident closure
  - Operations roles
  - Testing and validation roles
  - Internal and external communications roles
  - Retrospective and root-cause analysis (RCA) lead roles

- Define the escalation paths that the workload team must follow to ensure that recovery status is communicated to stakeholders.

- Include the prescribed order in which components of the workload should be recovered to cause the least impact. For example, recover databases and restart cloud flows before you recover the application.

  - Detail each component's recovery procedure as a step-by-step guide. Include screenshots if possible, and prerequisites for running the procedure. For example, list the required scripts or credentials that need to be gathered.

  - Define your team's responsibilities versus your cloud hosting provider's responsibilities. For example, Microsoft is responsible for restoring a PaaS (platform as a service), but you're responsible for rehydrating data and applying your configuration to the service.

  - Capture the root cause of the incident and perform mitigation before you start recovery. For example, if the cause of the incident is a security issue, mitigate that issue before you recover the affected systems in your failover environment.

- If you need to redeploy your app in the failover environment, use tooling to automate the deployment process as much as possible. Ensure that your Azure Pipelines are predeployed and correctly configured in the failover environments so that you can immediately begin your deployments. Use automated end-to-end deployments, with manual approval gates where necessary, to ensure a consistent and efficient deployment process. When a stage of the deployment process requires manual intervention, document the manual steps. Clearly define roles and responsibilities.

- Automate as much of the procedure as you can. Use retry logic to avoid wasting time on scripts that are stuck on a broken task. Because you run these scripts only in emergencies, you don't want incorrectly developed scripts to cause more damage or slow down your recovery process.

> [!NOTE]
> Automation poses risks. Trained operators need to monitor the automated processes carefully and intervene if any process encounters issues. To minimize the risk that automation will react to false positives, be thorough in your DR drills. Test all phases of the plan. Simulate detection to generate alerting, and then move through the entire recovery procedure.

## Conduct disaster recovery drills

A DR testing practice is essential for a good DR plan. Many industries have compliance frameworks that demand regular DR drills. Regardless of your industry, frequent DR drills are crucial for your success.

Follow these recommendations for successful DR drills:

- Perform at least one production DR drill per year. Dry run drills or nonproduction drills help ensure that the parties involved are familiar with their roles and responsibilities. These drills also help operators build familiarity by following recovery processes. But only production drills truly test the validity of the DR plan and the RTO and RPO metrics. Use your production drills to time recovery processes for components and flows to ensure that the RTO and RPO targets that have been defined for your workload are achievable. For functions that are out of your control, like Microsoft Entra ID outages, ensure that the RTO and RPO targets for the flows that involve those functions account for possible delays beyond your control.

- Use dry run drills to educate new operators about DR processes and procedures. Senior operators should take time to let new operators perform their role and should watch for improvement opportunities. If a new operator is hesitant or confused by a step in a procedure, review that procedure to ensure that it's clearly written.

### Considerations

Performing DR drills in production can cause unexpected catastrophic failures. Be sure to test recovery procedures in nonproduction environments during your initial deployments.

Give your team as much maintenance time as possible during drills. When planning for maintenance time, use the recovery metrics that you capture during testing as *minimum time necessary* allotments.

As your DR drill practices mature, you learn which procedures you can run in parallel and which you must run in sequence. Early in your drill practices, assume that every procedure must be run in sequence and that you need extra time in each step to handle unanticipated issues.

## Failover capabilities

Microsoft Business Applications provide business continuity and disaster recovery (BCDR) capabilities to all [production](/power-platform/admin/environments-overview) environments in Dynamics 365 and Power Platform software as a service (SAAS) applications. [Learn how Microsoft ensures your production data is resilient during regional outages](/power-platform/admin/business-continuity-disaster-recovery).

## Power Platform facilitation

[Self-service disaster recovery](/power-platform/admin/business-continuity-disaster-recovery) enables you to define, test, and execute a cross-region failover approach for your Power Platform environments. This approach helps you meet compliance requirements and ensures that your workloads continue to run during an unexpected region-wide issue.

With self-service disaster recovery, you control when to execute failover drills to meet compliance requirements and when to perform emergency failovers and failbacks. Perform drills on a copy of the production environment because this process involves downtime that can last several minutes. For example, copy the production environment to a sandbox environment, and then change its type to production.

## Related information

- [Plan mission critical workloads](/power-platform/guidance/adoption/plan-mission-critical)
- [Build a disaster recovery plan](/power-platform/guidance/adoption/plan-disaster-recovery)

## Reliability checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

---

## Design a reliable monitoring and alerting strategy recommendation for Power Platform workloads

Source: [monitoring-alerting-strategy.md](https://learn.microsoft.com/en-us/power-platform/well-architected/reliability/monitoring-alerting-strategy)

*Learn how to design a monitoring and alerting strategy that supports the reliability requirements of your Power Platform workload.*

# Recommendations for designing a reliable monitoring and alerting strategy

**Applies to this Power Platform Well-Architected Reliability checklist recommendation:**

|[RE:08](checklist.md)| **Measure and publish the solution's health indicators. Continuously capture uptime and other reliability data from across the workload and also from individual components and key flows.**  |
|---|---|

This guide describes the recommendations for designing a reliable monitoring and alerting strategy. Implement this strategy to keep your operations teams informed of your environment's health status and ensure that you meet the established reliability targets for your workload.

**Definitions**

| Term | Definition |
| --- | --- |
| Metrics | Numerical values that are collected at regular intervals. Metrics describe some aspects of a system at a particular time. |
| Resource logs | Data that a system generates about the state of the system. |
| Traces | Data that provides information about the path that a request travels through services and components. |

## Key design strategies

Before you create a monitoring and alerting strategy, perform the following tasks for your workload as part of your reliability planning:

- Identify [critical and noncritical flows](./identify-flows.md).

- Perform [failure mode analysis (FMA)](failure-mode-analysis.md) for your flows.

- Identify [reliability targets](metrics.md).

- Design a robust [testing strategy](testing-strategy.md).

Create a monitoring and alerting strategy to provide awareness to your operations teams so that they're notified of changes in your workload's condition and can quickly address issues. The health model for your critical flows and for workloads that include critical flows should define healthy, degraded, and unhealthy states. Design your monitoring posture to immediately catch changes in these states. When health states change from healthy to degraded or unhealthy, alerting mechanisms should trigger automatic recovery measures and alerts to the responsible teams.

Implement the following recommendations to design a monitoring and alerting strategy that meets the requirements of your business.

### General guidance

Understand the difference between [metrics](/azure/azure-monitor/essentials/data-platform-metrics), [logs](/azure/azure-monitor/logs/data-platform-logs), and [traces](/azure/azure-monitor/app/asp-net-trace-logs).

Enable [logging](/azure/azure-monitor/essentials/resource-logs) for all cloud resources. Use automation and governance in your deployments to enable diagnostic logging throughout your environment.

Forward all diagnostic logs to a centralized data sink and analytics platform, like a [Log Analytics workspace](/azure/azure-monitor/logs/log-analytics-workspace-overview). If you have regional data sovereignty requirements, you must use local data sinks in the regions that are subject to those requirements.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: There are cost implications for storing and querying logs. Notice how your log analysis and retention affects your budget, and determine the best balance of utilization to meet your requirements.

If your workloads are subject to one or more compliance frameworks, some of the component logs that handle sensitive information are also subject to those frameworks. Send the relevant component logs to a security information and event management (SIEM) system, like [Microsoft Sentinel](/azure/sentinel/overview).

Create a [log retention policy](/azure/azure-monitor/logs/data-retention-archive) that incorporates long-term retention requirements that the compliance frameworks impose on your workload.

Use [structured logging](https://stackify.com/what-is-structured-logging-and-why-developers-need-it) for all log messages to optimize querying the log data.

Configure alerts to trigger when values pass critical thresholds that correlate to a health model state change, like green to yellow or red. Threshold configuration is a practice of continuous improvement. As your workload evolves, the thresholds you define might change.

Consider using alerts when states improve, such as red to yellow or red to green, so that the operations teams can track these events for future reference.

Visualize the real-time health of your environment by using [custom dashboards](/azure/azure-monitor/visualize/tutorial-logs-dashboards).

Use data that's gathered during incidents to continuously improve your [health models](metrics.md).

Incorporate [cloud platform monitoring and alerting services](/power-platform/admin/check-online-service-health), including platform-level health.

Incorporate purpose-built advanced monitoring and analytics that your cloud provider offers, like Azure Monitor [insight tools](/azure/azure-monitor/overview).

Implement backup and recovery monitoring to capture:

- The data replication status to ensure that your workload achieves recovery within the target recovery point objective (RPO).  
- Successful and failed backups and recoveries.  
- The recovery duration to inform your [disaster recovery planning](disaster-recovery.md).

### Monitor applications and agents

Log data while the application or agent runs in the production environment. You need sufficient information to diagnose the cause of issues in the production state.

Log events at service boundaries. Include a correlation ID that flows across service boundaries. If a transaction flows through multiple services and one of them fails, the correlation ID helps you track requests across your application and pinpoint why the transaction failed.

Separate application and agent logging from auditing. Audit records are commonly maintained for compliance or regulatory requirements and must be complete. To avoid dropped transactions, maintain audit logs separate from diagnostic logs.

Use white box monitoring to instrument the application or agent with semantic logs and metrics. Collect application- and agent-level metrics and logs, such as memory consumption or request latency, from the application or agent to inform a health model and to detect and predict issues.

Use black box monitoring to measure platform services and the resulting customer experience. Black box monitoring tests externally visible application or agent behavior without knowledge of the internals of the system. This approach is common for measuring customer-centric service-level indicators (SLIs), service-level objectives (SLOs), and service-level agreements (SLAs).

### Monitor data and storage

Monitor the availability metrics of your storage containers. When this metric drops below 100%, it indicates failing writes. Transient drops in availability might happen when your cloud provider manages the load. Track the availability trends to determine if there's an issue with your workload. In some cases, a drop in the availability metrics for a storage container indicates a bottleneck in the compute layer that's associated with the storage container.

There are many metrics to monitor for databases. In the context of reliability, the important metrics to monitor include:

- Query duration
- Timeouts
- Wait times
- Memory pressure
- Locks

## Example

[Distributed tracing across multiple services in Power Platform](/power-platform/architecture/key-concepts/distributed-tracing) provides an example scenario and visual representation of how to trace events across multiple services. This guidance provides practical applications and use cases for distributed tracing and explains how to implement it across multiple services in Power Platform.

## Power Platform facilitation

Use the [Monitor](/power-platform/admin/monitoring/monitoring-overview) area of the Power Platform admin center to measure and improve operational health metrics of apps and flows. The Monitor experience is available to both makers and admins. Makers use the data to improve their resources. Admins use it to understand aggregate operational health in the tenant or in specific environments. The purpose of the Monitor area of the Power Platform admin center is to bring attention to resources that have degraded operational health and highlight resources that have opportunities for improvement.

Power Platform integrates with [Application Insights](/azure/azure-monitor/app/app-insights-overview), which is part of the [Azure Monitor](/azure/azure-monitor/overview) ecosystem. You can use this integration to:

- Subscribe to receive telemetry captured by the [Dataverse platform in Application Insights](/power-platform/admin/overview-integration-application-insights) on diagnostics, performance, and operations that applications perform on your Dataverse database and within model-driven apps. This telemetry provides information that you can use to diagnose and troubleshoot issues related to errors and performance.

- Connect your [canvas apps to Application Insights](/power-apps/maker/canvas-apps/application-insights) to use these analytics to diagnose issues, understand what users actually do with your apps, drive better business decisions, and improve the quality of your apps.

- Configure [Power Automate telemetry](/power-platform/admin/app-insights-cloud-flow) to flow into Application Insights. You can use this telemetry to monitor cloud flow executions and create alerts for cloud flow run failures.

- Capture telemetry data from your [Microsoft Copilot Studio agent](/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry) for use in Azure Application Insights. You can use this telemetry to monitor logged messages and events sent to and from your agent, topics to be triggered during user conversations, and custom telemetry events that can be sent from your topics.

Power Platform resources log activities in the [Microsoft Purview compliance portal](/purview/purview). Most events are available within 24 hours of the activity. Don't use this information for real-time monitoring. Learn more:

- [Power Apps](/power-platform/admin/logging-powerapps)
- [Power Automate](/power-platform/admin/logging-power-automate)
- [Copilot Studio](/microsoft-copilot-studio/admin-logging-copilot-studio)
- [Power Pages](/power-platform/admin/logging-power-pages)
- [Power Platform connectors](/power-platform/admin/connector-events-power-platform)
- [Data policy activity logging](/power-platform/admin/dlp-activity-logging)
- [View Power Platform administrative logs using auditing solutions in Microsoft Purview](/power-platform/admin/admin-activity-logging)
- [Dataverse auditing](/power-platform/admin/manage-dataverse-auditing)

Your Power Platform workload may include Azure resources. To learn more about monitoring recommendations for Azure resources, see [Recommendations for designing and creating a monitoring system](/azure/well-architected/operational-excellence/observability).

The [Power Platform CoE Starter Kit](/power-platform/guidance/coe/starter-kit) is a reference implementation containing a collection of components and tools designed to help you get started with developing a strategy for adopting and supporting Power Platform. The kit provides automation and tooling to help teams build monitoring and automation necessary to support a CoE.

## Related information

[How do I check my online service health?](/power-platform/admin/check-online-service-health)

## Reliability checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Reliability checklist](checklist.md)

