"use client";
import next from "next";
import { useState, useEffect, use } from "react";

export default function ImageGallery() {
    const [images, setImages] = useState([]);
    const [imageInput, setImageInput] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem("images")) || [];
        setImages(storedImages);
    }, []);

    const handleAddImage = () => {
        if (imageInput) {
            const newImage = { url: imageInput, favorite: false };
            const newImages = [...images, newImage];
            setImages(newImages);
            localStorage.setItem("images", JSON.stringify(newImages));
            setImageInput("");
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImage = { url: e.target.result, favorite: false };
                const newImages = [...images, newImage];
                setImages(newImages);
                localStorage.setItem("images", JSON.stringify(newImages));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        localStorage.setItem("images", JSON.stringify(newImages));
    };

    const toggleFavorite = (index) => {
        const updatedImages = [...images];
        updatedImages [index].favorite = !updatedImages [index].favorite;
        setImages (updatedImages);
        localStorage.setItem ("images", JSON.stringify (updatedImages));
    };

    const displayedImages = showFavorites ? images.filter ((image) => image.favorite): images;

    return (
        <div>
            <h1>Galeria de Imagenes</h1>
            <div>
                <input type="text" value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="Ingresa la URL de la imagen"></input>
                <button onClick={handleAddImage}>Añadir Imagene</button>
            </div>
            <div className="gallery">
                {images.map((url, index) => (
                    <div key={index} className="image-container">
                        <img src={url} alt={`Imagen ${index + 1}`}></img>
                        <button onClick={() => handleRemoveImage(index)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

