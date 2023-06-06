import React, { useEffect, useState } from 'react'

const Loader = () => {
    const [show, setShow] = useState(false);
    const delay = 5;

    useEffect(() => {
        let timer1 = setTimeout(() => setShow(true), delay * 10000);
        return () => {
            clearTimeout(timer1);
        }
    }, [])
    return (
        <div>
            {show ? (
                <div>
                    <h1>Please, waitting {delay} seconds passed</h1>
                </div>
            ) : (
                <div>
                    Waitting {delay} seconds
                </div>
            )}
        </div>
    )
}

export default Loader