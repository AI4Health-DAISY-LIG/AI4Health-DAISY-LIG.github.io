export interface TeachingSite {
  description: string
  github: string
  title: string
  url: string
}

export const teachingRepositories = [
  {
    owner: 'AI4Health-DAISY-LIG',
    repo: 'AI4Transcriptomics',
    title: 'AI4Transcriptomics',
    description: 'From Nucleus to Neural Networks: Foundations of AI in Transcriptomics.',
    url: 'https://ai4health-daisy-lig.github.io/AI4Transcriptomics/',
  },
] as const