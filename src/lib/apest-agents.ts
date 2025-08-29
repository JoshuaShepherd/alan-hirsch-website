import OpenAI from 'openai';
import { z } from 'zod';

// APEST Agent Configuration Schema
const APESTAgentConfig = z.object({
  agentType: z.enum(['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching']),
  userProfile: z.object({
    apostolic: z.number(),
    prophetic: z.number(),
    evangelistic: z.number(),
    shepherding: z.number(),
    teaching: z.number(),
    primaryGift: z.string(),
    secondaryGift: z.string(),
  }),
  conversationContext: z.array(z.object({
    role: z.enum(['user', 'agent']),
    content: z.string(),
    timestamp: z.date(),
  })),
});

// OpenAI client configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true, // For client-side usage if needed
});

// Tool definitions for function calling
const generateInsightsTool = {
  type: "function" as const,
  function: {
    name: "generate_insights",
    description: "Generate personalized insights based on the conversation with APEST context",
    parameters: {
      type: "object",
      properties: {
        conversationThemes: {
          type: "array",
          items: { type: "string" },
          description: "Key themes discussed in the conversation"
        },
        userReflections: {
          type: "array", 
          items: { type: "string" },
          description: "Personal reflections shared by the user"
        },
        actionPoints: {
          type: "array",
          items: { type: "string" },
          description: "Specific action steps identified"
        },
        agentType: {
          type: "string",
          description: "The APEST agent type (apostolic, prophetic, etc.)"
        }
      },
      required: ["conversationThemes", "userReflections", "actionPoints", "agentType"]
    }
  }
};

const recommendNextAgentTool = {
  type: "function" as const,
  function: {
    name: "recommend_next_agent",
    description: "Recommend connecting with other APEST agents based on conversation themes",
    parameters: {
      type: "object",
      properties: {
        currentTopics: {
          type: "array",
          items: { type: "string" },
          description: "Topics discussed in current conversation"
        },
        userChallenges: {
          type: "array",
          items: { type: "string" },
          description: "Challenges or struggles mentioned by user"
        },
        currentAgentType: {
          type: "string",
          description: "The current APEST agent type"
        }
      },
      required: ["currentTopics", "userChallenges", "currentAgentType"]
    }
  }
};

// Helper function to execute tool calls
async function executeToolCall(toolCall: Record<string, unknown>): Promise<Record<string, unknown> | null> {
  const { name, arguments: args } = (toolCall as { function: { name: string; arguments: string } }).function;
  
  if (name === 'generate_insights') {
    const { conversationThemes, userReflections, actionPoints, agentType } = JSON.parse(args);
    
    const insights = [
      `Key themes explored in ${agentType} conversation: ${conversationThemes.join(', ')}`,
      `Personal reflections: ${userReflections.join('; ')}`,
      `Next steps: ${actionPoints.join(', ')}`,
      `${agentType.charAt(0).toUpperCase() + agentType.slice(1)} growth opportunity identified`,
    ];

    return {
      insights,
      timestamp: new Date().toISOString(),
      agentType,
      summary: `Generated ${insights.length} insights from ${agentType} conversation`,
    };
  }
  
  if (name === 'recommend_next_agent') {
    const { currentTopics, userChallenges, currentAgentType } = JSON.parse(args);
    const agentTypes = ['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'];
    const otherAgents = agentTypes.filter(type => type !== currentAgentType);
    
    // Logic to recommend next agent based on conversation themes
    let recommendation = otherAgents[0]; // Default
    
    if (currentTopics.some((topic: string) => topic.includes('vision') || topic.includes('new'))) {
      recommendation = 'apostolic';
    } else if (currentTopics.some((topic: string) => topic.includes('truth') || topic.includes('justice'))) {
      recommendation = 'prophetic';
    } else if (currentTopics.some((topic: string) => topic.includes('outreach') || topic.includes('story'))) {
      recommendation = 'evangelistic';
    } else if (currentTopics.some((topic: string) => topic.includes('care') || topic.includes('community'))) {
      recommendation = 'shepherding';
    } else if (currentTopics.some((topic: string) => topic.includes('learn') || topic.includes('understand'))) {
      recommendation = 'teaching';
    }

    // If recommended agent is current agent, pick secondary recommendation
    if (recommendation === currentAgentType) {
      recommendation = otherAgents[1] || otherAgents[0];
    }

    return {
      recommendedAgent: recommendation,
      reason: `Based on your conversation themes around ${currentTopics.join(', ')}, a conversation with the ${recommendation} agent could provide valuable perspective.`,
      connectionPoints: findConnectionPoints(currentAgentType, recommendation),
    };
  }
  
  return null;
}

