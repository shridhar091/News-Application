import React, { useEffect, useState } from "react";
import'../App.css'
import { useDispatch, useSelector } from "react-redux";
import { startGetAllArticles, startGetSearchedArticles, startSortArticle } from "../Actions/articleAction";
import { startCreateComment, startGetAllComments } from "../Actions/commentAction";

const Articles = () => {
  const [search, setSearch] = useState('');
  const [showArticle, setShowArticle] = useState(false);
  const [select, setSelect] = useState('');
  const [comment, setComment] = useState('');
  const [post, setPost] = useState('');
  const [showCmnt, setShowCmnt] = useState([]);
  const [listCmnt, setListCmnt] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetAllArticles());
    dispatch(startGetAllComments());
  }, [dispatch]);

  const articles = useSelector((state) => state.article);
  const allComments = useSelector((state) => state.comment);

  //Search
  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(startGetSearchedArticles(e.target.value));
    setShowArticle(true);
  };

  //Sort
  const handleSort = (e) => {
    setSelect(e.target.value);
    dispatch(startSortArticle(e.target.value));
  };

  const handleComment = (id) => {
    setListCmnt(false);
    setComment(id);
  };

  //Adding Comment to a particular post
  const handlePost = () => {
    const formData = {
      articleId: comment,
      comment: post
    };
    dispatch(startCreateComment(formData));
    setComment('');
    setPost('');
  };

  //Getting comment on a post
  const commentFilter = (id) => {
    const result = allComments.data.filter((ele) => ele.articleId === id);
    setComment(id);
    setShowCmnt(result);
    setListCmnt(true);
  };

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <input type='search' value={search} onChange={handleChange} placeholder="Search here" />
          <select value={select} onChange={handleSort} className="sort-button">
            <option value=''>Sort</option>
            <option value="Most Recent">Most Recent</option>
          </select>
      </div>
      <h1 className="mt-4 mb-4">List of All Articles</h1>
      <div className="row">
        {showArticle ?
          articles.searchData.length > 0 ? (
            articles.searchData.map((article) => (
              <div key={article._id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <hr />
                    <h6 className="card-subtitle mb-2 text-muted">
                      {article.category}
                    </h6>
                    <p className="card-text">{article.content}</p>
                    <p className="card-text">
                      Author: {article.author}
                    </p>
                    <p className="card-text">
                      Published on: {new Date(article.date).toDateString()}
                    </p>
                    <button onClick={() => { handleComment(article._id) }} className="btn btn-primary cardBtn">Add Comment</button>
                    <button onClick={() => { commentFilter(article._id) }} className="btn btn-secondary cardBtn">Show Comments</button>
                    {(comment === article._id) && (listCmnt === false) && (
                      <div>
                        <textarea onChange={(e) => { setPost(e.target.value) }} className="form-control" rows="2"></textarea>
                        <button onClick={handlePost} className="btn btn-success">Post</button>
                      </div>
                    )}
                    {listCmnt && (comment === article._id) && showCmnt.length > 0 ? (
                      <ul className="list-group mt-3">
                        {showCmnt.map((e) => (
                          <li key={e._id} className="list-group-item">{e.comment}</li>
                        ))}
                      </ul>
                    ) : <p></p>}
                  </div>
                </div>
              </div>
            ))
          ) : <h1>No articles are Found</h1>
          : articles.data.length > 0 ? (
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
                    <p className="card-text">
                      Author: {article.author}
                    </p>
                    <p className="card-text">
                      Published on: {new Date(article.date).toDateString()}
                    </p>
                    <button onClick={() => { handleComment(article._id) }} className="btn btn-primary">Add Comment</button>
                    <button onClick={() => { commentFilter(article._id) }} className="btn btn-secondary">Show Comments</button>
                    {(comment === article._id) && (listCmnt === false) && (
                      <div>
                        <textarea onChange={(e) => { setPost(e.target.value) }} className="form-control" rows="2"></textarea>
                        <button onClick={handlePost} className="btn btn-success">Post</button>
                      </div>
                    )}
                    {listCmnt && (comment === article._id) && showCmnt.length > 0 ? (
                      <ul className="list-group mt-3">
                        {showCmnt.map((e) => (
                          <li key={e._id} className="list-group-item">{e.comment}</li>
                        ))}
                      </ul>
                    ) : <p></p>}
                  </div>
                </div>
              </div>
            ))
          ) : <h1>No articles are Published</h1>
        }
      </div>
    </div>
  );
};

export default Articles;