import React from "react";
import s from './Modal.module.css'
import {useFormik} from "formik";
import {BiX} from "react-icons/bi";

export const Modal = ({addNote, data, closeModal}) => {

    const initialCategory = data?.category ? data.category : 'task'
    const initialTitle = data?.title ? data.title : ''
    const initialContent = data?.content ? data.content : ''
    const initialIsArchive = data?.isArchive ? data.isArchive : false

    const initialValuesForm = {
        category: initialCategory,
        title: initialTitle,
        content: initialContent,
        isArchive: initialIsArchive,
    }

    const validateForm = (values) => {

        const errors = {};
        if (!values.title) {
            errors.title = 'Required';
        } else if (!/^[a-z A-Z]*$/i.test(values.title)) {
            errors.title = 'Invalid title';
        } else if (values.title.length > 20) {
            errors.title = 'Invalid surname(not be more 20 letters)';
        }
        if (!values.content) {
            errors.content = 'Required';
        } else if (values.content.length > 100) {
            errors.content = 'Invalid length address more in 100 letters';
        }

        return errors;
    }

    const submitForm = (values) => {

        addNote(values)
        console.log(values)
        formik.resetForm()

    }

    const formik = useFormik({
        initialValues: initialValuesForm,
        validate: validateForm,
        onSubmit: submitForm,
    })

    return (
        <div className={s.modalContainer}>
            <div className={s.modalForm}>
                <div className={s.closeForm} onClick={closeModal}><BiX/></div>
                <form onSubmit={formik.handleSubmit}>
                    <input name='title'
                           type="text"
                           className={s.inputForm}
                           placeholder='title'
                           {...formik.getFieldProps('title')}/>
                    {formik.touched.title && formik.errors.title &&
                    <div style={{color: 'red'}}>{formik.errors.title}</div>}

                    <textarea name='content'
                              placeholder='description  note'
                              className={s.textareaForm}
                              {...formik.getFieldProps('content')}
                    />
                    {formik.touched.content && formik.errors.content &&
                    <div style={{color: 'red'}}>{formik.errors.content}</div>}
                    <select placeholder='select category' name='category'
                            className={s.selectForm} {...formik.getFieldProps('category')}>
                        <option>task</option>
                        <option>random thought</option>
                        <option>idea</option>
                        <option>quote</option>
                    </select>
                    <div className={s.checkboxForm}>
                        is archive this note <input name='isArchive'
                                                    type='checkbox'
                                                    className={s.checkForm}
                                                    {...formik.getFieldProps('isArchive')}
                    />

                    </div>
                    <button type='submit' className={s.buttonForm}>save Note</button>
                </form>
            </div>
        </div>
    )

}
