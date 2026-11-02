import {Formik, Form, Field} from 'formik'
import Categories from '../Categories/Categories';

import './searcher.scss'

const Searcher = () => {
    const CHECKBOXES = [
        {id: 1, type: "checkbox", name: "g20", value: "g20", label: "Are members of the G20"},
        {id: 2, type: "checkbox", name: "g7", value: "g7", label: "Are members of the G7"},
        {id: 3, type: "checkbox", name: "eu", value: "eu", label: "Are members of the EU"},
        {id: 4, type: "checkbox", name: "nato", value: "nato", label: "Are members of the NATO"},
        {id: 5, type: "checkbox", name: "brics", value: "brics", label: "Are members of the BRICS"}  
    ]

    return (
        <div className='searcher'>
            <Formik
                initialValues={{ text: '' }}
                validate={values => {
                    
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
                }}
            >
            {({ isSubmitting }) => (
                <Form className='searcher__form'>
                    <Field className="searcher__input" type="text" name="text" />
                    <div className='searcher__categories'>
                        <Categories >
                            {CHECKBOXES.map((item) => (
                                <li key={item.id}>
                                    <label>
                                        <Field type={item.type} name={item.name} value={item.value} /> {item.label}
                                    </label>
                                </li>
                            ))}

                        </Categories>
                    </div>

                    <button className='searcher__btn' type="submit" disabled={isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Searcher