import { getOrCreateIndex } from './pinecone-client.js';
import { generateEmbedding } from './embeddings.js';

/**
 * Retrieve relevant context from Pinecone based on user query
 */
export async function retrieveRelevantContext(query, topK = 5) {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Query Pinecone for similar vectors
    const index = await getOrCreateIndex();
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true,
    });

    // Extract and format the relevant context
    const relevantDocs = queryResponse.matches.map(match => ({
      score: match.score,
      type: match.metadata.type,
      content: match.metadata.content,
      data: match.metadata.data ? JSON.parse(match.metadata.data) : null,
    }));

    return relevantDocs;
  } catch (error) {
    console.error('Error retrieving context:', error);
    throw error;
  }
}

/**
 * Build context string from retrieved documents
 */
export function buildContextString(relevantDocs) {
  if (!relevantDocs || relevantDocs.length === 0) {
    return 'No relevant information found.';
  }

  let context = 'Relevant Information:\n\n';
  
  relevantDocs.forEach((doc, index) => {
    context += `[${index + 1}] (Relevance: ${(doc.score * 100).toFixed(1)}%)\n`;
    context += `Type: ${doc.type}\n`;
    context += `${doc.content}\n\n`;
  });

  return context;
}
