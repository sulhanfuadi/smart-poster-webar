import { appConfig, chatbotContent } from '../config/content';

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, ' ')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function createMessage(role, text, meta = {}) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
    meta,
  };
}

function matchLocalFaq(question) {
  const normalizedQuestion = normalizeText(question);
  if (!normalizedQuestion) return null;

  return (
    chatbotContent.faq.find((entry) => {
      const inQuestion = entry.intents.some((intent) => normalizedQuestion.includes(intent));
      const inPrompt = normalizeText(entry.question).includes(normalizedQuestion);
      return inQuestion || inPrompt;
    }) || null
  );
}

function getLocalReply(question, meta = {}) {
  const match = matchLocalFaq(question);
  if (!match) {
    return createMessage('assistant', chatbotContent.fallbackResponse, { source: 'fallback', ...meta });
  }

  return createMessage('assistant', match.answer, {
    source: 'faq',
    faqId: match.id,
    matchedQuestion: match.question,
    ...meta,
  });
}

function createTimeoutSignal(timeoutMs) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    clear() {
      window.clearTimeout(timeout);
    },
  };
}

async function getRemoteReply(question) {
  const endpoint = chatbotContent.integration.endpoint;
  if (!endpoint) {
    return getLocalReply(question, { source: 'remote-ready-fallback', reason: 'missing-endpoint' });
  }

  const { signal, clear } = createTimeoutSignal(
    chatbotContent.integration.timeoutMs || appConfig.runtime.chatbotRequestTimeoutMs,
  );

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal,
    });

    clear();

    if (!response.ok) {
      throw new Error(`Remote chatbot failed with status ${response.status}`);
    }

    const payload = await response.json();
    if (!payload?.answer) {
      throw new Error('Remote chatbot returned invalid payload');
    }

    return createMessage('assistant', payload.answer, {
      source: payload.source || 'remote',
      matchedQuestion: payload.matchedQuestion || '',
      endpoint,
    });
  } catch (error) {
    clear();
    return getLocalReply(question, {
      source: 'remote-ready-fallback',
      reason: error.name === 'AbortError' ? 'timeout' : 'request-failed',
      endpoint,
    });
  }
}

export function createInitialMessages() {
  return [
    createMessage('assistant', chatbotContent.greeting, {
      source: 'greeting',
      mode: chatbotContent.mode,
      providerLabel: chatbotContent.providerLabel,
    }),
  ];
}

export async function getChatbotReply(question) {
  if (chatbotContent.mode === 'remote') {
    return getRemoteReply(question);
  }

  return getLocalReply(question);
}
