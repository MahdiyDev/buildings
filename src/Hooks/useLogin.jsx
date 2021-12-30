import { useEffect, useState } from "react";
import url from "../assets/url";
import useAuth from "./useAuth";

function useLogin() {
    const [ message, setMessage ] = useState('')
    const [admin, setAdmin] = useState(null)
    const [setToken] = useAuth(false)
    useEffect(() => {
        if (admin) {
            fetch(`${url}/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(admin)
            })
            .then(res => res.json())
            .then(data => {
                data.accessToken ? setToken(data.accessToken) : console.log(null)
                data.message ? setMessage(data.message) : console.log(null)
            })
            .catch(err => console.log(err))
        }
    }, [admin])
    return [setAdmin, message]
}

export default useLogin;
