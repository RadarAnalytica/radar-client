import { URL } from "./config";

export const saveFileClickHandler = async (file, token) => {
    const formData = new FormData(); 
    formData.append("file", file);  // Добавляем файл в formData

    try {
        const res = await fetch(`${URL}/api/description-generator/get_keywords`, {  
            method: 'POST',                              
            headers: {
                authorization: "JWT " + token,
              
            },
            body: formData,  
        });

        if (res.ok) {
            const keywords = await res.json();  
            console.log('Файл успешно загружен и ключевые слова получены');
            return keywords; // Возвращаем ключевые слова
        } else {
            console.error('Ошибка при загрузке файла:', res.statusText);
            throw new Error(res.statusText);
        }
    } catch (error) {
        console.error('Ошибка сети или запроса:', error);
        throw error; // Прокидываем ошибку выше
    }
};
