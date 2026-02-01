def extract_text(image_path):
    """Mock implementation of extract_text that returns sample data"""
    print("Warning: OCR functionality is currently disabled. Using sample data.")
    return """Hello
hello
नमस्ते
How are you?
how
कैसे हो
"""

def parse_vocab(text):
    """Parse vocabulary from text with English and Hindi translations"""
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



