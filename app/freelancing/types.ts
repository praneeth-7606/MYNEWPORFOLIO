// Shape of an entry in data/freelancing-work.json. Shared by the page and the
// lazily-loaded detail modal.
export interface FreelancingProject {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  technicalHighlights: string[];
  duration: string;
  completedDate: string;
  status: string;
  liveUrl: string;
  githubUrl: string;
  image: string;
  metrics: {
    [key: string]: string;
  };
}
