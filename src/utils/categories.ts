import { ChallengeType } from '@prisma/client'
import type { CardProps } from '@/components/card/card'

export interface Category extends Omit<CardProps, 'bottomSection'> {
  id: string
  type: ChallengeType
  interestingComments: string[]
  guide: string[]
}

export const categories: Category[] = [
  {
    id: 'frontend',
    type: ChallengeType.frontend,
    title: 'Frontend Development',
    description:
      'Master HTML, CSS, and JavaScript to build dynamic and interactive user interfaces. Learn how to handle events, manipulate the DOM, and create engaging web experiences.',
    image: '/images/categories/frontend.png',
    href: '/category/frontend',
    interestingComments: [
      'Utilize proper HTML semantic tags for improved accessibility and SEO',
      'Experiment with different CSS layout techniques',
      'Explore modern JavaScript features and syntax',
    ],
    guide: [
      'Write clean and modular HTML, CSS, and JavaScript code',
      'Ensure cross-browser compatibility',
      'Optimize website performance by minimizing HTTP requests and using efficient coding practices',
    ],
  },
  {
    id: 'responsive',
    type: ChallengeType.responsive,
    title: 'Responsive Web Development',
    description:
      'Discover the techniques and best practices for creating responsive websites that adapt seamlessly to different screen sizes and devices.',
    image: '/images/categories/responsive.png',
    href: '/category/responsive',
    interestingComments: [
      'Understand responsive design principles',
      'Implement media queries and flexible layouts',
      'Test and optimize for different devices and screen sizes',
    ],
    guide: [
      'Ensure the website layout adapts to different devices',
      'Optimize images and other assets for different resolutions',
      'Test the responsiveness on multiple browsers and devices',
    ],
  },
  {
    id: 'fullstack',
    type: ChallengeType.fullstack,
    title: 'Full-Stack Development',
    description:
      'Combine frontend and backend development skills to create complete web applications. Learn how to handle data flow, implement user authentication, and build seamless user experiences.',
    image: '/images/categories/fullstack.png',
    href: '/category/fullstack',
    interestingComments: [
      'Experience end-to-end web development',
      'Integrate frontend and backend seamlessly',
      'Implement authentication and authorization',
    ],
    guide: [
      'Ensure proper communication between frontend and backend',
      'Implement user authentication and authorization',
      'Focus on delivering a seamless user experience',
    ],
  },
]
