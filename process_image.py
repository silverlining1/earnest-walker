from PIL import Image, ImageEnhance, ImageFilter
import os

def process_image(input_path, output_path):
    # Open the image
    img = Image.open(input_path)
    
    # Crop to focus on face (adjust these values based on the actual image)
    # This is a starting point, may need adjustment
    width, height = img.size
    # Create a square crop focused on the face
    crop_size = min(width, height)
    left = (width - crop_size) // 2
    top = (height - crop_size) // 4  # Adjust to focus more on the face
    right = left + crop_size
    bottom = top + crop_size
    img = img.crop((left, top, right, bottom))
    
    # Resize to a standard headshot size
    img = img.resize((800, 800), Image.LANCZOS)
    
    # Apply enhancements
    # Increase contrast slightly
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.2)
    
    # Increase brightness slightly
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(1.1)
    
    # Increase color saturation slightly
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(1.1)
    
    # Sharpen the image
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.3)
    
    # Apply a slight blur to smooth skin
    img = img.filter(ImageFilter.GaussianBlur(0.5))
    
    # Save the processed image
    img.save(output_path, quality=95)
    
    return output_path

if __name__ == "__main__":
    input_image = "20220428_110154.jpg"
    output_image = "profile_headshot.jpg"
    
    processed_image = process_image(input_image, output_image)
    print(f"Processed image saved as: {processed_image}")
