from transformers import pipeline

classifier = pipeline(
    "image-classification",
    model="dima806/garbage_types_image_detection"
)

results = classifier(
    "test-image.jpg",
    top_k=12
)

for result in results:
    print(
        result["label"],
        round(result["score"] * 100, 2),
        "%"
    )