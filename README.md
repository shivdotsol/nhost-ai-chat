# nhost-ai-chat

## Overview
`nhost-ai-chat` is a real-time chat application with AI-powered responses, built using Nhost (with Hasura), n8n, OpenRouter, and a React frontend. Users can send messages, receive AI-generated replies, and view chat history seamlessly. The app leverages Nhost for authentication and database management, n8n for workflow automation, and OpenRouter for AI capabilities.

## Features
- Real-time messaging with WebSocket subscriptions.
- AI-powered responses using the `meta-llama/llama-3-8b-instruct-free` model.
- User authentication via Nhost.
- Responsive React frontend deployed on Netlify.
- Backend integration with Hasura for GraphQL and n8n for AI processing.

## Technologies Used
- **Frontend**: React, Apollo Client, @nhost/react
- **Backend**: Nhost (Hasura, PostgreSQL), n8n
- **AI**: OpenRouter API
- **Deployment**: Netlify (frontend), Nhost (backend), n8n Cloud
- **Authentication**: Nhost Auth (JWT)

## Setup and Installation

### Prerequisites
- Node.js (LTS version, e.g., 16.x or 18.x)
- npm or yarn
- Nhost account (for backend and auth)
- n8n Cloud account (for workflows)
- OpenRouter API key (free tier available)

### Local Development
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/nhost-ai-chat.git
   cd nhost-ai-chat
2. **Install Dependencies**
    ```bash
    npm install
3. **Configure Env Variables**
    ```bash
    VITE_REACT_APP_NHOST_SUBDOMAIN="your_nhost_subdomain_here"
4. **Run Locally**
    ```bash
    npm run start

### Backend and Workflow
- **Hasura Schema**: Managed via Nhost Console with the following tables:
  - `chats`: Stores chat metadata (e.g., `id`, `user_id`).
  - `messages`: Stores chat messages (e.g., `id`, `chat_id`, `content`, `is_ai`, `created_at`).
- **n8n Workflow**: Deployed on a cloud instance at `https://shiwliwt.app.n8n.cloud/webhook/[your-webhook-id]`.
  - **Webhook Trigger**: Initiated by the Hasura `sendMessage` action.
  - **Process**:
    1. Validates user ownership of `chat_id` using a GraphQL query (`CheckOwnership`).
    2. Calls OpenRouter API with the user’s message using the `meta-llama/llama-3-8b-instruct-free` model.
    3. Inserts the AI response into the `messages` table via a Hasura mutation (`InsertAIResponse`).
  - **Nodes Used**: Webhook, HTTP Request (Hasura, OpenRouter), Set nodes for data transformation.
- **Hasura Action**: `sendMessage` configured to:
  - Accept `chat_id` and `content` as inputs.
  - Forward the request to the n8n webhook URL.
  - Return the AI `reply` (optional, handled via subscription in the frontend).