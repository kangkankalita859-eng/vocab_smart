from fastapi import APIRouter, Query
import json
import os

router = APIRouter()

@router.get("/vocab")
def get_vocab(start: int = Query(0, ge=0), limit: int = Query(None, ge=1)):
    try:
        # Get the path to vocab.json
        current_dir = os.path.dirname(os.path.abspath(__file__))
        vocab_path = os.path.join(current_dir, "..", "data", "english", "vocab.json")
        
        with open(vocab_path, "r", encoding="utf-8") as f:
            vocab_data = json.load(f)
        
        # Apply pagination
        total_count = len(vocab_data)
        end_index = start + limit if limit else total_count
        paginated_data = vocab_data[start:end_index]
        
        return {
            "status": "success",
            "count": len(paginated_data),
            "total": total_count,
            "start": start,
            "limit": limit,
            "data": paginated_data
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to load vocabulary data: {str(e)}"
        }

@router.get("/vocab/{word_id}")
def get_vocab_by_id(word_id: int):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        vocab_path = os.path.join(current_dir, "..", "data", "english", "vocab.json")
        
        with open(vocab_path, "r", encoding="utf-8") as f:
            vocab_data = json.load(f)
        
        word = next((item for item in vocab_data if item["id"] == word_id), None)
        
        if word:
            return {
                "status": "success",
                "data": word
            }
        else:
            return {
                "status": "error",
                "message": f"Word with ID {word_id} not found"
            }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to load vocabulary data: {str(e)}"
        }

