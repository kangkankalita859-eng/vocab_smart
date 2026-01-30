from fastapi import APIRouter
import json
from pathlib import Path

router = APIRouter()

DATA_PATH = Path(__file__).parent.parent / "data" / "vocab.json"

@router.get("/vocab")
def get_vocab(start: int = 0, limit: int = 10):
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    return data[start : start + limit]



from fastapi import UploadFile, File
import shutil
from app.utils.ocr import extract_text, parse_vocab
from pathlib import Path
import json

UPLOAD_DIR = Path("app/uploads")
DATA_PATH = Path("app/data/vocab.json")

@router.post("/upload-image")
async def upload_vocab_image(file: UploadFile = File(...)):
    image_path = UPLOAD_DIR / file.filename

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(image_path)
    new_words = parse_vocab(text)

    with open(DATA_PATH, "r+", encoding="utf-8") as f:
        data = json.load(f)
        data.extend(new_words)
        f.seek(0)
        json.dump(data, f, ensure_ascii=False, indent=2)

    return {
        "added": len(new_words),
        "words": new_words
    }
