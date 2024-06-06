import { useQuery } from "@tanstack/react-query";
import Map from "../../Map/components";
import { getDataKolaborator } from "../queries";

function DropPoint(){

    const {data:dataKolaborator, isSuccess:isKolaboratorSuccess} = useQuery({
        queryKey: ["kolaborator"],
        queryFn: () => getDataKolaborator()
    })

    return (
        <div>
            {
                isKolaboratorSuccess &&
                <Map 
                    data={dataKolaborator?.data}
                />
            }
        </div>
    )
}

export default DropPoint