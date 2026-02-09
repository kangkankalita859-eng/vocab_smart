from fastapi import APIRouter, HTTPException, status
from pydantic import EmailStr
import json
import os
from datetime import datetime
from models.user import User, UserLogin, UserResponse, UserProgress

router = APIRouter()

# Simple in-memory user storage (in production, use a proper database)
USERS_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "users.json")
PROGRESS_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "user_progress.json")

def load_users():
    try:
        if os.path.exists(USERS_FILE):
            with open(USERS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
    except:
        pass
    return {}

def save_users(users):
    os.makedirs(os.path.dirname(USERS_FILE), exist_ok=True)
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, indent=2, default=str)

def load_progress():
    try:
        if os.path.exists(PROGRESS_FILE):
            with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
    except:
        pass
    return {}

def save_progress(progress):
    os.makedirs(os.path.dirname(PROGRESS_FILE), exist_ok=True)
    with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
        json.dump(progress, f, indent=2, default=str)

@router.post("/login")
def login(user_data: UserLogin):
    users = load_users()
    email = user_data.email
    
    if email not in users:
        # Create new user
        new_user = {
            "id": len(users) + 1,
            "email": email,
            "name": email.split("@")[0],  # Use email prefix as name
            "created_at": datetime.now().isoformat(),
            "last_login": datetime.now().isoformat()
        }
        users[email] = new_user
        save_users(users)
        
        # Initialize progress for new user
        progress = load_progress()
        progress[str(new_user["id"])] = {
            "user_id": new_user["id"],
            "vocab_known": [],
            "vocab_unknown": [],
            "idioms_known": [],
            "idioms_unknown": [],
            "updated_at": datetime.now().isoformat()
        }
        save_progress(progress)
        
        return {
            "status": "success",
            "message": "User created and logged in successfully",
            "user": new_user
        }
    else:
        # Update last login
        users[email]["last_login"] = datetime.now().isoformat()
        save_users(users)
        
        return {
            "status": "success", 
            "message": "User logged in successfully",
            "user": users[email]
        }

@router.get("/user/{user_id}")
def get_user(user_id: int):
    users = load_users()
    for email, user in users.items():
        if user["id"] == user_id:
            return {
                "status": "success",
                "user": user
            }
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
    )

@router.get("/progress/{user_id}")
def get_user_progress(user_id: int):
    progress = load_progress()
    user_progress = progress.get(str(user_id))
    
    if not user_progress:
        return {
            "status": "success",
            "progress": {
                "user_id": user_id,
                "vocab_known": [],
                "vocab_unknown": [],
                "idioms_known": [],
                "idioms_unknown": [],
                "updated_at": datetime.now().isoformat()
            }
        }
    
    return {
        "status": "success",
        "progress": user_progress
    }

@router.post("/progress/{user_id}")
def update_user_progress(user_id: int, progress_data: UserProgress):
    progress = load_progress()
    
    progress[str(user_id)] = {
        "user_id": user_id,
        "vocab_known": progress_data.vocab_known,
        "vocab_unknown": progress_data.vocab_unknown,
        "idioms_known": progress_data.idioms_known,
        "idioms_unknown": progress_data.idioms_unknown,
        "updated_at": datetime.now().isoformat()
    }
    
    save_progress(progress)
    
    return {
        "status": "success",
        "message": "Progress updated successfully"
    }
