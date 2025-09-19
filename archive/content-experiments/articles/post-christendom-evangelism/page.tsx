import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Evangelism in a Post-Christendom Context - Alan Hirsch",
  description: "Rethinking how we share the gospel in secular, post-Christian societies.",
  keywords: "evangelism, post-Christendom, secular society, gospel, mission, church planting"
};

export default function PostChristendomEvangelism() {
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
              style={{ backgroundColor: '#1890FF', color: '#F8F8F6' }}
            >
              Evangelism
            </span>
            <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
              Evangelism in a Post-Christendom Context
            </h1>
            <p className="text-xl leading-relaxed mb-6" style={{ color: '#444444' }}>
              Rethinking how we share the gospel in secular, post-Christian societies where traditional approaches no longer connect.
            </p>
            <div className="flex items-center gap-4 text-sm" style={{ color: '#444444' }}>
              <span>7 min read</span>
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
              The evangelistic methods that worked in Christendom—when society shared Christian assumptions about 
              God, morality, and truth—are largely ineffective in our current post-Christian landscape.
            </p>

            <p className="mb-6">
              This isn't a failure of the gospel; it's a failure to adapt our methods to our mission context. 
              The early church faced a similar challenge in the pagan Roman world, and their approach offers 
              us a better model than the Christendom era ever could.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              The Christendom Legacy
            </h2>

            <p className="mb-6">
              For over a millennium, the church operated in a context where Christian assumptions undergirded 
              society. People understood concepts like sin, salvation, and eternal judgment because these were 
              part of the cultural air they breathed.
            </p>

            <p className="mb-6">
              Our evangelistic methods evolved in this context: crusades, altar calls, tract distribution, and 
              door-to-door witnessing all assumed a baseline of Christian knowledge and respect for biblical 
              authority. But that baseline no longer exists.
            </p>

            <blockquote className="border-l-4 pl-6 my-8 italic text-lg" style={{ borderColor: '#1D4A38', color: '#444444' }}>
              "We are not in Kansas anymore, Dorothy. The world has fundamentally changed, and our evangelistic 
              methods must change with it."
            </blockquote>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              The Post-Christendom Reality
            </h2>

            <p className="mb-4">Today's context presents unique challenges:</p>

            <ul className="mb-6 space-y-2">
              <li><strong>Spiritual pluralism:</strong> Multiple truth claims compete for attention</li>
              <li><strong>Institutional distrust:</strong> Skepticism toward organized religion</li>
              <li><strong>Biblical illiteracy:</strong> Most people lack basic biblical knowledge</li>
              <li><strong>Experiential preference:</strong> People value personal experience over propositional truth</li>
              <li><strong>Relational gatekeeping:</strong> Trust must be earned before truth can be shared</li>
            </ul>

            <p className="mb-6">
              In this environment, walking up to a stranger and asking, "If you died tonight, do you know where 
              you'd spend eternity?" is more likely to end conversations than start them.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Learning from the Early Church
            </h2>

            <p className="mb-6">
              The apostolic church didn't rely on mass evangelistic events or confrontational witness. Instead, 
              they employed what we might call "incarnational evangelism"—embodying the gospel in ways that 
              attracted people to Jesus.
            </p>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              1. Community as Witness
            </h3>
            <p className="mb-6">
              The early Christians' radical love for one another was their primary evangelistic tool. Jesus said, 
              "By this everyone will know that you are my disciples, if you love one another" (John 13:35). 
              Their counter-cultural community life raised questions that opened doors for gospel conversations.
            </p>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              2. Presence Before Proclamation
            </h3>
            <p className="mb-6">
              Paul spent extensive time in communities before preaching. He worked alongside people, shared 
              meals, and built relationships. When he finally spoke about Jesus, people listened because they 
              trusted the messenger.
            </p>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              3. Meeting Felt Needs
            </h3>
            <p className="mb-6">
              The early church didn't just preach; they cared for widows, fed the hungry, and welcomed outcasts. 
              Their actions demonstrated the kingdom before their words proclaimed it.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Practical Approaches for Today
            </h2>

            <div className="mb-8 space-y-6">
              <div className="p-6 rounded-lg" style={{ backgroundColor: '#E8F5E8' }}>
                <h3 className="font-display text-lg font-semibold mb-3" style={{ color: '#1D4A38' }}>
                  Cultivate Curiosity
                </h3>
                <p className="mb-2">
                  Instead of providing answers to unasked questions, live in ways that provoke questions. 
                  Let your joy, generosity, and hope be so evident that people ask about the source.
                </p>
                <p className="text-sm italic">
                  "Always be prepared to give an answer to everyone who asks you to give the reason for 
                  the hope that you have" (1 Peter 3:15).
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: '#FFF4E6' }}>
                <h3 className="font-display text-lg font-semibold mb-3" style={{ color: '#B2613E' }}>
                  Serve Without Strings
                </h3>
                <p className="mb-2">
                  Engage in community service, social justice, and care for creation not as evangelistic 
                  bait, but as authentic expressions of God's heart for the world.
                </p>
                <p className="text-sm italic">
                  When people see Christians caring about what they care about, barriers come down.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: '#E6F7FF' }}>
                <h3 className="font-display text-lg font-semibold mb-3" style={{ color: '#1890FF' }}>
                  Tell Stories, Not Arguments
                </h3>
                <p className="mb-2">
                  Share your story and God's story through narrative rather than proposition. Stories 
                  connect with hearts before they engage minds.
                </p>
                <p className="text-sm italic">
                  Jesus was history's greatest storyteller, and his parables still resonate today.
                </p>
              </div>
            </div>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              The Long View of Evangelism
            </h2>

            <p className="mb-6">
              Post-Christendom evangelism requires patience. Conversion is often a long process involving 
              multiple encounters with Christians over extended periods. Our role is to be faithful 
              witnesses in our sphere of influence, trusting the Holy Spirit to draw people to himself.
            </p>

            <p className="mb-6">
              This doesn't mean being passive or avoiding direct gospel conversations. It means earning 
              the right to be heard and speaking into receptive hearts rather than resistant minds.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              A Return to Apostolic Simplicity
            </h2>

            <p className="mb-6">
              The future of evangelism isn't found in more sophisticated methods or better arguments. 
              It's found in returning to the apostolic pattern: authentic Christian community that 
              embodies the gospel, builds relationships, and speaks truth in love when hearts are ready.
            </p>

            <p className="mb-6">
              In a post-Christendom world, the most radical thing we can do is be genuinely Christian—
              living as Jesus lived, loving as Jesus loved, and trusting the Spirit to do what only 
              the Spirit can do: open blind eyes and soften hard hearts.
            </p>

            <div className="p-6 rounded-lg mt-8" style={{ backgroundColor: '#E3E3E0' }}>
              <h3 className="font-display text-lg font-semibold mb-4" style={{ color: '#111111' }}>
                Reflection Questions
              </h3>
              <ul className="space-y-2">
                <li>• How is your Christian community provoking questions from outsiders?</li>
                <li>• What barriers have you unknowingly erected to gospel conversations?</li>
                <li>• How can you serve your community without expecting anything in return?</li>
                <li>• What story is your life telling about the goodness of God?</li>
              </ul>
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
                APEST
              </span>
              <h3 className="font-display text-lg font-semibold mb-3">
                <Link href="/articles/apest-leadership-teams" className="hover:underline">
                  Building APEST Leadership Teams
                </Link>
              </h3>
              <p className="text-sm mb-3" style={{ color: '#444444' }}>
                Practical steps to implement the five-fold ministry in your church leadership structure.
              </p>
              <span className="text-sm" style={{ color: '#444444' }}>6 min read</span>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
