from fastapi import APIRouter, Query
import json
import os

router = APIRouter()

@router.get("/idioms")
def get_idioms(start: int = Query(0, ge=0), limit: int = Query(None, ge=1)):
    try:
        # Get the path to idioms.json
        current_dir = os.path.dirname(os.path.abspath(__file__))
        idioms_path = os.path.join(current_dir, "..", "data", "english", "idioms.json")
        
        with open(idioms_path, "r", encoding="utf-8") as f:
            idioms_data = json.load(f)
        
        # Filter by ID instead of array slicing
        if start > 0:
            filtered_data = [item for item in idioms_data if item["id"] >= start]
        else:
            filtered_data = idioms_data
        
        # Apply limit to filtered data
        if limit:
            paginated_data = filtered_data[:limit]
        else:
            paginated_data = filtered_data
        
        return {
            "status": "success",
            "count": len(paginated_data),
            "total": len(idioms_data),
            "start": start,
            "limit": limit,
            "data": paginated_data
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to load idioms data: {str(e)}"
        }

@router.get("/idioms/{idiom_id}")
def get_idiom_by_id(idiom_id: int):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        idioms_path = os.path.join(current_dir, "..", "data", "english", "idioms.json")
        
        with open(idioms_path, "r", encoding="utf-8") as f:
            idioms_data = json.load(f)
        
        idiom = next((item for item in idioms_data if item["id"] == idiom_id), None)
        
        if idiom:
            return {
                "status": "success",
                "data": idiom
            }
        else:
            return {
                "status": "error",
                "message": f"Idiom with ID {idiom_id} not found"
            }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to load idioms data: {str(e)}"
        }
