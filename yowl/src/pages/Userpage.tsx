import Usercard from "../components/Usercard";
import { IUsers } from "../types/IUsers";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

function Userpage() {

    const [user, setUsers] = useState<IUsers []| null>(null);
    const [userrev, setUserrev] = useState<IUsers [] | null>(null);
    const [error, setError] = useState("");

    const fetchUsersData = async () => {
        try {
            const id = await localStorage.getItem("user_id");
            if (!id) {
                console.log("no id")
            }
            const response = await axiosInstance.get(`/users/user/${id}`);
            console.log(response);

            if (response.status != 200) {
                throw new Error("Failed to fetch user data");
            }

            const data = response.data.results[0];
            console.log(data);
            
            setUsers(response.data.results[0]);
        } catch (err) {
            setError((err as Error).message || "Error fetching user data");
        }
    };

    const fetchUser2Data = async () => {
        try {
            const id = await localStorage.getItem("user_id");
            if (!id) {
                console.log("no id")
            }
            const response = await axiosInstance.get(`/users/user/reviews/${id}`);
            console.log(response);

            if (response.status != 200) {
                throw new Error("Failed to fetch user data");
            }

            const data = response.data.results;
            console.log(data);
            
            setUserrev(data);
        } catch (err) {
            setError((err as Error).message || "Error fetching user data");
        }
    };


    useEffect(() => {
        fetchUsersData();
        fetchUser2Data();
    }, []);

    console.log(user);
    

    return (
        <div className='bg-[#E1DBFF] w-full min-h-screen '>
           <Usercard user={user} userrev={userrev} fetchUser2Data={fetchUser2Data} />
        </div>
    )
}

export default Userpage