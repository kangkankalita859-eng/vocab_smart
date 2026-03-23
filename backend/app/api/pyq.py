from fastapi import APIRouter, Query
import json
import os

router = APIRouter()

@router.get("/pyq")
def get_pyq(subject: str = Query(None), topic: str = Query(None), start: int = Query(0, ge=0), limit: int = Query(None, ge=1)):
    try:
        # Get the path to pyq.json - use subject-specific folders
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        if subject and topic:
            # Look in subject/topic specific folder
            pyq_path = os.path.join(current_dir, "..", "data", subject.lower(), topic.lower().replace(" ", "-"), "pyq.json")
        else:
            # Use general pyq.json
            pyq_path = os.path.join(current_dir, "..", "data", "pyq.json")
        
        with open(pyq_path, "r", encoding="utf-8") as f:
            pyq_data = json.load(f)
        
        # Filter by subject and topic if provided
        filtered_data = pyq_data
        if subject:
            filtered_data = [item for item in filtered_data if item["subject"].lower() == subject.lower()]
        if topic:
            filtered_data = [item for item in filtered_data if item["topic"].lower() == topic.lower()]
        
        # Apply pagination
        total_count = len(filtered_data)
        end_index = start + limit if limit else total_count
        paginated_data = filtered_data[start:end_index]
        
        return {
            "status": "success",
            "count": len(paginated_data),
            "total": total_count,
            "start": start,
            "limit": limit,
            "subject": subject,
            "topic": topic,
            "data": paginated_data
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to load PYQ data: {str(e)}"
        }

@router.get("/pyq/{question_id}")
def get_pyq_by_id(question_id: int):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        pyq_path = os.path.join(current_dir, "..", "data", "pyq.json")
        
        with open(pyq_path, "r", encoding="utf-8") as f:
            pyq_data = json.load(f)
        
        question = next((item for item in pyq_data if item["id"] == question_id), None)
        
        if question:
            return {
                "status": "success",
                "data": question
            }
        else:
            return {
                "status": "error",
                "message": f"Question with ID {question_id} not found"
            }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to load PYQ data: {str(e)}"
        }
