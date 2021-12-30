import { Alert } from '@mui/material';
import { useEffect } from 'react';
import './Message.scss'

function Message({message}) {
    useEffect(() => {
        let num = 0
        if (message) {
            const showMessage = setInterval(() => {
                const messageEl = document.querySelector('.message')
                messageEl.style.bottom = num + 'px'
                num++
                if (num == 20) {
                    clearInterval(showMessage)
                }
            }, 1000 / 60)
        }
    }, [message])
    return (
        <>
        {message ? 
            <Alert className='message' severity={message.toLowerCase() !== 'created' ? 
            (message === 'Bad Request' || 'Not Found' ? 'error' : 'info'): 'success'}>
                <strong>{message}</strong>
            </Alert>
        : ''}
        </>
    )
}

export default Message;
