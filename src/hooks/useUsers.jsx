import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const useUsers = () => {
    const { user, loading } = useContext(AuthContext);


    // query for users data
    const { refetch, data: users = [], error } = useQuery(['users'], async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    });
    return [users, refetch];
}

export default useUsers;
