import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Forgotten Ways of Mission - Alan Hirsch",
  description: "How the early church's simple practices can revolutionize modern ministry approaches.",
};

export default function ForgottenWaysMission() {
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
              style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
            >
              Missional DNA
            </span>
            <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
              The Forgotten Ways of Mission
            </h1>
            <p className="text-xl leading-relaxed mb-6" style={{ color: '#444444' }}>
              How the early church's simple practices can revolutionize modern ministry approaches.
            </p>
            <div className="flex items-center gap-4 text-sm" style={{ color: '#444444' }}>
              <span>8 min read</span>
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
              The early Christian movement spread with remarkable speed and effectiveness, transforming the Roman Empire within three centuries. Yet today's church often struggles to make even modest gains in secular societies. What did they know that we've forgotten?
            </p>

            <p className="mb-6">
              After studying apostolic movements for over three decades, I've identified several simple but powerful practices that the early church employed—practices we've largely abandoned in favor of more complex, institutional approaches.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              The DNA of Movement
            </h2>
            
            <p className="mb-6">
              The early church didn't grow through programs or marketing campaigns. It multiplied because it carried what I call "missional DNA"—a set of core elements that naturally reproduced wherever Christians gathered:
            </p>

            <ul className="mb-8 space-y-3">
              <li><strong>Jesus as Lord:</strong> An uncompromising commitment to Jesus as the center of all life and mission</li>
              <li><strong>Disciple Making:</strong> Every believer actively involved in making other disciples</li>
              <li><strong>Missional-Incarnational:</strong> Contextual engagement with their surrounding culture</li>
              <li><strong>Apostolic Environment:</strong> Leadership that pioneered new ground rather than maintaining existing structures</li>
              <li><strong>Organic Systems:</strong> Simple, reproducible forms of church that could multiply naturally</li>
              <li><strong>Communitas:</strong> Deep community forged through shared mission and adversity</li>
            </ul>

            <blockquote className="border-l-4 border-forest bg-stone/30 p-6 my-8 italic text-lg font-display">
              "Complex systems require adaptive leadership rooted in the gospel. The early church succeeded not because they had better programs, but because they had simpler, more reproducible practices."
            </blockquote>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Simplicity as Strategy
            </h2>

            <p className="mb-6">
              One of the most striking differences between the early church and today's institutional Christianity is simplicity. The first-century believers didn't need building committees, multiple staff positions, or complex organizational structures. They met in homes, shared meals, studied scripture together, and actively engaged their neighbors with the gospel.
            </p>

            <p className="mb-6">
              This simplicity wasn't a limitation—it was their strength. Simple forms are more easily reproduced. When persecution scattered the Jerusalem church, believers didn't need to rebuild complex institutions; they simply gathered in new locations and continued the same basic practices.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Every Member a Missionary
            </h2>

            <p className="mb-6">
              Perhaps the most forgotten way of the early church was their understanding that every believer was a missionary. There was no professional class of ministers who did the "real" ministry while others supported them. Instead, the apostles equipped the saints for the work of ministry (Ephesians 4:11-12).
            </p>

            <p className="mb-6">
              This wasn't just theological theory—it was practical necessity. The movement couldn't have spread as it did if it depended on a small number of professional clergy. Every Christian understood they were called to actively participate in God's mission.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Implications for Today
            </h2>

            <p className="mb-6">
              What would it look like to recover these forgotten ways in our context? I don't believe we need to abandon all institutional forms of church, but we do need to rediscover the simple, reproducible practices that can multiply in any context.
            </p>

            <p className="mb-6">
              This might mean:
            </p>

            <ul className="mb-8 space-y-3">
              <li>Prioritizing disciple-making over attendance growth</li>
              <li>Equipping every member for ministry rather than hiring more staff</li>
              <li>Starting simple, reproducible communities alongside existing congregations</li>
              <li>Measuring success by multiplication, not just addition</li>
              <li>Cultivating leaders who pioneer new ground rather than just maintaining existing programs</li>
            </ul>

            <p className="mb-6">
              The gospel hasn't changed, and human nature hasn't fundamentally altered. What worked in the first century can work today—but only if we're willing to rediscover the forgotten ways that made the early church so remarkably effective.
            </p>

            <div 
              className="bg-stone/30 rounded-lg p-8 mt-12 text-center"
            >
              <p className="text-lg mb-4" style={{ color: '#111111' }}>
                Want to explore these concepts further?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/resources"
                  className="bg-forest text-paper px-6 py-3 rounded font-medium hover:bg-forest/90 transition-colors"
                  style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
                >
                  Download Free Resources
                </Link>
                <Link 
                  href="/speaking"
                  className="border border-ink text-ink px-6 py-3 rounded font-medium hover:bg-ink hover:text-paper transition-colors"
                  style={{ borderColor: '#111111', color: '#111111' }}
                >
                  Book Alan to Speak
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
