import LoginDefault from "@/layouts/Login/loginDefault";
import { useRouter } from 'next/router';

export default function RecoverPassword(){
    const router = useRouter();
    const { id } = router.query;
    
    return(
        <>
        <LoginDefault>
            <>
            </>
        </LoginDefault>
        </>
    );
}