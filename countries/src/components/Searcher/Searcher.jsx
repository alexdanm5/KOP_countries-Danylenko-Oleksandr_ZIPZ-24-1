import {Formik, Form, Field} from 'formik'
import Categories from '../Categories/Categories';
import FormObserver from '../FormObserver/FormObserver';

import './searcher.scss'

const Searcher = ({onFilter}) => {
    const CHECKBOXES = [
        {id: 1, type: "checkbox", name: "g20", label: "Are members of the G20"},
        {id: 2, type: "checkbox", name: "g7", label: "Are members of the G7"},
        {id: 3, type: "checkbox", name: "eu", label: "Are members of the EU"},
        {id: 4, type: "checkbox", name: "nato", label: "Are members of the NATO"},
        {id: 5, type: "checkbox", name: "brics", label: "Are members of the BRICS"}  
    ]

    return (
        <div className='searcher'>
            <Formik
                initialValues={{ text: '', g20: false, g7: false, eu: false, nato: false, brics: false }}

                onSubmit={(values) => {
                    onFilter(values, 0);
                }}
            >
            {({ isSubmitting }) => (
                <Form className='searcher__form'>
                    <FormObserver onFilter={onFilter}/>
                    <Field className="searcher__input" type="text" name="text" />
                    <div className='searcher__categories'>
                        <Categories >
                            {CHECKBOXES.map((item) => (
                                <li key={item.id}>
                                    <label>
                                        <Field name={item.name}>
                                            {({ field, form }) => (
                                                <input
                                                    {...field} 
                                                    type="checkbox"
                                                    checked={field.value === true} 
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        
                                                        form.setFieldValue(item.name, isChecked);
                                                        
                                                        onFilter({ ...form.values, [item.name]: isChecked }, 0);
                                                        
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        {' '}{item.label}
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