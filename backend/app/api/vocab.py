from fastapi import APIRouter

router = APIRouter()

@router.get("/vocab")
def get_vocab():
    return {"message": "Vocab endpoint working"}
