import { useRouter } from 'next/router'




import React from 'react'
import NewPassword from '../../components/auth/newPassword/NewPassword'

function newpassword(props) {
    const router = useRouter()
    console.log(router.query.token);
    return (
        <div>
            <NewPassword token={router.query.token}/>
        </div>
    )
}

export default newpassword
