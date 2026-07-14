import React, { useEffect, useState } from 'react'

export default function HOC(Child) {
    return function Wrapper() {
        let [loading, setLoading] = useState(true);
        useEffect(() => {
            setTimeout(() => {
                setLoading(false)
            }, 10);
        })
        return (
            <>
                { loading ?
                    <div className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
                        <div className='loader'></div>
                    </div>
                    :
                    <Child />
                }
            </>
        )
    }
}