function findConnectionPoints(currentAgent: string, targetAgent: string): string[] {
  const connections: Record<string, Record<string, string[]>> = {
    apostolic: {
      prophetic: ['Vision alignment with God heart', 'Pioneering justice initiatives'],
      evangelistic: ['Starting new outreach approaches', 'Building missional communities'],
      shepherding: ['Establishing caring systems', 'Developing pastoral structures'],
      teaching: ['Creating equipping frameworks', 'Systematic discipleship'],
    },
    prophetic: {
      apostolic: ['Prophetic vision for new territories', 'Discerning God timing for initiatives'],
      evangelistic: ['Prophetic evangelism', 'Speaking truth to culture'],
      shepherding: ['Pastoral prophecy', 'Healing and restoration'],
      teaching: ['Prophetic teaching', 'Illuminating spiritual truths'],
    },
    evangelistic: {
      apostolic: ['Pioneering evangelistic approaches', 'Planting missional communities'],
      prophetic: ['Evangelistic truth-telling', 'Cultural engagement'],
      shepherding: ['Pastoral evangelism', 'Caring outreach'],
      teaching: ['Evangelistic training', 'Storytelling pedagogy'],
    },
    shepherding: {
      apostolic: ['Shepherding pioneers', 'Caring for church planters'],
      prophetic: ['Shepherding prophets', 'Pastoral wisdom for truth-tellers'],
      evangelistic: ['Shepherding evangelists', 'Pastoral support for outreach'],
      teaching: ['Teaching shepherds', 'Pastoral education'],
    },
    teaching: {
      apostolic: ['Teaching apostles', 'Educational pioneering'],
      prophetic: ['Teaching prophets', 'Educational prophecy'],
      evangelistic: ['Teaching evangelists', 'Educational outreach'],
      shepherding: ['Teaching shepherds', 'Pastoral education'],
    },
  };

  return connections[currentAgent]?.[targetAgent] || ['General ministry collaboration'];
}

export class APESTAgent {
  private agentType: string;
  private userProfile: Record<string, unknown>;
  private conversationHistory: OpenAI.Chat.ChatCompletionMessageParam[] = [];
  private systemPrompt: string;

  constructor(agentType: string, userProfile: Record<string, unknown>) {
    this.agentType = agentType;
    this.userProfile = userProfile;
    this.systemPrompt = this.generateSystemPrompt(agentType, userProfile);
  }

  private generateSystemPrompt(agentType: string, profile: Record<string, unknown>): string {
    const basePrompt = `You are an AI agent embodying the ${agentType} aspect of APEST/Fivefold ministry, trained on Alan Hirsch's extensive work on missional church leadership. You're having a deeply personal conversation with someone whose APEST assessment shows a ${agentType} score of ${profile[agentType] || 0}%.

Your role is to:
1. Engage in authentic, caring conversation about their calling
2. Help them understand their ${agentType} gifting more deeply  
3. Provide practical wisdom for living out this calling
4. Ask insightful questions that lead to personal breakthrough
5. Share relevant stories and examples from missional church contexts

Their full APEST profile:
- Apostolic: ${profile.apostolic}%
- Prophetic: ${profile.prophetic}%  
- Evangelistic: ${profile.evangelistic}%
- Shepherding: ${profile.shepherding}%
- Teaching: ${profile.teaching}%

Primary Gift: ${profile.primaryGift}
Secondary Gift: ${profile.secondaryGift}

Remember to:
- Be conversational and warm, not clinical or robotic
- Ask open-ended questions that encourage reflection
- Share practical examples and real-world applications
- Help them see how their gifting connects to their life context
- Encourage them while also challenging them to grow
- Use tools when appropriate to generate insights or recommend next steps`;

    const specificGuidance = {
      apostolic: `

As the Apostolic Pathfinder, you embody:
- Visionary leadership that sees untapped potential
- Pioneer spirit that breaks new ground
- Systems thinking that establishes lasting foundations
- Risk-taking faith that ventures into unknown territory
- Entrepreneurial heart that starts movements

Focus on helping them:
- Identify new territories God is calling them to pioneer
- Develop their capacity to see and seize opportunities
- Build systems and structures that will outlast them
- Navigate the loneliness and challenges of pioneering
- Connect with other apostolic leaders for mutual support

Conversation starters:
- "What new thing is stirring in your heart that doesn't exist yet?"
- "Where do you see untapped potential in your sphere of influence?"
- "What barriers are you feeling called to break through?"`,

      prophetic: `

As the Prophetic Voice, you embody:
- Spiritual discernment that sees beneath the surface
- Truth-telling courage that speaks what others avoid
- Justice passion that calls out misalignment
- Intercession heart that stands in the gap
- Reform vision that calls things back to God design

Focus on helping them:
- Develop their spiritual sensitivity and discernment
- Learn to speak truth with grace and timing
- Channel their passion for justice constructively  
- Practice listening prayer and intercession
- Navigate the tension between prophetic edge and pastoral care

Conversation starters:
- "What is God heart telling you about your current situation?"
- "Where do you sense misalignment with God design around you?"
- "What truth is burning in your heart that needs to be spoken?"`,

      evangelistic: `

As the Evangelistic Bridge, you embody:
- Relational magnetism that connects with outsiders
- Cultural sensitivity that speaks relevant language
- Story-telling gift that shares hope naturally
- Advocacy heart that champions the marginalized
- Network-building ability that creates connections

Focus on helping them:
- Build authentic relationships with those far from God
- Share their faith story in compelling ways
- Engage culture without compromising truth
- Create bridges between church and community
- Develop their unique evangelistic style and approach

Conversation starters:
- "Who in your network is far from God but close to you?"
- "What is your story of finding hope that others need to hear?"
- "How can you build authentic bridges to your community?"`,

      shepherding: `

As the Shepherding Heart, you embody:
- Pastoral care that creates emotional safety
- Wisdom that guides people through life challenges  
- Empathy that deeply understands human pain
- Patience that walks with people through process
- Community-building gift that creates belonging

Focus on helping them:
- Develop healthy boundaries while maintaining care
- Learn to shepherd without enabling dependence
- Create environments where people can grow
- Balance truth and grace in difficult conversations
- Build sustainable rhythms for long-term ministry

Conversation starters:
- "Who in your life needs your care and attention right now?"
- "How do you create belonging for those who feel excluded?"
- "What does healthy spiritual growth look like in your context?"`,

      teaching: `

As the Teaching Guide, you embody:
- Wisdom that illuminates complex truths
- Clarity that makes difficult concepts understandable
- Patience that meets people where they are
- Systematic thinking that builds comprehensive understanding
- Equipping heart that develops others capacity

Focus on helping them:
- Develop their unique teaching voice and style
- Learn to connect truth to real-life application
- Create learning environments that foster growth
- Balance content delivery with relational connection
- Identify and develop other emerging teachers

Conversation starters:
- "What deep truth are you wrestling with that others need to understand?"
- "How do you help people connect learning to real life?"
- "Who are you already teaching informally that could be developed?"`,
    };

    return basePrompt + (specificGuidance[agentType as keyof typeof specificGuidance] || '');
  }

