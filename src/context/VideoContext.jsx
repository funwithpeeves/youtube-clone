import { createContext, useEffect, useState } from "react";
import api from "../utils/api"
import { categories } from "../constants";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    
    useEffect(() => {
        const type = selectedCategory?.type
        if (type === "menu") return;
        setIsLoading(true);

        const url =
        type === "home" 
        ? "/home" 
        : type === "trending" 
        ? "/trending" 
        : type === "category"
        ? `/search?query=${selectedCategory.name}` 
        : "";

       api.get(url).then((res) => setVideos(res.data?.data))
       .catch((error) => setError(error.message))
       .finally(() => setIsLoading(false))
    }, [selectedCategory]);


    return (
    <VideoContext.Provider value={{ videos, error, isLoading, selectedCategory, setSelectedCategory }}>{children}</VideoContext.Provider>
)
}