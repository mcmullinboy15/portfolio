import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    experiences: [
      {
        title: "Apple",
        subtitle: "Software Engineer Intern",
        description: [
          "Built the Hardware Technology Compiled Memory Website \
          from scratch to replace the current outdated implementation. \
          Focused on maintainability and ease of future updates using \
          a class-based architecture, modern libraries such as Python \
          and JavaScript, and popular code standardizations such as \
          Django. Followed standards for Authentication, Authorization, \
          Testing, and Continuous Integration.",
          "This project was in production by the end of the Internship.",
          "Additionally, contributed to the documentation of Apple's \
          Authentication Team.",
          "Skills: Django, Vue.js, Redis, Celery workers"
        ]
      },
      {
        to: "EZsalt",
        title: "EZsalt",
        subtitle: "CTO & Co-Founder",
        description: [
          "Click the link to see how the EZsalt website, backend software, and all other services needed for EZsalt were built.",
          "Google Cloud Platform(GCP) and Firebase were the Cloud Platforms used.",
          "Skills: Vue.js, node.js, Firebase, GCP, Django, MQTT"
        ]
      },
      {
        github: "https://github.com/mcmullinboy15/Optima-Partical_Size",
        title: "Optima Powerware",
        subtitle: "ML intern",
        description: [
          "This repository is from working at my Summer Intership at Optima Powerware.",
          "I was able to work with Neural Networks in PyTorch and Controls for a Gold Mine.",
          "This repo contains everything from small scripts needed when manipulating data, to Testing models, to Training approaches.",
          "Skills: Pytorch"
        ]
      },
      {
        title: "Optima Powerware",
        subtitle: "Full Stack Software Engineer",
        description: [
          "Developed controls for Goldmines to understand our controls and ML models.",
          "Recommended React.js for development scalability.",
          "Fixed Django templates implementation and design. Rebuilt current application to use Django API and React.js",
          "Skills: Django, React.js"
        ]
      },
      {
        github: "",
        title: "Precision Systems Engineering",
        subtitle: "Full Stack Software Engineer",
        description: [
          "Company Finanical Display. Displays Finanical Data about the company and the progress of different projects.",
          "Skills: Flask, Vue.js"
        ]
      },
      {
        to: "",
        title: "Instructure",
        subtitle: "Junior QA Engineer (Intern)",
        description: [
          "Performed testing and quality checks on new commits while developing new products.",
          "Skills: Git, Jira"
        ]
      }
    ],
    projects: [
      {
        github: "https://github.com/mcmullinboy15/portfolio",
        title: "This Portfolio",
        description:
          "Click the github link to see the code for this webpage. I use Vue.js and my frontend framework, with Vuex as my statemanagement system, and Vuetify for design. I use Firebase Hosting to host the built webpage, and FirestoreDB for retrieving/saving any data needed. This is a low-level simple project, so I don't use all the great functionalities of these libraries and frameworks."
      },
      {
        github: "https://github.com/mcmullinboy15/simply_ai",
        title: "simply-ai",
        description:
          "A .json or .yaml configuration file based Pytorch training software."
      },
      {
        github: "https://github.com/mcmullinboy15/canvas-python",
        title: "canvas-python",
        description: "Python package for canvas from Instructure API"
      },
      {
        github: "",
        title: "Stock Market Trading",
        description:
          "I've built many Stock Market Prediction algorithms using basic Moving Averages and also Neural Network backbones."
      },
      {
        github: "https://github.com/mcmullinboy15/vue-firebase-template",
        title: "vue-firebase-template",
        description:
          "Template built for web projects with everything needed for Vue.js and Firebase integration. Including Auth, Database, etc."
      },
      {
        github: "https://github.com/mcmullinboy15/flash-multiple-esp-devices",
        title: "flash-multiple-esp-devices",
        description:
          "Modified the python script esptool.py to be able to Flash Multiple ESP Devices with a provided .bin file."
      }
    ],
    tutorials: [
      {
        title: "Deep Learning and Neural Networks with Python and Pytorch",
        description:
          "This was the most important tutorial for me to start understanding Neural Networks and how they work. After completing this entire tutorial I am able to build a neural network in pytorch and have create a small on in keras.",
        to:
          "https://www.youtube.com/watch?v=BzcBsTou0C0&list=PLQVvvaa0QuDdeMyHEYc0gxFpYwHY2Qfdh&index=2"
      },
      {
        title: "Django Tutorials - Corey Schafer",
        description:
          "Python Django Tutorials. In this series, we will be learning how to build a full-featured Django application for scratch. We will learn how to get started with Django, use templates, create a database, upload pictures, create an authentication system, and much much more.",
        to:
          "https://www.youtube.com/playlist?list=PL-osiE80TeTtoQCKZ03TU5fNfx2UY6U4p"
      },
      {
        title: "Vue.js Todo App",
        to:
          "https://www.youtube.com/playlist?list=PLEhEHUEU3x5q-xB1On4CsLPts0-rZ9oos"
      },
      {
        title: "Firebase Auth Tutorial",
        to:
          "https://www.youtube.com/playlist?list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ"
      },
      {
        title: "Steve Cope - IOT & MQTT",
        to: "https://www.youtube.com/c/stevecope"
      }
    ],
    // Make sure the report attrs are to the /assets folder or /none
    // CourseDescription, or Project Description
    classes: {
      um: {
        "545": {
          report: "/assets/EECS545_Project.pdf",
          github: "https://github.com/mcmullinboy15/Final-ML-Code",
          title: "EECS 545 - Machine Learning",
          description: ""
        },
        "010": {
          report: "/assets/EECS598_010_FinalProject.pdf",
          github: "https://github.com/mcmullinboy15/EECS598-010",
          title: "EECS 598:010 - Applied ML for Effective Computing",
          description: ""
        },
        "592": {
          report: "/assets/EECS_592_Project_Final_Report.pdf",
          github: "https://github.com/mvandermerwe/object_keypoints",
          title: "EECS 592 - AI Foundations",
          description:
            "Using Pytorch and keypoints to find simpler representation of 3D models."
        },
        "587": {
          report: "/assets/EECS_587__Term_Project_Report.pdf",
          github: "https://github.com/mcmullinboy15/587-project",
          title: "EECS 587 - Parallel Computing",
          description:
            "Implemented Robert's Cross Operator (Edge Detection) using CUDA"
        },
        "583": {
          report: "/assets/583_Project_Final_Report.pdf",
          github: "https://github.com/mcmullinboy15/tvm",
          title: "EECS 583 - Advanced Compilers",
          description:
            "Extending Operator Fusion in TVM to include IndexedBackwardGraph"
        },
        "007": {
          report: "/assets/598_007_final_report.pdf",
          github:
            "https://github.com/mcmullinboy15/598_007_Encrypted_Systems_Final_Project", // PDF  &&  GITHUB bitflipper
          title: "EECS 589:007 - Encrypted Systems",
          description: ""
        },
        "011": {
          report: "/assets/EECS_598__AGI__Final.pdf",
          title: "EECS 598:011 - Artificial General Inteligence",
          description: ""
        }
      },
      usu: {
        "5200": {
          report: "/none",
          github: "",
          title: "CS 5200 - AWS Cloud Computing",
          description:
            "This course was built to prepare for the AWS Practitioners Exam. This Course was based on the AWS Practitioners Exam preperation class that was built by AWS."
        },
        "5620": {
          report: "/CS_5620",
          github: "https://github.com/mcmullinboy15/6620_Solar_Energy_Project",
          title: "CS 5620 - Machine Inteligence in Clean Energy",
          description:
            "This class will study state-of-the-art machine intelligence techniques that are necessary to manage and integrate these disparate components optimally. Students will work both in multidisciplinary teams and individually to identify challenges and implement innovative solutions to tractable problems."
        },
        "5820": {
          report: "/assets/CS5820 FinalProject_Proposal.pdf",
          github: "https://github.com/mghoffmann/NeoWs_visualization",
          title: "CS 5820 - Data Visualization",
          description: ""
        },
        "3200_fgp": {
          report: "/assets/3200_Project_1_Purposal.pdf",
          github: "https://github.com/mcmullinboy15/family_gift_planner",
          title: "CS 3200 - Mobile Development - family_gift_planner",
          description: ""
        },
        "3200_tt": {
          report: "/assets/3200_SecondProjectProposal.pdf",
          github: "https://github.com/mcmullinboy15/trail_tracker",
          title: "CS 3200 - Mobile Development - trail_tracker",
          description: ""
        }
      }
    },
    themes: {}
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
});
