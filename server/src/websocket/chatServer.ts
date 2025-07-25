import { WebSocketServer } from 'ws';
import { Server } from 'http';
import OpenAIService from '../services/openai/openaiService';
import { logger } from '../utils/logger';

export function setupChatServer(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws/chat' });

  wss.on('connection', (ws) => {
    ws.on('message', async (data) => {
      const text = data.toString();
      try {
        const reply = await OpenAIService.chat([{ role: 'user', content: text }]);
        ws.send(reply);
      } catch (err) {
        logger.error('Chat error', err);
        ws.send('Error processing message');
      }
    });
  });

  logger.info('WebSocket chat server running');
}
