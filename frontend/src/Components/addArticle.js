import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetLoggedInUser } from "../Actions/userAction";
import { startGetUserArticles } from "../Actions/articleAction";

const AddArticle = (props) => {
  const dispatch = useDispatch();
  const { submitForm } = props;

  useEffect(() => {
    dispatch(startGetLoggedInUser());
  }, []);

  const user = useSelector((state) => state.user.data.id);

  useEffect(() => {
    if (user) {
      dispatch(startGetUserArticles(user));
    }
  }, [user]);

  const articles = useSelector((state) => state.article);
  const result = articles.data.find((ele) => ele._id === articles.editId);

  const [title, setTitle] = useState(result?.title || "");
  const [category, setCategory] = useState(result?.category || "");
  const [content, setContent] = useState(result?.content || "");
  const [author, setAuthor] = useState(result?.author || "");
  const [formErrors, setFormErrors] = useState({});

  const runValidations = () => {
    const errors = {};

    if (title.trim() === "") {
      errors.title = "Title cannot be blank";
    }
    if (category.trim() === "") {
      errors.category = "Category cannot be blank";
    }
    if (content.trim() === "") {
      errors.content = "Content cannot be blank";
    }
    if (author.trim() === "") {
      errors.author = "Author cannot be blank";
    }

    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = runValidations();

    if (Object.keys(errors).length === 0) {
      const formData = {
        title: title,
        category: category,
        content: content,
        author: author,
      };
      const reset = () => {
        setTitle("");
        setCategory("");
        setContent("");
        setAuthor("");
      };
      submitForm(formData, reset, result?._id);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Article Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="String"
                    className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
                    placeholder="Enter your Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {formErrors.title && (
                    <div className="invalid-feedback">{formErrors.title}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="string"
                    className={`form-control ${formErrors.author ? "is-invalid" : ""}`}
                    placeholder="Enter Author Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  {formErrors.author && (
                    <div className="invalid-feedback">{formErrors.author}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className={`form-select ${formErrors.category ? "is-invalid" : ""}`}
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Business">Business</option>
                    <option value="Entertaining">Entertaining</option>
                    <option value="Local Crime">Local Crime</option>
                    <option value="Opinion">Opinion</option>
                    <option value="Sports">Sports</option>
                    <option value="General">General</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.category && (
                    <div className="invalid-feedback">{formErrors.category}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className={`form-control ${formErrors.content ? "is-invalid" : ""}`}
                    id="content"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  {formErrors.content && (
                    <div className="invalid-feedback">{formErrors.content}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                >
                  {articles.editId ? "Edit" : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;