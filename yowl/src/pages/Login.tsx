import { useState } from 'react';
import Logincard from '../components/Logincard';
import Registercard from '../components/Registercard';
import Resetcard from '../components/Resetcard';


function Login() {
    
    const [page, setPage] = useState<string | number>("login");


    return (
        <div className='bg-[#F6EDD7] w-full min-h-screen '>
            {page === "login" && (
                <div className="pt-[150px] pb-[200px]"><Logincard setPage={setPage}/></div>
            )}

            {page === "register" && (
                <div className="pt-[150px] pb-[200px]"><Registercard setPage={setPage} /></div>
            )}

            {page === "reset" && (
                <div className="pt-[150px] pb-[200px]"><Resetcard setPage={setPage}/></div>
            )}
        </div>
    )
}

export default Login