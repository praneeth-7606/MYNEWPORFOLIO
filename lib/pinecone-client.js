import { Pinecone } from '@pinecone-database/pinecone';

let pineconeClient = null;

export async function getPineconeClient() {
  if (pineconeClient) {
    return pineconeClient;
  }

  pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  return pineconeClient;
}

export async function getOrCreateIndex(indexName = 'portfolio-rag') {
  const client = await getPineconeClient();
  
  try {
    // Check if index exists
    const indexes = await client.listIndexes();
    const indexExists = indexes.indexes?.some(index => index.name === indexName);
    
    if (!indexExists) {
      console.log(`Creating index: ${indexName}`);
      await client.createIndex({
        name: indexName,
        dimension: 768, // Gemini text-embedding-004 dimension
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1'
          }
        }
      });
      
      // Wait for index to be ready
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
    
    return client.index(indexName);
  } catch (error) {
    console.error('Error with Pinecone index:', error);
    throw error;
  }
}
