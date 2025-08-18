import { gql } from "@apollo/client";

export const GET_CHAT = gql`
    query GetChat($chatId: uuid!) {
        chats_by_pk(id: $chatId) {
            id
            title
            user_id
            created_at
        }
    }
`;

export const GET_MESSAGES = gql`
    query GetMessages($chatId: uuid!) {
        messages(
            where: { chat_id: { _eq: $chatId } }
            order_by: { created_at: asc }
        ) {
            id
            content
            is_bot
            created_at
            chat_id
        }
    }
`;

export const SUBSCRIBE_TO_MESSAGES = gql`
    subscription SubscribeToMessages($chatId: uuid!) {
        messages(
            where: { chat_id: { _eq: $chatId } }
            order_by: { created_at: asc }
        ) {
            id
            content
            is_bot
            created_at
            chat_id
        }
    }
`;

export const INSERT_MESSAGE = gql`
    mutation InsertMessage(
        $content: String!
        $chat_id: uuid!
        $isBot: Boolean!
    ) {
        insert_messages_one(
            object: { content: $content, chat_id: $chat_id, is_bot: $isBot }
        ) {
            id
            content
            is_bot
            created_at
            chat_id
        }
    }
`;
