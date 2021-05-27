import React from 'react';

class FormService {
    static getUpdate(state, res) {
        const toUpdate = {errors: {}, error: ""};

        for (const field in state.errors) {
            toUpdate.errors[field] = res[field] ?? [];
        }
        if (res.error) toUpdate.error = res.error;
        return toUpdate;
    }

    static displayErrors(errorList) {
        if (errorList.length === 0) return "";
        return <ul>
            {errorList.map(error =>
                <li key={error} style={{color: "red"}}>{error}</li>
            )}
        </ul>
    }
}

export default FormService;
