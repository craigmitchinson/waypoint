# Power Platform Well-Architected Framework — Experience Optimization Pillar

Verbatim Markdown pulled directly from Microsoft's published documentation source (`MicrosoftDocs/power-platform`, `well-architected/experience-optimization/`), snapshot dated 20 September 2026. This is Microsoft's dedicated, checklist-driven pillar (codes XO:01-XO:0N) for UX quality across Power Platform workloads: design principles, a formal design-review checklist, tradeoffs against the other four pillars, then recommendation pages for user-centered design, design standards, information architecture, usability, feedback/guidance, layout, visual design, interaction design, UI content/microcopy, and conversation design.

Pages in this file: 13

## Contents

1. [Experience Optimization design principles for well-architected Power Platform workloads](#experience-optimization-design-principles-for-well-architected-power-platform-workloads)
2. [Design review checklist for Experience Optimization for Power Platform workloads](#design-review-checklist-for-experience-optimization-for-power-platform-workloads)
3. [Experience Optimization tradeoffs for Power Platform workloads](#experience-optimization-tradeoffs-for-power-platform-workloads)
4. [Recommendations for a user-centered design strategy](#recommendations-for-a-user-centered-design-strategy)
5. [Recommendations for following design standards](#recommendations-for-following-design-standards)
6. [Recommendations for implementing an information architecture](#recommendations-for-implementing-an-information-architecture)
7. [Recommendations for prioritizing ease of use](#recommendations-for-prioritizing-ease-of-use)
8. [Recommendations for feedback and guidance](#recommendations-for-feedback-and-guidance)
9. [Recommendations for optimizing layout](#recommendations-for-optimizing-layout)
10. [Recommendations for optimizing user perception and aesthetics](#recommendations-for-optimizing-user-perception-and-aesthetics)
11. [Recommendations for optimizing interactions](#recommendations-for-optimizing-interactions)
12. [Recommendations for writing user interface content](#recommendations-for-writing-user-interface-content)
13. [Recommendations for designing conversational user experiences](#recommendations-for-designing-conversational-user-experiences)

---

## Experience Optimization design principles for well-architected Power Platform workloads

Source: [principles.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/principles)

*Understand the design principles of the Power Platform Well-Architected Experience Optimization pillar.*

# Experience Optimization design principles

The following design principles are intended to provide guidance for aspects of Experience Optimization that you should consider throughout the development life cycle. Start with the recommended approaches and justify the benefits for a set of requirements. After you set your strategy, drive actions by using the [Experience Optimization checklist](./checklist.md).

## Design for the user

| ![Goal icon](../_images/goal.svg) Put the user at the center of your workload experience design. |
|--|

Strive to understand the needs, experiences, expected outcomes, and desires of the users of your workload, and tailor the design of the workload to the users' specific requirements.

| Approach | Benefit |
|--|--|
| Learn about what users want, need, and struggle with through user research and empathy-building methods. Imagine yourself as a user to understand their experiences and views, guiding design choices that meet their needs well. | Insights inform design decisions and ensure that the workload addresses users' real-world challenges effectively.<br><br>Workload experiences are tailored to users' workflows, mental models, and preferences, resulting in more relevant and user-centric designs.<br><br>The workload resonates with users on an emotional level, leading to higher levels of user satisfaction and engagement.<br><br>You find creative and innovative solutions that address users' needs and overcome usability barriers. |
| Include users in every stage of the design process, making users the main drivers of decision-making. Design solutions that match user objectives, processes, and ways of thinking, making sure that users can perform tasks quickly and easily.|Users are more likely to enjoy using the system and see its benefits if they feel that the system meets their needs well and isn't difficult to use.<br><br>When users perceive the workload as user-friendly and useful for their needs, they're more likely to adopt it and use it regularly in their daily work. This perception results in higher levels of user engagement and usage, contributing to the success of the system.<br><br>Experiences that are easy to use minimize the need for extensive training and support. When users can easily comprehend and operate the system, you can save time and resources on training programs and user support. |
 | Design experiences that are inclusive and suit users with different backgrounds, cultures, and contexts. Think about factors like language, cultural expectations, and digital skills, to ensure that interfaces are easy to use and meaningful for everyone. | Your workload can be used by people with different abilities, including people with disabilities.<br><br>You anticipate and accommodate evolving user needs and technologies with a flexible and adaptable experience. |
| Maintain consistency in design and functionality across different platforms and devices. Design interfaces that adapt seamlessly to different screen sizes, resolutions, and input methods, providing users with a consistent experience regardless of the device they use. | Users have a consistent and functional experience with your workload across their different devices and platforms. |

## Design for simplicity

|![Goal icon](../_images/goal.svg) Make the workload easy to use. Minimize complexity and ensure a user-friendly experience.|
|--|

Simplicity helps users learn the system, perform their tasks, and achieve their goals with minimal distractions.

| Approach | Benefit |
|--|--|
| Create a coherent and logical structure of information, content, and functionality in the interface. | Users quickly understand the interface and are able to locate the functionality relevant to their tasks.<br><br>Users can process information more efficiently and make informed decisions without being overwhelmed.<br><br>Streamlined interactions are more accessible and ensure that users can navigate the interface more effectively. |
| Provide an intuitive and consistent interface that follows relevant design conventions and standards. Take advantage of existing mental models and expectations of the users. | Users can easily figure out how to use the workload without spending excessive time or effort in learning new interactions or workflows. This faster learning speeds up user onboarding and adoption.<br/><br/>Users have a feeling of consistency as they experience design elements and interactions they recognize and have used before. This consistency lowers mental effort and makes it simpler for users to comprehend and navigate the interface.<br/><br/>There is uniformity across interfaces, both within and across workloads. Uniform design elements and interactions facilitate the learning and usage of the interface for users, regardless of their prior experience. |
| Focus on the most important information and actions. Eliminate any elements, features, or fields that aren't needed. | Users access and consume information effectively, resulting in better-informed interactions and improved satisfaction.<br/><br/>Users find the system easy to use and are more likely to engage with the workload, leading to higher adoption rates and better utilization. |

## Design for efficiency

|![Goal icon](../_images/goal.svg) Reduce friction and streamline the user experience. |
|--|

Design the workload to make it easy for users to accomplish tasks efficiently, with minimal frustration. Ensuring that users are able to get their work done increases their satisfaction and realizes higher return on investment (ROI).

| Approach | Benefit |
|--|--|
| Design workflows and processes to be straightforward and intuitive. Minimize the number of steps required to complete tasks. | Users accomplish more in less time.<br/><br/>The risk of errors is reduced, leading to improved accuracy and reliability.<br/><br/>Operational expenses are lowered through efficiency improvements. |
| Optimize interaction design to reduce the time and effort required for users to perform common actions, such as filling out forms or making selections. | Users complete the objectives more quickly.<br/><br/>Task completion rates go up and the need for user support goes down.<br/><br/>Users feel a greater sense of satisfaction and accomplishment. |
| Provide clear and consistent feedback. Inform users about the status, results, or errors of their actions; use progress indicators for long-running tasks; and acknowledge user input promptly. | Users understand what is happening, monitor their progress, and recover from errors.<br/><br/>Users know that the system has seen and handled their actions, making them more trustful of the interface.<br/><br/>Users feel more at ease when they get instant feedback, knowing that their input has been accepted.<br/><br/>Users move through complex processes or new interfaces with assurance.<br/><br/>Error messages provide instructions or suggestions for corrective actions, helping users troubleshoot problems efficiently. |
| Prioritize tasks and features based on user needs and frequency of use, ensuring that commonly performed actions are easily accessible and efficient to execute. | Task prioritization helps users concentrate on the most important and effective activities, minimizing interruptions and mental stress. Clear prioritization directs users to the actions that have the most impact, simplifying their workflow and improving their overall experience.<br/><br/>Putting the most important tasks first helps users see more clearly the actions they need to take. Users can choose faster and with more confidence, leading to less time spent on decisions and better usability.<br/><br/>Workload teams can use resources wisely by working on tasks or features that benefit users the most. Workload teams can increase the effect of their efforts and resources, leading to better results and ROI. |

## Next steps

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Design review checklist for Experience Optimization for Power Platform workloads

Source: [checklist.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/checklist)

*Follow this checklist of recommendations that help you achieve an Experience Optimization approach in your Power Platform workload team.*

# Design review checklist for Experience Optimization

This checklist presents a set of recommendations to help you optimize experiences for users.

## Checklist

|&nbsp;| Code | Recommendation |
|-|-|-|
| &#9744; | [XO:01](user-centered-design.md) | **Design your workload to meet the expectations and requirements of users**. Ensure that the workload is useful and provides a positive user experience. |
| &#9744; | [XO:02](design-standards.md) | **Follow established standards, conventions, and guidelines**. Use common design patterns. Maintain consistency in design elements, terminology, and interactions across the interface. Use consistent patterns and standards to guide users through the interface and create a cohesive user experience. |
| &#9744; | [XO:03](information-architecture.md) | **Implement a consistent information architecture**. Be consistent in navigation structures. Provide contextual clues and visual indicators to guide users. Use consistent and user-friendly labels for categories, navigation, and other informational elements. |
| &#9744; | [XO:04](usability.md) | **Prioritize ease of use during the design process**. Minimize user effort and maximize task efficiency. Streamline complex processes. Align design decisions with user needs. |
| &#9744; | [XO:05](feedback-guidance.md) | **Provide meaningful, useful, and simple guidance** in notifications and messages. Notify users with relevant, important, and valuable information. Give users feedback on their actions and let them know when something happens and what they need to do next. |
| &#9744; | [XO:06](layout.md) | **Optimize for different contexts and devices.** Maintain usable and visually appealing layouts across screen sizes and resolutions. Use adaptive techniques to dynamically render content in various ways. |
| &#9744; | [XO:07](visual-design.md) | **Optimize user perception and aesthetics.** Create visually appealing and engaging experiences that resonate with workload users. |
| &#9744; | [XO:08](interaction-design.md) | **Follow interaction design best practices.** Ensure seamless communication between users and the workload. Guide users through tasks effectively. Help users maintain context. |
| &#9744; | [XO:09](user-interface-content.md) | **Write task-focused content in a professional tone.** Content is the primary mode of communication and should provide clear direction. Use an approachable, professional tone and provide meaningful content that facilitates success. |
| &#9744; | [XO:10](conversation-design.md) | **Design conversations that align with users' needs and help the AI accomplish its objectives.** Make it clear what the AI can do. Create natural interactions that feel intuitive and human-like. Provide fallback mechanisms to ensure the AI gracefully recovers from problems. |

## Next steps

> [!div class="nextstepaction"]
> [Experience Optimization tradeoffs](tradeoffs.md)

---

## Experience Optimization tradeoffs for Power Platform workloads

Source: [tradeoffs.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/tradeoffs)

*Learn about the Experience Optimization tradeoffs you might encounter when optimizing for the other Power Platform Well-Architected pillars.*

# Experience Optimization tradeoffs for Power Platform workloads

During the design phase of a workload, it's important to consider how decisions based on the [Experience Optimization design principles](./principles.md) and recommendations in the [Design review checklist for Experience Optimization](./checklist.md) might influence the goals and optimization efforts of other pillars. Certain decisions may benefit some pillars, while being tradeoffs for others. This article lists example tradeoffs that a workload team might encounter when designing workload architecture and operations for Experience Optimization.

## Experience Optimization tradeoffs with Reliability

> :::image type="icon" source="../_images/trade-off.svg"::: **Increased complexity**. A workload that uses straightforward approaches and limits customization is generally more reliable.

- Continuous improvement through adding new features in the user experience can introduce new issues that affect reliability and require thorough testing.

- Customizing the user interface with code and components adds new reliability targets.

## Experience Optimization tradeoffs with Security

> :::image type="icon" source="../_images/trade-off.svg"::: **Increased workload surface area**. The Security pillar prioritizes a reduced and contained surface area to minimize attack vectors and the management of security controls.

- Improving the experience with features and integrations can introduce potential vectors for attack.

- Using code components can inadvertently increase the workload's attack surface.

## Experience Optimization tradeoffs with Operational Excellence

> :::image type="icon" source="../_images/trade-off.svg"::: **Compromised resource capacities**. A workload's operational process provides rigor, consistency, specificity, and prioritization to change management in a workload.

- Customizations in the workload's experience can complicate maintenance efforts and require increased resource utilization for testing.

- Allocating resources to perform user research and develop prototypes can impact the focus on operational activities.

## Experience Optimization tradeoffs with Performance Efficiency

:::image type="icon" source="../_images/trade-off.svg"::: **Decreased performance.** Performance Efficiency prioritizes platform features over customization to achieve efficiency and effectiveness.

- Customizations in the workload's experience can have a negative impact on performance.

## Related information

- [Reliability tradeoffs](../reliability/tradeoffs.md)
- [Operational Excellence tradeoffs](../operational-excellence/tradeoffs.md)
- [Security tradeoffs](../security/tradeoffs.md)
- [Performance Efficiency tradeoffs](../performance-efficiency/tradeoffs.md)

---

## Recommendations for a user-centered design strategy

Source: [user-centered-design.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/user-centered-design)

*Learn user-centered design strategies to ensure your workloads are useful, usable, and desirable, reducing design failures and enhancing user experience.*

# Recommendations for a user-centered design strategy

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

|[XO:01](checklist.md)| **Design your workload to meet the expectations and requirements of the users. Ensure that the workload is useful and provides a positive user experience.** |
|---|---|

This guide describes the recommendations for user-centered design to ensure that your workloads are useful, usable, and desirable for users, while meeting business requirements. User-centered design is an approach to design that focuses on understanding the needs, preferences, and context of the users who interact with the workload. Employing user-centered design can help avoid usability problems, user frustration, and dissatisfaction. It can also help reduce the costs and risks of design failures, redesigns, and maintenance.

## Key design strategies

Putting users at the center of your workload development is key to ensuring optimal user experiences. Strive to understand what users need and expect from the workload. Perform research and synthesize the research into artifacts that you can use to plan and communicate the design with users and stakeholders. Continuously improve the experiences with testing and iteration.

### Involve workload users throughout the life cycle

Workload teams should not only research and understand the needs, goals, and preferences of the users, but also involve them in the process of creating solutions that meet those needs.

To include users in the life cycle, consider these strategies:

- Conduct user research at the early stages of the workload development cycle to identify user problems, opportunities, and requirements.

- Co-create and co-design with users, by inviting them to participate in brainstorming sessions, workshops, and design sprints, and encourage them to share their ideas, feedback, and opinions.

- Prototype and test with users by creating low-fidelity or high-fidelity prototypes of the proposed solutions, and testing them with your users to validate the assumptions, hypotheses, and design decisions.

- Launch and iterate with users by releasing the minimum viable product (MVP) or the beta version of the workload to a subset of your users. Collect their feedback and usage data to measure the impact and performance of the workload, and make improvements based on the findings.

### Conduct user research and share the insights

Conducting user research for a well-architected workload is an essential step in understanding user needs, preferences, and behaviors to inform design decisions effectively. User research can be performed using methods such as interviews, surveys, observations, usability testing, and analytics. User research helps define the problem space, identify user segments and personas, and create user scenarios and journeys.

- *Clearly define the objectives of the research*: Ensure that the objectives align with the overall project goals and desired outcomes for the workload, as well as the expectations of the users and stakeholders.

- *Select the research methods*: Use a combination of qualitative and quantitative research methods&mdash;interviews, surveys, observations, usability tests, and card sorting&mdash;to gather data from users, and analyze their goals, tasks, pain points, and expectations. Choose the preferred methods based on research objectives and available resources. A well-defined research plan outlines the approach, methodology, timeline, and logistics, while also preparing necessary materials such as interview guides, survey questions, or usability test scenarios.

- *Conduct the research*: Aim to include individuals who represent the target audience with diversity in contexts, skills, and experience. During research sessions, maintain a neutral and non-leading approach to gather unbiased insights. Collect qualitative and quantitative data during these sessions, and capture user feedback, observations, and interactions with the solution.

- *Analyze findings*: Identify patterns, themes, and insights that emerge from the research analysis. Employ techniques such as thematic coding or affinity mapping to organize and interpret the data effectively. Use key insights extracted from the research findings to inform design decisions and address user needs, pain points, and preferences.

- *Communicate the findings*: Document the research findings, insights, and recommendations in a clear and actionable format. Share the research findings with stakeholders, users, and other relevant parties to foster understanding and to justify design decisions based on the user research.

### Empathize with users and their contexts

Empathizing with users and their contexts helps the workload team understand user needs, problems, expectations, and motivations, and to design experiences that are relevant, useful, usable, and desirable. Empathy with your users also helps to avoid biases and making assumptions about your users' behaviors, preferences, or values, and identifies insights and opportunities that might otherwise be overlooked or ignored.

**Create user personas** to synthesize the research data into fictional but realistic profiles of the target users. These profiles should describe your users' characteristics, goals, needs, pain points, motivations, and behaviors. Base your user personas on evidence and data, not assumptions or stereotypes, and make sure that they reflect the diversity and complexity of the user population. Include relevant quotes, stories, or scenarios to illustrate your users' contexts and experiences. Employ user personas to guide design decisions and to evaluate the workload from the user perspective.

**Create scenarios** to describe the situations or tasks that the user personas encounter or perform in relation to the workload. Scenarios should capture the users' goals, actions, emotions, and expectations, the challenges or barriers they face, and the outcomes they achieve. Ensure that scenarios are realistic and specific and reflect your users' context and environments. In general, use scenarios to explore user needs and requirements and to identify opportunities and gaps for design improvement.

**Create journey maps** to visualize the user personas' end-to-end experience with the workload, across different touchpoints, channels, and stages. Aim to illustrate the user journey from initial problem or need to final goal or satisfaction, and highlight the users' thoughts, feelings, and pain points along the way. Include your users' actions, interactions, and feedback, as well as the workload's features, functions, and performance. The goal of journey maps is to empathize with your users' experiences, and to discover their pain points and opportunities for design enhancement.

Empathizing with users and their contexts also helps build trust and rapport with users, and further ensures their involvement in, and contribution to, the design process.

### Encourage continuous improvement

Embrace a culture of continuous improvement by soliciting feedback, conducting regular evaluations, and incorporating lessons learned into future projects. Stay updated with the latest trends in UX (user experience) design from authorities invested in the latest trends and research. Look to modern Microsoft product interface implementation for inspiration and latest trends in the Fluent UI space. Continuous improvement ensures that your designs evolve alongside changing user needs and industry trends, maintaining relevance and effectiveness over time.

**Iterate and improve solutions** by testing the workload. Testing should involve observing and measuring user behaviors, reactions, feedback, and satisfaction, as well as the workload's usability, functionality, and quality. Use an iterative approach that might include different methods and tools to suit the stage and scope of the design process, such as prototypes, surveys, interviews, analytics, or usability tests. Testing should evaluate the workload's performance and value, and validate or invalidate the design assumptions and hypotheses.

**Analyze and synthesize the test results** by organizing, interpreting, and presenting the data and insights that were collected from the testing phase. Identify the patterns, trends, and themes that emerge from the data, and draw conclusions and implications for design decisions and solutions. Compare and contrast test results with initial user needs and requirements to highlight the strengths and weaknesses of the workload. With analysis and synthesis, the goal is to generate actionable recommendations and suggestions for design improvement and refinement.

**Implement and communicate the design improvements** by applying the changes and modifications that were suggested by the test results and analysis, and by documenting and sharing the design process and outcomes with the relevant stakeholders. Update and improve the workload based on the user feedback and data, to ensure that the workload meets user expectations and goals. Create and deliver design artifacts and deliverables that demonstrate the design solutions and rationale, such as wireframes, mockups, prototypes, and specifications. Implementation and communication should be used to finalize and launch the workload and to showcase the design value and impact.

## Power Platform facilitation

If your workload includes an agent, you can **analyze performance and usage in Copilot Studio**: Copilot [Analytics](/microsoft-copilot-studio/analytics-summary) provides a comprehensive overview of your agent's performance. It uses AI to identify which topics are having the greatest impact on escalation rate, abandon rate, and resolution rate. Tracking [conversation engagement](/microsoft-copilot-studio/guidance/measuring-engagement) rates and [outcomes](/microsoft-copilot-studio/guidance/measuring-outcomes) is essential for measuring agent performance metrics and discovering areas for improvement.

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Recommendations for following design standards

Source: [design-standards.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/design-standards)

*Learn the importance of adhering to design standards, conventions, and guidelines to enhance user experience and application success.*

# Recommendations for following design standards

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

|[XO:02](checklist.md)| **Follow established standards, conventions, and guidelines. Use common design patterns. Maintain consistency in design elements, terminology, and interactions across the interface. Use consistent patterns and standards to guide users through the interface and create a cohesive user experience.** |
|---|---|

This guide describes the recommendations for establishing design standards, conventions, and best practices to develop user interfaces that enhance the user experience and the application's overall success. Deviation from standards should be carefully considered to avoid negatively affecting the user's experience and application usability.

## Key design strategies

Following design standards helps reduce decision-making effort in the design process by identifying the important aspects of design. Understanding the standards itemizes and streamlines a team's ability to achieve well-designed user interfaces. This approach results in faster development cycles, improved usability, and enhanced user satisfaction, ultimately leading to increased productivity and effectiveness for internal software systems.

### Understand design principles

Extensive research into human cognition informs our understanding of visual design and interaction with digital products. This knowledge underpins many best practices and standards, accounting for approximately 80% of the final product. Design principles can bridge the remaining 20% creative gap not covered by standards. Familiarity with this knowledge enhances the development team's understanding of design considerations during planning, reducing dependency on, or improving collaboration with, design resources.

### Follow common patterns and metaphors

Universal patterns and metaphors are widely recognized and expected in digital products. Incorporating these patterns where appropriate can simplify user onboarding and long-term use, reducing training and support costs, and potentially lessening the need for updates or redesigns. These practices span various aspects of design, including layout composition, navigation structure, information hierarchy, and interaction design.

Adhering to standard icon metaphors and semantic colors is crucial. Icons should use established visual associations to convey functionality quickly and effectively to users. Similarly, semantic colors, such as red for error or green for success, provide immediate visual feedback that aligns with users' expectations and mental models. Following these conventions helps reduce cognitive load and enhances usability by fostering a sense of familiarity and comfort.

### Establish a design system

A design system is a collection of reusable functional building blocks used to build a user interface. They are designed specifically for an organization so that every element aligns with the brand's established standards. The four key components of a design system are design tokens, components, pattern libraries, and guidelines.

*Design tokens* are fundamental visual elements of a user interface, including aspects like color, typography, and spacing. They're expressed as variables in a standard format, facilitating the creation and maintenance of an application using the design system. Regardless of the specific design, design tokens streamline the translation of design into code. For instance, by defining a token named "primary-color" with a designated value, developers can integrate the design seamlessly using the token instead of embedding a specific value directly into the code. The design tokens can be aligned with an organization's style guide and centrally managed to produce easy-to-use tokens.

A *component* represents a discrete, modular unit of a user interface. It serves as a visual element to assemble app interfaces. Well-designed components exhibit two key characteristics: reusability and modularity. They should be engineered to ensure that they maintain visual consistency across multiple applications within a brand's ecosystem, reducing the need to recreate the design each time. A single component should seamlessly serve in multiple contexts.

Power Apps provides a comprehensive set of basic universal components, like buttons and dropdown lists, and composite components, like the modern table. Use these controls as much as possible for basic needs, then consider building composite components where gaps exist for repeatable user interface patterns.

Composite components should be versatile enough to be used as-is or with slight variations (through parameters) across different app contexts, without the need for modifications. Some examples of custom components include:

- A company-branded header or footer
- A screen-sized resource page component for users to provide feedback and get IT help
- Universal content like copyright notices or links

A *pattern library* offers a set of predefined design patterns for makers to use as a starting point to construct user interfaces. These patterns serve as standardized solutions to common design challenges. The primary objective of a pattern library is to offer a centralized collection of well-crafted patterns, enabling the creation of consistent and effective user interfaces. Pattern libraries empower developers to use a specific pattern and follow established guidelines for usage, ensuring coherence and efficiency across user interface designs.

*Guidelines* offer rules and best practices for project teams on how to use components and visual styles effectively. Unlike style guidelines, which focus on aesthetics, design system guidelines define the functional behavior of components and user interaction expectations. For example, if a design system provides a design token set for referencing colors, the guidelines should clarify when to use these colors and how developers can access the corresponding color in Power Apps. For components, there should be documentation on correct usage, input and output parameters, and state variations that can be expected of the component.

Centralized design system efforts can also host universal media assets such as company logos and other design assets in a repository to enable widespread rapid development.

Microsoft's Fluent UI is an example of a widely adopted open-source design system. It can be an effective reference for many design decisions made in Power Apps because all modern controls use the components in the Fluent (2) design system. Design systems such as Fluent UI are the result of a significant amount of research and development effort into creating components to ensure that they meet users' needs. They're also designed in a way that can be ubiquitous and easily used across various digital products and platforms. Each component has specific guidelines to ensure that the application aligns with the intended experience. Take advantage of the research-backed knowledge by reviewing the [Fluent 2 guidance](https://fluent2.microsoft.design/).

Sharing to avoid duplicate implementations not only boosts production efficiency but also ensures that experiences remain coherent over time. Contributions to shared elements help keep experiences fresh and reflect expertise from across the organization. Currently, coherence is a challenge because components, systems, processes, and culture are often not shared, don't promote coherence, and make contributions difficult.

#### Conduct design reviews

Access to resources meant to guide user experience design is crucial to ensure that an app meets established UI/UX standards. Centralized teams should aim to familiarize themselves with basic design standards and best practices. While designers are typically knowledgeable about user experience, project managers can also benefit from learning these skills to contribute effectively to the team.

#### Validate use of design-related app metadata

The most effective way to validate an experience is to physically walk through it. However, you can also programmatically read Power Apps app metadata. Methods to accomplish this might include checking that the correct theme is applied to the app, or verifying that theme token values are referenced in legacy controls. For example, if specific text elements must use certain design tokens, the text component's name could correspond to a particular value, and the component's properties should then match a specific design token mapping.

Evaluate the number of elements that are a specific component type and meet certain criteria versus those that don't. For example, consider text components that are either incorrectly named or correctly named but don't follow property value guidelines. For enforcing responsive layout, certain layout containers could map to specific naming conventions and property values (such as LayoutWrap).

### Meet accessibility standards to increase the user base

Incorporating inclusive design principles ensures that products cater to a diverse audience, including individuals of all abilities. Inclusive design seeks to identify potential barriers for users of all abilities to create products that address challenges before final implementation. It's essential to understand and discuss the functional aspects that could lead to interaction barriers to effectively overcome them.

| Function | Purpose |
| -------- | ------- |
| Cognition | Our ability to receive, interpret, and process information is influenced by many factors. These factors include attention, awareness, focus, memory, judgment, comprehension, problem solving, and reasoning. A person's cognition can affect the way they learn, whether learning how to use a new device or learning new information in a classroom. Many aspects of cognition affect one another. |
| Mobility | Our anatomy and muscles give us mobility, and they rely on brain signals, which control muscles. Mobility involves grasp, fine motor skills, coordination, control (voluntary vs. involuntary movement), speed, muscle tone, endurance, posture, and temporary injuries. Mobility can be influenced by situational, temporary, progressive, or permanent conditions. |
| Vision | Our ability to see and understand visual information from our environment guides thought and movement. Vision is influenced by both physical and neurological factors. Vision limitations include blindness, low vision (partially sighted), decreased acuity, visual field loss, color blindness, photophobia (light sensitivity), and even bright sunlight impacting readability of text on a screen. |
| Hearing | Our ability to receive and understand audio from our environment also guides thought and movement. Degrees of hearing loss vary across a wide spectrum, leading to barriers to everyday technology use. Temporary or situational examples include loud environments or quiet zones where sound playback isn't possible. |
| Voice, speech, and communication | Our ability to communicate (verbally or non-verbally) is essential to expressing our wants and needs, forming relationships, conveying information to others, and interacting with our environment. |
| Sensation and perception | Sensation is our ability to detect senses like touch or the positioning of our body. Perception is how the brain processes and communicates these senses. Sensation limitations include vestibular disorders, chronic pain, skin integrity, sensation (hypersensitive and hyposensitive), and proprioception. |

#### Methods of accessing content

Users access digital content in various ways. In addition to mouse and pointer input, they might also use keyboard and assistive technologies like screen and braille readers, magnifiers, captions, voice recognition, and high-contrast settings, all of which adapt the experience to meet the user's needs.

#### Assistive tools

Common assistive tools include:

- *Keyboard*: People with visual impairments interact with websites and apps using screen reader software, which reads content and controls aloud using text-to-speech technology and uses the keyboard as an alternative input to point-and-click interaction with a standard mouse. In addition to supporting the basic set of keyboard commands, screen readers also provide a complex set of keyboard commands. These commands give users a powerful additional set of tools to interact with user interfaces more efficiently.

- *Screen reader*: Screen readers convert digital text into synthesized speech and braille output. They empower users to hear content and navigate with the keyboard. This technology enables individuals with blindness or low vision to use information technology with the same level of independence and privacy as any other user. Screen readers are also used by individuals with cognitive or learning disabilities, and by users who simply prefer audio content over text. These tools extend beyond web use, aiding in the navigation of documents, spreadsheets, and operating systems.

- *Touch*: Touch targets are largely targeted at people with motor delays, who might have problems tapping the screen. More specifically, touch is designed to help people limit the amount of spurious input from unintended (or unregistered) touches.

- *Dynamic content*: Landmark roles, or ARIA labels, offer immediate benefits to screen reader users. There are eight roles, each representing a block of content that occurs commonly on web pages. To use them, add the relevant role attribute to a suitable container in your HTML, enabling screen reader users to quickly navigate to that section of the page.

#### Visual styles

To create inclusive products for users with different vision capabilities, it's essential to consider visual styles like color, contrast, and text size. This involves ensuring adequate contrast between text and its background, including text on images, icons, and buttons, to improve readability for users with low contrast sensitivity or color blindness. Well-contrasting content enhances readability in various lighting conditions, benefiting all users.

Standard text should maintain a contrast ratio of at least 4.5:1 with the background. For larger text, interactive components, and data visualizations, a minimum contrast ratio of 3:1 with the background color is required. Status indicators should use semantic colors, type, and imagery effectively to convey information, ensuring that content can be perceived by all users. Consider supporting a high-contrast color palette, which normalizes the color palette for displaying content with a contrast ratio of at least 7:1, ensuring visibility and clarity. Offering a dark mode can significantly improve readability and reduce eye strain.

#### Typography

Typography plays a crucial role in ensuring readability for users with diverse needs. Text must be large enough and adequately spaced to accommodate differing user requirements. Users should be able to adjust settings such as orientation and zoom levels, with applications seamlessly adapting their content layout accordingly. Well-set typography not only aids in readability but also facilitates page orientation and navigation, benefiting individuals with low vision, cognitive disabilities, and color blindness, and those relying on screen readers.

Headings should feature large or bold text to enable quick scanning and comprehension, particularly for visually oriented users. Properly applied heading elements ensure efficient navigation for all users. Line width and spacing significantly impact readability; for example, excessively wide lines strain the eyes while overly short lines disrupt rhythm and comprehension. Aim for a line length of 50 to 70 characters and a line height that is 120% to 145% of the font size to enhance readability.

On mobile devices, text should be resizable up to 200% without compromising content or functionality. This flexibility ensures that users can adjust text size according to their preferences or needs, enhancing overall accessibility. Furthermore, users should have the ability to zoom in on the interface, with page layouts designed to reflow content seamlessly without horizontal scrolling for zoom levels up to 400%. Ensuring that content remains accessible and readable, regardless of the device screen size, contributes to a more user-friendly experience for all users.

#### Images, graphics, and motion

Images and graphics make content more pleasant and easier to understand for many people, and in particular for those with cognitive and learning disabilities. While images can serve as cues for people with visual impairments, helping orient them within the content, extensive use on websites can create major barriers for users.

Accessible practices around media content benefit braille and screen reader users, users who browse with images turned off to save bandwidth, and search engine crawlers. They can also aid people with hearing loss or cognitive disabilities.

Use alt text to make visual content accessible. Alt attributes describe visual content, for example, text that is displayed while images are downloading. Adapt alt text to the context of the image. Be concise and informative (use from 150 to 250 characters). Remember to mark images that duplicate text content as decorative.

#### Interaction

Interaction is where accessibility matters the most. If a user can't navigate a product smoothly and complete tasks, the product isn't truly accessible. Efficient keyboard and touch interactions assist users of screen readers, braille readers, and those who navigate using a keyboard. Typical interactions include:

- *Navigation*: Assistive technology users navigate a web page by tabbing, search, and, in the case of screen readers, using lists of headings and links. Ensure efficient keyboard navigation with landmarks, headings, and shortcuts like "skip to main content".

- *Hyperlinks*: Usability and accessibility of hyperlinks can be improved by making them clear, concise, and meaningful out of context. Apply sufficient color contrast and visually differentiate from other content.

- *Tables*: Relying on visual cues alone isn't sufficient to create an accessible table. Structural markup allows assistive technology to recognize headers and data cells.

- *Forms*: Input fields, used for various web interactions, often raise accessibility concerns for individuals who use screen readers or keyboards.

- *Focus*: Focus visibility helps users who rely on the keyboard to navigate the page, by visually indicating the element they interact with next. Sometimes focus needs to be moved programmatically or limited to a specific area to optimize the experience.

- *State changes*: Specify text for any state change and announcements. Communicating error states and guiding users through error recovery, such as missing information or a system issue, is critical.

## Power Platform facilitation

Modern controls are available both for [canvas apps](/power-apps/maker/canvas-apps/controls/modern-controls/overview-modern-controls) and [model-driven apps](/power-apps/user/modern-fluent-design).

Canvas apps support [modern theming](/power-apps/maker/canvas-apps/controls/modern-controls/modern-theming), allowing you to implement a consistent brand palette across all controls in the app. Model-driven apps support [themes](/power-apps/maker/model-driven-apps/create-themes-organization-branding) to modify basic branding elements like app header colors, links, and some form icons.

Reusable, solution-aware components are available in multiple forms for various app types. [Custom canvas components](/power-apps/maker/canvas-apps/create-component) can be used in canvas apps or custom pages and are built using low code. The [Power Apps component framework](/power-apps/developer/component-framework/overview) can be used to implement code components for canvas apps, model-driven apps, and [Power Pages](/power-pages/configure/component-framework-tutorial).

Canvas apps support [accessible properties](/power-apps/maker/canvas-apps/controls/properties-accessibility) that map to specific assistive technology functions. Use [in-studio tooling](/power-apps/maker/canvas-apps/accessibility-checker) to validate accessibility compliance.

While model-driven apps are accessible without configuration, ensure that all [web resources added to the app are accessible](/power-apps/developer/model-driven-apps/create-accessible-web-resources). Embedded canvas experiences, including [custom pages](/power-apps/maker/model-driven-apps/model-app-page-overview), must be manually configured to meet accessibility standards.

Model-driven apps provide built-in [standard keyboard shortcuts for navigating forms and views](/power-apps/user/screen-reader).

Canvas apps require code components to enable keyboard shortcuts, which can be configured using Creator Kit's [keyboard shortcuts](/power-platform/guidance/creator-kit/keyboardshortcuts).

## Related information

- [Designing and building accessible canvas apps in Power Apps](/power-apps/maker/canvas-apps/accessible-apps)
- [Accessibility limitations in canvas apps](/power-apps/maker/canvas-apps/accessible-apps-limitations)
- [Power Apps Canvas App Accessibility Guidelines whitepaper](https://powerapps.microsoft.com/en-us/blog/powerapps-canvas-app-accessibility-guidelines/)
- [Use a screen reader in model-driven apps](/power-apps/user/screen-reader)
- [Web Content Accessibility Guidelines (WCAG) standard)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Microsoft Inclusive Design](https://inclusive.microsoft.design/)
- [Fluent UI accessibility guidance](https://fluent2.microsoft.design/accessibility)

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Recommendations for implementing an information architecture

Source: [information-architecture.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/information-architecture)

*Learn strategies for implementing an effective information architecture in your workload to ensure user experience optimization.*

# Recommendations for implementing an information architecture

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

|[XO:03](checklist.md)| **Implement a consistent information architecture. Make finding information and functionality easy. Provide contextual clues and visual indicators to guide users. Use consistent and user-friendly labels for categories, navigation, and other informational elements.** |
|---|---|

This guide describes the recommendations for designing an effective information architecture for your workload.

## Key design strategies

Information architecture refers to the organization and structure of a system's content and features. It affects how users perceive, understand, and navigate the system. A well-architected system should have an information architecture that prioritizes user needs and tasks over the system's internal logic or technical constraints. This approach ensures that users can easily and efficiently find and access the information and features they need.

### Be consistent with navigation structures

Consistent navigation enhances user orientation within the workload experience, facilitating smooth transitions between pages or screens. Navigation should be clear, intuitive, and predictable. Use the same navigation elements&mdash;menus, tabs, breadcrumbs, and buttons&mdash;across your workload, and place them in consistent locations. Make sure that the navigation reflects the hierarchy and relationships of your content and that users can easily perceive their current location and potential destinations.

### Use consistent and user-friendly labels

Labels are the terms used to identify and explain content and features like headings, titles, menus, buttons, and links. Clear and consistent labels help users understand and easily navigate the workload experience and perform their tasks effectively. Labels should be consistent in tone, language, and format, and use terms that users are familiar with and prefer. For example, if you use the term "account" to refer to the user's profile and settings, use it consistently throughout your workload's experience, and avoid using synonyms like "profile" or "settings."

Navigation elements should have clear and descriptive labels that communicate the purpose and destination of each element. Users should be able to understand what each element does and where it leads without having to click or tap on it. For example, a menu item labeled "Products" provides more information than one labeled "Menu 1."

### Provide contextual clues and visual indicators to guide users

Contextual clues and visual indicators are the elements that help users understand the meaning and function of your content and features. Examples include icons, labels, colors, fonts, and images. They should be consistent in style, size, and meaning, and match the user's expectations and conventions. For example, if you use an icon of a magnifying glass to represent a search function, use it consistently throughout your product, and make sure that it behaves the same way each time it's used.

### Use progressive disclosure

Progressive disclosure keeps users focused on primary tasks and goals by minimizing distractions from secondary or irrelevant information and functionality. Provide the right amount of information and functionality at the right time, using techniques such as hiding, collapsing, expanding, or revealing content and functionality as needed. Avoid overwhelming or distracting the user with too much or too little information and functionality. Allow users to control the level of detail and complexity they want to see or interact with.

A quintessential demonstration of progressive disclosure is the wizard pattern. A wizard is a step-by-step process that allows users to input or view information in a prescribed order and in which subsequent steps might depend on information entered in previous ones. Breaking down complex processes into smaller, sequential steps reduces cognitive load on the user, compared to revealing all fields and information at once. This approach delivers the same content in a more manageable and user-friendly format.

### Categorize information and functionality

Organizing information and functionality into meaningful and logical groups makes it easier for users to find and access the information and features of your workload. Group and label the content and functionality into meaningful and logical categories, based on the users' needs, tasks, and goals. Use categories that are mutually exclusive and collectively exhaustive, where each item belongs to one and only one category and all the items are covered by the categories. Be sure to use categories that are coherent and consistent and that items within each category share a common characteristic or criterion.

### Group information and functionality into hierarchies

Arrange and display the content and functionality in a hierarchical order, based on the importance, frequency, or sequence of use. Use a top-down or a bottom-up approach, depending on the users' preferences and behaviors. Use a shallow or a deep hierarchy, depending on the amount and complexity of the content and functionality. Use visual cues and indicators, such as size, color, shape, or position, to show the hierarchical relationships and levels.

## Power Platform facilitation

Model-driven app navigation allows you to [configure groupings of pages](/power-apps/maker/model-driven-apps/app-navigation) in various levels. The app designer provides you with the ability to manage the forms, views, and custom pages within the app.

Canvas apps consist of [screens](/power-apps/maker/canvas-apps/controls/control-screen), with [navigation](/power-apps/maker/canvas-apps/add-screen-context-variables) achieved using native components. For example, you can use a [gallery](/power-apps/maker/canvas-apps/controls/control-gallery) or [vertical layout container](/power-apps/maker/canvas-apps/controls/control-vertical-container) to create lists of elements as nodes, where each node contains a clickable element such as a [button](/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-button) to [navigate](/power-platform/power-fx/reference/function-navigate) between screens. Consider using [custom components](/power-apps/maker/canvas-apps/create-component) to implement reusable global navigation components that appear on every screen.

The [Nav control](/power-platform/guidance/creator-kit/nav) in Creator Kit is a good option for primary navigation. A [tab list](/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-tabs-or-tabs-list) is commonly used for secondary navigation to switch content within a screen. Use the [link modern control](/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-link) to [launch a webpage or canvas app](/power-platform/power-fx/reference/function-param). Universal navigation to resources can be placed in a global [app header](/power-apps/maker/canvas-apps/controls/modern-controls/modern-controls-header) by overlaying clickable navigation [icons](/power-apps/maker/canvas-apps/controls/control-shapes-icons) (or [Fluent icons](/power-platform/guidance/creator-kit/icon)) over the header in a [container](/power-apps/maker/canvas-apps/controls/control-container).

To implement a wizard pattern, use the [SubwayNav component](/power-platform/guidance/creator-kit/subwaynav) of Creator Kit.

## Related information

[Navigation in a canvas app](/training/modules/navigation-canvas-app/)

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Recommendations for prioritizing ease of use

Source: [usability.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/usability)

*Learn how to prioritize ease of use or usability during the design process to optimize the user experience.*

# Recommendations for prioritizing ease of use

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

|[XO:04](checklist.md)| **Prioritize ease of use during the design process. Minimize user effort and maximize task efficiency. Streamline complex processes. Align design decisions with user needs.** |
|---|---|

This guide describes the recommendations for improving usability in user interface design. Usability refers to the ease of use and effectiveness of a product for its intended users. Usability directly affects user satisfaction, errors, and overall interactions with the digital interface, ultimately affecting the overall success of an application.

## Key design strategies

Usability is a quality attribute that assesses how easy user interfaces are to use. The word "usability" also refers to methods for improving ease of use during the design process.

Usability is defined by five quality components:

| Component | Description |
| --------- | ----------- |
| Learnability | How easily can tasks be accomplished the first time and how quickly do users learn from their previous experience? |
| Efficiency | After users have learned the design, how quickly can they perform tasks? |
| Memorability | When users return to the design after a period of not using it, how easily can they reestablish proficiency? |
| Errors | How many errors do users make, how severe are these errors, and how easily can they recover from the errors? |
| Satisfaction | How pleasant is it to use the design? |

### Visibility of system status

The system should always keep users informed about what is going on, through appropriate feedback within a reasonable time.

Display important details about the current status of the system in clear and intuitive locations. For example, if items are selected from a list, the number of selected items should be displayed.

:::image type="content" source="media/usability/h1.svg" alt-text="Screenshot showing the number of items selected.":::

Use progress indicators or loading animations to reassure users that their request is being processed. These visual indicators prevent frustration from uncertainty and help manage expectations. Without them, users might perceive the system as slow or unresponsive and abandon the task.

Real-time updates keep users engaged and informed about the outcome of their actions. Use status messages or notifications to clearly communicate successful actions or errors. It's common to send notifications when asynchronous jobs complete, and users should know when they need to look out for a notification.

Incorporate color-coded indicators on different states for quick recognition and understanding of system status. Color is processed faster than text, making it easier for the user to comprehend information quickly.

### Reflect the real world

The system should speak the users' language, using words, phrases, and concepts they understand, rather than system-oriented terms. Follow real-world conventions and present information in a natural and logical order.

Use terminology and concepts that are familiar to users and avoid jargon that might alienate them. People tend to quickly grasp the purpose and functionality of a system when it speaks their language.

Structure system information in a manner that mirrors scenarios and conventions users understand. Present information in a natural and logical sequence that resonates with familiar or real-world processes to facilitate easier adoption of the technology into the user's life.

:::image type="content" source="media/usability/h2.svg" alt-text="Screenshot of a required email address form field, with an incorrectly typed email, displaying an error indicating an incorrect email address format.":::

### User control and freedom

Users might inadvertently select system functions and will need a clearly marked "emergency exit" to leave the undesired state without navigating through an extended dialogue. Support undo and redo.

:::image type="content" source="media/usability/h3.svg" alt-text="Screenshot of a neutral button that says 'Back' next to a primary button that says 'Next'.":::

When reasonable, support various input methods to accommodate users with different preferences and accessibility needs. Keyboard shortcuts, touch gestures, voice commands, or mouse clicks ensure that users can interact with the interface using their preferred method.

Granular control over data and privacy settings is crucial for respecting user autonomy and building trust. Adjusting privacy settings, deleting or exporting data, and controlling access permissions for third-party applications ensures that users can maintain control over their information. Offering clear explanations and transparent disclosures about data collection practices, security measures, and user rights enables informed decision-making and promotes transparency and accountability.

### Consistency and standards

Maintain consistency in design to ensure that users can easily recognize and understand status indicators, reducing cognitive load and improving usability. Users shouldn't have to wonder whether different words, situations, or actions mean the same thing.

If repeatable experience patterns appear different, users will struggle to interpret the meaning of the variation introduced, leading to inefficiencies in understanding and task completion. Using a matching suite of controls helps ensure that visual elements are consistent across screens and experiences.

:::image type="content" source="media/usability/h4.svg" alt-text="Screenshot showing two different UI patterns, one to open the next screen with a button control, and another to open the screen with a link control.":::

### Error prevention

Even better than good error messages is a careful design that prevents a problem from occurring in the first place. Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action. Proactively address potential issues in the interface to maintain workflow continuity.

:::image type="content" source="media/usability/h5.svg" alt-text="Screenshot of a sample form validation check before submission.":::

### Recognition rather than recall

Minimize the user's memory load by making objects, actions, and options visible. The user shouldn't have to remember information from one part of the app to another. Instructions should be visible or easily retrievable whenever appropriate.

When designing forms, consider whether to provide predefined options for users to choose from or allow free text input. This choice might be determined by the data type, but should be thought through at the UI layer as well. Opt for predefined options when speed and convenience are paramount, and choose free text input for scenarios requiring richer detail or personalized responses.

Provide guidance and resources to avoid the need to recall important information from memory. Common UI patterns include contextual help icons, inline documentation, tooltips, embedded tutorials, on-demand help menus, searchable knowledge bases, and interactive help widgets like AI-enabled resources.

:::image type="content" source="media/usability/h6.svg" alt-text="Screenshot of a comparison between a checklist with a set of options and a set of text input fields for free text response.":::

### Flexibility and efficiency of use

Accommodate users of varying levels of expertise by incorporating features such as accelerators and customization options. This approach allows the interface to adapt to the needs and preferences of both novice and expert users effectively.

Accelerators, often unnoticed by novice users, can speed up the interaction for expert users, allowing the system to cater effectively to both the inexperienced and experienced.

Customization options allow users to tailor the interface to their preferences, personalizing the overall experience. Providing options to rearrange interface elements (for example, dashboard cards) or create personalized shortcuts for frequently used features enhances user efficiency and comfort in navigating the system. Catering to diverse user skills and preferences fosters a sense of ownership and personal investment in an experience.

:::image type="content" source="media/usability/h7.svg" alt-text="Screenshot showing a filter pane with a link to saved filters followed by the main filtering experience.":::

### Aesthetic and minimalist design

Prioritize clear, focused status updates for users to more easily comprehend information at a glance. This approach reduces cognitive effort and minimizes risk of misinterpretation, frustration, or disengagement.

Dialogues shouldn't contain irrelevant or rarely needed information. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.

:::image type="content" source="media/usability/h8.svg" alt-text="Screenshot of a dialog with a succinct actionable question, with a primary button that says 'yes' and a secondary button that says 'no.'":::

### Help users recognize, diagnose, and recover from errors

Error messages should be expressed in plain language without code, precisely indicate the problem, and constructively suggest a solution.

Provide contextual help or guidance to assist users in resolving issues or understanding delays. This approach helps users determine the appropriate next steps, especially when facing obstacles or complex tasks. Instead of merely presenting a problem, offer a clear solution and incorporate built-in functionality to expedite resolution.

:::image type="content" source="media/usability/h9.svg" alt-text="Screenshot of an error message with a clear explanation of the message and suggestions to retry.":::

### Help and documentation

While the system should be intuitive enough to use without documentation, there may be instances where help and documentation are necessary. In such cases, ensure that the information is easy to find, task-oriented, concise, and provides clear step-by-step instructions.

:::image type="content" source="media/usability/h10.svg" alt-text="Screenshot of a help pane interface accessed from the top command bar.":::

## Power Platform facilitation

Copilot-powered experiences in Power Apps can help users discover valuable insights during conversations:

- [Add a Copilot control to a canvas app](/power-apps/maker/canvas-apps/add-ai-copilot)
- [Add a custom Copilot to a canvas app](/power-apps/maker/canvas-apps/add-custom-copilot)
- [Add Copilot for app users in model-driven apps](/power-apps/maker/model-driven-apps/add-ai-copilot)
- [Filter, sort, and search galleries with Copilot](/power-apps/user/smartgrid)

For canvas apps, you can indicate progress and loading states with the [progress bar](/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-progress-bar) and [spinner](/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-spinner) modern controls. Use the [badge control](/power-apps/maker/canvas-apps/controls/modern-controls/modern-controls-badge) to display status information.

Implement robust error handling in canvas apps on the client [using Power Fx expressions related to errors](/power-platform/power-fx/reference/function-iferror). Define custom server-side errors with Power Fx using [low-code plugins](/power-apps/maker/data-platform/lowcode-plug-ins-examples#input-validation-and-custom-errors), which include pre-operation validation.

In model-driven apps, where usability is built into the interface, focus on configuring aspects of the experience that enhance usability. An example of a built-in accelerator is the [personal views](/power-apps/maker/model-driven-apps/create-edit-views#personal-views) feature, which lets users save filtering and column preferences for a table in an app. Additionally, configure [custom help pages](/power-apps/maker/data-platform/create-custom-help-pages) to offer a detailed help resource within the app.

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Recommendations for feedback and guidance

Source: [feedback-guidance.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/feedback-guidance)

*Learn effective strategies for providing meaningful feedback and guidance to users, enhancing user experience and optimizing workload performance.*

# Recommendations for feedback and guidance

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

|[XO:05](checklist.md)| **Provide meaningful, useful, and simple guidance in notifications and messages. Notify users with relevant, important, and valuable information. Give users feedback on their actions. Let users know when something happens and what they need to do next.** |
|---|---|

This guide describes the recommendations for providing meaningful feedback and guidance to users of your workload. Feedback and guidance in a well-architected workload provide users with the information they need to perform actions and to effectively make decisions. Feedback and guidance that lack relevance, are hard to understand, or display at the wrong time for the user to properly react lead to a poor user experience, potentially resulting in lost productivity, higher support costs, and failed business processes.

## Key design strategies

When users perform an action, they should get prompt and understandable feedback from the system. Notifications and messages play a critical role in delivering important information to users promptly and contextually.

### Feedback notifications

**Minimize noise and distraction**. Use notifications only when necessary to minimize noise and distraction. Overload of system messages reduces efficiency and causes frustration. Notifications break workflow, lowering efficiency and hindering productivity. Interruptions can take time from which to recover and can lead to errors. Notifications can also frustrate users if they're irrelevant, overly intrusive, or delivered through an unsuitable method.

**Use a central location for notifications**. Notification centers are useful aggregators of message content. They're the best place to provide quick access to important information, allowing users to stay informed at all times.

**Help people act more quickly**. Notifications that lack immediate actionable options can be frustrating. Providing actions within notifications saves users time. Users appreciate the ability to access and act on notifications across devices.

**Provide reassurance when there's an error.** If a part of the process fails, inform users about the issue and its cause and reassure them that they haven't lost any work. Provide clear instructions on the next steps so that users are confident on how to proceed.

**Avoid presenting the same notification more than once**. Having to dismiss notifications across multiple apps, UI surfaces, and devices more than once isn't user-friendly. Categorized notifications lose their value when they aren't synchronized. As a result, notification systems are shifting from being device-centric to user-centric.

**Put critical messages first**. Match urgency with the appropriate design pattern and put critical messages first. Consider the type of notification you're sending and its impact on the experience. Choose the right pattern for communication; for example, avoid blocking the user's action for noncritical messages. Make sure that the most urgent or important messages are prioritized.

**Create succinct messages**. Ensure notifications are easy to read and minimally disruptive. Quick updates keep users informed without affecting productivity.

**Provide inline validation**. Whenever possible, use inline validation to provide users with instant feedback on errors.

**Empower people with robust settings**. Detailed notification settings allow users to set their own preferences. Allowing users to select the notifications they receive and the features they use enhances satisfaction and trust.

### In-app guidance

In-app guidance is one of the ways of helping users learn and use your workload effectively. Some examples of in-app guidance include tooltips, walkthroughs, tutorials, help menus, and contextual hints.

**Establish the purpose and scope of the in-app guidance**. Define the specific problems or gaps that the guidance aims to address. Define the desired outcomes and metrics that the guidance intends to achieve or improve.

**Design the guidance content and interaction**. Create the content and interaction of the in-app guidance based on user needs and expectations and the guidance objectives and outcomes. Use clear and concise language, appropriate tone and style, and consistent terminology and formatting. Use visual and auditory elements to enhance the content and interaction, such as icons, images, animations, sounds, and colors. Use feedback and reinforcement, such as progress indicators, completion messages, and rewards, to motivate and encourage the user.

**Choose the right guidance type and component**. Select the most suitable type and component of in-app guidance based on user needs and expectations and the guidance objectives and outcomes. Consider the advantages and disadvantages of each type and component, such as the level of user control, degree of user interruption, and amount of user attention. Use a combination of different types and components to provide a comprehensive and flexible guidance experience.

**Iterate and improve the guidance design and implementation**. As part of user testing of your workload's experiences, identify the strengths and weaknesses of the in-app guidance. Make the necessary changes and improvements to the guidance content, interaction, type, component, and integration. Repeat the testing and evaluation process until the in-app guidance meets user needs and expectations and the guidance objectives and outcomes.

## Power Platform facilitation

App message bar notifications that span the top of the screen can be triggered in canvas apps [using the Power Fx formula](/power-platform/power-fx/reference/function-showerror) and in model-driven apps using [customized command bar actions](/power-apps/maker/model-driven-apps/commanding-use-powerfx).

In-app notifications can be pushed to a centralized user notifications hub for [model-driven apps](/power-apps/user/notifications) and [the Power Apps mobile app](/power-apps/mobile/mobile-notifications), invoked by the [Dataverse Web API action](/power-apps/developer/data-platform/webapi/reference/sendappnotification), or more conveniently in [pro-code plugins](/power-apps/developer/model-driven-apps/clientapi/send-in-app-notifications?tabs=clientapi) or [low-code plugins](/power-apps/maker/data-platform/lowcode-plug-ins-examples#send-in-app-notifications-based-on-an-instant-action).

Consider using the Power Apps notification connector to [send push notifications](/power-apps/maker/canvas-apps/add-notifications) to devices with the Power Apps mobile app installed.

Implement universal help panels using a [side pane](/power-platform/guidance/creator-kit/panel) in canvas apps or as a [custom page side dialog](/power-apps/developer/model-driven-apps/clientapi/navigate-to-custom-page-examples#open-as-a-side-dialog) in model-driven apps.

Use the [info button modern control](/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-info-button) to provide inline contextual information in canvas apps.

For basic field-level input validation, Dataverse offers [server-side business rules](/power-apps/maker/data-platform/data-platform-create-business-rule). Implement [advanced server-side input validation and customized errors defined in Power Fx](/power-apps/maker/data-platform/lowcode-plug-ins-examples#input-validation-and-custom-errors) during server operations with low-code plugins.

Use connectors to send notifications to other services in the Power Platform ecosystem, such as for services like [Outlook](/power-apps/teams/add-app-notifications).

## Related information

[Recommendations for writing content for user interfaces](user-interface-content.md)

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Recommendations for optimizing layout

Source: [layout.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/layout)

*Learn how to optimize app layout for different platforms and devices to enhance the user experience across various viewing contexts.*

# Recommendations for optimizing layout

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

|[XO:06](checklist.md)| **Maintain usable and visually appealing layouts across screen sizes and resolutions. Use adaptive techniques to dynamically render content in various ways.** |
|---|---|

This guide describes the recommendations for designing screen layouts that are easy to navigate and adapt fluidly across various devices. This approach ensures that users have a consistent and optimal viewing experience regardless of the device they're using.

## Definitions

| Term | Definition |
|---|---|
| Viewport | Visible portion of a digital interface, such as a web browser or mobile app, where content is displayed. Viewport ranges are often associated with device classes (mobile, tablet, and desktop) based on screen dimensions and resolutions. |
| Breakpoints | Specific pixel values that define viewport ranges used to determine adaptive layout behavior. |

## Key design strategies

Responsive layouts provide a flexible and efficient user experience across different window sizes. They adapt by scaling content, rearranging elements, and selectively displaying text and images. Responsible layouts meet users' needs regardless of their screen size.

### Determine a consistent app frame

The application frame consists of a set of controls that are consistently available on every screen. It comprises three main subcomponents: a header, navigation, and a content region. Simple apps have the flexibility to use the header component, while more sophisticated apps often use side navigation to enable multiple pages. Subcomponents are customizable. For example, you can incorporate a global search in the header or group items in the side navigation to suit your app's requirements.

:::image type="content" source="media/layout/appframe.svg" alt-text="Diagram of an app frame with three main subcomponents numbered 1 through 3.":::

The three main subcomponents of the app frame are:

1. The *header* is a core component designed to be a part of every internal application. It consists of sub-components that give users access to system-wide functions, helps orient them to the UI, and provides consistency across experiences. It appears across the top of the app frame and should persist across all pages of the app. It can optionally host global commands, like search, settings, notifications, feedback, profile, or help. The name of the app should always be displayed, and should ideally also serve as a clickable link to the home or landing page. The header should be responsive, with commands moving into the overflow control in viewports that are 600 pixels and below. The search input width is also responsive at 1023 pixels and below.

1. *Navigation* is a system of controls that work together to help users find information and complete tasks. It helps users jump from section to section of an application. Hierarchically, it's not attached to any page or section, but exists above all other content. It's always present, and may be minimized to a collapsed state (also called a rail state) to free up additional space for page content. At smaller window sizes, it can be minimized into a flyout menu. The most common forms of navigation include top navigation and side navigation. Don't use both simultaneously.

1. The *content region* contains the focus of the screen. The size of the browser window influences the content frame and the space available in the main content region. This frame adapts based on the breakpoint and the corresponding responsive behavior of each component. Learn more in [Create a breakpoint matrix](#create-a-breakpoint-matrix).

    The content region can optionally contain several sub-regions that are available for consistent element placement, such as a page header, inline side panes, or panels that overlay the content.

Adhering to a consistent design language with color schemes, typography, and layout structure helps users quickly identify and interact with various elements without confusion. The more consistently an app frame pattern is used across all internal business applications, the stronger the user's recall or mental model becomes. Aligning with industry standards or common platform patterns further enhances this effect.

After the app frame is determined, each screen's layout resides within the content area of the app frame.

### Thoughtfully use the content region

Users crave seamless experiences where information is readily accessible, text is easy to read, and aesthetics enhance rather than hinder usability. Prioritize initial visibility of key information, ensure readability across columns, and harmonize design elements for aesthetic appeal.

Ensure that essential information is immediately visible on opening the screen without the need for scrolling. Prioritize the display of essential information such as navigation options, crucial content, and actionable items near the top of the screen. Striking a balance between displaying sufficient items and providing detailed information for each item is a constant challenge. Conversely, while it can be tempting to provide all possible information in the initial view, too much information risks overwhelming users and diluting the significance of key elements. Consider employing concise summaries or previews that offer a glimpse into more detailed content, enticing users to delve deeper. Dashboards are optimized to serve this purpose for visualizing large amounts of data.

Incorporate multiple columns, sections, or groupings to logically organize content and maximize space. Pay meticulous attention to column width, ensuring that text remains legible without excessive strain. Avoid overly narrow columns that force users to constantly scroll horizontally, disrupting the flow of interaction. Conversely, excessively wide columns can impede readability, requiring users to track lines across extended distances. Strive for a balance that accommodates comfortable reading while making efficient use of the available space.

Size and position visual elements appropriately to create a visually pleasing and balanced interface. Align captions with corresponding visuals or titles, maintain consistent spacing between elements, and adhere to a hierarchy based on user needs. Trim unnecessary embellishments and allocate pixels judiciously to elements that matter most. Prioritize and emphasize content and navigation elements, particularly on navigation-intensive apps or home pages, and avoid superfluous ornamentation that detracts from usability.

An underlying grid can be useful for arranging elements consistently. The chosen grid behavior should be consistent across every screen's content region in the app and can also be applied at the component level, such as cards or side panes. The most common type of grid layout used in web applications is the column grid. Fluid (or stretch) grid behavior is recommended for implementing responsive screens.

### Use established layouts and grouping patterns

Use commonly recognized structures and arrangements for organizing content and elements within a user interface. These layouts and patterns have been refined and proven effective over time, making them familiar and intuitive to users while also making it easy to implement adaptive patterns. Once core scenarios and elements are identified, map each to an established layout that provides the best interaction. Prioritize content and features important for task completion. Decide which elements should always be visible and accessible on the screen and which can be hidden or accessed through other menus or actions.

The following list, while not exhaustive, describes established layouts commonly used for business or productivity applications. All can be placed within the main content region.

#### Landing/Home screen

:::image type="content" source="media/layout/landing.svg" alt-text="Two sample landing screen layouts, one for a desktop app and one for a mobile app.":::

The landing or home screen serves as the entry point to an application, providing users with an overview of the app's offerings or features. It typically aims to capture the attention of visitors and encourages taking a specific action, such as completing a first-time task or exploring further content. It often contains hero images and clean navigation options.

It's ideal for welcoming users, offering quick access to key functionalities, navigation options, or calls to action, and setting the tone for the app's experience. Prioritize clarity, simplicity, and intuitive navigation to guide users effectively.

#### Dashboard

:::image type="content" source="media/layout/dashboard.svg" alt-text="Two sample dashboard layouts, one for a desktop app and one for a mobile app.":::

A dashboard is a centralized hub within an application that presents users with a comprehensive overview of relevant data or information. It often consists of customizable widgets or modules, allowing users to monitor specific metrics or perform actions.

Dashboards are suited for applications with complex datasets or multifaceted functionalities, enabling users to track progress, analyze trends, and make informed decisions at a glance. They are particularly useful in analytics platforms, project management tools, and financial management apps.

#### Form

:::image type="content" source="media/layout/form.svg" alt-text="Two sample form layouts, one for a desktop app and one for a mobile app.":::

A form is a structured layout that facilitates data input from users, typically comprised of fields for entering various types of information such as text, numbers, dates, and selections. Forms are essential for collecting user input, processing transactions, and facilitating interactions within applications.

They are commonly employed in registration flows, checkout processes, data entry tasks, and any scenario requiring user input or feedback.

#### Entity/Profile view

:::image type="content" source="media/layout/entity.svg" alt-text="Two sample entity view layouts, one for a desktop app and one for a mobile app.":::

The entity or profile view presents detailed information about a specific entity, such as a user profile, product listing, or content item. It typically includes descriptive text, multimedia elements, and relevant actions or interactions.

They're well-suited for showcasing detailed information about items within an application. They provide users with in-depth insights, facilitate decision-making, and support engagement with specific entities such as user profiles in social networking apps or product listings in e-commerce platforms.

#### List page

:::image type="content" source="media/layout/list.svg" alt-text="Two sample table layouts, one for a desktop app and one for a mobile app.":::

A list or table displays a collection of items or entities in a structured format, often presented in a linear or grid layout. It typically includes brief summaries or previews of each item, along with navigation controls for browsing or filtering.

List pages are effective for presenting large sets of content or data in a digestible format, enabling users to scan, search, and navigate efficiently. If actions on specific rows are enabled, the process should be clear. List pages are commonly used in content management systems, directory listings, search results, and news feeds.

#### Mini review (split screen)

:::image type="content" source="media/layout/mini-review.svg" alt-text="Two sample mini-review layouts, one for a desktop app and one for a mobile app.":::

A mini-review or split screen divides the interface into two distinct sections, with a list displayed on the left side and an item view on the right side. The list typically contains a collection of items, while the item view provides detailed information about the selected item in the list.

This layout is particularly effective in scenarios where users need to browse through a list of items quickly and view detailed information about each item simultaneously, such as when performing bulk operations. Product catalogs, document management systems, email or communication clients, and task management tools (for example, Azure Dev Ops query viewer) are scenarios that typically fit this pattern.

#### Wizard

:::image type="content" source="media/layout/wizard.svg" alt-text="Two sample wizard layouts, one for a desktop app and one for a mobile app.":::

A wizard guides users through a series of sequential steps or tasks, typically in a linear fashion, to complete a complex process or achieve a specific goal. It often includes progress indicators, prompts, and validation checks. Wizards are beneficial for simplifying complex processes, reducing cognitive overload, and guiding users through unfamiliar tasks or workflows. They are commonly used in onboarding flows, setup processes, multi-step forms, and task-based interactions such as configuring complex settings or transactions.

Customize and build on the standard layout to suit specific requirements. This process might include adding or removing elements, adjusting the size and positioning of elements, and applying styling to match the brand identity or visual design guidelines. Experiment with different configurations and variations of the standard layout to find the most effective arrangement for content and overall user experience.

### Design layouts for all devices

Layouts are a culmination of defined rules and intentional organization of content. Bringing your content into thoughtful structures is key, but making it all flow together with a clear hierarchy across platforms and screen sizes requires scaling logic. Individually, adaptive and responsive design can each address this challenge. In some cases, a mix of adaptive and responsive design is the right choice.

*Responsive design* uses just one layout, where the content is fluid and can adapt to changing format size. This design technique uses media queries to inspect a given device's characteristics and renders content accordingly. Responsive design enables you to build a feature once and have it function effectively across all screen sizes.

An *adaptive layout* changes entirely based on the format it's presented in. Adaptive design has multiple fixed layout sizes and triggers the browser to load a given layout based on the available space. Websites built with adaptive design use media queries to detect breakpoints, similar to responsive design. They also use additional markup based on the device's capabilities. This process is known as "progressive enhancement."

#### Reposition

Alter the position of page elements.

:::image type="content" source="media/layout/reposition.svg" alt-text="Two sample layouts, with elements stacked vertically in a smaller viewport and repositioned as horizontal elements in a larger viewport.":::

Keep your content organized, readable, and balanced by optimizing the composition as window size increases. For example, vertically stacked elements on a mobile viewport can be repositioned horizontally on larger viewports. This change follows a natural left-to-right reading order, creates balance in the design, and maintains visual focus on key elements on the page.

#### Resize

Adjust the size and margins of page elements.

:::image type="content" source="media/layout/resize.svg" alt-text="Two sample layouts, with smaller margins in a smaller viewport and larger margins in a larger viewport.":::

Resize page elements to optimize for a rich user experience by displaying more content at the top of the window, reducing the need for vertical scrolling. Adjust page margins to add white space and balance to the layout, which allows the content to breathe and enhances the visual appeal of the design. For example, a hero component might stretch to the full width of the window to show more of the background image. Content beneath the image might be expanded but use different margins to add variety in the layout and help define visual hierarchy.

#### Reflow

Optimize the flow of page elements.

:::image type="content" source="media/layout/reflow.svg" alt-text="Two sample layouts, with elements stacked in a small viewport and selectively horizontal in a larger viewport.":::

Adjust page elements to ensure that they are fully displayed, taking into account the window size and orientation, by rearranging the content. For example, a single column of content in a smaller window can be reflowed on a larger window to display two columns of text. This technique allows more content to be displayed "above the fold."

#### Show/hide

Optimize content for the window size and its orientation.

:::image type="content" source="media/layout/show-hide.svg" alt-text="Two sample layouts, with a smaller viewport focused on showing critical details and a larger viewport that includes optional information.":::

Show or hide page elements to optimize content for the window size and its orientation. This responsive technique tailors the amount of information to the viewing context. For example, categories appearing on a small screen might display limited metadata, like an image, title, and link, so that other information is made visible to help the user focus. On a larger screen, categories can display additional metadata like a persona, date, and short description, while still fitting within the viewport.

#### Rearchitect

Fork or collapse page elements and content to retain focus on important information and actions.

:::image type="content" source="media/layout/rearchitect.svg" alt-text="Two sample layouts, with some elements changed in form or location to optimize the viewport size.":::

This approach is similar to following the practice of "progressive disclosure" in your design but for different window sizes and orientations. For example, expanding the window allows a list of items to be displayed next to the details. This visual link between the content allows users to easily select another item. On a smaller screen, the focus remains on displaying key information.

### Create a breakpoint matrix

A breakpoint matrix serves as a graphical depiction of the responsive or adaptive behaviors of an application's design across different screen sizes and orientations. It typically presents a structured grid or layout detailing the design's response at various breakpoints. Each segment corresponds to a distinct screen width, offering insights into the design's structure, layout, and functionality. A breakpoint matrix encompasses considerations of screen width, viewport orientation, design elements, layout structure, content presentation, navigation, media, and interactive components, to illustrate how a website or app's design responds across different screen sizes and orientations. This approach not only helps finalize the design of each screen, but also makes implementation easier when key component property changes are explicitly tracked and well communicated.

## Power Platform facilitation

Model-driven app form layouts are configured using Power Apps Studio. The [form designer](/power-apps/maker/model-driven-apps/form-designer-overview) permits makers to add elements to a grid structure, which allows form pages to be inherently responsive. Embedded custom components like [custom pages](/power-apps/maker/model-driven-apps/model-app-page-overview), [embedded canvas components](/power-apps/maker/model-driven-apps/embedded-canvas-app-add-classic-designer), and [Power Apps Component Framework code components](/power-apps/developer/component-framework/overview) need to incorporate responsive behavior in their implementations. For example, custom pages must implement responsive behavior in the same way as a pure canvas app to function correctly.

Canvas apps require explicit configuration for each component to [implement responsive behavior](/power-apps/maker/canvas-apps/create-responsive-layout), allowing more control over the experience. Screen sizes are determined in the app definition, which can be referenced to determine position, behavior, visibility, and other relevant properties.

## Related information

[Fluent layout](https://fluent2.microsoft.design/layout)

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Recommendations for optimizing user perception and aesthetics

Source: [visual-design.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/visual-design)

*Learn how to optimize user perception and aesthetics to guides users' attention to important elements and optimize the user experience.*

# Recommendations for optimizing user perception and aesthetics

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

|[XO:07](checklist.md)| **Apply classic design principles to visual elements such as color schemes, typography, and layout. Strive for a focused, balanced, and intuitive visual hierarchy that guides users' attention to important elements and actions.** |
|---|---|

This guide describes the recommendations for universal visual design patterns that affect user perception, which can significantly influence satisfaction and adoption of an application. Visual elements serve as the foundational building blocks used to create experiences. Applying visual principles that align with how humans naturally perceive and process information provides structured methods to help select and arrange visual elements to create an effective and appealing application.

## Key design strategies

Extensive research on human perception of visual design reveals that users don't view visual elements in isolation. Instead, they perceive them in relation to other elements and the context in which they appear. These relationships influence user perception, drawing attention to specific areas, eliciting emotions, aiding understanding, enhancing aesthetics, and strengthening brand identity. Careful selection and arrangement of visual elements can create engaging, memorable, and effective user experiences that resonate with the target audience.

### Aesthetic-usability effect

The *aesthetic-usability effect* refers to the tendency to consider attractive products as more usable. Users form an initial opinion about an application within approximately 50 milliseconds. This first impression is influenced by various factors, including structure, colors, spacing, symmetry, text quantity, and fonts. A positive first impression can enhance overall user satisfaction. Research shows that users are more forgiving of minor usability issues when they find an interface visually appealing. Additionally, the design quality can serve as an indicator of credibility.

### Balance and weight

Visual balance represents a sense of equilibrium and harmony in visual perception. It helps users process and organize visual information more efficiently by reducing cognitive strain. Balanced compositions are generally perceived as more pleasing and easier to comprehend, allowing users to focus attention effectively and navigate visual stimuli with greater ease. This cognitive aspect of visual balance underscores its importance in facilitating clear communication and enhancing the overall user experience.

A composition is balanced when all the elements are in optical equilibrium. Often, the mathematical placement requires adjustment. Some of the elements that affect the visual weight are size, color, density, and white space.

- *Size*: Larger elements tend to carry more visual weight than smaller ones. To achieve balance, larger elements can be counterbalanced by grouping them with smaller elements or adjusting their placement within the layout.

- *Color*: Bright or intense colors can attract more attention and appear heavier than muted or neutral colors. Balancing colors involves distributing them evenly throughout the interface or using complementary colors to create visual harmony.

- *Density*: The density of elements refers to how tightly packed they are within a given space. Balancing density involves ensuring that elements are distributed evenly in the interface to avoid overcrowding or sparse areas.

- *White space*: Also known as negative space, white space refers to the empty areas between elements. Space helps create visual breathing room and can balance the composition by highlighting and emphasizing certain elements.

:::row:::
   :::column span="":::
      ![Example of a balanced composition.](./media/visual-design/balance-left.svg)
      **A balanced composition is a sum of visual forces between the elements.**

   :::column-end:::
   :::column span="":::
      ![Example of a balanced layout.](./media/visual-design/balance-right.svg)
      **Balancing layout is one of the hardest tasks, because it can't be easily measured.**

   :::column-end:::
:::row-end:::

### Color

Hues, tints, shades, and tones can convey meaning, evoke emotions, and create aesthetic appeal. Color plays a crucial role in guiding user attention, establishing hierarchy, conveying information, and enhancing usability. Several reasons explain why thoughtful color design in a UI can affect users the way you want:

1. *Attention and perception*. Certain colors are more eye-catching than others, allowing designers to direct viewers' focus to specific elements. Color contrast can enhance readability and distinguish between different components, facilitating rapid processing of information.

2. *Emotional response*. Colors have psychological associations that evoke emotions and moods. Warm colors like red and orange can create a sense of energy and excitement, while cool colors like blue and green can evoke calmness and tranquility. You can elicit desired responses to influence users towards the intended experience.

3. *Brand identity*. Consistent use of color across branding materials helps establish a strong visual identity and fosters brand recognition. Users often associate specific colors with particular brands and associate their experience with brand loyalty and trust.

4. *Visual hierarchy*. Color can be used to establish visual hierarchy and organize information. Assign different colors to elements based on their importance or category to create a clear hierarchy and facilitate easier navigation and comprehension.

### Proximity

Items that are placed closer together seem more related. When arranging elements, ensure that there's a noticeable difference in spacing between elements that are closely related and those that aren't.

This Gestalt principle suggests that the spatial distance between visual elements influences how they're perceived and organized mentally, and underscores its importance in facilitating efficient processing and understanding of visual stimuli.

Group related elements together that are functionally similar or belong to the same hierarchical category. For example, buttons that perform similar actions or options within a dropdown menu should be grouped closely together to indicate their association. In a navigation bar, menu items that are closely spaced suggest a related set of options, while a larger gap between menu categories visually distinguishes them. Form items that are related should be grouped together, like address fields in a section called "address."

Enhance readability in text-heavy interfaces by adjusting spacing between paragraphs, sentences, and words. Closer paragraph spacing indicates a logical connection or continuation of thought, while greater spacing denotes a transition or a break in content. This technique promotes efficient comprehension of textual information.

Ensure that there's a noticeable distinction in spacing between related and unrelated elements to prevent confusion. A spacing ramp can help consistently determine the appropriate spacing needed based on the element size.

:::row:::
   :::column span="":::
      ![A light colored circle and dark colored triangle on the left, and one lone light colored circle on the right.](./media/visual-design/proximity-left.svg)
      **The circle on the left is more related to the triangle than to the other circle.**

   :::column-end:::
   :::column span="":::
      ![Three groups of horizontal lines arranged vertically, where the top two groups are closer together than the last group.](./media/visual-design/proximity-right.svg)
      **Spacing between paragraphs is smaller than space between sections.**

   :::column-end:::
:::row-end:::

### Continuity

Elements that are arranged on a line or a curve are perceived to be more related than elements that aren't on a line or a curve.

Arrange interface elements, such as navigation menus or steps in a process, along a line or curve to imply a sequence or progression. This layout helps users perceive the relationship between elements and understand the logical flow of information or actions.

Place related elements, such as check box or radio options or items in a bulleted list, along a line to visually group them together. This arrangement suggests to users that these elements share a common purpose or belong to the same category, facilitating easier navigation and comprehension. If similar-looking items are further indented inwards, the item's position is correlated with a lower placement in the visual hierarchy.

Use lines or curves to guide users' attention and create visual paths through the interface. For example, an arrow can direct the user's eye from one section of content to another along a certain path, indicating a connection or progression. This technique helps users navigate the interface more intuitively and encourages exploration.

Arrange key interface elements, such as call to action buttons or important information, along prominent lines to draw users' attention and create focal points. For example, the Fluent MessageBar pattern is often displayed as a prominent balanced message across the content area, with the message on the left, leading to the call to action buttons on the right. This layout strategy highlights these elements and emphasizes their significance, increasing the likelihood of interaction.

:::row:::
   :::column span="":::
      ![Example demonstrating curves and lines versus color.](./media/visual-design/continuity-left.svg)
      **The curves/lines are stronger than color to our perception.**

   :::column-end:::
   :::column span="":::
      ![Visual representation of a wizard or work flow.](./media/visual-design/continuity-right.svg)
      **Wizards use continuity to show users that the steps are connected, without overwhelming them with too much information.**

   :::column-end:::
:::row-end:::

### Closure

The human brain tends to see complete forms, recognizing a single familiar pattern over individual objects, even when some information is missing.

Ensure visual consistency in design elements such as shapes, colors, and sizes to help users learn patterns they should expect, even if they're presented in different contexts.

Use simple and familiar icons or symbols that allow users to fill in missing information based on their previous experiences. For example, a magnifying glass icon is commonly associated with search functionality, even without accompanying text.

Present information gradually to users, also known as progressive disclosure. Allow users to fill in missing details as they interact with the interface, avoiding overwhelming them with too much information and encouraging exploration.

Create cohesive visual patterns that encourage users to perceive objects as whole entities. For example, grouping related elements together can help users understand their relationship and purpose. Visually arrange elements consistently using Gestalt principles to indicate segmentation. Use space effectively to create a sense of closure around interface elements.

Use animation and transitions to guide users' attention and convey changes in interface states. Smooth transitions between different states or screens can help users understand the relationship between elements and fill in missing information. Multiple modern controls available in Power Apps inherently display animations.

:::row:::
   :::column span="":::
      ![Example demonstrating perception of closure involving a square and four incomplete circles](./media/visual-design/closure-left.svg)
      **A square is recognized before four incomplete circles are.**

   :::column-end:::
   :::column span="":::
      ![Example demonstrating attempt to close a gap between two related items.](./media/visual-design/closure-right.svg)
      **Animation from a card to a modal helps close the gap between the two and relate them to one another.**

   :::column-end:::
:::row-end:::

### Focal point

A focal point is a design element that immediately draws the viewer's attention. Ideally, a design should have a sequence of focal points, typically between one and three, arranged to guide the user through the content in a deliberate manner.

Design the interface with a clear hierarchy of information, where the most important content or actions are emphasized as focal points. Use visual cues such as size, color, contrast, and positioning to make these elements stand out. Present information gradually, starting with the most important focal points. This technique helps users quickly identify the most relevant content or actions and guides them through the interface in a logical sequence.

Place primary call to action buttons prominently within the interface, making them the strongest focal points. These buttons should be visually distinct from other elements and strategically positioned to guide users towards desired actions, such as making a purchase or signing up. Fluent design language recommends using the brand theme color for these elements.

Use contrast effectively to create focal points. Elements that stand out due to differences in color, brightness, size, or typography naturally attract the user's attention. Contrasting brighter surfaces with darker text or branded elements creates a more prominent focal point.

Use white space to highlight focal points by creating visual separation from surrounding elements. This technique helps prevent distractions and allows users to focus on the most important content or actions. UI elements with more spacing around them draw more focus and tend to be perceived as higher in importance than elements with less space.

Maintain consistency in the use of focal points throughout the interface to provide a cohesive user experience. By setting a pattern of focal points, you guide users' expectations about the hierarchy they need to understand to navigate the interface and help them find important information or actions across various screens or pages.

Keep in mind that it's important to maintain balance and not overwhelm users with too many competing focal points.

:::row:::
   :::column span="":::
      ![Example using color to demonstrate focus.](./media/visual-design/focalpoint-left.svg)
      **The eye is drawn to the blue square first.**

   :::column-end:::
   :::column span="":::
      ![Example call to action using blocks.](./media/visual-design/focalpoint-right.svg)
      **Elements such as calls to action can be made focal points to ensure that users notice them.**

   :::column-end:::
:::row-end:::

### Similarity

Objects that appear similar are often perceived as a group or pattern, leading users to expect them to have the same functionality.

Ensure that interface elements with similar functions have consistent visual styles. For example, buttons that perform similar or equally weighted actions should have the same color, shape, and size, signaling to users their shared functionality. Inversely, ensure that elements that differ significantly in functionality are clearly distinguishable. Both techniques prevent confusion and frustration by establishing clear visual cues.

Use consistent iconography and symbols to represent similar actions or features throughout the interface. Users tend to associate familiar icons with specific functions based on their past experiences. To meet these expectations, use universally recognized icon metaphors. Ensure consistency in icon styling by using icons from the same set, such as the Fluent UI iconography library.

Employ color coding to signify similarities between elements or categories. For example, using the same color to highlight related items in a list, or grouping similar data points on a chart, enhances visual coherence and aids users in discerning patterns.

Maintain uniformity in typography and text styling for elements that serve analogous purposes. Consistent font styles, sizes, and formatting contribute to a cohesive visual language, facilitating users' recognition of related content or actions.

Provide consistent interactive feedback for similar actions across the interface. Whether it's hovering over a button or clicking a link, users should expect uniform responses to reinforce the association between visual similarity and functional equivalence. While the platform inherently provides most interactivity behaviors like hover and pressed state color values, keep this design principle in mind when creating component elements from scratch or manually implementing feedback states.

Ensure that visual similarities are complemented by other cues, such as text labels or audio feedback, to accommodate users with diverse needs and preferences. Effective communication of functionality through multiple sensory modalities enhances usability and inclusivity.

:::row:::
   :::column span="":::
      ![Example of similarity using shapes and color.](./media/visual-design/similarity-left.svg)
      **The elements are grouped by shape and color, not arrangement (columns and rows).**

   :::column-end:::
   :::column span="":::
      ![Example of similarity in layout.](./media/visual-design/similarity-right.svg)
      **If one card on a dashboard opens as a side panel, users expect all of them to open that way.**

   :::column-end:::
:::row-end:::

### Figure and ground

People instinctively perceive elements to be either a "figure" (what stands out in the front) or a "ground" (what recedes into the background). Therefore, context influences perception, and it's crucial to ensure sufficient delineation to distinguish important elements from the background. White space (negative space) increases comprehension of content.

Use contrast in color, size, or visual style to establish a clear relationship between figure and ground. Important elements should stand out prominently against the background, making them easily distinguishable and guiding users' attention effectively. Surfaces with lighter colors and more contrasting visual elements against the background have more prominence. This approach reduces visual clutter and helps users identify key information. Provide sufficient contrast between foreground and background elements to improve readability for users with visual impairments, improving their ability to access and comprehend content.

Maintaining consistency in the placement and styling of interface elements reinforces the figure-ground relationship and aids users in understanding the interface structure. Consistent use of design patterns and visual cues ensures that users can quickly discern between foreground and background elements across different screens and contexts. Inconsistencies in design can disrupt users' mental models and hinder their ability to navigate the interface efficiently.

:::row:::
   :::column span="":::
      ![Two rows of uniformly stacked white containers with dark elements, divided by low contrast borders.](./media/visual-design/figureground-left.svg)
      **Low contrast and minimal negative space contribute to perceiving the white rectangles as part of the background.**

   :::column-end:::
   :::column span="":::
      ![Example screen layout with illustrations in a colored background, and a prominent white box of content on the left.](./media/visual-design/figureground-right.svg)
      **A side image needs to recede into the background so that users can focus on important content.**

   :::column-end:::
:::row-end:::

### Grouping

Elements tend to be perceived as groups if they share an area with a clearly defined boundary.

Grouping related elements within visual containers, such as boxes, cards, or borders, helps users perceive them as cohesive units. This approach visually organizes content and functionality, making it easier to identify and process information. Clear groupings help avoid a cluttered interface and reduce confusion or inefficiency. Grouping is also effective when proximity isn't an option; for example, a message bar that spans several controls across a screen is perceived as a related unit due to its borders and background color.

Maintaining a consistent visual style for grouped elements strengthens their connection and improves usability. Using similar colors, fonts, or icons for these elements emphasizes that they belong to the same category or function. Inconsistencies in visual presentation can weaken the perceived grouping and cause users to overlook relationships between elements or misinterpret their meaning or purpose.

:::row:::
   :::column span="":::
      ![Example of using borders to create separation.](./media/visual-design/grouping-left.svg)
      **Adding borders around an element or a group of elements creates separation from surrounding elements.**

   :::column-end:::
   :::column span="":::
      ![Example illustrating benefit of sectioning content.](./media/visual-design/grouping-right.svg)
      **Sectioning content helps users understand that the subject matter is switching.**

   :::column-end:::
:::row-end:::

### Signals vs. noise

Visual cues such as lines, contrast, and spacing are used to signify to users that something is important. However, too many signals, or signals highlighting information that's not important, quickly become noise.

Employ focal point principles like bold text, contrasting colors, or icons to signal important information or actions to users. For example, use a bright color for important buttons or headings to make them stand out.

Be selective about what you highlight to avoid overwhelming users with too much information. Only signal elements that are truly important for the user's task or goal. Too many signals can create confusion and make it difficult for users to prioritize. Identify the information that's most important to the user and emphasize it appropriately. Typically, it's recommended to have only one call to action button per page. In forms, highlight required fields to guide the user's attention. This prevents users from getting lost in unnecessary details and helps them focus on what's essential.

Ensure that signals follow a consistent visual language throughout the interface to serve as a guideline that helps users recognize patterns and understand the meaning of different signals intuitively.

Tailor signals to the specific context and user's needs. For example, if users are scanning an interface that presents certain tasks, signal critical status and actionable items clearly to attract their attention. Contextual signals help users quickly find relevant information without being distracted by unrelated details.

:::row:::
   :::column span="":::
      ![Example illustrating use of signals to guide users.](./media/visual-design/signal-noise-left.svg)
      **Signals help guide users through content and convey what's important.**

   :::column-end:::
   :::column span="":::
      ![Example illustrating visual noise with blocks.](./media/visual-design/signal-noise-right.svg)
      **Visual noise introduces confusion and has the opposite effect of signals.**

   :::column-end:::
:::row-end:::

## Power Platform facilitation

In canvas apps, use [layout containers](/power-apps/maker/canvas-apps/controls/control-horizontal-container) to group related elements. Ideally you should organize all page elements in containers, and layout containers can also efficiently separate child containers by adjusting the gap property.

In model-driven app forms, [sections](/power-apps/maker/model-driven-apps/add-move-or-delete-sections-on-form) can be used to group related fields or elements.

Implement consistency in common visual elements with reusable [custom components](/power-apps/maker/canvas-apps/create-component).

In canvas apps, [modern controls](/power-apps/maker/canvas-apps/controls/modern-controls/overview-modern-controls) feature integrated signaling within their design. Specifically, the [button](/power-apps/maker/canvas-apps/controls/modern-controls/modern-control-button) and [badge](/power-apps/maker/canvas-apps/controls/modern-controls/modern-controls-badge) controls offer options in their style properties, making them effective signals. Adhere to best practices for each component and apply signaling selectively to ensure optimal communication.

## Related information

- [Principles of grouping](https://en.wikipedia.org/wiki/Principles_of_grouping)
- [Gestalt psychology](https://en.wikipedia.org/wiki/Gestalt_psychology)
- [Aesthetic usability effect](https://en.wikipedia.org/wiki/Aesthetic%E2%80%93usability_effect)
- [Fluent UI Design System spacing ramp](https://fluent2.microsoft.design/layout#:~:text=Fluent's%20global%20spacing%20ramp%20is,a%20scale%20of%20supported%20sizes.)

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Recommendations for optimizing interactions

Source: [interaction-design.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/interaction-design)

*Learn key principles of interaction design to enhance user experiences and optimize application usability.*

# Recommendations for optimizing interactions

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

|[XO:08](checklist.md)| **Prioritize responsiveness and feedback. Make it easy to understand how to interact with the interface, incorporating interactions that align with users' mental models and expectations.** |
|---|---|

This guide describes the recommendations for interactions in user interface design. Interaction design is crucial for understanding how users process information from the system and how visual elements are initially organized and respond to user inputs. It aids in planning task flows and accommodating various scenarios and contingencies, helping users achieve their goals.

## Definitions

| Term | Definition |
|--|--|
| Cognitive load | The total amount of mental effort required to perform a task or process information. It encompasses both the intrinsic cognitive load, inherent to the task's complexity, and extraneous cognitive load, caused by unnecessary elements or poor instructional design. Managing cognitive load is essential for learning, problem-solving, and decision-making. Excessive cognitive load can overwhelm individuals and reduce performance. |
| Decision fatigue | The deteriorating quality of decisions made by an individual after a long session of decision-making. As people make choices throughout the day, mental resources become depleted, leading to poorer decision-making abilities, impulsivity, and avoidance of decision-making altogether. This phenomenon can affect multiple aspects of life, from personal choices to professional decision-making. 

## Key design strategies

For a successful workload, visual design and user interactions must work in harmony to create the user experience. Here are some best practices that primarily focus on user behavior.

### Affordance

An "affordance" is a perceived signal or clue that an object may be used to perform a particular action. For example, "handle affords gripping"; that is, a handle suggests that it can be gripped. Using affordances helps users build correct mental models of the outcomes of their actions.

The modern controls available in Power Apps use the latest Fluent UI components, which integrate visual elements like shadows, gradients, and animations to signal their interactivity. For example, raised buttons suggest they can be clicked, while highlighted text fields indicate readiness for input. These controls follow established design patterns and conventions, providing a familiar and intuitive experience for users who are accustomed to modern software interfaces.

:::image type="content" source="media/interaction-design/affordance.svg" alt-text="Two sample buttons illustrating affordance, with a depressed button under a raised button.":::

### Mental model

Users' perceptions of a UI significantly influence their interaction with it. Discrepancies often arise when users expect different outcomes from the UI, leading to mismatched mental models. It's crucial that the user's mental model aligns with the designer's mental model embedded in the system. Be cautious when using unfamiliar design patterns, because they might confuse users.

The Fluent UI-based modern controls are tested by a professional design team, which ensures the user's mental model is the same as the intention for the pattern. For composite visual elements or task flows, be sure to clearly communicate an accurate representation of the mental model.

A common way to illustrate the mental model is by showing the status or states of table data that are important for the user to understand. For instance, if a record is inactive or closed, the entire form should be set to read-only to align with the expected behavior.

:::image type="content" source="media/interaction-design/mental-model.svg" alt-text="Graphic depiction of a user's mental model in conjunction with an app system.":::

### Cognitive biases

Cognitive biases are the shortcuts and rules of thumb by which we make judgments and predictions. There are more than 150 cognitive biases. They can be divided into four groups:

1. *Information overload*: Research suggests that the human brain has a limited capacity for processing information consciously at any given moment. In today's information-saturated world, users tend to filter out most of it. The brain employs strategies to identify and retain the most potentially useful pieces of information.

1. *Ambiguity effect*: The world is complex, and users only perceive a small fraction of it. However, they need to understand it to navigate effectively. Users link information, fill in missing pieces with their existing knowledge, and continuously update their perceptions.

1. *Urgency effect*: Users are constrained by time and information. Every new piece of information requires users to evaluate its potential impact, apply it to their decision-making process, anticipate future outcomes, and take action based on these insights.

1. *Memory and recall*: Users constantly weigh what information to retain and what to discard. When faced with a multitude of intricate details, they typically select a few notable items to remember and disregard the rest.

Learning about cognitive biases enhances awareness of potential pitfalls in a user experience and fosters empathy toward users by understanding their cognitive limitations and tendencies. This awareness enables designers to recognize when biases might influence their own decisions or users' interactions in the interface, leading to more thoughtful and user-centered design solutions. Incorporating this knowledge leads to more intuitive and satisfying user experiences.

Understand your users' needs, goals, and behaviors. Employ user research methods such as surveys and interviews to help uncover cognitive biases that might affect how users perceive and interact with the interface. Continuously iterate on the design based on user feedback and usability testing results to identify and address cognitive biases or usability issues that might arise.

Using standard design patterns and conventions that align with common or universal mental models helps users navigate the interface more intuitively and reduces the likelihood of cognitive biases influencing interactions.

:::image type="content" source="media/interaction-design/bias.svg" alt-text="Illustration of the Müller-Lyer illusion, which shows two lines of the same length that appear to be of different lengths because of variation in fin direction.":::

**The Müller-Lyer illusion demonstrates that despite the lines being objectively the same length, our brains interpret the lengths differently due to the surrounding visual context (the fins), leading to the perceptual error, or illusion, that one line is longer than the other.**

### Fitts's law

Fitts's law predicts that the time required to acquire a target is a function of the distance to and size of the target. Large elements that are positioned close to users are easily selectable. For example, if a button is too small or far from the content it relates to, it will take longer for the user to select it.

Large, well-placed buttons allow users to navigate the interface with minimal effort, preventing frustration and ensuring a smooth user experience. Interactive elements such as buttons or links should be large enough and positioned close to users' natural cursor movement or natural range; for example, placing primary action buttons on mobile devices in prominent locations within reach of users' thumbs. Making such elements easier to click or tap reduces the time it takes for users to interact with them.

If interactive elements are too small or spaced too far apart, users might accidentally select the wrong element or miss the target altogether. Designing with Fitts's law in mind helps avoid these issues by ensuring that interactive elements are clearly identifiable and easy to access.

Consider the needs of users with limited dexterity or mobility impairments. Larger interactive elements that are easier to target and have correct tab order helps ensure that all users can interact with the interface comfortably.

:::image type="content" source="media/interaction-design/fitt.svg" alt-text="Diagram of a target, a circle with a central point, illustrating Fitts's Law, or how size and distance influence user interaction speed and accuracy.":::

### Hick's law

Hick's law states that as the number of stimuli increases, the time needed to make a decision also increases, underlining the importance of simplicity in decision-making processes.

Instead of presenting users with a multitude of options all at once, break complex tasks into smaller, more manageable steps using progressive disclosure. Help users focus on making a single choice, reduce decision-making time and avoid overwhelming the user. For example, use a step-by-step wizard for complex processes like account setup or product customization.

Guide users toward recommended options to streamline decision-making. Highlight preferred choices for quick decisions and avoid overwhelming with alternatives. This prevents decision paralysis and helps users move through the interface efficiently.

Too many choices overwhelms users and leads to decision fatigue. Keep the interface clean and uncluttered by prioritizing essential information while hiding or minimizing less critical details. Aim to avoid confusion and allow users to concentrate on the task at hand.

Design interactions that lead to simple answers. Use "yes/no" questions or provide clear options. Reduce cognitive load on users and make decision-making efficient. Avoid complex or ambiguous questions to prevent user error or confusion.

:::image type="content" source="media/interaction-design/hick.svg" alt-text="Graphic with eight paired shapes (two each of circles, squares, stars, and triangles), each pair colored differently, as a demonstration of Hick's Law on decision-making.":::

### Serial-position effect

The serial-position effect is the tendency to recall the first, last, and most different items in a series more easily. Use the following tips to enhance memorability:

- Position key actions, important information, or critical content at the beginning and end of lists, menus, or experiences. This placement ensures that users are more likely to remember and engage with these elements. For example, place primary navigation options at the beginning and end of a menu bar for easy access.

- Make important elements visually distinct from surrounding content to enhance memorability. Use contrasting colors, bold typography, or unique icons to draw attention to critical actions or information. This approach helps users differentiate important elements from the rest of the interface, improving recall and usability.

- Organize content and actions based on their importance and relevance to users' tasks or goals. Ensure that the most critical information is presented first and last, with less-important details in between. This technique helps users focus on essential content while minimizing cognitive load and preventing information overload.

:::image type="content" source="media/interaction-design/serial-position.svg" alt-text="Diagram of seven objects in a line (four gray circles, one blue square, and two gray circles), with arrows above the first and last circles and the blue square, illustrating selective attention and primacy/recency effects in cognitive psychology.":::

### Pareto principle

The Pareto principle (also known as the 80/20 rule, the law of the vital few, and the principle of factor sparsity) states that for many outcomes, roughly 80% of consequences come from 20% of causes, or more broadly, a minority of inputs often yields a majority of results.

Identify the most critical aspects of the UI that significantly affect user satisfaction and usability. Think of the most common user tasks or frequently accessed features. Prioritize developing these key elements so that project teams can allocate resources more effectively and ensure that the most vital areas of the UI receive the most attention.

Conduct user testing with a small group of participants to uncover the majority of usability issues. Research suggests that testing with just a few users can reveal a significant portion of the problems. Use this strategy to find and address issues early in the design process.

Be cautious of universal vs inclusive design. Consider the balance between universal design principles, which aim to create interfaces that are usable by as many people as possible, and inclusive design, which focuses on addressing the specific needs of diverse user groups. While it's essential to design for the majority of users, it's also crucial to consider the needs of marginalized or underrepresented groups to ensure that the UI is accessible and inclusive for everyone.

### Jakob's law

Jakob's law states that users spend most of their time on other sites. In other words, users prefer interfaces that mirror experiences from other familiar interfaces. Provide familiar design patterns to simplify the learning process.

Incorporate commonly used design elements and interaction patterns that users encounter on other websites. For example, place the navigation menu at the top of the page, or use a shopping cart icon for e-commerce sites. This familiarity makes it easier for users to navigate and interact with your UI. Users expect clickable elements to look like buttons or links. By meeting these expectations, you streamline the learning process, reduce cognitive load, and ensure that users don't become overwhelmed or frustrated by unfamiliar interfaces. This kind of experience increases the likelihood of users staying engaged and achieving their goals.

### Miller's law

Miller's law states that the average person can hold about seven (plus or minus two) items in their working memory at once. This insight highlights the cognitive limitations of human information processing and has had significant implications across many fields, including user interface design. Miller's research continues to inform our understanding of memory capacity and influences strategies for optimizing cognitive performance and designing effective learning environments and interfaces.

Chunking is an effective method of presenting groups of content in a manageable way. Organize content into meaningful chunks or groups containing five to nine items. Employing visual cues (such as spacing, borders, or color) clearly delineates different chunks of content, helping users perceive the structure of the information and navigate effectively.

Within each chunk, place the most important information or actions at the forefront, making them easily accessible to users. Present users with a manageable number of options to prevent decision fatigue and reduce cognitive strain. Use headings, bullet points, or icons to help users quickly scan and navigate to relevant sections of the interface, including content within chunks.

### Peak-end rule

The peak-end rule states that people judge an experience largely based on how they felt at its peak and at its end, rather than based on the total sum or average of every moment of the experience. Enhance peak moments by identifying where in the user journey the product is most helpful, valuable, or entertaining. Focus on enhancing these peak moments by providing additional value, delight, or functionality to leave a lasting positive impression on the user. Also consider optimizing the end of the journey by paying special attention to how the user completes the workflow. Ensure that the final interactions or messages are clear, satisfying, and align with users' expectations, leaving them with a positive last impression.

Some ways to enhance positive experiences include:

- *Personalization*: Tailor the user experience to individual preferences and behaviors. Offer personalized recommendations, content suggestions, or customization options based on user data and preferences.

- *Microinteractions*: Incorporate small, delightful animations or interactions throughout the interface to make interactions more engaging and enjoyable. For example, subtle animations when hovering over buttons or playful loading screens can add a touch of personality to the user experience.

- *Surprise and delight*: Introduce unexpected elements or Easter eggs that surprise and delight users. For example, hidden features, humorous messages, or interactive elements encourage exploration and discovery.

- *Efficiency improvements*: Streamline tasks and interactions to make them faster and more efficient for users. Introduce features such as keyboard shortcuts, autocomplete suggestions, or one-click actions to simplify common tasks and save users time.

- *Visual design*: Invest in high-quality visual design to create a visually appealing and cohesive interface. Use aesthetically pleasing typography, color schemes, and imagery to evoke positive emotions and enhance the overall user experience.

- *Feedback and acknowledgment*: Provide immediate and meaningful feedback to users' actions to reassure them that their interactions are registered and understood. Use visual cues, animations, or notifications to acknowledge user input and actions in real time.

- *Gamification*: Introduce game-like elements such as challenges, rewards, or progress tracking to make the user experience more engaging and enjoyable. Encourage users to achieve specific goals or milestones within the interface to create a sense of accomplishment and motivation.

Recognize that users recall negative experiences more vividly than positive ones. Take proactive measures to identify and address pain points or usability issues throughout the user journey to prevent negative experiences from overshadowing positive ones. The guidance in this pillar is intended to help improve negative experiences. Following usability heuristics, meeting accessibility compliance, employing clear error handling, using consistency in design, and optimizing for performance all help address negative experiences.

Continuously gather feedback from users to identify peak moments, pain points, and areas for improvement. Use this feedback to iteratively enhance the user experience, focusing on optimizing peak moments and addressing any negative experiences.

:::image type="content" source="media/interaction-design/peak-end-rule.svg" alt-text="Diagram of a continuous irregular wavy line drawn from left to right, with one arrow pointing at the highest peak and another at the lowest trough, depicting the peak-end rule.":::

### Postel's law

Postel's law, or the robustness principle, is paraphrased as "Be liberal in what you accept, and conservative in what you send." In other words, be empathetic, flexible, and tolerant of the various actions a user might take; for example, when accepting variable input from users, translating input to meet requirements, defining boundaries for input, and providing clear feedback to the user. At the same time, be specific in what you ask the user to do.

Design the interface to accept a wide range of user inputs, accommodating different preferences, behaviors, and devices. This flexibility prevents users from feeling restricted or frustrated by rigid input requirements. If necessary, translate user input to meet the system's requirements or standards. For example, convert different date formats or units of measurement to ensure consistency and accuracy in processing user input.

Clearly define boundaries for acceptable input, providing guidance and constraints to prevent errors or unintended actions. This approach helps users understand the scope of their interactions and reduces the likelihood of making mistakes.

Offer immediate and informative feedback to users in response to their actions, such as validation messages, error alerts, or confirmation dialogs. Such feedback guides users and prevents confusion or uncertainty.

Clearly communicate expectations and instructions to users, specifying what actions are required and how they should be performed. Avoid ambiguity or vague language that might lead to misunderstandings or errors.

## Related information

- [Affordance](https://en.wikipedia.org/wiki/Affordance)
- [Mental model](https://en.wikipedia.org/wiki/Mental_model)
- [Cognitive bias](https://en.wikipedia.org/wiki/Cognitive_bias)
- [Müller Lyer illustration](https://en.wikipedia.org/wiki/M%C3%BCller-Lyer_illusion)
- [Hick's law](https://en.wikipedia.org/wiki/Hick%27s_law)
- [Fitts's law](https://en.wikipedia.org/wiki/Fitts%27s_law)
- [Serial position effect](https://en.wikipedia.org/wiki/Serial-position_effect)
- [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle)
- [Jakob's law](https://lawsofux.com/jakobs-law/)
- ["The Magical Number Seven, Plus or Minus Two" by George A. Miller](https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two)
- [Peak-end rule](https://en.wikipedia.org/wiki/Peak%E2%80%93end_rule)
- [Robustness principle (Postel's law)](https://en.wikipedia.org/wiki/Robustness_principle)

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Recommendations for writing user interface content

Source: [user-interface-content.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/user-interface-content)

*Learn how to write clear, approachable, and consistent content for user interfaces to optimize the user experience.*

# Recommendations for writing user interface content

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

|[XO:09](checklist.md)| **Content must be easily understood and provide clear direction. Use an approachable, consistent, and professional tone that facilitates task completion.** |
|---|---|

This guide describes the recommendations for crafting effective content tailored for user experiences. Content serves as the primary mode of communication in a user interface, holding more power in communicating complex ideas than visual elements alone. The words we use in an application influence how users navigate and perceive it, whether we're guiding them through a process or sharing important system information.

## Key design strategies

Writing content that's part of the user interface design is both an art and a science. Combining these copywriting best practices with visual design best practices will improve the user experience.

### Make the content scannable

When using a business application, people aren't interested in the features of the UI or being entertained by flowery language. They're focused on task completion. Help them by writing in short, scannable blocks. Divide text into shorter sentences and paragraphs. Avoid overly effusive language. Users often visit a UI with specific objectives in mind, and content should guide them seamlessly toward achieving those objectives.

Be concise. Content should be brief and to the point. Concise doesn't mean limited&mdash;it means efficient. Use as few words as possible while maintaining meaning. Ensure that every word in your content serves a purpose. Provide only the necessary information at the right time. Remember, too much content is less likely to be read. Follow Mark Twain's advice: "Writing is easy. All you have to do is cross out the wrong words."

Start with the most important piece of information: the value proposition. If space allows, add a brief paragraph or two with details in order of importance. If you need to say more, use a "Read more" link. Sometimes, it's easier to write the body of the message first and then write the headline.

Use specific verbs whenever possible. Specific verbs are more meaningful to people than generic ones. Help your user quickly understand available options or necessary actions by using specific words like "get," "update," "choose," or "change." You can avoid confusion and reduce ambiguity by eliminating words that have multiple meanings.

### Keep it contextual and task-focused

Tell people what they need to know. The content should provide users with the essential information required to accomplish their tasks or to make informed decisions within the UI. Users rely on content to guide their interactions and expect clear, relevant information that meets their needs. Content should never cause confusion or frustration.

Bite-sized chunks create a natural flow. Focus on the user, the action taken, or what they can expect next. To avoid frustration and cognitive load, don't include information that's irrelevant or that distracts from the immediate task.

Put the benefit before the action or feature. This approach increases the user's ability to quickly complete tasks by explaining the benefit first. What positive outcome will result when they complete the action? Explain the benefit before telling them to take an action, and avoid asking for an action before explaining why.

For task-level content, don't focus on boasting your company brand in obstructive ways. For example, discard "The Microsoft Connector shuttle service will conveniently arrive at your campus location at 2:15 PM" in favor of "The shuttle will arrive at 2:15 PM."

### Speak in plain language

Use simple, clear language that's easily understood by the target audience, devoid of unnecessary jargon or technical terms. Users should be able to comprehend content effortlessly, reducing the likelihood of confusion or misinterpretation, ultimately improving engagement. Keeps reading levels no higher than tenth grade. Maintaining an appropriate reading level enhances accessibility and inclusivity, catering to a broader range of users.

Include sentences of 25 words or less. Sentences should be brief and succinct. Short sentences with sufficient information facilitate comprehension, making the content easier to read and understand.

Avoid jargon and acronyms. Even most software engineers prefer simple, non-technical language. It's especially important to avoid jargon in error messages. It's also important to remember that many common phrases are colloquialisms and might not be meaningful to everyone.

Replace overly technical words with simpler ones. Words like "configure," "activate," or "invalid" are unnecessarily technical. Keep it simple. Only use acronyms that your users are familiar with. Spell out acronyms on the first mention on each page and include the parenthetic reference; for example, "call to action (CTA)."

Avoid double negatives. Double negatives increase cognitive load. They make people spend extra time decoding the message. Focus on direct, positive actions.

### Use a polite and friendly tone

Be polite, but not overly ingratiating. People expect to be given prompts and to act. Using "please" throughout the UI is unnecessary. Use terms like "please" and "sorry' sparingly, reserving them for tasks that are burdensome, result from an error on your part, or have serious consequences. However, it's never good practice to be rude, presumptuous, arrogant, or cynical in UI content.

Write as if speaking directly to the user. Using "you" supports a friendly tone by focusing on the user and helps avoid passive voice. Omit pronouns and accompanying auxiliary verbs, and start your sentence with a verb. Again, focus on making a connection by using "you" or "your."

Avoid mixing first-person possessive ("My dashboard") and second-person language to reduce cognitive load.

When the product or application is addressing the user, use "we" or your organization's name. Avoid confusion by being clear about who is speaking or acting. For instance, use "We found these results" instead of "I found these results." Using "we" can make the UI feel more human and demonstrate accountability for system errors, emphasizing the user's importance every step of the way. However, avoid overusing "we" as it can distract from the user's needs. To keep the focus centered on the user, reserve "we" for system errors, status updates, and other system-related issues.

Use common contractions, such as "it's," "you're," "that's," and "don't," to create a friendly, informal tone. Never use your company's name in the possessive form, and avoid using it in a contraction. Avoid ambiguous contractions such as "there'd" and "what're." Avoid mixing contractions and spelled-out words in the UI, as it creates inconsistency and reduces trust. Using spelled-out words in place of common contractions introduces unnecessary formality.

### Maintain stylistic consistency

Use one word or phrase consistently to refer to a specific action across the experience. For example, if you call the process of securing a reservation "booking" in one area of the interface, don't call it "planning" or "scheduling" elsewhere. To help drive consistency, check word usage across your organization. Create a list of agreed-on terms for your style guide that your team can refer to.

Use proper capitalization. For example, agree to use sentence casing throughout the UI, capitalizing only the first word in a sentence, with proper nouns&mdash;names of people, places, and some products&mdash;always capitalized. For subheads, buttons, and hyperlinks, use sentence casing without punctuation. When in doubt, don't capitalize. Use title case for position titles (Chief Financial Officer), organization names or departments (Human Resources), branded products or programs, and names of people and places. All caps is not recommended under any circumstances. If you need to emphasize text, consider using different typography styles like size, font weight, or color instead of all caps.

### Prioritize correct sentence structure

How people react to and feel about your application depends partly on the quality of the writing and the overall voice and tone in which you communicate. In general, when writing, there are four types of statements, or sentence structures. Typically, UI content uses three of the four, depending on the purpose of the content and the nature of the product.

- Use *declarative* statements regularly. A description of the features of a component is an example of when you might use a declarative statement.
- Use *imperatives* freely. These are prompts and commands, such as asking the user to review changes and then submit.
- Use caution with *interrogative* statements. These are questions. They're acceptable in product flows when users must make choices. They can help uncover solutions or clarify a user's needs.
- Use *exclamatory* statements sparingly, as their positive impact diminishes with overuse.

### Know when to use active voice

In the active voice, the subject performs the action of the sentence; for example, "Enter a few letters." In the passive voice, the subject receives the action; for example, "A few letters should be entered."

Passive voice obscures or omits the actor, making the sentence less direct and sometimes ambiguous. It lacks clarity and authority.

The following table illustrates active vs passive voice.

| Active | Passive |
| ------ | ------- |
| "Click the 'Submit' button to save your changes." | "Your changes will be saved when the 'Submit' button is clicked." |
| "Enter your email address to receive updates." | "Updates will be received after the email address is entered." |
| "Select your preferred language from the dropdown menu." | "The preferred language can be selected from the dropdown menu." |
| "Fill out the form with your contact information." | "The form should be filled out with contact information." |
| "Review the terms and conditions before proceeding." | "The terms and conditions should be reviewed before proceeding." |
| "Click on the image to view it in full size." | "The image can be viewed in full size by clicking on it." |

In each of these examples, the active voice provides clear instructions to the user (the subject) by specifying the action they need to take. This clarity helps users understand what they need to do more efficiently because it gives better direction. In the passive examples, no actor is indicated, so it's unclear who should be performing the action on the subject. The user should be aware when they need to take action.

Passive voice can be used to soften messages or avoid being too direct, such as when errors occur; for example, when the focus is on conveying information about what happened rather than assigning blame or responsibility, use the passive voice. We find failures frustrating regardless of who is at fault. Never imply blame or accuse the user.

The following table illustrates active vs passive voice in error messages.

| Active | Passive |
| ------ | ------- |
| "You entered the password incorrectly." | "The password was entered incorrectly." |
| "We couldn't find the file." | "The file could not be found." |
| "You submitted the form." | "The form has been submitted." |
| "We encountered an error while processing your request." | "An error occurred while processing your request." |
| "We saved the changes." | "The changes have been saved." |

For best practices and standards, rely on the active voice. However, for general guidelines (especially when recommending things to avoid or error messages), use passive voice.

### Be mindful of content needed for assistive technologies

Accessibility involves ensuring that content is perceivable, operable, and understandable by all users, including those with disabilities. Features such as descriptive alternative, or alt, text for images ensures that the UI content can be accessed and easily understood by users who are dependent on assistive technologies. While alt text is commonly used with images to provide a text description for screen readers, it can also be used for non-text elements on a web page, such as videos, audio files, charts, graphs, and interactive components like buttons or icons.

When writing alt text, provide concise and descriptive text that conveys the purpose and content of the image. It should be clear, informative, and relevant to the context of the image. Avoid overly technical language or unnecessary details. Focus on conveying the essential information, such as key objects, actions, or visual elements, while avoiding subjective interpretations of the image. Keep it concise to ensure that it's efficiently read by screen readers. Keep in mind that the standard recommendation for the maximum length of alt text is around 125 characters. Write in a neutral tone and ensure that the content is grammatically correct.

### Write for international audiences

When writing content for an application that's used worldwide, consider cultural diversity and sensitivity to ensure inclusivity and relevance for users from different backgrounds. Use culturally neutral language that's easily understood by a global audience. Avoid colloquialisms, slang, or culture-specific references. This way, you won't accidentally exclude or offend users from different regions or linguistic backgrounds. Provide localized versions of the interface with translations tailored to each target audience's language and dialect preferences to enhance user engagement and comprehension.

Understand cultural norms, values, and preferences when designing content for an international audience. Different cultures have distinct communication styles, etiquette, and social norms that influence user behavior and expectations. Creating interfaces that resonate with users involves considering factors like color symbolism, iconography, and content presentation formats specific to each culture. Choose visual elements like icons and images that are meaningful to users across diverse cultural contexts. While certain symbols might carry universal meanings, others might vary significantly in interpretation depending on cultural norms and beliefs. Collaborating with local experts or conducting user testing during the design and localization process can provide valuable insights and ensure that the interface reflects the cultural nuances and preferences of the target audience.

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

---

## Recommendations for designing conversational user experiences

Source: [conversation-design.md](https://learn.microsoft.com/en-us/power-platform/well-architected/experience-optimization/conversation-design)

*Learn strategies for effective conversation design for AI in your workloads.*

# Recommendations for designing conversational user experiences

**Applies to this Power Platform Well-Architected Experience Optimization checklist recommendation:**

| [XO:10](checklist.md) | **Design conversations that align with users' needs and help the AI accomplish its objectives. Make it clear what the AI can do. Create natural interactions that feel intuitive and human-like. Provide fallback mechanisms to ensure the AI gracefully recovers from problems.** |
|---|---|

This guide describes the recommendations for designing the user experience for conversational AI in a workload. Conversation design is the process of creating structured, intuitive, and natural dialogues between users and AI. Conversation design significantly enhances the user experience by making interactions with conversational AI more intuitive and efficient, reducing user frustration, and by helping users complete their tasks more quickly.

## Key design strategies

Conversation design involves crafting the flow of interactions to ensure that the AI understands user intent, responds effectively, and guides users toward their goals. Good conversation design enhances the user experience by making interactions feel more human-like and seamless. Therefore, user engagement and satisfaction increase. When you create conversational AI for your workload, aim to develop human-like, user-friendly interactions that facilitate natural communication and help users achieve their goals efficiently.

### Explain the capabilities of the AI

Be upfront about the AI's capabilities and help ensure that users understand what the AI can do. For example, if the AI can perform only specific tasks, let users know about this limitation right from the start. Make sure that users understand why the AI suggests specific actions or produces specific results. Provide explanations for the AI's recommendations to help users be successful and increase their trust in its capabilities and accuracy.

Clear communication about the AI's abilities helps manage user expectations by preventing unrealistic assumptions and minimizing disappointment and frustration. The result is a more positive user experience. An AI system that is transparent about its strengths and limitations boosts user confidence in the technology and builds trust. This trust is essential for user engagement and satisfaction.

Awareness of the AI's specific capabilities improves usability because users can navigate interactions more effectively and use the AI more efficiently. Clarifying the AI's capabilities reduces miscommunication because users are less likely to make requests that are beyond the AI's scope. This approach reduces potential frustration and dead ends.

### Understand the user's intent

Understanding user intent is a cornerstone of conversation design because it directly influences how well the AI can fulfill user requests and navigate complex dialogues. Accurately capturing intent ensures that the AI not only understands what the user is asking for but also responds in ways that feel intuitive and relevant to the user's needs.

When the AI recognizes and responds to intent appropriately, it creates a more natural and seamless conversation, reduces frustration, and helps users accomplish their goals more efficiently. Proper intent recognition helps the AI avoid dead ends by ensuring that it understands the purpose behind a user's input, even when the phrasing or terminology varies. The interaction remains fluid, with the AI proactively guiding users toward solutions, recommendations, or further actions, ultimately making the conversation more effective and satisfying.

Start by identifying what users want to accomplish. Map out key intents for your workload, and design targeted interactions that match those intents. Study user behavior, preferences, and contextual cues to anticipate the various ways that users might communicate their intentions.

### Optimize how the AI interprets input

At the core of any conversational AI is its ability to accurately interpret and understand human language. This ability involves natural language understanding (NLU), which enables the AI to discern the user's intent, even when they phrase their requests in unconventional or varied ways. Users often communicate in a natural, unstructured manner. AI systems must be designed not only to process structured commands but also to handle open-ended questions and informal language. To ensure that the AI can navigate these complexities and deliver accurate and relevant responses, it's critical that you optimize how the AI interprets user input.

Anticipate the various ways that users might phrase their requests and structure the AI's responses to accommodate different intents. For example, enable the AI to handle both structured commands and open-ended questions to ensure that users feel understood, regardless of how they phrase their requests. Design AI responses to mirror natural human communication. The AI's replies should sound conversational and context-aware, to reflect how people typically interact.

For more complex user inputs, break down the conversation into manageable steps. Guide users through a series of questions or actions that help resolve their issue without overwhelming them. If a user provides a request that involves multiple pieces of information, the AI should guide the user through the process step by step. This approach avoids overwhelming the user with too many questions at once and helps clarify intent. A structured flow of follow-up questions ensures that all necessary details are captured without confusion. At the same time, it helps maintain a natural conversation.

### Guide the user through interactions

Conversation flows determine how the conversation progresses based on what the user says or chooses. A good conversation flow should always be goal-oriented. Each step in the interaction should bring the user closer to completing their objective, whether it's scheduling a meeting, retrieving information, or resolving an issue. By designing with the user's goal in mind, you ensure that the conversation remains focused and purposeful. In this way, you help reduce frustration and improve the overall experience.

To create an effective conversation flow, first map out all possible interactions that users might have with the AI. This process includes designing clear decision trees that branch out based on different user responses or choices. By anticipating the various paths that a conversation might take, you ensure that the AI is prepared to handle both expected and unexpected inputs. The conversation flow should account for not only responses to questions but also possible follow-up questions if details are unclear or incomplete.

In a well-designed conversation, the natural back-and-forth between the user and the AI mirrors the dynamics of human interaction. The AI must not only respond to user inputs but also recognize when it should take the initiative; for example, by prompting the user for more information, asking clarifying questions, or by providing suggestions. Design the conversation to include moments where the AI can offer options, confirm user choices, or propose next steps so that the interaction feels cooperative and engaging.

An effective conversation handles interruptions and deviations gracefully. Users might change their mind mid-interaction or ask unrelated questions. A flexible conversation flow enables the AI to manage these situations effectively. For example, it might pause the current task to address a new query and then return to the original task when appropriate. Ensure that the AI can maintain context but still accommodate dynamic user behavior.

To enhance the fluidity of the conversation, transitions between different stages of the flow must be managed with care. When the AI shifts from gathering information to carrying out an action, it should clearly communicate this transition to the user.

### Design fallback mechanisms

Conversations don't always follow a predictable path. Users might enter unexpected, unclear, or off-topic responses that the AI struggles to understand. Good conversation design prepares for these moments by ensuring that the AI can recover gracefully and continue to keep the interaction productive and user-friendly. Don't design the AI to end the conversation abruptly if it encounters something that it doesn't understand. Instead, design the flow to prompt the user with clarifying questions, offer alternative suggestions, or redirect the conversation in a way that keeps the user engaged and moving toward their goal.

Plan for edge cases. Sometimes, users say something unexpected, irrelevant, or out of context. Design the AI to include fallback responses that it can use to help put the conversation back on track. For example, if a user's input is too vague, the AI shouldn't just say, "I didn't understand that." Instead, design it to ask a clarifying question such as, "Could you provide more details about what you need?"

If users provide incomplete information, the AI should prompt them with contextual follow-ups. For example, if a user says, "Schedule a meeting," but doesn't specify a time or participants, the AI might ask, "What time would you like the meeting to be?" or "Who should be invited?" In this way, the AI can fill in gaps in the user's input without causing frustration.

For more complex scenarios, where a user might be asking for something that the AI can't handle or something that is off-topic, design the fallback responses to offer alternative suggestions. For example, imagine in a system for scheduling meetings that a user asks, "Can you book a flight?" Because booking a flight is outside the AI's capabilities, the AI might respond, "I'm currently able to schedule meetings, but I can also help with other tasks, like drafting emails or managing your calendar." These types of alternative paths help keep the interaction flowing smoothly and avoid alienating the user. They also help the user understand what the AI is capable of doing.

Anticipate repeated misunderstandings. If the AI fails to understand a user multiple times in a row, the fallback strategy should offer escalation through alternative solutions. For example, it might redirect the user to a human for assistance or provide links to relevant help documentation. This approach ensures that the user feels supported, even when the AI's limitations are reached.

## Power Platform facilitation

Microsoft Copilot Studio includes [prebuilt entities](/microsoft-copilot-studio/advanced-entities-slot-filling) that are designed to understand and categorize common user intents across a variety of domains. Use the prebuilt entities to map user intents to the relevant actions or responses without having to build everything on your own. Prebuilt entities are optimized to handle common variations in user input.

You can use [templates](/microsoft-copilot-studio/template-fundamentals) as a starting point for building agents. Agent templates are preconfigured with core conversational patterns, capabilities, and workflows that are designed to handle common tasks and scenarios. They incorporate built-in intents, entities, and dialogue flows tailored for specific use cases, such as customer support, productivity tasks, or FAQs. You can customize the templates to meet the specific needs of your workload and users.

[Provide custom instructions](/microsoft-copilot-studio/nlu-generative-answers-prompt-modification) in your agent through prompt modification, to gain better control over how the AI engages with users and answers specific questions. By altering the underlying instructions that shape the agent's comprehension and language generation, prompt modification enables developers to tailor the AI's behavior, responses, and emphasis. Because instructions can be customized to fit various use cases, sectors, or company requirements, prompt modification ensures that the agent offers contextually appropriate and useful replies.

[Configure the fallback topic](/microsoft-copilot-studio/authoring-system-fallback-topic) that an agent can use when it doesn't understand a user's input or can't handle the request. The fallback topic acts as a type of "safety net." It provides a preset response that keeps the conversation on track and prevents user frustration when the AI reaches the limits of its capabilities. By configuring the fallback topic, you control how the agent responds when it can't interpret a user's intent. For example, the agent can politely inform the user that it didn't understand the request and then offer helpful suggestions, such as asking the user to rephrase the query or providing a set of related options or commands that the AI can process. In more advanced configurations, the fallback topic can guide users to other resources or escalate the conversation to a human representative.

## Additional information

- [Introduction to conversational experiences](/microsoft-copilot-studio/guidance/cux-overview)
- [Conversational AI best practices](/microsoft-copilot-studio/guidance/project-best-practices)

## Experience Optimization checklist

> [!div class="nextstepaction"]
> [Experience Optimization checklist](checklist.md)

