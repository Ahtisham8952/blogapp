import { Account, Client,Databases,ID } from "appwrite"
import {config} from "../config/config"

export class DatabaseService{
    client= new Client()
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl) 
        .setProject(config.appwriteProjectId);
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    async CreatePost({title,slug,content,featuredImage,status,userId}){
 try {
    return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        config.appwriteBucketId,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
            userId,
        }
       
    )
    
 } catch (error) {
    throw error;
 }
    }
    async UpdatePost(slug,{title,content,featuredImage,status}){
try {
    return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
            
        }
    )
    
} catch (error) {
    throw error;
}
    }
    async DeletePost(slug){
try {
    await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
    )
    return true
    
} catch (error) {
    throw error;
    return false
}
    }
    async GetPost(slug){
try {
    return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
    ) 
    
} catch (error) {
    throw error
}
    }
    async GetPosts(queries=[Query.equal("status","active")]){
try {
    return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,

    )
    
} catch (error) {
    throw error
}
    }
}

const databaseservice= new DatabaseService()


export default  databaseservice