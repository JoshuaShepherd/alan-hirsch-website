import { Metadata } from 'next';
import { APESTAgentHub } from '@/components/apest-agents/APESTAgentHub';

export const metadata: Metadata = {
  title: 'APEST AI Agents - Alan Hirsch',
  description: 'Engage in deep, personalized conversations with AI agents trained on APEST/Fivefold ministry. Based on your assessment from 5QCentral.com.',
  keywords: ['APEST', 'Five-fold ministry', 'AI agents', 'voice conversation', 'apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'],
};

export default function APESTAgentsPage() {
  return (
    <div className="bg-page min-h-screen">
      <div className="section-padding">
        <APESTAgentHub />
      </div>
    </div>
  );
}
