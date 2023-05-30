import type { CardProps } from '@/components/card/card'

export const steps: CardProps[] = [
  {
    title: 'Step 1: Choose a Challenge',
    description:
      'Explore a variety of web development challenges covering topics like frontend, fullstack, responsive design, etc. Choose the challenge that interests you most and matches your skill level.',
    image: '/images/steps/select.png',
  },
  {
    title: 'Step 2: Resolve the Challenge',
    description:
      'Put your web development skills to work by applying programming languages, frameworks, and tools to develop a solution that meets the challenge requirements.',
    image: '/images/steps/programming.png',
  },
  {
    title: 'Step 3: Submit your solutions',
    description:
      'Submit your completed challenge solution for evaluation and feedback. Share a repository link or a live demo based on the submission requirements.',
    image: '/images/steps/send.png',
  },
]

export const createChallengeSteps: CardProps[] = [
  {
    title: 'Step 1: Select an Offer',
    description:
      "Browse through available options and select the offer that catches your interest or meets your requirements. If you don't find a suitable offer among the initial options, you can choose to load more offers to expand your choices",
    image: '/images/steps/select.png',
  },
  {
    title: "Step 2: Read the Offer's Details",
    description:
      'Take a closer look at the chosen offer by reading its description and any additional information provided. Pay attention to the skills list and ensure that your own skills match with the skills listed.',
    image: '/images/steps/programming.png',
  },
  {
    title: 'Step 3: Create the Challenge',
    description:
      'Once you have carefully reviewed the offer details, click on the "Create Challenge" button to proceed. This will initiate the process of designing and setting up the challenge based on the chosen offer and your skills.',
    image: '/images/steps/send.png',
  },
]
