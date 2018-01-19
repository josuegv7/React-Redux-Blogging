import Axios from "axios";

export const FETCH_POSTS = 'fetch_posts';

export const CREATE_POST = 'creat_post'

export const FETCH_POST = 'fetch_post'

export const DELETE_POST = 'delete_post'

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=joemoe123';


export function fetchPosts() {
    const url = `${ROOT_URL}/posts${API_KEY}`;
    const request = Axios.get(url);

    return {
        type: FETCH_POSTS,
        payload: request
    };

}


export function createPost (values, callback) {
    const url = `${ROOT_URL}/posts${API_KEY}`;
    const request = Axios.post(url, values)
        .then (() => callback());

    return {
        type: CREATE_POST,
        payload: request,
    };
}

export function fetchPost(id) {
    const url = `${ROOT_URL}/posts/${id}${API_KEY}`;
    const request = Axios.get(url)

    return {
        type: FETCH_POST,
        payload: request,
    }
}

export function deletePost(id, callback) {
    const url = `${ROOT_URL}/posts/${id}${API_KEY}`;
    const request = Axios.delete(url)
        .then(() => callback());

    return {
        type: DELETE_POST,
        payload: id

    }
}
