// Shared service catalogue for the homepage and /services (six existing cards).
// Images are Higgsfield-generated 3D illustrations (800×603 WebP).

export interface Service {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'ai-ml',
    title: 'AI Assistants & Machine Learning',
    description:
      'AI assistants for website chat and WhatsApp, built on large language models like Claude, plus automation pipelines that take repetitive work off your team.',
    image: '/images/gdp/service-ai-ml.webp',
    imageAlt: '3D illustration of an AI core connected to chat bubbles',
    features: ['AI chatbots for websites', 'WhatsApp AI assistants', 'Claude API integration', 'Workflow automation'],
  },
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description:
      'Purpose-built web platforms, APIs and internal tools engineered to fit your business exactly, not the other way around.',
    image: '/images/gdp/service-custom-software.webp',
    imageAlt: '3D illustration of a browser window with code blocks and gears',
    features: ['Web applications', 'API development', 'Legacy modernization'],
  },
  {
    id: 'cloud',
    title: 'Cloud Architecture',
    description:
      'Secure cloud infrastructure designed to grow with you, from first deployment to production monitoring.',
    image: '/images/gdp/service-cloud.webp',
    imageAlt: '3D illustration of a cloud above secure servers',
    features: ['Serverless & edge functions', 'Databases & auth', 'DevOps & CI/CD'],
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Polished iOS and Android applications with the feel of native and the speed of cross-platform delivery.',
    image: '/images/gdp/service-mobile.webp',
    imageAlt: '3D illustration of a smartphone with app tiles and a chat bubble',
    features: ['React Native', 'Progressive web apps', 'App store releases'],
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    description:
      'A clear roadmap from manual processes to modern digital operations: strategy, build and adoption in one engagement.',
    image: '/images/gdp/service-digital-transformation.webp',
    imageAlt: '3D illustration of a paper document turning into a digital dashboard',
    features: ['Process automation', 'Digital strategy', 'Team adoption'],
  },
  {
    id: 'integration',
    title: 'Enterprise Integration',
    description:
      'Connect the systems your business already runs on: unified data, automated workflows and no copy-and-paste between tools.',
    image: '/images/gdp/service-integration.webp',
    imageAlt: '3D illustration of puzzle pieces connecting app tiles',
    features: ['API integrations', 'Data pipelines', 'CRM & messaging integrations'],
  },
]
