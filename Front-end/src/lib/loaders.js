import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"

export const singlePageLoader = async({request,params})=>{
    const res= await apiRequest("/posts/"+params.id)
    return res.data;

}

export const listPageLoader = async({request,params})=>{
    //console.log("listPageLoader",request);
   

    const query=request.url.split("?")[1]
     const postPromise=  apiRequest("/posts?"+query)
     console.log(" postpromise ",postPromise)
    return defer({
        
        postResponse: postPromise,
    })
    //return postPromise.data;

}

export const profilePageLoader = async()=>{
    //console.log("listPageLoader",request);
    const postPromise=  apiRequest("/users/profilePosts")
    console.log(" postpromise2 ",postPromise)
   
    return defer({
        postResponse: postPromise


    })

}