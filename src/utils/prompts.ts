import frontend from '.data/challenges/frontend.json'
import fullstack from '.data/challenges/fullstack.json'
import responsive from '.data/challenges/responsive.json'
import { ChallengeType } from '@prisma/client'

export interface Options {
  type: ChallengeType
}

export const templatePrompt = `Given a list of different dev technologies, i want you to identify the main and most important %type% technologies that appear in the requirements. If you can't identify any %type% technologies set the identifiedTechnologies list to %fallback%

With the list of identified %type% technologies, i want you to create one challenge based on these %type% technologies. The goal of the challenge must be to create a real-world application.

reply in JSON format with no highlighting, the JSON format must be like this:

{

  "identifiedTechnologies": [
    [identifiedTechnology],
    [identifiedTechnology],
    [identifiedTechnology],
    [identifiedTechnology]
  ],
  "challenge": {
    "title": [title],
    "description": [description],
    "score": [score],
    "appRequirements": [
      [appRequirement],
      [appRequirement],
      [appRequirement],
      [appRequirement],
      [appRequirement]
    ]
  }
}

the identifiedTechnologies represents the list of identified %type% technologies, the list must have a maximum of 10 items.

the challenge represents the generated challenge that must follow this schema:
  - the title represents the title of the challenge, the max length for the title its 20 characters.
  - the description represents the description of the challenge, the max length for the description its 200.
  - the score represents the difficultly of the challenge, must be a number in a range from 1 to 10.
  - the requirements represents a list of the minimum things that the final app must be able to do, be concise and give direct app requirements, don't include user experience, don't include responsive design or optimal viewing on different devices, don't include user accessibility, don't include browser cross-platform, don't include app security, don't include good programming practices, don't include error handling, don't include optimizing practices.

you have to fullfil every field with its value, for example:

%examples%
`

const categories = {
  [ChallengeType.frontend]: frontend,
  [ChallengeType.fullstack]: fullstack,
  [ChallengeType.responsive]: responsive,
} satisfies Record<ChallengeType, unknown>

export function createPrompt({ type }: Options) {
  const { challenges, identifiedTechnologies } = categories[type]

  const examples = challenges
    .map(challenge =>
      JSON.stringify({
        identifiedTechnologies,
        challenge,
      })
    )
    .join('\n\n')

  return templatePrompt
    .replaceAll('%type%', type === ChallengeType.fullstack ? 'frontend and backend' : type)
    .replace('%fallback%', JSON.stringify(identifiedTechnologies))
    .replace('%examples%', examples)
}
