from facenet_pytorch import MTCNN, InceptionResnetV1
from PIL import Image
import torch
import os
import warnings

# Suppress all warnings
warnings.filterwarnings("ignore")

# Load face detector and embedding model
mtcnn = MTCNN(image_size=160)
resnet = InceptionResnetV1(pretrained='vggface2').eval()

# Set dataset path (adjust this to your dataset's location)
dataset_path = "dataset"

# Function to load and split the dataset
def load_dataset(dataset_path):
    # List all subfolders (each representing a person)
    persons = [d for d in os.listdir(dataset_path) if os.path.isdir(os.path.join(dataset_path, d))]
    train_images = []
    test_images = []
    
    for person in persons:
        person_folder = os.path.join(dataset_path, person)
        # List all .jpg images in the subfolder
        images = [f for f in os.listdir(person_folder) if f.endswith('.jpg')]
        # Sort images for consistency
        images.sort()
        
        # Ensure there are at least 2 images (1 for training, 1+ for testing)
        if len(images) >= 2:
            # Use the first image for training
            train_images.append((person, os.path.join(person_folder, images[0])))
            # Use the remaining images for testing
            for img in images[1:]:
                test_images.append((person, os.path.join(person_folder, img)))
        else:
            print(f"Warning: Person {person} has only {len(images)} image(s). Skipping.")
    
    return train_images, test_images

# Load the dataset
train_images, test_images = load_dataset(dataset_path)

# Process training images to extract embeddings
train_embeddings = []
train_labels = []

for label, img_path in train_images:
    img = Image.open(img_path)
    face = mtcnn(img)
    if face is not None:
        # Compute embedding and store it
        emb = resnet(face.unsqueeze(0))
        train_embeddings.append(emb)
        train_labels.append(label)
    else:
        print(f"Face not detected in training image {img_path}. Skipping.")

# Check if we have any training embeddings
if train_embeddings:
    # Stack all training embeddings into a single tensor
    train_embeddings = torch.cat(train_embeddings, dim=0)
else:
    print("No training images with detected faces. Exiting.")
    exit()

# Process test images and evaluate
correct = 0
total = 0

for label, img_path in test_images:
    img = Image.open(img_path)
    face = mtcnn(img)
    if face is not None:
        # Compute embedding for the test image
        emb = resnet(face.unsqueeze(0))
        # Calculate cosine similarities with all training embeddings
        similarities = torch.nn.functional.cosine_similarity(emb, train_embeddings)
        # Find the index of the highest similarity
        pred_idx = torch.argmax(similarities).item()
        # Get the predicted label
        pred_label = train_labels[pred_idx]
        # Check if prediction is correct
        if pred_label == label:
            correct += 1
        total += 1
    else:
        print(f"Face not detected in test image {img_path}. Skipping.")

# Compute and print accuracy
if total > 0:
    accuracy = correct / total
    print(f"Accuracy: {accuracy:.4f}")
else:
    print("No test images with detected faces.")