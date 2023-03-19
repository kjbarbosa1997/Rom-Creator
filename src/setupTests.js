// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { getByTestId } from '@testing-library/react';

//expect(getByTestId('input-title')).toBeRequired()
//expect(getByTestId('input-email')).toBeRequired()

function checkUserInputsValid (){
    expect(getByTestId('input-title')).toBeValid()
    expect(getByTestId('input-email')).toBeValid()
    expect(getByTestId('task')).toBeValid()
    expect(getByTestId('file')).toBeValid()
}

function checkUserInputsMatch (){
    const projectTitle = getByTestId('input-title')
    const userEmail = getByTestId('input-email')
    const task = getByTestId('task')
    const fileInput = getByTestId('file')

    expect(projectTitle).toHaveTextContent('EXAMPLE PROJECT TITLE')
}