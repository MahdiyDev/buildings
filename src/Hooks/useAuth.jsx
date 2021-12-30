import { useContext } from "react";
import { Auth } from "../Context/Auth";

function useAuth(setter) {
    const { token, setToken } = useContext(Auth)
    return setter ? [ token, setToken ] : [ setToken ]
}

export default useAuth;
