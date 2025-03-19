export const getCalculatorSubjects = async (data) => {
    //const url = process.env.VITE_SERVICE_URL
    const url = 'https://test-server-pro.ru'
    try {
        const res = await fetch(`${url}/api/calculator/subjects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => res.json())

       return res;
    } catch(e) {
        console.log('error')
    }
}