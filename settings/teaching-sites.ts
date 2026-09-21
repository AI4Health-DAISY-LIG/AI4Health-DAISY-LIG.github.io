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
  {
    owner: 'AI4Health-DAISY-LIG',
    repo: 'python4beginners',
    title: 'Python4Beginners',
    description: 'An introduction to Python programming for beginners.',
    url: 'https://ai4health-daisy-lig.github.io/python4beginners/',
  },
] as const