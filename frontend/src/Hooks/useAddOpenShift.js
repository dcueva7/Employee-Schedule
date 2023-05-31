import Cookies from 'js-cookie'

const useAddOpenShift = () => {

    const authToken = Cookies.get('authToken')
    
    const addOpenShift = (start, end, date) => {

        fetch('get_open_shifts/', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body : JSON.stringify({
                start : start,
                end : end,
                date : date,
            })
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
            }).catch(error => console.error(error))

    }


    return addOpenShift;

}

export default useAddOpenShift;