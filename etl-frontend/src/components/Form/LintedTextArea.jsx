import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { InputErrorMessage } from './InputErrorMessage';


export const LintedTextArea = ({ label, value, isValid, showErrorMessage, errorMessage, onChange, width, height, readOnly = false, disabled = false }) => {

    return (
        <div className="form-group">
            {label && <label className="form-control-label">{label}</label>}
            <CodeMirror
                value={value || ""}
                editable={!disabled && !readOnly}
                width={width || '100%'}
                height={height || "300px"}
                theme='dark'
                extensions={[javascript()]}
                onChange={(value, _) => {
                    onChange(value)
                }}
            />
            <InputErrorMessage isValid={showErrorMessage ? isValid : true} message={errorMessage || `Please enter valid ${label}`} />
        </div>
    );
}