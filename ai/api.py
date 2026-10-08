from io import BytesIO

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from transformers import pipeline


app = FastAPI()


# Allow your Next.js development server to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load the model ONCE when the API starts
classifier = pipeline(
    "image-classification",
    model="dima806/garbage_types_image_detection"
)


@app.get("/")
def root():
    return {"message": "RecAIcle AI API is running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Uploaded file must be an image."
        )

    try:
        image_bytes = await file.read()

        image = Image.open(
            BytesIO(image_bytes)
        ).convert("RGB")

        results = classifier(
            image,
            top_k=1
        )

        prediction = results[0]

        return {
            "category": prediction["label"],
            "confidence": round(prediction["score"], 4)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not analyze image: {str(e)}"
        )