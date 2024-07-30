import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    experiences: [
      {
        title: "Full-Stack Engineer",
        subtitle: "Origin | December 2023 - Present",
        description: [
          "Origin is an award-winning Creative Technology company whose zero code CTV ad formats enable marketers to deliver dynamic and responsive ad experiences in the living room and outside the home.",
          "With unparalleled creative capabilities and proprietary ad serving technology, Origin’s off-the-shelf and custom solutions are trusted by agencies, brands, creative teams and programmatic platforms who want the ads they run to get the attention, engagement and outcomes they deserve.",
          "Founded by media veterans Stephen Strong and Fred Godfrey, Origin is driven by the belief that to win a viewer today, we must look beyond how it was done yesterday.",
          "Learn more at: originmedia.tv",
        ],
      },
      {
        title: "Full-Stack Engineer",
        subtitle: "Freelance | June 2020 - Present",
        description: [
          "Project Lead at Podcast Automation Startup, 3rd-party API integration in React, Express, DynamoDB: podflow.ai",
          "Automated Payroll for GoalHome LLC. 4+ hours to 5 minutes. Factoring in overtime and unique day/night pay",
          "Nonprofit Frontend UI (bwbutah.org), highlighting mission and initiatives. (Vue, Custom CSS, Google Firebase)",
          "Secure Video Streaming (videojs) webpage. Instructional videos for textbook supplementation: prclinks.com",
        ],
      },
      {
        title: "Backend Engineer",
        subtitle: "Rakemail (Startup) | May 2024 - Present",
        description: [
          "Rakemail is a startup that is focused on making email marketing easier for small businesses.",
          "We are building a platform that will allow businesses to easily create send email campaigns to their customers,",
          "with the add ability to interact with their abandoned carts within the email.",
        ],
      },
      {
        title: "Controls Engineer 1",
        subtitle: "Precision Systems Engineering | March 2023 - December 2023",
        description: [
          "Developed an 'Ignition'-based HMI for a mineral plant, complemented by a production-ready HTTPS data API",
          "Custom CRM for Job/Proposal workflow, within Outlook Add-in. (React, Express, API, Azure)",
        ],
      },
      {
        title: "Full-Stack Engineer (intern)",
        subtitle: "Apple | May 2022 - Aug 2022",
        description: [
          "Rebuilt a 10-year-old webpage for Hardware Tech's Compiled Memory engineers. Production ready in 3 months",
          "Focused on Code Maintainability, for easiest possible future updates. (Docker, CI/CD, unit/e2e tests)",
          "Implemented Vue.js, dramatically enhancing response times and eliminating blocking notifications on errors",
          "Detailed Docker management, Django backend & Redis queue to communicate with Apple Compute queue",
        ],
      },
      {
        title: "Backend Engineer (intern)",
        subtitle: "Optima Powerware | July 2021 - Aug 2021",
        description: [
          "ML model controls, backend management for goldmine automation. Currently in production",
          "React & REST API (django), Rebuilt for scalability",
        ],
      },
      {
        to: "EZsalt",
        title: "Co-Founder & CTO",
        subtitle: "EZsalt (Startup) | Nov 2019 - July 2021",
        description: [
          "Built micro-controller for monitoring water-softener salt levels on your phone",
          "300+ users, 0 failures, 3+ years. Scaleable to thousands of new customers",
          "Vue, Express, CI/CD, Github Actions, FirebaseAuth, and Firestore, used for scalability and simplicity",
          "4+ Cloud Functions for new users, messages, etc. 12+ other API endpoints mcmullin.app/ezsalt",
        ],
      },
      {
        title: "Machine Learning Engineer (intern)",
        subtitle: "OPTIMA POWERWARE | May 2020 - Aug 2020",
        description: [
          "PyTorch Neural Network predicting Goldmine output quality. 3-5 Linear Layers, 16 input to 1 output feature",
          "Eliminated manual sampling every 4 hours",
        ],
      },
      {
        github: "",
        title: "Full-Stack Software Engineer",
        subtitle: "Precision Systems EngineerING",
        description: [
          "Company Finanical Display. Displays Finanical Data about the company and the progress of different projects.",
          "Skills: Flask, Vue.js",
        ],
      },
      {
        to: "",
        title: "Junior QA Engineer (Intern)",
        subtitle: "Instructure",
        description: [
          "Performed testing and quality checks on new commits while developing new products.",
          "Skills: Git, Jira",
        ],
      },
    ],
    education: [
      {
        title: "University of Michigan",
        subtitle: "Masters in Computer Science and Engineering",
        description: [
          "Focused on prototyping and developing strategic UX/UI designs that address user needs using Figma and JS",
          "AI/ML, Parallel Computing, and Advanced compilers help to master computer systems",
        ],
      },
      {
        title: "Utah State University",
        subtitle: "Bachelors in Computer Science",
        description: [
          "AWS Cloud Computing, covered all AWS services for the AWS practitioners exam",
          "Data Visualization, logical approaches to displaying data with charts and graphs (d3, jQuery)",
        ],
      },
    ],
    projects: [
      // crossover-js
      {
        github: "https://github.com/mcmullinboy15/crossover-js",
        title: "Crossover JS",
        description: "Bridging the Gap between Frontend and Backend.",
      },
      // 598_007
      {
        to: "/report/um/007",
        github:
          "https://github.com/mcmullinboy15/598_007_Encrypted_Systems_Final_Project",
        title: "Encrypted Systems Final Project",
        description:
          "Analyzing the effects of flipping bits to the MySQL encrypted '.ibd' data file, and the capabilities of some common encryption schemes on a basic '.csv' file. Started by flipping bits of a basic .csv file to see what effects flipping bits can have. We then look further at the effects of flipping bits on an encrypted .csv file to check for successful reloads, with incorrect data. Attempted to flip individual bits of the encrypted .ibd file to find any vulnerabilities in the Integrity Protection.",
      },
      // Bagel_Bunch
      {
        github: "https://github.com/mcmullinboy15/BagelBunch",
        title: "Bagel Bunch",
        description:
          "Bagel Shop Ordering Software (Class Project). Found at https://bagelbunch-b5e21.web.app",
      },
      // Solar
      {
        to: "/report/usu/5620",
        github: "https://github.com/mcmullinboy15/6620_Solar_Energy_Project",
        title: "Solar Scheduling",
        description:
          "Using Solar Energy data to schedule when power is saved to batteries, or used in the house.",
      },
      // UNO
      {
        github: "https://github.com/mcmullinboy15/uno",
        title: "UNO Game: Full-Stack Class Project",
        description:
          "Uno game for DevOps class - This is forked from a Class Repo - I learned a lot about Cloud Platforms and integrating them into my Vue.js projects.",
      },
      // Stock ALGO
      {
        github: "https://github.com/mcmullinboy15/ALGO",
        title: "ALGO",
        description: "Stock Market Prediction Algorithums and manipulation",
      },
      // esp
      {
        github: "https://github.com/mcmullinboy15/flash-multiple-esp-devices",
        title: "Flash Multiple ESP Devices",
        description:
          "Python Script that uses esptool.py to Flash Multiple ESP Devices with tasmota-sensors.bin or any .bin you'd like to use",
      },
      // DataVis
      // NeoWs
      {
        github: "https://github.com/mghoffmann/NeoWs_visualization",
        title: "NeoWs Visualization",
        description:
          "The data is from a NASA api about asteroids and coments, collectively called near-earth objects (NEOs)",
      },
      // 3450-Section001
      // 6620
      // GoalHome?
      {
        github: "https://github.com/mcmullinboy15/GoalHome",
        title: "GoalHome",
        description:
          "Automated Payroll for GoalHome LLC. 4+ hours to 5 minutes. Factoring in overtime and unique day/night pay",
      },
      {
        github: "https://github.com/mcmullinboy15/vue-firebase-template",
        title: "vue-firebase-template",
        description:
          "Template built for web projects with everything needed for Vue.js and Firebase integration. Including Auth, Database, etc.",
      },
      {
        github: "https://github.com/mcmullinboy15/portfolio",
        title: "This Portfolio",
        description:
          "Click the github link to see the code for this webpage. I use Vue.js and my frontend framework, with Vuex as my statemanagement system, and Vuetify for design. I use Firebase Hosting to host the built webpage, and FirestoreDB for retrieving/saving any data needed.",
      },
      {
        github: "https://github.com/mcmullinboy15/simply_ai",
        title: "simply-ai",
        description:
          "A .json or .yaml configuration file based Pytorch training software.",
      },
      {
        github: "https://github.com/mcmullinboy15/canvas-python",
        title: "canvas-python",
        description: "Python package for canvas from Instructure API",
      },
      {
        github: "https://github.com/mcmullinboy15/family_gift_planner",
        title: "Family Gift Planner",
        description:
          "This app will help family members coordinate gift shopping. Each family member can log in and create their own gift wishlist. Everyone else in the group will be able to see their wishlist and check off gifts that they’ve bought without them seeing it. This will help so different family members don’t accidentally buy the same thing, and it will help each family member know what to buy.",
      },
      {
        github: "https://github.com/mcmullinboy15/trail_tracker",
        title: "Trail Tracker App",
        description:
          "This app will help hikers know what hiking routes they have previously completed, what length they are, and they can even see pictures that they took on their previous hikes.",
      },
      {
        github: "https://github.com/mcmullinboy15/cs5260-aws-s3-dynamodb",
        title: "aws-s3-dynamodb",
        description: "Consumer/Producer Class Assignment",
      },
    ],
    tutorials: [
      {
        title: "Inductive Automation - Ignition",
        description:
          "A quick introduction to the new features and functionality in this version of Ignition.",
        to:
          "https://inductiveuniversity.com/courses/ignition/whats-new-in-ignition-8/8.0",
      },
      {
        title: "Deep Learning and Neural Networks with Python and Pytorch",
        description:
          "This was the most important tutorial for me to start understanding Neural Networks and how they work. After completing this entire tutorial I am able to build a neural network in pytorch and have create a small on in keras.",
        to:
          "https://www.youtube.com/watch?v=BzcBsTou0C0&list=PLQVvvaa0QuDdeMyHEYc0gxFpYwHY2Qfdh&index=2",
      },
      {
        title: "Django Tutorials - Corey Schafer",
        description:
          "Python Django Tutorials. In this series, we will be learning how to build a full-featured Django application for scratch. We will learn how to get started with Django, use templates, create a database, upload pictures, create an authentication system, and much much more.",
        to:
          "https://www.youtube.com/playlist?list=PL-osiE80TeTtoQCKZ03TU5fNfx2UY6U4p",
      },
      {
        title: "Vue.js Todo App",
        to:
          "https://www.youtube.com/playlist?list=PLEhEHUEU3x5q-xB1On4CsLPts0-rZ9oos",
      },
      {
        title: "Firebase Auth Tutorial",
        to:
          "https://www.youtube.com/playlist?list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ",
      },
      {
        title: "Steve Cope - IOT & MQTT",
        to: "https://www.youtube.com/c/stevecope",
      },
    ],
    // Make sure the report attrs are to the /assets folder or /none
    // CourseDescription, or Project Description
    classes: {
      um: {
        "545": {
          report: "/assets/EECS545_Project.pdf",
          github: "https://github.com/mcmullinboy15/Final-ML-Code",
          title: "EECS 545 - Machine Learning",
          description: "",
        },
        "010": {
          report: "/assets/EECS598_010_FinalProject.pdf",
          github: "https://github.com/mcmullinboy15/EECS598-010",
          title: "EECS 598:010 - Applied ML for Effective Computing",
          description: "",
        },
        "592": {
          report: "/assets/EECS_592_Project_Final_Report.pdf",
          github: "https://github.com/mvandermerwe/object_keypoints",
          title: "EECS 592 - AI Foundations",
          description:
            "Using Pytorch and keypoints to find simpler representation of 3D models.",
        },
        "587": {
          report: "/assets/EECS_587__Term_Project_Report.pdf",
          github: "https://github.com/mcmullinboy15/587-project",
          title: "EECS 587 - Parallel Computing",
          description:
            "Implemented Robert's Cross Operator (Edge Detection) using CUDA",
        },
        "583": {
          report: "/assets/583_Project_Final_Report.pdf",
          github: "https://github.com/mcmullinboy15/tvm",
          title: "EECS 583 - Advanced Compilers",
          description:
            "Extending Operator Fusion in TVM to include IndexedBackwardGraph",
        },
        "007": {
          report: "/assets/598_007_final_report.pdf",
          github:
            "https://github.com/mcmullinboy15/598_007_Encrypted_Systems_Final_Project", // PDF  &&  GITHUB bitflipper
          title: "EECS 589:007 - Encrypted Systems",
          description: "",
        },
        "011": {
          report: "/assets/EECS_598__AGI__Final.pdf",
          title: "EECS 598:011 - Artificial General Inteligence",
          description: "",
        },
      },
      usu: {
        "5200": {
          report: "/none",
          github: "",
          title: "CS 5200 - AWS Cloud Computing",
          description:
            "This course was built to prepare for the AWS Practitioners Exam. This Course was based on the AWS Practitioners Exam preperation class that was built by AWS.",
        },
        "5620": {
          report: "/CS_5620",
          github: "https://github.com/mcmullinboy15/6620_Solar_Energy_Project",
          title: "CS 5620 - Machine Inteligence in Clean Energy",
          description:
            "This class will study state-of-the-art machine intelligence techniques that are necessary to manage and integrate these disparate components optimally. Students will work both in multidisciplinary teams and individually to identify challenges and implement innovative solutions to tractable problems.",
        },
        "5820": {
          report: "/assets/CS5820 FinalProject_Proposal.pdf",
          github: "https://github.com/mghoffmann/NeoWs_visualization",
          title: "CS 5820 - Data Visualization",
          description: "",
        },
        "3200_fgp": {
          report: "/assets/3200_Project_1_Purposal.pdf",
          github: "https://github.com/mcmullinboy15/family_gift_planner",
          title: "CS 3200 - Mobile Development - family_gift_planner",
          description: "",
        },
        "3200_tt": {
          report: "/assets/3200_SecondProjectProposal.pdf",
          github: "https://github.com/mcmullinboy15/trail_tracker",
          title: "CS 3200 - Mobile Development - trail_tracker",
          description: "",
        },
      },
    },
    themes: {},
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
