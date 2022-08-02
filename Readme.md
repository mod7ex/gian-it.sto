# Начало работы

- git clone ...
- npm install
- npm run dev


## . responses or response status 
#####  ==>  If any issue is encountered with server responses or response status (success, failure) in `templates`  we head to useApi composable and we just try to play with what the composable provides & the adapted success definition 
`{ call, data, responce, error, loading, errorMsg, success, reset, ready }`


## . Always redirect comes after toast api (in order to cancel in case of edit pages)

## . the properties (resources) of the save proxy from `~/helper/save` are always in snake case 

## . the composable `useConfirmModal` it would have been a better choice to merge it (wrap)directly with the drop functions

## . Logic for all services should be similar to `diagnostic-card-form.js` service & some composables

## . A global `saveFormHandler` might have been defined, it takes the `v$` and handels validation once

## . A store class or controller class (OOP) could have been created to avoid repetition

### -----> Todo: when permissions are editable uncomment tabs and permission for orders