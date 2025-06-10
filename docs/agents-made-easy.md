# Agents Made Easy - CopilotKit Sales Bot with Generative UI

## Overview
This is a powerful demo showcasing CopilotKit's generative UI capabilities integrated with your Claude-powered sales bot. The interface dynamically generates interactive components based on conversation context.

## Live Demo
Visit: https://www.instabids.ai/agents-made-easy

## Features
- **Dynamic Pricing Tables**: Automatically appears when discussing pricing
- **Booking Calendar**: Shows available demo slots when users want to book
- **Progress Indicators**: Displays implementation timeline visually
- **ROI Calculator**: Interactive calculator for showing potential savings

## Setup Instructions

### 1. Environment Variables
**CRITICAL**: You must add the `OPENAI_API_KEY` to Vercel:

1. Go to your Vercel dashboard
2. Select the `insta-bids-liberate` project
3. Go to Settings → Environment Variables
4. Add: `OPENAI_API_KEY` with your OpenAI API key
5. Redeploy the project

Note: CopilotKit uses OpenAI for UI generation logic only. Your actual bot responses still come from your Claude API.

### 2. Local Development
```bash
# Install dependencies
npm install

# Add to .env file
OPENAI_API_KEY=your_key_here

# Run development server
npm run dev
```

## How It Works

### Architecture
1. **Frontend** (`/src/pages/tools/AgentsMadeEasy.tsx`):
   - Uses CopilotKit React components
   - Registers actions for dynamic UI generation
   - Monitors chat messages for trigger phrases

2. **Serverless Function** (`/api/agents-made-easy.ts`):
   - Uses CopilotKit Runtime with OpenAI adapter
   - Forwards messages to your Claude sales bot
   - Enhances responses with UI trigger phrases

3. **Sales Bot API** (DigitalOcean):
   - Your existing Claude-powered bot
   - Handles all business logic and responses
   - No changes needed to your bot!

### Trigger Phrases
The system watches for these keywords to generate UI:
- **Pricing**: "pricing", "plans", "cost"
- **Demo**: "demo", "book", "meeting"
- **Timeline**: "implementation", "timeline", "process"
- **ROI**: "roi", "calculator", "savings"

## Testing the Features
Try these prompts in the chat:
1. "What are your pricing plans?"
2. "I'd like to book a demo"
3. "What's the implementation process?"
4. "Can you calculate ROI for my business?"

## Customization

### Adding New UI Components
1. Create the component in the TSX file
2. Register a new action with `useCopilotAction`
3. Add trigger logic in the `useEffect` hook
4. Update the serverless function to enhance responses

### Styling
- Uses Tailwind CSS for styling
- Framer Motion for animations
- Fully responsive design

## Troubleshooting

### Empty Page / No Response
- Check if `OPENAI_API_KEY` is set in Vercel
- Verify the sales bot API is responding
- Check browser console for errors

### UI Not Generating
- Ensure trigger phrases are in the bot's response
- Check that actions are properly registered
- Verify the message monitoring logic

### API Errors
- Check Vercel function logs
- Ensure CORS headers are correct
- Verify the sales bot endpoint is accessible

## Next Steps
- Add more interactive components
- Implement user interaction tracking
- Create industry-specific UI variations
- Add A/B testing for different UI patterns

## Support
For issues or questions:
- Check Vercel deployment logs
- Review browser console errors
- Test with the local development server first
