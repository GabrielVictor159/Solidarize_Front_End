import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./Store";
import { setLoginResponse } from "./Slices/LoginSlice";

export default function SessionStorageProvider({
	children,
}: {
	children: React.ReactNode;
}){
    const dispatch = useDispatch<AppDispatch>();
	useEffect(()=>{
		let a = sessionStorage.getItem("loginResponse");
		if(a!==null)
		{
			dispatch(setLoginResponse(JSON.parse(a)));
		}
	},[]);

    return(<>
    {children}
    </>);
} 