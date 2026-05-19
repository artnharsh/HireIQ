from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity as sklearn_cosine_similarity
import numpy as np

# Load the model into memory once when the service starts
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text: str) -> np.ndarray:
    return model.encode(text)

def cosine_similarity(emb1: np.ndarray, emb2: np.ndarray) -> float:
    # Reshape for sklearn compatibility
    emb1_reshaped = emb1.reshape(1, -1)
    emb2_reshaped = emb2.reshape(1, -1)
    
    # Calculate similarity and return the float value (0.0 to 1.0)
    similarity = sklearn_cosine_similarity(emb1_reshaped, emb2_reshaped)
    return float(similarity[0][0])