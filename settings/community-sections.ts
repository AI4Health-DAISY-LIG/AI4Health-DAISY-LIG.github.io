export const communitySections = {
  talks: {
    title: 'Talks',
    eyebrow: 'Talks and presentations',
    description: 'Invited talks, seminars, and public presentations from the team.',
  },
  openings: {
    title: 'Openings',
    eyebrow: 'Join the team',
    description: 'Open positions, internships, and collaboration opportunities.',
  },
  'group-meetings': {
    title: 'Group meetings',
    eyebrow: 'The team calendar',
    description: 'Seminars, reading groups, and project conversations within the lab.',
  },
} as const

export type CommunitySection = keyof typeof communitySections