import axios from 'axios';
import {db} from './firebase';

async function listPosts() {
    const query = db.collection("post")
        .orderBy("userId")
        .limit(50);
    return await query.get();
}

async function list() {
    let [users, posts] = await Promise.all([
        axios.get("/users"),
        listPosts()
    ]);

    //Gera um mapa
    let userMap = users.data.reduce((m, u) => {
        let {id, ...user} = u;
        m[id] = user;
        return m;
    }, {});

    //Substituo o user com base no mapa
    posts = posts.docs.map(p => {
        let {userId, ...post} = p.data();
        post.user = userMap[userId];
        return post;
    });
    return posts;
}

export default list;