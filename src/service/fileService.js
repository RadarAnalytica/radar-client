export const saveFileClickHandler = async (file, token) => {
    const formData = new FormData(); 
    formData.append("file", file);   

    try {
        const res = await fetch('ТВОЙ_НОВЫЙ_ЭНДПОИНТ', {  
            method: 'POST',                              
            headers: {
                Authorization: `JWT ${token}`,           
            },
            body: formData,  
        });

        if (res.ok) {
            const keywords = await res.json();  
            console.log('Файл успешно загружен и ключевые слова получены');
            return keywords; // Возвращаем ключевые слова
        } else {
            console.error('Ошибка при загрузке файла');
            throw new Error('Ошибка при загрузке файла');
        }
    } catch (error) {
        console.error('Ошибка сети или запроса:', error);
        throw error; // Прокидываем ошибку выше
    }
};
