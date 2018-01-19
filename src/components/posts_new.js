import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
    renderField(field) {
        // ES6 destru (video 140)
        const {meta: {touched, error}} = field
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type = "text"
                    {...field.input}
                />
                {/* this will display the error messages */}
                {/* condition ? expr1 : expr2 . If condition is true expr1 executed otherwise cond = false then */}
                {/* expr2 executed */}
                <div className = 'text-help' >
                    {touched ? error : ''}
                </div>
            </div>
        )
    } 
    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/')
        });
    }



    render() {
        const {handleSubmit} = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label='Title For Post'
                    name='title'
                    component={this.renderField}
                />
                <Field
                    label='Categories'
                    name='categories'
                    component={this.renderField}
                />            
                <Field
                    label='Post Content'
                    name='content'
                    component={this.renderField}
                /> 
                <button type="submit" className="btn btn-primary">Submit</button>      
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>

        )
    }
}

// helper function
function validate(values){
    // console.log(values) -> {title: "", ...}
    const errors = {};
    
    // validate the imputs from 'values'

    if (!values.title) {
        errors.title = "ENTER A TITLE!"
    }
    if (!values.categories) {
        errors.categories = "ENTER A CATEGORY!"
    }
    if (!values.content) {
        errors.content = "ENTER A CONTENT!"
    }

    // if error is empty, the form is fine to sumit
    // if errors has *any* properties, redux form assume form is invalid
    return errors
    
}


export default reduxForm({
    // you can use refer to validate helper function like this: validate: validate or just validate remember ES6
    validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(PostsNew)
);