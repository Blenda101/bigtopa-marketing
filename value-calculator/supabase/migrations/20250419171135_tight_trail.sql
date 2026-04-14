/*
  # Add initial apps data
  
  1. New Data
    - Insert initial apps data into the apps table
    
  2. Changes
    - Add initial set of apps with their details
*/

INSERT INTO apps (name, logo, cost_per_user, category)
VALUES
  ('Slack', 'https://images.pexels.com/photos/4703909/pexels-photo-4703909.jpeg', 8, 'Communication'),
  ('Microsoft Teams', 'https://images.pexels.com/photos/7887135/pexels-photo-7887135.jpeg', 5, 'Communication'),
  ('Google Drive', 'https://images.pexels.com/photos/11035539/pexels-photo-11035539.jpeg', 6, 'Storage'),
  ('Salesforce', 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg', 25, 'CRM'),
  ('Hubspot', 'https://images.pexels.com/photos/6177604/pexels-photo-6177604.jpeg', 20, 'Marketing'),
  ('Asana', 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg', 10, 'Project Management'),
  ('Notion', 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg', 8, 'Productivity'),
  ('Monday.com', 'https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg', 12, 'Project Management'),
  ('Trello', 'https://images.pexels.com/photos/4709286/pexels-photo-4709286.jpeg', 5, 'Project Management'),
  ('Jira', 'https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg', 7, 'Project Management'),
  ('Airtable', 'https://images.pexels.com/photos/14936128/pexels-photo-14936128.jpeg', 10, 'Database'),
  ('Figma', 'https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg', 12, 'Design')
ON CONFLICT (id) DO NOTHING;