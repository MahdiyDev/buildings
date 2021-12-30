import { Route, Redirect } from "react-router-dom";

import useAuth from "../Hooks/useAuth";

function Private(props) {
    const [ token ] = useAuth(true)

    if (token) {
        return <Route {...props} />
    } else {
        return <Redirect to='/' />
    }
}

export default Private;