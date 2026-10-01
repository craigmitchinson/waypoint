# Power Platform Well-Architected — Performance Efficiency Pillar

Verbatim Markdown pulled directly from Microsoft's published documentation source, snapshot dated 20 September 2026. Page bodies are reproduced exactly as published; only each page's YAML frontmatter is stripped and replaced with a title/source line below each heading, and transcluded `[!INCLUDE]` snippets are resolved inline where the include content was reachable. Source repository: `MicrosoftDocs/power-platform`, folder `power-platform/well-architected/performance-efficiency/`. Covers app load time, performance targets/testing, and data performance guidance (delegation, row limits) at the framework level — pairs with the canvas-apps-13-performance-and-optimization.md file already in this corpus, which covers the canvas-app-specific mechanics.

Pages in this file: 12

## Contents

1. [Performance Efficiency design principles for well-architected Power Platform workloads](#performance-efficiency-design-principles-for-well-architected-power-platform-workloads)
2. [Recommendation checklist for Performance Efficiency for Power Platform workloads](#recommendation-checklist-for-performance-efficiency-for-power-platform-workloads)
3. [Performance Efficiency tradeoffs for Power Platform workloads](#performance-efficiency-tradeoffs-for-power-platform-workloads)
4. [Define performance targets recommendation for Power Platform workloads](#define-performance-targets-recommendation-for-power-platform-workloads)
5. [Performance planning recommendation for Power Platform workloads](#performance-planning-recommendation-for-power-platform-workloads)
6. [Select the right services and features recommendation for Power Platform workloads](#select-the-right-services-and-features-recommendation-for-power-platform-workloads)
7. [Collect workload performance data recommendation for Power Platform workloads](#collect-workload-performance-data-recommendation-for-power-platform-workloads)
8. [Performance testing recommendation for Power Platform workloads](#performance-testing-recommendation-for-power-platform-workloads)
9. [Optimize code and logic recommendation for Power Platform workloads](#optimize-code-and-logic-recommendation-for-power-platform-workloads)
10. [Prioritize the performance of critical flows recommendation for Power Platform workloads](#prioritize-the-performance-of-critical-flows-recommendation-for-power-platform-workloads)
11. [Optimize data performance recommendation for Power Platform workloads](#optimize-data-performance-recommendation-for-power-platform-workloads)
12. [Respond to live performance issues recommendation for Power Platform workloads](#respond-to-live-performance-issues-recommendation-for-power-platform-workloads)

---

## Performance Efficiency design principles for well-architected Power Platform workloads

Source: [principles.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/principles)

*Understand the design principles of the Power Platform Well-Architected Performance Efficiency pillar.*

# Performance Efficiency design principles

Performance is a key factor in the success of any Power Platform workload. Poor performance can frustrate users, reduce productivity, and increase costs. To avoid these problems, you need to design your solutions with performance in mind from the start. A performant workload is able to handle changes in load without compromising the user experience or exceeding throughput and request limits of the platform.

Use the following design principles from the [Microsoft Azure Well-Architected Framework](/azure/well-architected) to help build a strategy that ensures the performance meets your business requirements whilst at the same time staying within the limits and capabilities of Power Platform services. Start with the recommended best practices and justify the benefits of each performance efficiency principle. Once you set your strategy, use the [Performance Efficiency checklist](checklist.md) as your next step.

Without a clear understanding of the performance expectations of your workload, you might end up spending too much or too little on resources and fail to satisfy user needs.

## Negotiate realistic performance targets

|![Goal icon](../_images/goal.svg) The intended user experience is defined, and there's a strategy to develop a benchmark and measure targets against the pre-established business requirements.|
|--|

Start your design process with clear performance targets based on the business needs and expectations. Rather than just focusing on technical metrics, work with business stakeholders to set expectations and define targets that are aligned with the expected user experience of the workload.

Learn more about [establishing achievable goals for performance](/azure/well-architected/performance-efficiency/principles#negotiate-realistic-performance-targets) in the Azure Well-Architected Framework.

## Design to meet performance requirements

|![Goal icon](../_images/goal.svg) Select the right services to meet performance targets.|
|--|

It's important to proactively measure performance. Choose services and features across the technology stack that enable you to meet your performance goals, monitor performance, and track which components of the workload might pose challenges. Also, define a process for testing performance.

Learn more about [designing to meet performance requirements](/azure/well-architected/performance-efficiency/principles#design-to-meet-capacity-requirements) in the Azure Well-Architected Framework.

## Achieve and sustain performance

|![Goal icon](../_images/goal.svg) Protect against performance degradation while the system is in use and as it evolves.|
|--|

Performance isn't a one-time activity. You need to keep working on it throughout the development of the workload. Expect to test and optimize your workload multiple times. Any changes to requirements, configuration, code, or product features can affect performance. 

Learn more about [achieving and maintaining performance](/azure/well-architected/performance-efficiency/principles#achieve-and-sustain-performance) in the Azure Well-Architected Framework.

## Improve efficiency through optimization

|![Goal icon](../_images/goal.svg) Improve system efficiency within the defined performance targets to increase workload value.|
|--|

Establish a performance culture that allows developers to spend time on performance optimization. Adjust performance targets based on user experience, and monitor which components of your workload experience heavy load. Continue to evaluate new product features that could improve performance. The cycle of monitoring, optimizing, testing, and deploying is a continuous process.

Learn more about [improving efficiency through optimization](/azure/well-architected/performance-efficiency/principles#improve-efficiency-through-optimization) in the Azure Well-Architected Framework.

## Next steps

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

---

## Recommendation checklist for Performance Efficiency for Power Platform workloads

Source: [checklist.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/checklist)

*Learn about the recommendations that will help you to achieve performance efficiency in your Power Platform workloads.*

# Recommendation checklist for Performance Efficiency

This checklist presents a set of recommendations for you to design your workload so it can grow and meet your workload usage demand. The goal of performance is to maintain the efficiency of every interaction with a healthy system as demand increases. When you design and implement for performance, focus on the efficiency and effectiveness of cost, complexity, supporting new requirements, technical debt, reporting, and toil.

For every system, there's a limit to how much you can scale it without redesigning, introducing a workaround, or incorporating human involvement. If you don't include performance efficiency practices and consider the tradeoffs, your design is potentially at risk. Carefully consider all the points covered in the checklist to instill confidence in your system's success.

## Checklist

|&nbsp;|Code  |Recommendation  |
|-|-|-|
| &#9744; | [PE:01](performance-targets.md)  | **Define performance targets.** Performance targets should be numerical values that are tied to workload requirements. You should implement performance targets for all workload flows. |
| &#9744; | [PE:02](performance-planning.md) | **Conduct performance planning.** Performance planning should be done before there are predicted changes in usage patterns. Predicted changes include seasonal variations, product updates, marketing campaigns, special events, or regulatory changes.  |
| &#9744; | [PE:03](select-services.md) | **Select the right services.** The services and product features must support your ability to reach the workload's performance targets and accommodate expected capacity changes. The selections should also weigh the benefits of using platform features or building a custom implementation.  |
| &#9744; | [PE:04](collect-performance-data.md) | **Collect performance data.** Workload components and flows should provide automatic, continuous, and meaningful metrics and logs. Collect data at different levels of the workload, such as the application, platform, data, and operating system levels.  |
| &#9744; | [PE:05](performance-test.md) | **Test performance.** Perform regular testing in an environment that matches the production environment. Compare results against the performance targets and the performance benchmark. |
| &#9744; | [PE:06](optimize-code.md) | **Optimize logic**. Use code and logic that's performant, and ensure that it offloads responsibilities to the platform. Use logic only for its intended purpose and only when necessary. |
| &#9744; | [PE:07](prioritize-critical-flows.md) | **Prioritize the performance of critical flows.** The allocation of workload resources and performance optimization efforts should prioritize the flows that support the most important business processes, users, and operations. |
| &#9744; | [PE:08](optimize-data-performance.md) | **Optimize data usage.** Optimize data stores for their intended and actual use in the workload. |
| &#9744; | [PE:09](respond-live-performance-issues.md) | **Respond to live performance issues.** Plan how to address performance problems by incorporating clear lines of communication and responsibilities. When a problematic situation occurs, use what you learn to identify preventive measures and incorporate them in your workload. Implement methods to return to normal operations faster when similar situations occur. |
| &#9744; | [PE:10](continuous-performance-optimize.md) | **Continuously optimize performance.** Focus on components that show deteriorating performance over time, such as databases and networking features. |

## Next steps

> [!div class="nextstepaction"]
> [Performance Efficiency tradeoffs](tradeoffs.md)

---

## Performance Efficiency tradeoffs for Power Platform workloads

Source: [tradeoffs.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/tradeoffs)

*Learn about the Performance Efficiency tradeoffs you might encounter when optimizing for the other Power Platform Well-Architected pillars.*

# Performance Efficiency tradeoffs for Power Platform workloads

A workload that meets its performance targets without overprovisioning is efficient. Key strategies for performance efficiency include proper use of code optimizations, design patterns, and capacity planning. Clear performance targets and testing underpin this pillar.

During the design phase of a workload, it's important to consider how decisions based on the [Performance Efficiency design principles](./principles.md) and recommendations in the [Design review checklist for Performance Efficiency](./checklist.md) might influence the goals and optimization efforts of other pillars. Certain decisions may benefit some pillars, yet represent tradeoffs for others. This article lists example tradeoffs that a workload team might encounter when designing workload architecture and operations for performance efficiency.

## Performance Efficiency tradeoffs with Reliability

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Reduced replication and increased density.** A cornerstone of reliability is ensuring resilience by using replication and limiting the blast radius of malfunctions.

- Consolidating workload resources can use excess capacity and improve efficiency. However, it increases the blast radius of a malfunction in the co-located component or application platform.

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased complexity.** Reliability prioritizes simplicity.

- Data partitioning and sharding help avoid performance issues in large or frequently accessed datasets. However, the implementation of these patterns increases complexity because (eventual) consistency needs to be maintained across additional resources.

- Denormalizing data for optimized access patterns can improve performance, but it introduces complexity because multiple representations of data need to be kept synchronized.

- Performance-centric cloud design patterns sometimes necessitate the introduction of additional components. The use of these components increases the surface area of the workload. The components then must themselves be made reliable to keep the whole workload reliable.

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Testing and observation on active environments.** Avoiding the unnecessary use of production systems is a self-preservation approach for reliability.

- Performance testing in active environments carries the risk of causing malfunctions due to the test actions or configurations.

- Workloads should be instrumented with an application performance monitoring (APM) system that enables teams to learn from active environments. The APM tooling is installed and configured in application code or in the hosting environment. Improper use, exceeding limitations, or misconfiguration of the tool can compromise its functionality and maintenance, potentially undermining reliability.

## Performance Efficiency tradeoffs with Security

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Reduction of security controls.** Security controls are established across multiple layers, sometimes redundantly, to provide defense in depth.

One performance optimization strategy is to remove or bypass components or processes that contribute to delays in a flow, especially when their processing time isn't justified. However, this strategy can compromise security and should be accompanied by a thorough risk analysis. Consider the following examples:

- Removing encryption in transit or at rest to improve transfer speeds exposes the data to potential integrity or confidentiality breaches.

- Removing or reducing security scanning or inspecting tools to reduce processing times can compromise the confidentiality, integrity, or availability that those tools protect.

- Removing firewall rules from network flows to improve network latency can allow undesirable communication.

- Minimizing data validation for quicker data processing might compromise data integrity, especially if inputs are malicious.

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased workload surface area.** Security prioritizes a reduced and contained surface area to minimize attack vectors and reduce the management of security controls.

Performance-centric cloud design patterns sometimes necessitate the introduction of additional components. These components increase the surface area of the workload. The new components must be secured, possibly in ways that aren't already used in the system, and they often increase the compliance scope. Consider these commonly added components:

- Introducing multiple different methods of handling business logic, like cloud flows and low-code plugins, based on the performance requirements of each task.

- Offloading processing to background jobs or even client compute.

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Removing segmentation.** The Security pillar prioritizes strong segmentation to enable fine-grained security controls and reduce blast radius.

Sharing resources is an approach for improving efficiency. It increases density to optimize capacity usage. For example, re-using low-code plugins across multiple canvas apps and cloud flows. The increased density can lead to the following security concerns:

- A shared workload identity that violates the principle of least privilege and obscures individual audit trails in access logs.

- Perimeter security controls, for example network rules, that are reduced to cover all co-located components, giving individual components more access than necessary.

## Performance Efficiency tradeoffs with Operational Excellence

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Reduced observability.** Monitoring is necessary to provide a workload with meaningful alerting and help ensure successful incident response.

- Reducing log and metric volume to reduce the processing time spent on collecting telemetry instead of other tasks reduces the overall observability of the system. Some examples of the resulting reduced observability include:

    - It limits the data points that are used to build meaningful alerts.
    - It leads to gaps in coverage for incident response activities.
    - It limits observability in security-sensitive or compliance-sensitive interactions and boundaries.

- When performance design patterns are implemented, the complexity of the workload often increases. Components are added to critical flows. The workload monitoring strategy and performance monitoring must include those components. When a flow spans multiple components or application boundaries, the complexity of monitoring the performance of that flow increases. Flow performance needs to be correlated across all the interconnected components.

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Increased complexity in operations.** A complex environment has more complex interactions and a higher likelihood of a negative impact from routine, ad hoc, and emergency operations.

- Improving performance efficiency by increasing density elevates the risk in operational tasks. An error in a single process can have a large blast radius.

- As performance design patterns are implemented, they influence operational procedures like backups, key rotations, and recovery strategies. For example, data partitioning and sharding can complicate routine tasks when teams try to ensure that those tasks don't affect data consistency.

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Culture stress.** Operational Excellence is rooted in a culture of blamelessness, respect, and continuous improvement.

- Conducting root cause analysis of performance issues identifies deficiencies in processes or implementations that require correction. The team should consider the exercise a learning opportunity. If team members are blamed for issues, morale can be affected.

- Routine and ad hoc processes can affect workload performance. It's often considered preferable to perform these activities during off-peak hours. However, off-peak hours can be inconvenient or outside of regular hours for the team members who are responsible for or skilled in these tasks.

## Performance Efficiency tradeoffs with Experience Optimization

:::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff: Decreased user engagement.** The Experience Optimization pillar prioritizes more engaging user experiences.

- Optimizing for performance prioritizes using platform features over customizations, which deprioritize custom components that could lead to a more engaging user experience.

- Optimizing for performance can focus too much on minimizing complexity, which deprioritizes features for more engaging user experiences, such as custom components and integrations.

- User interface development is often done in faster iterations and ship cycles, which can make it harder to enhance performance continuously.

## Related information

- [Reliability tradeoffs](../reliability/tradeoffs.md)
- [Operational Excellence tradeoffs](../operational-excellence/tradeoffs.md)
- [Experience Optimization tradeoffs](../experience-optimization/tradeoffs.md)
- [Security tradeoffs](../security/tradeoffs.md)

---

## Define performance targets recommendation for Power Platform workloads

Source: [performance-targets.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/performance-targets)

*Learn how to drive continuous improvement by setting performance targets for your Power Platform workload.*

# Recommendations for defining performance targets 

**Applies to this Power Platform Well-Architected Performance Efficiency checklist recommendation:**

|[PE:01](checklist.md)|**Define performance targets. Performance targets should be numerical values that are tied to workload requirements. You should implement performance targets for all workload flows.**|
|---|---|

This guide describes the recommendations for establishing and exposing performance targets. Performance targets are metrics that define performance objectives. These metrics are expressed as a single numerical value or a numerical range. They're clear and specific metrics that drive continuous improvement. Performance targets are a numerical foundation for improvements, and they help teams align their efforts toward specific goals. Without clear performance targets, teams might lack focus and accountability for performance issues. By setting performance targets, teams can work toward specific objectives and drive continuous improvement.

**Definitions**

| Term | Definition |
|---|---|
| Data flow | The movement of data within a system or between systems. |
| Dependency | A component that a workload relies on. |
| Flow | In a workload, a sequence of operations that performs a specific function. It involves the movement of data and the running of processes between components of the workload. Although "flow" might suggest a Power Automate flow, in this context it refers to a generic sequence that isn't tied to a specific implementation. |
| Metrics | Numerical values that are collected at regular intervals. Metrics describe some aspects of a system at a particular time. |
| Performance targets | Metrics that define performance objectives. These metrics are expressed as a single numerical value or a numerical range. |
| User flow | The paths or sequences of actions that users take within an application or system. |
| Workflow | The sequence of steps that a workload runs to accomplish a task. |

## Key design strategies

Establishing performance targets is an essential step in achieving workload performance efficiency. Performance targets define the desired level of performance for your workload and help you gauge its effectiveness in meeting those objectives. Performance targets provide a benchmark to measure and compare a workload's efficiency. This benchmark can help you highlight improvement areas. The targets also align tasks with your organization's objectives and enhance business outcomes. Additionally, performance targets offer guidance in resource allocation, helping you ensure that workloads can adapt to varying demands while maintaining optimal performance.

### Set performance targets early

Set performance targets before you deploy your workload. Performance targets require research. Conduct market research, competitive analysis, and surveys to generate your performance target ranges. For an existing production workload that has no performance targets, use production data and user feedback to establish performance targets.

### Determine performance requirements

Determining performance requirements is about identifying essential performance metrics like response time, throughput, and latency that are critical for your workload. Aligning these performance targets with your organization's business goals ensures the workload meets the desired standards, whether for a best-in-class or average product. For example, you might aim to reduce response times, increase throughput rates, or optimize resource use.

When setting performance goals, it's important to align the organization's objectives with the distinct needs of the user base. Users ultimately determine the success of performance, emphasizing the need to align performance targets with their expectations. This balance ensures that performance targets capture the intended user experience and the overall efficiency of the workload. 

To comprehensively gauge and optimize workload performance, you should consider setting performance targets for the following:

- _Individual components_: Individual components are the separate units or segments of the workload, each potentially having distinct performance attributes and demands.
- _User_ _flows_: These pathways chart how users maneuver through the workload, and ensuring their fluidity directly enhances user experience.
- _Workflows_: Workflow-defined internal processes are crafted to achieve particular results and often dictate operational efficiency.
- _Data flows_: Data flows refer to the movement and interaction of data within the workload, helping identify potential inefficiencies or bottlenecks.
- _External dependencies_: External dependencies are elements outside the primary workload (integrated third-party services or tools) that can significantly affect performance.
- _Technology levels_: Technology levels are direct performance indicators such as the speed of API access, database operation latencies, and potential network delays.
- _Business transactions_: The seamless execution of end-to-end user business transactions, such as completing a purchase or booking a service, is directly tied to user satisfaction.
- _Workload all up_: This holistic metric gives an overview of the collective performance encompassing all components and aspects of the workload.

### Identify key metrics

Identifying key performance metrics involves determining the essential measurements that track the progress towards achieving workload performance goals. This identification provides a quantifiable way to measure and improve performance efficiency. 

When you identify key metrics to focus on, consider metrics related to availability, capacity, and response time:

- _Availability_: Error rate is an availability performance metric. Error rate represents the percentage of failed requests over a certain time period. A common target for error rate is 0.1 percent of requests.

- _Capacity_: Throughput and concurrency are sample capacity metrics. Throughput refers to the ability to handle a specific number of transactions within a given time period. For instance, an application integration with an external system might need to sustain 10 million update transactions per month. Concurrency is a measure of simultaneous users or actions.

- _Response time:_ Latency and load time are common response time metrics. Latency is the time it takes to respond to a request (200 milliseconds). Load time is the time it takes for an application or web page to be interactive. A common target is 99% of customer lookup requests completing in less than 2 seconds.

- _Deflection rate:_ In the context of conversational AI, deflection measures the percentage of requests completed through self-service that would otherwise be handled by live agents. In other words, it indicates the number of tasks that can be automated, reducing the workload for the team. Optimizing the agent deflection rate is one of the top focus areas for organizations aiming to achieve their business goals around return on investment (ROI) and customer satisfaction (CSAT), as well as to improve the agent's overall performance. Key indicators in Copilot Studio that help improve agent performance include resolution rate, escalation rate, and CSAT.

### Set specific targets

After you identify the key metrics, you need to specify performance targets or thresholds for each metric. Performance targets should be measurable, realistic, and aligned with your workload objectives. For example, you might set a target response time of less than 500 milliseconds (ms) or a target error rate of less than 1 percent. 

Avoid qualitative assessments of performance. For example, your users have different opinions on what fast or slow means. Stakeholders need to agree on what "fast" means and on how to measure it.

By using numerical targets, you can objectively assess performance over time. As you set specific performance targets, consider these recommendations:

- _Consider the_ _user_: When you set performance targets, adopt a user-centric perspective. Recognizing the user as the ultimate judge of performance helps ensure that performance targets align with user expectations. This alignment involves considering both organizational objectives and the distinct requirements of the user base. When you integrate these two aspects, you can tailor performance targets to reflect the desired user experience and overall workload effectiveness. By defining performance objectives that consider user expectations, you can strive to provide a high-quality user experience and meet the needs of your users. However, be careful asking users for their performance requirements. They might simply state that they want the system to be "as fast as possible," which is not informative. Try to establish what they think is too slow, or what unacceptable performance looks like, and work backwards from there. This way, you'll get more realistic requirements.

- _Consider the_ _tasks_: Consider the different tasks that users do with the system. Some tasks are more important than others from a  performance perspective. For example, a salesperson who needs to look up a customer's information quickly has a higher performance need than the same user looking at a monthly sales report. Focus on the tasks that are critical for performance and make sure they meet the requirements. For each critical task, talk to users about how long they think it should take. Be specific and focus on one task at a time. You'll end up with different requirements for different tasks within the same workload, which makes sense.

- _Use percentiles_: Percentiles like P99, P95, and P50 are commonly used to represent the results of performance assessments. They tell you what portion of the data a number includes. For instance, P99 includes 99% of the data. Use percentiles, rather than simple averages, to provide a more comprehensive understanding of workload performance. To measure percentiles, collect performance data over a period of time, typically using monitoring tools or logging mechanisms. Then, analyze this data to determine the response time values at different percentiles.

- _Set achievable goals_: Consider the baseline performance of the services you're using and set achievable goals. When using services that abstract the underlying platform, don't set goals that are tied to factors you don't control. For instance, setting a target of 200 ms for a screen load would be unrealistic if the baseline performance is already 250 ms, before you even have a chance to incorporate your custom logic.

### Document and expose performance target

Documenting and exposing performance targets is about recording all performance targets in a centralized location. Meeting performance targets is a shared responsibility between development and operations teams. To ensure that the workload consistently meets or exceeds these targets, provide teams with the information and access to take action. 

To document and expose performance targets, consider these recommendations:

- _Document performance targets_: Document all performance targets. Ensure that all performance targets are documented in a centralized location, easily accessible by both development and operations teams. It promotes alignment and aids in real-time decision-making.

- _Expose performance targets_: All responsible teams should be able to review and create actionable tasks from the performance targets. Use information radiators, such as dashboards and reports, to make the performance targets accessible.

- _Make it actionable_: The documentation and information radiators should suggest clear next steps. For example, a rise in errors might prompt an immediate check, or meeting a target consistently might suggest a reevaluation of that benchmark.

### Evaluate user feedback

Evaluating user feedback involves actively seeking out and analyzing the responses and suggestions of your users. Actively collecting and analyzing user feedback offers valuable insights into their needs and expectations. Regular communication helps in adjusting performance targets in line with changing preferences and tech trends. A focus on user needs means that the workload not only aligns with technical benchmarks but also undergoes continuous refinement. This approach, emphasizing user satisfaction, ensures that the workload remains relevant and successful in the long run.

## Power Platform facilitation

Power Platform integrates with [Application Insights](/azure/azure-monitor/app/app-insights-overview), which is part of the [Azure Monitor](/azure/azure-monitor/overview) ecosystem. Azure Monitor is a full-stack monitoring service that provides a complete set of features to monitor your resources and measure performance targets. Azure Monitor collects platform metrics and provides ready-to-use dashboards. It lets you configure alerts based on metrics and also stores and correlates metrics to ensure a single source of truth. For information on how standard telemetry and custom trace events can be logged and analyzed, see [Analyze system-generated logs using Application Insights](/power-apps/maker/canvas-apps/application-insights).

Power Platform ensures consistent availability and performance by applying service protection limits. These limits are usually high enough that your workload won't encounter them during normal usage. However, you might hit them if your workload handles large data volumes, bulk operations, or data migrations. If you're a workload developer, you should know how service protection limits are enforced and how to design your workload to reduce the chance of exceeding them. You should also plan for how to handle limits if they occur. Learn more:

- [Power Platform request limits and allocations](/power-platform/admin/api-request-limits-allocations)
- [Service protection API limits](/power-apps/developer/data-platform/api-limits?tabs=sdk)
- [Limits of automated, scheduled, and instant Power Automate flows](/power-automate/limits-and-config)

[Copilot Studio](/microsoft-copilot-studio/analytics-overview) has a comprehensive set of analytics that identify the key performance indicators for your agent. Multiple charts show you trends and usage for your agent's topics. These charts use AI to highlight the topics that have the greatest impact on your agent's performance. You can also design a [custom analytics strategy](/microsoft-copilot-studio/guidance/custom-analytics-strategy) to create a report not covered by out-of-the-box analytics.

## Performance Efficiency checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

---

## Performance planning recommendation for Power Platform workloads

Source: [performance-planning.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/performance-planning)

*Learn how to conduct performance and capacity planning in your Power Platform workload.*

# Recommendations for performance planning

**Applies to this Power Platform Well-Architected Performance Efficiency checklist recommendation:**

|[PE:02](checklist.md)|**Conduct performance planning. Performance planning should be done before there are predicted changes in usage patterns. Predicted changes include seasonal variations, product updates, marketing campaigns, special events, or regulatory changes.**|
|---|---|

This guide describes the recommendations for performance and capacity planning. Performance isn't something that just happens&mdash;you need to plan for it just like any other requirement. Capacity planning refers to the process of determining the resources required to meet workload performance targets. It involves estimating the amount of resources needed to support the workload's performance requirements, such as storage, throughput, and network bandwidth. Capacity planning ensures the workload has sufficient resources to handle the expected workload demands without experiencing performance degradation or bottlenecks. It also helps prevent over-provisioning and unnecessary costs. A lack of performance and capacity planning can lead to performance issues, resource bottlenecks, increased costs, inefficient allocation, scalability challenges, and unpredictable workload performance.

**Definitions**

| Term | Definition |
|---|---|
| Capacity planning | The process of predicting the resources a workload needs to meet its performance targets. |
| Functional requirements | The features and capabilities a workload must have to fulfill its intended purpose. |
| Technical requirements | The code and infrastructure needed to meet functional requirements. |
| Trend analysis | Historical data analysis to forecast future demand. |

## Key design strategies

Capacity planning is a forward-looking process that involves making decisions based on anticipated workload demands and patterns. Its goal is to optimize workload performance across both continuous and peak load scenarios. By understanding changes in usage, such as seasonal shifts or product releases, you can allocate resources strategically, preventing system strain during high demand periods. This proactive strategy reduces disruptions and bolsters performance efficiency. By analyzing past usage trends and growth data, you can forecast short and long-term needs. You can pinpoint potential bottlenecks and scaling issues, ensuring consistent and efficient workload performance.

### Plan for performance

Design your workload with performance in mind to minimize refactoring after your workload is running. Consider your workload requirements when it comes to performance. Performance considerations affect many aspects of your workload:

- _Data strategy_: Do you have existing data and data stores that you need to connect to? How much data do you need to store? Will the data volume affect how fast users can access it? How will users access the data?

- _Integration strategy_: Can you do real-time integrations without slowing down the system? Can you do batch integrations within a certain time? Where is your data? Do you need an on-premises data gateway strategy?

- _Conversation volumes_: When building an agent, it's important to understand the target volume of messages or conversations and their expected growth. Do your expectations validate the target architecture? What about scale?

- _Data modeling_: Do you need to simplify your data structure for faster queries?

- _Security modeling_: Will your security rules work well with a lot of users and data? Are there any bottlenecks?

- _Environment strategy_: Do you have a test environment for performance testing? Is it similar to the production environment? Have you budgeted for performance testing?

- _Development_: Are the developers following performance best practices? Are they meeting specific performance goals? Do users know what's possible and what's not?

- _Testing design and approach_: How do you measure performance? What's good enough and what's not? Are you testing with realistic scenarios and data? Are you testing for current and future needs?

- _User acceptance and adoption_: How do you track performance? Are users' expectations realistic?

#### Plan your resources

Performance needs time, money, effort, and people. Allocate resources wisely from the beginning of your project. For example, developers might need extra time to find efficient ways to implement business logic and optimize code. You'll also need a testing environment and a team to conduct performance testing.

Performance is not a one-time activity. As your workload usage changes and the platform evolves, you need to revisit the code and continue to find ways to optimize performance.

#### Plan data migrations and integrations

When migrating data from a prior system, plan the migration carefully. Here are some tips to help you avoid problems:

- Understand the business requirements for the data you're migrating. Don't migrate more data than users need. For example, you probably don't need to import 10 years of old leads into your sales system.

- Consider when and how often your integrations run. Avoid running resource-intensive processes when users are interacting with the system. Schedule heavy processes for off-peak hours or use asynchronous processing.

- Be aware of platform limitations and best practices when you design your integrations. 

### Gather performance data

Gathering workload utilization data entails collecting and analyzing information on how a workload uses resources and how it performs. You should collect data on historical patterns for existing workloads and predictive measures for new workloads. This process helps translate business objectives into technical requirements and is essential for forecasting capacity. Consider the following recommendations.

#### Understand an existing workload

Understanding an existing workload for capacity planning involves analyzing historical data related to how the workload utilizes resources. It encompasses metrics like resource utilization, performance data, and workload patterns. This understanding ensures efficient resource allocation, translates business goals into technical requirements, and helps identify potential bottlenecks.

- _Understand the data_: Review the available historical data and understand its structure, format, and relevance to capacity planning. The review might include resource utilization metrics, workload patterns, performance metrics, and other relevant data points. Understand the business processes and the criticality of the applications. Identify the peak usage times, user load, transaction rates, and other relevant metrics.

- _Clean and pre-process the data_: Prepare the data for analysis by removing any inconsistencies, errors, or outliers. Preparing the data might involve data cleaning techniques like data imputation, the handling of missing values, or normalization.

- _Identify key metrics_: Identify the metrics that are relevant for capacity planning. Metrics can include transaction volume, network throughput, and response times.

- _Identify_ _bottlenecks_: Measure throughput and response times to identify the specific components of your system that might become bottlenecks as the workload grows. Use process mining analysis capabilities like rework and root cause analysis to identify bottlenecks in the end-to-end process.  

- _Visualize the_ _data_: Create visualizations, like charts or plots, to gain better insights into historical data. Visualizations can help you identify patterns, trends, and anomalies in data to give you a clearer understanding of workload behavior. Use process mining tools to visualize the data with a process map, enabling a deep analysis of the process.

#### Understand a new workload

Understanding a new workload for capacity planning refers to predicting the resource requirements of a future task without historical data. Predicting the future needs of a new workload without historical data can be challenging. This process ensures you allocate resources efficiently and align allocations with workload objectives when the workload is introduced. 

Consider the following recommendations:

- _User_ _research_: Conducting user research to understand how users handle the current workload can provide valuable insights into the potential demand for a new workload. The research can involve user interviews, surveys, or observing a user performing the existing workload.

- _Expert judgment_: Input from subject matter experts or professionals who have experience in the industry can help you estimate the demand for a new workload. Their expertise and insights can provide valuable inputs for forecasting.

- _Pilot projects or prototypes_: Small-scale pilot projects or prototypes can help you gather real-time data and feedback. You can then use this data to inform the capacity planning process and adjust the forecasted demand.

- _External data sources_: External data sources like industry reports, market studies, or customer surveys can provide additional information for estimating demand for a new workload. These sources can offer valuable insights into customer preferences, market trends, and potential demand drivers.

### Forecast demand

Forecasting demand involves using workload data to predict future needs for a service or product. It's essential for capacity planning to ensure efficient resource allocation, anticipate growth patterns, and prepare for potential surges in demand. When you forecast future demand, you use data to get a sense of future needs. You apply statistical analysis, trend analysis, or predictive modeling techniques to the data you have to forecast future demand. These methods take into account historical or anticipated patterns and project them into the future to provide estimates of the expected workload demand. To forecast demand, consider the strategies that follow.

#### Account for various scenarios

As part of performance planning, you need to plan for different scenarios that might occur. This planning should include both predictable growth patterns and unexpected surges in demand. Usage patterns can grow or shrink. They can be organic (more or less users) or inorganic (an event or security incident). You need to conduct planning before usage changes, at key times:

- Design (prediction)
- Regular spikes (8:00 AM sign-in rush)
- Launch (prediction validation)
- Business model change
- Acquisition or merger
- Marketing push
- Seasonal change
- Feature launch
- Periodically

#### Use prediction techniques

Forecasting future demand for a service or product involves using techniques like statistical analysis, trend analysis, and predictive modeling. 

Here's an overview of how you can use these techniques:

- _Statistical analysis_: Statistical methods can help uncover patterns and relationships within historical data. You can use these patterns to forecast future demand. You can use techniques like time series analysis, regression analysis, and moving averages to identify trends, seasonality, and other patterns in the data.

- _Trend analysis_: Trend analysis involves examining historical data to identify consistent patterns and extrapolating those patterns into the future. For example, if workload demand increased by 10 percent during the past year, you might forecast a continuation of this trend. When you analyze historical demand data over a period of time, you can identify growth or reduction trends. Use these trends as a basis for forecasting future demand. Trend analysis can also identify the effects of one-time events that cause rapid shifts in traffic (inorganic). For example, feature releases might consistently increase demand by 5 percent. If you have four major releases a year, you should plan for 5 percent growth each time.

- _Predictive modeling_: Predictive modeling is the process of building mathematical models that use historical data and other relevant variables to make predictions about future demand. You can use techniques like machine learning algorithms, neural networks, or decision trees. These models can take into account multiple factors and variables to provide more accurate forecasts.

### Align forecasts with workload objectives

Aligning forecasts with workload objectives involves adjusting predictive capacity models to ensure they meet the specific goals and demands of a given workload. This alignment ensures resources are adequately provisioned, preventing both under-utilization and potential workload overloads. For example, if you aim to support an integration with 1 million updates nightly, but current data shows slow update speeds, you need to adjust your system. It's essential to talk with stakeholders to grasp the workload's requirements. Make sure your plans align with the promises (SLAs) of your service providers. This alignment ensures your capacity meets the expected demand and helps pinpoint areas of the system that might need changes.

#### Determine resource requirements

A workload can have many resources, so there's no one metric to observe to determine resource requirements. You need to measure capacity at the resource level to get meaningful results. Estimate the expected demand for your resources based on historical data, market trends, and business projections. Consider the number of transactions, concurrent users, or any other relevant metrics.

Based on the forecasted demand, calculate the resources needed to meet that demand. Consider factors such as API request capacity, network bandwidth, storage capacity, and personnel:

- _Network bandwidth_: Evaluate the network bandwidth that you need to support the anticipated level of traffic. You should include both inbound and outbound data transfer rates to ensure smooth and efficient communication between servers and clients.

- _Storage capacity_: Estimate the amount of data that the workload generates or processes during the forecasted demand. Consider factors like database size, file storage requirements, and any other data storage needs that are specific to your application.

- _API Requests_: Evaluate your API request consumption against your available capacity and the service protection limits. Consider factors like initial load of data and potential spikes in usage.

- _Personnel_: Assess the human resources required to manage and maintain the infrastructure, handle customer support, perform system maintenance, and ensure smooth operations. Consider factors like workload distribution, skill set, and required expertise.

#### Understand resource limitations

Resources in your workload have performance limitations. Performance limitations apply to features within each service. You need to understand the limitations of the resources in your workload and factor those limitations into your design decisions. For example, you should know whether resource limitations require you to change the design approach or to change resources altogether.

You also need to determine reachable limits, which involves identifying the maximum thresholds or boundaries of a workload. These limits usually apply to infrastructure (compute, storage, network), application (concurrent connections, response times, availability), and service (requests per second). When capacity planning identifies reachable limits, you need to modify the workload before the limit creates a performance problem. Performance baselines, continuous monitoring, and testing are essential to validating the limits and the solution.

> :::image type="icon" source="../_images/trade-off.svg":::  **Tradeoff**: Misjudged capacity planning can lead to over-provisioning or under-provisioning of resources. Over-provisioning can lead to higher costs. Under-provisioning can result in poor performance. You may also encounter a higher rate of false positive alerts that can lead to wasted time investigating performance problems that don't exist. Try to find the right balance.

## Power Platform facilitation

**Gathering capacity data and forecasting demand**: [Azure Monitor](/azure/azure-monitor/overview) enables you to collect and analyze telemetry data from your applications and infrastructure. It supports the monitoring of various Azure resources, including virtual machines, containers, and storage accounts. Key tools include [Application Insights](/azure/azure-monitor/app/app-insights-overview) and [Log Analytics](/azure/azure-monitor/logs/log-analytics-overview). By configuring data collection and defining metrics and logs that you want to monitor, you can gather valuable workload data for analysis. For [network monitoring](/azure/networking/fundamentals/networking-overview), combine Azure Monitor with Azure Network Watcher, Azure Monitor network insights, and Azure ExpressRoute monitoring.

Azure Monitor allows you to analyze historical data and apply forecasting techniques to predict future workload trends and capacity requirements. You can generate forecasts that can help you with capacity planning. These forecasts help estimate server capacity, network bandwidth, storage capacity, and other resource needs by using predicted demand patterns.

**Determining resource requirements**: Because they provide a wide range of configurations, Azure tools and services can help you define technical requirements. You can align your workload requirements with available Azure resources, ensuring that you select the appropriate components and settings to meet your functional needs.

**Understanding resource limitations**: Power Platform provides documentation and resources to help you understand the performance limitations of each of the different services. Taking into consideration these limitations can help you make informed design decisions and optimize your workload architecture for performance and cost-effectiveness.

There are scaling limits within your configuration and services that you should be aware of. You can read the documentation or run tests. Learn more:

- [Power Platform request limits and allocations](/power-platform/admin/api-request-limits-allocations)
- [Service protection API limits](/power-apps/developer/data-platform/api-limits?tabs=sdk)
- [Limits of automated, scheduled, and instant Power Automate flows](/power-automate/limits-and-config)
- [Quotas and limits for Copilot Studio](/microsoft-copilot-studio/requirements-quotas)

**Using data calls from canvas apps**: Data call flows from canvas apps send data to tabular data sources by using connectors over the OData protocol. OData requests flow to back-end layers to reach out to the target data source and retrieve data for the client, or commit data to the data source. Action-based connectors that enable APIs work in the same way.

Understanding how OData and API requests travel in canvas apps can help you to optimize your canvas app performance and your back-end data sources. To learn more, see [Data call flow in canvas apps](/power-apps/maker/canvas-apps/execution-phases-data-flow#data-call-flow-in-canvas-apps).

## Related information

- [Manage solution performance](/power-platform/architecture/key-concepts/performance/)
- [Azure Monitor](/azure/azure-monitor/overview)
- [Application Insights](/azure/azure-monitor/app/app-insights-overview)
- [Log Analytics](/azure/azure-monitor/logs/log-analytics-overview)
- [Process mining and task mining in Power Automate](/power-automate/process-advisor-overview)

## Performance Efficiency checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

---

## Select the right services and features recommendation for Power Platform workloads

Source: [select-services.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/select-services)

*Learn how to select the appropriate services and features that meet the requirements and demands of your Power Platform workload.*

# Recommendations for selecting the right services and features

**Applies to this Power Platform Well-Architected Performance Efficiency checklist recommendation:**

|[PE:03](checklist.md)|**Select the right services. The services and features must support your ability to reach the workload's performance targets and accommodate expected capacity changes. The selections should also weigh the benefits of using platform features or building a custom implementation.**|
|---|---|

This guide describes the recommendations for selecting appropriate services for your workload. The following recommendations help you choose services that best meet the requirements and demands of your workload. When you use services that are designed to handle your workload's requirements, you ensure that your workload meets your performance targets. If you choose inappropriate services for your workload, the services might not be capable of handling your workload's demands. Insufficient services can lead to slow response times, bottlenecks, or workload failures.

**Definitions**

| Term | Definition |
|---|---|
| Region | A geographic perimeter that contains a set of datacenters. |
| Resource | A single entity or component that you can create, configure, and utilize within a cloud service provider. |
| Service | A product or offering from a cloud service provider. |
| Storage service | A service that provides storage for objects, blocks, and files. |

## Key design strategies

The services you choose should align with your workload's performance targets and be adaptable to future capacity needs. As the workload expands or evolves, the services you use should match your performance standards without requiring major adjustments. Consider the balance between platform features and custom implementations. Platform features provide immediate solutions, but custom-built options offer precise tailoring. It's common to combine both options in your overall solution, with custom-built options targeted to fill specific gaps in the built-in platform features. Your service selections should be both forward-thinking and tailored to your specific needs, taking into account the trade-offs between convenience and customization.

### Understand workload requirements

Understanding workload requirements refers to grasping the technical and functional demands of a workload. This analysis helps determine the resources, storage, network, and other specifications needed to run the workload. Aligning services with the specific needs of a workload helps prevent over-provisioning or under-utilizing resources.

Evaluate the needs and characteristics of your workload to determine the requirements and align your workload requirements to your performance targets at every tier. You must account for constraints or dependencies. When you understand your workload requirements, you can make informed decisions. You can determine the right infrastructure and implement strategies to handle peak loads or variations in demand.

- _Meet performance targets._ Select services that enable you to meet the performance targets for your workload. Ensure that a service can support the performance needs and that you can monitor its performance. Collect performance data for critical components.

- _Consider organizational restrictions._ Be familiar with restrictions that your organization might have on services that you deploy. Consider these restrictions when you design your solution.

- _Consider compliance and security requirements._ Compliance and security requirements can affect services and configurations that you select. Ensure that a service you choose meets the requirements that are related to storage, encryption, access controls, audit logs, and data locations.

- _Consider team skills._ Your team builds and maintains workloads. Different services require different skills. Choose services that your team knows how to use, or commit to training them before you choose a service. Ensure that team members possess the expertise and knowledge to effectively use services and to optimize their performance.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff:** Power Platform services offer specific functionalities but might limit customization. Workloads that include custom-built components may offer more flexibility, but may require more management and configuration compared to workloads that use only Power Platform services.

### Understand services

Understanding services is about knowing the capabilities, limits, and functionalities of the platform's tools and offerings. An understanding of services helps you use built-in features, reducing the need for complex custom solutions and improving performance efficiency.

Consider various factors and gain a comprehensive understanding of a service before you choose it. Research and assess services and tools that the platform offers. Determine which services and tools best align with your workload requirements. 

### Understand service limits

Service limits are the predefined thresholds or boundaries that services set. Service limits define the maximum usage of resources or capabilities within that service. When you're familiar with service limits, you can avoid issues such as resource contention, performance degradation, or unexpected service interruptions. You can plan and scale your workload appropriately. Your planning takes into account factors such as data volume, processing capacity, and data residency requirements.

### Prefer platform features

Preferring platform features is about using built-in functionalities provided by a platform to handle specific tasks without custom code. The built-in features are designed to handle specific tasks efficiently at scale, and they're regularly maintained. Platform features allow you to better take advantage of cloud infrastructure capabilities because they are abstracted and handled for you. Choose services that allow you to offload functionality to the platform instead of writing and maintaining your own custom code. In many cases, platform-as-a-service (PaaS) solutions provide better performance efficiency than custom code. Custom code adds complexity and makes the workload prone to performance issues. Only develop custom code when service features aren't sufficient.

>:::image type="icon" source="../_images/trade-off.svg":::  **Tradeoff**: The best service for your workload might be a technology that your team isn't skilled at, can't afford, or it might require extra security layers. For example, a Dataverse plugin might fit your performance needs better, but your workload team might only be familiar with Power Automate cloud flows.

### Evaluate infrastructure requirements

The performance efficiency of resources is tied to the infrastructure they reside on. It makes the selection of the right infrastructure critical to service performance efficiency. Evaluating infrastructure requirements involves identifying the geographical region best suited to support your workload. 

Key considerations in this decision-making include:

- _Understand regions._ Every region corresponds to a distinct geographic location. Deploying your solution in the cloud requires selecting a datacenter location, which is where the physical servers and databases for your solution are located. This choice has implications for performance due to latency.

- _Single-region vs. multiple-region deployment model._ A multiple-region deployment can reduce latency to end users. However, it can also increase the cost and complexity of the workload. Consider data usage requirements; for example, a single region might prevent the creation of multiple smaller data silos. Choose the deployment model that best suits your workload needs.

- _Understand available features._ Different regions may offer different features. Understand the features that are available in a region before you select it. Ensure that a region meets your workload performance needs.

- _Consider latency._ Latency, the time data takes to travel from source to destination, increases the further services are from each other. Services communicating across regions can face increased latency. Identifying services that frequently communicate and positioning them within the same region is recommended. Additionally, selecting a region proximate to your primary user base can minimize latency, offering a better user experience. If you have users in different parts of the world, you might need to compromise on latency for some of them. You should analyze your user personas and workloads to find the optimal balance. Choosing a datacenter location is part of your [environment strategy](/power-platform/guidance/adoption/environment-strategy).

### Evaluate networking requirements

Assess your network needs to determine the appropriate workload services and configurations. Ensure that the network can support your workload. 

To evaluate networking requirements, make sure you:

- _Understand network traffic._ Assess the expected network traffic for the workload. Understand the data transfer needs and the frequency of network requests.

- _Understand bandwidth requirements._ Determine the bandwidth requirements for the workload. Consider the amount of data transmitted and received over the network.

- _Understand network latency._ Evaluate the desired latency for the workload. 

- _Understand throughput._ Consider the required throughput for the workload. Throughput refers to the amount of data that can be transmitted over a network during a specified time period. Configure the network routing options to take advantage of network throughput benefits.

- _Understand configurations that impact network traffic and performance._ Firewall settings, on-premises data gateway configurations, and similar can affect network traffic and performance. Understand all components and configurations that can have an impact, and ensure they're configured to support your performance requirements.

### Evaluate compute requirements for custom components

While the platform services manage their own compute requirements, you'll need to evaluate the compute requirements of any custom cloud components you've implemented. Evaluating compute requirements involves assessing the specific compute needs of a workload, including factors such as instance type, scalability, and containerization. Different compute services have varying capabilities and characteristics that can affect the performance of your workload. Select the optimal compute service to ensure that your workload runs efficiently. For more detailed recommendations on evaluating compute requirements for custom components, review [Evaluate compute requirements](/azure/well-architected/performance-efficiency/select-services) in the Azure Well-Architected Framework.

### Evaluate load balancing requirements

While the platform services manage their own load balancing, it's important to evaluate and consider additional load balancing options. The choice should be based on how you use the service features. Load balancing ensures that work is distributed evenly and prevents any single resource from being overwhelmed with requests. Load balancing helps prevent bottlenecks and reduce response times. Evaluate the various load balancing options available with the services included in your solution. Review the documentation and comparison tools to understand the features. 

To select the most suitable load balancing options for your workload, consider: 

- _Robotic Process Automation (RPA) hosts_: Evaluate whether to load balance across multiple RPA hosts to automatically scale workloads and optimize unattended automations.
- _On-premises gateways_: Use load balancing options to avoid single points of failure when accessing on-premises data resources.

### Evaluate database requirements

The database can affect factors such as data storage and retrieval, transaction processing, consistency guarantees, and handling of large or rapidly changing data. Assess the needs and criteria for your database. Select a database system that can meet those requirements. Evaluate the database requirements before you choose a database. 

To evaluate the database requirements and choose the appropriate database, follow these steps:

- _Identify the workload needs._ Understand the specific requirements of your workload, such as data volume, expected transaction rates, concurrency, data types, and expected growth. Evaluate different database systems based on your workload needs. For example, if your workload requires high-performance real-time data processing, you might choose a database system optimized for fast data ingestion and low latency.

- _Consider the data model._ Determine the data model that best suits your workload. Evaluate the database requirements to ensure that the chosen database supports the required data structures, relationships, and integrity constraints. For example, if your data has a highly relational structure, you might opt for a relational database management system (RDBMS) that provides robust support for transactions and referential integrity. The data model might be hierarchical, network, relational, object-oriented, or NoSQL. Assess the complexity of your data model. Ensure that the chosen database supports the required data structures and relationships.

- _Evaluate the capabilities._ Consider factors such as read/write patterns, query complexity, latency requirements, and scalability needs. Evaluate the performance capabilities of different database systems accordingly. Some databases excel in read-heavy workloads, while others are optimized for write-intensive or analytical workloads.

- _Assess the load._ Consider factors such as data volume, transaction rates, read/write ratios, and expected growth. Choose a database that can handle the anticipated workload to ensure smooth operation and prevent performance bottlenecks as your workload is scaled. Consider the scalability requirements of your workload. These requirements include anticipated data growth, concurrent user access, and the need for horizontal or vertical scaling. Evaluate the scalability options and availability features that different database systems provide.

### Evaluate storage requirements

Choose storage services that align with your data access patterns, durability requirements, and performance needs. Most cloud workloads use a combination of storage technologies. This technique is known as the polyglot persistence approach. Determine the appropriate combination of storage services for your workload. You might also want to separate data to avoid contamination. For example, you might have separate storage accounts for monitoring data and business data. Choosing the right mix and correct implementation is important for optimizing application performance.

### Evaluate cache requirements

A cache stores frequently accessed data. Caching reduces data access latency and lowers the load on data storage components. It allows the workload to handle more requests without scaling. It's common to cache workload data and static content. Some platform services automatically cache data to increase performance. Consider adding additional caching to improve performance and reduce your overall API request consumption. 

### Evaluate business logic requirements

Choose how to implement your business logic based on your functional, performance, and reusability requirements. Power Platform offers many options to execute business logic; for example, Power Automate cloud flows, low-code or code-first plugins, and Business Rules. Most workloads will use a combination of different options.

To evaluate how to implement business logic, consider:

- _Team skills_. Your team builds and maintains workloads. Different services require different skills. Choose services that your team knows how to use, or commit to training them before you choose a service. Ensure that team members possess the expertise and knowledge to effectively use the services and to optimize their performance. For example, developing [Dataverse plug-ins](/power-apps/developer/data-platform/plug-ins) will require your workload team to write .NET or [Power Fx code](/power-apps/maker/data-platform/low-code-plug-ins).

- _Logic approach_. Evaluate whether there are steps in the logic that require human interaction—such as through an approval process or a form response—and, if so, determine whether all steps can be executed without human interaction. For example, you might use [Power Automate Approvals](/power-automate/get-started-approvals) if human interaction is required, but choose to use a Dataverse plugin to have the logic run seamlessly as part of the Dataverse data operation when human interaction isn't required.

- _Integration_. Review your architecture diagram and consider which systems your workload needs to integrate with. Evaluate the options for integration and consider the impact on performance and reliability. Real-time integration can provide immediate benefits to users, but it might affect performance and reliability. Using asynchronous approaches like Power Automate, or publishing [Dataverse events](/power-apps/developer/data-platform/business-events#custom-events) to a queue for later processing, can improve performance and reliability. However, these methods don't give users immediate feedback.

- _Complexity_. Consider the complexity of your logic and evaluate whether it can be broken down into separate steps. For example, to use [business rules](/power-apps/maker/data-platform/processes#business-rules) to validate mandatory fields, data formats, and ranges, instead of implementing the logic in a canvas app or custom script. For simple calculations based on existing values, you might use [calculated](/power-apps/maker/data-platform/define-calculated-fields) or [rollup](/power-apps/maker/data-platform/define-rollup-fields) fields, and for more complex calculations use a Dataverse plug-in.  

- _Reusability_. Identify and reuse logic to improve consistency and maintenance. Consider if you need to reuse the business logic from various points of the workload. For example, Dataverse plug-in logic can be called from apps and automations, whereas if you put the business logic in the canvas app, you can’t reuse it.

Remember that the choice depends on your specific requirements, workload complexity, and integration needs. Evaluate each option based on your project goals and organizational context. Consider if using the logic could help more than just a single project. If it can, adjust your approach to provide the most benefits.

### Evaluate responsiveness

Remember that users judge performance by their expectations, not by objective measures. You can improve perceived performance with techniques that don't necessarily speed up processes, but make the user experience smoother. For example, using asynchronous processing doesn't make a task complete faster, but it keeps the user interface responsive, allowing the user to do other things. 

To evaluate responsiveness:

- Consider whether to design for synchronous, asynchronous, or background (batch) processing.
- Consider data growth over time. As more data flows through your system, you might need to tune it to maintain the same response times.
- Consider what data to cache in the page or app versus retrieving it in real time every time the page loads. 

## Power Platform facilitation

**Understanding requirements**: Use [Azure Monitor](/azure/azure-monitor/overview) to collect and analyze data from your workload. Monitor provides insights into the performance and health of your workloads, allowing you to identify and troubleshoot issues.

**Understanding and evaluating services**: Review the platform services to determine if they meet your performance requirements. Power Platform offers several services that accomplish the same outcome. You have the flexibility to align your choice of service to your performance needs, team skill set, and cost requirements.

## Related information

- [Verify network capacity and throughput for clients](/power-platform/admin/verify-network-capacity-throughput-clients)
- [Advanced Monitor concepts](/power-apps/maker/monitor-advanced)
- [Performance considerations for Power Apps](/power-apps/maker/canvas-apps/app-performance-considerations)
- [Understand canvas app execution phases, data call flow, and performance monitoring](/power-apps/maker/canvas-apps/execution-phases-data-flow)
- [Plan, scale, and maintain a business-critical gateway solution](/data-integration/gateway/plan-scale-maintain)
- [Use low-code plugins in Dataverse](/power-apps/maker/data-platform/low-code-plug-ins)
- [Use plug-ins to extend business processes](/power-apps/developer/data-platform/plug-ins)
- [Dataverse formula, calculated, and rollup columns using code](/power-apps/developer/data-platform/calculated-rollup-attributes)
- [Work with formula columns in Dataverse](/power-apps/maker/data-platform/formula-columns)
- [Apply business logic in Microsoft Dataverse](/power-apps/maker/data-platform/processes)
- [Microsoft Dataverse business events](/power-apps/developer/data-platform/business-events)
- [Manage solution performance](/power-platform/architecture/key-concepts/performance/)

## Performance Efficiency checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

---

## Collect workload performance data recommendation for Power Platform workloads

Source: [collect-performance-data.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/collect-performance-data)

*Learn how to collect performance data to help you assess the performance of a Power Platform workload.*

# Recommendations for collecting performance data

**Applies to this Power Platform Well-Architected Performance Efficiency checklist recommendation:**

|[PE:04](checklist.md)|**Collect performance data. Workload components and flows should provide automatic, continuous, and meaningful metrics and logs. Collect data at different levels of the workload, such as the application, platform, data, and operating system levels.** |
|---|---|

Collecting performance data is the process of gathering metrics and logs that provide information about the performance of a workload. This data includes numerical values, which are known as _metrics_. Metrics describe the state of the system at a particular point in time. Performance data also includes logs that contain different types of data organized into records.

By collecting performance data, you can monitor and analyze the performance of a workload. You can use this information to identify performance bottlenecks, troubleshoot issues, and to make data-driven decisions to improve the overall performance efficiency of the workload.

Without data-driven insights, you might be unaware of underlying performance issues or opportunities for optimization. Potential results include slower response times, decreased throughput, and ultimately, a suboptimal user experience. Additionally, the lack of performance data makes it difficult to diagnose and troubleshoot issues in a timely manner, leading to prolonged downtime and reduced productivity.

**Definitions**

| Term | Definition |
|---|---|
| Activity logs | Logs that track management operations on resources, such as deleting a resource. |
| Application logs | Logs that track information about application events, errors, and other activities, such as sign-ins and database connection failures. |
| Application performance monitoring (APM) tool | A tool that monitors and reports the performance of an application. |
| Code instrumentation | The direct or indirect capture of performance metrics from the perspective of the application code. Captured metrics include flow metrics, resource use, and metrics specific to the language or runtime. |
| Distributed tracing | Gathering and correlating metrics across distributed workload components. |
| Metrics sink | A storage destination for your metrics that correlates time series data for analysis. |
| Platform logs | Diagnostic and auditing data that includes resource logs, activity logs, and audit logs. |
| Platform metrics | Numerical values that record workload performance at a particular time. |
| Resource logs | Data that a system generates. It provides information about the state of the system. |
| Structured logging | Defining a meaningful format to log messages, typically as key-value pairs. |

## Key design strategies

Performance optimization requires data to measure the current performance of a workload or a flow against its performance targets. You need to collect the right amount and diversity of data to measure the performance of the code and the infrastructure against [performance targets](performance-targets.md). Ensure that every component and flow within the workload automatically generates continuous and meaningful metrics and logs. You need to source this data from diverse levels like the application, platform, storage, and operating system. Comprehensive performance data collection allows for a holistic understanding of performance, enabling precise identification of inefficiencies and avenues for improvement.

### Centralize performance data

Centralizing performance metrics and logs is the process of collecting performance metrics and logs from various sources and storing them in a central location. Create a central metrics sink and a central log sink. This centralization allows for easy access, analysis, and monitoring of performance metrics and logs across different systems and components. By centralizing metrics and logs, you gain visibility into the performance of your workload. Choose a suitable platform or tool that can aggregate and store workload performance metrics and logs.

Tradeoff: Understand the cost of collecting metrics and logs. In general, the more metrics and logs you collect, the higher the cost.

### Segment performance data

Segmenting performance data involves organizing and categorizing metrics and logs based on their origin, purpose, or environment. For example, you should separate production data from nonproduction data or distinguish between performance targets and business metrics. Segmenting data helps with optimizing specific environments, facilitates troubleshooting, and limits inaccuracies in performance monitoring. By maintaining a clear distinction between different data types, you can capture, analyze, and respond to relevant metrics more efficiently and better align workload health with workload objectives. To segment performance data, consider the following recommendations:

- _Keep production data and nonproduction data separate_. By separating data by environment, you can ensure focused monitoring and optimization of each environment. In production environments, you can better identify and address performance issues that directly affect users and business operations. In nonproduction environments, data separation facilitates effective troubleshooting and fine-tuning during the testing phase before you deploy to production.

- _Use one set of data within each environment_. Don't use one set of data for performance targets and another set of data for alerts related to the performance targets. Using different sets of data leads to inaccurate alerts that undermine the effectiveness of performance monitoring.

- _Separate performance targets and business metrics_. The operations and development teams use performance targets to monitor workload health and meet business targets. Business metrics relate to business goals or customer reporting. Capture business metrics in a separate data stream, even if the data directly overlaps. This separation gives you flexibility to capture the right data and independently analyze the data.

### Define retention policies

Retention policies dictate how long performance data should be kept. Establishing these policies helps manage storage efficiently and ensures only necessary data is accessible for analysis. Such policies support better performance and meet compliance standards. You should configure retention policies for the log and metrics data to enable effective troubleshooting and monitoring in all environments. For example, the logs and metrics might need to be kept for longer time in a production environment than in the testing environment. The retention period should match your organization's requirements and compliance regulations. Decide how long to retain the data for analysis and audit purposes. Archive the data that you don't need for immediate analysis.

### Collect performance data

Collecting data involves monitoring and analyzing a workload’s performance metrics, such as throughput, latency, and completion times, primarily gathered through instrumenting code. Workload performance data provides valuable insights into the health and performance of an application. By monitoring and analyzing performance data, you can identify and troubleshoot issues, optimize performance, and make informed decisions for your workload.

#### Instrument code

Instrumentation refers to the process of embedding code snippets or actions into your workloads code; for example, creating [custom trace events](/power-apps/maker/canvas-apps/application-insights#create-custom-trace-events) in your canvas app. The purpose of instrumentation is to capture performance data while the workload runs. It's essential to gather metrics that highlight the workload’s critical operations. Focus on metrics like throughput, latency, and completion time. It's important to differentiate business-related operations from other operations. For data related to business operations, make sure its metadata is structured in a way that allows distinct tracking and storage. Code instrumentation provides the following benefits:

- _Identifying performance bottlenecks:_ By tracking metrics such as elapsed time, you can identify bottlenecks and optimize the code accordingly.

- _Evaluating system behavior under a load:_ You can see how the workload performs under different stress scenarios. This data can help you identify issues related to scalability, concurrency, and resource use.

- _Tracking_ _workload_ _health and availability:_ Because key performance indicators are monitored in real time, you can get alerts about potential issues that affect the application's performance and availability.

- _Improve user experience:_ You can gain insights into how users interact with the workload. Use this information to optimize the user experience and identify areas for improvement.

- _Plan capacity and allocate resources:_ The performance data that instrumentation gathers can provide valuable insights into the resource requirements of a workload. This information can inform your decisions about planning capacity and allocating resources.

When you instrument code for performance monitoring, consider the following strategies:

- _Use APM tools_: Application performance monitoring (APM) tools collect and analyze performance data, including metrics, traces, and logs. APM tools offer features like code-level instrumentation, transaction tracing, and performance profiling.

- _Custom instrumentation_: Developers can add custom code to collect performance metrics that are unique to their application and workload. The custom instrumentation can measure runtimes, track resource usage, or capture specific events.

- _Capture transaction times._ Capturing transaction times relates to measuring the end-to-end times for key technical functions as a part of performance monitoring. Application-level metrics should include end-to-end transaction times. These transaction times should cover key technical functions such as database queries, response times for external API calls, and failure rates of processing steps.

- _Use telemetry standards._ Consider using APM tool instrumentation libraries and tools that are built around a telemetry standard, such as OpenTelemetry.

### Collect resource performance data

By collecting resource performance data, you can gain insights into the health and behavior of your workload. Resource performance data provides information about resource use, which is key for capacity planning. This data also provides insights into the health of a workload and can help you detect issues and troubleshoot. Consider the following recommendations:

- _Collect metrics and logs for every resource._ Each service has a set of metrics that's unique to the functionality of the resource. These metrics help you understand the resource's health and performance.

- _Use platform tooling._ Gather inspiration from built-in and integrated monitoring solutions, such as Azure Monitor Insights. This tooling streamlines performance operations. Consider platform tooling as you select a platform and invest in custom tooling or reporting.

- _Monitor network traffic._ Monitoring network traffic means to track and analyze the flow and patterns of data as it moves across network pathways. Collect traffic analytics and monitor the traffic that traverses subnet boundaries. Your goal is to analyze and optimize network performance.

### Collect database and storage data

Many database and storage systems provide their own monitoring tools. These tools collect performance data specific to those systems. Database and storage systems often generate logs that contain performance-related events and indicators. Collect database data and storage performance data so you can identify bottlenecks, diagnose issues, and make informed decisions to improve the overall performance and reliability of your workload. Consider collecting the following types of performance data:

- _Throughput_: Throughput measures the amount of data read from or written to the storage system over a period of time. Throughput data indicates the data transfer capabilities.

- _Latency_: Latency measures how long storage operations last. Latency data indicates the responsiveness of the storage system.

- _IOPS (I/O operations per second)_: Data about the number of read operations or write operations that the storage system can perform in a second. IOPS data indicates the storage system's throughput and responsiveness.

- _Capacity use_: Capacity use is the amount of storage capacity used and the amount that's available. Capacity-use data helps organizations plan for future storage needs.

### Collect connector performance data

Time spent waiting for integrated services operations to complete can contribute to the overall poor performance of a workload. If your workload uses connectors to integrate services, consider measuring the time spent in each connector operation to evaluate its impact and decide whether to optimize your workload design. Depending on the service, you can use run history or custom logic to capture the time spent in connector operations.

### Validate and analyze data

Your performance data should align with the performance targets. The data needs to represent workload or flow performance completely and accurately as it relates to performance targets. For example, the response time for a web service has a performance target of 500 milliseconds. Make it a routine to analyze the data, as frequent evaluations allow for early detection and mitigation of performance issues.

- _Create alerts._ It's beneficial to have alerts that are actionable, enabling prompt identification and rectification of performance problems. These alerts should clearly indicate the breached performance threshold, the potential business effect, and the components involved. Start by setting common and recommended alert. Over time, you can modify these criteria based on your specific needs. The primary objective of these alerts should be to forecast potential performance drops before they escalate into significant issues. If you can't set an alert for an external dependency, consider devising a method to gather indirect measurements, like the duration of a dependency call.

- _Set data collection limits._ Determine and set logical limits on the volume of data you collect and its retention duration. Telemetry can sometimes produce overwhelming amounts of data. It's essential to focus on capturing only the most vital performance indicators or have an efficient system in place to extract meaningful insights from your performance data.

## **Power Platform facilitation**

**View performance data in the Power Platform admin center**: Use the [Monitor](/power-platform/admin/monitoring/monitoring-overview) area of the Power Platform admin center to measure and improve operational health metrics of apps and flows. The Monitor experience is available to both makers and admins. Makers use the data to improve their resources. Admins use it to understand aggregate operational health in the tenant or in specific environments. The purpose of the Monitor area of the Power Platform admin center is to bring attention to resources that have degraded operational health and highlight resources that have opportunities for improvement.

**Collecting application performance data**: [Application Insights](/power-platform/admin/overview-integration-application-insights?source=recommendations) is a feature of Azure Monitor that helps you monitor the performance and availability of your application. The data is stored in Azure Monitor logs by Application Insights, and visualized in [Performance and Failures](/azure/azure-monitor/app/failures-and-performance-views?tabs=failures-view) panels. The data is exported to your Application Insights environment in the standard schema defined by Application Insights. You can export [Dataverse and Power Automate data](/power-platform/admin/set-up-export-application-insights) to Application Insights, [connect your canvas apps](/power-apps/maker/canvas-apps/application-insights) to Application Insights, and capture telemetry data from your [Microsoft Copilot Studio agent](/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry) for use in Azure Application Insights. 

Application Insights allows you to choose [**Server** and **Browser** data views](/power-platform/admin/overview-integration-application-insights#performance-panel-in-application-insights). By identifying those operations with the longest duration, you can diagnose potential problems.

**Use native platform features to analyze performance:** [Analytics in Copilot Studio](/microsoft-copilot-studio/analytics-summary) provides a comprehensive overview of your agent's performance. It uses artificial intelligence (AI) technology to identify which topics are having the greatest impact on escalation rate, abandon rate, and resolution rate. [Performance insights for Power Apps](/power-apps/maker/common/performance-insights-overview) analyze runtime user data and provide a prioritized list of recommendations to help improve the performance of model-driven apps.

**Centralizing, segmenting, and retaining performance data:** Microsoft already gathers extensive telemetry on Dataverse, Power Automate cloud flows, and model-driven apps. With [**Application Insights integration**](/power-platform/admin/analyze-telemetry), an environment or tenant admin provides the Application Insights instrumentation key while setting up the data export process in the Power Platform admin center. As soon as setup is complete, telemetry that Microsoft gathers about your environment are sent to your Application Insights environment. When you use Application Insights integration, you'll receive a standardized set of telemetry that follows the Application Insights [telemetry data model](/azure/azure-monitor/app/data-model). In addition to this integration, you can also [connect canvas apps to Application Insights](/power-apps/maker/canvas-apps/application-insights) and capture telemetry data from your [Microsoft Copilot Studio agent](/microsoft-copilot-studio/advanced-bot-framework-composer-capture-telemetry) for use in Azure Application Insights.

**Collecting Azure resource performance data:** Most Azure services generate platform logs and metrics that provide diagnostic and auditing information. By enabling diagnostic settings, you can specify the platform logs and metrics to collect and store.For correlation purposes, enable diagnostics for all supported services and send the logs to the same destination as your application logs.

**Collecting database performance data:** [Microsoft Dataverse integrates with Application Insights](/power-platform/admin/telemetry-events-dataverse). The data stream currently provides performance data related to Dataverse API incoming calls, Dataverse plug-in execution calls, and Dataverse SDK calls. To be notified of issues, set up alerts based on performance thresholds.

**Validating and analyzing performance data:** Within Azure Monitor, you can use Azure Monitor Logs to collect, analyze, and visualize log data from your applications and systems. By aggregating logs, you can cross-query events and gain insights into the performance of your application. For more information, see [Azure Monitor Logs cost calculations and options](/azure/azure-monitor/logs/cost-logs)** and [Pricing for Azure Monitor](https://azure.microsoft.com/pricing/details/monitor/).

In Azure Monitor, you can define alert rules to monitor specific performance metrics and trigger alerts based on predefined conditions. For example, you can create an alert rule to notify you when response time goes above a specified limit. Configure the alert rule to send notifications to the desired recipients.

When you create an alert rule, you can define the criteria that determine when an alert should be triggered. You can set thresholds, aggregation methods, time windows, and the frequency of evaluation. Define the criteria based on your performance monitoring requirements. In addition to sending notifications, you can specify actions to be taken when an alert is triggered. Actions can include sending emails, calling webhooks, or running Azure functions. Choose the appropriate actions to respond to the specific alert scenario.

## Examples

- [Enterprise monitoring with Azure Monitor](/azure/architecture/example-scenario/monitoring/enterprise-monitoring)
- [Create custom trace events in canvas apps](/power-apps/maker/canvas-apps/application-insights#create-custom-trace-events)
- [Create custom alerts for cloud flows](/power-platform/admin/app-insights-cloud-flow#create-a-custom-alert)
- [Analyze agent performance and usage in Copilot Studio](/microsoft-copilot-studio/analytics-summary)

## Related information

- [Manage solution performance](/power-platform/architecture/key-concepts/performance/)

## Performance Efficiency checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

---

## Performance testing recommendation for Power Platform workloads

Source: [performance-test.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/performance-test)

*Learn how to test performance and establish best practices for performance testing of a Power Platform workload.*

# Recommendations for performance testing

**Applies to this Power Platform Well-Architected Performance Efficiency checklist recommendation:**

|[PE:05](checklist.md)|**Test performance. Perform regular testing in an environment that matches the production environment. Compare results against the performance targets and the performance benchmark.**|
|---|---|

This guide describes the recommendations for testing. Performance testing helps you evaluate the functionality of a workload in various scenarios. It involves testing the workload's response time, throughput, resource utilization, and stability to help ensure that the workload meets its performance requirements.

Testing helps to prevent performance issues. It also helps ensure that your workload meets its service-level agreements. Without performance testing, a workload can experience performance degradations that are often preventable. Workload performance can drift from performance targets and established baselines.

**Definitions**

| Term | Definition |
|---|---|
| Chaos testing | A performance test that aims to test the resilience and stability of a system by deliberately introducing random and unpredictable failures or disruptions. |
| Load test | A performance test that measures system performance under typical and heavy load. |
| Performance baseline | A set of metrics that represent the behavior of a workload under normal conditions as validated by testing. |
| Stress test | A performance test that overloads a system until it breaks. |
| Synthetic test | A performance test that simulates user requests in an application. |

## Key design strategies

Performance testing helps you gather measurable data on a workload. Running tests early helps you build workloads to the right specifications. Therefore, conduct performance tests as early as possible in the development lifecycle. Early testing allows you to catch and fix performance issues before you go to production. You can use a proof of concept (POC) if production code isn't ready.

If migrating data from a prior system and migration must be completed in a specific time window, your performance testing should include measuring performance of the data migration.

### Prepare the test

Preparing performance tests refers to setting up and arranging the resources, configurations, and test scenarios that you need to conduct performance testing effectively. A good performance test should simulate how users will use your solution in real life. It should also help you validate whether your solution meets your performance goals.

#### Define acceptance criteria

Acceptance criteria specify the performance requirements that a workload needs to meet to be considered acceptable or successful. Define criteria that align with the performance targets.

_Review performance targets._ Performance targets define your desired level of performance for your workload. Review the performance targets that are established for the workload. Performance targets are metrics that can involve response time, throughput, resource utilization, or any other relevant performance indicators. For example, you might have a target for your response time to be under a certain threshold, such as less than 2 seconds.

_Define acceptance criteria._ Translate the performance targets into specific acceptance criteria that you can use to evaluate the performance of your workload. For example, suppose your performance target for response time is 2 seconds or less. Your acceptance criterion could be _The average response time of the workload should be less than 2 seconds_. Use these acceptance criteria to determine whether the workload meets the desired level of performance.

When you define acceptance criteria, it's important to focus on users and their expectations. Acceptance criteria help ensure that the delivered work meets user needs and requirements. Keep in mind the following considerations for incorporating the user perspective into acceptance criteria:

- User personas: Understand the number and types of users who will use your solution at the same time. Define user personas that represent different roles, locations, security configurations, data sets, and activities.

- User requirements: Understand the user needs and goals for the workload. Consider how the workload should perform to satisfy these requirements. Define day-in-the-life scenarios that reflect the actions users perform on a typical day. Include peak load and normal load scenarios.

- User experience: Define acceptance criteria that capture the desired user experience. Include factors such as response time, usability, accessibility, and overall satisfaction.

- Functional requirements: Address the specific functionality that the user expects to see in the workload. Define acceptance criteria around these functional requirements to help ensure that they're met. Use realistic data volumes for each scenario. Don't use more or less data than users need.

- Infrastructure requirements: Define realistic infrastructure requirements for each scenario. For example, if your users will access your solution from mobile devices with poor connectivity, test your solution under those conditions.

- Use cases: Consider different scenarios or use cases that the user might encounter. Define acceptance criteria based on these use cases to validate the workload's performance in real-world situations.

_Set acceptance thresholds._ Determine the thresholds within the acceptance criteria that indicate whether the workload meets the performance targets. These thresholds define the acceptable range of performance for each metric. For example, suppose the acceptance criterion for response time is less than 2 seconds. You can set the threshold at 2.5 seconds. This level indicates that any response time over 2.5 seconds is considered a performance issue.

_Define passing criteria._ Establish the criteria for determining whether the workload passed or failed the performance test. You might define passing as meeting all the acceptance criteria or achieving a certain percentage of them.

#### Select the test type

To select the right type of performance test, it's important to align the test with your acceptance criteria. The acceptance criteria define the conditions that need to be met for a requirement or bug fix to be considered done. Performance tests should aim to verify whether a workload meets these acceptance criteria and performs as expected under specified conditions. Aligning the performance test type with the acceptance criteria helps ensure that the test focuses on meeting the performance expectations that the criteria define.

- _Understand acceptance criteria_. Review the acceptance criteria for the requirement or bug fix. The criteria outline the specific conditions and functionalities to be met.

- _Identify relevant performance metrics_. Based on the acceptance criteria, determine the performance metrics that are critical to achieving the desired outcomes. For example, if the acceptance criteria focus on response time, prioritizing load testing might be appropriate.

- _Select an appropriate test type_. Evaluate the available test types and choose the one that best aligns with the identified performance metrics and acceptance criteria.

The following table provides a sample of test types and their use cases.

| Test type | Description | Use case |
|---|---|---|
| Load testing | Simulate realistic user loads to measure how your workload performs under expected peak workloads. | Determines load tolerance. |
| Stress testing | Push your workload beyond its normal limits to identify its breaking points and measure its ability to recover. | Determines resilience and robustness. |
| Soak testing (endurance testing) | Run your workload under sustained high loads for an extended period to identify performance degradation, memory leaks, or resource issues. | Evaluates stability and reliability over time. |
| Spike testing | Simulate sudden increases in user load to assess how your workload handles abrupt changes in demand. | Measures the ability to scale and maintain performance during peak periods. |
| Compatibility testing | Test your workload's performance across various platforms, browsers, or devices. | Helps ensure consistent performance across various environments. |

Prioritize your selected test types based on the characteristics and requirements of your workload. Consider factors such as the criticality of performance metrics, user expectations, business priorities, and known issues or vulnerabilities.

#### Select testing tools

Choose appropriate tools based on the type of performance testing that you want to run. Evaluate the testing environment's infrastructure, resources, and constraints. Choose testing tools that support the desired test types and provide the necessary features for monitoring, measurement, analysis, and reporting.

An application performance monitoring (APM) tool provides deep insights into applications and is an essential testing tool. It helps you trace individual transactions and map their paths through various workload services. After testing, you should use the APM tool to analyze and compare testing data against your performance baseline.

Use profiling tools to identify performance bottlenecks in your code. Profiling helps identify areas of the code that consume the most resources and need optimization. It provides insights into the execution time and memory usage of different parts of the code.

The following steps can help you select the appropriate testing tools:

- _Identify testing requirements_. Begin by understanding the specific requirements of your performance testing. Consider various factors:
  - The type of workload
  - Performance metrics to measure, such as response time and throughput
  - The complexity of the workload architecture
  - The testing environment, such as cloud-based, on-premises, or hybrid

- _Research testing tools_. Conduct research to identify performance testing tools that align with your requirements. Consider commercial and open-source tools that are available in the market. Look for tools that support your desired types of performance testing, such as load testing or stress testing, and that provide features for measuring performance metrics.

- _Evaluate tool features_. Assess the features that each testing tool provides. Look for capabilities such as simulation of realistic user behavior and scalability to handle large user loads. Consider support for various protocols and technologies, integration with other testing tools or frameworks, and reporting and analysis capabilities.

- _Consider compatibility and integration_. Determine the compatibility of the testing tools with your existing infrastructure and technologies. Ensure that the tools can be easily integrated into your testing environment and can communicate with the necessary workload for monitoring and analysis.

- _Evaluate cost and licensing_. Assess the cost structure and licensing terms that are associated with the testing tools. Consider factors such as the initial investment, maintenance costs, and support costs. Also consider other licensing requirements that depend on the number of users or virtual users.

- _Conduct a POC_. Select a few tools that appear to be the most suitable based on your evaluation. Conduct a small-scale POC to validate the usability, features, and effectiveness of the tools in your specific testing scenario.

- _Consider support and training_. Evaluate the level of support and training that the tool's vendor or community provides. Determine the availability of documentation, tutorials, and technical support channels to assist with any challenges or issues that might arise during the testing process.

#### Create test scenarios

Creating test scenarios refers to the process of designing specific situations or conditions that are suitable for testing the performance of a workload. Test scenarios are created to emulate realistic user behavior and workload patterns. These scenarios provide a way for performance testers to evaluate how the workload performs under various conditions.

Test scenarios make it possible to replicate various workload patterns, such as concurrent user access, peak load periods, or specific transaction sequences. By testing the workload under different workload patterns, you can identify performance bottlenecks and optimize resource allocation.

- _Define user behavior_. Emulate realistic user behavior and workload patterns by identifying the steps and actions that users perform when they interact with the workload. Consider activities such as signing in, performing searches, submitting forms, or accessing specific features. Break down each scenario into specific steps and actions that represent the user's interaction with the workload. You can include navigating through pages, performing transactions, or interacting with various elements of the workload.

- _Determine data involvement_. Identify the test data required to run the test scenarios. You might include creating or generating realistic data sets that represent various scenarios, user profiles, or data volumes. Ensure that the test data is diverse and covers different use cases to provide a comprehensive performance evaluation.

- _Design test scripts_. Create test scripts that automate the execution of the defined test scenarios. Test scripts typically consist of a sequence of actions, HTTP requests, or interactions with workload APIs or user interfaces. Use performance testing tools or programming languages to write the scripts, considering factors such as parameterization, correlation, and dynamic data handling. Validate the test scripts for correctness and functionality. Debug any issues, such as script errors, missing or incorrect actions, or data-related problems. Test script validation is crucial to help ensure accurate and reliable performance test execution.

- _Configure test variables and parameters_. Configure variables and parameters within test scripts to introduce variability and simulate real-world scenarios. Include parameters such as user credentials, input data, or randomization to mimic different user behaviors and workload responses.

- _Iteratively_ _refine scripts_. Continuously refine and enhance test scripts based on feedback, test results, or changing requirements. Consider optimizing script logic, parameterization, and error handling, or adding extra validation and checkpoints.

#### Configure the test environment

Configuring a test environment refers to the process of setting up the infrastructure, software, and network configurations that you need to create an environment that closely resembles your production environment.

To set up your testing environment in a way that boosts performance efficiency, include the following steps in your configuration process:

- _Mirror your production environment_. Set up your test environment to closely resemble your production environment. Consider factors such as environment settings and region, network settings, security settings, data sources, and integrations. The goal is to ensure that the performance test results are representative of real-world conditions.

- _Provision sufficient resources_. Allocate adequate resources such as storage capacity to the test environment. Ensure that the available resources can handle the expected workload and provide accurate performance measurements.

- _Replicate network conditions_. Configure the network settings in the test environment to replicate the expected network conditions during the actual workload deployment. You need to include bandwidth, latency, and network protocols.

- _Install and configure dependencies_. Install any apps from Marketplace, and other dependencies that are required for the workload to run correctly. This includes configuring third-party services with the expected production configurations.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: There are costs associated with maintaining separate test environments, storing data, using tooling, and running tests. Know the cost of performance testing, and find a way to optimize spending.

> :::image type="icon" source="../_images/risk.svg"::: **Risk**: Production data can contain sensitive information. Without a robust scrubbing and masking strategy, you risk leaking sensitive data when you use production data for testing.

### Perform the tests

Run the performance tests by using the chosen testing tool. Testing involves measuring and recording performance metrics, monitoring health, and capturing any performance issues that arise.

Monitor and collect performance metrics such as response time, throughput, and other relevant indicators.

Use the defined test scenarios to put the workload under expected loads. Conduct tests under these varying load conditions. For example, use levels, such as normal, peak, and stress levels, to analyze the behavior of the workload in various scenarios.

When planning and running performance tests it's important to remember that, in many cases, the Microsoft Cloud uses shared infrastructure to host your assets and the assets belonging to other customers. Limit tests to avoid unintended consequences.

### Document the results

Document your performance test results clearly and consistently. Your documentation should show:

- Whether your solution meets your performance goals for each scenario
- When and how you ran each test
- What version of your solution you tested
- Any errors or issues that occurred during the test
- Any changes or optimizations that you made after the test

### Analyze the results

Analyzing the test results involves examining the collected data and metrics from the performance tests to gain insights into the performance of the workload. The goal is to identify performance issues and use the feedback to adjust priorities in application development. 

The following actions are key steps for analyzing test results.

_Review performance metrics._ Look at the performance metrics that you collect during performance testing, such as response times, throughput, error rates, and network latency. Analyze these metrics to understand the overall performance of the workload.

- _Identify bottlenecks_. Evaluate the performance metrics to identify any bottlenecks or areas of inefficient performance. The evaluation can include high response times, resource constraints, database issues, network latency, and scalability limitations. Pinpointing the root causes of these bottlenecks helps you prioritize performance improvements.

- _Correlate metrics_. Assess the relationships and correlations between various performance metrics. For example, analyze how increased load or resource utilization affects response times. Understanding these correlations can provide valuable insights into workload behavior under different conditions. Look for patterns and trends in the performance data over time. Analyze performance under different load levels or during specific periods. Detecting trends can help identify seasonal variations, peak usage times, or recurring performance issues.

_Evaluate acceptance criteria._ Compare the retest results against the predefined acceptance criteria and performance goals. Assess whether the workload meets the desired performance standards. If the workload doesn't meet the acceptance criteria, further investigate and refine the optimizations.

_Iterate and refine the analysis._ Make other adjustments and improvements as needed. Use the collected data and metrics to diagnose specific performance issues. The diagnosis might involve tracing through the workload components, examining log files, monitoring resource usage, or analyzing error messages. Dig deeper into the data to understand the underlying causes of performance problems.

Based on the analysis of the test results, prioritize identified performance issues, and implement necessary improvements. The improvements can involve optimizing logic, tuning queries, improving caching mechanisms, and optimizing network configurations.

### Establish baselines

Baselines provide a reference point for comparing performance results over time. Baselines should be meaningful snapshots of workload performance—you don't need to use every test as a baseline.

Consider the workload objectives, and document performance snapshots that allow you to learn over time and optimize. Use these baseline measurements as a benchmark for future performance tests, and use them to identify any degradation or improvement.

To establish baselines for performance testing and use them as a benchmark for future performance tests, follow these steps:

- _Identify performance metrics_. Determine the specific performance metrics that you want to measure and track. Examples include:
  - Response time, or how quickly the workload responds to requests.
  - Throughput, or the number of requests that are processed per unit of time.
  - Resource utilization, such as storage capacity usage.

- _Record meaningful measurements_. Record the performance metrics that you obtain during the test as the baseline measurements. These measurements represent the starting point against which you compare future performance tests.

- _Compare future tests_. In subsequent performance tests, compare the performance metrics against the established baselines and thresholds. The comparison allows you to identify any improvements or degradation in performance.

### Test continuously

Continuous testing involves the ongoing monitoring and refinement of your tests. Continuous testing helps you maintain consistent and acceptable levels of performance. A workload should provide a consistent and acceptable level of performance relative to the baseline. You should tune the workload over time to produce consistent performance that's within the acceptable limits of performance. 

Here are some key practices:

- _Set degradation limits_. Define numeric thresholds that specify the level of performance degradation that's acceptable over time. By setting these limits, you can monitor performance fluctuations and receive alerts when the performance falls below the defined threshold.

- _Include quality assurance_. Incorporate performance requirements, such as maximum requests per second, into the quality assurance process. Treat performance requirements with the same level of importance as functional requirements. This process helps ensure that the workload meets the defined performance requirements before you deploy it to production.

- _Automate alerting_. In live environments, rapid detection and response are crucial. Set up automated alerting systems that use the performance baseline as their reference. If there's a significant deviation in performance, the necessary teams are alerted immediately to act.

- _Test changes_. Some performance issues might only manifest in a live setting. Apply thorough testing practices for proposed changes. Use code instrumentation to gain insights into the application's performance characteristics, such as hot paths. This testing ensures that any change introduced doesn't degrade performance beyond the acceptable limits.

## Power Platform facilitation

**Perform the tests**: [Azure Pipelines](/azure/devops/pipelines/get-started/what-is-azure-pipelines) makes it possible for you to integrate performance testing into your CI/CD (continuous integration/continuous delivery) pipeline. You can incorporate load testing as a step in your pipeline to validate the performance and scalability of your applications.

You can use [Power Platform Playwright samples](../../developer/playwright-samples/overview.md) to test all types of Power Apps.

[Azure Test Plans](/azure/devops/test/overview) is an easy-to-use, browser-based test management solution that provides all the capabilities required for planned manual testing, user acceptance testing, exploratory testing, and gathering feedback from stakeholders.

If your workload includes Azure resources, you can use [Azure Chaos Studio](https://azure.microsoft.com/services/chaos-studio) and [Azure Load Testing](/azure/load-testing/overview-what-is-azure-load-testing) to perform tests. 

During development, developers can also use [Power Apps Monitor](/power-apps/maker/monitor-overview) to diagnose and troubleshoot problems faster and build more reliable apps. It provides a deep view of your app by logging all the key activities that occur in the app as it runs. Power Apps Monitor also provides a better understanding of how the events and formulas contained in your app work, so you can improve performance and identify any errors or problems.

If your workload includes a Microsoft Copilot Studio agent, you can use the [Copilot Agent Kit](/microsoft-copilot-studio/guidance/kit-overview) to configure agents and tests. By running individual tests against the Copilot Studio APIs (Direct Line), the agent responses are evaluated against expected results.

**Analyze the results**: [Azure Monitor](/azure/azure-monitor/overview) is a comprehensive monitoring solution for collecting, analyzing, and responding to telemetry from your cloud and on-premises environments. [Application Insights](/azure/azure-monitor/app/app-insights-overview) is an extension of Azure Monitor that provides APM features. You can use Application Insights to monitor applications during development and testing and also in production.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: Testing takes time and skill to perform and can affect operational efficiency.

## Related information

- [Manage solution performance](/power-platform/architecture/key-concepts/performance/)
- [Recommendations for security testing](../security/testing.md)
- [Recommendations for designing a reliability testing strategy](../reliability/testing-strategy.md)

## Performance Efficiency checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

---

## Optimize code and logic recommendation for Power Platform workloads

Source: [optimize-code.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/optimize-code)

*Learn how to optimize your code and logic to support the performance requirements of a Power Platform workload.*

# Recommendations for optimizing logic

**Applies to this Power Platform Well-Architected Performance Efficiency checklist recommendation:**

|[PE:06](checklist.md)| **Use logic that's performant, and ensure that it offloads responsibilities to the platform. Use logic only for its intended purpose and only when necessary.**|
|---|---|

This guide describes the recommendations for optimizing code and infrastructure performance. To optimize your code and infrastructure, you should use your components only for their core purpose and only when required. When you overuse code and infrastructure, it creates unnecessary resource consumption, bottlenecks, and slow responses. To compensate for those inefficiencies, you must add more resources to accomplish the same tasks.

**Definitions**

| Term | Definition |
|---|---|
| Concurrency | When multiple tasks or processes are performed at once but not necessarily at the exact same time. |
| Parallelism | When multiple tasks or processes are performed at the same time. |

## Key design strategies

Optimizing logic and infrastructure entails fine-tuning the logic and the supporting infrastructure to improve performance efficiency. It requires performant logic that executes tasks quickly and doesn't waste resources. It requires a well-designed infrastructure that is streamlined to avoid unnecessary complexity. A workload should use the inherent capabilities of the platform. This approach helps ensure both logic and infrastructure are used primarily for their core purposes and only when needed.

### Optimize logic performance

To optimize logic performance, modify code to reduce resource usage, minimize runtime, and enhance performance. You can modify logic to improve the efficiency and speed of an app or flow. Don't mask performance issues with brute force. Brute force means adding compute resources to compensate for code performance, like adding extra capacity instead of addressing the source. You need to fix performance issues with optimization. When you optimize logic performance, it helps maximize the utilization of system resources, improves response time, reduces latency, and enhances the user experience.

### Instrument your logic

Instrumenting logic refers to the practice of adding custom event logging to collect data and monitor logic performance during runtime. Logic instrumentation allows developers to gather information about key metrics such execution time. By instrumenting logic, developers can gain insights into logic hot paths, identify performance bottlenecks, and optimize the logic for better performance efficiency.

Ideally, you should perform logic analysis early in the software development lifecycle. The earlier you catch a logic issue, the cheaper it is to fix. You want to automate as much of this logic analysis as possible. Use dynamic and static code analysis tools to reduce the manual effort. For example, [Flow Checker](/power-automate/error-checker) can highlight logic that isn’t expected to be performant, such as a query that doesn’t specify filter criteria. However, keep in mind that this testing is still a simulation of production. Production provides the clearest understanding of logic optimization.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: Logic monitoring tools are likely to increase costs.

### Identify hot paths

By instrumenting your logic, you can measure the resource consumption for different logic paths. These measurements help you identify hot paths. Hot paths have a significant effect on performance and resource usage. They're critical or frequently executed sections of a program that require high performance and low latency. 

To identify code hot paths, consider these steps:

- _Analyze runtime data_: Collect runtime data and analyze it to identify areas of the logic that consume the most elapsed time. Look for patterns or sections of logic that are frequently executed or take a long time to complete.

- _Measure performance_: Use profiling tools or performance testing frameworks to measure the execution time and resource consumption of different logic paths. This process helps identify bottlenecks and areas for improvement. For example, you can use [Monitor](/power-apps/maker/monitor-overview) in Power Apps to gain a better understanding of how the events and formulas of your app work so you can improve performance.

- _Consider business logic and user effect_: Evaluate the importance of different logic paths based on their relevance to the application's functionality or critical business operations. Determine which logic paths are crucial for delivering value to users or to meeting performance requirements.

### Optimize logic

Optimizing logic is about refining the structure and design of logic to perform tasks with fewer resources. Improved logic reduces unnecessary operations. It creates faster execution with less resource consumption. You should remove any unnecessary operations within the logic path that might affect performance. Prioritize optimizing hot paths to see the greatest performance efficiency gains. 

To optimize logic, consider the following strategies:

- _Remove unnecessary function calls_: Review your logic and identify any functions that aren't essential for the desired functionality and might affect performance negatively. For example, if a function call performs a validation completed earlier in the code, you can remove the unnecessary validation function call.

- _Minimize logging operations_: Logging can be helpful for debugging and analysis, but excessive logging can affect performance. Evaluate the necessity of each logging operation and remove any unnecessary logging calls that aren't critical for performance analysis. A good practice is to allow your system to turn logging on and off, to assist in debugging while not causing production performance problems.

- _Optimize loops and conditionals_: Analyze loops and conditionals in your logic and identify any unnecessary iterations or conditions that can be eliminated. Simplifying and optimizing these structures can improve the performance of your code. Minimize function calls within loops, and eliminate redundant calculations. Consider moving computations outside the loop.

- _Reduce unnecessary data processing_: Review your logic for any unnecessary data processing operations, such as redundant calculations or transformations. Eliminate these unnecessary operations to improve the efficiency of your logic. For example, use [Dataverse calculated columns, rollup fields](/power-apps/developer/data-platform/calculated-rollup-attributes) or [Power Fx columns](/power-apps/maker/data-platform/formula-columns) instead of calculating the value in code and storing it with a save operation.

- _Optimize data structures._ To efficiently store and retrieve data, select appropriate data structures and only the required data columns. Choose the best data structure for a specific problem. A suitable data structure improves application performance.

- _Minimize network requests_: If your logic involves making network requests (for example, using a connector action), minimize the number of requests and optimize their usage. Batch requests when possible and avoid unnecessary round trips to improve performance.

- _Reduce data structure size_: Review the data requirements and eliminate any unnecessary fields or properties. Optimize memory usage by selecting appropriate data types and packing data efficiently.

- _Do work asynchronously_: Evaluate if work could be done asynchronously instead of synchronously in your logic. For example, instead of performing the operation inline, consider implementing a Power Automate flow to process the work asynchronously.

- _Configure before customizing._ Use standard application components if you can. Customizations such as plug-ins and JavaScript can affect performance.

- _Minimize controls._ Display only the fields you need in the forms—too many fields can clutter the user interface and affect performance. Minimize the number of controls in the command bar, canvas app, or custom page. Avoid nesting galleries or adding too many components to a gallery.

- _Optimize data queries._ Only load the data that you need in an app or flow. Use server-side views to prefilter data to narrow down data relevant to your query.

Review the performance recommendations specific to the Power Platform product you're working with. Evaluate your logic against these recommendations to identify areas for improvement.

Learn more about [Power Automate cloud flow coding guidelines](/power-automate/guidance/coding-guidelines/), [Power Apps coding guidelines](/power-apps/guidance/coding-guidelines/overview), and [Power Automate desktop flow coding guidelines](/power-automate/guidance/desktop-flow-coding-guidelines/) to optimize logic.



> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: Optimizing logic and hot paths requires expertise. Identifying logic inefficiencies is subjective and might require highly skilled individuals, whom you may need to pull from other tasks.

### Use concurrency and parallelism

Using concurrency and parallelism involves executing multiple tasks or processes either simultaneously or in an overlapping manner to make efficient use of computing resources. These techniques increase the overall throughput and the number of tasks that a workload can process. When you run tasks concurrently or in parallel, it can reduce the runtime of the application and increase response times. 

Concurrency and parallelism effectively distribute the workload among the computing resources. When increasing concurrency or parallelism, consider the impact on other systems, as you might exceed their limits. For example, a concurrent loop in a Power Automate flow processing each item at a time could surpass the request limits of a connector used in the loop's logic.

**Use parallelism.** Parallelism is the ability of a system to simultaneously trigger multiple tasks or processes on multiple computing resources. Parallelism divides a workload into smaller tasks that are run in parallel. When you run logic in parallel, performance improves because the workload is distributed across multiple branches.

**Use concurrency.** Concurrency is the ability of a system to run multiple tasks or processes. Concurrency enables different parts of a workload to make progress independently, which can improve overall performance.

- Concurrent execution: Concurrent execution allows the same logic to run simultaneously. Limiting concurrent execution to one can have the effect of serializing logic, resulting in processing one item at a time. Controlling the amount of concurrent execution of workload items can help manage resource usage during processing. For example, Power Automate flow loops can be configured to process multiple actions in parallel using the Concurrent Control property. 

    > [!NOTE]
    > Before you enable concurrency, keep in mind that this means multiple actions will be performed at the same time—if you're writing data as part of the loop, ensure the destination of the data can handle simultaneous requests.

- _Queues_: A queue is a storage buffer located between a requesting component (producer) and the processing component (consumer) of the workload. There can be multiple consumers for a single queue. As the tasks increase, you should scale the consumers to meet the demand. The producer places tasks in a queue. The queue stores the tasks until a consumer has capacity. A queue is often the best way to hand off work to a processing service that experiences peaks in demand. For more information, see [Queue-Based Load Leveling pattern](/azure/architecture/patterns/queue-based-load-leveling) and [Storage queues and Service Bus queues](/azure/service-bus-messaging/service-bus-azure-and-service-bus-queues-compared-contrasted).

### Optimize background jobs

Many applications require background tasks that run independently of the user interface. The application can start the job and continue to process interactive requests from users. Examples of background jobs include batch jobs, processor-intensive tasks, and long-running processes, such as workflows. Background tasks shouldn't block the application or cause inconsistencies due to delayed operation when the system is under load. For more information on optimizing background jobs, see [Recommendations for developing background jobs](/power-platform/well-architected/reliability/background-jobs).

## Power Platform facilitation

**Instrumenting code**: When building canvas apps, performant patterns should be used to enhance app efficiency, while anti-patterns should be avoided. For more information, see [Overview of creating performant Power Apps](/power-apps/maker/canvas-apps/create-performant-apps-overview). Use [Monitor](/power-apps/maker/monitor-overview) in Power Apps to diagnose and troubleshoot performance issues during development.

**Measure engagement and outcomes**: When building agents, tracking [conversation engagement](/microsoft-copilot-studio/guidance/measuring-engagement) and [outcomes](/microsoft-copilot-studio/guidance/measuring-outcomes) is essential for measuring agent performance metrics and discovering areas for improvement.

**Optimizing code logic**: With the [solution checker](/power-apps/maker/data-platform/use-powerapps-checker) feature, you can perform a rich static analysis check on your solutions against a set of best-practice rules and quickly identify problematic patterns. With [Flow Checker](/power-automate/error-checker), you can get insights into which areas of your flow's implementation pose a performance risk?

**Using concurrency and parallelism**: Power Automate cloud flows support concurrency in loops and triggers. Note that [concurrency, looping, and debatching limits](/power-automate/limits-and-config#concurrency-looping-and-debatching-limits) apply and are based on your performance profile. Power Apps support concurrency using the [Concurrent](/power-platform/power-fx/reference/function-concurrent) function.

**Optimizing Dataverse performance**: Microsoft Dataverse provides an extensible framework that allows developers to build highly customized and tailored experiences. When you're customizing, extending, or integrating with Dataverse, be aware of the established guidance and best practices. See [Best practices and guidance when using Microsoft Dataverse](/power-apps/developer/data-platform/best-practices/).

## Related information

- [Manage solution performance](/power-platform/architecture/key-concepts/performance/)
- [Concurrency, looping, and debatching limits in Power Automate](/power-automate/limits-and-config#concurrency-looping-and-debatching-limits)
- [Product-specific guidance for optimizing Dynamics 365 performance](/dynamics365/guidance/implementation-guide/performing-solution-product-specific-guidance)
- [Performance tuning and optimization for customer engagement apps](/power-platform/admin/performance-tuning-and-optimization)
- [Overview of creating performant Power Apps](/power-apps/maker/canvas-apps/create-performant-apps-overview)
- [Monitor overview](/power-apps/maker/monitor-overview)
- [Improve component performance, stability, and reliability with solution checker](/power-apps/maker/data-platform/use-powerapps-checker)

## Performance Efficiency checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

---

## Prioritize the performance of critical flows recommendation for Power Platform workloads

Source: [prioritize-critical-flows.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/prioritize-critical-flows)

*Learn how to identify critical flows and prioritize the performance of critical flows in a Power Platform workflow.*

# Recommendations for prioritizing the performance of critical flows

**Applies to this Power Platform Well-Architected Performance Efficiency checklist recommendation:**

|[PE:07](checklist.md)|**Prioritize the performance of critical flows. The allocation of workload resources and performance optimization efforts should prioritize the flows that support the most important business processes, users, and operations.**|
|---|---|

This guide describes the recommendations for prioritizing the performance of critical flows in a workload. Critical flows represent crucial business processes that generate revenue or drive high-priority operations. When you prioritize the performance of critical flows, you ensure the flows that have the most impact get the resources they need before lower priority flows. Failure to do this prioritization can have disproportionate negative effects on workload priorities and the user experience.

**Definitions**

| Term | Definition |
|---|---|
| Flow | In a workload, the sequence of actions that performs a specific function. A flow involves the movement of data and the running of processes between components of the workload. |
| Priority queue processing | The act of processing high-priority tasks before low-priority tasks. |
| Rate limiting | The act of limiting how many requests can access a resource. |
| System flow | The flow of information and processes within a system. The system automatically follows this flow to enable user flows or workload functionality. |
| User flow | The sequence that a user follows to accomplish a task. |

## Key design strategies

Critical flows refer to the key user flows for customers or the system and data flows for operations that are crucial to the workload functionality. These flows can include actions such as user registrations, processing of financial transactions, or any other key path or process within your workload.

Critical flows significantly affect the user experience or business operations. Critical flows have higher performance targets and service-level agreements than noncritical flows. Where resources are limited, noncritical flows should yield resource usage to critical flows. You need to identify, monitor, and prioritize all flows before isolating and optimizing critical flows.

### Identify all flows

The first step in prioritizing the performance of critical flows is identifying all the flows within your workload. Flow identification involves systematically mapping and understanding user paths and component communication. The focus is on understanding the performance metrics and potential impact of flows on workload performance.

By dissecting the workload into discrete flows, you can find performance bottlenecks, inefficient resource utilization, and opportunities for performance optimization. This knowledge exposes areas of improvement and is the first step to identifying critical flows. For more information, see [Identify and rate user and system flows](../reliability/identify-flows.md).

### Monitor flow performance metrics

After you identify all flows within your workload, you need to collect performance metrics on each flow and monitor those metrics. Flow metrics provide insights into response times, error rates, and throughput. The goal is to consistently observe and record performance-related metrics to further refine your understanding of each flow's impact on workload performance. 

To monitor flow metrics, use the following tools to collect data:

- _Analytic and tracking tools_: These tools provide insights into user behavior and interactions within your application. By analyzing user data, you can identify the most common flows, bottlenecks, or potential issues.

- _Application performance monitoring (APM) tools_: Use APM tools to monitor the performance of your application and track how flows run. These tools provide visibility into response times, errors, and other performance metrics, allowing you to identify critical flows and optimize their performance.

- _Logging and debugging tools_: Use these tools to capture and analyze logs and debug information while your application runs. Review logs and debugging information to trace how flows are running and identify issues or errors.

### Identify critical flows

With the performance data available, you can begin ranking all the flows and identifying the critical flows. The identification of critical flows involves evaluating the performance impact and criticality of each flow. Effective flow prioritization ensures that the most important flows receive the resources needed before less critical flows. 

To prioritize flows in your application, consider these steps:

- _Identify business impact_: Start by assessing the importance of each flow within your operations. Focus on how each flow aligns with your business objectives, its impact on users, and the potential negative effects of poor performance. For instance, slow performance of your customer service system might mean users use workarounds, like Microsoft Teams or eMail, instead of recording customer decisions in the system, leading to poor data quality and incorrect reporting. 

    Additionally, consider the performance impacts of a flow across one or more business processes. Multiple flows might support a single business process, but often, one flow has a significant effect on the performance of that process. You want to identify the flows that have the greatest performance impact. Conversely, a single flow might underpin several processes. In such cases, the performance of this flow directly influences the efficacy of all related processes, and it's likely a critical flow.

- _Analyze performance data_: Analyze the performance metrics associated with each flow. Look for patterns, anomalies, or standout metrics that can provide insights into the flow's efficiency and importance. For example, system flows with significant usage are likely important flows.

- _Assign criticality rating_: Based on the business impact and performance indicators, you should prioritize the flows. Use criticality ratings of _Critical (high criticality)_, _Important (medium criticality)_, and _Productivity (low criticality)_. Flows with a significant business impact or high-performance demand should receive a _Critical_ (_high criticality)_ criticality rating. Focus on flows with high user traffic or have a direct effect on revenue generation. The following table provides characteristics of critical (_High_) and noncritical flows (_Medium_ to _Low_).

    | Critical flows | Noncritical flows |
    |---|---|
    | High usage | Low usage |
    | Business critical | Not business critical |
    | Expensive operations | Small operations |
    | Time-sensitive | Not time-sensitive |
    | Production | Preproduction |
    | Real-time processing | Batch processing |
    | Latency sensitive | Not latency sensitive |
    | Paying user | Nonpaying user |
    | Important tasks | Nonessential tasks |

### Isolate critical flows

The process of isolating critical flows involves allocating dedicated resources or capacity to support critical flows. You want to allocate resources and attention to those flows that are essential for optimal user experience or significant business outcomes. The goal is to ensure critical flows receive enough resources to operate efficiently and effectively. By isolating critical flows, you can more easily manage the resources that support critical flows. 

Here are recommendations for isolating critical flows:

- _Resource segmentation_: Create separate environments for critical workloads, allowing them to operate independently without interference from other processes. For example, make sure that Power Automate cloud flows that are critical to your workload run under a dedicated service account so they aren't impacted by the capacity limitations of a user account that might run other processes as well.

- _Capacity allocation_: For critical flows, explicitly allocate a fixed set of capacity such as assigning a Power Automate Process license to a cloud flow, or creating a dedicated environment for your workload where you allocate AI Builder or other credits. This allocation ensures that critical flows always have enough resources to operate efficiently. By explicitly allocating resources to critical flows, you prevent resource contention and prioritize how they run.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: Resource segmentation affects costs. When you dedicate resources to a flow, you often increase the cost and leave some resources underutilized. To justify the performance enhancements to critical flows, the increase in business impact must outweigh the increase in cost.

## Power Platform facilitation

**Generate process diagrams**: [Plan designer](/power-apps/maker/plan-designer/process-diagram) helps teams create and refine diagrams as part of the plan to clarify user interactions and build effective solutions. Process diagrams make workflows clearer, improve communication, and help teams work more efficiently, especially on complex projects.

**Identifying and monitoring flows**: Consider using [process mining and task mining in Power Automate](/power-automate/process-advisor-overview), including a [process map](/power-automate/process-advisor-visualize), a powerful tool that can help you visualize and analyze your business processes. 

**Optimizing capacity allocations**: You can isolate critical flows through techniques such as creating separate environments, solutions, resources, and explicitly allocating resources to critical flows.

During your design phase, take into account [request limits and allocations](/power-platform/admin/api-request-limits-allocations) and [performance profiles](/power-automate/limits-and-config) that apply to your resources.

## Related information

- [Recommendations for identifying and rating flows](/power-platform/well-architected/reliability/identify-flows)

## Performance Efficiency checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

---

## Optimize data performance recommendation for Power Platform workloads

Source: [optimize-data-performance.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/optimize-data-performance)

*Learn how to optimize data read and write actions, storage, and processing operations to enhance the overall performance of your Power Platform workload.*

# Recommendations for optimizing data performance

**Applies to this Power Platform Well-Architected Performance Efficiency checklist recommendation:**

|[PE:08](checklist.md)|**Optimize data performance. Optimize data stores for their intended and actual use in the workload.**|
|---|---|

This guide describes the recommendations for optimizing data performance. Optimizing data performance is about refining the efficiency with which the workload processes and stores data. Every workload operation, transaction, or computation typically relies on the quick and accurate retrieval, processing, and storage of data. When data performance is optimized, the workload runs smoothly. Compromised data performance creates a domino effect of poor performance efficiency. Failure to optimize data performance results in response delays, heightened latency, and curtailed scalability. It jeopardizes the efficiency of the entire workload.

**Definitions**

| Term | Definition |
|---|---|
| Data store | A resource that stores data such as a database, object store, or file share. |
| Index | A database structure that provides quick access to items. |
| Online analytical processing (OLAP) | A technology that organizes large business databases, supports complex analysis, and performs complex analytical queries without negatively affecting transactional systems. |
| Online transaction processing (OLTP) | A technology that records business interactions as they occur in day-to-day operations of an organization. |
| Partitioning | The process of physically dividing data into separate data stores. |
| Query tuning | A process that optimizes the speed of a database query. |

## Key design strategies

To optimize data usage, ensure that data stores are optimized for their intended use and for their actual use in a workload. Optimized data usage can improve query performance, reduce resource consumption, and enhance overall system efficiency. Consider the following strategies:

- _Profile data._ Understand your data and ensure that your data model is well-suited for your workload. Consider factors such as data normalization and partitioning techniques. For efficient data retrieval, ensure that you select appropriate data types and define relationships between tables.

- _Optimize query performance._ Analyze and optimize queries that run in the workload. Use techniques such as query optimization and caching. Use server-side views to prefilter data. To identify bottlenecks, use performance monitoring tools and then make necessary improvements.

- _Regularly monitor and tune the system._ Continuously monitor the performance of your workload and iterate on the data storage configuration and query optimizations. Based on performance tuning best practices, analyze system metrics, identify areas of improvement, and implement changes. As data grows, you might have to update your queries to remain performant.

### Profile data

Data profiling involves examining the data from a source and gathering information about it. The objective is to understand the quality, structure, and characteristics of workload data. This process allows for the identification of issues such as missing values, duplicates, inconsistent formats, and other anomalies. 

For effective data profiling, consider the following strategies:

- _Understand the data structure._ Examine the structure of your data, including tables, columns, and relationships. Determine the data types, lengths, and constraints that are applied to each column. Data structure evaluation helps you understand how the data is organized and how it relates to other data elements.

- _Analyze the data volume._ Assess the volume of your data to understand the overall size and growth patterns. Determine the number of records or documents and the size of individual tables or collections. This information helps you estimate storage requirements and identify scalability issues.

- _Identify data relationships._ Explore the relationships between data elements. Understand how data is connected, so you can determine how changes in one table or document might affect related data.

- _Assess data quality._ Evaluate the quality of your data by examining factors such as completeness, accuracy, consistency, and uniqueness. Identify data anomalies, missing values, or duplicate records that might affect data integrity and query performance. This step helps you identify areas for data cleansing and improvement.

- _Capture data distribution._ Analyze the distribution of values within each column to determine data patterns. Identify frequent and rare values, outliers, and data skews. To optimize query performance, analyze if alternate keys would be appropriate to provide improved performance.

### Monitor data performance

Data performance monitoring is the practice of consistently tracking the efficiency of data stores. It involves collecting and analyzing performance metrics specific to data operations, using tools tailored for system-level, database-specific, or third-party monitoring solutions. Effective data performance monitoring allows you to proactively identify and mitigate potential bottlenecks, ensuring that data-related processes and tasks are efficient. 

To monitor data performance, consider the following strategies:

- _Collect data-specific metrics._ Gather key metrics that directly relate to data performance. These metrics include query response times and data throughput.

- _Set up_ _data alerts._ Set up alerts specifically for data metrics. Use predefined thresholds or anomalies in these metrics to trigger alerts. Alerts enable you to receive notifications when performance metrics exceed acceptable ranges or show abnormal behavior; for instance, if a database query takes longer than expected or if data throughput drops significantly. You can set up these alerts using specialized monitoring tools or custom scripts.

- _Diagnose data performance issues._ Regularly review the collected data metrics to identify potential performance bottlenecks or degradation in data operations. Visualization tools or dashboards can be invaluable in this process, helping to highlight trends, bottlenecks, and outliers in data performance. Once identified, investigate the root causes of these issues and plan appropriate remediation steps.

### Partition data

Partitioning involves dividing large datasets or high-volume workloads into smaller, manageable subsets. Partitioning enhances data performance efficiency by distributing the workload and improving parallel processing. It also ensures more effective data access based on specific needs and query patterns. You can partition data vertically or horizontally (also called sharding). For example, if using Dataverse Elastic tables consider what should be the partitioning key.

| Strategy | Definition | Example | Use cases |
|---|---|---|---|
| **Vertical partitioning** | Divide a table into smaller tables by selecting specific columns or fields for each partition. Each partition represents a subset of the complete data. | If you have a table with columns A, B, C, and D, you could create one table with columns A and B and another with columns C and D. | - A table contains many columns, but queries don't access all columns together.<br>- Some columns are larger than others and separating them can boost I/O performance.<br>- Different data parts have diverse access patterns. |
| **Horizontal partitioning** | Split data based on rows or ranges of values (also known as sharding). Each partition contains a subset of rows with similar characteristics. | If you have a table with rows 1 to 1000, you might create one partition with rows 1 to 500 and another with rows 501 to 1000. | - A dataset is too large for a single location or server.<br>- Data is accessed based on specific ranges or filters.<br>- Need to distribute the workload across physical nodes or servers for enhanced performance. |

To partition your data, consider the following steps:

- _Analyze data and queries._ Analyze data and query patterns to identify suitable partitioning or sharding strategies. Understand the nature of the data, access patterns, and distribution requirements.

- _Determine a key._ Choose a partitioning or sharding key to distribute data across partitions or shards. Carefully select the key based on data characteristics and query requirements.

- _Determine logic._ Determine a partitioning or sharding logic based on the chosen key. Consider dividing the data into ranges, applying hashing algorithms, or using other partitioning techniques.

### Optimize queries

Optimizing queries refines queries to reduce the data that qualifies and the data returned. These adjustments increase efficiency and speed of data retrieval. As a result, the database has a lighter workload, resources work more effectively, and users enjoy smoother interactions. 

To optimize database queries, consider the following strategies:

- _Rewrite queries._ Review and analyze complex queries to identify opportunities to rewrite them. Consider restructuring query logic, eliminating redundant operations, or simplifying query syntax.

- _Avoid the N+1 query problem._ Minimize the number of roundtrips to the database by using joins and batch fetching to retrieve related data efficiently.

- _Reorder joins._ Evaluate and consider rearranging the join order to minimize the number of rows in each join operation. The order in which you join tables can affect query performance.

- _Cache queries._ Store the results of frequently run queries for easy reuse. Query caching eliminates the need for repeatedly running the same query, and it reduces query processing overhead.

- _Monitor and tune._ Monitor query performance metrics, such as runtime, resource utilization, and query throughput. Use database profiling tools and monitoring functionalities to identify poorly performing queries. Use that information to optimize query performance.

### Archive and purge data

Archiving and purging are strategies that streamline data storage. Archiving relocates older, less-frequently accessed data to more cost-effective storage. Purging data permanently removes redundant data. Both methods contribute to performance efficiency by reducing data volume, increasing data access speed, and reducing backup and recovery times.

- _Reducing data volume_: Less data means faster processing times, ensuring quick responses to user requests.
- _Increasing data access speed_: A trimmed dataset allows for swifter queries and data retrieval, optimizing system responsiveness.
- _Reducing backup and recovery times_: Smaller datasets expedite backup and restoration processes, minimizing downtime and ensuring consistent performance.

Archiving and purging are instrumental in maintaining peak performance efficiency in data-driven systems.

### Optimize storage load

Optimizing storage load means streamlining requests to the storage system. It helps eliminate unnecessary requests, enhances data retrieval, and avoids overwhelming the storage system. Optimizing the storage load ensures the storage system remains responsive to legitimate requests and maintains peak performance. Implement strategies to reduce the processing burden on the data store. To optimize data store load, consider the strategies that follow.

#### Use caching

Caching stores commonly accessed data in a fast-access storage area, making data retrieval quicker than pulling it from the main source. This technique boosts data performance by cutting down on access times and avoiding repetitive data fetches. Caching improves read speeds and user response times, especially for frequently accessed data. This method is most effective on static data or data that rarely changes.

To ensure optimal caching efficiency, consider factors like expiration policies, eviction strategies, and management of cache size. Adjust settings, such as the time to live (TTL), for optimal performance. To use a cache to optimize storage load, consider the following strategies:

- _In-memory caching_: Perform in-memory caching to store frequently accessed data in memory for fast retrieval. You can use this technique for application data that's expensive to compute or retrieve from a database. In-memory caching is useful for data that you read frequently but doesn't change frequently. For example, you can use variables in cloud flows or collections in canvas apps to cache data.

- _Database query caching_: Use this technique to cache the results of database queries to avoid running the same query multiple times. Database query caching is useful for complex and time-consuming database queries. When you cache the results of a query, subsequent requests for the same query are returned quickly. Also consider using server-side views where possible to prefilter data to narrow down data relevant to your query.

- _Content delivery network caching_: Use this technique to cache web content on distributed network servers to reduce latency and improve content delivery. Content delivery network caching is effective for static content, like images, CSS files, and JavaScript files. Content delivery networks store copies of content in multiple locations worldwide, so users can access the content from a server that's near them geographically.

#### Optimize data updates

Optimizing data updates involves evaluating the updates of data that are performed to ensure they're performant. Updates can affect performance more than other operations because they can trigger unnecessary work and cause locking conflicts.

To evaluate how to optimize data updates, consider:

- _Data changes_. Optimize automation to use pre-images of the data or filters to minimize work when no actual change has occurred. Avoid triggering automation for unmodified data.

- _Automation_. Evaluate when and how updates are triggered based on data changes, and optimize triggers to include a filter. For example, to trigger the automation only when a specific field in the data source is modified. Evaluate updates that incrementally trigger automations multiple times. Instead, consider whether you can create a custom operation to handle all processing. For example, if an order ships and the ship date and tracking number are updated separately, they could both be updated at the same time in a custom "ShipOrder" operation.

- _Deadlocks_. Evaluate slow update operations that might be causing issues due to multiple flows updating the same data in different sequences. This inefficiency can lead to locking conflicts or even potential deadlocks, resulting in unnecessary rework. Update the different resources in the same sequence to minimize contention.

- _Bulk updates_. If you run operations on multiple rows of a table, consider using [bulk operations](/power-apps/developer/data-platform/optimize-performance-create-update).

### Optimize data movement and processing

Optimizing data movement and processing involves improving the efficiency and performance of operations related to data extraction, transformation, loading, and processing. Consider the following key aspects of optimizing data movement and processing:

- _Extract, transform, and load (ETL) optimization_: Optimize ETL processes to minimize processing time. You can streamline the extraction process, implement efficient transformation algorithms, and optimize the loading process. When you make each step efficient, you optimize the overall workflow.

- _Parallel processing_: Use parallel processing techniques to improve performance. When you distribute data processing tasks across multiple threads or nodes, you can divide and process the workload concurrently, which results in fast processing.

- _Batch processing_: Group similar tasks together to reduce overhead caused by repeated operations. Process multiple tasks in a batch to reduce overall processing time.

#### Design for data proximity

Data proximity refers to the strategic placement of data closer to the users or services that access it most frequently. Reducing the physical or logical distance between the data and its users ensures faster data access and improved responsiveness. To optimize design for close proximity, consider these strategies:

- _Evaluate data access patterns_: Assess your workload's access patterns and frequently accessed data. This analysis can help determine where to place data for maximum benefit.

- _Choose solutions that support data relocation_: Consider solutions that offer dynamic data relocation based on changing access patterns, ensuring optimal data positioning.

- _Choose solutions that support data synchronization_: If you're serving a distributed user base, choose solutions that enable data synchronization across the various regions, to ensure that data replicas are available in proximity to users.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: If underlying data changes frequently, implement a cache invalidation mechanism to ensure that the cached data remains up to date.

## Power Platform facilitation

**Monitor data performance**: To monitor data performance, consider using [Azure Monitor](/azure/azure-monitor/overview) to collect and analyze infrastructure metrics, logs, and application data. You can integrate Monitor with other services like [Application Insights](/azure/azure-monitor/app/app-insights-overview). Application Insights provides application performance monitoring and supports many platforms.

Application Insights collects usage and performance data. You can use [Log Analytics](/azure/azure-monitor/logs/log-analytics-overview) to correlate that data with configuration and performance data across Azure resources. The [Application Insights for Dataverse](/power-platform/admin/telemetry-events-dataverse) data stream currently provides performance data related to Dataverse API incoming calls, Dataverse plug-in execution calls, and Dataverse SDK calls.

**Optimize query data patterns in canvas apps:**  Follow the documented guidance and suggestions. See [Optimized query data patterns in Power Apps](/power-apps/maker/canvas-apps/optimized-query-data-patterns).

**Optimize how you are customizing, extending, or integrating with Dataverse:** Follow the documented best practices and guidance. See [Best practices and guidance when using Microsoft Dataverse](/power-apps/developer/data-platform/best-practices/).

**Optimize database queries and index performance**: Use the query performance insight feature of Azure SQL Database to optimize queries, tables, and databases. You can also use this feature to identify and troubleshoot query performance issues.

For relational databases, follow the [index design guidelines](/azure/architecture/best-practices/data-partitioning), [SQL Server index guidance](/sql/relational-databases/indexes/indexes), and [Azure Cosmos DB index guidance](/azure/azure-sql/database/sql-insights-overview). Use SQL Database to perform [automatic tuning](/azure/azure-sql/database/automatic-tuning-overview) for queries to improve their performance.

For SQL databases, you should regularly [reorganize or rebuild indexes](/purview/governance-solutions-overview). Identify slow queries and tune them to improve performance. Many database engines have query-tuning features. For more information, consult the [best practices for query performance](/azure/architecture/guide/technology-choices/data-store-decision-tree).

Azure Cosmos DB has a [default indexing policy](/azure/cosmos-db/index-policy) that indexes every property of every item and enforces range indexes for any string or number. This policy provides you with efficient query performance, and you don't have to manage indexes upfront.

**Optimize storage load**: Many Azure database services support read replicas. The availability and configuration of read replicas vary depending on the Azure database service. Refer to the official documentation for each service to understand the details and options.

## Related information

- [Overview of creating performant Power Apps](/power-apps/maker/canvas-apps/create-performant-apps-overview)
- [Select an Azure data store for your application](/azure/architecture/guide/technology-choices/data-store-decision-tree)
- [Customize a Power Automate flow trigger by adding conditions](/power-automate/triggers-introduction?tabs=classic-designer#customize-a-trigger-by-adding-conditions)
- [Dataverse elastic tables](/power-apps/developer/data-platform/elastic-tables)
- [Use SQL Server with canvas apps](/power-platform/architecture/reference-architectures/sqlserver-canvas-app)
- [Use Dataverse as a datasource for canvas apps](/power-platform/architecture/reference-architectures/dataverse-canvas-app)

## Performance Efficiency checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

---

## Respond to live performance issues recommendation for Power Platform workloads

Source: [respond-live-performance-issues.md](https://learn.microsoft.com/en-us/power-platform/well-architected/performance-efficiency/respond-live-performance-issues)

*Learn how to respond to live performance issues and use root cause analysis, triage plans, and other steps to resolve problems in Power Platform workflows.*

# Recommendations for responding to live performance issues

**Applies to this Power Platform Well-Architected Performance Efficiency checklist recommendation:**

|[PE:09](checklist.md)|**Respond to live performance issues. Plan how to address performance problems by incorporating clear lines of communication and responsibilities. When a problematic situation occurs, use what you learn to identify preventive measures and incorporate them in your workload. Implement methods to return to normal operations faster when similar situations occur.**|
|---|---|

This guide describes the best practices for responding to live performance issues. Live performance issues refer to real-time challenges and bottlenecks that can hinder the optimal functioning of a workload. Addressing these issues promptly not only facilitates the immediate detection and rectification of performance hiccups but also ensures that the workload consistently meets its performance benchmarks. Failing to address them can lead to complications, including slowdowns, crashes, and system unresponsiveness, and degrade the user experience. They can also prevent users from completing their tasks efficiently, and, in turn, tarnish the reputation of the organization.

**Definitions**

| Term | Definition |
|---|---|
| Data correlation | Aligning logs, metrics, and events from various parts of your workload to pinpoint underlying causes. |
| Root cause analysis | A process for identifying the underlying factors that are responsible for a problem. |
| Self-healing | The ability to automatically repair issues without human intervention. |
| Self-prevention | Implementations within a workload to prevent potential issues and failures. |

## Key design strategies

When you experience a live performance issue, you need to be prepared with the right data and a plan to respond to the issue. This plan should include clear lines of communication and responsibilities. The primary objective is to identify if the performance issues are temporary or isolated, to identify the root cause of the performance issue, and to implement solutions that facilitate a quick return to regular operations and provide insights from the incident. Integrating preventive measures into your workflow is a pivotal strategy. The goal is to either prevent the same issue from happening again or lessen its effects on performance if it isn't preventable.

### Prepare for issues

The ideal response to live-site performance issues is precise and fast. Precision and speed in performance remediation require preparation. To effectively respond to live performance issues, it's crucial to monitor key performance metrics, identify the root cause of the issues, and implement appropriate solutions or optimizations. To take these steps, you might need to analyze workload logs, conduct performance testing, and optimize code or configurations. 

The following examples outline a few critical areas of preparation:

- _Have accurate architecture diagrams._ Your architecture diagrams should include all components and show how they interact. Visual representation can help identify bottlenecks and single points of failure that can lead to performance degradation or unavailability. Ideally, you catch and remove these issues before they cause problems, but having an up-to-date diagram can help you pinpoint issues in high-stress moments.

- _Check data access._ Data and logs from monitoring processes are critical for responding to performance issues in real time and conducting root cause analyses. But it's important to maintain the integrity and confidentiality of the data. Responding to live-site performance issues often requires access to underlying data that might not be normally accessible. You need to ensure that personnel have access to the data that they need when issues arise. But you should only grant time-restricted, least-privilege access, and you should limit that access to authorized personnel.

- _Set automatic alerts._ Alerts can help you identify and address issues as soon as they occur. Alerts should generate notifications when workload performance deviates from performance baselines. Over time, you should tweak alert configurations to avoid generating too many or too few notifications. The monitoring solutions that you use need to collect enough data to generate alerts. These alerts should align with performance targets and established baselines. You should avoid generating alerts on issues that aren't relevant to your goals. Examples of alerts include degradations in response times, performance of Dataverse API calls or plug-ins, and page loads.

### Create a triage plan

Creating a triage plan involves devising a structured approach to identify, escalate, analyze, prioritize, and communicate live-site performance issues. A triage plan is a strategy for responding to live performance issues. It ensures that performance disruptions are addressed promptly and effectively, with clear roles and procedures. Most performance issues don't merit disaster recovery protocols, but they can affect workload functionality enough to require triage planning. A well-documented triage plan ensures all team members are aligned and can act swiftly, minimizing the impact on users and workloads. A triage plan should include the following components:

- _Identification and monitoring_: Implement a system to identify and monitor performance issues in real time. You should have a list of the contact information of people who are capable of making decisions or escalating issues to higher levels. The plan should also identify roles and responsibilities. It needs to document which accounts gain access to protected information and for how long.

- _Escalation process_: Define a clear escalation process to ensure that performance issues are escalated to the appropriate teams or individuals in a timely manner. The process definition should include contact information and guidelines for escalating issues.

- _Root cause analysis_: Develop a process for conducting a root cause analysis to identify the underlying cause of each performance issue. The process should involve analyzing logs and performance metrics and conducting diagnostic tests to pinpoint the source of each problem.

- _Prioritization_: Establish a prioritization framework to determine the severity of performance issues and prioritize them based on their effect on the workload and users.

- _Communication_: Create a communication plan to keep stakeholders informed about the status of performance issues and the progress of their resolution. Consider regular updates, status reports, and clear communication channels.

- _Documentation_: Document the triage plan, including all its steps, processes, and best practices. This documentation should be easily accessible to the team members who are involved in responding to performance issues.

### Develop methods to identify and resolve issues

Resolving live performance issues involves identifying and addressing any factors that can cause performance degradation or inefficiencies in a live workload. Data that you collect during monitoring is invaluable for investigating and resolving performance-related incidents. This data provides a historical record of performance metrics. When you have monitoring data available, you can analyze root causes and identify contributing factors. You should use all relevant monitoring data to understand and fix each performance issue. Monitor how many transient spikes you're detecting, and adjust thresholds accordingly.

### Use root cause analysis

Root cause analysis requires hypothesis testing. After you review monitoring data, you should list potential causes of the performance issue and test them. 

To conduct a root cause analysis on a live performance issue, follow these steps:

- _Gather information._ Collect as much information as possible about the performance issue. Examples include error messages, logs, performance metrics, and any other relevant data. Also include information about the users who reported the issue, such as their device, network, and location. 

- _Define the problem._ Clearly define the problem by identifying the symptoms and the effect that the problem has on the workload or users.

- _Investigate potential causes._ Narrow down the scope of the analysis by identifying the specific component or area of the workload where the performance issue is occurring. Identify potential causes of the performance issue based on the gathered information. This process can involve analyzing code, configuration settings, infrastructure, or external dependencies.

- _Correlate data._ Dive deeper into the collected data to identify patterns, anomalies, or correlations that might contribute to the performance issue. Data correlation is key to identifying performance issues and causes. It can involve reviewing logs, analyzing performance metrics, and conducting tests.

- _Test hypotheses._ Formulate hypotheses based on the potential causes that you identify. Conduct tests to validate or refute your hypotheses. You should use a test environment to see whether you can replicate the error.

- _Implement solutions._ Once you identify a root cause, develop and implement solutions to address the performance issue.

- _Monitor and validate._ After you implement the solutions, continuously monitor the workload to ensure that the performance issue is resolved. Validate the effectiveness of the solutions by monitoring performance metrics and user feedback.

> :::image type="icon" source="../_images/trade-off.svg"::: **Tradeoff**: The steps of a root cause analysis, such as identifying possible causes, testing hypotheses, and documenting the analysis, can be time consuming. To correlate performance issues, you also need to collect and store data. The required time and infrastructure can add significant work to the operations teams and cost to the workload.

> :::image type="icon" source="../_images/risk.svg"::: **Risk**: If you perform a root cause analysis without proper security guardrails, there's a risk that you expose sensitive information when you provide access to logs and data.

### Engage Microsoft Support

Reach out to [Microsoft Support](https://support.microsoft.com/) to help address ongoing performance issues. Microsoft Support representatives not only have the expertise, tools, resources, and experience to resolve issues, but they may also be aware of any current global performance issues or outages that could affect your workload. Your support agreement determines the level of support provided.

It's often best to work in parallel with Microsoft Support. For example, consider a strategy in which some team members collaborate with Microsoft Support, while others continue to triage and fix performance issues.

It's important to make support contact information available to the team. Keep in mind that Microsoft Support might also need access to data to effectively engage in problem solving.

For more information, see [Get Support in Power Platform](/power-platform/admin/get-help-support).

### Learn from findings

After you fix a live-site performance issue, you need to review what happened. The goal is to learn from performance issues, not just identify problems. The best way to learn is through documentation. Document each issue and explain how to fix it. If a vendor helped, work with the vendor to enhance your documentation, train your team, and modify your workload accordingly.

The documentation should indicate how to prevent each problem from happening again. Along with the documentation, you can create refined alerts that help you respond early to performance issue indicators.

## Power Platform facilitation

Power Platform and Azure provide several tools to help you respond to live performance issues:

- [Azure Monitor](/azure/azure-monitor/overview) is a comprehensive monitoring solution that provides insights into the performance and health of your applications and infrastructure. Azure Monitor offers features such as metrics, logs, alerts, and dashboards to help you monitor and diagnose performance issues. Power Platform apps and automation can integrate with Azure Monitor using the Application Insights capability. Standard telemetry along with custom trace events can be [logged and analyzed](/power-apps/maker/canvas-apps/application-insights).

- [Application Insights](/azure/azure-monitor/app/app-insights-overview) is an application performance management (APM) service that helps developers and DevOps professionals monitor live applications. It automatically detects performance anomalies, collects application-level logs and events, and provides analytics tools to diagnose issues. Power Platform integrates with [Application Insights](/power-platform/admin/overview-integration-application-insights?source=recommendations). 

- [Log Analytics](/azure/azure-monitor/logs/log-analytics-overview) is a service that collects and analyzes log data from various sources, including applications, virtual machines, and Azure resources. When you use Log Analytics, you can query and analyze log data to gain insights into the performance and behavior of your applications. Consider using Log Analytics if your workload uses Azure resources.

- [Solution Checker](/power-apps/maker/data-platform/use-powerapps-checker) performs rich static analysis on your solutions against a set of best-practice rules and identifies problematic patterns. Address any performance related issues before deploying the solution to production to avoid live-site performance issues. 

## Performance Efficiency checklist

Refer to the complete set of recommendations.

> [!div class="nextstepaction"]
> [Performance Efficiency checklist](checklist.md)