  async sendMessage(userMessage: string): Promise<{
    response: string;
    insights?: Record<string, unknown> | null;
    recommendations?: Record<string, unknown> | null;
    toolResults?: Record<string, unknown>[];
  }> {
    // Add user message to conversation history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
    });

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: this.systemPrompt },
          ...this.conversationHistory,
        ],
        tools: [generateInsightsTool, recommendNextAgentTool],
        tool_choice: 'auto',
        temperature: 0.7,
        max_tokens: 2000,
      });

      const message = completion.choices[0]?.message;
      if (!message) {
        throw new Error('No response from OpenAI');
      }

      // Add assistant response to history
      this.conversationHistory.push(message);

      let insights, recommendations;
      const toolResults: Record<string, unknown>[] = [];

      // Handle tool calls if any
      if (message.tool_calls) {
        for (const toolCall of message.tool_calls) {
          const result = await executeToolCall(toolCall as unknown as Record<string, unknown>);
          toolResults.push({ toolName: (toolCall as { function: { name: string } }).function.name, result });
          
          if ((toolCall as { function: { name: string } }).function.name === 'generate_insights') {
            insights = result;
          } else if ((toolCall as { function: { name: string } }).function.name === 'recommend_next_agent') {
            recommendations = result;
          }
        }
      }

      return {
        response: message.content || 'I understand. Let me think about that...',
        insights,
        recommendations,
        toolResults,
      };
    } catch (error) {
      console.error('Error in APEST agent conversation:', error);
      return {
        response: "I apologize, but I'm having trouble connecting right now. Could you try again?",
      };
    }
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  clearHistory() {
    this.conversationHistory = [];
  }
}

// Factory function to create APEST agents
export function createAPESTAgent(agentType: string, userProfile: Record<string, unknown>): APESTAgent {
  return new APESTAgent(agentType, userProfile);
}

// Enhanced conversation runner with APEST context
export async function runAPESTConversation(
  agentType: string, 
  userProfile: Record<string, unknown>, 
  userMessage: string,
  conversationHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = []
) {
  const agent = new APESTAgent(agentType, userProfile);
  
  // Restore conversation history if provided
  conversationHistory.forEach(msg => {
    agent.getConversationHistory().push(msg);
  });

  try {
    const result = await agent.sendMessage(userMessage);
    return {
      success: true,
      ...result,
    };
  } catch (error) {
    console.error('Error in APEST conversation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Voice agent configuration for real-time conversations
export const createAPESTVoiceAgent = (agentType: string, userProfile: Record<string, unknown>) => {
  const agent = new APESTAgent(agentType, userProfile);
  
  return {
    agent,
    voiceConfig: {
      voice: 'alloy' as const,
      model: 'tts-1' as const,
      temperature: 0.7,
      maxTokens: 150,
      presencePenalty: 0.1,
      frequencyPenalty: 0.1,
    },
    conversationSettings: {
      turnDetection: 'server_vad' as const,
      inputAudioTranscription: {
        model: 'whisper-1'
      },
    }
  };
};
