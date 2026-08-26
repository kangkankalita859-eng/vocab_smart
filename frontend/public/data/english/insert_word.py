# PS D:\new_vocab_app> cd vocab_smart/frontend/public/data/english
# PS D:\new_vocab_app\vocab_smart\frontend\public\data\english> python insert_word.py

import json

# JSON file name
FILE_NAME = "vocab.json"

# Load JSON
with open(FILE_NAME, "r", encoding="utf-8") as f:
    words = json.load(f)

# ------------------------
# Enter new word details
# ------------------------

new_word = {
    "word": input("Word: "),
    "hindiMeaning": input("Hindi Meaning: "),
    "meaning": input("Meaning: "),
    "example": input("Example: ")
}

print()

insert_after = input("Insert after which word? ")

# ------------------------
# Find position
# ------------------------

position = None

for i, item in enumerate(words):
    if item["word"].lower() == insert_after.lower():
        position = i + 1
        break

if position is None:
    print("Word not found!")
    exit()

# Insert
words.insert(position, new_word)

# Reassign IDs
for i, item in enumerate(words, start=1):
    item["id"] = i

# Save
with open(FILE_NAME, "w", encoding="utf-8") as f:
    json.dump(words, f, indent=2, ensure_ascii=False)

print("Word inserted successfully!")