from fastapi import APIRouter
import json
import os

router = APIRouter()

@router.get("/vocab")
def get_vocab():
    try:
        # Get the path to vocab.json
        current_dir = os.path.dirname(os.path.abspath(__file__))
        vocab_path = os.path.join(current_dir, "..", "data", "vocab.json")
        
        with open(vocab_path, "r", encoding="utf-8") as f:
            vocab_data = json.load(f)
        
        return {
            "status": "success",
            "count": len(vocab_data),
            "data": vocab_data
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
        vocab_path = os.path.join(current_dir, "..", "data", "vocab.json")
        
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

