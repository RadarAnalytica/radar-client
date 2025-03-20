import { URL } from "../config";
export const getCalculatorSubjects = async (data) => {
    try {
        const res = await fetch(`${URL}/api/calculator/subjects`, {
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