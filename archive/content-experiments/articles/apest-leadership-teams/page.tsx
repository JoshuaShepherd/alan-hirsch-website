import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building APEST Leadership Teams - Alan Hirsch",
  description: "Practical steps to implement the five-fold ministry in your church leadership structure.",
  keywords: "APEST, five-fold ministry, church leadership, apostolic, prophetic, evangelistic, shepherding, teaching"
};

export default function ApestLeadershipTeams() {
  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      {/* Article Header */}
      <section className="section-padding-lg">
        <div className="max-w-content mx-auto px-6">
          <div className="mb-6">
            <Link 
              href="/articles" 
              className="text-forest hover:text-forest/80 font-medium"
            >
              ← Back to Articles
            </Link>
          </div>
          
          <div className="mb-8">
            <span 
              className="text-sm font-medium px-3 py-1 rounded-full mb-6 inline-block"
              style={{ backgroundColor: '#B2613E', color: '#F8F8F6' }}
            >
              APEST
            </span>
            <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
              Building APEST Leadership Teams
            </h1>
            <p className="text-xl leading-relaxed mb-6" style={{ color: '#444444' }}>
              Practical steps to implement the five-fold ministry in your church leadership structure and unlock your team's full potential.
            </p>
            <div className="flex items-center gap-4 text-sm" style={{ color: '#444444' }}>
              <span>6 min read</span>
              <span>•</span>
              <span>February 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-6">
          <div className="prose prose-lg max-w-none" style={{ color: '#444444', lineHeight: '1.7' }}>
            <p className="text-xl mb-8" style={{ color: '#111111' }}>
              Most church leadership teams are missing critical elements. They have pastors and teachers in abundance, 
              but lack the apostolic, prophetic, and evangelistic voices that Jesus himself equipped the church with.
            </p>

            <p className="mb-6">
              The five-fold ministry described in Ephesians 4:11-16—Apostolic, Prophetic, Evangelistic, Shepherding, 
              and Teaching (APEST)—isn't just a theological concept. It's a practical framework for building 
              leadership teams that can navigate the complexities of ministry in the 21st century.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Understanding the Five Functions
            </h2>

            <p className="mb-4">Before building your team, ensure you understand what each ministry brings:</p>

            <div className="mb-8 space-y-4">
              <div className="p-6 rounded-lg" style={{ backgroundColor: '#E8F5E8' }}>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: '#1D4A38' }}>
                  Apostolic (A)
                </h3>
                <p className="mb-2">
                  <strong>Focus:</strong> Pioneering, church planting, cross-cultural mission
                </p>
                <p>
                  <strong>Contribution:</strong> Vision casting, breaking new ground, establishing new works
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFF4E6' }}>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: '#B2613E' }}>
                  Prophetic (P)
                </h3>
                <p className="mb-2">
                  <strong>Focus:</strong> Calling the church to righteousness and authenticity
                </p>
                <p>
                  <strong>Contribution:</strong> Challenging status quo, speaking truth, discernment
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: '#E6F7FF' }}>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: '#1890FF' }}>
                  Evangelistic (E)
                </h3>
                <p className="mb-2">
                  <strong>Focus:</strong> Reaching the lost, gospel proclamation
                </p>
                <p>
                  <strong>Contribution:</strong> Outward focus, connecting with non-believers, infectious enthusiasm
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: '#F6F8FA' }}>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: '#586069' }}>
                  Shepherding (S)
                </h3>
                <p className="mb-2">
                  <strong>Focus:</strong> Caring for people, community building
                </p>
                <p>
                  <strong>Contribution:</strong> Pastoral care, nurturing relationships, creating safe spaces
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: '#FDF6E3' }}>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: '#B58900' }}>
                  Teaching (T)
                </h3>
                <p className="mb-2">
                  <strong>Focus:</strong> Biblical instruction, theological depth
                </p>
                <p>
                  <strong>Contribution:</strong> Systematic learning, doctrine, knowledge transfer
                </p>
              </div>
            </div>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Practical Steps to Implementation
            </h2>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              1. Assess Your Current Team
            </h3>
            <p className="mb-6">
              Start by honestly evaluating your existing leadership structure. Most churches are heavy on 
              Shepherding and Teaching, with some Evangelistic representation. The Apostolic and Prophetic 
              voices are often the missing elements.
            </p>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              2. Identify Potential Leaders
            </h3>
            <p className="mb-6">
              Look beyond your current leadership pool. Apostolic leaders might be your entrepreneurs or 
              missionaries. Prophetic voices could be found among your justice advocates or worship leaders. 
              Don't limit yourself to traditional pastoral candidates.
            </p>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              3. Create Space for Each Voice
            </h3>
            <p className="mb-6">
              Ensure your leadership meetings and decision-making processes actively seek input from each 
              perspective. The Prophetic voice needs permission to challenge. The Apostolic needs room to 
              dream. The Evangelistic needs to keep the mission front and center.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Common Pitfalls to Avoid
            </h2>

            <ul className="mb-6 space-y-2">
              <li><strong>The Clone Trap:</strong> Don't recruit people who think just like you</li>
              <li><strong>The Harmony Myth:</strong> Healthy tension between ministries is productive</li>
              <li><strong>The Hierarchy Error:</strong> These are functions, not ranks</li>
              <li><strong>The Solo Act:</strong> No one person embodies all five perfectly</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              The Multiplication Effect
            </h2>

            <p className="mb-6">
              When you successfully implement APEST leadership, you don't just get better meetings—you get 
              a more balanced, effective, and resilient church. The Apostolic pushes you forward, the 
              Prophetic keeps you authentic, the Evangelistic keeps you missional, the Shepherding keeps 
              you caring, and the Teaching keeps you grounded.
            </p>

            <p className="mb-6">
              This isn't about perfection; it's about intentionality. Start where you are, with what you 
              have, and begin building toward a more complete leadership ecosystem.
            </p>

            <div className="p-6 rounded-lg mt-8" style={{ backgroundColor: '#E3E3E0' }}>
              <h3 className="font-display text-lg font-semibold mb-4" style={{ color: '#111111' }}>
                Next Steps
              </h3>
              <p className="mb-4">
                Ready to assess your team's APEST profile? Take our comprehensive assessment to identify 
                your leadership gaps and strengths.
              </p>
              <Link 
                href="/apest-assessment" 
                className="bg-forest text-paper px-6 py-3 rounded-lg font-medium hover:bg-forest/90 transition-colors inline-block"
                style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
              >
                Take APEST Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-content mx-auto px-6">
          <h2 className="font-display text-2xl font-semibold mb-8" style={{ color: '#111111' }}>
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="bg-paper rounded-lg p-6 shadow-sm">
              <span 
                className="text-xs font-medium px-2 py-1 rounded-full mb-3 inline-block"
                style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
              >
                Missional DNA
              </span>
              <h3 className="font-display text-lg font-semibold mb-3">
                <Link href="/articles/forgotten-ways-mission" className="hover:underline">
                  The Forgotten Ways of Mission
                </Link>
              </h3>
              <p className="text-sm mb-3" style={{ color: '#444444' }}>
                How the early church's simple practices can revolutionize modern ministry approaches.
              </p>
              <span className="text-sm" style={{ color: '#444444' }}>8 min read</span>
            </article>

            <article className="bg-paper rounded-lg p-6 shadow-sm">
              <span 
                className="text-xs font-medium px-2 py-1 rounded-full mb-3 inline-block"
                style={{ backgroundColor: '#B2613E', color: '#F8F8F6' }}
              >
                Leadership
              </span>
              <h3 className="font-display text-lg font-semibold mb-3">
                <Link href="/5q" className="hover:underline">
                  Discover Your APEST Profile
                </Link>
              </h3>
              <p className="text-sm mb-3" style={{ color: '#444444' }}>
                Understand your unique contribution to the five-fold ministry framework.
              </p>
              <span className="text-sm" style={{ color: '#444444' }}>Assessment</span>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
