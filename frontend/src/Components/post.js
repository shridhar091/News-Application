import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetUserArticles, startSetEditId } from "../Actions/articleAction";
import { startGetLoggedInUser } from "../Actions/userAction";
import { startDeleteArticle } from "../Actions/articleAction";
import EditForm from "./editForm";
import AddForm from "./addForm";

const Post = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetLoggedInUser());
  }, []);

  const user = useSelector((state) => {
    return state.user.data.id;
  });

  useEffect(() => {
    if (user) {
      dispatch(startGetUserArticles(user));
    }
  }, [user]);

  const articles = useSelector((state) => {
    return state.article;
  });

  const handleEdit=(id)=>{
    dispatch(startSetEditId(id))
  }

  const handleDelete=(id)=>{
    if(window.confirm('are you sure?')){
      dispatch(startDeleteArticle(id))
    }
    
  }

  return (
    <div className="container" >
      <div className="row" >
        {articles.editId?<EditForm />:<AddForm/>}
        <h1 className="mt-4 mb-4">List of Your Articles</h1>
        {articles.data.length > 0 ? (
          articles.data.map((article) => (
            <div key={article._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <hr />
                  <h6 className="card-subtitle mb-2 text-muted">
                    {article.category}
                  </h6>
                  <p className="card-text">{article.content}</p>
                  <p className="card-text">Author: {article.author}</p>
                  <p className="card-text">
                    Published on: {new Date(article.date).toDateString()}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={()=>{handleEdit(article._id)}}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={()=>{handleDelete(article._id)}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No articles are Published</h1>
        )}
      </div>
      
    </div>
  );
};

export default Post;
