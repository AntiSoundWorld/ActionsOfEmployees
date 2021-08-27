import { getUsers } from "../GetInfo/Tools/tools.js";
import { getComments } from "./requestsToConfluence/getComments.js";
import { getContentsId } from "./requestsToConfluence/getContentsId.js";


export default async function RequestsToConfluence(jiraAccessId, accessToken){

    const blogPostsId = await  getContentsId(jiraAccessId, accessToken, 'blogpost');
    const pagesId = await getContentsId(jiraAccessId, accessToken, 'page');

    const infoBlogPosts = await Promise.all(
            blogPostsId.map(async blogPostId => {

                return await getComments(jiraAccessId, accessToken, blogPostId, 'blogpost')
            })
    )

    const infoPages = await Promise.all(
        pagesId.map(async pageId => {

            return await getComments(jiraAccessId, accessToken, pageId, 'page')
        })
    )

    const infoFromConfluence = {

        infoBlogPosts: infoBlogPosts[0],

        infoPages: infoPages[0]
    }
    
    return infoFromConfluence;
}