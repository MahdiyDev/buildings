import { useEffect, useState } from "react";
import url from "../assets/url";
import useAuth from "./useAuth";

function useSignUp() {
    const [admin, setAdmin] = useState(null)
    const [ message, setMessage ] = useState('')
    const [token] = useAuth(true)
    useEffect(() => {
        if (admin) {
            fetch(`${url}/admin/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    auth: token
                },
                body: JSON.stringify(admin)
            })
            .then(res => res.json())
            .then(data => data.message ? setMessage(data.message) : console.log(data))
            .catch(err => console.log(err))
        }
    }, [admin])
    return [setAdmin, message]
}

export default useSignUp;