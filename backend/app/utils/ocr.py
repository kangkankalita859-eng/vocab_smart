import pytesseract
from PIL import Image
import re

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text(image_path):
    img = Image.open(image_path).convert("RGB")
    text = pytesseract.image_to_string(img, lang="eng+hin")
    return text

def parse_vocab(text):
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    vocab = []

    i = 0
    while i + 2 < len(lines):
        english_phrase = lines[i]
        one_word = lines[i + 1]
        hindi = lines[i + 2]

        # clean one-word column
        word = one_word.split("(")[0].strip()

        vocab.append({
            "word": word,
            "hindiMeaning": hindi,
            "meaning": english_phrase
        })

        i += 3

    return vocab



