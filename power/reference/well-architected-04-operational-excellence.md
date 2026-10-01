# Power Platform Well-Architected — Operational Excellence Pillar

Verbatim Markdown pulled directly from Microsoft's published documentation source, snapshot dated 20 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading, and transcluded `[!INCLUDE]` snippets are resolved inline where the include content was reachable. Source repository: `MicrosoftDocs/power-platform`, folder `power-platform/well-architected/operational-excellence/`. Covers OnStart discipline, release/deployment practices, and automation design principles Fable asked about at the framework level; canvas-app-specific OnStart guidance lives in guidance-01-coding-and-collaboration.md, already in this corpus.

Pages in this file: 15

## Contents

1. [Operational Excellence design principles](#operational-excellence-design-principles)
2. [Recommendation checklist for Operational Excellence](#recommendation-checklist-for-operational-excellence)
3. [Operational Excellence tradeoffs for Power Platform workloads](#operational-excellence-tradeoffs-for-power-platform-workloads)
4. [Recommendations for fostering fusion team culture](#recommendations-for-fostering-fusion-team-culture)
5. [Recommendations for formalizing routine and nonroutine tasks](#recommendations-for-formalizing-routine-and-nonroutine-tasks)
6. [Recommendations for formalizing software development management practices](#recommendations-for-formalizing-software-development-management-practices)
7. [Recommendations for standardizing tools and processes](#recommendations-for-standardizing-tools-and-processes)
8. [Recommendations for continuous integration](#recommendations-for-continuous-integration)
9. [Recommendations for designing a workload development supply chain](#recommendations-for-designing-a-workload-development-supply-chain)
10. [Recommendations for designing and creating a monitoring system](#recommendations-for-designing-and-creating-a-monitoring-system)
11. [Recommendations for designing an emergency response strategy](#recommendations-for-designing-an-emergency-response-strategy)
12. [Recommendations for implementing automation](#recommendations-for-implementing-automation)
13. [Recommendations for enabling automation in your workload](#recommendations-for-enabling-automation-in-your-workload)
14. [Recommendations for safe deployment practices](#recommendations-for-safe-deployment-practices)
15. [Recommendations for designing a deployment failure mitigation strategy](#recommendations-for-designing-a-deployment-failure-mitigation-strategy)

---

## Operational Excellence design principles

Source: [principles.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/principles)

*Understand the design principles of the Power Platform Well-Architected Operational Excellence pillar.*

# Operational Excellence design principles

The Operational Excellence pillar defines processes for development practices, monitoring, and release management. The goal is to establish standards that reduce development time, human error, and user disruption. By following fusion development practices, your team will also collaborate better.

To assess your operational health, start with these questions:

- How do you drive continuous improvement and learn from experience?
- Do you have development and deployment standards that reduce friction and drive consistency?
- Is your workload meeting user expectations and requirements?

Without standards and clear leadership, workload teams often resort to methods that don't follow best practices, which can lead to poor user and support experiences.

These design principles, based on the Operational Excellence principles in the [Microsoft Azure Well-Architected Framework](/azure/well-architected/reliability/principles), provide guidelines for operational strategies aimed at addressing root causes rather than merely treating symptoms. Start with the recommended approaches, and then observe what works and what doesn't to identify areas of improvement. After you set your strategy, continue to drive action by using the [Operational Excellence checklist](./checklist.md).

Your workload needs to meet both operational and business requirements. Efficient processes help the workload reach business goals while following compliance and governance standards. The key is to find repeatability with consistency.

If you meet these goals, workloads run reliably and predictably even during times of change. Not focusing on operational requirements might lead to failed and inconsistent deployments, added cost and time, and disrupted user experience.

## Embrace a fusion development and DevOps culture

|![Goal icon](../_images/goal.svg) Empower development and operations teams to continuously improve the workload and processes by working together with a mindset of collaboration, shared responsibility, and ownership.|
|--|

Gartner defines fusion development, or fusion teams development, as "distributed and multidisciplinary digital business teams that blend technology and other types of domain expertise." (Source: 2019 Gartner Digital Business Teams Survey.)

Fusion development is a strategy aimed at scaling application development by using low-code methodologies. Fusion development allows your business to build better applications faster, by bringing together professional developers with citizen, or low-code, developers. It can also include using low-code capabilities and combining them with code-first components to meet business needs and create fusion applications.

A good fusion development and DevOps culture fosters a collaborative environment of shared knowledge and thrives on shared responsibility. Development and operations teams who are aligned on goals and priorities keep business focus and goals in mind. Feedback is shared among all teams. For example, operations teams share feedback on supporting the workload with the development team to improve the workload over time. At the same time, IT professionals and operations teams establish a secure, governed environment that empowers citizen developers to achieve more with minimum friction.

DevOps practices assign clear roles and responsibilities to each team and streamline operational tasks so that they're efficient but not overwhelming. To maximize the value of DevOps, the culture should improve processes with technology and promote open communication within the organization.

Learn more in [Operational Excellence design principles](/azure/well-architected/operational-excellence/principles#embrace-devops-culture) in the Azure Well-Architected Framework.

## Establish development standards

|![Goal icon](../_images/goal.svg) Optimize productivity by standardizing development practices, enforcing quality gates, and tracking progress and success through systematic change management.|
|--|

Technology and coding standards, style guides, and tools are in place to drive consistency and easier maintenance. Quality assurance processes ensure that functional and nonfunctional requirements are met and emphasize testing early in the development life cycle. Effective processes are in place to standardize technical activities and drive consensus within the team and stakeholders. Developers are supported by standards and process but not burdened by them.

Learn more in [Operational Excellence design principles](/azure/well-architected/operational-excellence/principles#establish-development-standards) in the Azure Well-Architected Framework.

## Improve operations with monitoring and insights

|![Goal icon](../_images/goal.svg) Gain visibility into the workload, and use insights to make data-driven decisions.|
|--|

Continuously improve the quality of your workload by monitoring it in accordance with Power Platform Well-Architected pillars. Build a monitoring system that tracks every aspect of the workload. Collect data that you can learn from and that can drive improvements. Monitoring is key in proactive maintenance of the workload, quality and security assurance, performance and capacity planning, and product management. Efficient monitoring can reduce reactive cycles and incident response times.

Learn more in [Operational Excellence design principles](/azure/well-architected/operational-excellence/principles#evolve-operations-with-observability) in the Azure Well-Architected Framework.

## Deploy with confidence

|![Goal icon](../_images/goal.svg) Reach the desired state of deployment with predictability.|
|--|

Build a workload supply chain that enables you to consistently deploy your workload to all your environments. Choose tooling that is capable of automation, testing, monitoring, and versioning. Upskill your team so that they can use the chosen technology and increase productivity. Aim to achieve immutable assets that deploy through automation, and avoid configuration drift and manual changes in downstream environments.

Learn more in [Operational Excellence design principles](/azure/well-architected/operational-excellence/principles#deploy-with-confidence) in the Azure Well-Architected Framework.

## Automate for efficiency

|![Goal icon](../_images/goal.svg) Replace repetitive manual tasks with automation designed to complete tasks quicker, with greater consistency and accuracy, and reduce risk.|
|--|

Evaluate repetitive tasks that might be time-consuming and error-prone. Identify opportunities for automation to free up your team for higher-value tasks, increasing productivity and consistency. Design your automation with the same principles that you apply to your overall workload, avoiding anti-patterns and keeping security threats in mind.

Learn more in [Operational Excellence design principles](/azure/well-architected/operational-excellence/principles#automate-for-efficiency) in the Azure Well-Architected Framework.

## Adopt safe deployment practices

|![Goal icon](../_images/goal.svg) Implement guardrails in the deployment process to minimize the effect of errors or unexpected conditions.|
|--|

Standardize deployment of any changes by using automated deployment processes, such as pipelines. Consistent deployment methods ensure the deployment is completed safely, reliably, and with repeatability. Catch issues in early stages of deployment by testing changes rigorously. Ensure you have a mitigation strategy in place to quickly recover from deployment failures.

Learn more in [Operational Excellence design principles](/azure/well-architected/operational-excellence/principles#adopt-safe-deployment-practices) in the Azure Well-Architected Framework.

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendation checklist for Operational Excellence

Source: [checklist.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/checklist)

*Follow this checklist of recommendations that help you achieve an Operational Excellence approach in your Power Platform workload team.*

# Recommendation checklist for Operational Excellence

This checklist presents a set of recommendations to help you build a culture of operational excellence. Start with a fusion development and DevOps approach to integrate specializations from multiple disciplines. This approach creates a rigorous design and development practice that leads to repeatable, reliable, and safe deployments of infrastructure and code.

Prioritize human intervention in areas that benefit from it, and incorporate automation in other areas. Observability serves operational excellence by monitoring health events and validating the current workload design and implementation to inform future product development.

If you don't consider tradeoffs and recommendations for operational excellence, your workload might be at risk. Carefully consider the points covered in the following checklist to instill confidence in your design's success.

## Checklist

| &nbsp; | Code | Recommendation |
|-|-|-|
| &#9744; | [OE:01](fusion-culture.md) | **Determine workload team members' specializations, and integrate them into a robust set of practices** to design, develop, deploy, and operate your workload to specification. Team members must have clarity in decision making and responsibilities, value continuous improvement and optimization, and adopt a blameless culture that incorporates continuous learning. |
| &#9744; | [OE:02](formalize-operations-tasks.md) | **Formalize the way you run routine, as-needed, and emergency operational tasks** by using documentation, checklists, or automation. Strive for consistency and predictability for team processes and deliverables by adopting industry-leading practices and approaches, such as a "shift left" approach. |
| &#9744; | [OE:03](formalize-development-practices.md) | **Formalize software ideation and planning processes.** Draw from established industry and organizational standards. Use a common, prioritized backlog and sufficiently detailed specifications. Based on outcomes, drive continuous improvements in your planning process. |
| &#9744; | [OE:04](tools-processes.md) [OE:04](release-engineering-continuous-integration.md) | **Optimize software development and quality assurance processes** by following industry-proven practices for development and testing. For unambiguous role designation, standardize practices across components such as tooling, source control, application design patterns, documentation, and style guides. |
| &#9744; | [OE:05](workload-supply-chain.md) | **Build a workload supply chain that drives proposed changes** through predictable, automated pipelines. The pipelines test and promote those changes across environments. Optimize a supply chain to make your workload reliable, secure, cost-effective, and performant. |
| &#9744; | [OE:06](observability.md) | **Design and implement a monitoring system** to validate design choices and inform future design and business decisions. This system captures and exposes operational telemetry, metrics, and logs that are emitted from the workload. |
| &#9744; | [OE:07](emergency-response.md) | **Develop an effective emergency operations practice.** Ensure that your workload emits meaningful health signals. Collect the resulting data and use it to generate actionable alerts that enact emergency responses through dashboards and queries. Clearly define human responsibilities, such as on-call rotations, incident management, emergency resource access, and running postmortems. |
| &#9744; | [OE:08](automate-tasks.md) | **Automate all tasks that don't benefit from the insight and adaptability of human intervention, are highly procedural, and have a shelf-life that yields a return on automation investment.** When possible, choose off-the-shelf software for automation versus custom implementations. Treat all automation the same as workload components, and apply the Power Platform Well-Architected pillars to its design and implementation. |
| &#9744; | [OE:09](enable-automation.md) | **Design and implement automation up front** for operations such as life cycle concerns, and apply governance and compliance guardrails. Don't try to retrofit automation later. Choose automation features that your platform provides. |
| &#9744; | [OE:10](safe-deployments.md) | **Clearly define your workload's safe deployment practices.** Emphasize the ideals of small, incremental, quality-gated release methods. Use modern deployment patterns to control risk. Account for routine deployments and emergency, or hotfix, deployments. |
| &#9744; | [OE:11](mitigation-strategy.md) | **Implement a deployment failure mitigation strategy** that addresses unexpected mid-rollout issues with rapid recovery. Combine multiple approaches, such as rollback, feature disablement, or using your deployment pattern's native capabilities. |

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence tradeoffs](tradeoffs.md)

---

## Operational Excellence tradeoffs for Power Platform workloads

Source: [tradeoffs.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/tradeoffs)

*Learn about the Operational Excellence tradeoffs you might encounter when optimizing for the other Power Platform Well-Architected pillars.*

# Operational Excellence tradeoffs for Power Platform workloads

Operational Excellence supports workload quality through the implementation of clear team standards, understood responsibility and accountability, attention to customer outcomes, and team cohesion. The implementation of these goals is rooted in DevOps, which recommends minimizing process variance, reducing human error, and ultimately increasing the return of value for the workload. That value isn't only measured against the functional requirements served by the components of the workload. It's also measured by the value that the team delivers in striving for improvement.

During the design phase of a workload and over its life cycle as continuous improvement steps are taken, it's important to consider how decisions based on the [Operational Excellence design principles](./principles.md) and the recommendations in the [design review checklist for Operational Excellence](./checklist.md) might influence the goals and optimizations of other pillars. Certain decisions might benefit some pillars but constitute tradeoffs for others. This article describes example tradeoffs that a workload team might encounter when designing workload architecture and operations.

## Operational Excellence tradeoffs with Reliability

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased complexity**. Reliability prioritizes simplicity, because simple design minimizes misconfiguration and reduces unexpected interactions.

- Safe deployment strategies often require some amount of forward and backward compatibility between application logic and data in the workload. This added complexity increases the testing burden and can lead to complexities or integrity issues with the workload's data.

- Highly layered, modularized, or parameterized structures can increase the chance of accidental misconfiguration due to the complexity of the interaction between the components of the workload.

- Cloud design patterns that benefit operations sometimes require the introduction of more components, for example, the use of secret store or taking a dependency on Application Insights. The additional components increase the points of interaction in the system, increasing the potential for malfunction or misconfiguration.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased potentially destabilizing activities**. The Reliability pillar encourages the avoidance of activities or design choices that can destabilize a system and lead to disruptions, outages, or malfunctions.

- Deploying small, incremental changes is a technique for mitigating risk, but users expect those small changes to be delivered to production more frequently. Deployments can destabilize a system, so as the rate of deployment increases, so does this risk.

- A culture that measures itself with velocity metrics like deployments per week and uses automation that can facilitate introducing changes at a faster pace is also likely to perform more deployments in a shorter period.

- Increasing density to simplify operations by reducing the number of control and observability points can also lead to an increased availability risk because malfunction or misconfiguration increases the effect of a destabilizing event.

## Operational Excellence tradeoffs with Security

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased surface area**. The Security pillar recommends a reduced workload surface area in terms of components and exposure to operations. This reduction minimizes vulnerabilities and produces a smaller scope for security control and testing.

- Components that surround the workload and support its operations, like automation or a custom control plane, must also be in scope for regular security hardening and testing.

- Routine, unplanned, and emergency operations increase the points of contact with the workload. A zero trust approach requires that these processes are considered vulnerabilities and must be included in the security controls and validation for the workload.

- The observability platform of the system collects logs and metrics about the workload, which can be a valuable source of information disclosure. Therefore, the workload's security needs to extend to protect data sinks from internal and external threats.

- Build agents, externalized configuration, and feature toggle stores all increase the application surface area that requires security.

- A higher deployment frequency caused by small, incremental changes or by "get current, stay current" efforts results in more security testing in the software development life cycle (SDLC).

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased desire for transparency**. A secure workload is based on designs that protect the confidentiality of data that flows through the components of the system.

Observability platforms ingest data of all types to gain insights into a workload's health and behavior. As teams try to attain higher fidelity in observability data, there's an increased risk that data classification controls, like data masking, of the source systems don't extend to the logs and log sinks of the observability platform.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Reduced segmentation**. A key security approach for isolating access and function is to design a strong segmentation strategy. This design is implemented through resource isolation and identity controls.

- Co-locating disparate application components in shared environments and data resources to make management easier reverses segmentation or makes role-based segmentation harder to achieve. Co-located components might also need to share a workload identity, which can lead to over-assignment of permissions or a lack of traceability.

- Collecting all logs from across the system in a unified log sink can make querying and building alerts easier. However, doing so can also make it harder or impossible to provide row-based security to treat sensitive data with the required audit controls.

- Simplifying the management of attribute-based or role-based security by reducing the granularity of roles and their assignments can lead to inappropriately broad permissions.

## Operational Excellence tradeoffs with Experience Optimization

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Competing priorities**. The Experience Optimization pillar recommends a user-centric mindset.

- User experience development that requires significant resources might be deprioritized, which can cause the experience to lack the usability, interactions, and visual design that workload users need.

- User interface development is often done in faster iterations and ship cycles, which can strain the team's SDLC processes.

## Operational Excellence tradeoffs with Performance Efficiency

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased resource utilization**. The Performance Efficiency pillar recommends allocating as much of the available compute and network resources as possible to the requirements of the workload.

- A workload's monitoring framework requires that the components in the architecture allocate time and resources to create, collect, and stream logs and metrics. These data points help ensure that effective alerting and monitoring is possible for reliability, security, and performance. As the level of instrumentation increases, the strain on system resources might also increase.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased latency**. To create performant workloads, teams look for ways to reduce the time and resources that workloads consume to perform their tasks.

- Some cloud design patterns that support "independent change over time" approaches to support the ideals of incremental improvement can introduce latency due to the traversal of additional components.

## Related information

- [Reliability tradeoffs](../reliability/tradeoffs.md)
- [Experience Optimization tradeoffs](../experience-optimization/tradeoffs.md)
- [Security tradeoffs](../security/tradeoffs.md)
- [Performance Efficiency tradeoffs](../performance-efficiency/tradeoffs.md)

---

## Recommendations for fostering fusion team culture

Source: [fusion-culture.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/fusion-culture)

*Learn how to build high-performing workload teams with fusion development principles and practices.*

# Recommendations for fostering fusion team culture

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:01](checklist.md)| **Determine workload team members' specializations, and integrate them into a robust set of practices to design, develop, deploy, and operate your workload to specification. Team members must have clarity in decision making and responsibilities, value continuous improvement and optimization, and adopt a blameless culture that incorporates continuous learning.** |
|---|---|

Fusion development teams are distributed and multidisciplinary digital business teams that blend technology and other types of domain expertise. Fusion development allows your organization to build better solutions faster by bringing together professional developers with citizen, or low-code, developers.

This guide describes the recommendations for implementing fusion development principles and practices in your workload. Fostering fusion development culture can help build a foundation of shared ownership, mutual respect, and appreciation of high-quality work in your workload team. Fusion development culture provides a template for high-performing teams to thrive in the system that they're in.

## Key design strategies

A workload that operates according to the Power Platform Well-Architected recommended practices starts with the adoption of the fusion development culture of cohesiveness, responsibility, continuous learning, and improvement. Team members bring their own expertise and might focus on specific areas of workload operation. However, your team as a whole should be able to independently manage day-to-day, as-needed, and emergency tasks, with support from outside teams when necessary. Your team must work within the overall organizational requirements and collaborate with other teams by using a mindset that values shared knowledge.

The following recommendations can help you adopt and implement fusion development practices in your team.

### Foster mutual respect

**A team's success is built on mutual respect and trust.** A code of ethics that values individual expertise and recognizes it as a core tenet of the team culture can help foster a safe and inclusive environment. Individuals should feel they can share their honest opinions about workload operations and be treated respectfully.

**Mutual respect fosters a blameless culture.** When issues arise, the workload team should take collaborative ownership and work together to find ways to improve, and avoid assigning blame and risking the team's cohesiveness.

**Leadership buy-in and executive sponsorship empowers the Power Platform adoption journey.** Leadership support is critical to ensuring that the workload team has the necessary resources, guidance, and encouragement to deepen their knowledge of Power Platform. Executive sponsors can help communicate the vision and benefits of Power Platform to the rest of the organization, as well as advocate for the workload team's needs and achievements.

### Team roles and responsibilities

**Recognize that teams take ownership and responsibility for the workload when they value their work.** The workload team is responsible for the end-to-end operation of its workload. While certain aspects of the workload operation might require outside services, your team should collaborate with other teams to ensure that all functions are successfully completed. Regardless of how involved they are in supporting services, team members must consider every function that supports the workload as their responsibility. This mindset helps reinforce a common sense of ownership.

**Clearly define team roles and decision-making responsibilities.** Team decision making should be as democratic as possible, but structured so that decisions are made efficiently. When there are differing opinions about a situation, someone must be responsible for making the final decision based on the evidence presented. Team decisions can affect the entire workload, so it's important that individuals feel heard and valued throughout the decision-making process even if they don't agree with the final decision.

### Continuous learning and improvement

**Use enablement teams to the workload teams' advantage.** Some organizations have a Center of Excellence or Center of Enablement team that provides standards and guidance to ensure consistency in design and process. Empower your workload team to work collaboratively with this team to improve processes and share knowledge. Support a mindset of continuous learning and improvement in your team through open communication. Learn more in [Establish a Microsoft Power Platform Center of Excellence](/power-platform/guidance/adoption/coe).

**Learn from each other to develop a cross-functional team.** Establish a team structure in which everyone is a specialist in their function and a generalist in all other functions so that team members can support each other when needed. Cross-functionality helps team members develop appreciation for each other's expertise and can help them understand the complexity of the entire workload.

**Encourage upskilling**. A team member might start out as a low-code or business expert but become more interested in code-first components of the platform. Encourage and allow time for acquiring new knowledge and expertise, which improves employee engagement and facilitates career journeys. Learn more in [Establish a training and upskilling strategy for makers](/power-platform/guidance/adoption/training-strategy).

**Invest in your professional development by staying up to date with the latest Power Platform features and capabilities.** [Microsoft Learn for Power Platform](/training/powerplatform/) offers certifications and learning paths to help you master the skills and concepts of low-code app development, data analysis, automation, and AI. Deepening your knowledge increases your confidence and credibility in designing, building, and managing Power Platform solutions, and also validates your expertise and demonstrates value to your organization. Join the [Power Platform Community](https://powerusers.microsoft.com/) to gain access to events, webinars, forums, communities, and networking opportunities with other professionals.

### Commitment to optimization

**Understand business, regulatory, and other requirements and integrate them into your practices.** Workload teams don't operate in a vacuum. Your team is subject to requirements enforced by the business, industry, and geographic regions you operate in. Ensure that your workload team members understand the requirements that they must follow and the consequences of a failure to meet those requirements.

**Proactively adapt your practices to ensure that you're compliant with requirements.** Your organization might impose some degree of governance over your workload. Use the requirements your business standardizes as guardrails to ensure that you're operating appropriately.

**Regularly review your standard operating procedures with the team to foster discussions about areas of improvement.** Avoid complacency and encourage innovative thinking by fostering a philosophy that all standard operating procedures should be continuously reviewed and improved throughout the workload life cycle. Team members should feel empowered to offer opinions on improvements at any time. However, ensure that you dedicate time to review procedures together so that everyone has space to think about areas for improvement and conduct focused discussions about their ideas.

**Embrace safe experimentation.** Give team members access to sandbox environments and ensure that time is built into sprints to allow for experimentation.

**Stay informed about Power Platform enhancements and incorporate them into your existing resources.** Ensure that your workload is always optimized and aligned with the best practices and standards of the platform. Use the platform's innovation and potential to deliver more value and better experiences to your business and customers. Experiment with the new features and capabilities in your sandbox or development environments before applying them to your production resources. Test and validate the functionality and performance of the enhancements and ensure that they're compatible with your existing configurations and customizations. Incorporate the enhancements into your resources where it makes sense and where they can add value to your workload. Document the changes and communicate them to your stakeholders and users. Monitor the effect and outcomes of the enhancements and collect feedback to measure their effectiveness and satisfaction.

## Considerations

Strictly defined roles and responsibilities could result in a level of discomfort for some team members when they're performing functions outside their responsibility. Conduct open and honest discussions with the team about team structure, and be open to making adjustments when needed.

## Power Platform facilitation

The generative AI features in Power Apps and Power Automate are transforming how software applications are built. With the power of large language models, Power Platform is advancing to the next step in the evolution of code abstraction: moving from low-code to natural language authoring, and enabling humans and machines to work together to build solutions. With the Copilot feature in [Power Apps](/power-apps/maker/canvas-apps/ai-conversations-create-app) and [Power Automate](/power-automate/create-cloud-flow-using-copilot), you receive in-app guidance through natural language processing to help you build your app or flow. These features can help workload teams with diverse skill sets to develop better apps and streamline their software development processes.

Create or expand your Center of Excellence (CoE) with the [Power Platform CoE Starter Kit](/power-platform/guidance/coe/starter-kit).

## Related information

- Webinar: [Fusion Teams 101: Low-Code Apps with Power Platform](https://info.microsoft.com/ww-Landing-fusion-teams-101LowCode-power-platform.html)
- Training path: [Transform your business applications with fusion development](/training/paths/transform-business-applications-with-fusion-development/)
- Ebook: [Fusion development approach to building apps using Power Apps](/power-apps/guidance/fusion-dev-ebook/)

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for formalizing routine and nonroutine tasks

Source: [formalize-operations-tasks.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/formalize-operations-tasks)

*Learn how to standardize and formalize routine, as-needed, and emergency operational tasks to enhance operational efficiency.*

# Recommendations for formalizing routine and nonroutine tasks

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:02](checklist.md)| **Formalize the way you run routine, as-needed, and emergency operational tasks by using documentation, checklists, or automation. Strive for consistency and predictability for team processes and deliverables by adopting industry-leading practices and approaches, such as a "shift left" approach.** |
|---|---|

This guide describes the recommendations for formalizing routine and nonroutine tasks. Formalizing routine and nonroutine tasks is crucial for efficient and successful workload management practices. Adoption of industry-proven tools and practices helps workload teams optimize efficiency and consistency and automate processes when practical. This practice helps minimize the risk of being unprepared when issues arise and ensures that workload support is efficient. By being consistent about how routine, improvised, and emergency tasks are handled, workload team members can minimize the risk of errors and reinforce a common sense of ownership.

## Key design strategies

Consistent processes make your work quality predictable, and predictable work quality makes workload support smoother. To achieve consistency in your processes, you need to standardize processes and document standard operating procedures. Standardization helps workload teams maintain and continuously improve their workload under the overall governance of the organization. Use strategies like automation and shift-left approaches to minimize potential areas of unpredictability.

Process standardization takes many shapes. Here are some general recommendations:

- The processes that you standardize should cover all aspects of workload management: reliability, security, performance, experience, and operational processes. The workload team should have as much ownership of the processes as it needs to maintain and continuously improve the workload under the overall governance of the organization.

- The documentation that you produce captures your standard operating procedures and dictates how things are done, but the documentation is never final. Procedures should evolve as your workload and your team evolve. Regularly review and challenge standards to ensure that they're the right standards for your team right now. Your documentation should be templatized and version-controlled to ensure consistency in the documentation formats and that there's a record of reviews and updates.

- Break down routine, improvised, and emergency tasks into checklist items that are easy to understand so that workload teams can achieve consistency in their processes and minimize potential areas of unpredictability.

An example of a routine task is the process of applying an upgrade to a solution that is in the production environment. When you determine that you need to perform a solution upgrade, the workload team might create a checklist that includes items such as:

- Test the update in test and staging environments.
- Create a change management request to deploy the upgrade in production.
- Update the documentation, such as a wiki or knowledge base, to reflect the latest information.
- Review the outage window to minimize disruption to users.

    Focus each checklist item on a discrete task that is clearly defined.

- Improvised and emergency tasks are scenario-specific, but operators should still clearly understand their roles and responsibilities. They need to know how to interact with the workload team and with other teams in the organization to efficiently work through those types of tasks.

    For example, an improvised task might involve turning on a new environment setting or feature, or using code components for developer experiences. There might not be a fully realized checklist for the testing of this type of resource. However, there should be general checklists for adding new resources or features to your environments and standards that cover testing for performance, security, and reliability at each stage.

    Likewise, your emergency response plan should clearly define roles and responsibilities and general processes and procedures. You must adhere to this plan in emergency situations to ensure that you handle them efficiently.

    Improvised and emergency operations are also good opportunities to learn how to improve your standard operating procedures. Ask the workload team to reflect on ways that the operations could have gone smoother, and determine whether an update to existing processes could be beneficial going forward.

- Adopt industry-proven practices to minimize the time your team spends on inventing processes and standards. Following [Agile practices](/azure/devops/boards/plans/agile-culture) with Scrum, organizing your work through Kanban boards, and adopting a shift-left ethos are all examples of practices that are effective for organizations of any size. Many mature organizations use version-controlled standard operating procedures, wikis, new employee manuals, and operations manuals to enforce consistency.

    Rely on your team's experience to decide which practices fit your workload life cycle management. Learn from other teams about the standards they successfully implemented to understand how particular practices fit into your organizational structure.

- Incorporate organizational requirements and cross-cutting functions into your standard operating procedures. Your organization might have standards for some processes that you should adopt, such as change management and support. However, you might also be empowered to develop your own standards for other processes, so look for ways to incorporate required standards into your processes. The processes that you own are likely to intersect with other teams' processes, so strive to align standards to a practicable extent.

    Document where the workload team's and other teams' processes diverge to ensure that the workload team can work better with other teams when there are intersection points. Central security teams might use different tools and procedures than the workload team, and the teams can collaborate more easily if they're aware of those differences.

- Use automation to achieve consistency. Automate tasks that are repetitive and prone to human error to relieve management burden from your team. Look for opportunities to automate processes, such as generating IT service management tickets. Learn more in [Recommendations for implementing automation](automate-tasks.md).

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: Codifying standard operating procedures can carry the risk of leading to stagnation or complacency. Standards should be followed, but they shouldn't be rigid or static. Strive to find a balance between strict adherence and allowance for innovation so that your processes can evolve safely over time.

## Power Platform facilitation

Although there are no Power Platform products that directly facilitate the formalization of processes and procedures, Microsoft publishes comprehensive guidance on this subject. Use this guidance to understand industry-proven and recommended practices and to consider how to apply them to your workload.

Power Platform Well-Architected also provides detailed guidance on the processes and procedures that should be codified to ensure that your workload and workload team run according to industry standards:

- [Recommendations for implementing automation](automate-tasks.md)
- [Recommendations for enabling automation in your workload](enable-automation.md)
- [Recommendations for formalizing software development management practices](formalize-development-practices.md)
- [Promote an Agile culture within your team](/azure/devops/boards/plans/agile-culture)

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for formalizing software development management practices

Source: [formalize-development-practices.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/formalize-development-practices)

*Learn how to establish standards for your software ideation and planning process and for your team's software development practices.*

# Recommendations for formalizing software development management practices

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:03](checklist.md)| **Formalize the software ideation and planning process, drawing from established industry and organizational standards. Use a common, prioritized backlog and sufficiently detailed specifications. Drive continuous improvements in the planning process based on outcomes.** |
|---|---|

This guide describes the recommendations for managing workload development practices in accordance with established standards. Your team's ability to produce high-quality software relies on a structured, collaborative approach to development planning. Workload teams should understand and clearly communicate to stakeholders the work that's being done. More precisely, workload teams should have a clear view of the work to be done in a development cycle and ensure that all stakeholders are aligned on the "why" of that work. Established standards define how development practices should be performed and allow the workload team to collaborate effectively, reducing the risk of confusion on goals and expectations.

## Key design strategies

Formalize your workload development practices to help ensure a common understanding of the goals and expectations.

Don't treat low-code workloads as low-complexity. You still benefit from formalizing the development and management of low-code workloads. Learn from other software development teams. Have a decision matrix in place that dictates the level of formalization that's required based on the complexity and criticality of the workload.

### Standards for development planning

The following standards can help you design a comprehensive development planning strategy.

- **Prioritization**: Planning the order and scope of the work involves understanding the true impact and value of workload features on the business. It also includes evaluating those impacts against other work requests and the overall roadmap for your product or program. One way to prioritize workloads is by [evaluating the business value](/power-platform/guidance/adoption/business-value) of the entire workload. You might also find it useful to evaluate individual workload features for the business value.

- **Categorization**: Establish processes that ensure that critical applications have the necessary guardrails to support them. At the same time, ensure that productivity scenarios aren't slowed down or stifled by too many rigorous processes.

- **Collaboration**: The process of defining proposed changes to the workload should be a collaborative effort. Most changes to the workload affect multiple functions and components, so involving as many workload team members as possible helps ensure that important considerations aren't missed and that everyone is aware of the effect on their particular domain. Collaboration also helps clearly define the scope of a change and how to divide the necessary tasks into well-defined work items. A larger group with expertise across domains is able to provide experience-backed estimates for the required effort.

- **Tools**: Use established, industry-proven tools and processes, like [Agile](/devops/plan/what-is-agile-development), [Scrum](/devops/plan/what-is-scrum), and [Kanban boards](/devops/plan/what-is-kanban).

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: Agile methodology can become too strict if it's overly prescriptive. Strive for a balance between well-defined standards and innovation.

- **Deployment**: Plan to use frequent small, iterative deployments instead of large, infrequent deployments.

- **Terms**: Standardize your definition of *finished* development cycles to help ensure that supporting functions, including testing, documentation, and accessibility features, are successfully completed.

- **Communication**: Define the standard protocols for product owners and project managers to promote upcoming releases.

- **User stories**: Standardize a template for user stories. Well-written user stories should follow the *INVEST* approach:

  - I&ndash;Independent: Each user story should be independent of others, allowing the team to deliver in small incremental steps.
  - N&ndash;Negotiable: User stories should be negotiable and open to discussion and change.
  - V&ndash;Valuable: User stories should provide value to the customer.
  - E&ndash;Estimable: User stories should be estimable and have a clear definition of done.
  - S&ndash;Small: User stories should be small and focused on a single feature.
  - T&ndash;Testable: User stories should be testable and have clear acceptance criteria.

- **Acceptance criteria**: Standardize a template for acceptance criteria. Ensure that acceptance criteria relate specifically to the user story and can be unambiguously proven using one or more acceptance tests.

- **Tracing**: Ensure that the development process is traceable. You should clearly trace the state of your production workload and the associated code back to quality assurance testing, acceptance criteria, user stories, and features. Detailed tracing might also be a regulatory requirement in some cases, such as healthcare.

- **Review**: Regularly perform internal audits of your development practices through development cycle retrospectives and postmortems. Process reflection should be blameless and should focus on learning that can be applied as improvements. Ensure that the team reflects on how effective the user story and tasks were in defining the necessary tasks and on the accuracy of time estimates.

- **Reports**: Standardize reports for stakeholders that provide useful metrics focusing on change. Focusing on change allows you to track product acceleration and deceleration. Helpful metrics can include changes in:

  - Monthly growth rate of adoption
  - Performance
  - Training time
  - Frequency of incidents

  Reporting shouldn't be used as a tool to evaluate the work of individuals, so avoid metrics like story points or lines of code for each engineer.

## Power Platform facilitation

Although there are no Power Platform products that directly facilitate this recommendation, you can use other tools in the Microsoft stack. [Azure Boards](/azure/devops/boards/get-started/what-is-azure-boards) is a web-based service that enables teams to plan, track, and discuss work across the entire development process.

[GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects) is a customizable project management tool for organizing projects and integrates with your issues and pull requests in GitHub.

## Related information

- [Best practices for Agile project management](/azure/devops/boards/best-practices-agile-project-management)
- [Azure Boards](/azure/devops/boards/get-started/what-is-azure-boards)
- [User support strategy](/power-platform/guidance/adoption/support-strategy-solutions)
- [Measuring the business value of Power Platform solutions](/power-platform/guidance/adoption/business-value)
- [Planning a conversational AI project](/microsoft-copilot-studio/guidance/project-best-practices)
- [Business value toolkit](/power-platform/guidance/coe/business-value-toolkit)

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for standardizing tools and processes

Source: [tools-processes.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/tools-processes)

*Learn how to standardize your tools and processes and optimize your development and quality assurance practices.*

# Recommendations for standardizing tools and processes

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:04](checklist.md)| **Optimize software development and quality assurance processes by following industry-proven practices for development and testing. For unambiguous role designation, standardize practices across components such as tooling, source control, application design patterns, documentation, and style guides.** |
|---|---|

This guide describes the recommendations for defining standards for development tools and processes. Defining consistent practices leads to an efficient workload team and high-quality work. High-performing teams use industry-proven tools and processes to minimize wasted effort and potential code errors.

## Key design strategies

The first step to optimize development practices is to standardize tools and processes. Whenever possible, use industry-proven solutions instead of developing your own. For all standardized tools and processes, provide training to ensure that your teams can use them efficiently.

To define standards that help optimize your development practices, consider the following recommendations.

### Use tools available to the platform

Prioritize using Power Platform tools and otherwise use well-known and mature off-the-shelf tools, and standardize their use. Highly effective engineering teams adopt the best-in-class tools. Avoid developing solutions for planning, development, testing, and collaboration. Choose tools that meet the requirements for your workload.

Tools should provide the following functions:

- Work planning and backlog management
- Version control and repositories
- Deployment pipelines
- Testing
- Code development and review

In some cases, one tool or a suite of tools might provide several functions. Ensure that you understand the capabilities of your tools and their limitations so that they meet your requirements across functions.

Determine if you should invest in premium features of the platform or premium versions of tools. Consider the time and effort of developing your own solutions compared to features that the premium tools provide. Consider one-time costs versus recurring costs. In most cases, off-the-shelf tools provide higher value to your team. For example, [managed environment](/power-platform/admin/managed-environment-overview) capabilities offer out-of-the-box features to set a maker onboarding message or to limit sharing proactively. Building these features yourself requires development and ongoing maintenance effort that might prove more costly than investing in premium capabilities.

Use AI tools when practical. AI tools can help with code development, reviews, and optimization.

### Establish a governance framework for codevelopment

Establish an effective codevelopment governance framework to ensure consistency and repeatability in maker-defined projects and fusion teams.

### Standardize your source control system and practices

Adopt a source code control system like Azure DevOps. [Azure DevOps](/azure/devops) provides developer services for support teams to plan work, collaborate on code development, and build and deploy applications. Export a solution from your development environment containing your apps and customizations, unpack your solution, and store the components in your source control system.

Ensure that solution versioning is accurate, following the sprint and developer guidelines set out in [Implement Scrum practices for your team in Azure Boards](/azure/devops/boards/sprints/scrum-overview). Test results from the pull request can take the form of screenshots or videos that depict the functionality that's being built. Automating the pull-request governance process helps ensure code quality without requiring a manual review of basic checks such as solution versions.

Create templates to deliver efficiency and promote consistency. All aspects of the team's operations benefit from standardization and simplification, from onboarding tasks and story review presentations to [work item templates](/azure/devops/boards/backlogs/work-item-template?tabs=browser) designed to save time and provide guidance to teams when defining user stories, features, bugs, and tasks.

### Evaluate metrics to quantify effectiveness

Development and quality assurance teams can only improve when they quantify their effectiveness. To quantify effectiveness, they must identify the metrics that measure [developer velocity](https://azure.microsoft.com/solutions/developer-velocity) and define key performance indicators (KPIs).

Examples of these metrics include:

- Lead time: The time that it takes for a task or user story to go from the backlog to a production deployment.
- Mean time to resolution: The average time that's spent fixing bugs or defects in code.
- Change failure rate: The percentage of changes that result in a failure.

To help stakeholders and the workload team easily track velocity, visualize KPIs by using dashboards or other reporting tools.

### Standardize how your workload team writes, reviews, and documents code

Standardize how your workload team writes, reviews, and documents code by using a style guide. A standard style makes collaboration easy and helps with on-boarding new developers. To work effectively, new developers need to know how the workload team operates. A style guide with clearly defined standards can ease their training process.

The style guide should cover:

- Naming conventions for solutions, artifacts, controls, actions, environments, branches, and builds
- Error handling standards
- Common patterns or libraries

Learn more about [Power Automate cloud flow coding guidelines](/power-automate/guidance/coding-guidelines/), [Power Apps coding guidelines](/power-apps/guidance/coding-guidelines/overview) and [Power Automate desktop flow coding guidelines](/power-automate/guidance/desktop-flow-coding-guidelines/).



Keep track of architecture decisions to help teams maintain a fresh understanding of the workload and allow new team members to learn about the design decisions made during the workload's life cycle. Include in your architecture decision document the tools and technologies that were considered, the reason for a decision, and functional and nonfunctional requirements that were factored into decisions. Record decisions to avoid repeating explanations or revisiting discussions with new members or stakeholders.

### Implement standards and guidelines for addressing technical debt

The platform and technology change quickly, with new features and capabilities rolling out regularly. Adopt a mindset that technical debt is necessary for your workload team's deliverables. This mindset motivates your team to consider and address technical debt regularly to avoid accumulation. Address technical debt as a regularly recurring task in the backlog. Ensure you have processes in place to remain current with platform changes, both new features and deprecations, and work on an action plan for how to address changes in your workload.

For example, a product feature might become deprecated or replaced with a different version. The workload team must prioritize completing the transition to the new feature to avoid affecting the workload. The team might build a custom solution or control, which over time becomes part of the platform. Your workload team must transition to that platform feature, which lowers technical debt and maintenance of your own workload.

Use industry-proven application design patterns to ensure that your application is reliable, performant, and secure. Use these patterns to save time and effort rather than develop your own solutions for your application. Choose the patterns that benefit your workload. Regularly review design patterns to ensure you use the right patterns as your workload evolves.

### Implement a shift-left approach to testing

Implement a shift-left approach to testing by performing unit testing early and often throughout the development process. Frequent testing in each development environment helps developers gain confidence in their applications.

To help create your testing strategy with a shift-left approach, consider the following principles:

- Write tests at the lowest level possible. Favor tests with the fewest external dependencies, and run tests as part of the build.
- Write tests once, and run tests everywhere, including production. Write tests that you can run in every development environment without accounting for factors that are specific to one environment, like encrypted secrets or configurations.
- Design your workload for testing. When you develop your application, make testability a requirement.
- Consider test ownership, which is based on workload ownership. Your workload team owns its testing and shouldn't rely on other teams to test its code.
- Automate tests as much as possible. Automated code relieves the burden on your workload team and enforces consistent quality.

Require your workload team to understand the security practices related to development and quality assurance. Team members must follow these practices without exception. Learn more in [Recommendations for securing a development life cycle](../security/secure-development-lifecycle.md).

## Power Platform facilitation

The [Deployment page](/power-platform/alm/admin-deployment-hub) in the Power Platform admin center provides a streamlined experience to help administrators navigate the complexities of managing Power Platform application lifecycle management (ALM) workloads, including managing pipelines deployments at enterprise scale. Admins have visibility to all the deployments in their tenant and can approve deployment requests and troubleshoot issues.

[Pipelines in Power Platform](/power-platform/alm/pipelines) aim to democratize application lifecycle management (ALM) for Power Platform and Dynamics 365 customers by bringing ALM automation and continuous integration and continuous delivery (CI/CD) capabilities into the service. Pipelines can be custom tailored to serve the unique needs of an organization, For example you can add approvals, deploy via service principals, and integrate with internal systems of record, Azure DevOps, GitHub, and more. Learn more in [Extend pipelines in Power Platform](/power-platform/alm/extend-pipelines).

[Copilot-generated deployment notes](/power-platform/alm/copilot-deployment-notes-pipelines) in pipelines generate a solution summary and prefill the deployment notes field, giving anyone viewing the deployment request or record enough context to understand what the solution does and what it contains.

[Microsoft Power Platform Build Tools for Azure DevOps](/power-platform/alm/devops-build-tools) can be used to automate common build and deployment tasks related to apps built on Power Platform.

[GitHub Actions for Power Platform](/power-platform/alm/devops-github-actions) enable developers to build automated software development life cycle workflows. With [GitHub Actions for Microsoft Power Platform](https://github.com/marketplace/actions/powerplatform-actions), you can create workflows in your repository to build, test, package, release, and deploy apps; perform automation; and manage bots and other components built on Power Platform.

[Power Apps checker web API](/power-platform/alm/checker-api/overview) provides a mechanism to run static analysis checks against customizations and extensions to the Microsoft Dataverse platform.

[Test Studio](/power-apps/maker/canvas-apps/test-studio) allows you to build end-to-end UI tests for your canvas app.

[Automate tests with Azure Pipelines](/power-apps/maker/canvas-apps/test-studio-classic-pipeline-editor).

[Power CAT Code Review Tool](https://marketplace.microsoft.com/en-us/product/dynamics-365/microsoftpowercatarch.powercattools?tab=Overview) allows you to perform code reviews.

[Copilot Agent Kit](/microsoft-copilot-studio/guidance/kit-overview) allows you to configure agents and tests. By running individual tests against the Copilot Studio APIs (Direct Line), the agent responses are evaluated against expected results.

[Microsoft Power Platform CLI](/power-platform/developer/cli/introduction) (PAC CLI) is a command-line tool that supports the import and export of Power Platform solutions, and packing to and unpacking from Power Platform solutions source files. PAC CLI is available as a [standalone command-line tool](https://aka.ms/PowerAppsCLI) or as an [extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=microsoft-IsvExpTools.powerplatform-vscode).

Other tools and services that can help you standardize your development practices include:

- [Azure DevOps](/azure/devops/user-guide/what-is-azure-devops), a collection of services that you can use to build a collaborative, efficient, and consistent development practice. Azure DevOps bundles the following solutions:
  - [Azure Pipelines](/azure/devops/pipelines), a cloud service that provides build and release services to support CI/CD of your applications.
  - [Azure Boards](/azure/devops/boards/get-started/what-is-azure-boards), a web-based work management tool that supports Agile practices like Scrum and Kanban.
  - [Azure Repos](/azure/devops/repos/get-started/what-is-repos), a version control tool that supports the Git distributed version control system and the Team Foundation Version Control system.
  - [Azure Test Plans](/azure/devops/test/overview), a browser-based test management solution that provides capabilities that are required for planned manual testing, user acceptance testing, exploratory testing, and gathering feedback from stakeholders.

- [GitHub Projects](https://docs.github.com/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects), a work management tool that you can use to create Kanban boards, reports, dashboards, and other functions.

## Related information

- The [Power Platform and Copilot Studio Architecture Center](/power-platform/architecture/) provides a structured framework for documenting solution architectures. Following the same template to document your solutions ensures consistency, clarity, and alignment with best practices across solutions. This framework is especially useful for communicating complex architectures, facilitating reviews, and enabling future scalability and governance.

- [Co-development governance](/power-apps/guidance/co-develop/governance)

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for continuous integration

Source: [release-engineering-continuous-integration.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/release-engineering-continuous-integration)

*Learn how to optimize software development and quality by following industry-proven practices for development and testing.*

# Recommendations for continuous integration

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:04](checklist.md)| **Optimize software development and quality assurance processes by following industry-proven practices for development and testing. For clear role designation, standardize practices across components such as tooling, source control, application design patterns, documentation, and style guides.** |
|---|---|

Adoption of continuous integration/continuous delivery (CI/CD) can increase development complexity for citizen developers. However, a scalable and automated development process that can quickly incorporate new features and bug correction is critical for a reliable, sustainable fusion development process.

As a developer, you can make small code changes, push these changes to a code repository, and get almost instantaneous feedback on the quality, test coverage, and introduced bugs. This process lets you work faster and with more confidence and less risk. Continuous integration is a practice where source control systems and deployment pipelines are integrated to provide automated build, test, and feedback mechanisms for software development teams.

## Key design strategies

Continuous integration is a software development practice that developers use to integrate software updates into a source control system at a regular cadence.

The continuous integration process starts when an engineer creates a GitHub pull request to signal to the CI system that code changes are ready to be integrated. Ideally, the integration process validates the code against several baselines and tests. It then provides feedback to the requesting engineer on the status of these tests.

If baseline checks and testing go well, the integration process produces and stages assets that deploy the updated software. These assets include compiled code and container images.

Continuous integration can help you deliver high-quality software more quickly by performing the following actions:

- Run automated tests against the code to provide early detection of breaking changes.
- Run code analysis to ensure code standards, quality, and configuration.
- Run compliance and security checks to ensure that the software includes no known vulnerabilities.
- Run acceptance or functional tests to ensure that the software operates as expected.
- Provide quick feedback on detected problems.
- Where applicable, produce deployable assets or packages that include the updated code.

### Environments

Environment setup and configuration are critical to sustainable and reliable CI/CD. Power Platform environments can be set up to isolate different stages of solution development, testing, and deployment. The CI/CD process moves changes through those stages. Establish an [environment strategy](/power-platform/guidance/adoption/environment-strategy) with guiding principles for developer environments.

### Continuous integration pipelines

To achieve continuous integration, use tools to manage, integrate, and automate the process. A continuous integration pipeline provides:

- A platform for running automated tests
- Compliance scans
- Reporting
- All other components that make up the continuous integration process

In most cases, the pipeline software is attached to source control so that when pull requests are created or software is merged into a specific branch, the continuous integration pipeline runs. Source control integration also provides the opportunity to give CI feedback directly on pull requests.

Many solutions, like Azure Pipelines or GitHub Actions, provide the capabilities of continuous integration pipelines. Learn more in [Build CI/CD with Azure for Microsoft Power Platform](/azure/architecture/solution-ideas/articles/azure-devops-continuous-integration-for-power-platform).

### Source control integration

The integration of your continuous integration pipeline with your source control system is key to enabling fast, self-service code contributions.

The CI pipeline runs on a newly created pull request. The pipeline includes all tests, security assessments, and other checks. CI test results appear directly in the pull request to allow for almost real-time feedback on quality.

Another popular practice is building small reports or badges that can be presented in source control to make the current build states visible.

The following image shows the integration between GitHub and an Azure DevOps pipeline. In this example, the creation of a pull request triggers the pipeline. The pipeline status appears in the pull request.

:::image type="content" source="media/release-engineering-continuous-integration/image1.png" alt-text="Screenshot of an Azure DevOps status badge in a GitHub repository.":::

### Test integration

A key element of continuous integration is the continual building and testing of code as developers make code contributions. Testing pull requests as they're created gives immediate feedback that the commit introduced no breaking changes. The advantage is that the tests in the continuous integration pipeline can be the same tests that run during test-driven development.

:::image type="content" source="media/release-engineering-continuous-integration/devops-ci.png" alt-text="Example diagram of continuous integration.":::

#### Quality checks for custom code

When including custom code in your solutions, add code quality checks to a validation pipeline to ensure clean custom code is being committed to source control. Regardless of the coding language and syntax patterns you're using, there are multiple options for maintaining code quality and increasing security and governance.

#### Failed tests

Failed tests should temporarily block a deployment and lead to a deeper analysis of what happened. Failed tests should also lead to either a refinement of the tests or an improvement in the change that caused the tests to fail.

## Power Platform facilitation

The [Deployment page](/power-platform/alm/admin-deployment-hub) in the Power Platform admin center provides a streamlined experience to help administrators navigate the complexities of managing Power Platform application lifecycle management (ALM) workloads, including managing pipelines deployments at enterprise scale. Admins have visibility to all the deployments in their tenant and can approve deployment requests and troubleshoot issues.

[Pipelines in Power Platform](/power-platform/alm/pipelines) aim to democratize application lifecycle management (ALM) for Power Platform and Dynamics 365 customers by bringing ALM automation and continuous integration and continuous delivery (CI/CD) capabilities into the service. Pipelines can be custom tailored to serve the unique needs of an organization, For example you can add approvals, deploy via service principals, and integrate with internal systems of record, Azure DevOps, GitHub, and more. Learn more in [Extend pipelines in Power Platform](/power-platform/alm/extend-pipelines).

[Microsoft Power Platform Build Tools for Azure DevOps](/power-platform/alm/devops-build-tools) can be used to automate common build and deployment tasks related to apps built on Power Platform.

[GitHub Actions for Power Platform](/power-platform/alm/devops-github-actions) enable developers to build automated software development life cycle workflows. With [GitHub Actions for Microsoft Power Platform](https://github.com/marketplace/actions/powerplatform-actions), you can create workflows in your repository to build, test, package, release, and deploy apps; perform automation; and manage bots and other components built on Microsoft Power Platform.

[Automate tests with Azure Pipelines](/power-apps/maker/canvas-apps/test-studio-classic-pipeline-editor).

[Power Apps checker Web API](/power-platform/alm/checker-api/overview) provides a mechanism to run static analysis checks against customizations and extensions to the Microsoft Dataverse platform.

[Microsoft Power Platform CLI](/power-platform/developer/cli/introduction) (PAC CLI) is a command-line tool that supports the import and export of Power Platform solutions, and packing to and unpacking from Power Platform solutions source files. PAC CLI is available as a [standalone command-line tool](https://aka.ms/PowerAppsCLI) or as an [extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=microsoft-IsvExpTools.powerplatform-vscode).

## Related information

- [Application lifecycle management (ALM) with Microsoft Power Platform](/power-platform/alm/)
- [Build CI/CD with Azure for Microsoft Power Platform](/azure/architecture/solution-ideas/articles/azure-devops-continuous-integration-for-power-platform)
- [Power Platform environments](/power-platform/admin/environments-overview)
- [Develop a tenant environment strategy to adopt Power Platform at scale](/power-platform/guidance/adoption/environment-strategy)
- [Establish effective application lifecycle management practices](/power-platform/guidance/adoption/alm)
- [Codevelopment governance](/power-apps/guidance/co-develop/governance)
- [Use scenarios to implement healthy ALM with Microsoft Power Apps](/power-platform/alm/implement-healthy-alm)
- [Automate tests with Azure Pipelines](/power-apps/maker/canvas-apps/test-studio-classic-pipeline-editor)

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for designing a workload development supply chain

Source: [workload-supply-chain.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/workload-supply-chain)

*Learn how to build a workload supply chain that drives changes through automated pipelines and ensures an efficient workload life cycle.*

# Recommendations for designing a workload development supply chain

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:06](checklist.md)| **Build a workload supply chain that drives proposed changes through predictable, automated pipelines. The pipelines test and promote those changes across environments. Optimize a supply chain to make your workload reliable, secure, cost-effective, and performant.** |
|---|---|

This guide describes the recommendations for designing a workload development supply chain that's based on continuous integration and continuous delivery (CI/CD) pipelines. In cloud workloads, a supply chain is a standardized suite of tools and processes that you use to affect configuration and workload change across environments. Develop a supply chain to ensure that you have a predictable, standardized method of maintaining your workload. CI/CD pipelines are the manifestation of the supply chain, but you should have a single supply chain. You might have several pipelines that follow the same processes and use the same tools.

Incorporate a supply chain to protect your workload from damage that can occur when you don't properly manage workload changes. Always be aware of the state of your workload, so that you're not at risk of experiencing unpredictable behavior. This risk compounds if you need to spend critical time retracing unaccounted-for changes when issues arise. To minimize these risks, standardize the processes and tools that define your supply chain, and ensure that your workload team fully commits to their use.

## Key design strategies

The following recommendations can help you define the core tenets of your supply chain.

**Make proposed workload changes through supply chain processes and tools.** Enforce a strict policy of automated template-based deployments. This method helps ensure that your workload's configuration across all environments is standardized, well-defined, and tightly controlled. For environments in a code promotion chain, don't perform updates by using manual processes or human interaction. Incorporate all changes to the environment through a pipeline by following deployment practices that you define. To help enforce this policy, consider limiting access to read-only as a default and using an access authorization gate to allow write access.

An important aspect of this tenet is that all changes are *proposed changes* until they're deployed into production. Through automated testing, like integration and smoke testing, you enable your supply chain to automatically reject changes.

**Use one set of code assets and artifacts across all environments and pipelines.** A common pain point for organizations is when nonproduction environments are different from production environments. Building production and nonproduction environments manually can result in mismatched configurations between the environments. This mismatch slows down testing and makes it more likely that changes might harm a production system.

**Reflect your organizational structure in your supply chain and pipeline designs.** Your organization might be siloed among teams. Each team might manage a part of the supply chain. For example, many organizations have teams that manage security and compliance settings, or environment configurations. These teams are separate from development teams that manage application development, testing, and deployments. There are many ways to organize the teams that are involved in a supply chain. Your supply chain relies on all the teams seamlessly working together. Ensure that all teams follow standard processes and use standard tools to make the supply chain as efficient as possible.

Your supply chain might rely on third-party vendors if you outsource parts of the workload life cycle. These vendors are as critical to the success of your supply chain as internal resources. Ensure that there's mutual agreement across all teams about the processes and tools that you use.

**Standardize your deployment method.** Talk to the product owner about the acceptable amount of production downtime for your workload. Depending on how much, if any, downtime is acceptable, you can choose the deployment method that's right for your requirements. Ideally, you should perform deployments during a maintenance window to reduce complexity and risk.

**Plan for a holistic testing strategy.** A core tenet of system reliability is the "shift left" principle. Developing and deploying an application is a process that's depicted as a series of steps going from left to right. You shouldn't limit testing to the end of the process. As much as possible, shift testing to the beginning, or to the left. Errors are cheaper to repair when you catch them early. They can be expensive or impossible to fix later in the application life cycle.

When possible, use automated testing to ensure consistency. Include the following types of testing in your supply chain design:

- Unit testing: Unit tests are typically run as part of a continuous integration routine. Unit tests should be extensive and quick. They should ideally cover 100 percent of the code. Apply unit tests to all code assets, including templates and scripts.

- Smoke testing: Smoke tests verify that a workload can be stood up in a test environment and performs as expected. Smoke tests don't verify the interoperability of components. Smoke tests verify that the deployment methodology for the infrastructure and the application works, and that the system responds as intended after the process finishes.

- Integration testing: Integration tests ensure that the application components operate individually, and then determine whether components can interact with each other as they should. It can take a considerable amount of time to run a large integration test suite. That's why it's best to incorporate the shift-left principle and perform testing early in the software development life cycle. Reserve integration tests for scenarios that you can't test with a smoke test or unit test. You can run long-running test processes on a regular interval if needed. A regular interval offers a good compromise and detects interoperability issues between application components no later than one day after they're introduced. Some testing scenarios benefit from manual runs. Use manual testing when you need to introduce human interactivity elements into tests.

- Acceptance testing: Depending on the context, you can manually perform acceptance testing. It can be partially or fully automated. Acceptance testing determines whether the software system meets the requirement specifications. The main purpose of this test is to evaluate the system's compliance with the business requirements and determine whether the system meets the required criteria for delivery to users.

**Implement quality gates throughout your code promotion process through testing**. Deploy your code into lower environments, like quality assurance and testing, and up through higher environments, like staging and production. As your deployment passes through quality gates, ensure that it meets your quality targets before changes go to production. Your business requirements determine what the focus of your quality gates are. Also consider the fundamental Power Platform Well-Architected principles: Security, Reliability, and Performance Efficiency.

Also integrate approval workflows into your quality gates. Clearly define and automate approval workflows when appropriate. Define quality acceptance criteria into your automation, so that you can move through your gates efficiently and safely.

## Power Platform facilitation

The [Deployment page](/power-platform/alm/admin-deployment-hub) in the Power Platform admin center provides a streamlined experience to help administrators navigate the complexities of managing Power Platform application lifecycle management (ALM) workloads, including managing pipelines deployments at enterprise scale. Admins have visibility to all the deployments in their tenant and can approve deployment requests and troubleshoot issues.

[Pipelines in Power Platform](/power-platform/alm/pipelines) aim to democratize application lifecycle management (ALM) for Power Platform and Dynamics 365 customers by bringing ALM automation and continuous integration and continuous delivery (CI/CD) capabilities into the service. Pipelines can be custom tailored to serve the unique needs of an organization, For example you can add approvals, deploy via service principals, and integrate with internal systems of record, Azure DevOps, GitHub, and more. Learn more in [Extend pipelines in Power Platform](/power-platform/alm/extend-pipelines).

[Microsoft Power Platform Build Tools for Azure DevOps](/power-platform/alm/devops-build-tools) can be used to automate common build and deployment tasks related to apps built on Power Platform.

[GitHub Actions for Power Platform](/power-platform/alm/devops-github-actions) enable developers to build automated software development life cycle workflows. With [GitHub Actions for Microsoft Power Platform](https://github.com/marketplace/actions/powerplatform-actions), you can create workflows in your repository to build, test, package, release, and deploy apps; perform automation; and manage bots and other components built on Power Platform.

[ALM Accelerator](/power-platform/guidance/coe/setup-almaccelerator) is an open-source tool that consists of a set of applications, scripts, and pipelines designed to automate the continuous integration/continuous delivery process.

[Automate tests with Azure Pipelines](/power-apps/maker/canvas-apps/test-studio-classic-pipeline-editor).

[Power Apps checker Web API](/power-platform/alm/checker-api/overview) provides a mechanism to run static analysis checks against customizations and extensions to the Microsoft Dataverse platform.

[Microsoft Power Platform CLI](/power-platform/developer/cli/introduction) (PAC CLI) is a command-line tool that supports the import and export of Power Platform solutions, and packing to and unpacking from Power Platform solutions source files. PAC CLI is available as a [standalone command-line tool](https://aka.ms/PowerAppsCLI) or as an [extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=microsoft-IsvExpTools.powerplatform-vscode).

You can use Terraform, Bicep, and Azure Resource Manager for immutable infrastructure as code (IaC) deployments. Depending on your requirements and your team's familiarity with the tools, you might use one or more of these tools for your deployments and management of the resources.

## Organizational alignment

Cloud Adoption Framework provides guidance for central teams to provide workload landing zones. The workload landing zones are where the workload's custom supply chain deploys applications to.

Learn more in [What is an Azure landing zone?](/azure/cloud-adoption-framework/ready/landing-zone) and the [Azure landing zone design principles](/azure/cloud-adoption-framework/ready/landing-zone/design-principles).

## Related information

- [Azure DevOps](/azure/devops/user-guide/what-is-azure-devops)
- [Reliability pillar](../reliability/checklist.md)
- [Security pillar](../security/checklist.md)

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for designing and creating a monitoring system

Source: [observability.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/observability)

*Learn how to design and create a monitoring framework that provides a foundation for alerts, validates design choices, and informs design decisions.*

# Recommendations for designing and creating a monitoring system

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:06](checklist.md)| **Design and implement a monitoring system to validate design choices and inform future design and business decisions. This system captures and exposes operational telemetry, metrics, and logs that are emitted from the workload.** |
|---|---|

This guide describes the recommendations for designing and creating a monitoring system. To effectively monitor your workload for security, performance, and reliability, you need a comprehensive system with its own stack that provides the foundation for all monitoring, detection, and alerting functions.

## Definitions

| Term | Definition |
|---|---|
| Logs | Recorded system events. Logs can contain different types of data in a structured or free-form text format. They contain a timestamp. |
| Metrics | Numerical values that are collected at regular intervals. Metrics describe some aspects of a system at a particular time. |

## Key design strategies

To implement a comprehensive monitoring system design for your workload, follow these core tenets:

- Whenever practical, take advantage of platform-provided monitoring tools, which typically require little configuration and can provide deep insights into your workload that might otherwise be difficult to obtain.

- Collect logs and metrics from the entire workload stack. All low-code and code-first components and resources should be configured to produce standardized, meaningful data, and that data needs to be collected.

- Store the collected data in a standardized, reliable, and secure storage solution.

- Process stored data so that it can be handled by analysis and visualization solutions.

- Analyze processed data to accurately determine the state of the workload.

- Visualize the state of the workload in meaningful dashboards or reports for workload teams and other stakeholders.

- Configure actionable alerts and other automatic responses to intelligently defined thresholds to notify workload teams when issues arise.

- Include monitoring and alerting systems in your overall workload testing practices.

- Ensure that monitoring and alerting systems are in scope for continuous improvement. Application and configuration behavior in production provides continuous learning opportunities. Incorporate those lessons into monitoring and alerting designs.

- Tie the monitoring data that you gather and analyze back to your [system and user flows](../reliability/identify-flows.md) to correlate the health of the flows with the data as well as the overall health of the workload. Analyzing that data in terms of the flows helps align your observability strategy with your [health model](../reliability/metrics.md).

- Minimize the storage of any identifiable information to ensure that you comply with laws and regulations. If you need to store identifiable information, be sure that when you design your solution, you take into account requirements that allow individuals to request that their information be deleted.

- Never record user passwords or other information that might be used to commit identity fraud. Scrub these details from the data before it's stored. Regulatory requirements might dictate that information collected for auditing and security needs to be archived and saved. This data is also sensitive and might need to be encrypted or otherwise protected to prevent tampering.

You should automate all functions of the monitoring system as much as possible, and they should all run continuously, all day, every day.

This workflow pipeline illustrates the monitoring system:

:::image type="content" source="media/observability/image1.png" alt-text="Diagram that shows the stages of a comprehensive monitoring system as a pipeline." lightbox="media/observability/image1.png" border="false":::

### Collection

You should configure all workload components, whether they're low-code or code-first components or platform settings such as environments and policies, to capture telemetry and events like logs and metrics.

Logs are primarily useful for detecting and investigating anomalies. Typically, logs are produced by the workload component and then sent to the monitoring platform or pulled by the monitoring platform with automation.

Metrics are primarily useful for [building a health model](../reliability/metrics.md) and identifying trends in workload performance and reliability. Metrics are also useful for identifying trends in the usage behavior of your users. These trends can help guide decisions about improvements from the customer perspective. Typically, metrics are defined in the monitoring platform, and the monitoring platform and other tools poll the workload to capture metrics.

#### Workload data

Use the out-of-the-box [integration with Application Insights](/power-platform/admin/overview-integration-application-insights?source=recommendations) to collect data. After Application Insights is enabled, you can get clear visibility into important events, both in real time and historically.

Application logs support the end-to-end application life cycle. Logging is essential to understanding how the application operates in various environments, which events occur, and the conditions under which they occur.

We recommend that you collect application logs and events across all major environments. Separate the data between environments as much as possible by using different data stores for each environment, if doing so is practical. Use filters to ensure that noncritical environments don't complicate the interpretation of production logs. Finally, corresponding log entries across the application should capture a correlation ID for their respective transactions.

#### Infrastructure and configuration data

For infrastructure resources in your workload, ensure that you collect both logs and metrics. Because Power Platform is a platform as a service (PaaS) offering, you might be limited in your ability to capture logs related to underlying infrastructure. You can, however, capture logs and analytics on configuration and policy changes related to workload health and incidents.

As much as possible, collect logs from your cloud platform. You might be able to collect activity logs for your subscription and diagnostic logs for the management plane.

#### Performance considerations

A complex and highly scalable application might generate huge volumes of data. The amount of data can cause performance issues depending on how verbose the tracing is at the application level. The telemetry solution must not act as a bottleneck and must be scalable as the system expands.

### Analysis

After you collect data from various sources, analyze it to assess the overall well-being of the system. For this analysis, have a clear understanding of:

- How to structure data based on key performance indicators (KPIs) and other performance metrics that you defined.
- How to correlate the data captured in different metrics and log files. This correlation is important when you're tracking a sequence of events and can help you diagnose problems.

In most cases, your workload will have different components and logs or events will be captured in different formats or tables. You'll need to accurately combine the data to build an understanding of the overall health of the workload.

For example, your Power Platform solution might consist of the following components:

- A canvas app that allows users to interact with the data
- A model-driven app that allows administrators to configure settings for the application
- A cloud flow that performs data operations
- A Dataverse instance that stores data associated with the operation
- An Azure function that retrieves data from Azure table storage and is called from the application

The usage data for a single business operation might span all components of the workload. This information needs to be correlated to provide an overall view of the resource and processing usage for the operation.

#### Recommendations for analysis of data

**Correlate application-level and resource-level logs.** Evaluate data at both levels to optimize detecting and troubleshooting issues.

**Define clear retention times on storage for cold analysis.** We recommend this practice to enable historic analysis over a specific period. It can also help you control storage costs. Implement processes that ensure data is archived to cheaper storage and aggregate data for long-term trend analysis.

**Analyze long-term trends to predict operational issues.** Evaluate long-term data to form operational strategies and also to predict what operational issues are likely to occur, and when. For example, you might note that average response times are slowly increasing over time and approaching the maximum target.

### Visualization

Visualization in health monitoring is critical for understanding the state of the workload. Visualization can help you quickly identify issues and trends, and can also help you understand the effect of changes you make to the workload.

#### Dashboards

The most common way to visualize data is to use dashboards that can display information in the form of charts or graphs. These items can be parameterized, and an analyst can select the important parameters, like the time period, for any specific situation.

Align your dashboards with your health model so that they indicate when the workload or components of the workload are healthy, degraded, or unhealthy.

For a dashboard system to work effectively, it must be meaningful to the workload team. Visualize information that relates to workload health and that's also actionable. When the workload or a component is degraded or unhealthy, members of the workload team should be able to easily identify where in the workload the issue originates and begin their corrective actions or investigations. Conversely, including information that isn't actionable or that's not related to workload health can make the dashboard needlessly complex and frustrating to team members who are trying to discern background noise from actionable data.

You might have dashboards for stakeholders or developers that are customized to only show data about the workload that they find relevant. Ensure that the workload team understands the types of data points that other teams are interested in seeing, and previews the dashboards before sharing them to check for clarity. Providing dashboards about your workload for stakeholders is a good way to keep them apprised of the workload health, but carries a risk of being counterproductive if the stakeholders don't clearly understand the data.

Restrict dashboard access to authorized personnel. Information on dashboards might be sensitive. You should also protect the underlying data to prevent users from changing it.

#### Reporting

Reporting is used to generate an overall view of the system. It might incorporate historical data and current information. Reporting requirements fall into two broad categories: operational reporting and security reporting.

Operational reporting typically includes:

- Aggregating statistics that you can use to understand resource utilization of the overall system or specified subsystems during a specified time window.
- Identifying trends in resource usage for the overall system or specified subsystems during a specified period.
- Monitoring exceptions that have occurred throughout the system or in specified subsystems during a specified period.
- Determining the efficiency of the application for the deployed resources, and understanding whether the volume of resources and their associated costs can be reduced without affecting performance unnecessarily.

Security reporting tracks customer use of the system. It can include:

- Auditing user operations. This task requires recording the individual requests that each user completes, together with dates and times. The data should be structured to enable an administrator to quickly reconstruct the sequence of operations that a user completes during a specified period.
- Tracking resource use by user. This task requires recording how each request from a user accesses the various resources in the system, and for how long. An administrator can use this data to generate a utilization report, by user, for a specified period, possibly for billing.

### Alerts

To help ensure that the system remains healthy, responsive, and secure, set alerts so that operators can respond to them in a timely manner. An alert can contain enough contextual information to help them quickly get started on diagnostic activities.

#### Recommendations for alerting

- Define a process for alert response that identifies the accountable owners and actions.
- Configure alerts for a well-defined scope and adjust the verbosity to minimize noise.
- Use an automated alerting solution, like Splunk or Azure Monitor, instead of requiring people to actively look for issues.
- Use alerts to operationalize remediation processes. For example, automatically create tickets to track issues and resolutions.

#### Thresholds

Alerts are generated when thresholds are crossed, as detected by your monitoring system. Ensure that the thresholds you set generally give you enough time to implement the necessary changes to your workload to avoid degradation or outages. You should also implement necessary error handling and catch known errors in your workload to reduce the number of alerts. For example, configure retry policies for your actions in cloud flows so that a retry is attempted as part of the flow run, and only if repeated retries fail and flow failure is recorded and an alert is sent. Learn more in [Recommendations for designing a reliable monitoring and alerting strategy](../reliability/monitoring-alerting-strategy.md).

## Example

[Distributed tracing across multiple services in Power Platform](/power-platform/architecture/key-concepts/distributed-tracing) provides an example scenario and visual representation of how to trace events across multiple services. This guidance provides practical applications and use cases for distributed tracing and explains how to implement it across multiple services in Power Platform.

## Power Platform facilitation

Use the [Monitor](/power-platform/admin/monitoring/monitoring-overview) area of the Power Platform admin center to measure and improve operational health metrics of apps and flows. The Monitor experience is available to both makers and admins. Makers use the data to improve their resources. Admins use it to understand aggregate operational health in the tenant or in specific environments. The purpose of the Monitor area of the Power Platform admin center is to bring attention to resources that have degraded operational health and highlight resources that have opportunities for improvement.

Power Platform integrates with [Application Insights](/azure/azure-monitor/app/app-insights-overview), which is part of the [Azure Monitor](/azure/azure-monitor/overview) ecosystem. Use this integration to:

- Receive telemetry on diagnostics and performance captured by the [Dataverse platform in Application Insights](/power-platform/admin/overview-integration-application-insights). You can subscribe to receive telemetry about operations that applications perform on your Dataverse database and within model-driven apps. This telemetry provides information that you can use to diagnose and troubleshoot issues related to errors and performance.

- [Connect your canvas apps to Application Insights](/power-apps/maker/canvas-apps/application-insights). You can use these analytics to diagnose issues and understand what users do with your apps. You can collect information to help you drive better business decisions and improve the quality of your apps.

- [Configure Power Automate telemetry](/power-platform/admin/app-insights-cloud-flow) to flow into Application Insights. For example, you can monitor cloud flow executions and create alerts for cloud-flow run failures.

- Capture telemetry data from your [Microsoft Copilot Studio agent](/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry) for use in Azure Application Insights. You can use this telemetry to monitor logged messages and events sent to and from your agent, topics to be triggered during user conversations, and custom telemetry events that can be sent from your topics.

Power Platform resources log activities in the [Microsoft Purview compliance portal](/purview/purview). Most events are available within 24 hours of the activity. Don't use this information for real-time monitoring. For more information about logging activities in Power Platform, consult:

- [Power Apps](/power-platform/admin/logging-powerapps)
- [Power Automate](/power-platform/admin/logging-power-automate)
- [Copilot Studio](/microsoft-copilot-studio/admin-logging-copilot-studio)
- [Power Pages](/power-platform/admin/logging-power-pages)
- [Power Platform connectors](/power-platform/admin/connector-events-power-platform)
- [Data Policy activity logging](/power-platform/admin/dlp-activity-logging)
- [View Power Platform administrative logs using auditing solutions in Microsoft Purview](/power-platform/admin/admin-activity-logging)
- [Dataverse auditing](/power-platform/admin/manage-dataverse-auditing)

Your Power Platform workload might include Azure resources. Learn more in [Recommendations for designing and creating a monitoring system](/azure/well-architected/operational-excellence/observability).

The [Power Platform CoE Starter Kit](/power-platform/guidance/coe/starter-kit) is a reference implementation containing a collection of components and tools designed to help you get started with developing a strategy for adopting and supporting Power Platform. Included with the CoE Starter Kit is a rich set of dashboards. Learn more in [Gain deep insights into your Microsoft Power Platform adoption with the CoE Power BI dashboard](/power-platform/guidance/coe/power-bi).

The [Power Platform Automation Kit](/power-automate/guidance/automation-kit/overview/introduction) is set of tools that accelerates the use and support of Power Automate for desktop for automation projects. The kit provides tools that help you manage automation projects and monitor them to estimate money saved and return on investment (ROI). Part of the Automation Kit is the [control center](/power-automate/guidance/automation-kit/control-center-overview), which complements the Monitor desktop flow runs feature. The key focus of the control center is an orchestrator view for support analysts and organizations to monitor, take action, and alert when necessary.

The [Agent Inventory feature](/microsoft-copilot-studio/guidance/kit-agent-inventory) of the [Copilot Agent Kit](/microsoft-copilot-studio/guidance/kit-overview) provides administrators with a tenant-wide view to all Copilot Studio custom agents in their organization, including detailed information on the features they are using, authentication mode, knowledge sources, orchestration type, and more.

## Related information

- [Recommendations for designing a reliable monitoring and alerting strategy](../reliability/monitoring-alerting-strategy.md)
- [Recommendations for monitoring and threat detection](../security/monitor-threats.md)
- [Dataverse auditing](/power-platform/architecture/key-concepts/dataverse-auditing)

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for designing an emergency response strategy

Source: [emergency-response.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/emergency-response)

*Learn how to design an effective emergency operations practice that clearly defines roles and responsibilities to ensure timely issue resolution.*

# Recommendations for designing an emergency response strategy

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:07](checklist.md)| **Develop an effective emergency operations practice. Ensure that your workload emits meaningful health signals. Collect the resulting data and use it to generate actionable alerts that enact emergency responses through dashboards and queries. Clearly define human responsibilities, such as on-call rotations, incident management, emergency resource access, and running postmortems.** |
|---|---|

This guide describes the recommendations for designing an emergency response strategy. Some of your workloads might be mission-critical, and issues that arise over the course of a workload's life cycle might be severe enough to warrant declaring them emergencies. You can implement tightly controlled and focused processes and procedures that your team can follow to ensure that an issue is handled in a calm, orderly manner. Emergencies naturally raise everyone's stress levels and can lead to a chaotic environment if your team isn't well-prepared. To help minimize stress and confusion, design a response strategy, share the response strategy with your organization, and perform regular emergency response training.

## Key design strategies

An emergency response strategy should be a well-defined set of processes and procedures. Each process and procedure should have scripts to ensure that each step progresses your team toward quickly and safely resolving an issue. To develop an emergency response strategy, consider the following overview:

- Prerequisites
  - Develop a monitoring system
  - Create an incident response plan
- Incident phases
  - Detection and containment
  - Triage
- Post-incident phases
  - Root cause analysis (RCA)
  - Postmortem
- Ongoing activity
  - Emergency response drills

The following sections provide recommendations for each of these phases.

### Monitoring system

To have a robust emergency response strategy, you need to have a robust monitoring system, or observability platform, in place. Your observability platform should have the following characteristics:

- **Holistic monitoring**: Ensure that you thoroughly monitor your workload from a configuration and application perspective, and include infrastructure monitoring if components of your workload are hosted in the cloud or on-premises. Make sure that all components of your workload are covered by your monitoring strategy. For example, if your workload interacts with Azure resources or an on-premises system, include those components in your monitoring.

- **Verbose logging**: Enable verbose logging for your components to assist with investigations when you triage an issue. Structure logs so that they're easy to manage. Automatically send logs to data sinks to be prepared for analysis.

- **Useful dashboards**: Create dashboards based on your health model that are tailored to each team across your organization. Different teams are responsible for different aspects of workload health.

- **Actionable alerts**: Create alerts that are useful for your workload teams. Avoid alerts that don't require action from your teams. Too many alerts of this kind can lead to people ignoring or blocking alert notifications.

- **Automatic notifications**: Ensure that appropriate teams automatically receive alerts that require action from them. For example, your Tier 1 support team should get notifications for all alerts, whereas your security engineers should only get alerts for security events.

Learn more in [Recommendations for designing and creating a monitoring framework](observability.md).

### Incident response plan

The foundation of an emergency response strategy is an incident response plan. As with a disaster recovery plan, clearly and thoroughly define roles, responsibilities, and procedures for responding to an incident. The plan should be a version-controlled document that's subject to regular reviews that ensure it's up to date.

Clearly define the following components in your plan.

#### Roles

Identify an incident response manager. This person owns the incident from initiation to remediation to the root cause analysis. An incident response manager ensures that processes are followed and the appropriate parties are informed as the response team performs its work.

Identify a postmortem leader. This individual ensures that postmortems are performed soon after the incident is resolved. They produce a report, which helps you apply the findings that come out of the incident.

#### Processes and procedures

Your workload team should define and understand emergency criteria. When your team determines that a case is severe, you can declare a disaster and initiate the disaster recovery plan. In less severe cases, the issue might not meet the criteria of a disaster, but you should still consider the issue an emergency, which requires initiating the emergency response plan. Emergencies can either be internal to your workload, such as bugs in your application code, or a result of an issue with a dependency of your workload, such as unavailability of an API or a database. An emergency might also be caused by an outage of your supplier (such as an issue with Microsoft Entra ID or Power Platform). The support team must be able to determine whether an issue meets the emergency criteria, even if the team has no visibility into the underlying issue.

Precisely define communication and escalation plans. Based on the type of alert notification that they receive, ensure that your Tier 1 support team members can easily contact the appropriate teams for escalating issues.

#### Other items to include

Document all standard tools that are used during incidents for internal communication, like Microsoft Teams, and for tracking the activities over the course of the incident, like ticketing tools or backlog planning tools.

Document your emergency credentials, otherwise known as *break-glass accounts*. Include a step-by-step guide that describes how they should be used.

Create emergency response drill instructions, and keep a record of when drills are performed.

Document any legal or regulatory measures necessary, such as communicating data breaches.

### Incident detection and containment

When you have a well-designed monitoring system that monitors for anomalies and automatically alerts on them, you can quickly detect issues and determine their severity. If the issue is deemed an emergency, the plan can be initiated. In some cases, the support team isn't notified through the monitoring system. Users might report issues to support by using support team communication avenues. Or they might reach out to people whom they regularly work with or who they know are working with Power Platform, like your Power Platform service admins or Center of Excellence team. No matter how the support team is notified, they should always follow the same steps to validate the issue and determine the severity. Deviation from the response plan can add stress and confusion.

### Triage

The first step in issue remediation is to identify the component of the workload that is causing the issue. The steps that you follow during triage depend on the type of issue. The team for a certain area of workload support should create procedures for incidents that are related to its work. For example, security teams should triage security issues, and they should follow scripts that they develop. It's important that teams follow well-defined scripts as they work through their triage efforts. These scripts should be step-by-step instructions that include rollback processes to undo changes that are ineffective or can cause other issues. After the issue is resolved, follow well-defined processes to safely bring the affected component back into the workload flow paths.

### Root cause analysis reporting

The incident owner or someone who worked closely with them should create the root cause analysis (RCA) reports. This strategy ensures an accurate accounting of the incident. Typically, organizations have a defined RCA template with guidelines about how information is presented and what kinds of information can or can't be shared. If you need to create your own template and guidelines, ensure that stakeholders review and approve them.

### Incident postmortems

An impartial individual should lead blameless postmortems. In postmortem sessions, everyone shares their findings from an incident. Each team that was involved in the incident response should be represented by individuals who worked on the incident. Those individuals should come to the session prepared with examples of the actions that were successful and areas that can be improved. The session isn't a forum for assigning blame for the incident or issues that might come up during the response. The postmortem leader should leave the session with a clear list of action items that focus on improvement, such as:

- **Improvements to the response plan.** Processes or procedures might need to be reevaluated and rewritten to better capture appropriate actions.
- **Improvements to the monitoring system.** Thresholds might need to be reevaluated to catch the specific type of incident earlier, or new monitoring might need to be implemented to catch behavior that wasn't accounted for.
- **Improvements to the workload.** The incident might expose a vulnerability in the workload that must be addressed as a permanent remediation.

## Considerations

Your emergency response strategy should be closely aligned to your overall [Power Platform support strategy](/power-platform/guidance/adoption/support-strategy-solutions). Work with your Power Platform administrators and Center of Excellence team to discuss support and emergency response options and processes that might already be defined.

As you define your support process and escalation path, it's important to [categorize solutions](/power-platform/guidance/adoption/support-strategy-solutions#define-tiers-of-applications) built based on criticality. This practice allows you to establish processes that ensure that critical applications have the necessary guardrails to support them, while not stifling innovation of productivity scenarios or overwhelming your incident response teams. As you define your support models, also think about a graduation path. A solution might start off only requiring productivity-level support but grow in functionality or user base to require a higher level of support. Define how makers can request more formal support and transition a solution to supported environments.

## Power Platform facilitation

Power Platform integrates with [Application Insights](/azure/azure-monitor/app/app-insights-overview), which is part of the [Azure Monitor](/azure/azure-monitor/overview) ecosystem. Use this integration to:

- Receive telemetry on diagnostics and performance captured by the [Dataverse platform in Application Insights](/power-platform/admin/overview-integration-application-insights). You can subscribe to receive telemetry about operations that applications perform on your Dataverse database and within model-driven apps. This telemetry provides information that you can use to diagnose and troubleshoot issues related to errors and performance.

- Connect your [canvas apps to Application Insights](/power-apps/maker/canvas-apps/application-insights). You can use these analytics to diagnose issues and understand what users do with your apps. You can collect information to help you drive better business decisions and improve the quality of your apps.

- Configure [Power Automate telemetry](/power-platform/admin/app-insights-cloud-flow) to flow into Application Insights; for example, to monitor cloud flow executions and create alerts for cloud flow run failures.

- Capture telemetry data from your [Microsoft Copilot Studio agent](/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry) for use in Azure Application Insights. You can use this telemetry to monitor logged messages and events sent to and from your agent, topics to be triggered during user conversations, and custom telemetry events that can be sent from your topics.

Application Insights is a comprehensive solution for collecting, analyzing, and responding to monitoring data from cloud and on-premises environments. It includes a robust alerting platform that you can configure for [automatic notifications and other actions](/azure/azure-monitor/alerts/action-groups).

The [Power Platform Automation Kit](/power-automate/guidance/automation-kit/overview/introduction) is set of tools that accelerates the use and support of Power Automate for desktop for automation projects. The kit provides tools that help you manage automation projects and monitor them to estimate money saved and return on investment (ROI). Part of the Automation Kit is the [control center](/power-automate/guidance/automation-kit/control-center-overview), which complements the existing Monitor desktop flow runs feature. The key focus of the control center is an orchestrator view for support analysts and organizations to monitor, take action, and alert when necessary.

## Related information

- [Recommendations for designing and creating a monitoring system](observability.md)
- [Recommendations for designing a reliable monitoring and alerting strategy](../reliability/monitoring-alerting-strategy.md)
- [User and maker support strategy](/power-platform/guidance/adoption/support-strategy)

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for implementing automation

Source: [automate-tasks.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/automate-tasks)

*Learn how to establish standards and ensure consistency by automating tasks that are repetitive and might be prone to human error.*

# Recommendations for implementing automation

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:08](checklist.md)| **Automate all tasks that don't benefit from the insight and adaptability of human intervention, are highly procedural, and have a shelf-life that yields a return on the automation investment. Prefer off-the-shelf software for automation over custom implementations where available. Treat all automation as workload components, applying Well-Architected pillars to their design and implementation.** |
|---|---|

This guide describes the recommendations for adopting automation in your workload. Automate tasks that are repetitive and prone to human error to help your teams gain efficiency and adhere to standards. Automation enables your operations and engineering teams to be more efficient because it gives them more time to work on other improvements. Automation is a powerful tool in all aspects of workload management. Thoughtfully implement automation to empower your organization.

## Key design strategies

As you develop your workload, look for opportunities to take advantage of automation to reduce management burden and minimize human error. Evaluate these opportunities and consider the value that they bring to your organization. To maximize the value of your investment in automation, prioritize tasks that are straightforward, procedural, and have a long shelf-life. Applying automation isn't an all-or-nothing tactic. There are workstreams that might have operations that require human intervention, like decision-making points. These workstreams can still benefit from automation to perform other tasks.

### Target tasks to automate

Consider the following recommendations to ensure that you prioritize tasks that benefit the most from automation:

- **Aim for easy wins.** Focus on tasks that are highly procedural and susceptible to human error. These tasks are highly automatable. They're clearly defined, they're free from variables that add complexity, and they're performed as part of normal operations. Conversely, don't prioritize automating tasks that require writing complex scripts to account for variable phenomena or that rarely occur. Examples of highly automatable tasks include granting permissions, creating environments, or applying policies to environments. These tasks might occur on a schedule, as a response to an event or monitoring alert, or as needed based on external factors.

- **Look for ways to empower operators and free up your SMEs.** You might have subject matter experts (SMEs) in your organization whom you rely on for escalations that might be unnecessary. For example, your Power Platform admin might routinely get requests to create new environments or apply data policies to an environment when new workloads are starting their development. If you build a request management portal, you can enable developers to request environments that automatically get created after approval. You might even decide to automatically approve requests from certain teams.

- **Focus on your return on investment.** High-value automation requires minimal management overhead and adds a demonstrable degree of efficiency. If you can save your operations team an hour each day by automating environment creation, for example, you give them time to find other areas for improvement.

### Areas to implement automation

Adopt automation throughout your entire workload life cycle, from development to day-to-day management. Use the following examples to help you consider the broad areas of your workload life cycle that can benefit from automation:

- **Pipeline definition, execution, and management**: Use continuous integration and continuous delivery (CI/CD) tools, like Azure DevOps and other DevOps tools, to automatically define a pipeline and how it runs. These tools can help you automate CI/CD tasks or other tasks, like creating reports.

- **Deployments**: Use tools like Azure Resource Manager templates, Bicep, Terraform, and Ansible to automate your workload development and release processes.

- **Testing**: Some tools are available for automating your testing processes. These tools can relieve a significant burden from your quality assurance team and ensure that tests are standardized and reliable.

- **Monitoring and alerting**: Use tooling that's available in your monitoring solution to automatically enroll newly deployed resources and configure alert-triggered actions to help hasten remediation when issues arise.

- **Configuration management**: Use orchestration and policy tooling to ensure that all of your resources run the same configuration and that compliance requirements are enforced across your workload.

- **Other administrative tasks**: Use scripts to automate repetitive tasks like creating environments or applying policies.

- **Approvals**: Enable systems to automatically make approval decisions based on predefined rules to improve efficiency for workflows that have approval gates. This method encourages the use of standardized forms and templates, which increases the efficiency of the processes. Automatic approval in high environments can be risky. Tightly focus and test your automated approvals to ensure that specific criteria are defined to grant approval.

- **New user and new employee onboarding**: You can automate many tasks that are associated with onboarding new application users or new employees, like granting permissions or access to resources.

- **Support processes**: You can automate support processes by deploying an agent that can query a knowledge base to answer frequently asked questions or guide users through troubleshooting steps. Integrating the agent with ticketing systems enables it to automatically create support tickets when issues require escalation. Consider building an agent that [automates bug reporting](/power-platform/architecture/solution-ideas/auto-ai-triage).

### Choose an appropriate automation tool

Developing your own automation in-house is time-intensive and can introduce management burden to your development team. They need to maintain an in-house automation tool like they do any other in-house software. It's recommended that you use off-the-shelf tools whenever they can meet your needs. Between commercial, open source, and cloud platform tools, there are many options available. It's likely that you'll use various tools to build the automation that you need. Reflect on the tasks that you plan to address with automation, and invest in the tools that can specifically address those tasks. Don't procure tools that you generally prefer and then consider the tasks afterward.

### Integrate automation into your workload

For any tool that you use to build your automation, make it easily accessible and manageable for your operators. Provide clear and easy-to-use interfaces for your workload team. You can provide access to CI/CD pipelines, APIs, and libraries. Like the workload that the automation supports, you need to manage the automation holistically. Secure automation to the same degree as other workload components. Monitor automation and subject it to the same testing protocols as other workload components.

## Considerations

Sometimes the efficiencies that you gain from automation outweigh the management burden of developing your own solution if no off-the-shelf solutions fit your requirements. In these cases, be judicious in your development efforts. Narrowly focus on developing only what you need to cover gaps that you can't solve with off-the-shelf solutions, and minimize complexities like dependencies.

Complex automation that requires a high degree of maintenance can be difficult for operations teams to manage and troubleshoot. Keep automated tasks tightly focused on only performing discrete jobs. Try to minimize dependencies on other tools or components.

Be thoughtful about using manual processes. If you decide not to automate an operation, thoroughly document the manual process by creating a step-by-step checklist for operators. This practice reduces the chances of human error, like an operator mistakenly running the wrong process. Documentation also helps you design automation for that process in the future.

When you use a hybrid manual and automated approach, you need to be especially careful. If a script runs most of a process and then defers a specific step or decision to a human, give that person the necessary context and information to make an informed decision.

## Power Platform facilitation

[Programmability and extensibility](/power-platform/admin/programmability-extensibility-overview#available-tools) tools are available for administrators to orchestrate and automate routine activities for their tenants. Available tools include connectors, the Power Platform CLI, PowerShell cmdlets, and APIs.

[Power Automate](https://azure.microsoft.com/products/power-automate/) enables you to automate Power Platform workloads; for example, custom digital process automation to handle workload tasks like approval flows. With Power Automate, you can construct workflows from built-in connectors and templates. The large ecosystem of software as a service (SaaS) connectors enables you to connect apps like Microsoft 365 and Azure, data, and devices in the cloud. You can use [Power Platform admin connectors](/connectors/powerplatformforadmins/) to connect to the Power Platform service itself and perform operational tasks, such as creating environments or sharing applications.

Power Automate approvals (out of the box) or the [Approvals kit](https://www.microsoft.com/power-platform/blog/power-automate/introducing-approvals-kit/) (a custom solution) enable you to implement both simple and complex approval flows that can aid in automation scenarios. Learn more in [Business approvals templates overview](/power-automate/guidance/business-approvals-templates/introduction).

[Copilot Studio](/microsoft-copilot-studio/fundamentals-what-is-copilot-studio) enables you to build agents and agent flows. With Copilot Studio, you connect to other data sources using either prebuilt or custom plugins.

[GitHub Actions](https://docs.github.com/actions) enable developers to build automated software development life cycle workflows. With [GitHub Actions for Microsoft Power Platform](https://github.com/marketplace/actions/powerplatform-actions), you can create workflows in your repository to build, test, package, release, and deploy apps; perform automation; and manage bots and other components built on Power Platform.

[Microsoft Power Platform Build Tools](/power-platform/alm/devops-build-tools) can be used to automate common build and deployment tasks related to apps built on Power Platform.

[Power Platform CoE Starter Kit](/power-platform/guidance/coe/starter-kit) is a reference implementation that contains a collection of components and tools that helps you develop a strategy to adopt and support Power Platform. Included with the CoE Starter Kit is a rich set of processes that automate your administrative and governance tasks, such as identifying ownerless and highly used applications.

## Related information

- [Environment Request management](/power-platform/guidance/coe/setup-environment-components), part of the CoE Starter Kit
- [Business approvals templates](/power-automate/guidance/business-approvals-templates/introduction)

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for enabling automation in your workload

Source: [enable-automation.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/enable-automation)

*Learn how to design and implement automation up front to simplify maintenance tasks, apply governance, and address deployment concerns.*

# Recommendations for enabling automation in your workload

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:09](checklist.md)| **Design and implement automation up front for operations such as life cycle concerns, and apply governance and compliance guardrails. Don't try to retrofit automation later. Choose automation features that your platform provides.** |
|---|---|

This guide describes the recommendations for designing and implementing your workload to enable automation. Design your workload with automation in mind to ensure that routine tasks such as provisioning resources, scaling, and deployments are performed quickly and reliably. Automation simplifies maintenance tasks and allows you to update, patch, and upgrade your systems more efficiently.

## Key design strategies

As you develop your workload, consider the following key strategies to enable automation.

### Workload design

You can design your workload to support automation from the ideation phase to the ongoing improvement phase. First, consider how you want to apply automation in your workload to help ensure that you're putting the necessary pieces in place. Think about your workload in terms of the Power Platform Well-Architected pillars to help plan for the types of automation you'll use. You can automate many functions of security, reliability, performance, and operations.

Design with automation in mind to minimize refactoring after your workload is running. Consider your workload requirements when deciding which automation tools to use. There might be off-the-shelf or open-source automation tools that your team is already familiar with. Adopting those tools can make the path to automating your workload easier, but be mindful of their limitations. Always investigate the tools that your cloud platform provides to ensure they're compatible and provide the functionality you require. Examples of ways that you can proactively plan for automation include:

- **Deployment**: Automate your application deployments to ensure a predictable standard. Plan for automated deployment by developing deployment standards, training your team on the tools that you'll use, and implementing the necessary infrastructure.
- **Validation**: Automatically validate compliance requirements against your workload using orchestration or policy tools. Identify the appropriate validation tool for your workload and plan to implement the required systems, such as orchestration servers.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: When designing your workload to enable automation, consider the degree of control that you want to maintain versus the efficiency you can gain through automation. In some cases, your workload might not be mature enough to automate some functions or you might need a level of flexibility that automation doesn't provide.

Also consider the skill set of your team when designing your workload. If a high degree of automation requires tools that your team isn't equipped to support, then you might need to use a less comprehensive design as an intermediate step.

### Continuous workload improvements

Observe your workload in production, analyze usage patterns, and review user behavior and feedback related to your workload to identify areas where you can improve automation. Look for ways to enhance existing automation or introduce new automation to improve your customer experience.

The following sections of this guide offer recommendations for specific areas of automation that can help you in your workload design and implementation.

### Authentication and authorization

Take automation into account when designing your authentication and authorization strategy. It's important to maintain the highest level of security in production workloads, but this strategy can affect automation. For example, the use of multifactor authentication adds complexity that must be accounted for in your automation design. Use nonhuman, secure accounts for automated authentication, such as managed identities, workload identities, or certificates. Ensure that you include secret and key management in your automation for increased authentication security.

### Design variability into your workload

Avoid unnecessarily deploying new solutions when small changes are made by building flexibility into your artifacts. For example, rather than redeploying your solution when a feature flag changes, you can use environment variables in your solution that update app configurations. Be sure to clearly define and document how variability is used to avoid overuse and configuration drift.

### Build a control plane

A control plane is the back-end system or suite of tools that you use to manage the application and its dependencies through a unified interface. Build your control plane like a REST interface, CLI, or webhook to support automation by external tools.

Expose maintenance operations through the control plane that allow you to coordinate workload components, like orderly backup and restore, bootstrapping, configuration, import/export, and batching operations. Be careful to choose the right level of granularity when deciding which operations to expose through the control plane.

### Monitor and log

Develop a monitoring strategy to capture metrics that drive the type of automation you require. Use structured logging and custom metrics to provide the information that's required by automation in a format that's easy to recognize with automation tools. The metrics that you capture should be paired with thresholds defined in the monitoring system that trigger alerts and automated actions.

### User life cycle

Design your workload to allow for automated user onboarding and offboarding. Plan for automated scripts that update permissions, share resources, and provide credential and secret management.

### Orchestration and policy use

As part of your continuous workload management, you can automate Desired State Configuration (DSC) in your resources to help ensure that they meet compliance and business requirements. DSC automation helps ensure that configuration drift is caught and remediated quickly.

You can automate DSC using orchestration tools or policy management tools. Think of orchestration tools, like Azure DevOps or Jenkins, as push-based mechanisms. Orchestration tools allow configuration updates to be pushed out through a workflow event, like a manual or automated deployment. These updates are run as part of a task sequence that's defined in your deployment script. Policy management tools use pull-based mechanisms, meaning that a system runs at the foundational level of your workload that periodically polls the workload to check its state against your DSC. If the poll identifies a misalignment or configuration drift, the tool takes corrective action.

Consider the following factors when deciding between orchestration and policy management tools:

- Orchestration tools don't have built-in capabilities to proactively poll your workload for configuration drift. Orchestration tools should be integrated into your continuous integration and continuous delivery (CI/CD) pipeline to maintain a standard for infrastructure as code (IaC) deployment and management. An advantage of using orchestration tools is that resources are always fully configured when deployed.

- Policy management tools allow you to define policies that affect one or more groups of resources. These policies are enforced when the resource checks in with the policy management system. An advantage of using policy management is that these systems aren't code-driven, so they might be easier for operators on your team to adopt.

Also consider whether the configuration updates you're planning to make on new resources must be made at the time of deployment, whether defining updates in code fits your operational practices, and how many resource types you plan to deploy. If there are many different configurations across resource types, policy tools might be an easier way to manage updates.

## Power Platform facilitation

[Environment groups](/power-platform/admin/environment-groups) are designed to help administrators organize their flat list of environments into structured groups based on different criteria, such as business unit, project, and location. Administrators can apply rules to groups to govern environments in bulk, reducing manual effort and ensuring consistency.

[Programmability and extensibility](/power-platform/admin/programmability-extensibility-overview#available-tools) tools are available for administrators to orchestrate and automate routine activities for their tenants. Available tools include connectors, the Power Platform CLI, PowerShell cmdlets, and APIs.

[Environment variables in solutions](/power-apps/maker/data-platform/environmentvariables) support design variability in the workload; for example, to store parameter keys and values, which then serve as input to other application objects. Separating the parameters from the consuming objects allows you to change the values within the same environment or when you migrate solutions to other environments.

[Conditional Access](/azure/active-directory/conditional-access/overview) is a feature of Microsoft Entra ID that lets you control how and when users can access applications and services. Follow the recommendations for [conditional access and multifactor authentication](/troubleshoot/power-platform/power-automate/conditional-access-and-multi-factor-authentication-in-flow) when automating processes with Power Automate.

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for safe deployment practices

Source: [safe-deployments.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/safe-deployments)

*Learn how to establish safe deployment practices and define processes for rolling out changes to your workload.*

# Recommendations for safe deployment practices

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:10](checklist.md)| **Clearly define your workload's safe deployment practices. Emphasize the ideals of small, incremental, quality-gated release methods. Use modern deployment patterns to control risk. Account for routine deployments and emergency, or hotfix, deployments.** |
|---|---|

This guide describes the recommendations for using safe deployment practices. Safe deployment processes and procedures define how to safely make and deploy changes to your workload. Implementing them requires you to think about deployments through the lens of managing risk. You can minimize the risk of human error in your deployments and limit the effects of problematic deployments on your users by implementing these practices.

## Key design strategies

There are important guidelines to keep in mind when implementing safe deployment practices:

- **Safety and consistency**: All changes to the production workload are inherently risky and must be made with a focus on safety and consistency.
- **Health models**: Deployments must pass health checks before each phase of progressive exposure can begin.
- **Issue detection**: When issues are detected, the deployment should be immediately halted and recovery initiated.

The following sections provide detailed recommendations on each of these points.

### Safety and consistency

Whether you're deploying an update to your application code, infrastructure as code (IaC), feature flag, or configuration, you're introducing risk to the workload. There are no low-risk deployments to production. Every deployment must follow a standard pattern and should be automated to enforce consistency and minimize the risk of human error. It's critical that your workload supply chain and deployment pipelines are reliable, secure, and have clearly defined deployment standards. Treat every deployment as a possible risk and subject every deployment to the same level of risk management.

Despite the risks, you should continue to deploy regular changes to your workload. Failing to deploy regular updates introduces other risks, like security vulnerabilities that must be addressed through deployments. Learn more in [Recommendations for designing a workload development supply chain](workload-supply-chain.md).

Frequent small deployments are preferable to infrequent large deployments. Small changes are easier to resolve when issues arise and frequent deployments help your team build confidence in the deployment process. It's also important that you learn from production by reviewing your workload processes when you encounter an anomaly during deployment. You might find weaknesses in the design of your infrastructure or rollout. When issues occur during deployments, ensure that blameless postmortems are part of your process to capture lessons about the incident.

### Health models

Develop a robust health model as part of your observability monitoring platform and reliability strategies. Your health model should provide in-depth visibility into the components and overall health of the workload. Monitor the health metrics closely following a rollout. If you receive an alert about a health change during the rollout, investigate the issue immediately and determine the next course of action, such as rolling back the change. If users don't report issues and all health indicators stay green, the rollout should continue. Be sure to include usage metrics in your health model to help ensure that a lack of user-reported issues and negative health signals isn't hiding an issue. Learn more in [Recommendations for performing failure mode analysis](../reliability/failure-mode-analysis.md).

### Issue detection

When your deployment causes an issue in one of the rollout groups, the rollout must stop immediately. Investigate the cause of the issue and the severity of the effects as soon as the alert is received. Recovery from the issue can include:

- **Rolling back** by undoing the changes made in the deployment and reverting back to the last known working configuration.
- **Rolling forward** by addressing the issue during the rollout. You can address issues mid-rollout by applying a hotfix or otherwise minimizing the issue.
- **Deploying new infrastructure** by using the last known working configuration.

Rolling back changes, especially database, schema, or other stateful component changes, can be complex. Your safe deployment practices guidelines should provide clear instructions on how to deal with data changes according to the data estate design for your workload. Similarly, rolling forward must be handled carefully to ensure that safe deployment processes aren't neglected and that the hotfix or other minimizing efforts are performed safely.

### General recommendations

- Implement versioning across your build artifacts to help ensure that you can roll back and roll forward when necessary.

- Use a release flow or trunk-based branching structure, which enforces tightly synced collaboration across the development team, instead of a Gitflow or environment-based branching structure.

- Automate as much of your safe deployment practice as possible. Learn more in [Recommendations for implementing automation](automate-tasks.md).

- Use continuous integration (CI) practices to regularly integrate code changes into repositories. CI practices can help you identify integration conflicts and reduce the likelihood of large, risky merges. Learn more in [Recommendations for continuous integration](release-engineering-continuous-integration.md).

- Use feature flags to selectively enable or disable new features or changes in production. Feature flags can help you control the exposure of new code and quickly roll back deployment if issues arise.

- Deploy changes to staging environments that mirror your production environment. Practice environments allow you to test changes in a controlled setting before deploying to the live environment.

- Establish predeployment checks, including code review, security scans, and compliance checks, to help ensure that changes are safe to deploy.

- Implement circuit breakers to automatically halt traffic to a service that's experiencing issues and help prevent further degradation of the system.

### Emergency protocols

Establish prescriptive protocols that define how your safe deployment processes can be adjusted for a hotfix or for emergency issues like a security breach or vulnerability exposure. For example, your emergency protocols might include:

- Promotion and approval stage acceleration
- Smoke testing and integration testing acceleration
- Bake time reduction

In some cases, the emergency might limit quality and testing gates, but gates should still be run as quickly as possible as an out-of-band exercise. Make sure that you define who can approve safe deployment acceleration in an emergency and the criteria that must be met for acceleration to be approved. Align your emergency protocols with your [emergency response plan](emergency-response.md) to help ensure that all emergencies are handled according to the same protocols.

## Considerations

Building and maintaining safe deployment practices is complex. Your success in fully implementing robust standards depends on the maturity of your practices across many areas of software development. Use of automation, IaC-only for infrastructure changes, consistency in branching strategies, feature flags, and other practices can help ensure safe deployment. Use this guide to optimize your workload and inform your plans for improvement as your practices evolve.

## Power Platform facilitation

The [Deployment page](/power-platform/alm/admin-deployment-hub) in the Power Platform admin center provides a streamlined experience to help administrators navigate the complexities of managing Power Platform application lifecycle management (ALM) workloads, including managing pipelines deployments at enterprise scale. Admins have visibility to all the deployments in their tenant and can approve deployment requests and troubleshoot issues.

[Pipelines in Power Platform](/power-platform/alm/pipelines) aim to democratize application lifecycle management (ALM) for Power Platform and Dynamics 365 customers by bringing ALM automation and continuous integration and continuous delivery (CI/CD) capabilities into the service. Pipelines can be custom tailored to serve the unique needs of an organization, For example you can add approvals, deploy via service principals, and integrate with internal systems of record, Azure DevOps, GitHub, and more. Learn more in [Extend pipelines in Power Platform](/power-platform/alm/extend-pipelines).

[Microsoft Power Platform Build Tools for Azure DevOps](/power-platform/alm/devops-build-tools) can be used to automate common build and deployment tasks related to apps built on Power Platform.

[GitHub Actions for Power Platform](/power-platform/alm/devops-github-actions) enable developers to build automated software development life cycle workflows. With [GitHub Actions for Microsoft Power Platform](https://github.com/marketplace/actions/powerplatform-actions), you can create workflows in your repository to build, test, package, release, and deploy apps; perform automation; and manage bots and other components built on Power Platform.

[Automate tests with Azure Pipelines](/power-apps/maker/canvas-apps/test-studio-classic-pipeline-editor).

[Environment variables in solutions](/power-apps/maker/data-platform/environmentvariables) store the parameter keys and values, which then serve as input to other application objects. Separating the parameters from the consuming objects allows you to change the values within the same environment or when you migrate solutions to other environments.

[Power Platform environments](/power-platform/admin/backup-restore-environments) provide point-in-time restore functionality that can help you roll back.

## Next steps

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

---

## Recommendations for designing a deployment failure mitigation strategy

Source: [mitigation-strategy.md](https://learn.microsoft.com/en-us/power-platform/well-architected/operational-excellence/mitigation-strategy)

*Learn how to design a standardized strategy for handling deployment failures, enabling issue mitigation and recovery.*

# Recommendations for designing a deployment failure mitigation strategy

**Applies to this Power Platform Well-Architected Operational Excellence checklist recommendation:**

|[OE:11](checklist.md)| **Implement a deployment failure mitigation strategy that addresses unexpected mid-rollout issues with rapid recovery. Combine multiple approaches, such as rollback, feature disablement, or using your deployment pattern's native capabilities.** |
|---|---|

This guide describes the recommendations for designing a standardized strategy to effectively handle deployment failures. Like other workload issues, deployment failures are an inevitable part of a workload life cycle. With this mindset, you can be proactive by having a well-designed, intentional strategy for dealing with deployment failures. Such a strategy enables your workload team to efficiently mitigate failures with as little impact as possible on your users.

The absence of such a plan can lead to chaotic and potentially detrimental responses to issues, which can significantly affect team and organizational cohesion, customer trust, and finances.

## Key design strategies

Occasionally, despite the maturity of your development practices, deployment issues occur. Using safe deployment practices and operating a robust workload supply chain can help you minimize the frequency of failed deployments. You also need to design a standardized strategy to handle failed deployments when they happen.

A deployment failure mitigation strategy is composed of five broad phases:

1. **Detection**: To respond to a failed deployment, you must first detect the failure. Detection can take several forms, like failed smoke tests, user reports, or alerts that your monitoring platform generates.
1. **Decision**: You must decide what the best mitigation strategy is for the specific failure type.
1. **Mitigation**: You must perform the identified mitigation action. The mitigation can take the form of a fallback, rollback, or roll forward.
1. **Communication**: Stakeholders and affected users must be made aware of the status as you detect and work through the issue, as required by your emergency response plan.
1. **Postmortem**: Blameless postmortems provide opportunities for the workload team to identify areas for improvement and create plans to apply learnings.

The following sections provide detailed recommendations for these phases.

### Detection

To quickly identify issues with deployments, you need robust testing and monitoring practices that relate to deployments. To help detect anomalies quickly, you can complement your workload monitoring and alerting by using an application performance management tool and logging through instrumentation.

Smoke testing and other quality testing should happen at each phase of your rollout. Successful tests in one deployment group shouldn't influence decisions to test in subsequent groups.

You can implement telemetry that correlates user issues with a deployment phase. Then you can quickly identify which rollout group a particular user is associated with. This approach is especially important for progressive exposure deployments, because you might have multiple configurations running across your user base at any given point in the deployment.

You should be ready to respond to user-reported issues immediately. Whenever practical, deploy your rollout phase during working hours, when you have a full support team available. Ensure support staff are trained on how to escalate deployment issues for proper routing. Escalations should align with your workload emergency response plan.

### Decision

Deciding on an appropriate mitigation strategy for a deployment issue involves considering factors such as:

- The type of progressive exposure model that you use. For example, you might use a blue-green model or a canary model. If you use a blue-green model, falling back is more practical than rolling back. You can easily shift traffic back to the stack that runs the configuration that's not updated. You can then fix the issue in the problematic environment and try your deployment again at an appropriate time.

- The methods that you have at your disposal for bypassing the issue. Examples include the use of feature flags, environmental variables, or any other type of runtime configuration property that you can toggle on and off. Sometimes you can easily bypass an issue by turning off a feature flag or toggling a setting. In this case, you might be able to:

  - Proceed with the rollout.
  - Avoid falling back.
  - Roll back while you fix the offending code.

- The level of effort required to implement a fix in the code. If the level of effort to fix the code is low, rolling forward by implementing a hotfix is the right choice for certain scenarios.

- The level of criticality for the affected workload. Business-critical workloads should always be deployed in a side-by-side manner, like in a blue-green model, to achieve zero-downtime deployments. As a result, falling back is the preferable mitigation strategy for these types of workloads.

### Mitigation

The following are some common mitigation strategies:

- **Rollback**: In a rollback scenario, you revert updated systems to the last-known-good configuration state.

    It's important for the entire workload team to agree about the meaning of "last known good." This expression refers to the last state of the workload that was healthy before the deployment began, which isn't necessarily the prior application version.

    Rolling back can be complex, especially as it relates to data changes. Schema changes can make rolling back risky. Implementing them safely can require considerable planning. As a general recommendation, schema updates should be additive. Records shouldn't be replaced with new records. Instead, older records should be deprecated and should coexist with new records until it's safe to remove the deprecated records.

- **Fallback**: In a fallback scenario, the updated systems are removed from the production traffic routing. All traffic is directed to the stack that isn't updated. This low-risk strategy provides a way for you to address the issues in your code without introducing further disruptions.

    With canary deployments, falling back might not be straightforward or even possible, depending on your infrastructure and app design. If you need to perform scaling to handle load on systems that aren't updated, perform that scaling before you fall back.

- **Bypass the offending function**: If you can bypass the issue by using feature flags or another type of runtime configuration property, you might decide that continuing with the rollout is the right strategy for an issue.

    You should clearly understand the tradeoff of bypassing the function, and you should be able to communicate that tradeoff to stakeholders. Stakeholders should approve the go-forward plan. Stakeholders need to determine the length of time that's tolerable for operating in a degraded state. They also need to weigh that determination against your estimate of the time that's needed to fix the offending code and deploy it.

- **Emergency deployment (hotfix)**: If you can address the issue mid-rollout, a hotfix might be the most practical mitigation strategy.

    Like any other code, hotfixes need to go through your safe deployment practices. But with a hotfix, the timeline is considerably accelerated. You need to use a code promotion strategy throughout your environments. You also need to check hotfix code at all quality gates. But you might need to dramatically shorten bake times, and you might need to modify tests to accelerate them. Ensure that you can run full tests on the updated code as soon as possible after deployment. Automating quality assurance testing to a high degree helps make testing efficient in these scenarios.

### Communication

It's important to clearly define communication responsibilities to help minimize chaos during incidents. These responsibilities should establish how the workload team engages with support teams, stakeholders, and emergency response team personnel, like the emergency response manager.

Standardize the cadence that the workload team follows for providing status updates. Ensure that stakeholders are aware of this standard so that they know when to expect updates.

If the workload team needs to communicate directly with users, clarify the type of information and level of detail that are appropriate for sharing. Also communicate to the workload team any other requirements that apply to these cases.

### Postmortem

Postmortems should follow all failed deployments without exception. Every failed deployment is an opportunity for learning. Postmortems can help you identify weaknesses in your deployment and development processes and misconfigurations in your infrastructure.

Postmortems should always be blameless so that individuals who are involved in the incident feel safe when they share their perspectives on what can be improved. Postmortem leaders should follow up with plans for implementing the improvements that are identified and for adding these plans to the workload backlog.

### Considerations and general recommendations

Ensure that your deployment pipeline can accept distinct versions as parameters so that you can easily deploy last-known-good configurations.

Maintain consistency with the management and data planes as you roll back or roll forward. Keys, secrets, database state data, and configurations that are specific to resources and policies all need to be in scope and accounted for. For example, pay attention to the design of your infrastructure scaling in your last-known-good deployment. Determine whether you need to adjust that configuration when you redeploy your code.

Prefer small, frequent changes over infrequent, large changes so that the difference between your new and last-known-good deployments is small.

Perform a failure mode analysis on your continuous integration and continuous delivery (CI/CD) pipelines to help identify issues that can complicate mitigation efforts. As with your workload as a whole, your pipelines can be analyzed to identify areas that might be problematic when you attempt a given mitigation type.

Use automated rollback functionality judiciously:

- Some CI/CD tools like Azure DevOps have automatic rollback functionality built in. Consider using this functionality if it provides tangible value to you.
- You should adopt automatic rollback functionality only after you test your pipeline thoroughly and regularly. Ensure that your pipeline is mature enough to introduce extra issues if an automatic rollback is triggered.
- You need to trust that the automation deploys only necessary changes and that it's triggered only when necessary. Design your triggers carefully to meet these requirements.

Use platform-provided capabilities during rollbacks. For example, backups and point-in-time restore can help with storage and data rollbacks. Or if you use virtual machines to host your application, it can be helpful to restore your environment to a checkpoint from immediately before an incident.

Test your entire deployment failure mitigation strategy frequently. Like emergency response plans and disaster recovery plans, your deployment failure plan is only successful if your team is trained on it and practices it regularly. [Chaos engineering and fault injection testing](../reliability/testing-strategy.md#fault-injection-and-chaos-engineering-guidance) can be effective techniques for testing your deployment mitigation strategy.

## Power Platform facilitation

The [Deployment page](/power-platform/alm/admin-deployment-hub) in the Power Platform admin center provides a streamlined experience to help administrators navigate the complexities of managing Power Platform application lifecycle management (ALM) workloads, including managing pipelines deployments at enterprise scale. Admins have visibility to all the deployments in their tenant and can approve deployment requests and troubleshoot issues.

[Pipelines in Power Platform](/power-platform/alm/pipelines) aim to democratize application lifecycle management (ALM) for Power Platform and Dynamics 365 customers by bringing ALM automation and continuous integration and continuous delivery (CI/CD) capabilities into the service.

[Microsoft Power Platform Build Tools for Azure DevOps](/power-platform/alm/devops-build-tools) can be used to automate common build and deployment tasks related to apps built on Power Platform.

[GitHub Actions for Power Platform](/power-platform/alm/devops-github-actions) enable developers to build automated software development life cycle workflows. With [GitHub Actions for Microsoft Power Platform](https://github.com/marketplace/actions/powerplatform-actions), you can create workflows in your repository to build, test, package, release, and deploy apps; perform automation; and manage bots and other components built on Microsoft Power Platform.

[ALM Accelerator](/power-platform/guidance/coe/setup-almaccelerator) is an open-source tool that consists of a set of applications, scripts, and pipelines designed to automate the continuous integration/continuous delivery process.

[Automate tests with Azure Pipelines](/power-apps/maker/canvas-apps/test-studio-classic-pipeline-editor).

Use the [Copilot Agent Kit](/microsoft-copilot-studio/guidance/kit-overview) to configure agents and tests. By running individual tests against the Copilot Studio APIs (Direct Line), the agent responses are evaluated against expected results.

[Environment variables in solutions](/power-apps/maker/data-platform/environmentvariables) store the parameter keys and values, which then serve as input to other application objects. Separating the parameters from the consuming objects allows you to change the values within the same environment or when you migrate solutions to other environments.

[Power Platform environments](/power-platform/admin/backup-restore-environments) provide point-in-time restore functionality that can help you roll back.

Power Platform integrates with [Application Insights](/azure/azure-monitor/app/app-insights-overview), which is part of the [Azure Monitor](/azure/azure-monitor/overview) ecosystem. Use this integration to:

- Receive telemetry on diagnostics and performance captured by the [Dataverse platform in Application Insights](/power-platform/admin/overview-integration-application-insights). You can subscribe to receive telemetry about operations that applications perform on your Dataverse database and within model-driven apps. This telemetry provides information that you can use to diagnose and troubleshoot issues related to errors and performance.

- Connect your [canvas apps to Application Insights](/power-apps/maker/canvas-apps/application-insights). You can use these analytics to diagnose issues and understand what users do with your apps. You can collect information to help you drive better business decisions and improve the quality of your apps.

- Configure [Power Automate telemetry](/power-platform/admin/app-insights-cloud-flow) to flow into Application Insights; for example, to monitor cloud flow executions and create alerts for cloud flow run failures.

- Capture telemetry data from your [Microsoft Copilot Studio agent](/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry) for use in Azure Application Insights. You can use this telemetry to monitor logged messages and events sent to and from your agent, topics to be triggered during user conversations, and custom telemetry events that can be sent from your topics.

## Operational Excellence checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Operational Excellence checklist](checklist.md)

