from fastapi import APIRouter

router = APIRouter()

@router.get("/vocab")
def get_vocab():
    return {"msg": "Vocab API working"}

