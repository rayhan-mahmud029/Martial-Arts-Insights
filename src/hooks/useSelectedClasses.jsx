import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const useSelectedClasses = () => {
    const { user, loading } = useContext(AuthContext);


    // query for selected class data
    const { refetch, data: selectedClasses = [], error } = useQuery(['selectedClasses'], async () => {
        try {
            const response = await axios.get(`http://localhost:5000/selected-classes?email=${user?.email}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    });
    return [selectedClasses, refetch];
}

export default useSelectedClasses;
