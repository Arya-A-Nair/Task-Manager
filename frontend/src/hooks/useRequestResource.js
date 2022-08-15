import { useCallback, useState } from "react";
import axios from "axios";

export default function useRequestResource({
    endpoint
}){
    const [resourceList, setResourceList]=useState({
        results:[]
    })
    const [resource,setResource]=useState(null)

    const getResourceList=useCallback(()=>{
        axios.get(`api/${endpoint}/`)
        .then((res)=>{
            setResourceList({
                results:res.data
            })
            .catch((err)=>{
                console.log(err)
            })
        })
    },[endpoint])


    const addResource=useCallback((values,successCallback)=>{
        axios.post(`/api/${endpoint}/`,values)
        .then(()=>{
            if(successCallback){
                successCallback()
            }
        }).catch((e)=>{
            console.log(e)
        })
    })

    const getResource=useCallback((id)=>{
        axios.get(`/api/${endpoint}/${id}/`)
        .then((res)=>{
            const {data}=res;
            setResource(data)
        })
        .catch(e=>{
            console.log(e)
        })
    },[endpoint])

    const updateResource=useCallback((id,values,successCallback)=>{
        axios.patch(`/api/${endpoint}/${id}/`, values)
        .then(()=>{
            if(successCallback){
                successCallback();
            }
        }).catch((e)=>{
            console.log(e)
        })
    }, [endpoint])

    const deleteResource=useCallback((id)=>{
        axios.delete(`/api/${endpoint}/${id}`)
        .then(()=>{
            const newResourceList={
                results:resourceList.results.filter((r)=>{
                    return r.id!==id
                })
            }
            setResourceList(newResourceList)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[endpoint,resourceList])

    return {
        resourceList,
        getResourceList,
        addResource,
        getResource,
        resource,
        updateResource,
        deleteResource
    }
}

