import { App } from '../types';

const initialApps: Omit<App, 'id' | 'created_at'>[] = [
  {
    name: 'Slack',
    logo: 'https://images.pexels.com/photos/4703909/pexels-photo-4703909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 8,
    category: 'Communication'
  },
  {
    name: 'Microsoft Teams',
    logo: 'https://images.pexels.com/photos/7887135/pexels-photo-7887135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 5,
    category: 'Communication'
  },
  {
    name: 'Google Drive',
    logo: 'https://images.pexels.com/photos/11035539/pexels-photo-11035539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 6,
    category: 'Storage'
  },
  {
    name: 'Salesforce',
    logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 25,
    category: 'CRM'
  },
  {
    name: 'Hubspot',
    logo: 'https://images.pexels.com/photos/6177604/pexels-photo-6177604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 20,
    category: 'Marketing'
  },
  {
    name: 'Asana',
    logo: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 10,
    category: 'Project Management'
  },
  {
    name: 'Notion',
    logo: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 8,
    category: 'Productivity'
  },
  {
    name: 'Monday.com',
    logo: 'https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 12,
    category: 'Project Management'
  },
  {
    name: 'Trello',
    logo: 'https://images.pexels.com/photos/4709286/pexels-photo-4709286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 5,
    category: 'Project Management'
  },
  {
    name: 'Jira',
    logo: 'https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 7,
    category: 'Project Management'
  },
  {
    name: 'Airtable',
    logo: 'https://images.pexels.com/photos/14936128/pexels-photo-14936128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 10,
    category: 'Database'
  },
  {
    name: 'Figma',
    logo: 'https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    costPerUser: 12,
    category: 'Design'
  }
];

export default initialApps;