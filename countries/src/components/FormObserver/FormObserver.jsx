import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounse'

const FormObserver = ({ onFilter }) => {
    const { values } = useFormikContext();
    
    const debouncedText = useDebounce(values.text, 400);

    useEffect(() => {
        onFilter(values, 0);
    }, [debouncedText]); 

    return null; 
};

export default FormObserver